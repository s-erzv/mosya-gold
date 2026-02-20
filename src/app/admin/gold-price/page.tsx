"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Zap, Settings2, Gem, Percent, Banknote } from "lucide-react";

export default function GoldPriceSettings() {
  const [activeGoldType, setActiveGoldType] = useState<string>("Antam Certicard");
  const [settingsId, setSettingsId] = useState<string>("");
  const [margins, setMargins] = useState<any>({}); 
  const [percentageMargins, setPercentageMargins] = useState<any>({}); 
  const [globalProfit, setGlobalProfit] = useState(""); 
  const [globalPercentage, setGlobalPercentage] = useState(""); 
  const [profitType, setProfitType] = useState<"fixed" | "percentage">("fixed");
  const [loading, setLoading] = useState(true);

  // Update daftar tipe emas sesuai branding baru
  const goldTypes = ["Antam Certicard", "Antam Retro"];
  const denominations = [0.5, 1, 2, 3, 5, 10, 25, 50, 100];

  useEffect(() => {
    fetchSettings();
  }, [activeGoldType]);

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

      const initialFixed: any = {};
      const existingMargins = data.weight_margins || {};
      denominations.forEach(g => {
        initialFixed[g] = existingMargins[g] || 0;
      });
      setMargins(initialFixed);

      const initialPercentage: any = {};
      const existingPercentage = data.percentage_margins || {};
      denominations.forEach(g => {
        initialPercentage[g] = existingPercentage[g] || 0;
      });
      setPercentageMargins(initialPercentage);
    } else {
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
      alert(`Margin ${activeGoldType} berhasil diperbarui! ✨`);
    } else {
      alert("Gagal menyimpan: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto mb-20 min-h-screen">
      <header className="mb-10 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <div className="p-2 bg-[#C9A961]/10 rounded-xl text-[#C9A961]">
            <Settings2 size={24} />
          </div>
          <h1 className="text-3xl font-serif font-bold dark:text-white text-zinc-800 tracking-tight">
            Margin <span className="text-[#C9A961]">Manager</span>
          </h1>
        </div>
        <p className="text-gray-500 text-sm italic">
          Atur strategi profit Mosya Gold secara presisi per gramasi.
        </p>
      </header>

      {/* SELECT GOLD TYPE */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
        {goldTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveGoldType(type)}
            className={`px-8 py-4 rounded-3xl font-black text-[10px] tracking-widest uppercase transition-all border-2 ${
              activeGoldType === type 
              ? "bg-[#C9A961] text-[#06101c] border-[#C9A961] shadow-xl shadow-[#C9A961]/20" 
              : "bg-white dark:bg-[#111318] text-gray-400 border-gray-100 dark:border-gray-800 hover:border-[#C9A961]/30"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#111318] rounded-[48px] p-6 md:p-12 border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden">
        
        {/* PROFIT TYPE TOGGLE */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 pb-10 border-b border-gray-50 dark:border-gray-800 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold dark:text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
              Konfigurasi <span className="text-[#C9A961]">{activeGoldType}</span>
            </h3>
            <p className="text-xs text-gray-400 max-w-xs">
              Pilih metode perhitungan margin: <b>Fixed (Rupiah)</b> atau <b>Percentage (%)</b>.
            </p>
          </div>
          <div className="flex bg-gray-50 dark:bg-[#0A0B0D] p-2 rounded-[24px] border border-gray-100 dark:border-gray-800">
            {[
              { id: "fixed", icon: <Banknote size={14}/>, label: "Fixed" },
              { id: "percentage", icon: <Percent size={14}/>, label: "Percentage" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setProfitType(t.id as any)}
                className={`flex items-center gap-2 px-8 py-3 rounded-[20px] text-[10px] font-black uppercase transition-all ${
                  profitType === t.id 
                  ? "bg-[#06101c] text-white shadow-lg shadow-[#06101c]/30" 
                  : "text-gray-400 hover:text-[#C9A961]"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* QUICK ACTION GLOBAL */}
        <div className="bg-[#06101c] p-8 rounded-[36px] mb-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
             <Zap size={150} className="text-[#C9A961]" />
          </div>
          <div className="relative z-10">
            <h4 className="font-black text-[10px] text-[#C9A961] uppercase tracking-[0.2em] mb-2">Bulk Update Tool</h4>
            <p className="text-white font-serif italic text-lg leading-tight">Samakan semua margin {activeGoldType}.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto relative z-10">
            <div className="relative flex-1 md:w-56">
              <input 
                type="number" 
                placeholder={profitType === 'fixed' ? "E.g. 150000" : "E.g. 2.5"}
                value={profitType === 'fixed' ? globalProfit : globalPercentage}
                onChange={(e) => profitType === 'fixed' ? setGlobalProfit(e.target.value) : setGlobalPercentage(e.target.value)}
                className="w-full p-4 pl-6 pr-12 rounded-2xl bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#C9A961] font-bold"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#C9A961] font-black">
                {profitType === 'fixed' ? 'Rp' : '%'}
              </span>
            </div>
            <button 
              onClick={profitType === 'fixed' ? applyGlobalFixed : applyGlobalPercentage}
              className="px-8 bg-[#C9A961] text-[#06101c] font-black rounded-2xl text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-lg"
            >
              Apply
            </button>
          </div>
        </div>

        {/* GRID MARGINS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {denominations.map((gram) => (
            <div key={gram} className="group p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-white/5 hover:border-[#C9A961]/30 transition-all flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#06101c] text-[#C9A961] flex items-center justify-center font-black text-[10px]">
                    {gram}
                  </div>
                  <span className="text-[11px] font-black dark:text-white uppercase tracking-widest">{gram} Gram</span>
                </div>
                <Gem size={14} className="text-[#C9A961] opacity-30 group-hover:opacity-100 transition-opacity" />
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
                  className="w-full p-5 rounded-2xl dark:bg-[#0A0B0D] bg-white border border-gray-100 dark:border-zinc-800 text-right font-serif font-bold text-2xl text-[#C9A961] focus:ring-2 focus:ring-[#C9A961] outline-none"
                />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {profitType === 'fixed' ? 'Nominal' : 'Rate'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* SAVE BUTTON */}
        <button 
          onClick={handleSaveAll}
          disabled={loading}
          className="group w-full py-6 bg-[#06101c] dark:bg-[#C9A961] text-white dark:text-[#06101c] rounded-[32px] font-black tracking-[0.3em] flex items-center justify-center gap-4 shadow-2xl active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={20} className="group-hover:rotate-12 transition-transform" /> 
              SAVE MARGINS
            </>
          )}
        </button>
      </div>

      <footer className="mt-8 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
          Mosya Gold Infrastructure • Secured & Syariah
        </p>
      </footer>
    </div>
  );
}