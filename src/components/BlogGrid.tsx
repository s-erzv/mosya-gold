"use client";
import { useState, useMemo } from "react";
import { Search, BookOpen, SlidersHorizontal } from "lucide-react";
import BlogCard from "./BlogCard";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogGrid({ initialPosts }: { initialPosts: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Ambil kategori unik yang ada di database secara dinamis
  const dynamicCategories = useMemo(() => {
    const allCats = initialPosts.map(p => p.category).filter(Boolean);
    return ["Semua", ...Array.from(new Set(allCats))];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts?.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "Semua" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, initialPosts]);

  return (
    <section>
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-16 items-center justify-between top-24 z-30 bg-[#FAFBFC]/80 dark:bg-[#0A0B0D]/80 backdrop-blur-md p-4 rounded-[32px] border border-[#C9A961]/10 shadow-sm">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C9A961] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Cari artikel edukasi..."
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-[#1A1D23] border border-gray-100 dark:border-gray-800 focus:outline-none focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961]/20 transition-all text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories Tab */}
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

      {/* Grid Artikel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="col-span-full py-24 text-center bg-white dark:bg-[#1A1D23] rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800"
            >
              <BookOpen size={48} className="mx-auto mb-4 text-gray-300 opacity-20" />
              <h3 className="text-xl font-serif text-gray-900 dark:text-white">Artikel tidak ditemukan</h3>
              <p className="text-gray-500 text-sm mt-2">Coba kata kunci lain atau pilih kategori yang berbeda.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}