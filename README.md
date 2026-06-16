# Task Manager DApp (Ethereum Sepolia)

A decentralized task management application built on Ethereum that allows users to create, update, complete, and delete tasks directly on-chain using MetaMask.

All data is stored on the blockchain via a smart contract. No backend or database is used.

---

## Features

### Task Management (On-Chain)
- Create tasks (title, description, optional deadline)
- Update task title and description
- Mark tasks as complete or incomplete
- Delete tasks permanently from blockchain

### Deadline System
- Set and update deadlines
- View time remaining
- Detect overdue tasks
- Remove deadlines

### Wallet Integration
- MetaMask connection
- Automatic account detection
- Sepolia network enforcement
- Account switching support

### UX Features
- Loading states during transactions
- Error handling for failed transactions
- Transaction confirmation tracking

---

## Tech Stack

Frontend:
- React
- Ethers.js v6
- TailwindCSS

Blockchain:
- Solidity
- Hardhat
- Ethereum Sepolia Testnet
- Foundry Cast (CLI testing)

---

## Project Structure

task-manager-contract/
├── contracts/
│   └── TaskManager.sol
├── scripts/
│   └── deploy.js
├── frontend/
│   ├── src/
│   │   ├── config.js
│   │   ├── context/
│   │   │   └── Web3Context.jsx
│   │   ├── hooks/
│   │   │   └── useTaskManager.js
│   │   ├── components/
│   │   │   ├── CreateTaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── Header.jsx
│   │   └── App.jsx
│   └── public/
│       └── index.html
└── hardhat.config.js

---

## Smart Contract

### createTask

function createTask(
    string calldata title,
    string calldata description,
    uint256 deadline
) external;

### Rules
- Title must not be empty
- Deadline must be 0 or a future timestamp

### Task Struct

struct Task {
    uint256 id;
    string title;
    string description;
    bool completed;
    address owner;
    uint256 deadline;
}

---

## Frontend Architecture

### Web3 Context
Handles:
- Wallet connection
- Provider setup
- Signer initialization
- Contract instance creation
- Account and network state

### useTaskManager Hook
Provides contract interactions:
- createTask
- getTask
- updateTask
- toggleTaskStatus
- deleteTask
- getTotalTasks
- setDeadline
- getDeadline
- isOverdue
- getTimeRemaining
- removeDeadline

Each function:
- Calls smart contract methods
- Handles loading state
- Captures errors
- Returns transaction receipts or data

---

## Create Task Flow

1. User submits form
2. Input validation
3. Deadline converted to UNIX timestamp (if provided)
4. Contract call:

createTask(title, description, deadline)

5. MetaMask confirms transaction
6. Task stored on blockchain

---

## Network Configuration

Network: Ethereum Sepolia
Chain ID: 11155111
Contract Address: 0x114D7300ACDB33658bde6ebe0ab680eb3DE7A684
RPC: Infura / Alchemy

---

## Deployment

### Local Development
npm install
npm start

### Production Build
npm run build

### Deploy Smart Contract
npx hardhat run scripts/deploy.js --network sepolia

---

## Testing with Cast

### Read Contract
cast call <address> "getTask(uint256)" 0
cast call <address> "getTotalTasks()"

### Write Transaction
cast send <address> "createTask(string,string,uint256)" "Title" "Desc" 0

---

## Common Issues

### Missing revert data
Cause: wrong function arguments or contract revert
Fix: ensure ABI and parameters match contract

### MetaMask "Failed to fetch"
Cause: RPC or network issue
Fix: switch RPC provider or refresh network

### Task does not exist
Cause: querying empty taskId
Fix: create task first

### Insufficient gas
Cause: no Sepolia ETH
Fix: use faucet

---

## Environment Variables

REACT_APP_CONTRACT_ADDRESS=0x114D7300ACDB33658bde6ebe0ab680eb3DE7A684
REACT_APP_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY

---

## Security Notes

- Use only testnet wallets
- Never expose private keys
- Do not commit .env files
- Always verify contract address

---

## Future Improvements

- Event-based live updates
- Task filtering (completed/pending)
- Pagination
- IPFS metadata storage
- Multi-user task boards
- DAO-based permissions

---

## Summary

This project demonstrates a full Web3 stack:
- Solidity smart contracts
- MetaMask wallet integration
- React frontend
- On-chain state management

All actions are executed as blockchain transactions, making the system fully decentralized.