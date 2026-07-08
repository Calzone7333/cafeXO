"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MessageSquare, Star, X, Phone } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    rating: 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setRating = (rating: number) => {
    setFormData({ ...formData, rating: formData.rating === rating ? 0 : rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", message: "", rating: 0 });
        setTimeout(() => {
          setStatus("idle");
          onClose();
        }, 3000);
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
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[320px] bg-white rounded-lg shadow-2xl z-[101] overflow-hidden font-poppins"
          >
            <div className="p-5 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black text-[#111111] uppercase tracking-wider">
                  Feedback
                </h2>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                
                {/* Star Rating */}
                <div className="flex flex-col items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Rate your experience</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(null)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star 
                          size={28} 
                          className={`transition-colors duration-200 ${
                            star <= (hoveredStar ?? formData.rating)
                              ? "fill-[#EFBF03] text-[#EFBF03]"
                              : "fill-gray-100 text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#EFBF03] transition-colors">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *" 
                    required
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#f9f9f9] border border-gray-200 rounded focus:outline-none focus:border-[#EFBF03] focus:bg-white transition-all text-[#111111]"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#EFBF03] transition-colors">
                    <Phone size={18} />
                  </div>
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number *" 
                    required
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#f9f9f9] border border-gray-200 rounded focus:outline-none focus:border-[#EFBF03] focus:bg-white transition-all text-[#111111]"
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute top-3 left-0 pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#EFBF03] transition-colors">
                    <MessageSquare size={18} />
                  </div>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Feedback Message *" 
                    required
                    rows={3}
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#f9f9f9] border border-gray-200 rounded focus:outline-none focus:border-[#EFBF03] focus:bg-white transition-all text-[#111111] resize-none"
                  />
                </div>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="text-green-600 font-medium text-center text-sm"
                    >
                      Thank you for your feedback!
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="text-red-500 font-medium text-center text-sm"
                    >
                      Something went wrong. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={formData.rating > 0 ? { scale: 1.02 } : {}}
                  whileTap={formData.rating > 0 ? { scale: 0.98 } : {}}
                  type="submit"
                  disabled={loading || formData.rating === 0}
                  className={`w-full py-2.5 mt-1 text-sm bg-[#EFBF03] text-[#111111] font-black tracking-wider uppercase rounded transition-colors shadow-md ${loading || formData.rating === 0 ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#D4A902]'}`}
                >
                  {loading ? "Submitting..." : (formData.rating === 0 ? "Select a rating" : "Submit Feedback")}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
