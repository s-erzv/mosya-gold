"use client";
import { useState, useEffect } from "react";
import { fetchGoldData } from "@/lib/gold";
import { motion } from "framer-motion";
import { TrendingUp, Clock, ArrowUpRight, ArrowDownLeft, ShieldCheck } from "lucide-react";

export default function GoldPriceSection() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoldData().then(data => {
      setPrices(data);
      setLoading(false);
    });
  }, []);

  const formatIDR = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  if (loading) return (
    <div className="py-32 text-center">
      <div className="inline-block animate-bounce mb-4 text-[#C9A961]"><ShieldCheck size={40} /></div>
      <p className="font-serif italic text-gray-400 tracking-widest">Sinkronisasi Harga Global...</p>
    </div>
  );

  return (
    <section className="py-24 bg-white dark:bg-[#0A0B0D] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A961]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A961]/20 bg-[#C9A961]/5 text-[#C9A961] mb-6"
          >
            <Clock size={14} className="animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em]">Update Terkini</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#1A1D23] dark:text-white mb-6">
            Investasi <span className="italic text-[#C9A961]">Cerdas</span> Hari Ini
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Transparansi penuh untuk setiap gram emas Anda. Kami menyajikan perbandingan harga pasar real-time untuk memastikan keuntungan maksimal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prices.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-gray-50 dark:bg-[#111318] rounded-[40px] p-10 border border-transparent hover:border-[#C9A961]/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#C9A961]/5"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="h-12 w-12 rounded-2xl bg-white dark:bg-[#1A1D23] flex items-center justify-center border border-gray-100 dark:border-gray-800 shadow-sm group-hover:rotate-12 transition-transform">
                  <TrendingUp size={20} className="text-[#C9A961]" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-[#C9A961] bg-[#C9A961]/10 px-3 py-1 rounded-lg">
                  {item.type}
                </span>
              </div>

              <div className="space-y-8">
                {/* Harga Jual (Customer Beli) */}
                <div className="relative">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <ArrowUpRight size={14} className="text-green-500" />
                    <p className="text-[10px] font-bold tracking-widest">Harga Jual (Kami Jual)</p>
                  </div>
                  <p className="text-4xl font-serif font-bold text-[#1A1D23] dark:text-white tracking-tight">
                    {formatIDR(item.sell_price)}
                  </p>
                </div>

                {/* Harga Beli (Kami Beli Balik) */}
                <div className="relative pt-6 border-t border-gray-200/50 dark:border-gray-800">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <ArrowDownLeft size={14} className="text-blue-500" />
                    <p className="text-[10px] font-bold tracking-widest">Harga Beli (Buyback)</p>
                  </div>
                  <p className="text-2xl font-serif font-semibold text-gray-500 dark:text-gray-400">
                    {formatIDR(item.buy_price)}
                  </p>
                </div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="w-full mt-10 py-5 bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] rounded-2xl font-black text-[10px] tracking-[0.2em] hover:bg-[#C9A961] dark:hover:bg-[#C9A961] dark:hover:text-white transition-all shadow-xl shadow-black/5"
              >
                Mulai Investasi
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}