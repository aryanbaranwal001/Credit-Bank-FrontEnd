// pages/Borrow.jsx
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown, X, MoveRight, Plus, Calendar, Info, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useWeb3 } from "../context/Web3Context";
import { TOKENS } from "../data.js";

// Token dropdown menu with animations
const TokenDropdown = ({ isOpen, tokens, onSelect, onClose, position }) => {
  const dropdownPosition = position === "top" ? "-top-2 -translate-y-full" : "top-full";
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`absolute ${dropdownPosition} right-0 w-64 bg-zinc-900 rounded-xl shadow-xl border border-zinc-800 z-50`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-3 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium">Select Token</h3>
              <button onClick={onClose} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto py-2 custom-scrollbar">
            {tokens.length > 0 ? (
              tokens.map((token) => (
                <motion.div
                  key={token.symbol}
                  className="px-3 py-2 hover:bg-zinc-800 cursor-pointer"
                  whileHover={{ backgroundColor: "rgba(161, 161, 170, 0.2)" }}
                  onClick={() => onSelect(token)}
                >
                  <div className="flex items-center space-x-3">
                    <img src={token.img} alt={token.symbol} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="text-white font-medium">{token.symbol}</div>
                      <div className="text-xs text-zinc-400">{token.name}</div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-zinc-400">
                No available tokens
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Individual collateral input field component
const CollateralField = ({ 
  item, 
  availableTokens, 
  onChange, 
  onRemove, 
  isLast, 
  isFirst 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleAmountChange = (e) => {
    const value = e.target.value;
    onChange({ ...item, amount: value });
  };
  
  const handleTokenSelect = (token) => {
    onChange({ ...item, token });
    setIsDropdownOpen(false);
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative mb-3"
    >
      <motion.div 
        className="bg-zinc-900/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-zinc-800/50"
        whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-sm text-zinc-400 mb-1">Collateral</div>
        <div className="flex items-center justify-between">
          <input
            type="number"
            placeholder="0.0"
            value={item.amount}
            onChange={handleAmountChange}
            className="bg-transparent text-2xl outline-none w-full text-white placeholder-zinc-600"
          />
          
          <div className="relative">
            <motion.button
              className="gap-1 bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 rounded-full flex items-center space-x-1"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                className="w-6 h-6 rounded-full"
                src={item.token.img}
                alt={item.token.symbol}
              />
              <span className="text-sm whitespace-nowrap mr-1">{item.token.symbol}</span>
              <ChevronDown size={16} />
            </motion.button>
            
            <TokenDropdown
              isOpen={isDropdownOpen}
              tokens={availableTokens}
              onSelect={handleTokenSelect}
              onClose={() => setIsDropdownOpen(false)}
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-2">
          <div className="text-sm text-zinc-500">$0.00</div>
          {!isFirst && (
            <motion.button
              onClick={onRemove}
              className="text-xs text-pink-400 hover:text-pink-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Remove
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Borrow() {
  const { isConnected, connectWallet, borrowTokens } = useWeb3();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [borrowAmount, setBorrowAmount] = useState("");
  const [dropdownType, setDropdownType] = useState(null);
  
  // Collateral fields
  const [collaterals, setCollaterals] = useState([
    {
      id: Date.now(),
      token: TOKENS[0],
      amount: "",
    },
  ]);
  
  // Selected borrow token
  const [selectedBorrowToken, setSelectedBorrowToken] = useState(TOKENS[0]);
  
  // Calculate what tokens are available for collateral (not already selected)
  const getAvailableTokens = (currentId) => {
    const selectedTokens = collaterals
      .filter(item => item.id !== currentId)
      .map(item => item.token.symbol);
    
    return TOKENS.filter(token => !selectedTokens.includes(token.symbol));
  };
  
  // Find next available token that isn't currently selected
  const getNextAvailableToken = () => {
    const selectedTokens = collaterals.map(item => item.token.symbol);
    return TOKENS.find(token => !selectedTokens.includes(token.symbol)) || TOKENS[0];
  };
  
  // Handle adding a new collateral field
  const addCollateral = () => {
    if (collaterals.length >= 5) {
      toast.warning("Maximum 5 collateral fields allowed");
      return;
    }
    
    const nextToken = getNextAvailableToken();
    
    setCollaterals(prev => [
      ...prev,
      {
        id: Date.now(),
        token: nextToken,
        amount: "",
      }
    ]);
  };
  
  // Handle removing a collateral field
  const removeCollateral = (id) => {
    setCollaterals(prev => prev.filter(item => item.id !== id));
  };
  
  // Update a specific collateral field
  const updateCollateral = (updatedItem) => {
    setCollaterals(prev => 
      prev.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
  };
  
  // Date validation
  const validateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (startDate && startDate < today) {
      toast.error("Start date cannot be in the past");
      return false;
    }
    
    if (startDate && endDate && endDate <= startDate) {
      toast.error("End date must be after start date");
      return false;
    }
    
    return true;
  };
  
  // Validate form before submission
  const validateForm = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return false;
    }
    
    if (!startDate || !endDate) {
      toast.error("Please select start and end dates");
      return false;
    }
    
    if (!validateDates()) {
      return false;
    }
    
    if (!borrowAmount || parseFloat(borrowAmount) <= 0) {
      toast.error("Please enter a valid borrow amount");
      return false;
    }
    
    const validCollaterals = collaterals.filter(
      item => item.amount && parseFloat(item.amount) > 0
    );
    
    if (validCollaterals.length === 0) {
      toast.error("Please add at least one collateral with an amount");
      return false;
    }
    
    return true;
  };
  
  // Handle borrow submission
  const handleBorrow = async () => {
    if (!validateForm()) return;
    
    // Filter out collaterals with empty amounts
    const validCollaterals = collaterals.filter(
      item => item.amount && parseFloat(item.amount) > 0
    );
    
    // Call contract function from Web3Context
    const result = await borrowTokens(
      validCollaterals,
      selectedBorrowToken,
      borrowAmount,
      startDate,
      endDate
    );
    
    if (result) {
      // Reset form
      setBorrowAmount("");
      setStartDate(null);
      setEndDate(null);
      setCollaterals([
        {
          id: Date.now(),
          token: TOKENS[0],
          amount: "",
        }
      ]);
    }
  };
  
  useEffect(() => {
    // Validate dates whenever they change
    if (startDate && endDate) {
      validateDates();
    }
  }, [startDate, endDate]);

  return (
    <div className="w-full flex justify-center items-center min-h-screen py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Borrow Assets
          </h1>
          <p className="text-zinc-400 mt-2">
            Supply collateral and borrow assets with flexible terms
          </p>
        </motion.div>

        <motion.div
          className="bg-zinc-900/30 backdrop-blur-xl rounded-3xl border border-zinc-800/50 p-5 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {/* Collateral Fields */}
          <AnimatePresence>
            {collaterals.map((item, idx) => (
              <CollateralField
                key={item.id}
                item={item}
                availableTokens={getAvailableTokens(item.id)}
                onChange={updateCollateral}
                onRemove={() => removeCollateral(item.id)}
                isLast={idx === collaterals.length - 1}
                isFirst={idx === 0}
              />
            ))}
          </AnimatePresence>

          {/* Add Collateral Button */}
          {collaterals.length < 5 && (
            <motion.div 
              className="flex justify-center my-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-4 py-2 rounded-xl flex items-center space-x-2 text-sm transition-all"
                onClick={addCollateral}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Plus size={16} />
                <span>Add Collateral</span>
              </motion.button>
            </motion.div>
          )}

          {/* Borrow Section */}
          <motion.div
            className="bg-zinc-900/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-zinc-800/50 mt-5"
            whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
          >
            <div className="text-sm text-zinc-400 mb-1">Borrow</div>
            <div className="flex items-center justify-between">
              <input
                type="number"
                placeholder="0.0"
                value={borrowAmount}
                onChange={(e) => setBorrowAmount(e.target.value)}
                className="bg-transparent text-2xl outline-none w-full text-white placeholder-zinc-600"
              />
              
              <div className="relative">
                <motion.button
                  className="gap-1 bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 rounded-full flex items-center space-x-1"
                  onClick={() => setDropdownType("borrow")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    className="w-6 h-6 rounded-full"
                    src={selectedBorrowToken.img}
                    alt={selectedBorrowToken.symbol}
                  />
                  <span className="text-sm whitespace-nowrap mr-1">{selectedBorrowToken.symbol}</span>
                  <ChevronDown size={16} />
                </motion.button>
                
                <TokenDropdown
                  isOpen={dropdownType === "borrow"}
                  tokens={TOKENS}
                  onSelect={(token) => {
                    setSelectedBorrowToken(token);
                    setDropdownType(null);
                  }}
                  onClose={() => setDropdownType(null)}
                />
              </div>
            </div>
            <div className="text-sm text-zinc-500 mt-2">$0.00</div>
          </motion.div>

          {/* Date Selector */}
          <motion.div
            className="bg-zinc-900/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-zinc-800/50 mt-4"
            whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
          >
            <div className="text-sm text-zinc-400 mb-3">Repayment Period</div>
            
            <div className="flex items-center justify-between relative z-20">
              <div className="flex items-center space-x-2 bg-zinc-800/80 px-3 py-2 rounded-xl">
                <Calendar size={16} className="text-zinc-400" />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  onCalendarOpen={() => setIsCalendarOpen(true)}
                  onCalendarClose={() => setIsCalendarOpen(false)}
                  dateFormat="MMM dd, yyyy"
                  placeholderText="Start Date"
                  minDate={new Date(new Date().setDate(new Date().getDate() + 1))} // Tomorrow
                  className="bg-transparent text-sm text-white outline-none w-28 placeholder-zinc-500"
                />
              </div>
              
              <ArrowRight size={16} className="text-zinc-500" />
              
              <div className="flex items-center space-x-2 bg-zinc-800/80 px-3 py-2 rounded-xl">
                <Calendar size={16} className="text-zinc-400" />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  onCalendarOpen={() => setIsCalendarOpen(true)}
                  onCalendarClose={() => setIsCalendarOpen(false)}
                  dateFormat="MMM dd, yyyy"
                  placeholderText="End Date"
                  minDate={startDate || new Date(new Date().setDate(new Date().getDate() + 2))} // Start date or day after tomorrow
                  className="bg-transparent text-sm text-white outline-none w-28 placeholder-zinc-500"
                />
              </div>
            </div>
            
            <div className="flex items-center mt-3 text-xs text-zinc-400">
              <Info size={12} className="mr-1" />
              <span>Set a time period for your loan</span>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {isConnected ? (
              <motion.button
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl"
                onClick={handleBorrow}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                Borrow Token
              </motion.button>
            ) : (
              <motion.button
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl"
                onClick={connectWallet}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                Connect Wallet
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}