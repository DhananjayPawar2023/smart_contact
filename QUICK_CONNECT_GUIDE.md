# Quick Connect Guide

## Fastest Working Setup

1. Run:

```bash
npm install
npm start
```

2. Open Remix IDE.
3. Compile `contracts/MovieRating.sol`.
4. Deploy with `Remix VM (London)`.
5. Copy the deployed contract address.
6. In Remix Plugin Manager, use `Connect to a Local Plugin`.
7. Enter:

```text
http://127.0.0.1:8000
```

8. Inside the UI, click `Connect to Remix`.
9. Paste the contract address.
10. Click `Refresh Ratings`.
11. Choose any Remix account and rate a movie.

## Important

- No MetaMask is needed.
- Remix VM accounts already have demo ETH.
- Ratings are stored by the smart contract, not by the frontend.
