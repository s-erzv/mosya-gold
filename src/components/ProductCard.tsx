"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Sparkles, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    category: string;
  };
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative bg-white dark:bg-[#1A1D23] rounded-[40px] overflow-hidden border-2 border-[#E5E7EB] dark:border-[#2D3748] hover:border-[#C9A961] transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A961]/30 hover:-translate-y-2"
    >
      {/* Container Gambar */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image 
          src={product.image_url || "/placeholder-gold.jpg"} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Overlay Gradasi saat Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badge Kategori */}
        <div className="absolute top-4 right-4">
          <span className="px-4 py-1.5 bg-white/95 dark:bg-[#1A1D23]/95 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] rounded-full text-[#1A1D23] dark:text-white shadow-lg border border-[#C9A961]/20">
            {product.category}
          </span>
        </div>

        {/* Tombol Aksi Cepat */}
        <button className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] py-3 bg-white dark:bg-[#1A1D23] text-[#1A1D23] dark:text-white font-bold rounded-2xl shadow-xl border border-[#C9A961]/30 hover:bg-[#C9A961] hover:text-white transition-all duration-300 text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center gap-2">
          <ShoppingCart size={16} />
          Detail Produk
        </button>
      </div>

      {/* Info Produk */}
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
        
        {/* Trust Badge - Ciri Khas Mosya Gold */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#4A5568] dark:text-[#A0AEC0]">
          <CheckCircle2 size={14} className="text-[#C9A961]" />
          <span>Sertifikat & Garansi</span>
        </div>
      </div>
    </motion.div>
  );
}