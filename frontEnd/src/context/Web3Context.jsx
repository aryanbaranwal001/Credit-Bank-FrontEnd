// context/Web3Context.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [networkId, setNetworkId] = useState(null);

  // Check if wallet is already connected on load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            const network = await provider.getNetwork();
            const signer = provider.getSigner();
            
            setAccount(accounts[0]);
            setProvider(provider);
            setSigner(signer);
            setIsConnected(true);
            setNetworkId(network.chainId);
          }
        } catch (error) {
          console.error("Failed to load web3 data:", error);
        }
      }
    };
    
    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
      window.ethereum.on("chainChanged", handleChainChange);
      
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
        window.ethereum.removeListener("chainChanged", handleChainChange);
      };
    }
  }, []);

  const handleAccountChange = async (accounts) => {
    if (accounts.length === 0) {
      // User disconnected
      setAccount(null);
      setIsConnected(false);
      setSigner(null);
      toast.info("Wallet disconnected");
    } else {
      // Account changed
      setAccount(accounts[0]);
      if (provider) {
        setSigner(provider.getSigner());
      }
      toast.success("Account changed");
    }
  };

  const handleChainChange = (chainIdHex) => {
    const chainId = parseInt(chainIdHex, 16);
    setNetworkId(chainId);
    window.location.reload();
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed! Please install MetaMask first.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();
      const signer = provider.getSigner();
      
      setAccount(accounts[0]);
      setProvider(provider);
      setSigner(signer);
      setIsConnected(true);
      setNetworkId(network.chainId);
      
      toast.success("Wallet connected successfully!");
      return true;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
      return false;
    }
  };

  // Example dummy contract interaction function
  const borrowTokens = async (collateralTokens, borrowToken, borrowAmount, startDate, endDate) => {
    if (!isConnected || !signer) {
      toast.error("Please connect your wallet first");
      return false;
    }

    try {
      // Dummy contract ABI and address - replace with your actual contract
      const contractABI = [
        "function borrow(address[] collateralTokens, uint256[] collateralAmounts, address borrowToken, uint256 borrowAmount, uint256 startTimestamp, uint256 endTimestamp) external returns (bool)"
      ];
      const contractAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual contract address
      
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      // Prepare parameters
      const collateralAddresses = collateralTokens.map(item => item.token.address);
      const collateralAmounts = collateralTokens.map(item => 
        ethers.utils.parseUnits(item.amount.toString(), item.token.decimals || 18)
      );
      
      const formattedBorrowAmount = ethers.utils.parseUnits(
        borrowAmount.toString(), 
        borrowToken.decimals || 18
      );
      
      const startTimestamp = Math.floor(startDate.getTime() / 1000);
      const endTimestamp = Math.floor(endDate.getTime() / 1000);
      
      // Call contract function
      const tx = await contract.borrow(
        collateralAddresses,
        collateralAmounts,
        borrowToken.address,
        formattedBorrowAmount,
        startTimestamp,
        endTimestamp
      );
      
      toast.info("Transaction submitted. Waiting for confirmation...");
      
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      
      toast.success("Borrow successful!");
      return receipt;
    } catch (error) {
      console.error("Borrow failed:", error);
      toast.error(`Transaction failed: ${error.message}`);
      return false;
    }
  };

  const value = {
    account,
    provider,
    signer,
    isConnected,
    networkId,
    connectWallet,
    borrowTokens
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};