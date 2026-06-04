#!/bin/bash

# TaskManager Frontend Integration Script
# This script sets up and verifies the frontend

set -e

echo "🚀 TaskManager Frontend Integration"
echo "===================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js v16+"
    exit 1
fi
echo "  Node.js version: $(node --version)"

# Check npm
echo "✓ Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi
echo "  npm version: $(npm --version)"

# Navigate to frontend
cd frontend || { echo "❌ frontend directory not found"; exit 1; }

echo ""
echo "📦 Installing dependencies..."
npm install > /dev/null 2>&1 || { echo "❌ Failed to install dependencies"; exit 1; }
echo "✓ Dependencies installed"

echo ""
echo "⚙️ Verifying configuration..."

# Check config
if grep -q "CONTRACT_ADDRESS" src/config.js; then
    echo "✓ Contract address configured"
else
    echo "❌ Contract address not found"
    exit 1
fi

if grep -q "CONTRACT_ABI" src/config.js; then
    echo "✓ Contract ABI configured"
else
    echo "❌ Contract ABI not found"
    exit 1
fi

echo ""
echo "✅ Integration verification complete!"
echo ""
echo "Next steps:"
echo "1. Ensure MetaMask is installed"
echo "2. Have Sepolia ETH in your wallet"
echo "3. Run: npm start"
echo "4. Open http://localhost:3000"
echo "5. Connect your wallet"
echo ""
echo "Happy task managing! 🎉"
