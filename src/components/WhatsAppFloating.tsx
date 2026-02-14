"use client";
import React, { useState } from "react";
import { MessageCircle, X, ShoppingCart, RefreshCw, Users, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "6282226555028"; 

  const categories = [
    {
      label: "Mau Beli Emas?",
      icon: <ShoppingCart size={18} />,
      message: "Halo Mosya Gold, saya ingin membeli emas. Boleh info stok dan harga terbaru?",
      color: "hover:bg-amber-500"
    },
    {
      label: "Mau Buyback?",
      icon: <RefreshCw size={18} />,
      message: "Halo Mosya Gold, saya mau jual kembali (buyback) emas saya. Bagaimana prosedurnya?",
      color: "hover:bg-emerald-500"
    },
    {
      label: "Tabungan Gotong Royong?",
      icon: <Users size={18} />,
      message: "Halo Mosya Gold, saya tertarik dengan program Tabungan Gotong Royong Emas. Bisa minta detailnya?",
      color: "hover:bg-blue-500"
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="flex flex-col gap-3 mb-2"
          >
            {categories.map((cat, i) => (
              <motion.a
                key={i}
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(cat.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 bg-white dark:bg-[#1A1D23] text-[#1A1D23] dark:text-white px-5 py-3 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all group ${cat.color} hover:text-white`}
              >
                <span className="text-[#25D366] group-hover:text-white transition-colors">
                  {cat.icon}
                </span>
                <span className="text-sm font-bold whitespace-nowrap">{cat.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {!isOpen && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-white dark:bg-[#1A1D23] text-[#1A1D23] dark:text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-2xl border border-gray-100 dark:border-gray-800 whitespace-nowrap flex items-center gap-2">
              Ada yang bisa dibantu? <Sparkles size={14} className="text-amber-500" />
            </div>
          </div>
        )}

        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping"></span>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 overflow-hidden ${
            isOpen ? "bg-gray-800 text-white" : "bg-[#25D366] text-white"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={32} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="wa"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle size={32} strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}