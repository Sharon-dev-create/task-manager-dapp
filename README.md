# 🚀 TaskManager DApp

A decentralized task management application built on Ethereum Sepolia that allows users to create, manage, track, and organize tasks directly on the blockchain.

TaskManager combines the transparency and immutability of smart contracts with a modern React frontend, providing a secure and user-friendly productivity tool powered by Web3 technology.

---

# 📋 Overview

TaskManager is a full-stack decentralized application (DApp) that enables users to:

* Create tasks on-chain
* Edit task details
* Mark tasks as completed
* Delete tasks permanently
* Set and manage deadlines
* Track overdue tasks
* Connect using MetaMask
* Interact with Ethereum Sepolia Testnet

All task data is stored on-chain through a smart contract, ensuring transparency, immutability, and decentralization.

---

# ✨ Features

## Task Management

### Create Tasks

Users can create new tasks by providing:

* Task title (required)
* Task description (optional)
* Task deadline (optional)

Each task is recorded on the blockchain through a smart contract transaction.

---

### Edit Tasks

Modify existing tasks by updating:

* Title
* Description

Changes are immediately reflected after transaction confirmation.

---

### Complete Tasks

Tasks can be marked as completed or reverted back to incomplete status.

Completed tasks:

* Appear visually distinct
* Are grayed out in the UI
* Remain permanently stored on-chain

---

### Delete Tasks

Users can permanently remove tasks from the smart contract.

Deletion requires wallet confirmation through MetaMask.

---

### Deadline Management

The application provides deadline tracking capabilities:

* Set task deadlines
* Update existing deadlines
* Remove deadlines
* View countdown timers
* Detect overdue tasks automatically

Overdue tasks are highlighted for better visibility.

---

# 🌐 Web3 Features

## MetaMask Integration

The application automatically:

* Detects MetaMask installation
* Connects user wallets
* Retrieves wallet addresses
* Requests account access

---

## Network Detection

TaskManager is configured for:

Network: Ethereum Sepolia

Chain ID:

11155111

If users connect to a different network, the application prompts them to switch.

---

## Smart Contract Interaction

All blockchain interactions are performed through ethers.js and include:

* Transaction signing
* Event handling
* Error management
* Loading states

---

# 🏗 Architecture

## Frontend Structure

```text
frontend/
├── src/
│   ├── App.jsx
│   ├── index.jsx
│   ├── config.js
│   ├── index.css
│   │
│   ├── context/
│   │   └── Web3Context.jsx
│   │
│   ├── hooks/
│   │   └── useTaskManager.js
│   │
│   └── components/
│       ├── Header.jsx
│       ├── CreateTaskForm.jsx
│       ├── TaskList.jsx
│       ├── TaskCard.jsx
│       ├── DeadlineManager.jsx
│       ├── Loading.jsx
│       └── NotFound.jsx
│
├── public/
│   └── index.html
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

---

# 📂 Component Breakdown

## App.jsx

Main application entry component.

Responsibilities:

* Layout rendering
* Global state coordination
* Route management

---

## Web3Context.jsx

Provides wallet and blockchain connectivity.

Responsibilities:

* Wallet connection
* Account tracking
* Network detection
* Contract initialization

---

## useTaskManager.js

Custom React hook that abstracts all smart contract interactions.

Responsibilities:

* Reading blockchain data
* Sending transactions
* Managing task state

---

## CreateTaskForm.jsx

User interface for creating new tasks.

---

## TaskList.jsx

Displays all tasks owned by the connected wallet.

---

## TaskCard.jsx

Represents a single task and its controls.

Actions include:

* Edit
* Complete
* Delete
* Manage deadline

---

## DeadlineManager.jsx

Handles all deadline-related functionality.

---

## Loading.jsx

Reusable loading indicator displayed during blockchain transactions.

---

# 🔗 Smart Contract Integration

## Connected Functions

### Create Task

```solidity
createTask(
    string title,
    string description,
    uint256 deadline
)
```

Creates a new task.

---

### Retrieve Task

```solidity
getTask(uint256 taskId)
```

Returns task details.

---

### Update Task

```solidity
updateTask(
    uint256 taskId,
    string newTitle,
    string newDescription
)
```

Updates task metadata.

---

### Toggle Completion Status

```solidity
toggleTaskStatus(uint256 taskId)
```

Marks task complete/incomplete.

---

### Delete Task

```solidity
deleteTask(uint256 taskId)
```

Removes a task from storage.

---

### Get Total Tasks

```solidity
getTotalTasks()
```

Returns task count.

---

### Deadline Functions

```solidity
setDeadline(taskId, deadline)

