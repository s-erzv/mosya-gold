"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Sparkles } from "lucide-react";

interface ProductProps {
  product: any;
  index: number;
}

export default function ProductCard({ product, index }: ProductProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative bg-white dark:bg-[#1A1D23] rounded-[40px] overflow-hidden border-2 border-[#E5E7EB] dark:border-[#2D3748] hover:border-[#C9A961] transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A961]/30 hover:-translate-y-2"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image 
          src={product.image_url} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-4 right-4">
          <span className="px-4 py-1.5 bg-white/95 dark:bg-[#1A1D23]/95 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] rounded-full text-[#1A1D23] dark:text-white shadow-lg border border-[#C9A961]/20">
            {product.category}
          </span>
        </div>

        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-white dark:bg-[#1A1D23] text-[#1A1D23] dark:text-white font-semibold rounded-full shadow-lg border border-[#C9A961]/30 hover:bg-[#C9A961] hover:text-white transition-all duration-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
          Lihat Detail
        </button>
      </div>

      <div className="p-6 text-left">
        <h3 className="font-serif font-bold text-xl text-[#1A1D23] dark:text-white mb-2 truncate group-hover:text-[#C9A961] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold bg-gradient-to-r from-[#C9A961] to-[#D4AF37] bg-clip-text text-transparent">
            Rp {product.price?.toLocaleString("id-ID")}
          </p>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-[#C9A961] fill-[#C9A961]" />
            <span className="text-sm font-semibold text-[#4A5568] dark:text-[#A0AEC0]">4.9</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-[#4A5568] dark:text-[#A0AEC0]">
          <CheckCircle2 size={14} className="text-[#C9A961]" />
          <span>Sertifikat Resmi & Garansi</span>
        </div>
      </div>
    </motion.div>
  );
}