"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Premium Quality",
    description: "We source the finest beans from sustainable farms around the world",
  },
  {
    title: "Made with Love",
    description: "Every cup is crafted with passion and attention to detail",
  },
  {
    title: "Unique Experience",
    description: "A cozy atmosphere where memories are made over great coffee",
  },
  {
    title: "Community Focused",
    description: "We're more than a cafe - we're your neighborhood gathering place",
  },
];

export default function AboutSection() {
  return (
    <section id="what-we-are" className="relative z-20 py-32 bg-[#050505] px-8 md:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase font-playfair tracking-tight">
            What We Are
          </h2>
          <p className="mt-8 text-lg md:text-xl text-white/60 font-light leading-relaxed font-playfair italic">
            More than just coffee — we're crafting experiences that warm your soul
          </p>
          <div className="mt-12 h-[1px] w-24 bg-white/20" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-6">
                <div className="mt-1 h-2 w-2 rounded-full bg-white transition-all duration-500 group-hover:scale-[2] group-hover:bg-white" />
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider font-playfair">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-white/40 font-light leading-relaxed max-w-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
