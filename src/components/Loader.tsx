"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loader

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white font-poppins"
        >
          {/* Cooking Pot Icon */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[#EFBF03] flex flex-col items-center gap-6"
          >
            <motion.svg 
              width="80" 
              height="80" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="overflow-visible"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Steam 1 */}
              <motion.path 
                d="M8 2 C 8 -2, 6 -4, 6 -8" 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], y: [0, -5, -10] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              />
              {/* Steam 2 */}
              <motion.path 
                d="M12 0 C 12 -4, 14 -6, 14 -10" 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], y: [0, -6, -12] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              />
              {/* Steam 3 */}
              <motion.path 
                d="M16 2 C 16 -2, 14 -4, 14 -8" 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], y: [0, -4, -8] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
              />

              {/* Lid - bouncing rapidly */}
              <motion.g
                animate={{ y: [0, -1.5, 0], rotate: [0, -1, 1, 0] }}
                transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M2 10l20 0" />
                <path d="M6 10c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                <path d="M10 4h4v-2h-4v2z" />
              </motion.g>

              {/* Pot Base */}
              <path d="M4 10h16v3.5a5.5 5.5 0 0 1-11 0v-1.5" />
              <path d="M4 10a8 8 0 0 0 16 0" />
              
              {/* Decorative Lines simulating the image */}
              <path d="M8 14h2" />
              <path d="M12 14h1" />
              <path d="M16 12a4 4 0 0 1-2 4" />
              
              {/* Bottom Stand */}
              <path d="M9 18h6v2H9z" />
            </motion.svg>

            {/* Pulsing Text */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-xl font-medium tracking-wide text-[#EFBF03]"
            >
              Brewing...
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
