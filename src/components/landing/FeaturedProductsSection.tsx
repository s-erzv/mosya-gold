"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export const FeaturedProductsSection: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, image_url, category")
        .limit(8)
        .order("created_at", { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-[#FAFBFC] dark:bg-[#0A0B0D] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A961]/10 rounded-full mb-3">
              <Sparkles size={14} className="text-[#C9A961]" />
              <span className="text-[10px] font-black tracking-widest text-[#C9A961] ">Eksklusif</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#1A1D23] dark:text-white">
              Koleksi Pilihan
            </h2>
          </motion.div>

          <Link 
            href="/katalog" 
            className="text-sm font-bold text-[#C9A961] hover:text-[#D4AF37] transition-colors flex items-center gap-1 group"
          >
            Katalog Lengkap 
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-[32px] bg-[#E5E7EB] dark:bg-[#1A1D23] animate-pulse"></div>
            ))
          ) : (
            products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white dark:bg-[#111318] rounded-[32px] overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-[#C9A961]/50 transition-all duration-500"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-[#1A1D23]">
                  <Image 
                    src={product.image_url} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110 p-2 rounded-[32px]" 
                  />
                  
                  <div className="absolute top-3 left-5">
                    <span className="px-2 py-0.5 bg-white/80 dark:bg-black/50 backdrop-blur-md text-[8px] font-bold tracking-wider rounded-full text-[#1A1D23] dark:text-white  border border-white/20">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Info - Simplified */}
                <div className="p-4 text-center">
                  <h3 className="font-serif font-bold text-sm text-[#1A1D23] dark:text-white truncate mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400">
                    <CheckCircle2 size={10} className="text-[#C9A961]" />
                    <span>Certified Gold</span>
                  </div>
                </div>

                {/* Overlay Link */}
                <Link href={`/katalog?id=${product.id}`} className="absolute inset-0 z-10" />
              </motion.div>
            ))
          )}
        </div>

       <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-[#1A1B20] via-[#111216] to-[#0A0B0D] rounded-[32px] p-6 md:p-10 relative overflow-hidden border border-[#C9A961]/20 shadow-2xl"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_#C9A961_1px,_transparent_1px)] bg-[size:20px_20px]"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A961]/10 border border-[#C9A961]/20">
                <Sparkles size={12} className="text-[#C9A961]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#C9A961]">Layanan Prioritas</span>
              </div>
              
              <div className="max-w-xl">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 leading-tight">
                  Transaksi Emas <span className="text-[#C9A961] italic">Tanpa Ribet</span>, Langsung Cair & Bisa COD!
                </h3>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                  Nikmati kemudahan jual-beli emas dengan harga transparan, layanan antar-jemput Jabodetabek, serta pendampingan CS 24 jam untuk investasi Anda.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link
                href="https://wa.me/6282226555028?text=Halo%20Mosya%20Gold%2C%20saya%20ingin%20tanya%20layanan%20COD%20dan%20harga%20buyback%20hari%20ini"
                className="group px-8 py-4 bg-[#C9A961] text-white text-xs font-black rounded-2xl hover:bg-[#D4AF37] transition-all shadow-xl shadow-[#C9A961]/20 flex items-center justify-center gap-2 tracking-widest"
              >
                Konsultasi Gratis <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <Sparkles className="absolute -bottom-4 -right-4 text-[#C9A961]/10 w-32 h-32 rotate-12" />
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#C9A961]/5 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
};