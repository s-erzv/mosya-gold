"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Package, BookOpen, Activity, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, blogs: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: productCount } = await supabase.from("products").select("*", { count: 'exact', head: true });
      const { count: blogCount } = await supabase.from("blogs").select("*", { count: 'exact', head: true });
      setStats({ products: productCount || 0, blogs: blogCount || 0 });
    };
    fetchStats();
  }, []);

  const cards = [
    { 
      label: "Total Koleksi", 
      value: stats.products, 
      icon: <Package size={24} />, 
      color: "bg-yellow-50 text-yellow-600",
      desc: "Produk aktif di katalog"
    },
    { 
      label: "Edukasi Emas", 
      value: stats.blogs, 
      icon: <BookOpen size={24} />, 
      color: "bg-blue-50 text-blue-600",
      desc: "Artikel yang dipublikasi"
    },
    { 
      label: "Website Status", 
      value: "Live", 
      icon: <Activity size={24} />, 
      color: "bg-green-50 text-green-600",
      desc: "Sistem berjalan normal"
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Halo, Admin Mosya</h1>
        <p className="text-gray-500 mt-1">Kelola perhiasan dan konten Anda di sini.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${card.color}`}>
                {card.icon}
              </div>
              <ArrowUpRight className="text-gray-300 group-hover:text-[#D4AF37] transition-colors" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{card.label}</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{card.value}</h2>
              <p className="text-xs text-gray-400 mt-2">{card.desc}</p>
            </div>
            {/* Subtle Gradient Decor */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-50 to-transparent opacity-50 -mr-8 -mt-8 rounded-full" />
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-gold/20">
        <div className="relative z-10 max-w-lg">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            Vibe Coder Tip ✨
          </h3>
          <p className="text-white/90 leading-relaxed text-sm">
            Gunakan foto produk dengan **pencahayaan natural** dan background yang **minimalis** (putih/abu-abu muda) untuk menonjolkan tekstur emas dan kilauan perhiasan Mosya Gold.
          </p>
        </div>
        {/* Abstract Sparkle Decoration */}
        <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-20 hidden md:block">
           <Package size={120} />
        </div>
      </div>
    </motion.div>
  );
}