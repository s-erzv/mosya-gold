"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Package, X, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGrid({ initialProducts }: { initialProducts: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  // Logic Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll smooth ke atas grid saat ganti page
    document.getElementById("product-grid-start")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="product-grid-start">
      {/* Container Search & Filter */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative flex-1 group">
            <Search 
              className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C9A961] transition-colors" 
              size={18} 
            />
            <input
              type="text"
              placeholder="Cari koleksi..."
              className="w-full pl-11 md:pl-14 pr-4 py-4 md:py-5 rounded-2xl md:rounded-[24px] bg-white dark:bg-[#111318] border border-gray-100 dark:border-gray-800 focus:outline-none focus:border-[#C9A961] text-sm md:text-base shadow-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset page saat cari
              }}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-4 md:p-5 rounded-2xl md:rounded-[24px] border transition-all flex items-center gap-2 ${
              showFilters || activeCategory !== "Semua"
                ? "bg-[#C9A961] border-[#C9A961] text-white shadow-lg shadow-[#C9A961]/20"
                : "bg-white dark:bg-[#111318] border-gray-100 dark:border-gray-800 text-gray-500"
            }`}
          >
            {showFilters ? <X size={20} /> : <SlidersHorizontal size={20} />}
          </button>
        </div>

        {/* Categories Horizontal Scroll */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {dynamicCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setCurrentPage(1);
                      }}
                      className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeCategory === cat
                          ? "bg-[#0b213b] text-white shadow-md"
                          : "bg-white dark:bg-[#1A1D23] text-gray-400 border border-gray-100 dark:border-gray-800"
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

      {/* Grid / Horizontal Scroll for Mobile */}
      <div className="relative">
        <div className="flex lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 scrollbar-hide snap-x snap-mandatory px-1 md:px-0">
          <AnimatePresence mode="popLayout">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product, index) => (
                <div key={product.id} className="min-w-[260px] md:min-w-0 snap-center">
                  <ProductCard product={product} index={index} />
                </div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full w-full py-20 text-center"
              >
                <Package size={40} className="mx-auto mb-4 text-gray-200" />
                <h3 className="font-serif text-gray-400 italic">Koleksi tidak ditemukan...</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 disabled:opacity-20 text-[#0b213b] dark:text-[#C9A961]"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                  currentPage === i + 1
                    ? "bg-[#C9A961] text-white shadow-lg shadow-[#C9A961]/20"
                    : "bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-[#C9A961]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 disabled:opacity-20 text-[#0b213b] dark:text-[#C9A961]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}