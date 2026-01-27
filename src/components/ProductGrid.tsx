"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGrid({ initialProducts }: { initialProducts: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // LOGIKA DINAMIS: Ambil kategori unik dari kolom 'category' di DB
  const dynamicCategories = useMemo(() => {
    // Ambil semua kategori, bersihkan string, buang yang kosong/null
    const allCats = initialProducts.map(p => p.category).filter(Boolean);
    // Masukkan ke Set agar unik, lalu balikkan ke Array
    return ["Semua", ...Array.from(new Set(allCats))];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts?.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "Semua" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, initialProducts]);

  return (
    <section>
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between top-24 z-30 bg-[#FAFBFC]/80 dark:bg-[#0A0B0D]/80 backdrop-blur-md p-4 rounded-3xl border border-[#C9A961]/10 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C9A961] transition-colors" size={20} />
          <input
            type="text"
            placeholder="Cari perhiasan..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#C9A961] transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Berdasarkan Kategori dari DB */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <SlidersHorizontal size={18} className="text-[#C9A961] shrink-0 mr-2 hidden md:block" />
          {dynamicCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#C9A961] text-white shadow-lg shadow-[#C9A961]/30"
                  : "bg-white dark:bg-[#1A1D23] text-gray-500 border border-gray-100 dark:border-gray-800 hover:border-[#C9A961]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-[#1A1D23] rounded-[40px]">
          <p className="text-gray-500">Produk tidak ditemukan.</p>
        </div>
      )}
    </section>
  );
}