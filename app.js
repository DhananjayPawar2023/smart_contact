import { ethers } from "./node_modules/ethers/dist/ethers.esm.min.js";

const CONTRACT_ABI = [
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "string", name: "movieId", type: "string" },
            { indexed: true, internalType: "address", name: "user", type: "address" },
            { indexed: false, internalType: "uint256", name: "rating", type: "uint256" }
        ],
        name: "MovieRated",
        type: "event"
    },
    {
        inputs: [
            { internalType: "string", name: "", type: "string" },
            { internalType: "address", name: "", type: "address" }
        ],
        name: "hasRated",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [{ internalType: "string", name: "_movieId", type: "string" }],
        name: "getAverageRating",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [{ internalType: "string", name: "_movieId", type: "string" }],
        name: "getRatingData",
        outputs: [
            { internalType: "uint256", name: "totalRating", type: "uint256" },
            { internalType: "uint256", name: "ratingCount", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            { internalType: "string", name: "_movieId", type: "string" },
            { internalType: "uint256", name: "_rating", type: "uint256" }
        ],
        name: "rateMovie",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }
];

const CONTRACT_INTERFACE = new ethers.utils.Interface(CONTRACT_ABI);
const REMIX_PLUGIN_IMPORT = "https://cdn.skypack.dev/@remixproject/plugin-webview";

const state = {
    movies: [],
    remixClient: null,
    remixReady: false,
    providerName: "Not connected",
    selectedAccount: "",
    accounts: [],
    contractAddress: ""
};

const movieList = document.getElementById("movieList");
const statusMessage = document.getElementById("statusMessage");
const connectRemixBtn = document.getElementById("connectRemixBtn");
const refreshRatingsBtn = document.getElementById("refreshRatingsBtn");
const contractAddressInput = document.getElementById("contractAddressInput");
const accountSelect = document.getElementById("accountSelect");
const providerBadge = document.getElementById("providerBadge");
const remixBadge = document.getElementById("remixBadge");
const currentAccount = document.getElementById("currentAccount");

function setStatus(message, tone = "neutral") {
    statusMessage.textContent = message;
    statusMessage.dataset.tone = tone;
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function buildStars(averageRating) {
    const filled = Math.max(0, Math.min(5, Math.round(averageRating)));
    return `${"&#9733;".repeat(filled)}${"&#9734;".repeat(5 - filled)}`;
}

function formatAverage(totalRating, ratingCount) {
    if (!ratingCount) {
        return "0.0";
    }

    return (totalRating / ratingCount).toFixed(1);
}

function normalizeAddress(value) {
    const trimmed = value.trim();

    if (!trimmed) {
        return "";
    }

    try {
        return ethers.utils.getAddress(trimmed);
    } catch {
        throw new Error("Enter a valid deployed contract address from Remix.");
    }
}

function toSafeNumber(value) {
    if (value && typeof value.toNumber === "function") {
        return value.toNumber();
    }

    return Number(value);
}

function extractHexResult(payload) {
    if (!payload) {
        return "";
    }

    if (typeof payload === "string" && payload.startsWith("0x")) {
        return payload;
    }

    const candidates = [
        payload.result,
        payload.data,
        payload.return,
        payload.returnData,
        payload.executionResult?.output,
        payload.result?.result,
        payload.result?.returnData,
        payload.result?.data
    ];

    for (const candidate of candidates) {
        if (typeof candidate === "string" && candidate.startsWith("0x")) {
            return candidate;
        }
    }

    return "";
}

function getTxHash(payload) {
    if (!payload) {
        return "";
    }

    return (
        payload.transactionHash ||
        payload.hash ||
        payload.txHash ||
        payload.result?.transactionHash ||
        payload.result?.hash ||
        ""
    );
}

function updateConnectionView() {
    remixBadge.textContent = state.remixReady ? "Connected to Remix" : "Open this UI inside Remix";
    providerBadge.textContent = state.providerName;
    currentAccount.textContent = state.selectedAccount || "No Remix VM account selected";
    refreshRatingsBtn.disabled = !state.remixReady;
}

function renderAccountOptions() {
    accountSelect.innerHTML = "";

    if (!state.accounts.length) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No account available";
        accountSelect.appendChild(option);
        accountSelect.disabled = true;
        return;
    }

    state.accounts.forEach((account) => {
        const option = document.createElement("option");
        option.value = account;
        option.textContent = account;
        option.selected = account === state.selectedAccount;
        accountSelect.appendChild(option);
    });

    accountSelect.disabled = false;
}

