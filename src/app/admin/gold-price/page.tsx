"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Save, Zap, Calculator } from "lucide-react";

export default function GoldPriceSettings() {
  const [settingsId, setSettingsId] = useState<string>("");
  const [margins, setMargins] = useState<any>({}); // For fixed margins
  const [percentageMargins, setPercentageMargins] = useState<any>({}); // For percentage margins
  const [globalProfit, setGlobalProfit] = useState(""); // For global fixed profit input
  const [globalPercentage, setGlobalPercentage] = useState(""); // For global percentage profit input
  const [profitType, setProfitType] = useState<"fixed" | "percentage">("fixed"); // 'fixed' or 'percentage'
  const [loading, setLoading] = useState(true);

  const denominations = [0.5, 1, 2, 3, 5, 10, 25, 50, 100];

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    // Ambil data dari gold_settings (asumsi hanya ada 1 row untuk Mosya Gold)
    const { data } = await supabase.from('gold_settings').select('*').eq('gold_type', 'Mosya Gold').single();
    
    if (data) {
      setSettingsId(data.id);
      // Fixed Margins
      const existingMargins = data.weight_margins || {};
      const initialFixed: any = {};
      denominations.forEach(g => {
        initialFixed[g] = existingMargins[g] || 300000;
      });
      setMargins(initialFixed);

      // Percentage Margins
      const existingPercentageMargins = data.percentage_margins || {};
      const initialPercentage: any = {};
      denominations.forEach(g => {
        initialPercentage[g] = existingPercentageMargins[g] || 5; // Default 5%
      });
      setPercentageMargins(initialPercentage);

      setProfitType(data.profit_type || "fixed");
      setGlobalProfit(data.global_profit_value ? String(data.global_profit_value) : ""); // This was globalProfitPercentage before, now for fixed
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

    let updateData: any = {
      profit_type: profitType,
      updated_at: new Date(),
    };

    if (profitType === "fixed") {
      updateData.weight_margins = margins;
      updateData.percentage_margins = {}; // Clear percentage values if fixed is selected
      updateData.global_profit_value = null; // Clear the old global percentage value
    } else { // percentage
      updateData.percentage_margins = percentageMargins;
      updateData.weight_margins = {}; // Clear fixed margins if percentage is selected
      updateData.global_profit_value = null; // Clear the old global percentage value
    }

    const { error } = await supabase
      .from('gold_settings')
      .update(updateData)
      .eq('id', settingsId);

    if (!error) alert("Pengaturan profit berhasil disimpan!");
    setLoading(false);
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold dark:text-white text-zinc-800">Pengaturan Profit Mosya Gold</h1>
        <p className="text-gray-500 text-sm italic">Pilih jenis profit dan atur margin Anda.</p>
      </header>

      {/* Profit Type Selection */}
      <div className="bg-[#C9A961]/10 p-6 rounded-[32px] border border-[#C9A961]/20 mb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
        <h4 className="font-bold text-sm dark:text-white mr-4">Jenis Profit:</h4>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="profitType"
              value="fixed"
              checked={profitType === "fixed"}
              onChange={() => setProfitType("fixed")}
              className="form-radio h-4 w-4 text-[#C9A961] focus:ring-[#C9A961] dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 dark:text-white">Fixed Profit</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="profitType"
              value="percentage"
              checked={profitType === "percentage"}
              onChange={() => setProfitType("percentage")}
              className="form-radio h-4 w-4 text-[#C9A961] focus:ring-[#C9A961] dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 dark:text-white">Percentage Profit</span>
          </label>
        </div>
      </div>

      {profitType === "fixed" && (
        <>
          {/* Quick Action */}
          <div className="bg-[#C9A961]/10 p-6 rounded-[32px] border border-[#C9A961]/20 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="text-[#C9A961]" size={24} />
              <h4 className="font-bold text-sm dark:text-white">Set Profit Global (Fixed)</h4>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="number" 
                value={globalProfit}
                onChange={(e) => setGlobalProfit(e.target.value)}
                className="flex-1 md:w-40 p-3 rounded-xl dark:bg-[#1A1D23] outline-none border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-[#C9A961]" 
              />
              <button onClick={applyGlobalFixed} className="px-6 py-3 bg-[#C9A961] text-white font-bold rounded-xl text-xs uppercase">Terapkan</button>
            </div>
          </div>

          {/* Grid Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {denominations.map((gram) => (
              <div key={gram} className="bg-white dark:bg-[#111318] p-5 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="font-bold dark:text-white">{gram} Gram</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs">Rp</span>
                  <input 
                    type="number" 
                    value={margins[gram] || 0}
                    onChange={(e) => setMargins({...margins, [gram]: parseInt(e.target.value) || 0})}
                    className="w-32 p-2 rounded-lg bg-gray-50 dark:bg-[#1A1D23] text-right font-bold text-[#C9A961] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {profitType === "percentage" && (
        <>
          {/* Quick Action for Percentage */}
          <div className="bg-[#C9A961]/10 p-6 rounded-[32px] border border-[#C9A961]/20 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="text-[#C9A961]" size={24} />
              <h4 className="font-bold text-sm dark:text-white">Set Profit Global (Percentage)</h4>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="number" 
                value={globalPercentage}
                onChange={(e) => setGlobalPercentage(e.target.value)}
                className="flex-1 md:w-40 p-3 rounded-xl dark:bg-[#1A1D23] outline-none border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-[#C9A961]" 
                placeholder="e.g., 5"
              />
              <span className="text-gray-400 text-xs flex items-center">%</span>
              <button onClick={applyGlobalPercentage} className="px-6 py-3 bg-[#C9A961] text-white font-bold rounded-xl text-xs uppercase">Terapkan</button>
            </div>
          </div>

          {/* Grid Settings for Percentage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {denominations.map((gram) => (
              <div key={gram} className="bg-white dark:bg-[#111318] p-5 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="font-bold dark:text-white">{gram} Gram</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={percentageMargins[gram] || 0}
                    onChange={(e) => setPercentageMargins({...percentageMargins, [gram]: parseFloat(e.target.value) || 0})}
                    className="w-32 p-2 rounded-lg bg-gray-50 dark:bg-[#1A1D23] text-right font-bold text-[#C9A961] outline-none"
                  />
                  <span className="text-gray-400 text-xs">%</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <button onClick={handleSaveAll} className="w-full py-5 bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] rounded-[32px] font-black tracking-widest flex items-center justify-center gap-3 shadow-xl">
        <Save size={20} /> SIMPAN KE DATABASE
      </button>
    </div>
  );
}