"use client";

import React from "react";
import { motion } from "framer-motion";

const specials = [
  {
    title: "SALMON STEAK",
    desc: "Fresh Atlantic salmon grilled to perfection, served with roasted asparagus and a zesty lemon butter sauce.",
    img: "/images/special-menu-1.jpg"
  },
  {
    title: "ITALIAN PIZZA",
    desc: "Authentic wood-fired pizza topped with fresh mozzarella, basil, and our signature slow-simmered tomato sauce.",
    img: "/images/special-menu-2.jpg"
  },
  {
    title: "WRAP",
    desc: "A warm tortilla filled with crispy falafel, fresh garden veggies, and a drizzle of creamy tahini dressing.",
    img: "/images/special-menu-3.jpg"
  }
];

export default function SpecialMenu() {
  return (
    <section id="specials" className="py-24 relative z-20 font-poppins text-white overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/images/slider-01.jpg')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#111111]/90" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase mb-4 font-playfair italic text-[#EFBF03]">
            Today's Special
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 font-light leading-relaxed">
            Handpicked by our executive chef, these exquisite signature dishes represent the pinnacle of seasonal flavors and culinary artistry. Savor the very best CafeXO has to offer today.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[10px] border-white/10 rounded-sm overflow-hidden shadow-2xl">
          {specials.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="relative group overflow-hidden cursor-pointer w-full h-[350px] md:h-[450px]"
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#EFBF03]/90 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-2xl font-bold uppercase tracking-wider mb-3 text-white">
                  {item.title}
                </h3>
                <div className="w-12 h-1 bg-white mb-4" />
                <p className="text-sm font-medium text-white/90 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
