import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_CHAIN_ID } from '../config';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metamaskFound, setMetamaskFound] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install the MetaMask extension to use this app.');
      }

      // Request accounts from MetaMask
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }).catch(err => {
        // User rejected the request
        if (err.code === 4001) {
          throw new Error('You rejected the connection request');
        }
        throw err;
      });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask.');
      }

      const browserProvider = new BrowserProvider(window.ethereum);
      const signerInstance = await browserProvider.getSigner();
      const network = await browserProvider.getNetwork();

      setProvider(browserProvider);
      setSigner(signerInstance);
      setAccount(accounts[0]);
      setChainId(Number(network.chainId));
      setMetamaskFound(true);

      // Create contract instance
      const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerInstance);
      setContract(contractInstance);

      // Check if on Sepolia
      if (Number(network.chainId) !== SEPOLIA_CHAIN_ID) {
        setError('Please switch to Sepolia network');
      }
    } catch (err) {
      const errorMessage = err?.message || 'Failed to connect to MetaMask';
      setError(errorMessage);
      console.error('Connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}` }],
      });
    } catch (err) {
      if (err.code === 4902) {
        // Network not added
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}`,
                chainName: 'Sepolia Testnet',
                nativeCurrency: {
                  name: 'Sepolia ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://eth-sepolia.g.alchemy.com/v2/QBzpsl7E_1rFjodxHnHfvCll_1QgRqG4', 'https://eth-sepolia.g.alchemy.com/v2/QBzpsl7E_1rFjodxHnHfvCll_1QgRqG4'],
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              },
            ],
          });
        } catch (addErr) {
          setError('Failed to add Sepolia network');
          console.error('Add network error:', addErr);
        }
      } else {
        console.error('Switch chain error:', err);
      }
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setContract(null);
    setAccount(null);
    setChainId(null);
    setError(null);
  };

  useEffect(() => {
    // Only auto-connect if MetaMask is available
    if (!window.ethereum) {
      console.log('MetaMask not available');
      return;
    }

    setMetamaskFound(true);

    // Check if already connected
    const checkConnection = async () => {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          const browserProvider = new BrowserProvider(window.ethereum);
          const signerInstance = await browserProvider.getSigner();
          const network = await browserProvider.getNetwork();

          setProvider(browserProvider);
          setSigner(signerInstance);
          setAccount(accounts[0]);
          setChainId(Number(network.chainId));

          // Create contract instance
          const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerInstance);
          setContract(contractInstance);
        }
      } catch (err) {
        console.log('Auto-connect failed:', err.message);
      }
    };

    checkConnection();

    // Listen for account changes
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // User disconnected
        disconnectWallet();
      } else {
        // Account changed, reconnect
        checkConnection();
      }
    };

    const handleChainChanged = () => {
      // Chain changed, reconnect to update network info
      checkConnection();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      try {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      } catch (err) {
        console.log('Error removing listeners:', err);
      }
    };
  }, []);

  const value = {
    provider,
    signer,
    contract,
    account,
    chainId,
    loading,
    error,
    connectWallet,
    disconnectWallet,
    switchToSepolia,
    isConnected: !!account,
    isCorrectNetwork: chainId === SEPOLIA_CHAIN_ID,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};
