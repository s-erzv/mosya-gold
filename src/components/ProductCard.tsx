"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, CheckCircle2, ShoppingCart, ShieldCheck } from "lucide-react";

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative bg-white dark:bg-[#111318] rounded-[24px] md:rounded-[40px] overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-[#C9A961]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#C9A961]/10"
    >
      {/* Container Gambar - Aspect Ratio lebih square di mobile */}
      <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Image 
          src={product.image_url || "/placeholder-gold.jpg"} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        
        {/* Badge Kategori - Lebih kecil & sleek di mobile */}
        <div className="absolute top-2 md:top-4 right-2 md:right-4">
          <span className="px-2 md:px-4 py-1 bg-white/90 dark:bg-[#1A1D23]/90 backdrop-blur-md text-[8px] md:text-[10px] font-black tracking-widest rounded-full text-[#C9A961] shadow-sm border border-[#C9A961]/10">
            {product.category}
          </span>
        </div>

        {/* Desktop Quick Action Overlay */}
        <div className="hidden md:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
           <button className="bg-white text-[#1A1D23] px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#C9A961] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
             <ShoppingCart size={16} /> Detail
           </button>
        </div>
      </div>

      {/* Info Produk */}
      <div className="p-3 md:p-6 text-left flex flex-col h-full">
        {/* Rating - Ringkas di pojok */}
        <div className="flex items-center gap-1 mb-1 md:mb-2">
          <Star size={10} className="text-[#C9A961] fill-[#C9A961]" />
          <span className="text-[10px] md:text-xs font-bold text-gray-400">4.9</span>
        </div>

        <h3 className="font-serif font-bold text-sm md:text-xl text-[#1A1D23] dark:text-white mb-1 md:mb-2 line-clamp-1 group-hover:text-[#C9A961] transition-colors leading-tight">
          {product.name}
        </h3>

        <p className="text-base md:text-2xl font-bold text-[#C9A961] tracking-tight">
          Rp {product.price?.toLocaleString("id-ID")}
        </p>
        
        {/* Mobile Mini Badge & Desktop Trust Badge */}
        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            <ShieldCheck size={12} className="text-[#C9A961]" />
            <span className="hidden xs:inline">Certified</span>
            <span className="xs:hidden">LBMA</span>
          </div>
          
          {/* Mobile Action Button - Kecil tapi fungsional */}
          <button className="md:hidden p-2 bg-[#C9A961]/10 text-[#C9A961] rounded-lg active:scale-95 transition-transform">
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>

      {/* Glow effect on hover (Desktop only) */}
      <div className="absolute inset-0 pointer-events-none border border-[#C9A961]/0 group-hover:border-[#C9A961]/20 rounded-[24px] md:rounded-[40px] transition-all duration-500" />
    </motion.div>
  );
}