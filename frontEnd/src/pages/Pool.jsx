// pages/Pool.jsx
import { motion } from "framer-motion";

export default function Pool() {
  return (
    <div className="w-full flex justify-center items-center min-h-screen py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 bg-zinc-900/30 backdrop-blur-xl rounded-3xl border border-zinc-800/50 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Pool</h1>
        <p className="text-zinc-400 text-center">
          Pool functionality is coming soon. Here you'll be able to provide liquidity and earn rewards.
        </p>
      </motion.div>
    </div>
  );
}

// pages/Repay.jsx
import { motion } from "framer-motion";

export default function Repay() {
  return (
    <div className="w-full flex justify-center items-center min-h-screen py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 bg-zinc-900/30 backdrop-blur-xl rounded-3xl border border-zinc-800/50 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Repay Loans</h1>
        <p className="text-zinc-400 text-center">
          Repay functionality is coming soon. Here you'll be able to repay your loans and reclaim your collateral.
        </p>
      </motion.div>
    </div>
  );
}