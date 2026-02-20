"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Package, 
  BookOpen, 
  Activity, 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  Clock,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, blogs: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      icon: <Package size={22} />, 
      color: "bg-[#C9A961]/10 text-[#C9A961]",
      desc: "Produk aktif di katalog",
      trend: "+2 minggu ini"
    },
    { 
      label: "Edukasi Emas", 
      value: stats.blogs, 
      icon: <BookOpen size={22} />, 
      color: "bg-blue-500/10 text-blue-500",
      desc: "Artikel yang dipublikasi",
      trend: "Baru diupdate"
    },
    { 
      label: "Website Status", 
      value: "Live", 
      icon: <Activity size={22} />, 
      color: "bg-emerald-500/10 text-emerald-500",
      desc: "Sistem berjalan normal",
      trend: "100% Uptime"
    },
  ];

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-10 pb-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-[#C9A961]/10 text-[#C9A961] text-[10px] font-black  tracking-[0.2em] rounded-full border border-[#C9A961]/20">
              Internal Portal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1D23] dark:text-white tracking-tight">
            Selamat Datang, <span className="italic text-[#C9A961]">Admin</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            <Clock size={14} /> Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
          </p>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#1A1D23] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C9A961] to-[#D4AF37] flex items-center justify-center">
            <img src="/logo.png" alt="Mosya Admin Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400  tracking-widest leading-none mb-1">Security Level</p>
            <p className="font-bold text-[#1A1D23] dark:text-white">Authorized Access</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#1A1D23] p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-[#C9A961]/10 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${card.color} transition-transform duration-500 group-hover:scale-110`}>
                {card.icon}
              </div>
              <div className="flex flex-col items-end">
                <ArrowUpRight className="text-gray-200 group-hover:text-[#C9A961] transition-colors" size={24} />
                <span className="text-[10px] font-bold text-[#C9A961] mt-2 tracking-tighter ">{card.trend}</span>
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-[11px] font-black text-gray-400  tracking-[0.2em] mb-1">{card.label}</p>
              <h2 className="text-4xl font-bold text-[#1A1D23] dark:text-white tracking-tighter">
                {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-light italic">{card.desc}</p>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C9A961]/5 rounded-full blur-2xl group-hover:bg-[#C9A961]/10 transition-all" />
          </motion.div>
        ))}
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C9A961] to-[#D4AF37] rounded-[40px] blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
        <div className="bg-[#1A1D23] dark:bg-white rounded-[40px] p-8 md:p-12 text-white dark:text-[#1A1D23] relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
          
          <div className="relative z-10 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-black/5 rounded-full mb-6 backdrop-blur-md">
              <Sparkles size={16} className="text-[#C9A961]" />
              <span className="text-xs font-bold tracking-widest ">Premium Tip ✨</span>
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4 tracking-tight leading-snug">
              Sentuhan <span className="italic text-[#C9A961]">Visual</span> Adalah Kunci
            </h3>
            <p className="text-gray-400 dark:text-gray-500 leading-relaxed font-light max-w-xl">
              Gunakan foto produk dengan pencahayaan natural dan background minimalis untuk menonjolkan kemurnian emas Mosya Gold. Foto yang konsisten meningkatkan kepercayaan pembeli hingga 70%.
            </p>
            
            {/* <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
               <button className="px-6 py-3 bg-[#C9A961] text-white rounded-2xl font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-[#C9A961]/20">
                 Pelajari Strategi
               </button>
               <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1A1D23] bg-gray-700" />
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-[#1A1D23] bg-[#C9A961] flex items-center justify-center text-[10px] font-bold">+5</div>
               </div>
            </div> */}
          </div>

          <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#C9A961]/20 rounded-full animate-pulse" />
            <div className="relative p-8 bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
               <TrendingUp size={80} className="text-[#C9A961]" />
            </div>
          </div>

          <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-white/5 pointer-events-none select-none italic">
            MOSYA
          </div>
        </div>
      </div>
    </motion.div>
  );
}