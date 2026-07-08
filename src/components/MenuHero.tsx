"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MenuHero() {
  const mainHeadingStyle: React.CSSProperties = {
    fontFamily: '"Adobe Garamond Pro", serif',
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    window.history.pushState(null, "", `/#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    
    // Tiny delay to ensure DOM is ready if we just switched views
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
      
      {/* Background Image with Parallax & Dark Overlay */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: 'url("/images/banner.jpg")' }}
      >
        <div className="absolute inset-0 bg-[#111111]/80 backdrop-blur-[2px]" />
      </motion.div>
      
      <div className="relative z-10 text-center px-6 mt-12">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs md:text-sm font-bold tracking-[0.4em] text-[#EFBF03] uppercase mb-4 block font-poppins"
        >
          Discover Our Offerings
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={mainHeadingStyle}
          className="text-6xl md:text-8xl text-white tracking-wide mb-12 drop-shadow-xl"
        >
          Our Menu
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          <a href="/#menu" onClick={(e) => scrollTo(e, "menu")} className="px-8 py-4 bg-[#EFBF03] text-[#111111] text-xs font-black uppercase tracking-widest hover:bg-[#D4A902] transition-colors font-poppins shadow-lg hover:shadow-[#EFBF03]/40">
            Our Menu
          </a>
          <a href="/#beverage" onClick={(e) => scrollTo(e, "beverage")} className="px-8 py-4 bg-transparent border border-[#EFBF03] text-[#EFBF03] text-xs font-black uppercase tracking-widest hover:bg-[#EFBF03]/10 transition-colors font-poppins">
            Beverage Menu
          </a>
          <a href="/#platter" onClick={(e) => scrollTo(e, "platter")} className="px-8 py-4 bg-transparent border border-[#EFBF03] text-[#EFBF03] text-xs font-black uppercase tracking-widest hover:bg-[#EFBF03]/10 transition-colors font-poppins">
            Platter Menu
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-20 w-[2px] bg-gradient-to-b from-[#EFBF03]/60 to-transparent" />
    </section>
  );
}
