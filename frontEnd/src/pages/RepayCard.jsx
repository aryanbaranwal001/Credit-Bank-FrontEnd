import React, { useState } from "react";

const RepayCard = ({ data }) => {
  const [collateralInput, setCollateralInput] = useState("");
  const [repayInput, setRepayInput] = useState("");

  return (
    <div className="flex items-center bg-black border border-white rounded-xl p-6 space-x-6">
      {/* Index */}
      <div className="text-3xl font-bold">{data.id}</div>

      {/* Main layout: grid with 3 columns */}
      <div className="flex-1 grid grid-cols-3 gap-6 items-start">
        {/* Collateral */}
        <div className="text-center">
          <h2 className="text-lg font-medium mb-2">Collateral</h2>
          <p className="text-xl">{data.collateral}</p>
          <p className="text-gray-400 mb-4">{data.collateralValue}</p>

          <input
            type="number"
            value={collateralInput}
            onChange={(e) => setCollateralInput(e.target.value)}
            className="w-full bg-transparent border border-white rounded-lg p-2 mb-2"
            placeholder="0"
          />
          <button className="w-full border border-white rounded-lg py-2 hover:bg-white hover:text-black transition">
            Add Collateral
          </button>
        </div>

        {/* Borrow */}
        <div className="text-center">
          <h2 className="text-lg font-medium mb-2">Borrow</h2>
          <p className="text-xl">{data.borrow}</p>
          <p className="text-gray-400 mb-4">{data.borrowValue}</p>

          <input
            type="number"
            value={repayInput}
            onChange={(e) => setRepayInput(e.target.value)}
            className="w-full bg-transparent border border-white rounded-lg p-2 mb-2"
            placeholder="0"
          />
          <button className="w-full border border-white rounded-lg py-2 hover:bg-white hover:text-black transition">
            Repay
          </button>
        </div>

        {/* Metrics */}
        <div className="flex flex-col justify-center space-y-4 text-lg">
          <div>
            <span className="font-medium">Health Factor:</span> {data.healthFactor}
          </div>
          <div>
            <span className="font-medium">Credit Score:</span> {data.creditScore}
          </div>
        </div>
      </div>
    </div>
  );
};


export default RepayCard