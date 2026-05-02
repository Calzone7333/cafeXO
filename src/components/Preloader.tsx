"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  progress: number;
  isLoaded: boolean;
}

export default function Preloader({ progress, isLoaded }: PreloaderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 1000); // Give it a moment to feel "complete"
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")` }}></div>


          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 text-center"
            >
              <h2 className="text-6xl md:text-8xl font-playfair font-bold tracking-[0.3em] text-white">
                CAFEXO
              </h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" 
              />
            </motion.div>

            {/* Progress Container */}
            <div className="relative w-48 md:w-64">
              <div className="h-[1px] w-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 30, damping: 15 }}
                />
              </div>
            </div>
          </div>

        </motion.div>

      )}
    </AnimatePresence>
  );
}
