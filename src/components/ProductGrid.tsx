"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Package, X, ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGrid({ initialProducts }: { initialProducts: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [showFilters, setShowFilters] = useState(false);

  const dynamicCategories = useMemo(() => {
    const allCats = initialProducts.map((p) => p.category).filter(Boolean);
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
      {/* Container Search Bar Full Width */}
      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <Search 
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C9A961] transition-colors" 
              size={20} 
            />
            <input
              type="text"
              placeholder="Cari koleksi emas atau perhiasan..."
              className="w-full pl-14 pr-6 py-5 rounded-[24px] bg-white dark:bg-[#111318] border border-gray-100 dark:border-gray-800 focus:outline-none focus:border-[#C9A961] focus:ring-4 focus:ring-[#C9A961]/5 transition-all text-sm md:text-base shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Tombol Trigger Filter */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-5 rounded-[24px] border transition-all flex items-center gap-2 ${
              showFilters || activeCategory !== "Semua"
                ? "bg-[#C9A961] border-[#C9A961] text-white shadow-lg shadow-[#C9A961]/20"
                : "bg-white dark:bg-[#111318] border-gray-100 dark:border-gray-800 text-gray-500 hover:border-[#C9A961]"
            }`}
          >
            {showFilters ? <X size={22} /> : <SlidersHorizontal size={22} />}
            <span className="hidden md:block font-bold text-sm">Filter</span>
          </button>
        </div>

        {/* Expandable Category Section */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-[32px] border border-gray-100 dark:border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-2">Pilih Kategori</p>
                <div className="flex flex-wrap gap-2">
                  {dynamicCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${
                        activeCategory === cat
                          ? "bg-[#C9A961] text-white shadow-md"
                          : "bg-white dark:bg-[#1A1D23] text-gray-500 hover:text-[#C9A961] border border-gray-100 dark:border-gray-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="col-span-full py-32 text-center"
            >
              <Package size={48} className="mx-auto mb-4 text-gray-300 opacity-20" />
              <h3 className="text-xl font-serif text-gray-900 dark:text-white">Produk tidak ditemukan</h3>
              <p className="text-gray-500 text-sm mt-2">Coba kata kunci lain atau reset filter Anda.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}