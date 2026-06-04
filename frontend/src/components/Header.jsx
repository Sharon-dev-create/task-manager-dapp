import React from 'react';
import { useWeb3 } from '../context/Web3Context';

export default function Header() {
  const { isConnected, account, connectWallet, disconnectWallet, isCorrectNetwork, switchToSepolia, loading } = useWeb3();

  return (
    <header className="bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">TaskManager</h1>
            <p className="text-blue-100 mt-1">Decentralized Task Management on Blockchain</p>
          </div>

          <div className="flex items-center gap-3">
            {isConnected && !isCorrectNetwork && (
              <button
                onClick={switchToSepolia}
                className="px-4 py-2 bg-warning text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Switch to Sepolia
              </button>
            )}

            {isConnected ? (
              <>
                <div className="text-right">
                  <p className="text-sm opacity-90">Connected</p>
                  <p className="font-mono text-sm">{account?.slice(0, 6)}...{account?.slice(-4)}</p>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={connectWallet}
                disabled={loading}
                className="px-6 py-2 bg-white text-primary font-semibold rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
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
