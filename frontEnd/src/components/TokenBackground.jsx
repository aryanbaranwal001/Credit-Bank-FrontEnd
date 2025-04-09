// components/TokenBackground.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TOKENS } from "../data.js";

const TokenBackground = () => {
  const [tokenPositions, setTokenPositions] = useState([]);
  
  useEffect(() => {
    // Generate random positions for tokens
    const positions = [];
    const numTokens = 15; // We'll create multiple instances of each token
    
    for (let i = 0; i < numTokens; i++) {
      positions.push({
        id: i,
        token: TOKENS[i % TOKENS.length], // Cycle through available tokens
        x: Math.random() * 100, // Random position (percentage of viewport)
        y: Math.random() * 100,
        size: Math.random() * 20 + 20, // Random size between 20px and 40px
        delay: Math.random() * 10, // Random animation delay
        duration: Math.random() * 30 + 20, // Random animation duration
      });
    }
    
    setTokenPositions(positions);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-zinc-900 opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      {tokenPositions.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
          }}
          initial={{ opacity: 0, scale: 0.5, filter: "blur(5px)" }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
            filter: "blur(2px)" 
          }}
          transition={{
            repeat: Infinity,
            duration: item.duration,
            delay: item.delay,
            ease: "easeInOut",
          }}
          whileHover={{ 
            scale: 1.5, 
            opacity: 1, 
            filter: "blur(0px)",
            rotate: [0, 5, -5, 0],
            zIndex: 10
          }}
        >
          <div className="relative w-full h-full">
            <motion.img
              src={item.token.img}
              alt={item.token.symbol}
              className="w-full h-full rounded-full object-contain z-10"
              whileHover={{ 
                rotate: 0,
                boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)" 
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-transparent border border-pink-500/50"
              initial={{ scale: 0.9 }}
              whileHover={{ 
                scale: [0.9, 1.2, 1.1],
                opacity: [0, 0.8, 0.2],
                borderColor: "rgba(236, 72, 153, 0.8)"
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      ))}
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-70"></div>
    </div>
  );
};

export default TokenBackground;