"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronRight, Award, Sparkles, Lock, 
  BadgeCheck, Zap, Star, Gem, 
  TrendingUp, Clock
} from "lucide-react";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { fetchGoldPriceData } from "@/lib/gold";

interface HeroSectionProps {
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroOpacity, heroScale }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [goldData, setGoldData] = useState<any>(null);
  const [loadingGold, setLoadingGold] = useState(true);

  const slides = [
    { type: 'card' },
    { type: 'image', src: "/all.jpeg" },
    { type: 'image', src: "/06-07.jpeg" },
    { type: 'image', src: "/19-20.jpeg" },
    { type: 'image', src: "/2019.jpeg" },
    { type: 'image', src: "/2020.jpeg" },
    { type: 'image', src: "/2011.jpeg" },
    { type: 'image', src: "/2013.jpeg" },
    { type: 'image', src: "/2018.jpeg" },
  ];

  useEffect(() => {
    fetchGoldPriceData().then(res => {
      if (res) setGoldData(res);
      setLoadingGold(false);
    });

    const duration = currentSlide === 0 ? 8000 : 4000;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]); 

  const formatIDR = (val: number) => {
    if (!val || isNaN(val)) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { 
      style: "currency", 
      currency: "IDR", 
      maximumFractionDigits: 0 
    }).format(val);
  };

  return (
    <section className="relative min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#FAFBFC] dark:bg-[#0A0B0D]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A961]/5 rounded-full blur-[120px] -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-left space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#C9A961]/10 border border-[#C9A961]/20 backdrop-blur-sm">
              <Sparkles size={16} className="text-[#C9A961] animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-[#C9A961] uppercase">
                Niaga Emas Syariah
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif leading-[1.1] text-[#1A1D23] dark:text-white tracking-tight">
                Investasi <br />
                <span className="bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] bg-clip-text text-transparent italic">
                  Emas Murni
                </span>
              </h1>
              <div className="max-w-xl">
                <p className="text-lg md:text-xl text-[#4A5568] dark:text-[#A0AEC0] font-light leading-relaxed mb-4">
                  Wujudkan masa depan gemilang dengan koleksi emas 99.9% bersertifikat bersama
                  <span className="font-semibold text-[#C9A961]"> Mosya Gold</span>.
                </p>
                <p className="text-md md:text-lg text-[#1A1D23] dark:text-[#C9A961] italic font-medium opacity-80">
                  "Smart Spending with Mosya Gold."
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {[
                { icon: <BadgeCheck size={20}/>, text: "Sertifikat Resmi" },
                { icon: <Lock size={20}/>, text: "100% Aman" },
                { icon: <Zap size={20}/>, text: "Proses Cepat" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#4A5568] dark:text-[#A0AEC0]">
                  <span className="text-[#C9A961]">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/katalog" className="px-8 py-4 bg-[#C9A961] text-white font-bold rounded-2xl shadow-xl shadow-[#C9A961]/20 hover:scale-105 transition-all flex items-center justify-center gap-2 group">
                Jelajahi Koleksi <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#gold-interactive-section" className="px-8 py-4 rounded-2xl border-2 border-[#C9A961]/30 text-[#1A1D23] dark:text-white font-bold hover:bg-[#C9A961]/5 transition-all flex items-center justify-center">
                Cek Harga Hari Ini
              </Link>
            </div>
          </motion.div>

          <motion.div 
            style={{ scale: heroScale }}
            className="relative flex flex-col items-center lg:items-end w-full"
          >
            {/* WRAPPER UTAMA: Mengunci tinggi agar tidak goyang (Layout Shift) */}
            <div className="relative w-full max-w-[280px] md:max-w-[480px] aspect-[4/5] flex items-center justify-center">
             <AnimatePresence mode="wait">
                {slides[currentSlide].type === 'card' ? (
                  <motion.div
                    key="gold-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    /* h-full w-full agar mengikuti aspect ratio parent */
                    className="w-full h-full p-6 md:p-10 flex flex-col justify-between bg-white dark:bg-[#111318] rounded-[30px] md:rounded-[40px] shadow-xl md:shadow-2xl border border-[#C9A961]/20 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[#C9A961]/5 rounded-full blur-2xl md:blur-3xl" />
                    <div className="space-y-4 md:space-y-6 relative z-10 flex-grow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#C9A961]/10 text-[#C9A961] border border-[#C9A961]/20">
                          <Clock size={12} className="animate-pulse" />
                          <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase">Live Market</span>
                        </div>
                        <Gem className="text-[#C9A961] w-6 h-6 md:w-7 md:h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-3xl font-serif font-bold dark:text-white mb-1 md:mb-2 leading-tight">Monitor Harga <span className="italic text-[#C9A961]">Real-time</span></h3>
                        <p className="text-gray-500 text-[10px] md:text-sm">Update harga pasar bursa emas hari ini.</p>
                      </div>
                      
                      <div className="space-y-3 md:space-y-4">
                        {loadingGold ? (
                          [1, 2].map(i => <div key={i} className="h-14 md:h-20 w-full bg-gray-100 dark:bg-white/5 animate-pulse rounded-2xl md:rounded-3xl" />)
                        ) : (
                          goldData?.settings?.map((setting: any) => {
                            const brandMapping: Record<string, string> = {
                              "Antam Certicard": "ANTAM",
                              "Antam Retro": "ANTAM MULIA RETRO"
                            };
                            const targetBrand = brandMapping[setting.gold_type] || setting.gold_type;
                            const market = goldData.rawMarketData?.find((d: any) => d.brand.toUpperCase() === targetBrand.toUpperCase());
                            const basePrice = market?.sell_price || 0;
                            const finalPrice = goldData.calculateFinalPrice ? goldData.calculateFinalPrice(1, basePrice, setting) : 0;

                            if (basePrice === 0) return null;

                            return (
                              <div key={setting.gold_type} className="p-3 md:p-5 rounded-[20px] md:rounded-[28px] bg-gray-50 dark:bg-[#1A1D23] border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:border-[#C9A961]/50 transition-all duration-300">
                                <div>
                                  <p className="text-[7px] md:text-[10px] font-black text-[#C9A961] tracking-widest uppercase mb-0.5 md:mb-1">{setting.gold_type}</p>
                                  <p className="text-sm md:text-2xl font-serif font-bold dark:text-white">{formatIDR(finalPrice)}</p>
                                </div>
                                <div className="p-1 md:p-2 bg-white dark:bg-[#0A0B0D] rounded-lg md:rounded-xl shadow-sm group-hover:bg-[#C9A961] group-hover:text-white transition-colors">
                                  <TrendingUp className="w-3 h-3 md:w-[18px] md:h-[18px]" />
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`img-frame-${currentSlide}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-full"
                  >
                    <div className="relative w-full h-full rounded-[30px] md:rounded-[60px] overflow-hidden shadow-xl md:shadow-2xl border-4 md:border-8 border-white dark:border-[#1A1D23] bg-white">
                      <img 
                        src={slides[currentSlide].src!} 
                        alt="Mosya Gold Collection" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 p-2.5 md:p-5 bg-white dark:bg-[#111318] rounded-[18px] md:rounded-[30px] shadow-xl border border-gray-100 dark:border-white/10 flex items-center gap-2 md:gap-4 z-20"
                    >
                      <div className="p-1 md:p-3 bg-[#C9A961]/10 rounded-lg md:rounded-2xl text-[#C9A961]">
                        <Award className="w-[14px] h-[14px] md:w-[24px] md:h-[24px]" />
                      </div>
                      <div>
                        <p className="text-[9px] md:text-sm font-bold dark:text-white tracking-tight">Kadar 99.9%</p>
                        <p className="text-[7px] md:text-[10px] text-[#C9A961] font-bold uppercase tracking-widest">Certified Gold</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="mt-8 flex justify-center lg:justify-end w-full max-w-[480px]">
              <div className="flex gap-2.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-8 bg-[#C9A961]' : 'w-2 bg-gray-300 dark:bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};