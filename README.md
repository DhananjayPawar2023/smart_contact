# 🎬 MovieRating - Decentralized Movie Rating System

> A blockchain-based movie rating system using Solidity smart contracts and ethers.js

---

## 📸 Quick Preview

```
🎬 MovieRating
Decentralized Rating System on Blockchain

✅ 0xAbcd...1234 [Connect Wallet]

🍿 Rate Movies

Movie 1: Inception
⭐⭐⭐⭐☆ (4.0 from 8 ratings)
[1⭐] [2⭐] [3⭐] [4⭐] [5⭐]

Movie 2: The Dark Knight
⭐⭐⭐⭐⭐ (4.8 from 12 ratings)
[1⭐] [2⭐] [3⭐] [4⭐] [5⭐]
```

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Deploy Smart Contract
```bash
1. Go to https://remix.ethereum.org
2. Upload: contracts/MovieRating.sol
3. Compile (Solidity 0.8.0+)
4. Deploy to Sepolia testnet with MetaMask
5. Copy contract address (0x...)
6. Copy ABI
```

### Step 2: Update app.js
```javascript
// Line ~50
const CONTRACT_ADDRESS = "0x..."; // Your address

// Line ~8-44
const CONTRACT_ABI = [...]; // Your ABI
```

### Step 3: Open & Connect
```bash
1. Open index.html in browser
2. Click "Connect Wallet"
3. Select MetaMask account
4. Start rating movies!
```

---

## 📚 Documentation

| Document | Content |
|----------|---------|
| [QUICK_CONNECT_GUIDE.md](QUICK_CONNECT_GUIDE.md) | **5-minute setup guide** ⚡ |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | **Detailed deployment steps** 📋 |
| [PROJECT_GUIDE.md](PROJECT_GUIDE.md) | **Full project overview** 📖 |
| [VIVA_QUESTIONS.md](VIVA_QUESTIONS.md) | **Q&A for college viva** 🎓 |
| [CASE_STUDY.md](CASE_STUDY.md) | **Complete case study** 📊 |

---

## 🏗️ Project Structure

```
movierating/
├── contracts/
│   └── MovieRating.sol              ← Smart Contract
├── index.html                       ← Frontend UI
├── app.js                           ← Web3 Logic (UPDATE THIS)
├── style.css                        ← Styling
├── QUICK_CONNECT_GUIDE.md           ← 5-min setup
├── DEPLOYMENT_GUIDE.md              ← Detailed setup
├── PROJECT_GUIDE.md                 ← Full guide
├── VIVA_QUESTIONS.md                ← Q&A for viva
├── CASE_STUDY.md                    ← Case study
└── README.md                        ← This file
```

---

## 🔗 How It Works

```
User connects MetaMask wallet
        ↓
User rates movie (1-5 stars)
        ↓
JavaScript prepares transaction
        ↓
ethers.js sends to MetaMask
        ↓
MetaMask asks for confirmation
        ↓
User approves
        ↓
Transaction sent to blockchain
        ↓
Smart contract stores rating
        ↓
UI updates with average rating
```

---

## ✨ Features

✅ **Decentralized**
- No central database
- Smart contract is authority
- Fully transparent

✅ **Fair Rating System**
- One user = one vote per movie
- Automatic duplicate prevention
- Average calculated on-chain

✅ **MetaMask Integration**
- One-click wallet connection
- Secure transaction signing
- Multi-account support

✅ **User-Friendly UI**
- Dark theme (like IMDb)
- Clear rating buttons
- Real-time updates
- Mobile responsive

✅ **Educational**
- Well-commented code
- Comprehensive documentation
- Perfect for college projects

---

## 🚀 Deployment Options

### **Option 1: Sepolia Testnet (Recommended for Learning)**
- ✅ Free to test
- ✅ No real money
- ✅ Same as mainnet
- ✅ Fast transactions

### **Option 2: Ethereum Mainnet**
- ⚠️ Real money required
- ⚠️ Higher gas fees
- ⚠️ Not recommended for college project

