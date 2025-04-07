import React, { useState } from "react";
import { RepaymentData } from "../data";
import { X } from "lucide-react";

const RepayCard = () => {
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState({});
  const [activeTokenCardId, setActiveTokenCardId] = useState(null);

  const TOKENS = [
    { name: "ETH", symbol: "ETH" },
    { name: "USDT", symbol: "USDT" },
    { name: "weETH", symbol: "weETH" },
    { name: "BOB", symbol: "BOB" },
    { name: "DAI", symbol: "DAI" },
  ];

  const handleSelectToken = (token) => {
    if (activeTokenCardId !== null) {
      setSelectedTokens((prev) => ({
        ...prev,
        [activeTokenCardId]: token.name,
      }));
      setTokenModalOpen(false);
      setActiveTokenCardId(null);
    }
  };

  return (
    <div className="h-[85vh] relative text-white bg-black flex flex-col items-center justify-start p-6">
      {/* Fixed Header */}
      <div className="fixed top-[80px] z-10 w-[48%] rounded-t-2xl bg-zinc-900 shadow-2xl border-b border-zinc-700">
        <div className="h-16 flex items-center justify-center text-2xl font-bold tracking-wide text-white">
          Repayments
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="mt-[3vh] w-full max-w-[50%] overflow-y-auto custom-scrollbar">
        {RepaymentData.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 rounded-2xl p-6 mb-8 shadow-xl border border-zinc-700 transition-transform duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Collateral Section */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-zinc-100">
                  Collateral
                </h2>
                {item.collateral.map((col, idx) => (
                  <div key={idx} className="mb-2">
                    <div className="text-base font-medium">
                      {col.amount} {col.token}
                    </div>
                    <div className="text-sm text-zinc-400">${col.usd}</div>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-zinc-800 border border-zinc-700 rounded-xl flex justify-between items-center">
                  <span className="text-sm">Total Collateral</span>
                  <span className="text-base font-semibold text-green-400">
                    ${item.totalCollateral}
                  </span>
                </div>
                <div className="mt-4 flex gap-3 items-center">
                  <input
                    type="number"
                    className="w-24 px-3 py-2 rounded-xl bg-zinc-800 text-white outline-none border border-zinc-700 focus:ring-2 focus:ring-zinc-600"
                    placeholder="0"
                  />
                  <button
                    onClick={() => {
                      setTokenModalOpen(true);
                      setActiveTokenCardId(item.id);
                    }}
                    className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 transition rounded-xl"
                  >
                    {selectedTokens[item.id] || "ETH"}
                  </button>
                </div>
                <button className="mt-4 px-4 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition w-full">
                  Add Collateral
                </button>
              </div>

              {/* Borrow Section */}
              <div className="flex flex-col justify-end">
                <h2 className="text-lg font-semibold mb-4 text-zinc-100">
                  Borrow
                </h2>
                <div className="text-base font-medium">
                  {item.borrow.amount} {item.borrow.token}
                </div>
                <div className="text-sm text-zinc-400 mb-4">
                  ${item.borrow.usd}
                </div>

                <label className="block text-sm mb-2">Repay Amount</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white outline-none border border-zinc-700 focus:ring-2 focus:ring-zinc-600"
                />
                <button className="mt-3 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 transition w-full font-semibold">
                  Repay
                </button>

                <div className="mt-6">
                  <div className="mb-1">
                    Health Factor:{" "}
                    <span className="text-yellow-400">{item.healthFactor}</span>
                  </div>
                  <div>
                    Credit Score:{" "}
                    <span className="text-blue-400">{item.creditScore}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Token Modal */}
      {tokenModalOpen && (
        <>
          <div
            className="absolute w-full inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setTokenModalOpen(false)}
          ></div>

          <div className="absolute top-24 w-[90%] max-w-sm bg-zinc-900 text-white rounded-2xl p-5 z-50 shadow-2xl left-1/2 -translate-x-1/2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">Select a token</h2>
              <button onClick={() => setTokenModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search tokens"
              className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white outline-none mb-5 border border-zinc-700"
            />

            <div className="text-sm text-zinc-400 mb-3">
              Tokens by 24H volume
            </div>

            <ul className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
              {TOKENS.map((token, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-3 hover:bg-zinc-800 rounded-lg cursor-pointer transition"
                  onClick={() => handleSelectToken(token)}
                >
                  <div>
                    <div className="text-base font-semibold">{token.name}</div>
                    <div className="text-sm text-zinc-400">{token.symbol}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default RepayCard;
