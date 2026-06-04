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
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Welcome to TaskManager</h2>
            <p className="text-blue-700 mb-4">
              Connect your wallet to start managing your tasks on the Ethereum Sepolia network.
            </p>
            <p className="text-blue-600 text-sm">
              You'll need MetaMask or another Web3 wallet to get started.
            </p>
          </div>
        ) : !isCorrectNetwork ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-yellow-900 mb-2">Wrong Network</h2>
            <p className="text-yellow-700">
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

      <footer className="bg-gray-900 text-gray-400 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>TaskManager © 2024 - Decentralized Task Management on Ethereum Sepolia</p>
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