function createMovieCard(movie) {
    const average = Number(formatAverage(movie.totalRating, movie.ratingCount));
    const buttons = [1, 2, 3, 4, 5]
        .map((rating) => {
            const disabled = !state.remixReady || !state.selectedAccount || !state.contractAddress || movie.hasRated || movie.isBusy;
            const label = movie.isBusy ? "Sending..." : `${rating} star`;

            return `
                <button
                    class="rating-action"
                    data-movie-id="${escapeHtml(movie.imdbID)}"
                    data-rating="${rating}"
                    ${disabled ? "disabled" : ""}
                >
                    ${label}
                </button>
            `;
        })
        .join("");

    return `
        <article class="movie-card">
            <img class="movie-poster" src="${escapeHtml(movie.poster)}" alt="${escapeHtml(movie.title)} poster">
            <div class="movie-content">
                <span class="movie-id">${escapeHtml(movie.imdbID)}</span>
                <h3 class="movie-title">${escapeHtml(movie.title)}</h3>
                <p class="movie-year">Year: ${escapeHtml(movie.year)}</p>
                <p class="movie-description">Local movie list, on-chain ratings. Real transactions go through Remix VM using the selected funded account.</p>
                <div class="movie-meta">
                    <span class="movie-rating">${formatAverage(movie.totalRating, movie.ratingCount)}/5</span>
                    <span class="movie-count">${movie.ratingCount} rating(s)</span>
                </div>
                <div class="star-strip">${buildStars(average)}</div>
                <div class="rate-actions">${buttons}</div>
                <p class="rate-note">${movie.hasRated ? "This Remix account already rated this movie." : "Pick 1 to 5 to send a transaction from Remix VM."}</p>
            </div>
        </article>
    `;
}

function renderMovies() {
    movieList.innerHTML = state.movies.map(createMovieCard).join("");
}

async function loadMovieCatalog() {
    const response = await fetch("data/movies.json");
    if (!response.ok) {
        throw new Error("Could not load local movie catalog.");
    }

    const data = await response.json();
    state.movies = data.slice(0, 10).map((movie) => ({
        ...movie,
        totalRating: 0,
        ratingCount: 0,
        hasRated: false,
        isBusy: false
    }));
}

async function connectToRemix() {
    setStatus("Connecting to Remix plugin bridge...", "neutral");

    try {
        const { createClient } = await import(REMIX_PLUGIN_IMPORT);
        const remixClient = createClient();

        await new Promise((resolve, reject) => {
            const timer = window.setTimeout(() => {
                reject(new Error("Remix was not detected. Open this UI from Remix Plugin Manager using 'Connect to a Local Plugin'."));
            }, 5000);

            remixClient.onload(() => {
                window.clearTimeout(timer);
                resolve();
            });
        });

        state.remixClient = remixClient;
        state.remixReady = true;

        await refreshRemixContext();
        setStatus("Remix connected. Paste the deployed contract address and click Refresh Ratings.", "success");
    } catch (error) {
        state.remixClient = null;
        state.remixReady = false;
        updateConnectionView();
        setStatus(error.message, "error");
    }
}

async function refreshRemixContext() {
    if (!state.remixClient) {
        return;
    }

    const [providerName, accounts] = await Promise.all([
        state.remixClient.call("network", "getNetworkProvider"),
        state.remixClient.call("udapp", "getAccounts")
    ]);

    state.providerName = typeof providerName === "string" ? providerName : JSON.stringify(providerName);
    state.accounts = Array.isArray(accounts) ? accounts : [];

    if (!state.accounts.length) {
        throw new Error("No Remix accounts were found. Use Remix VM (London) and deploy the contract there.");
    }

    if (!state.accounts.includes(state.selectedAccount)) {
        state.selectedAccount = state.accounts[0];
    }

    renderAccountOptions();
    updateConnectionView();
}

