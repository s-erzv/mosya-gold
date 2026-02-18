"use client";
import { useState, useEffect } from "react";
import { fetchGoldPriceData } from "@/lib/gold";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, Calculator, Gem, Sparkles, ShoppingBag, 
  ArrowDownRight, TrendingUp, ArrowDown, ChevronRight 
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function GoldInteractiveSection() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [customGram, setCustomGram] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("Antam Redmark");
  const [currentTime, setCurrentTime] = useState<string>("--:-- WIB");
  
  const [priceHistory, setPriceHistory] = useState({
    change: 0, percent: "0", isUp: true, previousPrice: 0
  });

  const tabs = ["Antam Redmark", "Antam Retro", "Perhiasan"];
  const comparisonBrands = [
    { name: "UBS", brandKey: "UBS" },
    { name: "Galeri 24", brandKey: "GALERI 24" },
    { name: "Hartadinata", brandKey: "EMASKU" },
  ];

  const denominations = [0.5, 1, 2, 3, 5, 10, 25, 50, 100];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', minute: '2-digit', hour12: false 
      }) + " WIB");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchGoldPriceAndHistory = async () => {
    const res = await fetchGoldPriceData();
    setData(res);
    const { data: history } = await supabase
      .from('gold_price_history')
      .select('*').order('recorded_at', { ascending: false }).limit(2);

    if (history && history.length >= 2) {
      const diff = Number(history[0].sell_price) - Number(history[1].sell_price);
              setPriceHistory({
                change: Math.abs(diff),
                percent: ((Math.abs(diff) / history[1].sell_price) * 100).toFixed(2),
                isUp: diff >= 0,
                previousPrice: Number(history[1].sell_price)
              });    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGoldPriceAndHistory(); // Initial fetch
    const interval = setInterval(() => {
      fetchGoldPriceAndHistory();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formatIDR = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  const getMarketData = (tabName: string) => {
    if (!data?.rawMarketData) return null;
    if (tabName === "Antam Redmark") return data.rawMarketData.find((d: any) => d.brand.toUpperCase() === 'ANTAM');
    if (tabName === "Antam Retro") return data.rawMarketData.find((d: any) => d.brand.toUpperCase() === 'ANTAM MULIA RETRO');
    return data.rawMarketData.find((d: any) => d.brand.toUpperCase() === tabName.toUpperCase());
  };

  const getMosyaPrice = (gram: number, currentTab: string) => {
    const market = getMarketData(currentTab);
    const basePrice = market?.sell_price || 0;
    const setting = data?.settings?.find((s: any) => s.gold_type === currentTab);
    if (!basePrice || !setting) return 0;
    const baseValue = basePrice * gram;
    let profit = 0;
    if (setting.profit_type === "percentage") {
      const percentage = Number(setting.percentage_margins?.[gram.toString()] || 0);
      profit = baseValue * (percentage / 100);
    } else {
      profit = Number(setting.weight_margins?.[gram.toString()] || 0);
    }
    return Math.round(baseValue + profit);
  };

  const calculateBuyback = (gram: number, currentTab: string) => {
    const market = getMarketData(currentTab);
    const marketSellPrice = market?.sell_price || 0;
    const buybackPerGram = marketSellPrice > 0 ? marketSellPrice - 200000 : 0;
    return buybackPerGram * gram;
  };

  const handleWhatsApp = (type: 'buy' | 'sell' | 'jewelry') => {
    const phoneNumber = "6281234567890"; // Ganti dengan nomor Mosya Gold
    let message = "";
    
    if (type === 'buy') {
      message = `Halo Admin Mosya Gold, saya ingin membeli ${activeTab} sebanyak ${customGram} gram dengan estimasi harga ${formatIDR(getMosyaPrice(customGram, activeTab))}. Mohon informasinya.`;
    } else if (type === 'sell') {
      message = `Halo Admin Mosya Gold, saya ingin jual (buyback) ${activeTab} sebanyak ${customGram} gram dengan estimasi terima ${formatIDR(calculateBuyback(customGram, activeTab))}.`;
    } else {
      message = `Halo Admin Mosya Gold, saya ingin konsultasi mengenai buyback perhiasan emas saya.`;
    }
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading || !data) return (
    <div className="py-20 text-center flex flex-col items-center justify-center bg-white dark:bg-[#0A0B0D]">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="mb-4 text-[#C9A961]">
        <Sparkles size={32} />
      </motion.div>
      <p className="font-serif italic text-gray-400 text-sm">Menghubungkan ke Bursa...</p>
    </div>
  );

  return (
    <section id="gold-interactive-section" className="py-10 md:py-24 bg-white dark:bg-[#0A0B0D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header - Compact & Clean */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#06101c]/10 bg-white dark:bg-[#111318] text-[#06101c] dark:text-[#C9A961] mb-4 shadow-sm border-t-2 border-t-[#C9A961]">
            <Clock size={12} className="text-[#C9A961]" />
            <span className="text-[10px] font-bold tracking-widest">{currentTime}</span>
          </div>
          
          <h2 className="text-3xl md:text-6xl font-serif text-[#06101c] dark:text-white mb-6 leading-tight">
            Harga <span className="italic text-[#C9A961]">Emas Terkini</span>
          </h2>
          
          {/* Tren Harga Compact */}
          <div className="flex items-center gap-3 bg-white dark:bg-[#111318] px-4 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className={`p-2 rounded-lg ${priceHistory.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {priceHistory.isUp ? <TrendingUp size={16} /> : <ArrowDown size={16} />}
            </div>
            <div className="text-left">
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Tren Antam</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#06101c] dark:text-white">{formatIDR(priceHistory.change)}</span>
                <span className={`text-[10px] font-black ${priceHistory.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {priceHistory.isUp ? '+' : '-'}{priceHistory.percent}%
                </span>
              </div>
              {priceHistory.previousPrice > 0 && (
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Sebelumnya: {formatIDR(priceHistory.previousPrice)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation - Fixed 3 Column Grid on Mobile */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-3 w-full max-w-lg bg-[#06101c]/5 dark:bg-[#111318] p-1 rounded-2xl border border-gray-100 dark:border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-3 rounded-xl text-[9px] md:text-xs font-black tracking-tighter md:tracking-widest transition-all duration-300 ${
                  activeTab === tab ? "text-white" : "text-[#06101c]/60 dark:text-gray-500"
                }`}
              >
                {activeTab === tab && (
                  <motion.div layoutId="tab-active" className="absolute inset-0 bg-[#06101c] dark:bg-[#C9A961] rounded-xl shadow-lg" />
                )}
                <span className="relative z-10">{tab.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "Perhiasan" ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="bg-white dark:bg-[#111318] p-8 md:p-20 rounded-3xl text-center border-b-4 border-b-[#C9A961] shadow-xl"
            >
              <Gem className="mx-auto text-[#C9A961] mb-6" size={40} />
              <h3 className="text-xl md:text-4xl font-serif text-[#06101c] dark:text-white mb-4 italic">Buyback Perhiasan</h3>
              <p className="text-xs md:text-lg text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed">Terima jual kembali perhiasan emas dengan harga transparan mengikuti pasar.</p>
              <button 
                onClick={() => handleWhatsApp('jewelry')}
                className="w-full md:w-auto px-10 py-4 bg-[#06101c] dark:bg-[#C9A961] text-white dark:text-[#06101c] rounded-xl font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-3 mx-auto shadow-xl hover:scale-105 transition-all"
              >
                KONSULTASI VIA WHATSAPP <ChevronRight size={16} />
              </button>
            </motion.div>
          ) : (
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
              
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-6">
                {/* Buyback Display */}
                <div className="bg-[#06101c] p-6 rounded-3xl text-white border-r-4 border-r-[#C9A961] shadow-xl relative overflow-hidden group">
                  <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <ArrowDownRight size={120} />
                  </div>
                  <div className="flex items-center gap-2 mb-6 text-[#C9A961]">
                    <ArrowDownRight size={14} />
                    <p className="text-[9px] font-black tracking-widest uppercase">Estimasi Buyback</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-gray-400 text-[8px] uppercase font-bold mb-1 tracking-widest">Harga/Gram ({activeTab})</p>
                      <h4 className="text-2xl md:text-4xl font-serif text-[#C9A961]">{formatIDR(calculateBuyback(1, activeTab))}</h4>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                      <p className="text-[9px] text-gray-400 uppercase">Total Terima ({customGram}g)</p>
                      <p className="text-lg font-serif text-white">{formatIDR(calculateBuyback(customGram, activeTab))}</p>
                    </div>
                  </div>
                </div>

                {/* Calculator */}
                <div className="bg-white dark:bg-[#111318] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Calculator className="text-[#06101c] dark:text-[#C9A961]" size={18} />
                    <h4 className="font-bold text-[9px] tracking-widest uppercase">Simulasi Transaksi</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="relative group">
                      <input 
                        type="number" 
                        value={customGram}
                        onChange={(e) => setCustomGram(parseFloat(e.target.value) || 0)}
                        className="w-full p-4 bg-gray-50 dark:bg-[#0A0B0D] rounded-xl text-2xl font-serif font-bold text-[#06101c] dark:text-white outline-none border border-gray-100 dark:border-gray-800 focus:ring-1 focus:ring-[#C9A961]"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-[#C9A961] text-xs uppercase tracking-tighter">Gram</span>
                    </div>
                    <div className="p-5 bg-[#06101c] dark:bg-white/5 rounded-2xl border border-[#C9A961]/20">
                      <p className="text-[8px] font-bold text-[#C9A961] mb-1 tracking-widest uppercase">Harga Mosya Gold</p>
                      <h3 className="text-xl md:text-3xl font-serif text-white mb-6">{formatIDR(getMosyaPrice(customGram, activeTab))}</h3>
                      <button 
                        onClick={() => handleWhatsApp('buy')}
                        className="w-full py-4 bg-[#C9A961] text-[#06101c] rounded-xl font-black text-[9px] tracking-widest uppercase shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} /> PESAN SEKARANG
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Price List */}
              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-[#111318] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden h-full">
                  <div className="p-5 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-white/5 flex items-center gap-2">
                    <Sparkles size={14} className="text-[#C9A961]" />
                    <h4 className="text-[9px] font-black tracking-widest text-[#06101c] dark:text-white uppercase">Daftar Harga Final</h4>
                  </div>
                  
                  {/* List View - Best for Mobile & Desktop Scroll */}
                  <div className="divide-y divide-gray-50 dark:divide-gray-800">
                    {denominations.map((gram) => (
                      <div key={gram} className="p-4 flex justify-between items-center hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#06101c] text-[#C9A961] flex items-center justify-center font-bold text-[9px]">{gram}</div>
                          <span className="font-bold text-[#06101c] dark:text-white text-[11px]">{gram} Gram</span>
                        </div>
                        <p className="font-serif text-[#C9A961] text-xs md:text-sm font-bold">{formatIDR(getMosyaPrice(gram, activeTab))}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Market Comparison - Luxury Card Style */}
<div className="mt-16 md:mt-32 pt-12 border-t border-gray-100 dark:border-gray-800">
  <div className="flex flex-col items-center mb-10 text-center">
    <h3 className="text-2xl md:text-4xl font-serif text-[#06101c] dark:text-white italic opacity-40 mb-3">
      Bursa Harga <span className="not-italic font-normal">Dunia (1g)</span>
    </h3>
    <div className="w-16 h-1 bg-[#C9A961] rounded-full mb-4" />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
    {comparisonBrands.map((b) => {
      const brandData = data?.rawMarketData?.find((d: any) => d.brand.toUpperCase() === b.brandKey);
      return (
        <div 
          key={b.name} 
          className="group bg-white dark:bg-[#111318] p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 flex flex-col gap-6 hover:shadow-2xl hover:shadow-[#06101c]/10 transition-all duration-500 border-b-4 border-b-[#C9A961] relative overflow-hidden"
        >
          {/* Decorative Ornament */}
          <div className="absolute -right-4 -top-4 text-[#06101c]/5 dark:text-white/5 group-hover:scale-110 transition-transform duration-700">
             <TrendingUp size={100} />
          </div>

          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[10px] font-black text-[#C9A961] uppercase tracking-[0.2em] mb-1">Pasar Resmi</p>
              <h5 className="text-xl font-bold text-[#06101c] dark:text-white">{b.name}</h5>
            </div>
            <div className="bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-full flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] text-green-600 dark:text-green-500 font-bold uppercase tracking-tighter">Live</span>
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-3xl md:text-4xl font-serif text-[#06101c] dark:text-white font-medium">
              {brandData ? formatIDR(brandData.sell_price) : "---"}
            </p>
            <p className="text-[9px] text-gray-400 mt-2 font-medium">
              *Harga dasar market sebelum pajak & biaya admin
            </p>
          </div>
        </div>
      );
    })}
  </div>

  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-[#06101c] p-8 rounded-[40px] text-center relative overflow-hidden shadow-2xl"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#C9A961]/10 to-transparent pointer-events-none" />
    
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-left">
        <h4 className="text-white text-xl md:text-2xl font-serif mb-2">Butuh info harga lebih detail?</h4>
        <p className="text-gray-400 text-sm max-w-md">
          Dapatkan penawaran harga beli dan jual (buyback) terbaik secara personal langsung melalui admin kami.
        </p>
      </div>
      
      <button 
        onClick={() => handleWhatsApp('jewelry')}
        className="group px-8 py-4 bg-[#C9A961] text-[#06101c] rounded-2xl font-black text-xs flex items-center gap-3 hover:bg-white transition-all shadow-xl shadow-[#C9A961]/20"
      >
        Tanya Harga Sekarang
        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </motion.div>
</div>
      </div>
    </section>
  );
}