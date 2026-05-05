"use client";

import React from "react";
import { motion } from "framer-motion";

const contactInfo = [
  {
    title: "Location",
    value: "211, Valluvar Kottam High Rd, Nungambakkam, Chennai, Tamil Nadu 600034",
    link: "https://maps.google.com/?q=211, Valluvar Kottam High Rd, Tirumurthy Nagar, Nungambakkam, Chennai, Tamil Nadu 600034"
  },
  {
    title: "Phone",
    value: "+91 72000 97677",
    link: "tel:+917200097677"
  },
  {
    title: "Email",
    value: "cafexo2025@gmail.com",
    link: "mailto:cafexo2025@gmail.com"
  },
  {
    title: "Hours",
    value: "Mon – Sun: 10AM – 12PM",
    link: null
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative z-20 py-32 bg-[#050505] px-8 md:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase font-playfair tracking-tight">
              Get In<br />Touch
            </h2>
            <p className="mt-8 text-lg text-white/40 font-light leading-relaxed max-w-sm">
              Visit us or reach out — we’d love to connect! We're here to make your coffee experience extraordinary.
            </p>
            
            <div className="mt-12 flex gap-4">
              <motion.a 
                href="https://www.instagram.com/cafexo_nungambakkam/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </motion.a>
              <motion.a 
                href="https://www.facebook.com/profile.php?id=61584341062965" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </motion.a>
              <motion.a 
                href="https://wa.me/917200097677" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side: Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-4">
                  {info.title}
                </h3>
                {info.link ? (
                  <a 
                    href={info.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/70 transition-colors font-playfair text-lg leading-snug block"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-white font-playfair text-lg leading-snug">
                    {info.value}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
