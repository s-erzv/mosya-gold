"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export const FeaturedProductsSection: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination sederhana untuk desktop grid
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, image_url, category")
        .order("created_at", { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentItems = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="py-12 md:py-20 bg-[#FAFBFC] dark:bg-[#0A0B0D] relative overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header - Compact */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#C9A961]/10 rounded-full mb-2">
              <Sparkles size={10} className="text-[#C9A961]" />
              <span className="text-[9px] font-black tracking-[0.15em] text-[#C9A961] uppercase">Pilihan</span>
            </div>
            <h2 className="text-xl md:text-3xl font-serif font-bold text-[#1A1D23] dark:text-white italic">
              Koleksi Terbaru
            </h2>
          </div>

          <Link 
            href="/katalog" 
            className="text-[10px] font-black text-[#C9A961] uppercase tracking-widest flex items-center gap-1 group"
          >
            Lihat Semua 
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Products Display */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll | Desktop: Grid */}
          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-6 md:pb-0 scrollbar-hide snap-x snap-mandatory">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="min-w-[180px] md:min-w-0 aspect-[4/5] rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse" />
              ))
            ) : (
              <AnimatePresence mode="wait">
                {(window.innerWidth < 768 ? products : currentItems).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="min-w-[180px] md:min-w-0 snap-center group relative bg-white dark:bg-[#111318] rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-[#C9A961]/40 transition-all duration-500 shadow-sm"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 dark:bg-black/20">
                      <Image 
                        src={product.image_url} 
                        alt={product.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105 p-1" 
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 bg-white/90 dark:bg-black/60 backdrop-blur-sm text-[7px] font-black uppercase tracking-tighter rounded-md border border-gray-100 dark:border-white/5">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 text-center">
                      <h3 className="font-serif font-bold text-[11px] md:text-xs text-[#1A1D23] dark:text-white truncate mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-center gap-1 text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                        <CheckCircle2 size={8} className="text-[#C9A961]" />
                        <span>Certified 99.9%</span>
                      </div>
                    </div>
                    <Link href={`/katalog?id=${product.id}`} className="absolute inset-0 z-10" />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Desktop Pagination - Minimalist */}
        {!loading && totalPages > 1 && (
          <div className="hidden md:flex justify-center items-center gap-4 mt-8">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-gray-100 dark:border-gray-800 disabled:opacity-20 hover:bg-[#C9A961]/10 transition-colors"
            >
              <ChevronLeft size={16} className="text-[#C9A961]" />
            </button>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border border-gray-100 dark:border-gray-800 disabled:opacity-20 hover:bg-[#C9A961]/10 transition-colors"
            >
              <ChevronRight size={16} className="text-[#C9A961]" />
            </button>
          </div>
        )}

        {/* CTA Banner - Optimized for Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 bg-[#0b213b] rounded-[32px] p-6 md:p-10 relative overflow-hidden border border-[#C9A961]/20 shadow-xl"
        >
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,_#C9A961_1px,_transparent_1px)] bg-[size:16px_16px]"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C9A961]/10 border border-[#C9A961]/20 mb-3">
                <Sparkles size={10} className="text-[#C9A961]" />
                <span className="text-[8px] font-black tracking-widest text-[#C9A961] uppercase">Layanan COD</span>
              </div>
              <h3 className="text-xl md:text-3xl font-serif font-bold text-white mb-2 leading-tight">
                Beli Emas <span className="text-[#C9A961] italic">Bisa COD</span>
              </h3>
              <p className="text-gray-400 text-[10px] md:text-sm font-light max-w-md">
                Kemudahan transaksi aman Jabodetabek dengan layanan antar-jemput dan pendampingan admin 24 jam.
              </p>
            </div>

            <Link
              href="https://wa.me/6285184852002?text=Halo%20Mosya%20Gold%2C%20saya%20tertarik%20dengan%20koleksi%20pilihan%20dan%20ingin%20tanya%20layanan%20COD"
              className="group w-full md:w-auto px-8 py-3.5 bg-[#C9A961] text-[#0b213b] text-[10px] font-black rounded-xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              Konsultasi WA <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};