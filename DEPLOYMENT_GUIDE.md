# 🎬 MovieRating - Deployment & Connection Guide

## 📍 Quick Setup (5 Minutes)

### **Step 1: Deploy Smart Contract in Remix** ⚙️

1. Go to [Remix IDE](https://remix.ethereum.org)
2. Create new file: `MovieRating.sol`
3. Paste the code from `/contracts/MovieRating.sol`
4. In **Compiler** tab:
   - Select Compiler Version: `0.8.0` or higher
   - Click **Compile MovieRating.sol**
5. In **Deploy & Run Transactions** tab:
   - Environment: Select `Injected Provider - MetaMask` OR `Remix VM (London)`
   - Click **Deploy**

### **Step 2: Copy Contract Address** 📋

After deployment:
1. Look at **Deployed Contracts** (bottom left)
2. Copy the contract address (starts with `0x...`)
3. Save it somewhere - you'll need it next

### **Step 3: Copy Contract ABI** 📋

1. In **Compiler** tab, find the compiled contract
2. Click the **Copy ABI** button (small icon)
3. Save the ABI text

### **Step 4: Update `app.js`** 🔧

Open `app.js` in any text editor:

#### **Line 8-44: Replace ABI**
```javascript
const CONTRACT_ABI = [
    // PASTE THE ABI YOU COPIED HERE
];
```

**Example:**
```javascript
const CONTRACT_ABI = [
    {
        "inputs": [...],
        "name": "rateMovie",
        ...
    },
    // ... more functions
];
```

#### **Line 50: Replace Contract Address**
```javascript
const CONTRACT_ADDRESS = "0x"; // <- REPLACE THIS
```

**Example:**
```javascript
const CONTRACT_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f2e2"; // Your actual address
```

### **Step 5: Open in Browser** 🌐

1. Open `index.html` in a web browser
2. You should see: **"🔹 Ready! Click 'Connect Wallet' to start rating movies."**

### **Step 6: Connect Wallet** 🔐

1. Click **"Connect Wallet"** button
2. MetaMask popup appears
3. Select account and click **"Connect"**
4. Status should show: **"✅ Connected: 0x..."**

### **Step 7: Rate a Movie** ⭐

1. Click any star rating button on a movie card
2. MetaMask popup appears to confirm transaction
3. Click **"Confirm"**
4. Wait for transaction to complete
5. Rating displays on the UI

---

## 🛠️ Detailed Steps

### **Using MetaMask (Testnet)**

**Setup:**
1. Install [MetaMask](https://metamask.io)
2. Create wallet
3. Switch to **Sepolia** or **Mumbai** testnet
4. Get test ETH from [Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)

**Deploy:**
1. In Remix, select **Injected Provider - MetaMask** as environment
2. Deploy contract
3. Copy address and ABI

**Connect:**
1. Follow Step 4-7 above

### **Using Remix VM (No MetaMask)**

**Setup:**
1. Environment: Select **Remix VM (London)**
2. Deploy contract
3. Copy address and ABI

**Note:** Remix VM is for testing only. Transactions won't persist.

---

## 📱 Complete File Structure

```
movierating/
├── contracts/
│   └── MovieRating.sol          ← Smart Contract
├── index.html                   ← Frontend UI
├── style.css                    ← Styling
├── app.js                       ← Connection Code (UPDATE THIS)
├── DEPLOYMENT_GUIDE.md          ← This file
└── PROJECT_GUIDE.md             ← Project Overview
```

---

## ✅ Verification Checklist

- [ ] Contract deployed in Remix
- [ ] Contract address copied (starts with 0x)
- [ ] ABI copied from Remix
- [ ] `app.js` line 50: Contract address updated
- [ ] `app.js` line 8-44: ABI pasted
- [ ] `index.html` opened in browser
- [ ] "Connect Wallet" button visible
- [ ] Can connect MetaMask wallet
- [ ] Can see wallet address in UI
- [ ] Can click rating buttons
- [ ] Transaction appears in MetaMask
- [ ] Rating is stored (no duplicate error on second rating)

---

## 🐛 Troubleshooting

### **"ethers.js not loaded"**
- Issue: Script not loaded
- Fix: Check `index.html` has `<script src="https://cdnjs.cloudflare.com/ajax/libs/ethers.js/6.4.0/ethers.umd.min.js"></script>`

### **"Contract not loaded. Check console for errors."**
- Issue: Wrong contract address or ABI
- Fix: Check browser console (F12) for errors
- Verify contract address starts with `0x`

### **"Only admin can perform this action"**
- Issue: Using wrong wallet account
- Fix: Use same MetaMask account that deployed contract
- Or deploy contract with the account you're using

### **"You have already rated this movie"**
- Issue: User already rated this movie
- Fix: Feature works! User can update rating (call `updateRating` function)

### **Network Mismatch**
- Issue: Contract on Sepolia, MetaMask on Mumbai
- Fix: Ensure both are on same network

---

## 📊 Testing Flow

### **Test 1: Single Rating**
1. Connect wallet
2. Rate "Inception" with 5 stars
3. Check: Rating shows "5.0" in UI

### **Test 2: Two Ratings**
1. Rate "Dark Knight" with 4 stars
2. Switch to different MetaMask account
3. Rate same movie with 3 stars
4. Check: Average shows "3.5"

### **Test 3: Prevent Duplicates**
1. Rate movie with first account
2. Try rating same movie again with same account
3. Check: Error appears "You have already rated this movie"

### **Test 4: Update Rating**
1. Rate movie with 3 stars
2. Rate same movie with 5 stars
3. Check: Rating updates to 5 stars

---

## 🎯 For Viva/Presentation

**Demo Script:**
1. Show deployed contract in Remix
2. Explain contract code (functions, modifiers, events)
3. Show this UI
4. Rate 2-3 movies with different accounts
5. Show average ratings update
6. Try to rate twice (show error)
7. Explain blockchain integration

**Key Points to Mention:**
- ✅ "This is a decentralized rating system"
- ✅ "Ratings are stored on blockchain"
- ✅ "No central server - only smart contract"
- ✅ "Each user can rate each movie only once"
- ✅ "Connected via ethers.js and MetaMask"
- ✅ "Average rating calculated on-chain"

---

## 📝 Notes

- **Gas Fees**: Each transaction costs gas (small amount of ETH)
- **Testnet**: Use testnet (Sepolia/Mumbai) for free testing
- **Mainnet**: Deploying on Ethereum mainnet costs real ETH - not recommended for college project
- **Persistence**: Contract storage is permanent (unless you deploy new contract)

---

## 🔗 Useful Links

- [Remix IDE](https://remix.ethereum.org)
- [MetaMask](https://metamask.io)
- [Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Mumbai Faucet](https://faucet.polygon.technology/)
- [ethers.js Docs](https://docs.ethers.org/)

---

## 💡 Next Steps (Optional Enhancements)

- Add movie images/posters
- Add movie search functionality
- Add user review text
- Deploy on mainnet (costs real money)
- Add admin panel to add movies
- Add blockchain explorer link to verify transactions

---

**Created for College Mini Project**  
**Decentralized Movie Rating System**

