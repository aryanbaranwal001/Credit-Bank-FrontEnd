import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown, X, MoveRight } from "lucide-react";
import {TOKENS} from "../data.js"



export default function Borrow() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Borrow");

  const [sellTokens, setSellTokens] = useState([
    {
      id: Date.now(),
      token: { name: "Ethereum", symbol: "ETH" },
      amount: "",
      img: null,
    },
  ]);

  const [selectedBuyToken, setSelectedBuyToken] = useState({
    name: "USDC",
    symbol: "USDC",
  });

  const [tokenModalType, setTokenModalType] = useState("sell");
  const [activeSellId, setActiveSellId] = useState(null); // for selecting token for a specific sell section

  const openModalFor = (type, id = null) => {
    setTokenModalType(type);
    setActiveSellId(id);
    setTokenModalOpen(true);
  };

  const handleSelectToken = (token) => {
    if (tokenModalType === "sell") {
      setSellTokens((prev) =>
        prev.map((item) =>
          item.id === activeSellId ? { ...item, token } : item
        )
      );
    } else {
      setSelectedBuyToken(token);
    }
    setTokenModalOpen(false);
  };

  const addSellSection = () => {
    const newSell = {
      id: Date.now(),
      token: { name: "Ethereum", symbol: "ETH" },
      amount: "",
    };
    setSellTokens([...sellTokens, newSell]);
  };

  const removeSellSection = (id) => {
    setSellTokens((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative min-h-full mx-[-2%] bg-black text-white flex justify-center p-4 pb-40">
      {/* Calendar overlay */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-10 transition-opacity duration-300"></div>
      )}

      <div className="pt-[8vh] w-full max-w-md rounded-xl shadow-xl">
        {/* SELL SECTIONS */}
        {sellTokens.map((sell, idx) => (
          <div key={sell.id} className="relative mb-2">
            {/* Sell Section */}
            <div className="bg-zinc-900 px-3 py-2 rounded-lg">
              <div className="text-base text-zinc-400 mb-1">Sell</div>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  placeholder="0"
                  value={sell.amount}
                  onChange={(e) =>
                    setSellTokens((prev) =>
                      prev.map((item) =>
                        item.id === sell.id
                          ? { ...item, amount: e.target.value }
                          : item
                      )
                    )
                  }
                  className="bg-transparent text-3xl outline-none w-full"
                />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openModalFor("sell", sell.id)}
                    className="gap-1 bg-zinc-800 text-white pr-3 rounded-full flex flex-row items-center justify-end space-x-1"
                  >
                    {/* <div className="flex "> */}
                      <img className="ml-4 w-6 h-6" src={`${sell.token.img}`} alt={`${sell.token.symbol}`} />
                      <span className="text-sm whitespace-nowrap">
                        {sell.token.symbol} 
                      </span>

                    {/* </div> */}
                    <ChevronDown className="w-12 h-12" />
                  </button>
                </div>
              </div>
              <div className="text-md text-zinc-500 mt-2">$0</div>
            </div>

            {/* Minus button - only if not the first sell */}
            {idx > 0 && (
              <button
                onClick={() => removeSellSection(sell.id)}
                className={`absolute top-1/2 ${idx === sellTokens.length - 1 ? "-translate-y-[120%]" : "-translate-y-1/2"} -translate-y-1/2 translate-x-1 -right-8 w-7 h-7 rounded-full bg-gray-800 text-white text-lg flex items-center justify-center hover:bg-zinc-800`}
                title="Remove this token"
              >
                −
              </button>
            )}

            {/* Plus button - only between sections */}
            {idx === sellTokens.length - 1 && (
              <div className="flex justify-center my-2">
                <button
                  onClick={addSellSection}
                  className="w-8 h-8 rounded-full bg-gray-800 text-white text-lg flex items-center justify-center hover:bg-zinc-800"
                  title="Add another sell token"
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}

        {/* BUY SECTION + CALENDAR remain unchanged below */}

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
                    <img className="size-[15%]" src={`${token.img}`} alt={`${token.symbol}`} />
                    <div>
                      <div className="text-base font-semibold">{token.name}</div>
                      <div className="text-sm text-zinc-400">
                        {token.symbol}<span className="text-gray-500 ml-1">{token.address && ` ${token.address}`}</span>
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
}
