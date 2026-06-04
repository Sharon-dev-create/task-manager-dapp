# TaskManager Deployment Guide

## Prerequisites

1. **Node.js & npm**: Ensure you have Node.js v18+ installed
2. **Sepolia ETH**: Get testnet ETH from a [faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
3. **RPC Provider**: Get an Infura or Alchemy API key
4. **Etherscan API Key**: (Optional) For contract verification at https://etherscan.io

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```

Edit `.env`:
```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

**⚠️ Important Security Notes:**
- Never commit `.env` to version control
- Use a burner/test wallet only (never a wallet with real funds)
- Keep your private key confidential

### 3. Get Sepolia RPC URL
Choose one of these providers:

**Infura:**
- Sign up at https://infura.io
- Create a project and get the Sepolia endpoint

**Alchemy:**
- Sign up at https://alchemy.com
- Create an app and get the Sepolia endpoint

**Public RPC (free but slower):**
- https://rpc.sepolia.org

## Deployment Methods

### Method 1: Using Hardhat Script (Recommended)
```bash
npm run deploy:sepolia
```

This will:
- Compile the contract
- Deploy to Sepolia
- Display the contract address
- Provide instructions for verification

### Method 2: Using Hardhat Ignition
```bash
npm run deploy:ignition
```

Ignition provides better tracking and can redeploy safely.

## Verify Contract on Etherscan

After deployment, verify your contract:
```bash
npm run verify <CONTRACT_ADDRESS>
```

Or manually:
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

## Useful Links

- **Sepolia Explorer**: https://sepolia.etherscan.io
- **Hardhat Docs**: https://hardhat.org/docs
- **Hardhat Ignition**: https://hardhat.org/ignition/docs/getting-started
- **TaskManager Contract**: View at https://sepolia.etherscan.io/address/`<your-contract-address>`

## Troubleshooting

### "Error: insufficient funds for gas"
- You need more Sepolia ETH
- Get it from the faucet: https://www.alchemy.com/faucets/ethereum-sepolia

### "Error: Invalid RPC URL"
- Check your SEPOLIA_RPC_URL in `.env`
- Ensure the endpoint is correct

### "Private key is missing"
- Add PRIVATE_KEY to `.env`
- Must be without the "0x" prefix

### Transaction reverted
- Check contract logic in TaskManager.sol
- Verify constructor parameters

## Testing Locally

Before deploying to Sepolia, test locally:
```bash
npx hardhat test
npx hardhat run scripts/deploy.js --network localhost
```

## Next Steps

1. Deploy the contract
2. Save the contract address
3. Verify on Etherscan
4. Interact with the contract using web3 tools or a frontend
