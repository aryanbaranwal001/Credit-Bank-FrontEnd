import React from "react";
import { TOKENS } from "../data";

const pools = [
  {
    id: "DAI/LINK",
    tvl: "33M",
    tokenA: "DAI",
    tokenB: "LINK",
  },
  {
    id: "LINK/WBTC",
    tvl: "50M",
    tokenA: "LINK",
    tokenB: "WBTC",
  },
  {
    id: "WBTC/WETH",
    tvl: "18M",
    tokenA: "WBTC",
    tokenB: "WETH",
  },
  {
    id: "WETH/USDC",
    tvl: "25M",
    tokenA: "WETH",
    tokenB: "USDC",
  },
];

// Helper to get token image
const getTokenImage = (symbol) => {
  const token = TOKENS.find((t) => t.symbol === symbol);
  return token?.img || "";
};

const PoolCard = ({ pool }) => {
  return (
    <div className="bg-zinc-900 text-white border border-zinc-700 rounded-2xl p-6 w-full max-w-sm shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm text-zinc-400">POOL</div>
        <div className="text-right">
          <div className="text-xs text-zinc-400">TVL</div>
          <div className="text-md">{pool.tvl}</div>
        </div>
      </div>

      {/* Pool ID */}
      <div className="text-2xl font-mono font-bold mb-6">{pool.id}</div>

      {/* Inputs */}
      <div className="flex space-x-4 mb-6">
        {[pool.tokenA, pool.tokenB].map((token) => (
          <div key={token} className="flex-1 text-center">
            <div className="text-sm text-zinc-400 mb-1">{token} Tokens</div>
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                className="w-full pl-10 rounded-lg px-3 py-2 bg-zinc-800 border border-zinc-600 text-white outline-none"
              />
              <img
                src={getTokenImage(token)}
                alt={token}
                className="w-5 h-5 absolute left-2 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="w-full bg-green-700 hover:bg-green-600 text-white font-medium py-2 rounded-xl transition">
        ADD
      </button>
    </div>
  );
};

const PoolsGrid = () => {
  return (
    <div className="p-6 bg-black min-h-screen flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-screen-lg w-full">
        {pools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </div>
    </div>
  );
};

export default PoolsGrid;
