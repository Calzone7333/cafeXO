"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    persons: "default",
    date: "",
    time: "",
    occasion: "default",
    occasionOther: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const payload = {
        ...formData,
        occasion: formData.occasion === "Other" ? formData.occasionOther : formData.occasion
      };

      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "", email: "", contact: "", persons: "default", 
          date: "", time: "", occasion: "default", occasionOther: ""
        });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="event-booking" className="py-24 bg-[#fafafa] font-poppins text-[#111111] relative z-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 bg-white p-10 md:p-16 rounded-lg shadow-xl border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase mb-6 font-playfair italic text-[#EFBF03]">
            Event Booking
          </h2>
          <h4 className="text-xl font-bold uppercase tracking-wider mb-2 text-[#111111]">
            Booking Form
          </h4>
          <p className="text-gray-500 font-medium text-sm">
            PLEASE FILL OUT ALL REQUIRED* FIELDS. THANKS!
          </p>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit} suppressHydrationWarning>
          
          <div className="form-group">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name *" 
              required
              className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded focus:outline-none focus:border-[#EFBF03] transition-colors"
            />
          </div>

          <div className="form-group">
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-Mail ID *" 
              required
              className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded focus:outline-none focus:border-[#EFBF03] transition-colors"
            />
          </div>

          <div className="form-group">
            <input 
              type="text" 
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact No." 
              className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded focus:outline-none focus:border-[#EFBF03] transition-colors"
            />
          </div>

          <div className="form-group">
            <select name="persons" value={formData.persons} onChange={handleChange} suppressHydrationWarning className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded focus:outline-none focus:border-[#EFBF03] transition-colors text-gray-500">
              <option value="default" disabled>No. Of persons</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4+</option>
            </select>
          </div>

          <div className="form-group">
            <input 
              type="text" 
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date (e.g. DD/MM/YYYY) *" 
              required
              className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded focus:outline-none focus:border-[#EFBF03] transition-colors"
            />
          </div>

          <div className="form-group">
            <input 
              type="text" 
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Time (e.g. 7:00 PM) *" 
              required
              className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded focus:outline-none focus:border-[#EFBF03] transition-colors"
            />
          </div>



          <div className="form-group">
            <select name="occasion" value={formData.occasion} onChange={handleChange} suppressHydrationWarning className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded focus:outline-none focus:border-[#EFBF03] transition-colors text-gray-500">
              <option value="default" disabled>Occasion</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <AnimatePresence>
            {formData.occasion === "Other" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="form-group col-span-1 md:col-span-2 overflow-hidden"
              >
                <input 
                  type="text" 
                  name="occasionOther"
                  value={formData.occasionOther}
                  onChange={handleChange}
                  placeholder="Please specify your occasion *" 
                  required
                  className="w-full px-4 py-3 mt-4 bg-[#f9f9f9] border border-gray-200 rounded focus:outline-none focus:border-[#EFBF03] transition-colors"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="col-span-1 md:col-span-2 flex flex-col items-center mt-6">
            <AnimatePresence>
              {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-green-600 font-bold mb-4"
                >
                  Booking submitted successfully!
                </motion.div>
              )}
              {status === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-red-600 font-bold mb-4"
                >
                  An error occurred. Please try again.
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={`px-12 py-4 bg-[#EFBF03] text-[#111111] font-black tracking-wider uppercase rounded transition-colors shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#D4A902]'}`}
            >
              {loading ? "Submitting..." : "Submit Your Event"}
            </motion.button>
          </div>

        </form>

      </div>
    </section>
  );
}
