"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, ShieldCheck, ArrowRight, Gem, 
  X, MessageCircle, Info, ShoppingBag 
} from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image_url: string;
    category: string;
    description?: string;
  };
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContactAdmin = () => {
    const phoneNumber = "628123456789"; // Ganti dengan nomor WhatsApp Mosya Gold
    const message = `Halo Admin Mosya Gold, saya tertarik dengan produk:\n\n*${product.name}*\n(${product.category})\n\nBoleh info detail harga dan ketersediaannya?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer relative bg-white dark:bg-[#111318] rounded-[30px] md:rounded-[48px] overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A961]/10 flex flex-col"
      >
        {/* Container Gambar */}
        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-[#FAFBFC] dark:bg-gray-900">
          <Image 
            src={product.image_url || "/logo.png"} 
            alt={product.name} 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b213b]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 md:top-6 left-3 md:left-6">
            <div className="px-3 md:px-5 py-1.5 bg-white/90 dark:bg-[#0b213b]/90 backdrop-blur-md rounded-full border border-[#C9A961]/20 shadow-lg">
              <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase text-[#C9A961]">
                {product.category}
              </span>
            </div>
          </div>

          <div className="hidden md:flex absolute inset-0 items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
             <div className="bg-[#0b213b] text-[#C9A961] px-8 py-3 rounded-2xl font-black text-xs tracking-widest flex items-center gap-3 border border-[#C9A961]/30 shadow-2xl">
               VIEW DETAIL <ArrowRight size={14} />
             </div>
          </div>
        </div>

        {/* Info Produk */}
        <div className="p-4 md:p-8 flex flex-col flex-1 bg-white dark:bg-[#111318]">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="text-[#C9A961] fill-[#C9A961]" />
              ))}
            </div>
            <div className="flex items-center gap-1 text-[8px] md:text-[10px] font-black text-gray-400 tracking-tighter uppercase">
              <Gem size={12} className="text-[#C9A961]" />
              Pure 99.9%
            </div>
          </div>

          <h3 className="font-serif font-bold text-sm md:text-2xl text-[#0b213b] dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-[#C9A961] transition-colors">
            {product.name}
          </h3>

          <div className="mt-auto pt-4 md:pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#C9A961]/10 rounded-lg">
                <ShieldCheck size={14} className="text-[#C9A961]" />
              </div>
              <span className="text-[9px] md:text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                Official Cert.
              </span>
            </div>
            
            <button className="md:hidden flex items-center gap-1 text-[#C9A961] font-black text-[10px] tracking-widest uppercase">
              Detail <ArrowRight size={12} />
            </button>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-0 h-1 bg-[#C9A961] group-hover:w-full transition-all duration-700" />
      </motion.div>

      {mounted && isOpen && ReactDOM.createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 flex items-center justify-center z-[9999] px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0b213b]/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#111318] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-gray-700 dark:text-white transition-all shadow-md"
              >
                <X size={24} />
              </button>

              {/* Bagian Gambar */}
              <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto h-64 sm:h-80 md:h-auto overflow-hidden bg-gray-50">
                <Image 
                  src={product.image_url || "/logo.png"} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                />
              </div>

              {/* Bagian Deskripsi */}
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="px-4 py-1.5 bg-[#C9A961]/10 text-[#C9A961] text-[10px] font-black tracking-[0.2em] rounded-full border border-[#C9A961]/20">
                    {product.category.toUpperCase()}
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0b213b] dark:text-white mb-6 leading-tight">
                  {product.name}
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <ShieldCheck size={20} className="text-[#C9A961]" />
                    <p className="text-sm">Emas Murni 24 Karat (99.9%) disertai sertifikat resmi.</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic">
                    {product.description || "Koleksi eksklusif Mosya Gold. Dirancang dengan presisi untuk nilai investasi dan keindahan jangka panjang."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-10">
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Kualitas</p>
                    <p className="font-bold text-[#0b213b] dark:text-white">Terjamin</p>
                  </div>
                </div>

                <button 
                  onClick={handleContactAdmin}
                  className="group w-full py-5 bg-[#C9A961] text-[#0b213b] font-black text-xs tracking-[0.2em] rounded-[24px] shadow-xl shadow-[#C9A961]/20 flex items-center justify-center gap-3 hover:bg-[#0b213b] hover:text-white transition-all duration-500"
                >
                  <MessageCircle size={20} />
                  HUBUNGI ADMIN SEKARANG
                </button>
                
                <p className="text-center mt-4 text-[9px] text-gray-400 font-bold tracking-widest uppercase">
                  Smart Spending with Mosya Gold
                </p>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.getElementById("modal-root") as HTMLElement
      )}
    </>
  );
}