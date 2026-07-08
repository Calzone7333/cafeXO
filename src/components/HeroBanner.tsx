"use client";

import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

export default function HeroBanner() {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const words = ["Friends", "Family", "Officemates"];
    const typeSpeed = isDeleting ? 100 : 200;
    const currentWord = words[currentWordIndex];
    
    let timer: NodeJS.Timeout;
    
    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
        }, typeSpeed);
      }
    } else {
      if (currentText === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        }, typeSpeed);
      }
    }
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  // User requested precise inline styling for the main heading
  const mainHeadingStyle: React.CSSProperties = {
    fontFamily: '"Adobe Garamond Pro", serif',
    fontSize: "74px",
    fontWeight: 400,
    lineHeight: "88.8px",
    color: "rgb(255, 255, 255)",
  };

  return (
    <div className="relative min-h-[100vh] w-full font-poppins overflow-hidden bg-[#111111]">
      <Navbar />

      {/* Background Image with Overlay */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/Herobanner.png")' }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>

      {/* Main Content Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-center px-6 md:px-12 pt-40 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Main Title (with precise user CSS) */}
          <h1 style={mainHeadingStyle} className="mb-2 drop-shadow-lg" suppressHydrationWarning>
            Dinner with us <span className="text-[#EFBF03]">{currentText}</span>
            <span className="animate-pulse">_</span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-[#EFBF03] text-4xl md:text-5xl font-playfair italic font-bold mb-8 drop-shadow-md">
            A Culinary Experience
          </h2>


          {/* Book My Table Button */}
          <a href="/#event-booking">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#D4A902" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#EFBF03] text-[#111111] px-10 py-4 font-black text-sm tracking-wider uppercase shadow-lg hover:shadow-[#EFBF03]/40 transition-colors"
            >
              BOOK AN EVENT
            </motion.button>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator (Mouse Outline with dot) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center hidden md:flex">
        <div className="w-8 h-[52px] border-2 border-white/60 rounded-[20px] flex justify-center p-2 relative">
          <motion.div 
            animate={{ y: [0, 15, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 bg-transparent border-[1.5px] border-white/60 rounded-full"
          />
        </div>
      </div>

    </div>
  );
}
