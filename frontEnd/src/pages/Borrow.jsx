import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown, X, MoveRight } from "lucide-react";

const TOKENS = [
  { name: "USDC", symbol: "USDC", address: "0xA0b8...eB48" },
  { name: "Ethereum", symbol: "ETH" },
  { name: "Tether", symbol: "USDT", address: "0xdAC1...1ec7" },
  { name: "Base ETH", symbol: "ETH" },
  { name: "Wrapped Bitcoin", symbol: "WBTC", address: "0x2260...C599" },
  { name: "USD Coin", symbol: "USDC", address: "0xaf88...5831" },
  { name: "Chainlink", symbol: "LINK", address: "0x514910...EE4E" },
  { name: "Uniswap", symbol: "UNI", address: "0x1f9840...BABE" },
  { name: "Aave", symbol: "AAVE", address: "0x7Fc66...C9A0" },
  { name: "Polygon", symbol: "MATIC", address: "0x7D1A...A4C2" },
  { name: "Compound", symbol: "COMP", address: "0xc00e...E4B8" },
  { name: "Dai", symbol: "DAI", address: "0x6B175...4dd1" },
];

export default function Borrow() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Borrow");

  const [selectedSellToken, setSelectedSellToken] = useState({
    name: "Ethereum",
    symbol: "ETH",
  });

  const [selectedBuyToken, setSelectedBuyToken] = useState({
    name: "USDC",
    symbol: "USDC",
  });

  const [tokenModalType, setTokenModalType] = useState("sell");

  const openModalFor = (type) => {
    setTokenModalType(type);
    setTokenModalOpen(true);
  };

  const handleSelectToken = (token) => {
    if (tokenModalType === "sell") {
      setSelectedSellToken(token);
    } else {
      setSelectedBuyToken(token);
    }
    setTokenModalOpen(false);
  };

  return (
    <div className="relative min-h-full bg-black text-white flex justify-center p-4">
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-10 transition-opacity duration-300"></div>
      )}

      <div className="pt-[8vh] w-full max-w-md rounded-xl shadow-xl">


        {/* Sell */}
        <div className="bg-zinc-900 px-3 py-2 rounded-lg">
          <div className="text-base text-zinc-400 mb-1">Sell</div>
          <div className="flex items-center justify-between">
            <input
              type="number"
              placeholder="0"
              className="bg-transparent text-3xl outline-none w-full"
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => openModalFor("sell")}
                className="bg-zinc-800 text-white px-2 py-2 rounded-lg flex items-center space-x-1"
              >
                <span className="text-sm whitespace-nowrap">{selectedSellToken.symbol}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-md text-zinc-500 mt-2">$0</div>
        </div>

        {/* Buy */}
        <div className="bg-zinc-900 px-3 py-2 rounded-xl mt-2">
          <div className="text-base text-zinc-400 mb-1">Buy</div>
          <div className="flex items-center justify-between">
          <input
              type="number"
              placeholder="0"
              className="bg-transparent text-3xl outline-none w-full"
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => openModalFor("buy")}
                className="bg-zinc-800 text-white px-2 py-2 rounded-lg flex items-center space-x-1"
              >
                <span className="text-sm whitespace-nowrap">
                  {selectedBuyToken.symbol}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-md text-zinc-500 mt-2">$0</div>
        </div>

        <div className="bg-zinc-900 px-4 py-2 rounded-xl mt-2 pb-4">
          <div className="text-base text-zinc-400 mb-3">
            Repayment will be done around
          </div>
          <div className="relative z-20">
            <div className="flex items-center justify-center space-x-4">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                onCalendarOpen={() => setIsCalendarOpen(true)}
                onCalendarClose={() => setIsCalendarOpen(false)}
                placeholderText="Start Date"
                popperPlacement="top-center"
                popperClassName="shadow-3xl rounded-xl bg-zinc-900 text-white"
                className="bg-transparent text-xl text-gray-300 text-center outline-none w-36  placeholder-gray-500"
              />

              <MoveRight className="text-xl text-zinc-500 font-normal select-none" />

              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                onCalendarOpen={() => setIsCalendarOpen(true)}
                onCalendarClose={() => setIsCalendarOpen(false)}
                placeholderText="End Date"
                popperPlacement="top-center"
                popperClassName="shadow-3xl rounded-xl bg-zinc-900 text-white"
                className="bg-transparent text-xl text-gray-300 text-center outline-none w-36  placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Select Token Button */}
        <button className="w-full mt-2 bg-zinc-800 rounded-xl py-3 text-center cursor-pointer hover:bg-zinc-700 text-gray-400 hover:text-gray-200 font-semibold">
          Select a token
        </button>
      </div>

      {/* Token Modal */}
      {tokenModalOpen && (
        <>
          <div
            className="absolute w-full inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50"
            onClick={() => setTokenModalOpen(false)}
          ></div>

          <div className="absolute top-20 w-[90%] max-w-sm bg-zinc-900 text-white rounded-2xl p-4 z-50 shadow-lg">
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

            {/* Scroll area styled */}
            <ul className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
              {TOKENS.map((token, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-3 hover:bg-zinc-800 rounded-lg cursor-pointer"
                  onClick={() => handleSelectToken(token)}
                >
                  <div>
                    <div className="text-base font-semibold">{token.name}</div>
                    <div className="text-sm text-zinc-400">
                      {token.symbol} {token.address && ` ${token.address}`}
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
}
