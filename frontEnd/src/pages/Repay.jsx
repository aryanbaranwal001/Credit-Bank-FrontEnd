import React, { useState } from "react";
import { RepaymentData } from "../data";
import { X } from "lucide-react";
import { TOKENS } from "../data";

const RepayCard = () => {
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState({});
  const [activeTokenCardId, setActiveTokenCardId] = useState(null);
  const [repayAmounts, setRepayAmounts] = useState({});

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

  console.log("Selected TokenS:", selectedTokens);

  const handleRepay = (itemId) => {
    const amount = repayAmounts[itemId];
    const token = selectedTokens[itemId] || "ETH";
    if (amount && parseFloat(amount) > 0) {
      console.log(`Repaying ${amount} ${token} for item ${itemId}`);
      // Trigger repayment logic here
    } else {
      console.warn("Invalid repay amount");
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
      <div className="mt-[7vh] lg:mt-[5vh] xl:mt-[3vh] w-full max-w-[50%] overflow-y-auto custom-scrollbar">
        {RepaymentData.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 rounded-2xl p-6 mb-8 shadow-xl border border-zinc-700 transition-transform duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-8">
              {/* Collateral Section */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-pink-400">
                  Collateral
                </h2>
                {item.collateral.map((col, idx) => (
                  <div key={idx} className="mb-2">
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
                ))}

                <div className="mt-4 p-4 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-2xl shadow-inner flex items-center justify-between">
                  <div>
                    <div className="text-sm text-zinc-400 uppercase tracking-wide">
                      Total Collateral
                    </div>
                    <div className="text-2xl font-bold text-green-400 mt-1">
                      ${item.totalCollateral}
                    </div>
                  </div>
                </div>

                <div className="mt-4 w-full">
                  <div className="flex flex-col sm:flex-row bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden w-full">
                    <input
                      type="number"
                      className="w-full px-4 pr-10 bg-transparent text-white outline-none text-xl"
                      placeholder="0"
                    />

                    <button
                      onClick={() => {
                        setTokenModalOpen(true);
                        setActiveTokenCardId(item.id);
                      }}
                      className="pl-4 py-2 pr-2 md:w-auto md:pr-12 lg:pr-8  mr-32 w-full flex flex-row items-center   bg-[#3c3c44] hover:bg-[#4b4b52e1]  text-white transition"
                    >
                      {selectedTokens[item.id]?.img ? (
                        <img
                          src={selectedTokens[item.id].img}
                          alt="Token"
                          className="aspect-square h-6 max-h-6 w-auto mr-2 object-contain"
                        />
                      ) : (
                        <img
                          src="../../img/dai-modified.png"
                          alt="Token"
                          className="aspect-square h-6 max-h-6 w-auto mr-2 object-contain"
                        />
                      )}
                      <span className="text-[100%]">{selectedTokens[item.id]?.symbol ?? "DAI"}</span>
                    </button>
                  
                  
                  
                  </div>
                </div>

                <button className="mt-4 px-4 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition w-full">
                  Add Collateral
                </button>
              </div>

              {/* Borrow Section */}
              <div className="flex flex-col justify-end">
                <h2 className="text-lg font-semibold mb-4 text-pink-400">
                  Borrowings
                </h2>
                <div className="text-base font-medium">
                  <span className="text-2xl text-pink-200 mr-2">
                    {item.borrow.amount}
                  </span>
                  <span className="text-sm text-gray-400">
                    {item.borrow.token}
                  </span>
                </div>
                <div className="ml-1 text-sm text-emerald-500 mb-4">
                  ${item.borrow.usd}
                </div>

                <label className="block text-sm mb-2">Repay Amount</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white outline-none border border-zinc-700 focus:ring-2 focus:ring-zinc-600"
                  value={repayAmounts[item.id] || ""}
                  onChange={(e) =>
                    setRepayAmounts((prev) => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }))
                  }
                />
                <button
                  className="mt-3 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 transition w-full font-semibold"
                  onClick={() => handleRepay(item.id)}
                >
                  Repay
                </button>
              </div>

              {/* Additional Information */}
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
        ))}
      </div>

      {/* Token Modal */}
      {tokenModalOpen && (
        <>
          <div
            className="absolute w-full inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setTokenModalOpen(false)}
          ></div>

          <div className="absolute top-20 w-[90%] max-w-sm bg-zinc-900 text-white rounded-2xl p-4 z-50 shadow-lg">
            <div className="flex items-center justify-between mb-5 border-b-2 border-zinc-800 pb-2">
              <h2 className="text-xl font-semibold">Select a token</h2>
              <button onClick={() => setTokenModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scroll area styled */}
            <ul className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
              {TOKENS.map((token, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-3 hover:bg-zinc-800 rounded-lg cursor-pointer"
                  onClick={() => handleSelectToken(token)}
                >
                  <div className="flex flex-row items-center gap-3">
                    <img
                      className="size-[15%]"
                      src={`${token.img}`}
                      alt={`${token.symbol}`}
                    />
                    <div>
                      <div className="text-base font-semibold">
                        {token.name}
                      </div>
                      <div className="text-sm text-zinc-400">
                        {token.symbol}
                        <span className="text-gray-500 ml-1">
                          {token.address && ` ${token.address}`}
                        </span>
                      </div>
                    </div>
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
