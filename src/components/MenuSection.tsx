"use client";

import React from "react";
import { motion } from "framer-motion";

const menuItems = [
  {
    id: 1,
    name: "MUSHROOM BALLS",
    price: "₹220",
    description: "Crispy golden-fried spheres filled with a rich, savory mushroom blend and artisanal herbs.",
    image: "/fristcard.jpeg",
  },
  {
    id: 2,
    name: "CHEESE STUFFED JALAPENOS",
    price: "₹270",
    description: "Zesty jalapeños stuffed with a premium cheese blend, breaded and fried to perfection.",
    image: "/secondcard.jpeg",
  },
  {
    id: 3,
    name: "Garlic bread Chicken",
    price: "₹340",
    description: "Freshly baked garlic bread topped with tender seasoned chicken and melted mozzarella.",
    image: "/thirdcard.jpeg",
  },
];

export default function MenuSection() {
  return (
    <section className=" menu relative z-20 py-32 bg-[#050505] px-8 md:px-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <span className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase mb-4 block font-manrope">
            Crafted with Passion
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase font-playfair tracking-tight mb-6">
            Signature Selection
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-stretch">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-3xl p-6 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl mb-8">
                <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-500 group-hover:opacity-0" />
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 px-2">
                <div className="flex justify-between items-baseline mb-4 gap-4">
                  <h3 className="text-xl font-bold text-white uppercase font-playfair tracking-tight leading-tight group-hover:text-white transition-colors">
                    {item.name}
                  </h3>
                  <div className="h-[1px] flex-1 bg-white/10 mx-2 hidden lg:block" />
                  <span className="text-lg font-black text-white/90 font-manrope whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                
                <p className="text-sm text-white/40 font-light leading-relaxed font-manrope">
                  {item.description}
                </p>

                {/* Subtle separator at bottom */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-white/20 uppercase">
                    Information Card
                  </span>
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
