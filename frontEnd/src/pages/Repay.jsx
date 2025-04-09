import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RepaymentData } from "../data";
import { X, ChevronDown, Info } from "lucide-react";
import { TOKENS } from "../data";
import { ethers } from "ethers";

// Global CSS to be added to your stylesheet
const globalStyles = `
/* Remove input arrows */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}

/* Custom Scrollbar - like Claude */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Hide horizontal scrollbar */
.hide-horizontal-scroll {
  overflow-x: hidden;
}

/* For Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

body {
  overflow-x: hidden;
}
`;

const RepayCard = () => {
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState({});
  const [activeTokenCardId, setActiveTokenCardId] = useState(null);
  const [repayAmounts, setRepayAmounts] = useState({});
  const [collateralAmounts, setCollateralAmounts] = useState({});
  const [usdValues, setUsdValues] = useState({});
  const [hoveringItem, setHoveringItem] = useState(null);

  // Format USD value based on amount
  useEffect(() => {
    const mockPrices = {
      DAI: 1,
      ETH: 3500,
      USDC: 1,
      WBTC: 62000,
      LINK: 18,
    };

    const newUsdValues = {};
    
    // Calculate repay values
    Object.entries(repayAmounts).forEach(([itemId, amount]) => {
      const token = selectedTokens[itemId]?.symbol || "DAI";
      const price = mockPrices[token] || 0;
      newUsdValues[`repay-${itemId}`] = amount ? (parseFloat(amount) * price).toFixed(2) : "0.00";
    });
    
    // Calculate collateral values
    Object.entries(collateralAmounts).forEach(([itemId, amount]) => {
      const token = selectedTokens[`collateral-${itemId}`]?.symbol || "ETH";
      const price = mockPrices[token] || 0;
      newUsdValues[`collateral-${itemId}`] = amount ? (parseFloat(amount) * price).toFixed(2) : "0.00";
    });
    
    setUsdValues(newUsdValues);
  }, [repayAmounts, collateralAmounts, selectedTokens]);

  const handleSelectToken = (token) => {
    if (activeTokenCardId !== null) {
      setSelectedTokens((prev) => ({
        ...prev,
        [activeTokenCardId]: {
          name: token.name,
          symbol: token.symbol,
          img: token.img,
        },
      }));
      setTokenModalOpen(false);
      setActiveTokenCardId(null);
    }
  };

  const handleRepay = (itemId) => {
    const amount = repayAmounts[itemId];
    const token = selectedTokens[itemId]?.symbol || "DAI";
    
    if (amount && parseFloat(amount) > 0) {
      console.log(`Repaying ${amount} ${token} for item ${itemId}`);
      // Here you would integrate with ethers.js for blockchain interaction
      // Example:
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      // const tx = await contract.repay(itemId, ethers.utils.parseUnits(amount, 18));
      // await tx.wait();
    } else {
      console.warn("Invalid repay amount");
    }
  };

  const handleAddCollateral = (itemId) => {
    const amount = collateralAmounts[itemId];
    const token = selectedTokens[`collateral-${itemId}`]?.symbol || "ETH";
    
    if (amount && parseFloat(amount) > 0) {
      console.log(`Adding ${amount} ${token} as collateral for item ${itemId}`);
      // Similar ethers.js integration as above
    } else {
      console.warn("Invalid collateral amount");
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  // Style constants for consistent design
  const buttonStyle = "px-5 py-2 rounded-xl text-lg font-semibold transition-all duration-200 shadow-sm";
  const addCollateralButtonStyle = `${buttonStyle} bg-[#28382c] hover:bg-[#2f4e3a] text-emerald-200 hover:text-emerald-300 border border-emerald-900/40`;
  const repayButtonStyle = `${buttonStyle} bg-[#28382c] hover:bg-[#2f4e3a] text-emerald-200 hover:text-emerald-300 border border-emerald-900/40`;

  return (
    <>
      {/* Add global styles */}
      <style>{globalStyles}</style>
      
      <motion.div 
        className="min-h-screen text-white bg-zinc-950 flex flex-col items-center overflow-x-hidden hide-horizontal-scroll"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Fixed Header */}
        <motion.div 
          className="sticky top-0 z-10 w-full max-w-6xl rounded-b-2xl bg-zinc-900 shadow-2xl border-b border-zinc-700"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        >
          <div className="h-16 flex items-center justify-center text-2xl font-bold tracking-wide text-white">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Repayments
            </motion.span>
          </div>
        </motion.div>

        {/* Content Container */}
        <div className="w-full max-w-6xl px-4 py-6 overflow-y-auto hide-horizontal-scroll">
          {RepaymentData.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-zinc-900 rounded-2xl p-4 sm:p-6 mb-8 shadow-xl border border-zinc-700"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveringItem(item.id)}
              onHoverEnd={() => setHoveringItem(null)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-6 lg:gap-8">
                {/* Collateral Section */}
                <div className="bg-zinc-800/50 rounded-xl p-4">
                  <motion.h2 
                    className="text-lg font-semibold mb-4 text-pink-400 flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    Collateral
                    <motion.div 
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Info size={16} className="ml-2 text-pink-300/70" />
                    </motion.div>
                  </motion.h2>
                  
                  <div className="space-y-3">
                    {item.collateral.map((col, idx) => (
                      <motion.div 
                        key={idx} 
                        className="bg-zinc-800/80 rounded-lg p-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="text-base font-medium">
                              <span className="text-2xl text-pink-200 mr-2">
                                {col.amount}
                              </span>
                              <span className="text-sm text-gray-400">{col.token}</span>
                            </div>
                            <div className="ml-1 text-sm text-emerald-500">
                              ${col.usd}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <motion.div 
                      className="mt-4 p-4 bg-gradient-to-r from-zinc-800 to-zinc-800/70 rounded-xl shadow-inner"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-zinc-400 uppercase tracking-wide">
                            Total Collateral
                          </div>
                          <div className="text-2xl font-bold text-green-400 mt-1">
                            ${item.totalCollateral}
                          </div>
                        </div>
                        <motion.div
                          animate={hoveringItem === item.id ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500/20 to-emerald-300/20 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-300"></div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    <div className="mt-4 w-full">
                      <div className="flex flex-col space-y-2">
                        <div className="flex flex-col sm:flex-row bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden w-full">
                          <input
                            type="number"
                            className="pl-4 pr-2 py-3 w-full bg-zinc-800 text-white outline-none text-xl"
                            placeholder="0"
                            value={collateralAmounts[item.id] || ""}
                            onChange={(e) => 
                              setCollateralAmounts((prev) => ({
                                ...prev,
                                [item.id]: e.target.value,
                              }))
                            }
                          />

                          <motion.button
                            onClick={() => {
                              setTokenModalOpen(true);
                              setActiveTokenCardId(`collateral-${item.id}`);
                            }}
                            className="px-4 py-3 w-full sm:max-w-[120px] flex flex-row items-center justify-center bg-[#3c3c44] hover:bg-[#4b4b52] text-white transition"
                            whileHover={{ backgroundColor: "rgba(75, 75, 82, 0.9)" }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {selectedTokens[`collateral-${item.id}`]?.img ? (
                              <img
                                src={selectedTokens[`collateral-${item.id}`].img}
                                alt="Token"
                                className="h-6 w-6 mr-2 object-contain"
                              />
                            ) : (
                              <img
                                src="../../img/eth-modified.png"
                                alt="ETH"
                                className="h-6 w-6 mr-2 object-contain"
                              />
                            )}
                            <span>
                              {selectedTokens[`collateral-${item.id}`]?.symbol ?? "ETH"}
                            </span>
                            <ChevronDown size={16} className="ml-1" />
                          </motion.button>
                        </div>
                        <span className="pr-2 block text-md text-end text-emerald-300">
                          ${usdValues[`collateral-${item.id}`] || "0.00"}
                        </span>
                      </div>
                    </div>

                    <motion.button 
                      className={addCollateralButtonStyle + " w-full mt-4"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddCollateral(item.id)}
                    >
                      Add Collateral
                    </motion.button>
                  </div>
                </div>

                {/* Borrow Section */}
                <div className="bg-zinc-800/50 rounded-xl p-4 flex flex-col justify-between">
                  <motion.h2 
                    className="text-lg font-semibold mb-4 text-pink-400 flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    Borrowings
                    <motion.div 
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Info size={16} className="ml-2 text-pink-300/70" />
                    </motion.div>
                  </motion.h2>

                  <motion.div 
                    className="mt-2 mb-4 p-4 bg-gradient-to-r from-zinc-800 to-zinc-800/70 rounded-xl shadow-inner"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-base font-medium">
                      <span className="text-2xl text-pink-200 mr-2">
                        {item.borrow.amount}
                      </span>
                      <span className="text-sm text-gray-400">
                        {item.borrow.token}
                      </span>
                    </div>
                    <div className="ml-1 text-sm text-emerald-500 mb-2">
                      ${item.borrow.usd}
                    </div>
                  </motion.div>

                  <div className="flex-1">
                    <label className="block text-sm mb-2 text-gray-400">
                      Repayment Amount
                    </label>
                    <div className="flex flex-col">
                      <div className="flex flex-col sm:flex-row bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden w-full">
                        <input
                          type="number"
                          placeholder="0"
                          className="pl-4 pr-2 py-3 w-full bg-zinc-800 text-white outline-none text-xl"
                          value={repayAmounts[item.id] || ""}
                          onChange={(e) =>
                            setRepayAmounts((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                        />

                        <motion.button
                          onClick={() => {
                            setTokenModalOpen(true);
                            setActiveTokenCardId(item.id);
                          }}
                          className="px-4 py-3 w-full sm:max-w-[120px] flex flex-row items-center justify-center bg-[#3c3c44] hover:bg-[#4b4b52] text-white transition"
                          whileHover={{ backgroundColor: "rgba(75, 75, 82, 0.9)" }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {selectedTokens[item.id]?.img ? (
                            <img
                              src={selectedTokens[item.id].img}
                              alt="Token"
                              className="h-6 w-6 mr-2 object-contain"
                            />
                          ) : (
                            <img
                              src="../../img/dai-modified.png"
                              alt="DAI"
                              className="h-6 w-6 mr-2 object-contain"
                            />
                          )}
                          <span>
                            {selectedTokens[item.id]?.symbol ?? "DAI"}
                          </span>
                          <ChevronDown size={16} className="ml-1" />
                        </motion.button>
                      </div>
                      <span className="mt-1 pr-2 block text-md text-end text-emerald-300">
                        ${usdValues[`repay-${item.id}`] || "0.00"}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    className={`${repayButtonStyle} w-full mt-4`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRepay(item.id)}
                  >
                    Repay
                  </motion.button>
                </div>

                {/* Health & Credit Score Section */}
                <div className="bg-zinc-800/30 rounded-xl p-4 flex flex-col justify-center items-center">
                  <div className="flex flex-col sm:flex-row lg:flex-col justify-around items-center gap-5 w-full">
                    <motion.div 
                      className="flex flex-col items-center bg-zinc-800/80 rounded-xl p-4 w-full"
                      whileHover={{ y: -5 }}
                    >
                      <span className="text-green-300 text-lg font-bold tracking-wide">
                        Health Factor
                      </span>
                      <motion.div 
                        className="mt-2 px-6 py-1 text-green-300 text-4xl font-black"
                        initial={{ scale: 0.9 }}
                        animate={hoveringItem === item.id ? 
                          { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 }} : 
                          { scale: 1 }}
                      >
                        {item.healthFactor}
                      </motion.div>
                    </motion.div>

                    <motion.div 
                      className="flex flex-col items-center bg-zinc-800/80 rounded-xl p-4 w-full"
                      whileHover={{ y: -5 }}
                    >
                      <span className="text-blue-400 text-lg font-bold tracking-wide">
                        Credit Score
                      </span>
                      <motion.div 
                        className="mt-2 px-6 py-1 text-blue-400 text-4xl font-black"
                        initial={{ scale: 0.9 }}
                        animate={hoveringItem === item.id ? 
                          { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 }} : 
                          { scale: 1 }}
                      >
                        {item.creditScore}
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="mt-4 text-xs text-center text-zinc-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.5 }}
                  >
                    Maintaining a healthy collateral ratio keeps your assets safe from liquidation
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Token Modal */}
        <AnimatePresence>
          {tokenModalOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setTokenModalOpen(false)}
              ></motion.div>

              <motion.div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-zinc-900 text-white rounded-2xl p-4 z-50 shadow-lg"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex items-center justify-between mb-5 border-b border-zinc-800 pb-2">
                  <h2 className="text-xl font-semibold">Select a token</h2>
                  <motion.button 
                    onClick={() => setTokenModalOpen(false)}
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <ul className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                  {TOKENS.map((token, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center justify-between p-3 hover:bg-zinc-800 rounded-lg cursor-pointer"
                      onClick={() => handleSelectToken(token)}
                      whileHover={{ backgroundColor: "rgba(63, 63, 70, 0.8)", x: 5 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex flex-row items-center gap-3">
                        <div className="h-8 w-8 flex items-center justify-center">
                          <img
                            className="max-h-full"
                            src={token.img}
                            alt={token.symbol}
                          />
                        </div>
                        <div>
                          <div className="text-base font-semibold">
                            {token.name}
                          </div>
                          <div className="text-sm text-zinc-400">
                            {token.symbol}
                            {token.address && (
                              <span className="text-gray-500 ml-1">
                                {`${token.address.substring(0, 6)}...${token.address.substring(token.address.length - 4)}`}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default RepayCard;