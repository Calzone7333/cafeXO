"use client";

import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    id: "explore",
    title: "Our Menu",
    subtitle: "Handcrafted with love, served with passion",
    images: [
      "/cafe menu/1stpage.png",
      "/cafe menu/2stpage.png",
      "/cafe menu/3 Menu.jpg.jpeg",
    ]
  },
  {
    id: "signature",
    title: "Platter Menu",
    subtitle: "Artisanal arrangements for the shared table",
    images: [
      "/cafe menu/06 Menu.jpg.jpeg",
      "/cafe menu/07 Menu.jpg.jpeg",
      "/cafe menu/08 Menu.jpg.jpeg",
      "/cafe menu/09 Menu.jpg.jpeg",
    ]
  },
  {
    id: "beverage",
    title: "Beverage Menu",
    subtitle: "Refreshing blends for every mood",
    images: [
      "/cafe menu/4stpage.png",
      "/cafe menu/5 Menu.jpg.jpeg",
    ]
  }
];

export default function FullMenu() {
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section id="menu" className="py-24 bg-[#050505] min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {categories.map((category, catIndex) => (
          <div key={category.id} id={category.id} className="mb-32 last:mb-0 scroll-mt-32">
            {/* Category Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase font-playfair text-white tracking-tight mb-4">
                {category.title}
              </h2>
              <p className="text-sm md:text-base text-white/40 font-manrope font-light italic">
                {category.subtitle}
              </p>
              <div className="mt-8 h-[1px] w-20 bg-white/10 mx-auto" />
            </motion.div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {category.images.map((src, imgIndex) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 1, scale: 1 }}
                  className="relative w-full rounded-xl overflow-hidden border border-white/5 shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
                >
                  <img
                    src={encodeURI(src)}
                    alt={`${category.title} Page ${imgIndex + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
