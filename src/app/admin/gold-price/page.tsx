"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Zap, Settings2, Gem } from "lucide-react";

export default function GoldPriceSettings() {
  const [activeGoldType, setActiveGoldType] = useState<string>("Antam Redmark");
  const [settingsId, setSettingsId] = useState<string>("");
  const [margins, setMargins] = useState<any>({}); 
  const [percentageMargins, setPercentageMargins] = useState<any>({}); 
  const [globalProfit, setGlobalProfit] = useState(""); 
  const [globalPercentage, setGlobalPercentage] = useState(""); 
  const [profitType, setProfitType] = useState<"fixed" | "percentage">("fixed");
  const [loading, setLoading] = useState(true);

  const goldTypes = ["Antam Redmark", "Antam Retro"];
  const denominations = [0.5, 1, 2, 3, 5, 10, 25, 50, 100];

  useEffect(() => {
    fetchSettings();
  }, [activeGoldType]); // Fetch ulang setiap ganti jenis emas

  async function fetchSettings() {
    setLoading(true);
    const { data } = await supabase
      .from('gold_settings')
      .select('*')
      .eq('gold_type', activeGoldType)
      .single();
    
    if (data) {
      setSettingsId(data.id);
      setProfitType(data.profit_type || "fixed");

      // Fixed Margins
      const initialFixed: any = {};
      const existingMargins = data.weight_margins || {};
      denominations.forEach(g => {
        initialFixed[g] = existingMargins[g] || 0;
      });
      setMargins(initialFixed);

      // Percentage Margins
      const initialPercentage: any = {};
      const existingPercentage = data.percentage_margins || {};
      denominations.forEach(g => {
        initialPercentage[g] = existingPercentage[g] || 0;
      });
      setPercentageMargins(initialPercentage);
    } else {
      // Jika belum ada row di DB, reset view
      setSettingsId("");
      setMargins({});
      setPercentageMargins({});
    }
    setLoading(false);
  }

  const applyGlobalFixed = () => {
    const val = parseInt(globalProfit);
    if (isNaN(val)) return;
    const updated = { ...margins };
    denominations.forEach(g => { updated[g] = val; });
    setMargins(updated);
  };

  const applyGlobalPercentage = () => {
    const val = parseFloat(globalPercentage);
    if (isNaN(val)) return;
    const updated = { ...percentageMargins };
    denominations.forEach(g => { updated[g] = val; });
    setPercentageMargins(updated);
  };

  async function handleSaveAll() {
    setLoading(true);
    const updateData: any = {
      profit_type: profitType,
      weight_margins: margins,
      percentage_margins: percentageMargins,
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from('gold_settings')
      .update(updateData)
      .eq('gold_type', activeGoldType);

    if (!error) {
      alert(`Profit ${activeGoldType} berhasil disimpan!`);
    } else {
      alert("Gagal menyimpan: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto mb-20">
      <header className="mb-10 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <Settings2 className="text-[#C9A961]" />
          <h1 className="text-3xl font-serif font-bold dark:text-white text-zinc-800">Margin Manager</h1>
        </div>
        <p className="text-gray-500 text-sm italic">Sesuaikan keuntungan Mosya Gold berdasarkan jenis dan gramasi.</p>
      </header>

      {/* SELECT GOLD TYPE */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {goldTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveGoldType(type)}
            className={`px-8 py-3 rounded-2xl font-bold transition-all border-2 ${
              activeGoldType === type 
              ? "bg-[#C9A961] text-white border-[#C9A961] shadow-lg shadow-[#C9A961]/20" 
              : "bg-white dark:bg-[#111318] text-gray-400 border-gray-100 dark:border-gray-800"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#111318] rounded-[40px] p-6 md:p-10 border border-gray-100 dark:border-gray-800 shadow-xl">
        {/* PROFIT TYPE TOGGLE */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 pb-10 border-b border-gray-50 dark:border-gray-800 gap-6">
          <div>
            <h3 className="text-xl font-bold dark:text-white mb-1">Metode Profit: <span className="text-[#C9A961]">{activeGoldType}</span></h3>
            <p className="text-xs text-gray-400">Pilih antara nilai tetap (Fixed) atau persentase pasar.</p>
          </div>
          <div className="flex bg-gray-100 dark:bg-[#1A1D23] p-1.5 rounded-2xl">
            {["fixed", "percentage"].map((t) => (
              <button
                key={t}
                onClick={() => setProfitType(t as any)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${
                  profitType === t ? "bg-[#C9A961] text-white shadow-md" : "text-gray-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* QUICK ACTION GLOBAL */}
        <div className="bg-[#C9A961]/5 p-6 rounded-3xl border border-[#C9A961]/20 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Zap className="text-[#C9A961]" size={20} />
            <h4 className="font-bold text-sm dark:text-white uppercase tracking-widest">Set Semua {activeGoldType}</h4>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <input 
                type="number" 
                placeholder={profitType === 'fixed' ? "Contoh: 300000" : "Contoh: 5"}
                value={profitType === 'fixed' ? globalProfit : globalPercentage}
                onChange={(e) => profitType === 'fixed' ? setGlobalProfit(e.target.value) : setGlobalPercentage(e.target.value)}
                className="w-full p-3.5 pl-5 pr-10 rounded-2xl dark:bg-[#1A1D23] border border-gray-200 dark:border-gray-800 outline-none focus:ring-2 focus:ring-[#C9A961] font-bold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A961] font-bold">
                {profitType === 'fixed' ? 'Rp' : '%'}
              </span>
            </div>
            <button 
              onClick={profitType === 'fixed' ? applyGlobalFixed : applyGlobalPercentage}
              className="px-6 bg-[#C9A961] text-white font-bold rounded-2xl text-[10px] uppercase tracking-tighter"
            >
              Terapkan
            </button>
          </div>
        </div>

        {/* GRID MARGINS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {denominations.map((gram) => (
            <div key={gram} className="p-5 rounded-3xl border border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-white/5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Gem size={14} className="text-[#C9A961]" />
                <span className="text-xs font-bold dark:text-white uppercase tracking-widest">{gram} Gram</span>
              </div>
              <div className="relative">
                <input 
                  type="number" 
                  value={profitType === 'fixed' ? (margins[gram] || 0) : (percentageMargins[gram] || 0)}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    if(profitType === 'fixed') setMargins({...margins, [gram]: val});
                    else setPercentageMargins({...percentageMargins, [gram]: val});
                  }}
                  className="w-full p-4 rounded-2xl dark:bg-[#1A1D23] bg-white border border-gray-100 dark:border-zinc-800 text-right font-serif font-bold text-[#C9A961] focus:ring-2 focus:ring-[#C9A961] outline-none"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">
                  {profitType === 'fixed' ? 'RP' : '%'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleSaveAll}
          disabled={loading}
          className="w-full py-6 bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] rounded-[32px] font-black tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          {loading ? "MENYIMPAN..." : (
            <>
              <Save size={20} /> SIMPAN MARGIN {activeGoldType.toUpperCase()}
            </>
          )}
        </button>
      </div>
    </div>
  );
}