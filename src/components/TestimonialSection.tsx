"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  rating: number;
  message: string;
}

export default function TestimonialSection() {
  const brandColor = "text-[#EFBF03]"; // Yellow/Gold color matching the theme
  const brandBg = "bg-[#EFBF03]";
  const brandFill = "fill-[#EFBF03]";

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          // Assuming data is an array of objects
          if (Array.isArray(data) && data.length > 0) {
            // Filter out empty rows or invalid data just in case
            const validData = data.filter(item => item.name && item.message && item.rating);
            if (validData.length > 0) {
              setTestimonials(validData.reverse()); // Show newest first
            }
          }
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // We duplicate the data so the marquee can infinitely loop smoothly.
  const duplicatedData = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative py-24 bg-[#111111] overflow-hidden">
      
      {/* Background Dark Overlay if needed */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Area */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="font-playfair italic text-white text-5xl md:text-6xl font-medium tracking-wide">
            Client
          </h2>
          <h3 className={`text-4xl md:text-6xl font-black uppercase tracking-widest mt-2 ${brandColor}`}>
            TESTIMONIAL
          </h3>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48 text-[#CD7334]">
            <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Marquee Container Wrapper */
          <div className="overflow-hidden w-full px-0">
            {testimonials.length === 0 && (
              <div className="text-gray-400 font-medium italic mx-auto mt-4 text-center">
                No testimonials yet.
              </div>
            )}
            
            <motion.div 
              className="flex w-max gap-8 py-6"
              animate={{ x: [0, "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
              {duplicatedData.map((item, index) => (
                <div 
                  key={index}
                  className="relative bg-white rounded-3xl p-6 md:p-8 shrink-0 w-[280px] md:w-[320px] shadow-2xl flex flex-col justify-between"
                >
                  {/* Top Left Quotes */}
                  <div className="absolute -top-8 -left-5 md:-left-8 rotate-180 opacity-90">
                    <svg width="60" height="60" viewBox="0 0 24 24" className={`${brandFill} ${brandColor}`}>
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                  </div>

                  {/* Name Badge */}
                  <div className={`absolute -top-5 right-4 md:right-6 ${brandBg} text-white px-5 py-2 rounded-full font-bold text-sm md:text-base shadow-lg max-w-[80%] truncate text-center`}>
                    {item.name || "Anonymous"}
                  </div>

                  {/* Content */}
                  <div className="text-[#111111] font-medium text-[14px] md:text-[15px] leading-relaxed pt-6">
                    {item.message.split('\n').map((line, i) => (
                      <p key={i} className="mb-2 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Bottom Area (Stars & Quotes) */}
                  <div className="flex justify-between items-end mt-8 relative">
                    
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className={`${brandColor} ${i < (parseInt(String(item.rating)) || 5) ? brandFill : "text-gray-300"}`} />
                      ))}
                    </div>

                    {/* Bottom Right Quotes */}
                    <div className="absolute -bottom-6 -right-5 md:-right-8 opacity-90">
                      <svg width="60" height="60" viewBox="0 0 24 24" className={`${brandFill} ${brandColor}`}>
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                      </svg>
                    </div>
                    
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )}
        
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
