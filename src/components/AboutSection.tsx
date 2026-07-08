"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="what-we-are" className="py-24 bg-white relative z-20 font-poppins">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-[#EFBF03] font-playfair italic font-bold text-4xl md:text-5xl tracking-wide">
              About Us
            </h2>
            <h3 className="text-xl md:text-2xl font-black text-[#111111] uppercase tracking-wide">
              IT STARTED, QUITE SIMPLY, LIKE THIS...
            </h3>
            
            <div className="text-gray-500 font-medium leading-loose flex flex-col gap-4 text-sm md:text-[15px]">
              <p>
                CafeXO was born out of a profound passion for culinary excellence and a desire to create a sanctuary where food, art, and community intersect seamlessly.
              </p>
              <p>
                Our journey began with a simple belief: every meal should be a celebration of flavors and the people you share it with. We meticulously source our ingredients from local artisans and global purveyors to ensure that every dish on your plate is a masterpiece. Whether it's a handcrafted espresso to start your morning or a beautifully curated platter for a sunset dinner, our commitment to quality shines through in every detail. 
              </p>
              <p>
                Beyond the food, CafeXO is about the experience. Step into our thoughtfully designed space, let our warm hospitality embrace you, and create unforgettable memories over the art of fine dining.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Images */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center mt-10 lg:mt-0"
          >
            <div className="relative w-4/5 h-[90%] md:h-[80%] mx-auto ml-auto mr-4">
              {/* Main Image */}
              <img 
                src="/images/about-main.jpg" 
                alt="About Main" 
                className="w-full h-full object-cover rounded shadow-lg relative z-10"
              />
              
              {/* Inset Image */}
              <img 
                src="/images/about-inset.jpg" 
                alt="About Inset" 
                className="absolute -bottom-8 -left-12 w-2/3 md:w-3/5 h-auto object-cover rounded shadow-[0_15px_30px_rgba(0,0,0,0.1)] border-[8px] border-white z-20"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
