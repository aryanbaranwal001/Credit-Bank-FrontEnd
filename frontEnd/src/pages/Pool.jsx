import React from "react";

const pools = [
  {
    id: "DAI/LINK",
    tvl: "33M",
    tokenA: "DAI",
    tokenB: "LINK",
  },
  {
    id: "ETH/USDC",
    tvl: "50M",
    tokenA: "ETH",
    tokenB: "USDC",
  },
  {
    id: "WBTC/USDT",
    tvl: "18M",
    tokenA: "WBTC",
    tokenB: "USDT",
  },
  {
    id: "UNI/DAI",
    tvl: "25M",
    tokenA: "UNI",
    tokenB: "DAI",
  },
];

const PoolCard = ({ pool }) => {
  return (
    <div className="bg-zinc-900 text-white border border-zinc-700 rounded-2xl p-6 w-full max-w-sm shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm text-zinc-400">POOL</div>
        <div className="text-right">
          <div className="text-xs text-zinc-400">TVL</div>
          <div className="text-md">{pool.tvl}</div>
        </div>
      </div>

      <div className="text-2xl font-mono font-bold mb-6">{pool.id}</div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 text-center">
          <div className="text-sm text-zinc-400 mb-1">{pool.tokenA} Tokens</div>
          <input
            type="number"
            placeholder="0"
            className="w-full rounded-lg px-3 py-2 bg-zinc-800 border border-zinc-600 text-white outline-none"
          />
        </div>
        <div className="flex-1 text-center">
          <div className="text-sm text-zinc-400 mb-1">{pool.tokenB} Tokens</div>
          <input
            type="number"
            placeholder="0"
            className="w-full rounded-lg px-3 py-2 bg-zinc-800 border border-zinc-600 text-white outline-none"
          />
        </div>
      </div>

      <button className="w-full bg-green-700 hover:bg-green-600 text-white font-medium py-2 rounded-xl transition">
        ADD
      </button>
    </div>
  );
};

const PoolsGrid = () => {
  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        {pools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </div>
    </div>
  );
};

export default PoolsGrid;
