# 🎓 VIVA QUESTIONS & ANSWERS

## 📚 10 Must-Know Questions for Your College Viva

---

## ❓ Question 1: What is a Smart Contract?

**Q:** *What is a smart contract? Explain in simple terms.*

**A:** 
A smart contract is a program that runs on the blockchain. It's like a super reliable robot that:
- Executes predefined rules automatically
- Cannot be changed once deployed
- Runs the same way for everyone
- Costs gas fees to execute

**Example:** Our MovieRating contract automatically stores ratings and prevents duplicate ratings (one user = one rating per movie).

**Key point:** "No human interference needed - the code is the authority."

---

## ❓ Question 2: Why Use Blockchain for Ratings?

**Q:** *Why did you use blockchain instead of a normal database?*

**A:**
Normal Database | Blockchain
---|---
Controlled by company | No single authority
Can be changed anytime | Permanent, immutable
User must trust company | Transparent, trustless
Centralized | Decentralized

**Our advantage:**
- Ratings cannot be deleted or changed
- No fake reviews (one address = one vote)
- Movie studios can't manipulate ratings
- Anyone can verify the ratings

**Real world example:** IMDb and other rating sites can be manipulated. Blockchain prevents this.

---

## ❓ Question 3: What is Gas Fee?

**Q:** *What are gas fees? Why do transactions cost money?*

