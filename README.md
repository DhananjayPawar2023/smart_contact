# Movie Rating with Remix VM

This project is now a simple college-ready DApp:

- movie list is loaded from `data/movies.json`
- ratings are stored on-chain in `contracts/MovieRating.sol`
- no MetaMask setup is required
- all transactions can be sent from Remix VM funded accounts through the UI

## What Was Fixed

The previous repo had two conflicting versions:

- docs were written for MetaMask and manual ABI/address editing
- frontend was only a fake demo and did not talk to the contract

This version uses one real flow based on Remix VM.

## Run

```bash
npm install
npm start
```

Server URL:

```text
http://127.0.0.1:8000
```

## Simple Remix Flow

1. Open Remix IDE.
2. Open `contracts/MovieRating.sol`.
3. Compile with Solidity `0.8.x`.
4. In `Deploy & Run Transactions`, choose `Remix VM (London)`.
5. Deploy the contract.
6. Open Plugin Manager in Remix.
7. Use `Connect to a Local Plugin` and enter `http://127.0.0.1:8000`.
8. In the UI, click `Connect to Remix`.
9. Paste the deployed contract address from Remix.
10. Click `Refresh Ratings`.
11. Choose any Remix VM account and rate movies from the UI.

## Project Structure

```text
movierating/
├── contracts/MovieRating.sol
├── index.html
├── app.js
├── style.css
├── server.js
├── data/movies.json
└── posters/
```

## Smart Contract

Main functions:

- `rateMovie(movieId, rating)`
- `getRatingData(movieId)`
- `getAverageRating(movieId)`
- `hasRated(movieId, user)`

The contract stores ratings by IMDb ID and prevents duplicate rating from the same account.

## Notes

- Use Remix VM accounts to test multiple users.
- Each Remix VM account already has test ETH inside Remix.
- No wallet popup is needed in this version.
- If the UI is opened outside Remix, movie cards still load but on-chain actions stay disabled until Remix connection is active.
