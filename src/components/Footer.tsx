"use client";

import React from "react";

export default function Footer() {
  const accentColor = "text-[#EFBF03]";
  const cursiveFont = "font-playfair italic font-bold";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="w-full relative z-20 font-poppins">

      {/* Main Dark Section */}
      <div className="bg-[#111111] py-20 px-8 md:px-12 lg:px-24 text-white relative border-t border-white/5">

        {/* Background Image Overlay Simulation (Dark/Subtle) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">

            {/* Column 1: About Us & Logo */}
            <div className="flex flex-col gap-6">
              <img className="h-[60px] w-auto self-start" src="/Logo.png" alt="CafeXO logo" />
              <p className="text-[15px] text-gray-200 leading-loose font-light mt-2">
                Aenean commodo ligula eget dolor aenean massa. Cum sociis nat penatibus set magnis dis parturient montes.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-2">
                <a href="https://www.facebook.com/profile.php?id=61584341062965" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#EFBF03] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://www.instagram.com/cafexo_nungambakkam/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#EFBF03] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>



            {/* Column 3: Contact Us */}
            <div className="flex flex-col gap-6">
              <h3 className={`text-3xl ${cursiveFont} ${accentColor} tracking-wide`}>
                Contact Us
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <div className="text-[#EFBF03] mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <p className="text-[15px] text-gray-200 font-medium leading-relaxed">
                    211, Valluvar Kottam High Rd, Nungambakkam, Chennai 600034
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="text-[#EFBF03] mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                  </div>
                  <p className="text-[15px] text-gray-200 font-medium">
                    +91 72000 97677
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="text-[#EFBF03] mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <p className="text-[15px] text-gray-200 font-medium">
                    cafexo2025@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Column 4: Opening Hours */}
            <div className="flex flex-col gap-6">
              <h3 className={`text-3xl ${cursiveFont} ${accentColor} tracking-wide`}>
                Hours
              </h3>
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-[15px] text-white font-bold mb-2">Mon – Sun:</h4>
                  <p className="text-sm text-gray-500 font-medium uppercase">10AM – 12PM</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Orange Bottom Bar */}
      <div className="bg-[#EFBF03] text-white py-6 px-6 md:px-12 relative border-t-2 border-dotted border-white/50">
        <div className="max-w-7xl mx-auto flex justify-center md:justify-center items-center text-sm font-medium relative">
          <p className="tracking-wide">Copyright © 2026 CafeXO is powered by You</p>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="absolute right-0 w-10 h-10 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors shadow-inner"
            aria-label="Scroll to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </button>
        </div>
      </div>

    </footer>
  );
}
