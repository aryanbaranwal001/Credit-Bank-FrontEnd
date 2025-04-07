import React from "react";
import { RepaymentData } from "../data";

const Repay = () => {
  return (
    <>
      <div className="relative h-full bg-black text-white flex justify-center p-4">
        <div className="p-4 bg-black text-white h-full">
          <div className="h-[85vh] overflow-y-auto custom-scrollbar rounded-lg ">
            <table className="min-w-full text-left border-collapse">
              <thead className="sticky top-0 bg-gray-900 text-">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Token name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">1H</th>
                  <th className="p-3">1D</th>
                  <th className="p-3">FDV</th>
                  <th className="p-3">Volume</th>
                  <th className="p-3">1D chart</th>
                </tr>
              </thead>
              <tbody>
                {RepaymentData.map((token) => (
                  <tr
                    key={token.id}
                    className="hover:bg-gray-800 border-b border-gray-700"
                  >
                    <td className="p-3">{token.id}</td>
                    <td className="p-3">{token.name}</td>
                    <td className="p-3">{token.price}</td>
                    <td className="p-3 text-green-400">{token.hour}</td>
                    <td className="p-3 text-red-400">{token.day}</td>
                    <td className="p-3">{token.fdv}</td>
                    <td className="p-3">{token.volume}</td>
                    <td className="p-3">{token.chart}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Repay;
