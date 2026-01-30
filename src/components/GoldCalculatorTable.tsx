"use client";
import { useState, useEffect } from "react";
import { fetchGoldBaseData } from "@/lib/gold";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Info, ArrowRight, Gem, TrendingUp, Sparkles, ShoppingBag } from "lucide-react";

export default function GoldCalculatorTable() {
  const [baseData, setBaseData] = useState<{ marketPricePerGram: number; margin: number } | null>(null);
  const [customGram, setCustomGram] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoldBaseData().then((data) => {
      setBaseData(data);
      setLoading(false);
    });
  }, []);

  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  if (loading) return (
    <div className="py-32 text-center">
      <div className="inline-block animate-spin mb-4 text-[#C9A961]"><Sparkles size={32} /></div>
      <p className="font-serif italic text-gray-400 tracking-widest animate-pulse">Menghitung Nilai Emas...</p>
    </div>
  );

  const marketTotal = (baseData?.marketPricePerGram || 0) * (customGram || 0);
  const marginTotal = marketTotal * ((baseData?.margin || 0) / 100);
  const mosyaPrice = marketTotal + marginTotal;

  return (
    <section className="py-24 bg-[#FAFBFC] dark:bg-[#0A0B0D] relative overflow-hidden">
      {/* Glow Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A961]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C9A961]/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-3 bg-[#C9A961]/10 rounded-2xl mb-6 border border-[#C9A961]/20"
          >
            <Gem size={32} className="text-[#C9A961]" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1D23] dark:text-white mb-6">
            Kalkulator <span className="italic text-[#C9A961]">Emas Mandiri</span>
          </h2>
          <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
            Hitung investasi Anda secara transparan. Harga diperbarui secara real-time mengikuti bursa komoditas internasional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Input Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 bg-white dark:bg-[#111318] rounded-[40px] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-[#C9A961]/5"
          >
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400">Tentukan Berat</label>
                  <span className="text-[10px] font-bold text-[#C9A961] bg-[#C9A961]/10 px-2 py-1 rounded-md">Real-time Sync</span>
                </div>
                <div className="relative group">
                  <input 
                    type="number" 
                    min="0"
                    value={customGram}
                    onChange={(e) => setCustomGram(parseFloat(e.target.value) || 0)}
                    className="w-full p-8 bg-gray-50 dark:bg-[#1A1D23] rounded-3xl text-4xl font-serif font-bold dark:text-white outline-none border-2 border-transparent focus:border-[#C9A961] transition-all group-hover:bg-gray-100 dark:group-hover:bg-[#232730]"
                  />
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-end">
                    <span className="text-sm font-black text-[#C9A961]">GRAM</span>
                    <Calculator size={20} className="text-gray-300 mt-1" />
                  </div>
                </div>
              </div>

              <div className="p-8 bg-[#1A1D23] dark:bg-white rounded-[32px] text-white dark:text-[#1A1D23] relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Sparkles size={120} />
                </div>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60 mb-2">Total yang dibayarkan</p>
                <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
                  {formatIDR(mosyaPrice)}
                </h3>
                <button className="mt-6 w-full py-4 bg-[#C9A961] hover:bg-[#D4AF37] text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-xs tracking-widest transition-all shadow-lg shadow-[#C9A961]/20">
                  <ShoppingBag size={16} /> CHECKOUT SEKARANG
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Detailed Table Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="bg-white dark:bg-[#111318] rounded-[40px] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex items-center gap-3">
                <TrendingUp size={18} className="text-[#C9A961]" />
                <h4 className="text-xs font-black tracking-widest uppercase dark:text-white">Rincian Transparansi Harga</h4>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-6">
                        <p className="font-bold text-sm dark:text-gray-200">Harga Dasar Pasar</p>
                        <p className="text-[10px] text-gray-400 italic">Berdasarkan Kurs XAU/USD ke IDR</p>
                      </td>
                      <td className="p-6 text-right font-serif font-medium dark:text-white">
                        {formatIDR(marketTotal)}
                      </td>
                    </tr>
                    <tr className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm dark:text-gray-200">Margin Mosya Gold</p>
                          <span className="text-[9px] bg-[#C9A961] text-white px-2 py-0.5 rounded-full font-bold">
                            {baseData?.margin}%
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 italic">Biaya layanan, sertifikat, & operasional</p>
                      </td>
                      <td className="p-6 text-right font-serif font-bold text-[#C9A961]">
                        + {formatIDR(marginTotal)}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-white/5">
                      <td className="p-8">
                        <p className="font-serif text-xl font-bold dark:text-white">Harga Final</p>
                        <p className="text-[10px] text-[#C9A961] font-bold tracking-widest uppercase">Emas Murni 999.9</p>
                      </td>
                      <td className="p-8 text-right">
                        <p className="font-serif text-3xl font-bold text-[#C9A961]">{formatIDR(mosyaPrice)}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-[#C9A961]/5 rounded-3xl border border-[#C9A961]/10">
              <div className="shrink-0 p-2 bg-white dark:bg-[#1A1D23] rounded-lg shadow-sm">
                <Info size={16} className="text-[#C9A961]" />
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed italic">
                Informasi: Harga yang tercantum bersifat dinamis dan dapat berubah sewaktu-waktu mengikuti fluktuasi pasar global sebelum transaksi diselesaikan.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}