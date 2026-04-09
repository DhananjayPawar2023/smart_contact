# Deployment Guide

## Goal

Deploy the contract in Remix VM and use the frontend without MetaMask.

## 1. Start the Frontend

```bash
npm install
npm start
```

Open:

```text
http://127.0.0.1:8000
```

## 2. Deploy in Remix

1. Open Remix IDE.
2. Load `contracts/MovieRating.sol`.
3. Compile using Solidity `0.8.x`.
4. Go to `Deploy & Run Transactions`.
5. Select `Remix VM (London)`.
6. Click `Deploy`.

After deployment, copy the contract address from `Deployed Contracts`.

## 3. Open the UI Inside Remix

1. In Remix, open `Plugin Manager`.
2. Choose `Connect to a Local Plugin`.
3. Enter:

```text
http://127.0.0.1:8000
```

4. Open the plugin panel.
5. Click `Connect to Remix` inside the UI.

## 4. Use the Contract

1. Paste the deployed contract address into the UI.
2. Click `Refresh Ratings`.
3. Pick any Remix account from the dropdown.
4. Click a rating button on any movie card.

The transaction will be sent by Remix using the selected funded VM account.

## 5. Demo Tips

- Use Account 1 to rate a movie.
- Switch to Account 2 in the dropdown and rate the same movie again.
- Refresh ratings to show the new average.
- Switch back to Account 1 and show duplicate prevention.

## Troubleshooting

### Remix does not connect

- Make sure the UI is opened from Remix Plugin Manager, not only in a normal browser tab.
- Click `Connect to Remix` after the plugin panel opens.

### No accounts appear

- In Remix, use `Remix VM (London)`.
- Redeploy the contract if needed.

### Contract reads fail

- Check that the pasted contract address is the deployed address from the current Remix VM session.

### Rating buttons are disabled

- Connect to Remix first.
- Select a Remix account.
- Paste a valid contract address.
