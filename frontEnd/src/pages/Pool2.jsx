import React, { useState, useEffect } from "react";
import { TOKENS } from "../data";

// Expanded token data with ratios and prices
const tokenData = [
  { symbol: "DAI", ratio: 100, price: 1.00 },
  { symbol: "LINK", ratio: 5, price: 20.50 },
  { symbol: "WBTC", ratio: 0.002, price: 52000.00 },
  { symbol: "WETH", ratio: 0.05, price: 3800.00 },
  { symbol: "USDC", ratio: 100, price: 1.00 }
];

// Helper to get token image
const getTokenImage = (symbol) => {
  const token = TOKENS.find((t) => t.symbol === symbol);
  return token?.img || "";
};

// Main component
export default function EnhancedPool() {
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [values, setValues] = useState(tokenData.map(() => ""));
  const [animationPhase, setAnimationPhase] = useState(0);

  // Background animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (index, value) => {
    if (value === "") {
      setValues(tokenData.map(() => ""));
      setActiveInputIndex(null);
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    const newValues = [...values];
    newValues[index] = value;
    
    // Calculate other values based on ratios
    const baseAmount = numValue / tokenData[index].ratio;
    
    tokenData.forEach((token, i) => {
      if (i !== index) {
        newValues[i] = (baseAmount * token.ratio).toFixed(token.ratio < 1 ? 6 : 2);
      }
    });
    
    setValues(newValues);
    setActiveInputIndex(index);
  };

  const calculateUsdValue = (amount, price) => {
    if (!amount || amount === "") return "$0.00";
    return `$${(parseFloat(amount) * price).toFixed(2)}`;
  };

  return (
    <div className="p-6 bg-black min-h-screen flex justify-center items-center">
      <div 
        className="absolute inset-0 opacity-20 overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${30 + Math.sin(animationPhase * 0.01) * 40}% ${50 + Math.cos(animationPhase * 0.01) * 30}%, rgba(16, 185, 129, 0.3), transparent 60%),
                     radial-gradient(circle at ${70 + Math.cos(animationPhase * 0.02) * 40}% ${30 + Math.sin(animationPhase * 0.01) * 30}%, rgba(59, 130, 246, 0.3), transparent 60%)`
        }}
      />
      
      <div className="relative z-10 bg-zinc-900 border border-zinc-700 rounded-3xl p-8 w-full max-w-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Liquidity Pool</h2>
            <p className="text-zinc-400">Deposit tokens in a fixed ratio</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-zinc-400">TVL</div>
            <div className="text-xl font-semibold text-white">$126M</div>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          {tokenData.map((token, index) => (
            <div key={token.symbol} className="flex flex-col">
              <div className="flex justify-between mb-1">
                <div className="text-sm text-zinc-400">{token.symbol} Tokens</div>
                <div className="text-sm text-zinc-400">
                  {calculateUsdValue(values[index], token.price)}
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0"
                  value={values[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  disabled={activeInputIndex !== null && activeInputIndex !== index}
                  className={`w-full pl-10 rounded-lg px-3 py-3 bg-zinc-800 border ${
                    activeInputIndex === index 
                      ? "border-green-500" 
                      : activeInputIndex !== null 
                        ? "border-zinc-600 bg-zinc-800 text-zinc-300" 
                        : "border-zinc-600 hover:border-zinc-500"
                  } text-white outline-none transition-all duration-300`}
                />
                <img
                  src={getTokenImage(token.symbol)}
                  alt={token.symbol}
                  className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <button 
            className={`w-full py-3 rounded-xl font-medium text-lg transition-all duration-300 ${
              values.some(v => v !== "") 
                ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white" 
                : "bg-zinc-700 text-zinc-300 cursor-not-allowed"
            }`}
            disabled={!values.some(v => v !== "")}
          >
            Deposit Tokens
          </button>
        </div>
        
        <div className="mt-6 bg-zinc-800 rounded-xl p-4">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Protocol Fee</span>
            <span className="text-zinc-300">0.3%</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-zinc-400">Price Impact</span>
            <span className="text-green-500">{"< 0.01%"}</span>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {tokenData.map((token) => (
              <img 
                key={token.symbol}
                src={getTokenImage(token.symbol)} 
                alt={token.symbol}
                className="w-6 h-6 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}