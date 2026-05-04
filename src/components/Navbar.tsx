"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/#menu" },
    { name: "What We Are", href: "/#what-we-are" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/" || href === "Home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-0 left-0 w-full z-[100] px-8 md:px-24 py-8 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/50 to-transparent"
      >
        {/* Logo */}
        <a href="/" onClick={(e) => handleLinkClick(e, "/")} className="flex items-center group">
          <img 
            src="/Logo.png" 
            alt="CAFEXO" 
            className="h-12 md:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.name)}
              className="text-[12px] font-black tracking-[0.2em] text-white uppercase transition-colors font-manrope hover:text-white/60"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 z-50 relative p-2"
        >
          <motion.div 
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }} 
            className="w-6 h-[2px] bg-white origin-center" 
          />
          <motion.div 
            animate={{ opacity: isOpen ? 0 : 1 }} 
            className="w-6 h-[2px] bg-white" 
          />
          <motion.div 
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }} 
            className="w-6 h-[2px] bg-white origin-center" 
          />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-black z-[90] flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.name)}
                className="text-4xl font-black text-white uppercase font-playfair tracking-tighter"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
