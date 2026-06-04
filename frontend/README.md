# TaskManager Frontend

A React-based web3 frontend for the TaskManager smart contract on Ethereum Sepolia.

## Features

- 🔗 **Wallet Connection** - Connect MetaMask to Sepolia testnet
- ✏️ **Create Tasks** - Add tasks with title, description, and optional deadlines
- 📋 **View Tasks** - See all your tasks with real-time status
- ✓ **Mark Complete** - Toggle task completion status
- 🔄 **Update Tasks** - Edit task title and description
- 🗑️ **Delete Tasks** - Remove tasks you no longer need
- ⏰ **Deadline Management** - Set, update, and track task deadlines
- 📊 **Deadline Tracking** - See time remaining and overdue status
- 🎨 **Responsive UI** - Mobile-friendly interface with Tailwind CSS

## Prerequisites

- Node.js v16+ and npm
- MetaMask extension installed
- Sepolia ETH testnet funds

## Installation

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment (Optional)

Create a `.env` file to customize the contract address:

```
REACT_APP_CONTRACT_ADDRESS=0x56f7C027f2762da19B6c6bd01b9c276f12b542D6
```

The default address is already set in `src/config.js`.

### 3. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## How to Use

### 1. Connect Your Wallet

Click "Connect Wallet" in the top-right corner and approve the MetaMask connection.

### 2. Switch to Sepolia

If you're on a different network, click "Switch to Sepolia" to change networks.

### 3. Create a Task

1. Fill in the task title (required)
2. Add a description (optional)
3. Set a deadline (optional)
4. Click "Create Task"

### 4. Manage Tasks

- **Edit**: Click "Edit" to update title and description
- **Complete**: Click the checkbox to mark tasks complete
- **Delete**: Click "Delete" to remove a task
- **Deadline**: Click "Set/Update Deadline" to manage deadlines

### 5. Monitor Deadlines

- Tasks show time remaining
- Overdue tasks are highlighted in red
- Completed tasks don't show as overdue

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Wallet connection & header
│   │   ├── CreateTaskForm.jsx   # Task creation form
│   │   ├── TaskList.jsx         # List of tasks
│   │   ├── TaskCard.jsx         # Individual task display
│   │   └── DeadlineManager.jsx  # Deadline management
│   ├── context/
│   │   └── Web3Context.jsx      # Wallet connection context
│   ├── hooks/
│   │   └── useTaskManager.js    # Contract interaction hook
│   ├── App.jsx
│   ├── index.jsx
│   ├── index.css
│   └── config.js                # Contract ABI and settings
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not reversible)

## Contract Interactions

The frontend connects to the TaskManager contract and supports:

- **createTask(title, description, deadline)** - Create new task
- **getTask(taskId)** - Retrieve task details
- **updateTask(taskId, newTitle, newDescription)** - Update task
- **toggleTaskStatus(taskId)** - Mark complete/incomplete
- **deleteTask(taskId)** - Delete task
- **getTotalTasks()** - Get total task count
- **setDeadline(taskId, deadline)** - Set/update deadline
- **getDeadline(taskId)** - Get task deadline
- **isOverdue(taskId)** - Check if task is overdue
- **getTimeRemaining(taskId)** - Get seconds until deadline
- **removeDeadline(taskId)** - Remove deadline

## Troubleshooting

### "Contract not initialized"

- Make sure you're connected to a wallet
- Verify you're on the Sepolia network
- Check that the contract address in `config.js` is correct

### "MetaMask not installed"

- Install MetaMask extension from https://metamask.io

### "Insufficient funds for gas"

- Get Sepolia ETH from: https://www.alchemy.com/faucets/ethereum-sepolia

### Tasks not loading

- Refresh the page
- Click "Refresh" button in the Tasks section
- Check browser console for errors

## Security Notes

⚠️ **This is a testnet application**. Never:

- Use real funds with this contract
- Share your private keys
- Commit `.env` files with sensitive data

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `build/` directory ready for deployment.

## Deployment

You can deploy the frontend to:

- **Vercel** - `vercel deploy`
- **Netlify** - Drag and drop the `build/` folder
- **GitHub Pages** - Set up GitHub Actions
- **IPFS** - Pinata or Fleek for decentralized hosting

## Support

For issues or questions:

1. Check the browser console for errors
2. Verify MetaMask is connected to Sepolia
3. Ensure the contract address is correct
4. Check that you have Sepolia ETH for gas fees

## License

MIT
