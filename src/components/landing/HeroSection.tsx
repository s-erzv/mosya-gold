"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, Award, Users, Sparkles, Lock, 
  BadgeCheck, Zap, Star, Gem, ShoppingBag, 
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
    { type: 'image', src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000" },
    { type: 'image', src: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=1000" },
    { type: 'image', src: "https://images.unsplash.com/photo-1573408302355-4e0b7caf3ad5?q=80&w=1000" },
    { type: 'image', src: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000" },
  ];

  useEffect(() => {
    fetchGoldPriceData().then(res => {
      if (res) setGoldData(res);
      setLoadingGold(false);
    });

    const duration = currentSlide === 0 ? 10000 : 5000;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearInterval(timer);
  }, [currentSlide]); 

  const formatIDR = (val: number) => {
    if (isNaN(val) || val === 0) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { 
      style: "currency", 
      currency: "IDR", 
      maximumFractionDigits: 0 
    }).format(val);
  };

  return (
    <section className="relative min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#FAFBFC] dark:bg-[#0A0B0D]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-left space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 mt-2 rounded-full bg-[#C9A961]/10 border border-[#C9A961]/20 backdrop-blur-sm">
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
              <div className="max-w-xl space-y-4">
                <p className="text-lg md:text-xl text-[#4A5568] dark:text-[#A0AEC0] font-light leading-relaxed">
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
              <Link href="/katalog" className="px-8 py-4 bg-[#C9A961] text-white font-bold rounded-2xl shadow-xl shadow-[#C9A961]/20 hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 group">
                Jelajahi Koleksi <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#tentang" className="px-8 py-4 rounded-2xl border-2 border-[#C9A961]/30 text-[#1A1D23] dark:text-white font-bold hover:bg-[#C9A961]/5 transition-all flex items-center justify-center">
                Pelajari Lebih Lanjut
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#0A0B0D] bg-gray-200" />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex text-[#C9A961] mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-[#4A5568] dark:text-[#A0AEC0]"><span className="font-bold text-[#1A1D23] dark:text-white">5,000+</span> Pelanggan Puas</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            style={{ scale: heroScale }}
            className="relative flex justify-center lg:justify-end min-h-[500px]"
          >
            <AnimatePresence mode="wait">
              {slides[currentSlide].type === 'card' ? (
                <motion.div
                  key="gold-card"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="w-full max-w-[500px] p-8 md:p-10 flex flex-col justify-between bg-white dark:bg-[#111318] rounded-[40px] shadow-[0_32px_64px_-12px_rgba(201,169,97,0.15)] border border-[#C9A961]/20 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A961]/5 rounded-full blur-3xl" />
                  
                  <div className="space-y-8 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9A961]/10 text-[#C9A961] border border-[#C9A961]/20">
                        <Clock size={14} className="animate-spin-slow" />
                        <span className="text-[10px] font-black tracking-widest uppercase">Live Price</span>
                      </div>
                      <Gem className="text-[#C9A961]" size={28} />
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-serif font-bold dark:text-white mb-2">Pusat Harga <span className="italic text-[#C9A961]">Emas</span></h3>
                      <p className="text-gray-500 text-sm">Update harga pasar global hari ini.</p>
                    </div>

                    <div className="space-y-4">
                      {loadingGold ? (
                        [1,2].map(i => <div key={i} className="h-20 w-full bg-gray-100 dark:bg-white/5 animate-pulse rounded-3xl" />)
                      ) : (
                        goldData?.settings?.slice(0, 2).map((item: any) => {
                          const marketPrice = goldData.marketPrice || 0;
                          const finalPrice = marketPrice + (marketPrice * (item.margin_percentage / 100));
                          return (
                            <div key={item.gold_type} className="p-6 rounded-[28px] bg-[#FAFBFC] dark:bg-[#1A1D23] border border-gray-100 dark:border-white/5 flex items-center justify-between">
                              <div>
                                <p className="text-[10px] font-black text-[#C9A961] tracking-widest uppercase mb-1">{item.gold_type}</p>
                                <p className="text-2xl font-serif font-bold dark:text-white">{formatIDR(finalPrice)}</p>
                              </div>
                              <TrendingUp size={20} className="text-[#C9A961]" />
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
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full max-w-[600px] aspect-square"
                >
                  <div className="relative w-full h-full rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-white dark:border-[#1A1D23] bg-white">
                    <Image 
                      src={slides[currentSlide].src!} 
                      alt="Luxury Collection" 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-8 right-8 p-3 bg-white/90 backdrop-blur rounded-2xl shadow-xl">
                      <Sparkles size={24} className="text-[#C9A961] animate-pulse" />
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="absolute -bottom-6 -left-6 p-5 bg-white dark:bg-[#1A1D23] rounded-[32px] shadow-2xl border border-gray-100 flex items-center gap-4"
                  >
                    <Award size={28} className="text-[#C9A961]" />
                    <div>
                      <p className="text-sm font-bold dark:text-white">99.9% Pure</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Certified Gold</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-8 bg-[#C9A961]' : 'w-2 bg-gray-300 dark:bg-white/20'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};