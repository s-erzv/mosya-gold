"use client";
import { useState, useEffect } from "react";
import { fetchGoldPriceData } from "@/lib/gold";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, Clock, ArrowUpRight, Calculator, Check, 
  Gem, Sparkles, ShoppingBag, Info, ArrowDownLeft 
} from "lucide-react";

export default function GoldInteractiveSection() {
  const [data, setData] = useState<any>(null);
  const [activeType, setActiveType] = useState<string>("Mosya Gold");
  const [loading, setLoading] = useState(true);
  const [customGram, setCustomGram] = useState<number>(1);

  useEffect(() => {
    fetchGoldPriceData().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const formatIDR = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  if (loading) return (
    <div className="py-32 text-center">
      <div className="inline-block animate-spin mb-4 text-[#C9A961]"><Sparkles size={32} /></div>
      <p className="font-serif italic text-gray-400 tracking-widest animate-pulse">Sinkronisasi Bursa...</p>
    </div>
  );

  const currentSetting = data?.settings.find((s: any) => s.gold_type === activeType) || data?.settings[0];
  const marketGram = data.marketPrice * (customGram || 0);
  const sellPrice = marketGram + (marketGram * (currentSetting.margin_percentage / 100));
  const marginTotal = marketGram * (currentSetting.margin_percentage / 100);

  // Daftar pecahan dari 0.5 sampai 100
  const denominations = [0.5, 1, 2, 3, 5, 10, 25, 50, 100];

  return (
    <section className="py-24 bg-[#FAFBFC] dark:bg-[#0A0B0D] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A961]/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-2 px-4 py-1 rounded-full border border-[#C9A961]/20 bg-[#C9A961]/5 text-[#C9A961] mb-6">
            <Clock size={12} className="animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em]">Live Market Data</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold dark:text-white mb-6">
            Pusat Harga <span className="italic text-[#C9A961]">Real-Time</span>
          </h2>
        </div>

        {/* 1. SELECTION CARDS (TAB) - RESPONSIVE SCROLL ON MOBILE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {data.settings.map((item: any) => {
            const isActive = activeType === item.gold_type;
            const pricePreview = data.marketPrice + (data.marketPrice * (item.margin_percentage / 100));
            
            return (
              <motion.div
                key={item.gold_type}
                onClick={() => setActiveType(item.gold_type)}
                whileHover={{ y: -5 }}
                className={`cursor-pointer p-8 rounded-[40px] border-2 transition-all duration-500 relative overflow-hidden ${
                  isActive ? "border-[#C9A961] bg-white dark:bg-[#111318] shadow-2xl shadow-[#C9A961]/10" : "border-transparent bg-gray-50 dark:bg-[#111318]/50"
                }`}
              >
                {isActive && <div className="absolute top-6 right-8 text-[#C9A961]"><Check size={20} /></div>}
                <p className={`text-[10px] font-black tracking-widest mb-2 ${isActive ? "text-[#C9A961]" : "text-gray-400"}`}>Gold Brand</p>
                <h3 className="text-2xl font-serif font-bold dark:text-white mb-4">{item.gold_type}</h3>
                <p className="text-2xl font-serif font-bold text-[#C9A961]">{formatIDR(pricePreview)} <span className="text-[10px] text-gray-400 font-sans">/ gram</span></p>
              </motion.div>
            );
          })}
        </div>

        {/* 2. DYNAMIC CONTENT: CALCULATOR & TABLE */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* LEFT: CALCULATOR CARD */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-[#111318] p-8 md:p-10 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <Calculator className="text-[#C9A961]" size={24} />
                  <h4 className="font-bold dark:text-white text-[10px] tracking-widest">Kalkulator {activeType}</h4>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 tracking-widest ml-2 mb-2 block">Tentukan Berat</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={customGram}
                        onChange={(e) => setCustomGram(parseFloat(e.target.value) || 0)}
                        className="w-full p-8 bg-gray-50 dark:bg-[#1A1D23] rounded-3xl text-4xl font-serif font-bold dark:text-white outline-none focus:ring-2 focus:ring-[#C9A961] transition-all"
                      />
                      <span className="absolute right-8 top-1/2 -translate-y-1/2 font-black text-[#C9A961] text-sm">GRAM</span>
                    </div>
                  </div>

                  <div className="p-8 bg-[#1A1D23] dark:bg-white rounded-[32px] text-white dark:text-[#1A1D23] relative overflow-hidden group">
                    <p className="text-[10px] font-black tracking-[0.2em] opacity-60 mb-1">Total Transaksi</p>
                    <p className="text-3xl md:text-4xl font-serif font-bold mb-6">{formatIDR(sellPrice)}</p>
                    <button className="w-full py-4 bg-[#C9A961] text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-xs tracking-widest hover:bg-[#D4AF37] transition-all">
                      <ShoppingBag size={16} /> BELI SEKARANG
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: DETAILED TABLE */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-[#111318] rounded-[40px] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl">
                <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp size={18} className="text-[#C9A961]" />
                    <h4 className="text-[10px] font-black tracking-widest dark:text-white">Daftar Pecahan {activeType}</h4>
                  </div>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto overflow-x-hidden custom-scrollbar">
                  <table className="w-full text-left">
                    <thead className="sticky top-0 bg-white dark:bg-[#111318] z-10 text-[9px] font-black tracking-widest text-gray-400 border-b border-gray-50 dark:border-gray-800">
                      <tr>
                        <th className="p-6">Unit Berat</th>
                        <th className="p-6 text-right">Harga Final (Lengkap)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                      {denominations.map(gram => {
                        const mGram = data.marketPrice * gram;
                        const sGram = mGram + (mGram * (currentSetting.margin_percentage / 100));

                        return (
                          <tr key={gram} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                            <td className="p-6 font-bold dark:text-white flex items-center gap-3">
                              <Gem size={14} className="text-[#C9A961] opacity-0 group-hover:opacity-100 transition-opacity" />
                              {gram} Gram
                            </td>
                            <td className="p-6 text-right font-serif font-bold text-[#C9A961]">
                              {formatIDR(sGram)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TRANSPARENCY CARD */}
             
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}