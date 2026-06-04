# TaskManager Frontend Setup Guide

## Quick Start

### 1. Install & Run

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

### 2. Connect Your Wallet

1. Install [MetaMask](https://metamask.io) if you haven't already
2. Click "Connect Wallet" in the top-right corner
3. Approve the connection in MetaMask
4. Switch to **Sepolia Testnet** (the app will prompt you if needed)

### 3. Get Sepolia ETH

Visit the [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia) to get free testnet ETH

## Features Overview

### Task Management

#### Create Tasks
- Enter title (required)
- Add description (optional)
- Set deadline (optional)
- Submit to create on blockchain

#### View Tasks
- All your tasks appear in the list
- Shows title, description, and status
- Displays deadline if set
- Shows time remaining or overdue status

#### Update Tasks
- Click "Edit" to modify title/description
- Click "Save" to update on blockchain
- Changes are saved to the smart contract

#### Complete Tasks
- Click checkbox to toggle completion status
- Completed tasks are visually distinguished
- Completed tasks don't show as overdue

#### Delete Tasks
- Click "Delete" to remove permanently
- Requires confirmation
- Cannot be undone

### Deadline Management

#### Set Deadlines
- Click "Set/Update Deadline" on any task
- Select date and time (must be in future)
- Deadline is stored on blockchain
- Shows in local timezone

#### Monitor Deadlines
- **Time Remaining**: Shows how much time is left
- **Overdue**: Tasks past deadline are highlighted in red
- **Status**: Updates in real-time
- **Completed**: Overdue status ignored for completed tasks

#### Remove Deadlines
- Click "Remove Deadline" to clear
- Deadline information is deleted from blockchain
- Task returns to normal state

## Contract Interaction

The frontend interacts with your deployed TaskManager contract:

- **Contract Address**: `0x56f7C027f2762da19B6c6bd01b9c276f12b542D6`
- **Network**: Ethereum Sepolia (Chain ID: 11155111)
- **RPC**: Infura or Alchemy endpoint

All task data is stored on the blockchain and persists across sessions.

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   ├── context/             # Web3 context
│   ├── hooks/               # Custom hooks
│   ├── App.jsx              # Main app
│   ├── index.jsx            # Entry point
│   └── config.js            # Contract config
├── public/                  # Static files
├── package.json             # Dependencies
└── README.md               # Full documentation
```

## Available Components

### Header.jsx
- Wallet connection/disconnection
- Network display
- Account balance display

### CreateTaskForm.jsx
- Form for creating new tasks
- Deadline date/time picker
- Input validation
- Success/error messages

### TaskList.jsx
- Displays all tasks
- Refresh functionality
- Task count display
- Empty state message

### TaskCard.jsx
- Individual task display
- Edit/delete buttons
- Completion checkbox
- Deadline information
- Overdue status

### DeadlineManager.jsx
- Set/update deadline
- Remove deadline
- Time remaining display

## Configuration

### Update Contract Address

Edit `frontend/src/config.js`:

```javascript
export const CONTRACT_ADDRESS = '0x...YOUR_ADDRESS';
```

Or set environment variable:

```bash
echo "REACT_APP_CONTRACT_ADDRESS=0x..." > frontend/.env.local
```

### Change Network

To deploy on different network, update:
- `CONTRACT_ADDRESS`
- `SEPOLIA_CHAIN_ID`
- `SEPOLIA_RPC_URL`

## Development

### Run Development Server
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## Browser Support

- Chrome/Chromium v90+
- Firefox v88+
- Safari v14+
- Edge v90+

Requires MetaMask or compatible Web3 wallet extension.

## Troubleshooting

### "Contract not initialized"
- Ensure wallet is connected
- Verify correct network (Sepolia)
- Check contract address in config.js

### "Transaction failed"
- Insufficient gas: Get more Sepolia ETH
- Network issue: Check internet connection
- Wrong network: Switch to Sepolia

### "Tasks not loading"
- Click Refresh button
- Check browser console for errors
- Reload page
- Verify contract address

### MetaMask not found
- Install MetaMask from https://metamask.io
- Clear browser cache and reload
- Try different browser

## Security Best Practices

✅ **DO:**
- Use MetaMask with a dedicated test account
- Only use Sepolia testnet (not mainnet)
- Keep private keys safe
- Test thoroughly before mainnet deployment

❌ **DON'T:**
- Share private keys
- Use mainnet funds for testing
- Commit .env files with keys
- Use personal wallets with real funds

## Performance Tips

1. **Reduce RPC Calls**: The app batches requests efficiently
2. **Cache Tasks**: Tasks are loaded once then cached
3. **Lazy Loading**: Components load on demand

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Build: `npm run build`
2. Upload `build/` folder to Netlify

### GitHub Pages
1. Set repository to public
2. Enable GitHub Pages in settings
3. Push to deploy

### IPFS (Decentralized)
```bash
npm run build
# Upload build/ to Pinata or Fleek
```

## Environment Setup Summary

```bash
# 1. Install Node.js v16+
# 2. Install MetaMask browser extension
# 3. Get Sepolia ETH from faucet
# 4. Clone/navigate to frontend directory
cd frontend

# 5. Install dependencies
npm install

# 6. Start development server
npm start

# 7. Open http://localhost:3000
# 8. Connect MetaMask wallet
# 9. Start creating tasks!
```

## Support & Resources

- **MetaMask Help**: https://support.metamask.io
- **Sepolia Faucet**: https://www.alchemy.com/faucets/ethereum-sepolia
- **Etherscan Sepolia**: https://sepolia.etherscan.io
- **Hardhat Docs**: https://hardhat.org
- **React Docs**: https://react.dev

## Next Steps

1. Test all features thoroughly
2. Deploy contract to mainnet when ready
3. Update contract address in production build
4. Deploy frontend to production (Vercel/Netlify)
5. Monitor transactions on Etherscan

---

**Happy task managing! 🚀**
