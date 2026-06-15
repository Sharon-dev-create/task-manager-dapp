import React from 'react';
import { useWeb3 } from '../context/Web3Context';

export default function Header() {
  const { isConnected, account, connectWallet, disconnectWallet, isCorrectNetwork, switchToSepolia, loading, error } = useWeb3();
  const [showMetaMaskWarning, setShowMetaMaskWarning] = React.useState(!window.ethereum);

  return (
    <header className="bg-gradient-to-br from-primary via-primary-dark to-indigo-600 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showMetaMaskWarning && !isConnected && (
          <div className="mb-4 bg-yellow-600 bg-opacity-80 px-4 py-3 rounded-lg text-sm">
            <p className="font-semibold">⚠️ MetaMask not detected</p>
            <p className="text-sm opacity-90">Please install the <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">MetaMask extension</a> to use this app.</p>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold font-display tracking-tight">TaskManager</h1>
            <p className="text-indigo-100 mt-2 text-sm font-medium">Decentralized Task Management on Blockchain</p>
          </div>

          <div className="flex items-center gap-3">
            {isConnected && !isCorrectNetwork && (
              <button
                onClick={switchToSepolia}
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-semibold transition-all duration-200 shadow-md"
              >
                Switch to Sepolia
              </button>
            )}

            {isConnected ? (
              <>
                <div className="text-right">
                  <p className="text-sm font-medium opacity-90">Connected</p>
                  <p className="font-mono text-sm font-semibold tracking-wider">{account?.slice(0, 6)}...{account?.slice(-4)}</p>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={connectWallet}
                disabled={loading || !window.ethereum}
                title={!window.ethereum ? "MetaMask not detected" : ""}
                className="px-6 py-2 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
