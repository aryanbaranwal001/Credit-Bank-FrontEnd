import { NavLink } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Borrow from "./Borrow.jsx";
import  History from "./History.jsx";
import  Repay from "./Repay.jsx";

const Navbar = () => {
  return (
    <>
      <div className="relative min-h-screen bg-black text-white flex justify-center p-4 box-border">
        <nav className="fixed top-0 w-full bg-black text-white px-8 py-5 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between relative">
            <div className="absolute left-0 flex items-center gap-2">
              <span className="font-semibold text-lg">Wind</span>
            </div>

            {/* Center - Links */}
            <div className="mx-auto flex gap-8 text-md font-bold">
              <NavLink
                to="/borrow"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-400 transition"
                    : "text-zinc-400 hover:text-pink-400 transition"
                }
              >
                Borrow
              </NavLink>
              <NavLink
                to="/repay"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-400 transition"
                    : "text-zinc-400 hover:text-pink-400 transition"
                }
              >
                Repay
              </NavLink>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-400 transition"
                    : "text-zinc-400 hover:text-pink-400 transition"
                }
              >
                History
              </NavLink>
            </div>

            {/* Right - App Button */}
            <div className="absolute right-0">
              <button className="text-pink-500 font-semibold px-6 py-2 rounded-xl bg-gray-900 hover:bg-gray-800  transition duration-200">
                Connect
              </button>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="w-full h-[94vh] bg-black">
          <Routes>
            <Route path="/borrow" element={<Borrow />} />
            <Route path="/repay" element={<Repay />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
export default Navbar;
