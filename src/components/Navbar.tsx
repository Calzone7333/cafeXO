"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackModal from "./FeedbackModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeLink, setActiveLink] = useState("HOME");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  
  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/#what-we-are" },
    { name: "MENU", href: "/#menu" },
    { name: "EVENT BOOKING", href: "/#event-booking" },
    { name: "FEEDBACK", href: "/#feedback" },
    { name: "CONTACT US", href: "/#contact" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle bg color change
      setScrolled(currentScrollY > 50);

      // Handle hide/show on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true); // Scrolling down
      } else if (currentScrollY < lastScrollY) {
        setHidden(false); // Scrolling up
      }

      lastScrollY = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string, href: string) => {
    e.preventDefault();
    setActiveLink(name);
    setIsOpen(false);

    if (name === "FEEDBACK") {
      setIsFeedbackOpen(true);
      return;
    }

    if (href === "/" || href === "HOME") {
      window.history.pushState(null, "", "/");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href.startsWith("/#")) {
      const hash = href.substring(1);
      window.history.pushState(null, "", href);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "circOut" }}
        className={`fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-5 flex items-center justify-between transition-colors duration-500 font-poppins ${
          scrolled ? "bg-[#111111]/95 backdrop-blur-sm shadow-xl" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="/" onClick={(e) => handleLinkClick(e, "HOME", "/")} className="flex flex-col">
          <img className="h-[50px] w-auto" src="/Logo.png" alt="logo" />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.name, link.href)}
              className={`relative text-[12px] font-bold tracking-[0.1em] uppercase transition-colors pb-1 ${
                activeLink === link.name ? "text-[#EFBF03]" : "text-white hover:text-[#EFBF03]"
              }`}
            >
              {link.name}
              
              {/* Short Orange Underline for Active Link */}
              {activeLink === link.name && (
                <span className="absolute left-0 -bottom-[6px] w-8 h-[3px] bg-[#EFBF03]" />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col gap-1.5 z-[101] relative p-2"
        >
          <motion.div 
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }} 
            className="w-6 h-[2px] origin-center transition-colors bg-white" 
          />
          <motion.div 
            animate={{ opacity: isOpen ? 0 : 1 }} 
            className="w-6 h-[2px] transition-colors bg-white" 
          />
          <motion.div 
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }} 
            className="w-6 h-[2px] origin-center transition-colors bg-white" 
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
            className="fixed inset-0 bg-[#111111] z-[90] flex flex-col items-center justify-center gap-6 lg:hidden font-poppins"
          >
            {navLinks.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.name, link.href)}
                className={`text-2xl font-bold uppercase tracking-widest relative ${
                  activeLink === link.name ? "text-[#EFBF03]" : "text-white hover:text-[#EFBF03]"
                }`}
              >
                {link.name}
                {activeLink === link.name && (
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-8 h-[3px] bg-[#EFBF03]" />
                )}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Feedback Modal */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
}
