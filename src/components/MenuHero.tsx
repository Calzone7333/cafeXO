"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MenuHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#050505] pt-32 pb-20">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-white/5 to-transparent blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 text-center px-6">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] md:text-xs font-black tracking-[0.6em] text-white/30 uppercase mb-4 block font-manrope"
        >
          Artisanal Gastronomy
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black text-white uppercase font-playfair tracking-tighter mb-16"
        >
          THE MENU
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          <a href="/#explore" className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/90 transition-colors font-manrope">
            Explore Menu
          </a>
          <a href="/#signature" className="px-8 py-4 bg-transparent border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/5 transition-colors font-manrope">
            Platter Menu
          </a>
          <a href="/#beverage" className="px-8 py-4 bg-transparent border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/5 transition-colors font-manrope">
            Beverage Menu
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
    </section>
  );
}
