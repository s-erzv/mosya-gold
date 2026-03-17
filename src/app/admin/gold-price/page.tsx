"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Zap, Settings2, Gem, Percent, Banknote } from "lucide-react";
import { toast } from "sonner";

export default function GoldPriceSettings() {
  const [activeGoldType, setActiveGoldType] = useState<string>("Antam Certicard");
  const [settingsId, setSettingsId] = useState<string>("");
  const [margins, setMargins] = useState<any>({}); 
  const [percentageMargins, setPercentageMargins] = useState<any>({}); 
  const [globalProfit, setGlobalProfit] = useState(""); 
  const [globalPercentage, setGlobalPercentage] = useState(""); 
  const [profitType, setProfitType] = useState<"fixed" | "percentage">("fixed");
  const [loading, setLoading] = useState(true);

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
      toast(`Berhasil disimpan! `);
    } else {
      toast("Gagal: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto mb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold dark:text-white text-zinc-800 tracking-tight">
            Pengaturan <span className="text-[#C9A961] italic">Margin Harga</span>
          </h1>
          <p className="text-gray-500 text-xs">Sesuaikan profit per gramasi dengan mudah.</p>
        </div>
        <div className="flex gap-2">
          {goldTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveGoldType(type)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                activeGoldType === type 
                ? "bg-[#C9A961] text-[#0b213b] border-[#C9A961]" 
                : "bg-white dark:bg-[#111318] text-gray-400 border-gray-100 dark:border-gray-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#111318] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-50 dark:border-gray-800">
          <div className="flex bg-gray-50 dark:bg-[#0b213b] p-1.5 rounded-xl border border-gray-100 dark:border-gray-800">
            {[
              { id: "fixed", icon: <Banknote size={14}/>, label: "Fixed (Rp)" },
              { id: "percentage", icon: <Percent size={14}/>, label: "Persen (%)" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setProfitType(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  profitType === t.id 
                  ? "bg-[#0b213b] text-white shadow-md" 
                  : "text-gray-400 hover:text-[#C9A961]"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <input 
              type="number" 
              placeholder="Bulk update..."
              value={profitType === 'fixed' ? globalProfit : globalPercentage}
              onChange={(e) => profitType === 'fixed' ? setGlobalProfit(e.target.value) : setGlobalPercentage(e.target.value)}
              className="flex-1 sm:w-32 px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#0b213b] border border-gray-100 dark:border-gray-800 text-sm outline-none focus:ring-1 focus:ring-[#C9A961]"
            />
            <button 
              onClick={profitType === 'fixed' ? applyGlobalFixed : applyGlobalPercentage}
              className="px-4 py-2 bg-[#0b213b] text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-[#C9A961] hover:text-[#0b213b] transition-all"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {denominations.map((gram) => (
            <div key={gram} className="p-4 rounded-2xl border border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-white/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-[#C9A961] bg-[#C9A961]/10 px-2 py-0.5 rounded-md uppercase tracking-wider">{gram} Gram</span>
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
                  className="w-full px-4 py-3 rounded-xl dark:bg-[#0b213b] bg-white border border-gray-100 dark:border-zinc-800 text-right font-bold text-lg text-[#0b213b] dark:text-[#C9A961] outline-none"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-bold text-gray-400 uppercase">
                  {profitType === 'fixed' ? 'Rp' : '%'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleSaveAll}
          disabled={loading}
          className="w-full py-4 bg-[#0b213b] text-white rounded-2xl font-bold tracking-widest flex items-center justify-center gap-3 hover:bg-[#C9A961] hover:text-[#0b213b] transition-all disabled:opacity-50 shadow-lg shadow-[#0b213b]/10"
        >
          {loading ? "Menyimpan..." : <><Save size={18} /> SIMPAN PERUBAHAN</>}
        </button>
      </div>
    </div>
  );
}
