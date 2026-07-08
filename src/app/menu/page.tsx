"use client";

import React, { useState, useEffect } from "react";
import FullMenu from "@/components/FullMenu";
import Navbar from "@/components/Navbar";
import MenuHero from "@/components/MenuHero";

export default function MenuPage() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <MenuHero />
      <FullMenu />
      
      {/* Footer */}
      <footer className="py-24 bg-[#050505] flex flex-col items-center justify-center border-t border-white/5">
        <div className="max-w-4xl px-8 text-center">
          <div className="text-[10px] tracking-[0.5em] text-white/20 uppercase font-inter">
            © 2024 CAFEXO INDUSTRIES. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  );
}