### **Option 3: Polygon Network**
- ✅ Very cheap gas
- ✅ Fast transactions
- ✅ Good for scaling

---

## 🧪 Test It

### **Test Case 1: Single Rating**
```
1. Connect wallet
2. Rate "Inception" with 5 stars
3. Check: Shows 5.0 rating
```

### **Test Case 2: Multiple Ratings**
```
1. Rate movie with 5 stars
2. Switch MetaMask account
3. Rate same movie with 3 stars
4. Check: Shows 4.0 average
```

### **Test Case 3: Duplicate Prevention**
```
1. Rate movie with Account A
2. Try rating again with Account A
3. Check: Error "Already rated"
```

---

## 📊 Smart Contract Functions

```solidity
// Rate a movie (1-5 stars)
rateMovie(movieId, rating)

// Get average rating
getAverageRating(movieId)

// Get total & count
getRatingData(movieId)

// Check if user rated
hasRated(movieId, user)
```

---

## 💻 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Smart Contract** | Solidity 0.8.0+ |
| **Frontend** | HTML5, CSS3, JavaScript |
| **Web3 Library** | ethers.js v6 |
| **Wallet** | MetaMask |
| **Blockchain** | Ethereum/Sepolia |
| **IDE** | Remix |

---

## 🎓 For College Submission

### **What to Submit:**
1. ✅ `contracts/MovieRating.sol`
2. ✅ `index.html`
3. ✅ `app.js`
4. ✅ `style.css`
5. ✅ All `.md` files

### **Demo for Viva (3-5 minutes):**
1. Show Remix with deployed contract
2. Explain contract code
3. Open frontend UI
4. Connect MetaMask
5. Rate 2 movies (different accounts)
6. Show duplicate prevention
7. Explain what you learned

### **Key Points to Mention:**
- "Decentralized rating system on blockchain"
- "Prevents manipulation with smart contracts"
- "Integrated with MetaMask for security"
- "Used ethers.js for frontend connection"
- "Ratings stored permanently & immutably"

---

## ⚠️ Troubleshooting

| Error | Solution |
|-------|----------|
| "ethers not loaded" | Add script tag in HTML |
| "Contract not loaded" | Check address & ABI in app.js |
| "Can't connect" | Install MetaMask & get test ETH |
| "Already rated" | This is correct! Feature works |
| "Network error" | Use Sepolia testnet, not mainnet |

**Need more help?** → See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 📚 Resources

- **Remix IDE:** https://remix.ethereum.org
- **MetaMask:** https://metamask.io
- **ethers.js:** https://docs.ethers.org
- **Solidity Docs:** https://docs.soliditylang.org
- **Sepolia Faucet:** https://www.alchemy.com/faucets/ethereum-sepolia
- **Block Explorer:** https://sepolia.etherscan.io

---

## 💡 Next Steps

### **Immediate:**
1. Read [QUICK_CONNECT_GUIDE.md](QUICK_CONNECT_GUIDE.md)
2. Deploy contract in Remix
3. Update app.js with address & ABI
4. Test in browser

### **Before Submission:**
1. Read [PROJECT_GUIDE.md](PROJECT_GUIDE.md)
2. Read [CASE_STUDY.md](CASE_STUDY.md)
3. Finish [VIVA_QUESTIONS.md](VIVA_QUESTIONS.md)
4. Practice demo

### **For Learning:**
1. Study Solidity code
2. Understand ethers.js
3. Learn MetaMask flow
4. Explore block explorer

---

## 🎯 Key Concepts Explained

### **Smart Contract**
Self-executing code deployed on blockchain. Cannot be changed once deployed.

### **Blockchain**
Distributed ledger where transactions are permanent and transparent.

### **Gas Fees**
Cost of CPU/storage on blockchain. Paid in ETH to miners.

### **MetaMask**
Wallet that manages private keys and signs transactions securely.

### **ethers.js**
JavaScript library that lets web apps talk to blockchain.