**A:**
- **Gas = Cost of computation** on blockchain
- Every operation uses computing resources
- You pay for those resources
- Measured in ETH (Ethereum's currency)

**Example:**
```
rateMovie() function = ~60,000 gas
1 gas = 0.000001 ETH (approx)
Total = about $0.01 - $1 USD (depends on network)
```

**Why it exists:**
- Prevents spam/attacks
- Rewards miners/validators
- Ensures efficient code

**On testnet:** Gas is FREE! Use Sepolia testnet for practice.

---

## ❓ Question 4: How Does Admin Control Work?

**Q:** *How does the admin system prevent spam in your contract?*

**A:**
Currently in your contract, there's **NO admin control for adding movies** because the contract uses string IDs.

But if we had admin control (like in traditional contracts):

```solidity
modifier onlyAdmin() {
    require(msg.sender == admin, "Only admin can do this");
    _;
}

function addMovie(...) onlyAdmin {
    // Only admin can add movies
}
```

**Benefits:**
- Only trusted person adds movies
- Prevents fake movies
- Quality control

**Your current contract:**
- Any user can rate any movie
- Ratings are democratic
- No admin needed for ratings ✅

---

## ❓ Question 5: How Is Average Rating Calculated?

**Q:** *How does your contract calculate average rating? Is it on-chain or off-chain?*

**A:**
**On-chain calculation:**

```solidity
function getAverageRating(movieId) {
    if (ratingCount == 0) return 0;
    return totalRating / ratingCount;
    // Example: (5+4+3) / 3 = 4.0
}
```

**Process:**
1. User rates: stores rating
2. Total increases (5+4+3 = 12)
3. Count increases (3)
4. Average = 12 / 3 = 4.0

**Advantages:**
- Calculation is transparent
- Anyone can verify
- No manipulation possible
- Stored permanently

---

## ❓ Question 6: How Does MetaMask Work?

**Q:** *What role does MetaMask play in your project?*

**A:**
MetaMask is the **wallet + key manager**.

**What it does:**
1. **Stores private keys** (securely)
2. **Signs transactions** (approves them)
3. **Connects to blockchain** (acts as bridge)
4. **Manages accounts** (multiple wallets)

**How it works in your app:**
```
User clicks "Rate Movie"
    ↓
app.js sends transaction to MetaMask
    ↓
MetaMask shows popup: "Confirm? Cost: 0.001 ETH"
    ↓
User clicks "Confirm"
    ↓
MetaMask signs with private key
    ↓
Transaction sent to blockchain
    ↓
UI updates with new rating
```

**Key point:** "MetaMask is the bridge between your app and the blockchain."

---

## ❓ Question 7: What is ethers.js?

**Q:** *Why do you use ethers.js? What does it do?*

**A:**
ethers.js is a **JavaScript library** that lets web apps talk to blockchain.

**Without ethers.js:**
- Must write complex code to connect to blockchain
- Handle transactions manually
- Manage cryptography yourself

**With ethers.js:**
```javascript
// One line to create contract connection
const contract = new ethers.Contract(address, ABI, signer);

// One line to send transaction
await contract.rateMovie(movieId, rating);
```

**What ethers.js provides:**
- Connect to Ethereum nodes
- Create transactions
- Call smart contract functions
- Handle wallet connections
- Parse responses

**Alternative:** web3.js (does the same thing)

---

## ❓ Question 8: How Do You Prevent Duplicate Ratings?

**Q:** *How does your contract prevent users from rating the same movie twice?*

**A:**
Your contract uses a **mapping to track who rated what**:

```solidity
mapping(uint256 => mapping(address => bool)) public hasRated;
   ↓              ↓                 ↓
 movieId    userAddress        didRate?
```

**Prevention logic:**
```solidity
function rateMovie(movieId, rating) {
    // Check if user already rated
    require(!hasRated[movieId][msg.sender], 
            "Already rated!");
    
    // If not, store rating
    hasRated[movieId][msg.sender] = true;
    totalRating += rating;
}
```

**Example:**
- Address 0x123 rates Movie 1 ✅ (first time)
- Address 0x123 tries again ❌ (error!)
- Different address rates Movie 1 ✅ (allowed)

**Why it matters:**
- Prevents one person voting multiple times
- Fair voting system
- Can't manipulate ratings

---

## ❓ Question 9: Hybrid System (Blockchain + Database)

**Q:** *Why might you use both blockchain and database (hybrid)?*

**A:**
**Blockchain is expensive, database is cheap:**

| What to store | Where | Why |
|---|---|---|
| **Ratings** | Blockchain | Important, permanent, need trust |
| **Movie details** (name, poster, description) | Database | Not critical, cheaper |
| **User profiles** | Database | Useful, doesn't need blockchain |

**Hybrid approach:**
```
Database (MongoDB)
├── Movie name: "Inception"
├── Description: "A mind-bending..."
└── Poster: "image.jpg"

Blockchain (Smart Contract)
├── Rating from User A: 5
├── Rating from User B: 4
└── Average: 4.5
```

**Cost comparison:**
- 1 blockchain transaction = $0.01 - $1
- 1 database operation = Free

**When to use hybrid:**
- ✅ Critical data → Blockchain
- ✅ Non-critical data → Database
- ✅ User preferences → Database
- ✅ Votes/ratings/proofs → Blockchain

**Your current project:** Only blockchain (ratings only) ✅

---

## ❓ Question 10: What Are the Advantages of This System?

**Q:** *What are the main advantages of using blockchain for movie ratings?*

**A:**

| Advantage | Explanation |
|---|---|
| **Immutable** | Ratings can't be deleted or changed |
| **Transparent** | Anyone can verify all ratings |
| **Decentralized** | No central authority controls ratings |
| **Trustless** | No need to trust a company |
| **Fraud-proof** | One address = one vote per movie |
| **Permanent** | Ratings exist forever on blockchain |
| **Verifiable** | Can check transaction on block explorer |
| **Democratic** | Every user has equal voting power |

**Real-world advantage:**
- IMDb ratings can be bought/manipulated
- Your contract prevents this automatically

---

## 🎯 Bonus Questions (If Asked)

### **Q11: What is the difference between view and non-view functions?**

**A:**
```solidity
// VIEW function (read-only, no gas cost)
function getAverageRating(movieId) public view returns (uint) {
    return ...;
}

// NON-VIEW function (writes data, costs gas)
function rateMovie(movieId, rating) public {
    // Stores data on blockchain
}
```

- **View:** Only reads, free ✅
- **Non-view:** Writes data, costs gas 💰

---

### **Q12: What is an event?**

**A:**
Events are **notifications** that broadcast something happened:

```solidity
event MovieRated(string movieId, address user, uint rating);

// When you rate:
emit MovieRated("movie1", 0x123..., 5);
// Everyone gets notified!
```

**Why use events:**
- Log transactions
- Notify frontend UI
- Easy to search/filter
- Free to emit! (included in gas)

---

### **Q13: What is the ABI?**

**A:**
ABI = **Application Binary Interface**

It's a JSON that tells your app **what functions exist** in the contract.

```json
{
  "name": "rateMovie",
  "inputs": ["movieId", "rating"],
  "outputs": []
}
```

**Why needed:**
- App needs to know function names
- App needs to know parameter types
- App needs to know return types

---

### **Q14: Is your contract secure?**

**A:**
**For college project:** Yes ✅

**For real money:** No ⚠️

**Issues/Not implemented:**
- ❌ No input validation
- ❌ No access control
- ❌ No reentrancy protection
- ❌ No integer overflow checks (Solidity 0.8+ has this)
- ✅ Basic functionality works

**To make production-ready:**
- Add more tests
- External audit
- Bug bounty program
- Formal verification

---

## 🗣️ How to Present in Viva

### **Demo (2-3 minutes):**
1. Open Remix → Show deployed contract
2. Show contract code → Explain 3 main functions
3. Open your UI
4. Connect MetaMask
5. Rate 2 movies from different accounts
6. Show average updates
7. Try duplicate (show error)

### **Explanation (3-5 minutes):**
1. "This is a decentralized movie rating system"
2. "Ratings stored on blockchain"
3. "No central server needed"
4. "Uses smart contract to prevent duplicates"
5. "MetaMask handles wallet security"
6. "ethers.js connects frontend to blockchain"

### **Be Ready for Questions:**
- "Why blockchain?" → Immutability, trust, fairness
- "Why not database?" → Need decentralization
- "How much does it cost?" → 0.001-0.1 USD per rating
- "Can ratings be faked?" → No, blockchain is transparent
- "How does it make money?" → College project, educational only

---

## 🎓 Final Tips for Viva

✅ **Do:**
- Show enthusiasm for blockchain
- Explain clearly (not too technical)
- Have your code ready
- Know your contract functions
- Practice the demo beforehand
- Have answers memorized

❌ **Don't:**
- Use jargon without explaining
- Say "I don't know"
- Blame code on Stack Overflow
- Make up answers
- Read from notes
- Defend if contract is too simple (it's intentionally simple)

---

## 📝 Sample Viva Script

**Professor:** "Explain your project."

**You:** 
> "I built a decentralized movie rating system using blockchain. Users connect their MetaMask wallet and rate movies from 1 to 5 stars. Ratings are stored permanently on a smart contract. The system prevents duplicate ratings - one user can only rate each movie once. Average rating is calculated automatically on-chain. It's like IMDb but decentralized and fair."

**Professor:** "Why blockchain?"

**You:**
> "Traditional systems like IMDb can be manipulated or changed. With blockchain, ratings are immutable and transparent. No company can delete or modify ratings. It's fair because everyone's vote has equal weight."

**Professor:** "How much does a rating cost?"

**You:**
> "Each rating costs gas fees. On testnet (free), there's no cost. On mainnet (real ETH), it's about 0.001-0.1 USD depending on network congestion."

---

**Good luck with your viva!** 🎓✨

