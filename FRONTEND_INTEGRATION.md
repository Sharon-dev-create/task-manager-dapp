# Frontend Integration Guide

## Quick Start (3 steps)

### 1️⃣ Install Dependencies
```bash
cd frontend
npm install
```

### 2️⃣ Start Dev Server
```bash
npm start 
```

The app will automatically open at `http://localhost:3000`

### 3️⃣ Connect Wallet
- Click "Connect Wallet"
- Approve in MetaMask
- Switch to Sepolia if needed

---

## What You Can Do

### ✅ Create Tasks
- Add title (required)
- Add description (optional)
- Set deadline (optional)
- Transaction will be signed in MetaMask

### ✅ Edit Tasks  
- Click "Edit" button
- Update title/description
- Click "Save"

### ✅ Complete Tasks
- Click checkbox to mark done
- Task grayed out when completed

### ✅ Delete Tasks
- Click "Delete"
- Confirm deletion
- Task removed from blockchain

### ✅ Manage Deadlines
- Click "Set/Update Deadline"
- Choose date/time
- See time remaining
- Tasks turn red if overdue
- Remove deadline anytime

---

## Frontend Architecture

```
frontend/
├── src/
│   ├── App.jsx                    # Main app component
│   ├── index.jsx                  # Entry point
│   ├── config.js                  # Contract config + ABI
│   ├── index.css                  # Global styles
│   │
│   ├── context/
│   │   └── Web3Context.jsx        # Wallet connection
│   │
│   ├── hooks/
│   │   └── useTaskManager.js      # Contract calls
│   │
│   └── components/
│       ├── Header.jsx              # Wallet & network
│       ├── CreateTaskForm.jsx      # Create task form
│       ├── TaskList.jsx            # List of tasks
│       ├── TaskCard.jsx            # Individual task
│       ├── DeadlineManager.jsx     # Deadline UI
│       ├── Loading.jsx             # Loading spinner
│       └── NotFound.jsx            # 404 page
│
├── public/
│   └── index.html                 # HTML template
│
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind config
├── postcss.config.js              # PostCSS config
└── .env.example                   # Env template
```

---

## Key Features

| Feature | Details |
|---------|---------|
| **Wallet Connect** | MetaMask integration with auto-detection |
| **Network Switch** | Automatic Sepolia network detection |
| **Create Tasks** | Store on blockchain with optional deadline |
| **Edit Tasks** | Update title and description |
| **Delete Tasks** | Permanently remove from contract |
| **Deadline Tracking** | Real-time countdown and overdue status |
| **Responsive Design** | Mobile-friendly Tailwind CSS UI |
| **Error Handling** | User-friendly error messages |
| **Loading States** | Visual feedback during transactions |

---

## Contract Integration Details

### Connected Contract Functions

```javascript
// Create Task
createTask(title, description, deadline)

// Retrieve Task
getTask(taskId)

// Update Task
updateTask(taskId, newTitle, newDescription)

// Toggle Completion
toggleTaskStatus(taskId)

// Delete Task
deleteTask(taskId)

// Get Total Tasks
getTotalTasks()

// Deadline Functions
setDeadline(taskId, newDeadline)
getDeadline(taskId)
isOverdue(taskId)
getTimeRemaining(taskId)
removeDeadline(taskId)
```

### Network Configuration

```javascript
Network:      Ethereum Sepolia
Chain ID:     11155111
Contract:     0x56f7C027f2762da19B6c6bd01b9c276f12b542D6
Gas Network:  Infura/Alchemy RPC
```

---

## Deployment Options

### Development
```bash
npm start        # Local dev server at :3000
```

### Production Build
```bash
npm run build    # Create optimized build in build/
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build: `npm run build`
2. Upload `build/` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Deploy to IPFS (Decentralized)
1. Build: `npm run build`
2. Upload to Pinata: https://pinata.cloud
3. Or Fleek: https://fleek.co

---

## Testing Workflow

### Test 1: Create a Simple Task
1. Title: "Hello World"
2. No deadline, no description
3. Submit
4. Verify it appears in list

### Test 2: Create Task with Deadline
1. Title: "Urgent Task"
2. Set deadline 1 hour from now
3. Submit
4. Verify deadline displays with countdown

### Test 3: Edit Task
1. Click "Edit" on a task
2. Change title to "Modified Title"
3. Save
4. Verify update on blockchain

### Test 4: Complete Task
1. Click checkbox on task
2. Task becomes grayed out
3. Click checkbox again to uncomplete

### Test 5: Delete Task
1. Click "Delete"
2. Confirm in dialog
3. Task removed from list

### Test 6: Deadline Management
1. Create task without deadline
2. Click "Set/Update Deadline"
3. Choose future date/time
4. Verify deadline displays
5. Click "Remove Deadline"
6. Verify deadline cleared

---

## Browser DevTools Debugging

### Open DevTools
```
Chrome:    Ctrl+Shift+I (or Cmd+Option+I on Mac)
Firefox:   Ctrl+Shift+I (or Cmd+Option+I on Mac)
Safari:    Cmd+Option+I
```

### Check Console for Errors
- Click "Console" tab
- Look for red error messages
- Check for warnings

### Monitor Network Calls
- Click "Network" tab
- Look for RPC calls to Infura/Alchemy
- Check response times

### Inspect Elements
- Click "Elements" tab
- Hover over page elements
- Check component structure

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Page won't load | `rm -rf node_modules && npm install` |
| MetaMask not found | Install from https://metamask.io |
| Wrong network | Click "Switch to Sepolia" button |
| No gas/funds | Get Sepolia ETH from faucet |
| Tasks not loading | Click "Refresh" or reload page |
| Transaction failed | Check gas, network, and funds |
| Contract not found | Verify contract address in config.js |

---

## Environment Variables

### Optional Configuration

Create `.env.local` to override defaults:

```env
# Contract Address (optional - already set in config.js)
REACT_APP_CONTRACT_ADDRESS=0x56f7C027f2762da19B6c6bd01b9c276f12b542D6

# RPC URL (optional - uses Infura by default)
REACT_APP_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

---

## Performance Tips

1. **Fast Iteration**: Use `npm start` for hot reloading
2. **Build Optimization**: Use `npm run build` for production
3. **Network Calls**: Minimize RPC calls with caching
4. **Component Memoization**: Avoid unnecessary re-renders

---

## Security Notes

✅ **Safe:**
- Use test/burner wallet
- Only use Sepolia testnet
- Never share private keys
- Keep .env.local private

❌ **Unsafe:**
- Using mainnet funds for testing
- Committing .env files to git
- Sharing wallet private keys
- Using personal wallets with real funds

---

## Next Steps

1. ✓ Setup complete!
2. Run `npm start` to begin
3. Test all features
4. Plan mainnet deployment
5. Deploy frontend to production

---

**Ready to build? Start the dev server now!** 🚀
