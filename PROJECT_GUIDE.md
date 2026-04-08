# 🎬 Decentralized Movie Rating System - Project Overview

## 📚 What is This Project?

A **decentralized movie rating system** built with **Solidity smart contracts** and a **web3 frontend** using ethers.js and MetaMask.

- Users connect their **MetaMask wallet**
- Rate movies with 1-5 stars
- Ratings stored **permanently on blockchain**
- Average rating calculated **on-chain**
- No central server - fully decentralized

---

## ⚡ 3-STEP QUICK START

### **STEP 1: Deploy Smart Contract in Remix**
```
1. Go to https://remix.ethereum.org
2. Create file: MovieRating.sol
3. Paste code from contracts/MovieRating.sol
4. Compiler: Select 0.8.0+
5. Click COMPILE
6. Click DEPLOY
7. ✅ Copy the contract address (0x...)
8. ✅ Click "Copy ABI" button
```

### **STEP 2: Update app.js**
```javascript
// Open app.js and find:

// Line ~8-44
const CONTRACT_ABI = [
    // PASTE YOUR ABI HERE (from Remix)
];

// Line ~50
const CONTRACT_ADDRESS = "0x..."; // PASTE YOUR ADDRESS HERE
```

### **STEP 3: Open in Browser & Connect Wallet**
```
1. Open index.html in browser
2. Click "Connect Wallet"
3. Select MetaMask account
4. Click "Connect"
5. 🎉 Start rating movies!
```

**That's it!** ✨

---

## 🏗️ Project Structure

```
movierating/
├── contracts/
│   └── MovieRating.sol          # Smart Contract (Solidity)
├── index.html                   # Frontend UI
├── style.css                    # Styling (Dark theme, IMDb-style)
├── app.js                       # Web3 Connection & Logic
├── DEPLOYMENT_GUIDE.md          # Detailed step-by-step setup
├── PROJECT_GUIDE.md             # Full project guide
└── README.md                    # This file
```

---

## 🔗 How It Works (Simple Explanation)

```
User clicks rating button
        ↓
JavaScript sends transaction to MetaMask
        ↓
MetaMask asks user to confirm
        ↓
Transaction sent to Blockchain
        ↓
Smart Contract updates storage
        ↓
UI refreshes with new average rating
```

---

## 🎯 Features

✅ Rate movies 1-5 stars  
✅ Prevent duplicate ratings  
✅ Calculate average automatically  
✅ Blockchain-based (decentralized)  
✅ Dark theme UI  
✅ MetaMask wallet integration  
✅ Works on Testnet/Mainnet  

---

## 🚀 Technology

| What | Technology |
|------|-----------|
| Smart Contracts | Solidity 0.8.0+ |
| Frontend | HTML5, CSS3, JavaScript |
| Web3 Integration | ethers.js v6 |
| Wallet | MetaMask |
| Blockchain | Ethereum |
| IDE | Remix |

---

## 🧪 Test It Out

**Test 1: Rate a Movie**
1. Click any star on a movie card
2. MetaMask confirms transaction
3. Rating shows on UI ✅

**Test 2: Average Rating**
1. Switch to different MetaMask account
2. Rate same movie differently
3. Average rating updates ✅

**Test 3: Duplicate Protection**
1. Try rating same movie twice (same account)
2. See error: "You have already rated this movie" ✅

---

## 📊 Smart Contract Functions

```solidity
// User ⭐ rates a movie
rateMovie(movieId, rating)  // Input: "movie1", 5

// Get average rating
getAverageRating(movieId)   // Output: 4.5

// Get raw data
getRatingData(movieId)      // Output: (totalRating, count)

// Check if rated
hasRated(movieId, user)     // Output: true/false
```

---

## 🎓 For Your College Submission

### **Required Files:**
✅ `contracts/MovieRating.sol`  
✅ `index.html`  
✅ `app.js`  
✅ `style.css`  
✅ `DEPLOYMENT_GUIDE.md`  
✅ `PROJECT_GUIDE.md`  

### **Demo for Viva:**
```
1. Show Remix with deployed contract
2. Explain contract code (5 min)
3. Open this UI
4. Connect MetaMask
5. Rate 2-3 movies (different accounts)
6. Show average updates
7. Try duplicate (show error)
8. Answer questions about blockchain
```

---

## ⚙️ Complete Setup Instructions

**For detailed steps:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

