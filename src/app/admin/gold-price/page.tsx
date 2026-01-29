"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Save, TrendingUp, RefreshCw } from "lucide-react";

export default function GoldPriceSettings() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data } = await supabase.from('gold_settings').select('*').order('gold_type');
    if (data) setSettings(data);
    setLoading(false);
  }

  async function handleSave(id: string, newMargin: number) {
    setSaving(true);
    const { error } = await supabase
      .from('gold_settings')
      .update({ margin_percentage: newMargin, updated_at: new Date() })
      .eq('id', id);
    
    if (!error) {
      alert("Margin berhasil diperbarui!");
      fetchSettings();
    }
    setSaving(false);
  }

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pengaturan Margin Harga</h1>
        <p className="text-gray-500 text-sm">Tentukan persentase keuntungan Mosya Gold di atas harga real-time.</p>
      </header>

      <div className="grid gap-6">
        {settings.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#111318] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm"
          >
            <div>
              <h3 className="font-bold text-[#C9A961]">{item.gold_type}</h3>
              <p className="text-xs text-gray-400">Terakhir diupdate: {new Date(item.updated_at).toLocaleString('id-ID')}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="number"
                  defaultValue={item.margin_percentage}
                  onBlur={(e) => handleSave(item.id, parseFloat(e.target.value))}
                  className="w-24 p-3 pr-8 rounded-xl bg-gray-50 dark:bg-[#1A1D23] border-none focus:ring-2 focus:ring-[#C9A961] outline-none font-bold text-center"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
              </div>
              <TrendingUp size={20} className="text-[#C9A961] opacity-50" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}