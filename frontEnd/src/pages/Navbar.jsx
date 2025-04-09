// components/Navbar.jsx
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWeb3 } from "../context/Web3Context";
import { useState, useEffect } from "react";
import Borrow from "../pages/Borrow";
import Pool from "./Pool2";
import Repay from "../pages/Repay";
import TokenBackground from "../components/TokenBackground";

const Navbar = () => {
  const { account, connectWallet, isConnected } = useWeb3();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Format account address for display
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white flex flex-col">
        {/* Fixed Navbar */}
        <motion.nav
          className={`fixed top-0 left-0 right-0 w-full z-50 ${
            scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
          } transition-all duration-300`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 border-b border-zinc-800/50">
            <div className="flex items-center justify-between relative">
              {/* Logo */}
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                  Wind
                </span>
              </motion.div>
              
              {/* Center - Links */}
              <div className="mx-auto flex flex-row gap-8 text-md font-medium">
                <NavLink
                  to="/borrow"
                  className={({ isActive }) =>
                    isActive
                      ? "text-pink-400 font-semibold transition-all"
                      : "text-zinc-400 hover:text-pink-400 transition-all"
                  }
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Borrow
                  </motion.div>
                </NavLink>
                <NavLink
                  to="/repay"
                  className={({ isActive }) =>
                    isActive
                      ? "text-pink-400 font-semibold transition-all"
                      : "text-zinc-400 hover:text-pink-400 transition-all"
                  }
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Repay
                  </motion.div>
                </NavLink>
                <NavLink
                  to="/pool"
                  className={({ isActive }) =>
                    isActive
                      ? "text-pink-400 font-semibold transition-all"
                      : "text-zinc-400 hover:text-pink-400 transition-all"
                  }
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Pool
                  </motion.div>
                </NavLink>
              </div>
              
              {/* Right - Connect Button */}
              <div>
                <motion.button
                  className={`font-semibold px-5 py-2 rounded-xl transition duration-300 ${
                    isConnected 
                      ? "bg-gradient-to-r from-green-500 to-emerald-700 text-white" 
                      : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={isConnected ? undefined : connectWallet}
                >
                  {isConnected ? formatAddress(account) : "Connect"}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Background */}
        <TokenBackground />
        
        {/* Content */}
        <div className="w-full mt-24 z-10 flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/borrow" replace />} />
            <Route path="/borrow" element={<Borrow />} />
            <Route path="/repay" element={<Repay />} />
            <Route path="/pool" element={<Pool />} />
            <Route path="*" element={<Navigate to="/borrow" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Navbar;