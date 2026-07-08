"use client";

import { useEffect, useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import SpecialMenu from "@/components/SpecialMenu";
import FullMenu from "@/components/FullMenu";
import AboutSection from "@/components/AboutSection";
import ReservationSection from "@/components/ReservationSection";
import Navbar from "@/components/Navbar";
import MenuHero from "@/components/MenuHero";
import TestimonialSection from "@/components/TestimonialSection";

import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

export default function Home() {
  const [showOnlyMenu, setShowOnlyMenu] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const menuHashes = ["#menu", "#beverage", "#platter"];
      const isMenu = menuHashes.some(h => hash.includes(h));
      setShowOnlyMenu(isMenu);
    };

    // Initial check
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (showOnlyMenu) {
    return (
      <main className="relative min-h-screen bg-bg">
        <Loader />
        <Navbar />
        <MenuHero />
        <FullMenu />
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#111111]">
      <Loader />
      
      <HeroBanner />
      <AboutSection />
      <SpecialMenu />
      <ReservationSection />
      <TestimonialSection />
      <Footer />
    </main>
  );
}
