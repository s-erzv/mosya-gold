"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  RefreshCcw, 
  Banknote, 
  LifeBuoy, 
  BadgeCheck,
  ShieldAlert,
  HandCoins
} from "lucide-react";

export const ServiceBuybackSection: React.FC = () => {
  return (
    <section id="buyback-section" className="py-20 bg-white dark:bg-[#0F1115] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#C9A961]/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Bagian Kiri: Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full border border-[#C9A961]/20">
              <RefreshCcw size={14} className="text-[#C9A961]" />
              <span className="text-[10px] font-black tracking-[0.2em] text-[#C9A961] uppercase">Layanan Terpadu</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1D23] dark:text-white leading-tight">
              Terima <span className="italic text-[#C9A961]">Buyback</span> Emas & Perak
              Logam Mulia / Perhiasan
            </h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] text-lg font-light leading-relaxed">
              Kami memberikan solusi terbaik untuk aset berharga Anda dengan proses yang transparan, aman, dan langsung cair.
            </p>
          </motion.div>

          {/* Bagian Kanan: List Layanan (Sesuai Teks Kamu) */}
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                icon: <ShieldAlert size={24} />,
                text: "Melayani perhiasan patah / tanpa surat",
                desc: "Tetap bernilai tinggi meskipun kondisi fisik tidak sempurna."
              },
              {
                icon: <HandCoins size={24} />,
                text: "Menerima gadai perhiasan maupun logam mulia",
                desc: "Solusi dana cepat dengan jaminan keamanan aset 100%."
              },
              {
                icon: <LifeBuoy size={24} />,
                text: "Membantu tebus gadai atau cicilan perhiasan/logam mulia di bank maupun penggadaian",
                desc: "Kami bantu proses pelunasan dan pemindahan aset Anda."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-start gap-5 p-6 bg-[#FAFBFC] dark:bg-[#1A1D23] rounded-[32px] border border-transparent hover:border-[#C9A961]/30 transition-all duration-300"
              >
                <div className="p-3 bg-white dark:bg-[#0A0B0D] rounded-2xl text-[#C9A961] shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1D23] dark:text-white mb-1 group-hover:text-[#C9A961] transition-colors">
                    {item.text}
                  </h3>
                  <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0] font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};