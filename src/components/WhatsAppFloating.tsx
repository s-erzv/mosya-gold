"use client";
import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppFloating() {
  const phoneNumber = "6282112345678";
  const message = "Halo Mosya Gold, saya tertarik dengan produk emas...";

  return (
    <div className="fixed bottom-8 right-8 z-[100] group">
      {/* Tooltip Label */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <div className="bg-white dark:bg-[#1A1D23] text-[#1A1D23] dark:text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-2xl border border-gray-100 dark:border-gray-800 whitespace-nowrap">
          Konsultasi Sekarang ✨
        </div>
      </div>

      {/* Ping Animation Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping"></span>

      {/* Main Button */}
      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_40px_-10px_rgba(37,211,102,0.5)] transition-all overflow-hidden"
      >
        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
        
        <MessageCircle size={32} strokeWidth={2.5} />
      </motion.a>
    </div>
  );
}