**For full project info:** See [PROJECT_GUIDE.md](PROJECT_GUIDE.md)

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| "ethers not loaded" | Check HTML has ethers.js script tag |
| "Contract not loaded" | Verify app.js has correct address & ABI |
| "Can't connect wallet" | Install MetaMask extension |
| "Already rated error" | ✅ This is correct! Feature works |
| "Network error" | Use testnet, get test ETH from faucet |

---

## 💡 What You'll Learn

- ✅ Write Solidity smart contracts
- ✅ Deploy using Remix IDE
- ✅ Connect frontend to blockchain
- ✅ Use ethers.js library
- ✅ Integrate MetaMask wallet
- ✅ Understand blockchain concepts
- ✅ Build DApp frontends
- ✅ Handle transactions

---

## 📚 Resources

- [Remix IDE](https://remix.ethereum.org)
- [MetaMask](https://metamask.io)
- [ethers.js Docs](https://docs.ethers.org)
- [Solidity Docs](https://docs.soliditylang.org)
- [Sepolia Testnet Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)

---

## 🎬 Next Steps (Optional)

- Add movie images
- Add user reviews
- Create admin panel
- Deploy on mainnet
- Add NFT voting
- Multi-chain support

---

**College Mini Project - Decentralized Movie Rating System**


3. Each card contains `1★` to `5★` buttons.
4. When a user clicks a rating button, MetaMask opens.
5. The rating is stored on blockchain using the movie's IMDb ID.
6. The app reads the updated average rating from the contract and refreshes the UI.

## Case Study

### Introduction

The Decentralized Movie Rating System is a mini project that combines a movie catalog frontend with blockchain-based ratings. Movies are loaded from a local movie catalog, while user ratings are stored in a smart contract.

### Problem Statement

Traditional movie review platforms are centralized. This can lead to fake reviews, duplicate ratings, and lack of transparency. Users have to trust the central system completely.

### Proposed Solution

This project separates movie data and rating data. Movie information is shown from a local catalog, and ratings are stored on blockchain using the movie's IMDb ID. This makes the rating process transparent and tamper-resistant.

### Objectives

- Build a simple blockchain-based movie rating system
- Display movie data in a clean frontend
- Store ratings on blockchain
- Prevent duplicate ratings from the same wallet
- Use IMDb ID as the unique movie identifier

### Tools Used

- Solidity
- Remix IDE
- MetaMask
- HTML
- CSS
- JavaScript
- ethers.js
- Local JSON movie catalog

### Working

1. User opens the website.
2. Movie cards are loaded from the local JSON file.
3. User connects MetaMask.
4. User loads the deployed contract.
5. User clicks a star rating for a movie.
6. The smart contract checks whether the same wallet already rated that movie.
7. If not, the contract stores the rating.
8. The frontend fetches the updated average rating and displays it.

### Advantages

- Transparent rating system
- Prevents duplicate rating by same wallet
- Movies are easy to manage in a local JSON file
- Smart contract stays simple because it stores only ratings
- Easy to explain in viva

### Limitations

- Requires MetaMask wallet
- Real blockchain networks need gas fees
- Average rating is returned as an integer
- Movie catalog is static unless JSON file is changed

### Conclusion

This project is a simple decentralized application that shows how blockchain can be used only for trusted rating storage, while movie details remain in a lightweight frontend catalog. It is suitable for a beginner-friendly college assignment.

## Viva Questions with Answers

### 1. Why are movies not stored on blockchain?

Movies are not stored on blockchain because storing large amounts of data on-chain is expensive and unnecessary. Only ratings need trust and transparency.

### 2. What is `movieId` in this project?

`movieId` is the IMDb ID of the movie, such as `tt0111161`. It is used as the unique key for ratings in the smart contract.

### 3. Why use a local movie catalog?

It keeps the project simple, stable, and easy to run without depending on third-party API keys or servers.

### 4. How is duplicate rating prevented?

The smart contract uses `mapping(string => mapping(address => bool))` to check whether a wallet has already rated a specific movie.

### 5. What does `rateMovie()` do?

It stores a user's rating for a movie and updates the total rating and rating count.

### 6. What does `getAverageRating()` do?

It returns the average rating for a movie by dividing total rating by rating count.

### 7. What is MetaMask used for?

MetaMask connects the user's wallet to the frontend and signs blockchain transactions.

### 8. Why is the rating limited from 1 to 5?

This project uses a simple 5-star rating system, so ratings outside this range are rejected.

### 9. Why is this project called decentralized?

The rating data is stored on blockchain, which is decentralized and transparent.

### 10. What is the main limitation of this project?

The movie list is static and the average rating is integer-based, but it keeps the project simple for learning.
