# Frontend Integration Checklist

## Step 1: Setup Environment ✓

### Prerequisites Installed?
- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm v8+ installed (`npm --version`)
- [ ] MetaMask browser extension installed
- [ ] Sepolia testnet ETH in wallet

### Dependencies Status
✓ Contract Address: `0x56f7C027f2762da19B6c6bd01b9c276f12b542D6`
✓ Network: Sepolia (Chain ID: 11155111)
✓ ABI: Fully configured in `src/config.js`

## Step 2: Install Dependencies

```bash
cd frontend
npm install
```

Expected output:
```
added 1234 packages, and audited 1235 packages in 2m
found 0 vulnerabilities
```

## Step 3: Configure Environment (Optional)

Create `.env.local` in the `frontend/` directory:

```
REACT_APP_CONTRACT_ADDRESS=0x56f7C027f2762da19B6c6bd01b9c276f12b542D6
```

*(Already set as default in config.js)*

## Step 4: Start Development Server

```bash
npm start
```

Expected output:
```
Compiled successfully!

You can now view task-manager-frontend in the browser.

Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

## Step 5: Verify Frontend Load

- [ ] Page loads at `http://localhost:3000`
- [ ] Header displays "TaskManager"
- [ ] "Connect Wallet" button visible
- [ ] Footer displays copyright

## Step 6: Connect MetaMask Wallet

1. Click "Connect Wallet" button (top-right)
2. MetaMask popup appears
3. Select account to connect
4. Approve connection
5. Check that:
   - [ ] Account address displays (truncated)
   - [ ] Connected status shows
   - [ ] Network shows Sepolia

## Step 7: Verify Network Connection

If not on Sepolia:
- [ ] "Switch to Sepolia" button appears
- [ ] Click button and approve in MetaMask
- [ ] Verify you're now on Sepolia network

## Step 8: Test Create Task

1. Fill task form:
   - Title: "Test Task"
   - Description: "Testing frontend integration"
   - Deadline: Set a time 1 hour from now

2. Click "Create Task"

3. MetaMask popup shows transaction
   - Review gas fee
   - Click "Confirm"

4. Wait for confirmation:
   - [ ] Transaction succeeds
   - [ ] Task appears in list
   - [ ] Shows correct title and description

## Step 9: Test Task Operations

Test each feature:

- [ ] **View Task**: Click task to expand details
- [ ] **Edit Task**: Click "Edit" and update title
- [ ] **Complete Task**: Click checkbox to mark done
- [ ] **Delete Task**: Click "Delete" and confirm
- [ ] **Set Deadline**: Click "Set/Update Deadline"
- [ ] **Check Overdue**: Create task with past deadline (for testing)

## Step 10: Monitor Contract Calls

Open browser DevTools (F12):
- Click "Console" tab
- Check for any errors
- Watch network calls to Infura/Alchemy RPC

## Troubleshooting Integration Issues

### Issue: Page won't load
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: "MetaMask not found"
**Solution:**
- Install MetaMask from https://metamask.io
- Reload page (Cmd+R / Ctrl+R)

### Issue: Wrong network error
**Solution:**
- Click "Switch to Sepolia" in header
- Approve network switch in MetaMask
- Wait for confirmation

### Issue: Gas errors/insufficient funds
**Solution:**
- Get Sepolia ETH: https://www.alchemy.com/faucets/ethereum-sepolia
- Wait a few minutes
- Try transaction again

### Issue: Contract not initialized
**Solution:**
- Verify wallet connected (check account in header)
- Verify on Sepolia network (check banner)
- Try refreshing page
- Check contract address in `src/config.js`

### Issue: Tasks not loading
**Solution:**
- Click "Refresh" button in Tasks section
- Check browser console for errors (F12 → Console)
- Verify RPC connection is working
- Try hard refresh (Ctrl+Shift+R)

## Contract Interactions to Test

| Function | Test Steps | Expected Result |
|----------|-----------|-----------------|
| Create Task | Fill form, submit | Task appears with ID |
| Update Task | Edit title, save | Title updates on chain |
| Toggle Status | Click checkbox | Task marked complete |
| Delete Task | Click delete, confirm | Task removed |
| Set Deadline | Set future date | Deadline shows in card |
| View Deadline | Click deadline section | Shows formatted date/time |
| Check Overdue | Create past deadline | Highlights in red |
| Time Remaining | View task with deadline | Shows countdown |
| Remove Deadline | Click remove button | Deadline cleared |

## Performance Monitoring

In DevTools Console:

```javascript
// Check connected account
window.ethereum.selectedAddress

// Check network
window.ethereum.networkVersion  // Should be "11155111"

// Check balance
ethers.getBalance(address)
```

## Browser Compatibility

✓ Chrome/Chromium v90+
✓ Firefox v88+
✓ Safari v14+
✓ Edge v90+

## Security Checklist

- [ ] Using test/burner wallet (not personal funds)
- [ ] Only using Sepolia testnet
- [ ] No .env.local file committed to git
- [ ] No private keys in code

## Next Steps After Integration

1. **Test all features thoroughly** ✓
2. **Deploy contract to mainnet** (when ready)
3. **Update contract address** in production
4. **Build for production**: `npm run build`
5. **Deploy frontend**:
   - Vercel: `npm install -g vercel && vercel`
   - Netlify: Upload `build/` folder
   - IPFS: Upload to Pinata/Fleek

## Support Resources

- **MetaMask Docs**: https://docs.metamask.io
- **Ethers.js Docs**: https://docs.ethers.org
- **Sepolia Faucet**: https://www.alchemy.com/faucets/ethereum-sepolia
- **Etherscan Sepolia**: https://sepolia.etherscan.io
- **Hardhat Docs**: https://hardhat.org

---

**Integration Status: Ready to Start Development Server** ✨
