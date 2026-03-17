"use client";
import React from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, Users, MessageSquare, Gem, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const CallToActionSection: React.FC = () => {
  const phoneNumber = "6282226555028";
  const waMessage = "Halo Mosya Gold, saya ingin ikut pendaftaran Batch Baru Tabungan Gotong Royong Emas Antam. Boleh minta info detailnya?";

  return (
    <section id="gotong-royong-section" className="py-20 sm:py-24 bg-[#0b213b] relative overflow-hidden">
      {/* Background Decorative - Nuansa Emas & Gelap */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,97,0.1),transparent_70%)]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A961]/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge Promo */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#C9A961]/10 backdrop-blur-sm border border-[#C9A961]/30 rounded-full mb-8">
            <Sparkles size={16} className="text-[#C9A961] animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-[#C9A961] uppercase">Program Eksklusif</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Dibuka <span className="italic text-[#C9A961]">Batch Baru</span> <br />
            <span className="bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] bg-clip-text text-transparent">
              Tabungan Gotong Royong
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Miliki Emas Antam dengan cara yang lebih ringan dan berjamaah. <br />
            Tersedia pilihan gramasi untuk masa depan Anda.
          </p>

          {/* Gramasi Selection Visual */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14">
            {[0.5, 1, 2, 3, 5].map((gram) => (
              <motion.div
                key={gram}
                whileHover={{ y: -5, borderColor: "#C9A961" }}
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md transition-all flex flex-col items-center min-w-[100px]"
              >
                <Gem size={20} className="text-[#C9A961] mb-2" />
                <span className="text-xl font-bold text-white">{gram}</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Gram</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto px-10 py-5 bg-[#C9A961] text-white font-black rounded-[20px] shadow-2xl shadow-[#C9A961]/20 hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
            >
              Daftar Batch Sekarang
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            
          </div>

          {/* Quick Info */}
          <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { label: "Metode", value: "Gotong Royong" },
              { label: "Objek", value: "Antam Redmark" },
              { label: "Status", value: "Pendaftaran Dibuka" },
            ].map((info, i) => (
              <div key={i} className="text-center">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">{info.label}</p>
                <p className="text-white font-serif font-semibold">{info.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};