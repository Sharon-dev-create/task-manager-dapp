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

  const connectWallet = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      const browserProvider = new BrowserProvider(window.ethereum);
      const accounts = await browserProvider.send('eth_requestAccounts', []);
      const signerInstance = await browserProvider.getSigner();
      const network = await browserProvider.getNetwork();

      setProvider(browserProvider);
      setSigner(signerInstance);
      setAccount(accounts[0]);
      setChainId(Number(network.chainId));

      // Create contract instance
      const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerInstance);
      setContract(contractInstance);

      // Check if on Sepolia
      if (Number(network.chainId) !== SEPOLIA_CHAIN_ID) {
        setError('Please switch to Sepolia network');
      }
    } catch (err) {
      setError(err.message);
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
                rpcUrls: ['https://sepolia.infura.io/v3/'],
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              },
            ],
          });
        } catch (addErr) {
          setError('Failed to add Sepolia network');
        }
      }
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setContract(null);
    setAccount(null);
    setChainId(null);
  };

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const browserProvider = new BrowserProvider(window.ethereum);
          const accounts = await browserProvider.listAccounts();
          if (accounts.length > 0) {
            await connectWallet();
          }
        } catch (err) {
          console.log('Not connected');
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', connectWallet);
      window.ethereum.on('chainChanged', connectWallet);

      return () => {
        window.ethereum.removeListener('accountsChanged', connectWallet);
        window.ethereum.removeListener('chainChanged', connectWallet);
      };
    }
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
