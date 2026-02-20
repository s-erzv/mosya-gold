"use client";
import React, { useState } from "react";
import { MessageCircle, X, ShoppingCart, RefreshCw, Users, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "6282226555028"; 

  const categories = [
    {
      label: "Beli Emas Murni",
      icon: <ShoppingCart size={18} />,
      message: "Halo Admin Mosya Gold,\n\nSaya tertarik untuk membeli koleksi emas murni. Boleh dibantu untuk informasi stok produk yang tersedia dan update harga hari ini?\n\nTerima kasih.",
      color: "hover:bg-amber-600"
    },
    {
      label: "Layanan Buyback",
      icon: <RefreshCw size={18} />,
      message: "Halo Admin Mosya Gold,\n\nSaya berencana untuk melakukan penjualan kembali (buyback) unit emas saya. Mohon informasi mengenai prosedur, persyaratan, serta estimasi harga terima hari ini.\n\nTerima kasih.",
      color: "hover:bg-emerald-600"
    },
    {
      label: "Program Gotong Royong",
      icon: <Users size={18} />,
      message: "Halo Admin Mosya Gold,\n\nSaya ingin berkonsultasi mengenai program Tabungan Gotong Royong Emas. Bisa berikan penjelasan lebih lanjut mengenai cara kerja dan keuntungannya?\n\nTerima kasih.",
      color: "hover:bg-blue-600"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-3">
      
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
                className={`flex items-center gap-3 bg-white dark:bg-[#1A1D23] text-[#1A1D23] dark:text-white px-5 py-3.5 rounded-[20px] shadow-2xl border border-gray-100 dark:border-white/5 transition-all group ${cat.color} hover:text-white`}
              >
                <span className="text-[#25D366] group-hover:text-white transition-colors">
                  {cat.icon}
                </span>
                <span className="text-sm font-bold whitespace-nowrap tracking-tight">{cat.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {!isOpen && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden md:block">
            <div className="bg-white dark:bg-[#1A1D23] text-[#1A1D23] dark:text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-2xl border border-gray-100 dark:border-white/5 whitespace-nowrap flex items-center gap-2">
              Butuh bantuan? <Sparkles size={14} className="text-amber-500" />
            </div>
          </div>
        )}

        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-25 animate-ping"></span>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl transition-all duration-300 ${
            isOpen ? "bg-[#1A1D23] text-white rotate-0" : "bg-[#25D366] text-white"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={28} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="wa"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle size={30} strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}