getDeadline(taskId)

isOverdue(taskId)

getTimeRemaining(taskId)

removeDeadline(taskId)
```

---

# 📜 Contract Information

## Deployment Network

Ethereum Sepolia Testnet

### Chain ID

```text
11155111
```

### Contract Address

```text
0x56f7C027f2762da19B6c6bd01b9c276f12b542D6
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
cd taskmanager-dapp
```

---

## Install Dependencies

```bash
cd frontend
npm install
```

---

## Run Development Server

```bash
npm start
```

Application will launch at:

```text
http://localhost:3000
```

---

# 🔑 Connecting MetaMask

1. Install MetaMask
2. Create or import wallet
3. Connect wallet
4. Switch to Sepolia network
5. Obtain Sepolia ETH from a faucet
6. Begin interacting with the DApp

---

# 🧪 Testing Guide

## Test Task Creation

Create:

```text
Title: Hello World
Description: Empty
Deadline: None
```

Expected:

* Transaction succeeds
* Task appears in task list

---

## Test Deadlines

Create:

```text
Title: Urgent Task
Deadline: 1 hour from now
```

Expected:

* Countdown visible
* Deadline displayed
* Task turns overdue after expiration

---

## Test Editing

1. Create task
2. Edit title
3. Save

Expected:

* Blockchain transaction confirmed
* Updated title visible

---

## Test Completion

1. Click completion checkbox

Expected:

* Status toggles
* Visual state updates

---

## Test Deletion

1. Click Delete
2. Confirm transaction

Expected:

* Task removed

---

# 🚀 Production Build

Create optimized production assets:

```bash
npm run build
```

Output:

```text
build/
```

---

# ☁️ Deployment

## Vercel

```bash
npm install -g vercel
vercel
```

---

## Netlify

Build:

```bash
npm run build
```

Upload:

```text
build/
```

---

## IPFS

Build:

```bash
npm run build
```

Upload using:

* Pinata
* Fleek
* Web3.Storage

---

# 🔧 Environment Variables

Create:

```text
.env.local
```

Example:

```env
REACT_APP_CONTRACT_ADDRESS=0x56f7C027f2762da19B6c6bd01b9c276f12b542D6

REACT_APP_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

---

# 🐛 Debugging

## Open Browser DevTools

Chrome:

```text
Ctrl + Shift + I
```

Firefox:

```text
Ctrl + Shift + I
```

Safari:

```text
Cmd + Option + I
```

---

## Console Tab

Check for:

* Smart contract errors
* RPC failures
* MetaMask issues
* JavaScript exceptions

---

## Network Tab

Monitor:

* RPC requests
* Transaction submissions
* Contract reads

---

# 🚨 Common Issues

## MetaMask Not Installed

Install MetaMask and refresh the page.

---

## Wrong Network

Switch to Ethereum Sepolia.

---

## No Test ETH

Request Sepolia ETH from a faucet.

---

## Tasks Not Loading

* Refresh page
* Reconnect wallet
* Verify contract address

---

## Transaction Failed

Check:

* Wallet balance
* Network
* Gas fees
* Contract state

---

# 🔒 Security Best Practices

## Recommended

✅ Use Sepolia testnet

✅ Use a dedicated testing wallet

✅ Keep private keys secret

✅ Store environment variables securely

---

## Avoid

❌ Committing secrets to GitHub

❌ Sharing seed phrases

❌ Using real funds during testing

❌ Exposing private keys in frontend code

---

# 📈 Performance Considerations

* Minimize unnecessary RPC calls
* Cache frequently accessed data
* Use React memoization where appropriate
* Batch blockchain reads when possible

---

# 🛣 Future Improvements

* Multi-user collaboration
* Task categories
* Priority levels
* Notifications
* Email reminders
* Mobile application
* DAO-based task assignment
* IPFS task attachments
* Cross-chain deployment
* Account abstraction support

---

# Tech Stack

### Frontend

* React.js
* Tailwind CSS
* JavaScript

### Blockchain

* Solidity
* Ethereum Sepolia
* ethers.js

### Wallet

* MetaMask

### Hosting

* Vercel
* Netlify
* IPFS

---

# License

MIT License

---

## Author

Built as a decentralized productivity application demonstrating modern Web3 development practices, smart contract integration, and blockchain-based task management.

⭐ If you found this project useful, consider giving the repository a star.
