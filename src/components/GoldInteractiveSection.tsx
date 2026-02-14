"use client";
import { useState, useEffect } from "react";
import { fetchGoldPriceData } from "@/lib/gold";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, Clock, Calculator, Check, 
  Gem, Sparkles, ShoppingBag, Info, ArrowDownRight, 
  AlertCircle, ArrowUpRight, ArrowDown
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function GoldInteractiveSection() {
  const [data, setData] = useState<any>(null);
  const [activeType, setActiveType] = useState<string>("Mosya Gold");
  const [loading, setLoading] = useState(true);
  const [customGram, setCustomGram] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("Certicard Redmark");
  
  // State baru untuk history harga asli
  const [priceHistory, setPriceHistory] = useState({
    change: 0,
    percent: "0",
    isUp: true,
    time: "--:--"
  });

  useEffect(() => {
    // 1. Load Data Utama & History
    const loadAllData = async () => {
      const res = await fetchGoldPriceData();
      setData(res);
      
      // Ambil 2 data terakhir dari history untuk menghitung selisih
      const { data: history } = await supabase
        .from('gold_price_history')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(2);

      if (history && history.length >= 2) {
        const diff = Number(history[0].sell_price) - Number(history[1].sell_price);
        setPriceHistory({
          change: Math.abs(diff),
          percent: ((Math.abs(diff) / history[1].sell_price) * 100).toFixed(2),
          isUp: diff >= 0,
          time: new Date(history[0].recorded_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        });
      }
      
      setLoading(false);
    };

    loadAllData();

    // 2. Realtime Listener (Jika Admin update profit atau Cron update harga)
    const channel = supabase
      .channel('gold-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gold_settings' }, loadAllData)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'gold_price_history' }, loadAllData)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const formatIDR = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  // --- LOGIC PERHITUNGAN ---
  const getProcessedPrice = (gram: number, priceType: "sell_price" | "buy_price") => {
    if (!data?.processedPrices) return 0;
    // Cari gramasi yang cocok
    const item = data.processedPrices.find((p: any) => 
      parseFloat(p.type) === Number(gram)
    );
    return item ? Number(item[priceType]) : 0;
  };

  if (loading || !data) return (
    <div className="py-32 text-center">
      <div className="inline-block animate-spin mb-4 text-[#C9A961]"><Sparkles size={32} /></div>
      <p className="font-serif italic text-gray-400 tracking-widest animate-pulse">Menghubungkan ke Bursa...</p>
    </div>
  );

  const sellPrice = getProcessedPrice(customGram, "sell_price");
  const buybackPrice = getProcessedPrice(customGram, "buy_price");
  const buybackPricePerGram = customGram > 0 ? buybackPrice / customGram : 0;

  const tabs = ["Certicard Redmark", "Retro Portrait", "Perhiasan"];

  return (
    <section id="gold-interactive-section" className="py-12 md:py-24 bg-[#FAFBFC] dark:bg-[#0A0B0D] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#C9A961]/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* HEADER & REAL HISTORY */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A961]/20 bg-[#C9A961]/5 text-[#C9A961] mb-4">
            <Clock size={10} className="animate-pulse" />
            <span className="text-[9px] font-bold tracking-[0.2em]">LIVE MARKET DATA</span>
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-serif font-semibold dark:text-white mb-6">
            Pusat Harga <span className="italic text-[#C9A961]">Real-Time</span>
          </h2>

          <div className="flex items-center gap-4 bg-white dark:bg-[#111318] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className={`p-2 rounded-full ${priceHistory.isUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {priceHistory.isUp ? <ArrowUpRight size={20} /> : <ArrowDown size={20} />}
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tren Terakhir</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold dark:text-white">
                  {priceHistory.isUp ? '+' : '-'}{formatIDR(priceHistory.change)}
                </span>
                <span className={`text-xs font-medium ${priceHistory.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  ({priceHistory.percent}%)
                </span>
              </div>
            </div>
            <div className="border-l border-gray-100 dark:border-gray-800 pl-4">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Update Jam</p>
              <p className="text-sm font-bold dark:text-white">{priceHistory.time} WIB</p>
            </div>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 dark:bg-[#111318] p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                  activeTab === tab ? "bg-[#C9A961] text-white shadow-lg" : "text-gray-500 hover:text-[#C9A961]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* BRAND SELECTION */}
        <div className="flex md:grid md:grid-cols-3 gap-4 mb-10 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x">
          {data?.settings?.map((item: any) => {
            const isActive = activeType === item.gold_type;
            const displayName = item.gold_type === "Antam" ? "Antam Sertifikat Redmark at Mosya Gold" : item.gold_type;
            // Harga preview untuk 1 gram
            const pricePreview = getProcessedPrice(1, "sell_price");
            
            return (
              <motion.div
                key={item.gold_type}
                onClick={() => setActiveType(item.gold_type)}
                className={`min-w-[280px] md:min-w-full snap-center cursor-pointer p-6 md:p-8 rounded-[32px] border-2 transition-all duration-500 relative overflow-hidden ${
                  isActive ? "border-[#C9A961] bg-white dark:bg-[#111318] shadow-xl shadow-[#C9A961]/10" : "border-transparent bg-gray-50 dark:bg-[#111318]/50"
                }`}
              >
                {isActive && <Check className="absolute top-6 right-6 text-[#C9A961]" size={18} />}
                <p className={`text-[9px] font-bold tracking-widest mb-1 ${isActive ? "text-[#C9A961]" : "text-gray-400"}`}>GOLD BRAND</p>
                <h3 className="text-lg md:text-xl font-serif font-semibold dark:text-white mb-2 leading-tight">{displayName}</h3>
                <p className="text-xl md:text-2xl font-serif font-semibold text-[#C9A961]">{formatIDR(pricePreview)} <span className="text-[10px] text-gray-400 font-sans">/ gr</span></p>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeType}-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* BUYBACK */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-gradient-to-br from-[#06101c] to-[#143155] p-5 md:p-6 rounded-[32px] text-white relative overflow-hidden shadow-xl border border-[#C9A961]/20">
                <div className="absolute -right-6 -top-6 opacity-10 rotate-12 pointer-events-none text-[#C9A961]">
                  <ArrowDownRight size={80} className="md:w-[100px] md:h-[100px]" />
                </div>
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <span className="p-1.5 bg-[#C9A961]/20 rounded-lg text-[#C9A961] shrink-0">
                    <ArrowDownRight size={14} className="md:w-4 md:h-4" />
                  </span>
                  <p className="text-[9px] md:text-[10px] font-black tracking-widest uppercase text-[#C9A961]">Estimasi Buyback (Kami Beli)</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end relative z-10">
                  <div>
                    <p className="text-[10px] md:text-[11px] font-medium text-gray-400 mb-1 uppercase">Harga per Gram:</p>
                    <p className="text-2xl md:text-3xl font-serif font-bold text-[#C9A961] leading-none">{formatIDR(buybackPricePerGram)}</p>
                  </div>
                  <div className="pt-3 md:pt-0 md:text-right border-t border-white/10 md:border-none">
                    <p className="text-[9px] md:text-[10px] opacity-60 mb-1 tracking-tighter uppercase">Total Terima ({customGram} gr)</p>
                    <p className="font-bold text-lg md:text-xl text-white">{formatIDR(buybackPrice)}</p>
                  </div>
                </div>
              </div>

              {/* CALCULATOR */}
              <div className="bg-white dark:bg-[#111318] p-6 md:p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="text-[#C9A961]" size={20} />
                  <h4 className="font-bold dark:text-white text-[10px] tracking-widest uppercase">Kalkulator {activeTab}</h4>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-2 block uppercase">Input Berat Emas</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={customGram}
                        onChange={(e) => setCustomGram(parseFloat(e.target.value) || 0)}
                        className="w-full p-5 bg-gray-50 dark:bg-[#1A1D23] rounded-2xl text-3xl font-serif font-semibold dark:text-white outline-none focus:ring-2 focus:ring-[#C9A961] transition-all"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-[#C9A961] text-xs">GRAM</span>
                    </div>
                  </div>
                  <div className="p-6 bg-[#C9A961] rounded-[24px] text-white shadow-lg shadow-[#C9A961]/20">
                    <p className="text-[9px] font-bold tracking-widest opacity-80 mb-1 uppercase text-white/90">Total Pembelian (Customer Beli)</p>
                    <p className="text-2xl md:text-3xl font-serif font-semibold mb-4">
                      {sellPrice > 0 ? formatIDR(sellPrice) : "Pilih berat..."}
                    </p>
                    <button className="w-full py-4 bg-white text-[#C9A961] rounded-xl flex items-center justify-center gap-2 font-bold text-[10px] tracking-widest hover:bg-gray-50 transition-all shadow-md uppercase">
                      <ShoppingBag size={14} /> Hubungi Admin
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* DETAILED TABLE */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-[#111318] rounded-[32px] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl">
                <div className="p-4 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
                  <div className="flex items-center gap-3">
                    <Gem size={16} className="text-[#C9A961]" />
                    <h4 className="text-[10px] font-bold tracking-widest dark:text-white uppercase">Daftar Harga {activeTab}</h4>
                  </div>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white dark:bg-[#111318] text-[9px] font-bold tracking-widest text-gray-400 border-b border-gray-50 dark:border-gray-800">
                      <tr>
                        <th className="px-6 py-3 uppercase">Unit Berat</th>
                        <th className="px-6 py-3 text-right uppercase">Harga Final</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                      {data?.processedPrices?.map((item: any) => (
                        <tr key={item.type} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-3 font-semibold dark:text-white flex items-center gap-2 text-xs">
                            <Sparkles size={10} className="text-[#C9A961] opacity-60" />
                            {item.type}
                          </td>
                          <td className="px-6 py-3 text-right font-serif font-semibold text-[#C9A961] text-sm md:text-base">
                            {formatIDR(item.sell_price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}