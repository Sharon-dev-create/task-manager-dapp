import React, { useState } from 'react';
import { Web3Provider, useWeb3 } from './context/Web3Context';
import Header from './components/Header';
import CreateTaskForm from './components/CreateTaskForm';
import TaskList from './components/TaskList';

function AppContent() {
  const { isConnected, isCorrectNetwork } = useWeb3();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {!isConnected ? (
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-primary rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold font-display text-primary mb-4">Welcome to TaskManager</h2>
            <p className="text-gray-700 mb-4 text-lg font-medium">
              Connect your wallet to start managing your tasks on the Ethereum Sepolia network.
            </p>
            <p className="text-gray-600 text-sm">
              You'll need MetaMask or another Web3 wallet to get started.
            </p>
          </div>
        ) : !isCorrectNetwork ? (
          <div className="card bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-warning rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold font-display text-warning mb-4">⚠️ Wrong Network</h2>
            <p className="text-gray-700 text-lg font-medium">
              Please switch to the Sepolia Testnet to use TaskManager.
            </p>
          </div>
        ) : (
          <>
            <CreateTaskForm onTaskCreated={handleTaskCreated} />
            <TaskList refreshTrigger={refreshTrigger} />
          </>
        )}
      </main>

      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-400 py-8 mt-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-medium">TaskManager © 2024</p>
          <p className="text-xs mt-1 text-gray-500">Decentralized Task Management on Ethereum Sepolia</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Web3Provider>
      <AppContent />
    </Web3Provider>
  );
}

export default App;
