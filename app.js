let movies = [];

const movieList = document.getElementById("movieList");
const statusMessage = document.getElementById("statusMessage");
const resetDemoBtn = document.getElementById("resetDemoBtn");

function setStatus(message) {
    statusMessage.textContent = message;
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
    return "★".repeat(filled) + "☆".repeat(5 - filled);
}

async function loadMovieCatalog() {
    const response = await fetch("data/movies.json");
    if (!response.ok) {
        throw new Error("Could not load local movie catalog");
    }

    const data = await response.json();
    movies = data.slice(0, 10).map((movie) => ({
        ...movie,
        demoTotal: 0,
        demoCount: 0
    }));
}

function createMovieCard(movie) {
    const average = movie.demoCount === 0 ? 0 : movie.demoTotal / movie.demoCount;
    const buttons = [1, 2, 3, 4, 5]
        .map((rating) => `<button onclick="rateMovieDemo('${movie.imdbID}', ${rating})">${rating}★</button>`)
        .join("");

    return `
        <article class="movie-card">
            <img class="movie-poster" src="${escapeHtml(movie.poster)}" alt="${escapeHtml(movie.title)} poster">
            <div class="movie-content">
                <span class="movie-id">${escapeHtml(movie.imdbID)}</span>
                <h3 class="movie-title">${escapeHtml(movie.title)}</h3>
                <p class="movie-year">Year: ${escapeHtml(movie.year)}</p>
                <p class="movie-description">Frontend demo card for presentation. Real rating logic is tested in Remix VM.</p>
                <div class="movie-meta">
                    <span class="movie-rating">${average.toFixed(1)}/5</span>
                    <span class="movie-count">${movie.demoCount} demo vote(s)</span>
                </div>
                <div class="star-strip">${buildStars(average)}</div>
                <div class="rate-actions">${buttons}</div>
                <p class="rate-note">Demo only. Use Remix VM for actual blockchain execution.</p>
            </div>
        </article>
    `;
}

function renderMovies() {
    movieList.innerHTML = movies.map(createMovieCard).join("");
}

function rateMovieDemo(movieId, rating) {
    const movie = movies.find((item) => item.imdbID === movieId);
    if (!movie) {
        setStatus("Movie not found.");
        return;
    }

    movie.demoTotal += rating;
    movie.demoCount += 1;
    renderMovies();
    setStatus(`Demo rating added for ${movie.title}: ${rating} star(s).`);
}

function resetDemoRatings() {
    movies = movies.map((movie) => ({
        ...movie,
        demoTotal: 0,
        demoCount: 0
    }));
    renderMovies();
    setStatus("Demo ratings reset.");
}

async function startApp() {
    try {
        await loadMovieCatalog();
        renderMovies();
        setStatus("Demo UI loaded successfully. No ethers.js is used in this version.");
    } catch (error) {
        movieList.innerHTML = `<div class="result-box">Failed to load demo movies.</div>`;
        setStatus(error.message);
    }
}

resetDemoBtn.addEventListener("click", resetDemoRatings);
window.rateMovieDemo = rateMovieDemo;

startApp();
