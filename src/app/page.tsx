"use client";

import { useEffect, useState } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import FullMenu from "@/components/FullMenu";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import MenuHero from "@/components/MenuHero";

import MenuSection from "@/components/MenuSection";

export default function Home() {
  const [showOnlyMenu, setShowOnlyMenu] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const menuHashes = ["#menu", "#explore", "#signature", "#beverage"];
      const isMenu = menuHashes.some(h => hash.includes(h));
      setShowOnlyMenu(isMenu);
      
      // Reset scroll to top when switching to/from menu
      window.scrollTo(0, 0);
    };

    // Initial check
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (showOnlyMenu) {
    return (
      <main className="relative min-h-screen bg-[#050505]">
        <Navbar />
        <MenuHero />
        <FullMenu />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050505]">
      <ScrollyCanvas frameCount={253} />

      <MenuSection />

      <AboutSection />

      <ContactSection />

      {/* Footer */}
      <footer className="relative z-20 py-24 bg-[#050505] flex flex-col items-center justify-center border-t border-white/5">
        <div className="max-w-4xl px-8 text-center">
          <div className="text-[10px] tracking-[0.5em] text-white/20 uppercase font-manrope">
            © 2024 CAFEXO INDUSTRIES. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  );
}