### **Web3**
Ecosystem of decentralized apps on blockchain.

---

## 📈 System Architecture

```
┌─────────────────────────────────────────┐
│        Browser (Your Computer)          │
├─────────────────────────────────────────┤
│  ┌──────────────┐     ┌──────────────┐  │
│  │   index.html │────→│   app.js     │  │
│  │   style.css  │     └────────┬──────┘  │
│  └──────────────┘              │        │
│                        ethers.js│       │
└────────────────────────────────┼────────┘
                                 │
                          ┌──────↓──────┐
                          │   MetaMask  │
                          │   Wallet    │
                          └──────┬──────┘
                                 │
                    ┌────────────↓─────────────┐
                    │ Ethereum Blockchain     │
                    │ (Sepolia Testnet)       │
                    │                         │
                    │  ┌───────────────────┐  │
                    │  │  MovieRating.sol  │  │
                    │  │  Smart Contract   │  │
                    │  └───────────────────┘  │
                    └─────────────────────────┘
```

---

## 🎬 Movie Examples

Your UI comes with 3 sample movies:
- **Inception** - "A mind-bending sci-fi thriller"
- **The Dark Knight** - "Batman faces his greatest challenge"
- **Interstellar** - "Humanity's journey beyond the stars"

You can:
- Rate each movie 1-5 stars
- See average rating from all users
- Try rating twice (error prevention)
- Switch accounts to test multiple ratings

---

## ✅ Checklist Before Submission

- [ ] Smart contract deployed in Remix
- [ ] Contract address copied
- [ ] ABI copied from Remix
- [ ] app.js updated with address on line ~50
- [ ] app.js updated with ABI on lines ~8-44
- [ ] index.html opens in browser
- [ ] "Connect Wallet" button appears
- [ ] Can connect to MetaMask
- [ ] Can rate movies
- [ ] MetaMask shows transaction
- [ ] Rating updates on UI
- [ ] Tried duplicate rating (error shown)
- [ ] Switched accounts & rated again
- [ ] Average rating shows correctly
- [ ] Read all documentation
- [ ] Ready for viva demo

---

## 🎓 Educational Value

This project teaches:

### **Blockchain Concepts**
- ✅ What is blockchain?
- ✅ How transactions work?
- ✅ What is immutability?
- ✅ How consensus works?

### **Smart Contracts**
- ✅ Write Solidity code
- ✅ Deploy contracts
- ✅ Call functions
- ✅ Store data

### **Web3 Development**
- ✅ Connect to blockchain
- ✅ Handle transactions
- ✅ Use wallet
- ✅ Parse responses

### **Full Stack DApp**
- ✅ Frontend design
- ✅ Backend (smart contract)
- ✅ Integration
- ✅ Testing

---

## 💬 Get Help

### **Quick Questions:**
Check [QUICK_CONNECT_GUIDE.md](QUICK_CONNECT_GUIDE.md)

### **Setup Issues:**
Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

### **Understanding Project:**
Check [PROJECT_GUIDE.md](PROJECT_GUIDE.md)

### **For Viva:**
Check [VIVA_QUESTIONS.md](VIVA_QUESTIONS.md)

### **Full Explanation:**
Check [CASE_STUDY.md](CASE_STUDY.md)

---

## 📝 License

Educational - Free to use and modify

---

## 👨‍💼 About This Project

**Created for:** College Mini Project  
**Course:** Decentralized Application Development  
**Difficulty Level:** Beginner-Friendly  
**Time to Complete:** 1-2 hours  
**Skills Gained:** Blockchain, Web3, Solidity, JavaScript  

---

## 🚀 You're Ready!

1. **Deploy in Remix** (5 minutes)
2. **Update app.js** (2 minutes)
3. **Test in browser** (3 minutes)
4. **Demo for professor** (5 minutes)
5. **🎉 Get full marks!** ✨

---

**Happy coding!** 🎬

Need help? Check the documentation files above! ↑