async function sendReadCall(data) {
    const response = await state.remixClient.call("udapp", "sendTransaction", {
        from: state.selectedAccount,
        to: state.contractAddress,
        data,
        value: "0x0",
        useCall: true
    });

    const hex = extractHexResult(response);
    if (!hex) {
        throw new Error("Remix call did not return contract data. Check that the contract address is correct.");
    }

    return hex;
}

async function loadMovieChainState(movie) {
    const ratingHex = await sendReadCall(CONTRACT_INTERFACE.encodeFunctionData("getRatingData", [movie.imdbID]));
    const [totalRating, ratingCount] = CONTRACT_INTERFACE.decodeFunctionResult("getRatingData", ratingHex);

    let hasRated = false;
    if (state.selectedAccount) {
        const ratedHex = await sendReadCall(CONTRACT_INTERFACE.encodeFunctionData("hasRated", [movie.imdbID, state.selectedAccount]));
        [hasRated] = CONTRACT_INTERFACE.decodeFunctionResult("hasRated", ratedHex);
    }

    movie.totalRating = toSafeNumber(totalRating);
    movie.ratingCount = toSafeNumber(ratingCount);
    movie.hasRated = Boolean(hasRated);
}

async function refreshAllRatings() {
    try {
        state.contractAddress = normalizeAddress(contractAddressInput.value);
        contractAddressInput.value = state.contractAddress;
    } catch (error) {
        setStatus(error.message, "error");
        return;
    }

    if (!state.remixReady) {
        setStatus("Connect this UI to Remix first.", "error");
        return;
    }

    setStatus("Reading ratings from the deployed contract...", "neutral");

    try {
        await refreshRemixContext();
        await Promise.all(state.movies.map((movie) => loadMovieChainState(movie)));
        renderMovies();
        setStatus("Ratings loaded from the blockchain through Remix VM.", "success");
    } catch (error) {
        setStatus(error.message || "Could not read the deployed contract.", "error");
    }
}

async function rateMovie(movieId, rating) {
    const movie = state.movies.find((item) => item.imdbID === movieId);
    if (!movie) {
        setStatus("Movie not found.", "error");
        return;
    }

    if (movie.hasRated) {
        setStatus("This selected Remix account already rated that movie.", "error");
        return;
    }

    movie.isBusy = true;
    renderMovies();
    setStatus(`Sending ${rating}-star rating for ${movie.title} from ${state.selectedAccount}...`, "neutral");

    try {
        const data = CONTRACT_INTERFACE.encodeFunctionData("rateMovie", [movieId, rating]);
        const receipt = await state.remixClient.call("udapp", "sendTransaction", {
            from: state.selectedAccount,
            to: state.contractAddress,
            data,
            value: "0x0",
            useCall: false
        });

        const txHash = getTxHash(receipt);
        await loadMovieChainState(movie);
        renderMovies();
        setStatus(
            txHash
                ? `Transaction sent through Remix VM: ${txHash}`
                : `Rating stored successfully for ${movie.title}.`,
            "success"
        );
    } catch (error) {
        setStatus(error.message || "Transaction failed in Remix.", "error");
    } finally {
        movie.isBusy = false;
        renderMovies();
    }
}

movieList.addEventListener("click", async (event) => {
    const button = event.target.closest(".rating-action");
    if (!button) {
        return;
    }

    const movieId = button.dataset.movieId;
    const rating = Number(button.dataset.rating);
    await rateMovie(movieId, rating);
});

connectRemixBtn.addEventListener("click", connectToRemix);
refreshRatingsBtn.addEventListener("click", refreshAllRatings);

accountSelect.addEventListener("change", async (event) => {
    state.selectedAccount = event.target.value;
    updateConnectionView();

    if (state.remixReady && state.contractAddress) {
        await refreshAllRatings();
    }
});

contractAddressInput.addEventListener("change", () => {
    state.contractAddress = contractAddressInput.value.trim();
});

async function startApp() {
    try {
        await loadMovieCatalog();
        renderAccountOptions();
        renderMovies();
        updateConnectionView();
        setStatus("Movie catalog loaded. For real blockchain actions, connect this page to Remix and use a Remix VM account.", "neutral");
    } catch (error) {
        movieList.innerHTML = `<div class="result-box">Failed to load movies.</div>`;
        setStatus(error.message, "error");
    }
}

startApp();
