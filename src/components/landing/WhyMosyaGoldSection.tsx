"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Banknote, BadgePercent, Headset, MapPin } from "lucide-react";

export const WhyMosyaGoldSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#0F1115] relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A96108_1px,transparent_1px),linear-gradient(to_bottom,#C9A96108_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full mb-4">
            <ShieldCheck size={16} className="text-[#C9A961]" />
            <span className="text-xs font-bold tracking-widest text-[#C9A961]">MENGAPA PILIH KAMI?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1D23] dark:text-white">
            Solusi Jual Beli Emas Terpercaya
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <Banknote size={36}/>, 
              title: "Langsung Cair di Tempat", 
              desc: "Transaksi instan dan transparan. Pembayaran cair seketika saat serah terima barang tanpa ribet.",
              color: "from-[#C9A961]/20 to-[#D4AF37]/20",
              iconColor: "text-[#C9A961]"
            },
            { 
              icon: <BadgePercent size={36}/>, 
              title: "Buyback Harga Terbaik", 
              desc: "Bandingkan sendiri! Kami menawarkan harga jual & buyback tertinggi tanpa biaya tersembunyi.",
              color: "from-[#8B9DC3]/20 to-[#6B7FA3]/20",
              iconColor: "text-[#8B9DC3]"
            },
            { 
              icon: <Headset size={36}/>, 
              title: "Layanan CS 24 Jam", 
              desc: "Konsultasi kapan saja. Tim kami siap menjawab pertanyaan Anda mengenai harga dan transaksi 24/7.",
              color: "from-[#C9A961]/20 to-[#8B9DC3]/20",
              iconColor: "text-[#C9A961]"
            },
            { 
              icon: <MapPin size={36}/>, 
              title: "Layanan COD Jabodetabek", 
              desc: "Cukup di rumah saja. Kami jemput emas Anda di area Jabodetabek dengan biaya sangat terjangkau.",
              color: "from-[#B8B8B8]/20 to-[#8B9DC3]/20",
              iconColor: "text-[#8B9DC3]"
            },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-[#1A1D23] p-8 rounded-3xl border border-[#E5E7EB] dark:border-[#2D3748] hover:border-[#C9A961] dark:hover:border-[#C9A961] transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A961]/20 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <div className={item.iconColor}>
                        {item.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-[#1A1D23] dark:text-white leading-tight">{item.title}</h3>
                <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed text-sm font-light">{item.desc}</p>
                
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#C9A961]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-[#C9A961]/10 via-[#8B9DC3]/10 to-[#C9A961]/10 rounded-3xl p-8 sm:p-12 border border-[#C9A961]/20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "5000+", label: "Transaksi Sukses" },
              { value: "100%", label: "Pembayaran Aman" },
              { value: "Jabodetabek", label: "Area Layanan COD" },
              { value: "24/7", label: "Bantuan Konsultasi" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-sm sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#C9A961] to-[#8B9DC3] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-xs text-[#4A5568] dark:text-[#A0AEC0] font-medium uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};