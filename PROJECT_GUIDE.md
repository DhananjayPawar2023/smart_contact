# Project Guide

## Overview

This is a simple decentralized movie rating system for a college mini project.

- local frontend shows a fixed movie catalog
- Solidity contract stores ratings on blockchain
- Remix VM provides funded demo accounts
- frontend sends contract calls through Remix, not through MetaMask

## Why This Design

This keeps the project easy to run and easy to explain:

- no wallet installation
- no testnet faucet
- no ABI pasting into source code
- no fake demo mode for ratings

You only deploy in Remix and use the contract address in the UI.

## Architecture

### Frontend

- `index.html`: structure and instructions
- `style.css`: simple responsive UI
- `app.js`: loads movies, connects to Remix, reads ratings, sends transactions

### Smart Contract

- `contracts/MovieRating.sol`

Stores:

- total rating per movie
- rating count per movie
- duplicate rating check per account

### Data

- `data/movies.json`

This file contains the movie catalog and poster paths. Ratings are not stored here.

## User Flow

1. Start the local server.
2. Open the UI from Remix Plugin Manager.
3. Deploy the contract in Remix VM.
4. Paste the deployed address into the UI.
5. Select a Remix account.
6. Rate movies from the frontend.

## Contract Logic

### `rateMovie(string movieId, uint256 rating)`

- accepts ratings from `1` to `5`
- rejects empty movie IDs
- blocks duplicate rating from the same account

### `getRatingData(string movieId)`

Returns:

- `totalRating`
- `ratingCount`

### `getAverageRating(string movieId)`

Returns integer average from on-chain values.

### `hasRated(string movieId, address user)`

Checks whether a specific account already rated a movie.

## What Was Wrong Before

The repo previously had these problems:

- docs described a MetaMask app
- frontend only simulated ratings locally
- UI and contract behavior did not match
- instructions referenced functions that do not exist in the contract

## What Is Fixed Now

- UI reads and writes real contract data
- Remix VM accounts are selectable in the frontend
- no wallet onboarding is needed
- deployment steps are short and consistent

## Suitable Demo

For a viva or class demo:

1. Show the contract in Remix.
2. Deploy in Remix VM.
3. Open the frontend in Remix.
4. Rate a movie with one account.
5. Switch to another Remix account and rate again.
6. Show updated average and duplicate prevention.
