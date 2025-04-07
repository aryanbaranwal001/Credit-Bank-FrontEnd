import React, { useState } from "react";
import { RepaymentData } from "../data";
import { X } from "lucide-react";

const RepayCard = () => {
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState("ETH");

  const TOKENS = [
    { name: "ETH", symbol: "ETH" },
    { name: "USDT", symbol: "USDT" },
    { name: "weETH", symbol: "weETH" },
    { name: "BOB", symbol: "BOB" },
    { name: "DAI", symbol: "DAI" },
  ];

  const handleSelectToken = (token) => {
    setSelectedToken(token.name);
    setTokenModalOpen(false);
  };

  return (
    <div className="h-[85vh] relative overflow-y-auto custom-scrollbar p-4 text-white bg-black flex flex-col items-center justify-center">
      <div className="flex relative items-center justify-center flex-col max-w-[50%] mt-[60vh]">
        
        <div className="text-2xl top-[100px] fixed bg-gray-300 h-16 w-full flex items-center justify-center font-bold mb-4 z-10">
          Repayments
        </div>
        
        <div className="flex flex-col">
          {RepaymentData.map((item) => (
            <div
              key={item.id}
              className="w-full bg-zinc-900 rounded-2xl p-6 mb-6 shadow-lg border border-zinc-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Collateral</h2>
                  {item.collateral.map((col, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="text-base">
                        {col.amount} {col.token}
                      </div>
                      <div className="text-sm text-zinc-400">${col.usd}</div>
                    </div>
                  ))}
                  <div className="mt-4 p-3 border rounded-xl flex justify-between items-center">
                    <span className="text-sm">Total Collateral</span>
                    <span className="text-base font-semibold">
                      ${item.totalCollateral}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2 items-center">
                    <input
                      type="number"
                      className="w-20 px-3 py-2 rounded-xl bg-zinc-800 text-white outline-none"
                      placeholder="0"
                    />
                    <button
                      onClick={() => setTokenModalOpen(true)}
                      className="px-3 py-2 bg-zinc-700 rounded-xl"
                    >
                      {selectedToken}
                    </button>
                  </div>
                  <button className="mt-3 px-4 py-2 rounded-xl bg-zinc-700">
                    Add Collateral
                  </button>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">Borrow</h2>
                  <div className="text-base">
                    {item.borrow.amount} {item.borrow.token}
                  </div>
                  <div className="text-sm text-zinc-400">
                    ${item.borrow.usd}
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm mb-2">Repay Amount</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white outline-none"
                    />
                    <button className="mt-3 px-4 py-2 rounded-xl bg-zinc-700 w-full">
                      Repay
                    </button>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2">
                      Health Factor: {item.healthFactor}
                    </div>
                    <div>Credit Score: {item.creditScore}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {tokenModalOpen && (
        <>
          <div
            className="absolute w-full inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50"
            onClick={() => setTokenModalOpen(false)}
          ></div>

          <div className="absolute top-20 w-[90%] max-w-sm bg-zinc-900 text-white rounded-2xl p-4 z-50 shadow-lg left-1/2 -translate-x-1/2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">Select a token</h2>
              <button onClick={() => setTokenModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search tokens"
              className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-base text-white outline-none mb-5"
            />

            <div className="text-sm text-zinc-400 mb-3">
              Tokens by 24H volume
            </div>

            <ul className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
              {TOKENS.map((token, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-3 hover:bg-zinc-800 rounded-lg cursor-pointer"
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
