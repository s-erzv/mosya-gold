"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, ShieldCheck, Award, MapPin, TrendingUp, 
  ArrowUpRight, Star, Clock, Users, Sparkles, Phone, Mail,
  CheckCircle2, Lock, BadgeCheck, Gem, Zap
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { supabase } from "@/lib/supabase";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export default function LandingPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, image_url, category")
        .limit(6)
        .order("created_at", { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-[#0A0B0D] transition-colors duration-700 selection:bg-[#C9A961] selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-[#C9A961]/10 via-[#8B9DC3]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-[#B8B8B8]/10 via-[#C9A961]/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,97,0.03),transparent_50%)]"></div>
      </div>

      <main className="relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <motion.div 
                style={{ opacity: heroOpacity }}
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="text-left space-y-8"
              >
                {/* Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C9A961]/15 via-[#8B9DC3]/15 to-[#C9A961]/15 backdrop-blur-sm border border-[#C9A961]/30 shadow-lg"
                >
                  <Sparkles size={16} className="text-[#C9A961] animate-pulse" />
                  <span className="text-xs font-semibold bg-gradient-to-r from-[#C9A961] to-[#8B9DC3] bg-clip-text text-transparent">
                    Premium Gold & Jewelry
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-6 text-[#1A1D23] dark:text-white tracking-tight">
                    Investasi <br />
                    <span className="relative inline-block">
                      <span className="relative z-10 bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] bg-clip-text text-transparent italic">
                        Emas Murni
                      </span>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-[#C9A961]/20 to-[#8B9DC3]/20 blur-sm"
                      />
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                    Wujudkan masa depan gemilang dengan koleksi emas 99.9% bersertifikat. 
                    <span className="font-semibold text-[#C9A961]"> Mosya Gold</span> - Kemewahan yang abadi, investasi yang bijak.
                  </p>
                </motion.div>

                {/* Trust Indicators Mini */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={20} className="text-[#C9A961]" />
                    <span className="text-[#4A5568] dark:text-[#A0AEC0]">Sertifikat Resmi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={20} className="text-[#8B9DC3]" />
                    <span className="text-[#4A5568] dark:text-[#A0AEC0]">100% Aman</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={20} className="text-[#C9A961]" />
                    <span className="text-[#4A5568] dark:text-[#A0AEC0]">Proses Cepat</span>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Link 
                    href="/katalog" 
                    className="group relative px-8 py-4 bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] text-white font-semibold rounded-2xl overflow-hidden shadow-2xl shadow-[#C9A961]/40 hover:shadow-[#C9A961]/60 transition-all duration-500 hover:-translate-y-1"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Jelajahi Koleksi <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </Link>
                  
                  <Link
                    href="#tentang"
                    className="px-8 py-4 rounded-2xl border-2 border-[#C9A961]/30 text-[#1A1D23] dark:text-white font-semibold hover:bg-[#C9A961]/10 hover:border-[#C9A961] transition-all duration-300 backdrop-blur-sm"
                  >
                    Pelajari Lebih Lanjut
                  </Link>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-center lg:justify-start gap-4 pt-4"
                >
                  <div className="flex -space-x-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#0A0B0D] bg-gradient-to-br from-[#C9A961] to-[#8B9DC3]"></div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1 text-[#C9A961]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs text-[#4A5568] dark:text-[#A0AEC0]">
                      <span className="font-bold text-[#1A1D23] dark:text-white">5,000+</span> Pelanggan Puas
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Image */}
              <motion.div 
                style={{ scale: heroScale }}
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[500px] aspect-[3/4]">
                  {/* Main Image Container */}
                  <div className="relative w-full h-full rounded-[60px] overflow-hidden shadow-2xl border-8 border-white/50 dark:border-[#1A1D23]/50 backdrop-blur-sm">
                    <Image 
                      src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop" 
                      alt="Luxury Gold Jewelry Collection" 
                      fill 
                      className="object-cover"
                      priority 
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Sparkle Effect */}
                    <div className="absolute top-8 right-8 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      <Sparkles size={32} className="text-[#C9A961]" />
                    </div>
                  </div>

                  {/* Floating Trust Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="absolute -bottom-6 -left-6 sm:left-0 bg-white dark:bg-[#1A1D23] p-6 rounded-3xl shadow-2xl border border-[#C9A961]/20 max-w-[200px]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-[#C9A961]/20 to-[#8B9DC3]/20 rounded-2xl">
                        <Award size={28} className="text-[#C9A961]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1A1D23] dark:text-white leading-tight">99.9% Pure</p>
                        <p className="text-xs text-[#4A5568] dark:text-[#A0AEC0] mt-1">Certified Gold</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="hidden lg:block absolute -right-8 top-1/3 bg-white dark:bg-[#1A1D23] p-6 rounded-3xl shadow-2xl border border-[#8B9DC3]/20"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Users size={24} className="text-[#8B9DC3]" />
                      <div>
                        <p className="text-2xl font-bold text-[#1A1D23] dark:text-white">12K+</p>
                        <p className="text-xs text-[#4A5568] dark:text-[#A0AEC0]">Happy Customers</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-[#4A5568] dark:text-[#A0AEC0] tracking-wider">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-[#C9A961]/50 flex justify-center pt-2"
            >
              <div className="w-1.5 h-3 bg-[#C9A961] rounded-full"></div>
            </motion.div>
          </motion.div> */}
        </section>

        {/* --- TRUST INDICATORS --- */}
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
                <span className="text-xs font-bold tracking-widest text-[#C9A961]">Mengapa Mosya Gold?</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1D23] dark:text-white">
                Keunggulan Kami
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: <ShieldCheck size={36}/>, 
                  title: "Sertifikat Resmi", 
                  desc: "Setiap produk dilengkapi sertifikat keaslian dari lembaga terpercaya.",
                  color: "from-[#C9A961]/20 to-[#D4AF37]/20",
                  iconColor: "text-[#C9A961]"
                },
                { 
                  icon: <Gem size={36}/>, 
                  title: "Kemurnian 99.9%", 
                  desc: "Standar emas tertinggi dengan jaminan kualitas premium.",
                  color: "from-[#8B9DC3]/20 to-[#6B7FA3]/20",
                  iconColor: "text-[#8B9DC3]"
                },
                { 
                  icon: <TrendingUp size={36}/>, 
                  title: "Harga Kompetitif", 
                  desc: "Update harga real-time sesuai pasar global, transparan dan adil.",
                  color: "from-[#C9A961]/20 to-[#8B9DC3]/20",
                  iconColor: "text-[#C9A961]"
                },
                { 
                  icon: <Clock size={36}/>, 
                  title: "Proses Cepat", 
                  desc: "Transaksi mudah, aman, dan cepat dengan customer service responsif 24/7.",
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
                    {/* Icon Container */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <div className={item.iconColor}>
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-[#1A1D23] dark:text-white">{item.title}</h3>
                    <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed text-sm">{item.desc}</p>
                    
                    {/* Decorative Element */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#C9A961]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-20 bg-gradient-to-r from-[#C9A961]/10 via-[#8B9DC3]/10 to-[#C9A961]/10 rounded-3xl p-8 sm:p-12 border border-[#C9A961]/20"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { value: "15+", label: "Tahun Pengalaman" },
                  { value: "12K+", label: "Pelanggan Setia" },
                  { value: "99.9%", label: "Kemurnian Emas" },
                  { value: "24/7", label: "Customer Support" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#C9A961] to-[#8B9DC3] bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0] font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- FEATURED PRODUCTS --- */}
        <section className="py-20 sm:py-24 bg-[#FAFBFC] dark:bg-[#0A0B0D] relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full mb-4">
                  <Sparkles size={16} className="text-[#C9A961]" />
                  <span className="text-xs font-bold tracking-widest text-[#C9A961]">Koleksi Eksklusif</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1D23] dark:text-white mb-3">
                  Produk Pilihan
                </h2>
                <p className="text-[#4A5568] dark:text-[#A0AEC0] max-w-xl">
                  Temukan koleksi emas dan perhiasan premium dengan desain eksklusif dan kualitas terjamin
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link 
                  href="/katalog" 
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1A1D23] border-2 border-[#C9A961]/30 hover:border-[#C9A961] rounded-2xl font-semibold text-[#1A1D23] dark:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A961]/20"
                >
                  Lihat Semua Produk 
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] rounded-[40px] bg-[#E5E7EB] dark:bg-[#1A1D23] animate-pulse"></div>
                ))
              ) : (
                products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    className="group relative bg-white dark:bg-[#1A1D23] rounded-[40px] overflow-hidden border-2 border-[#E5E7EB] dark:border-[#2D3748] hover:border-[#C9A961] transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A961]/30 hover:-translate-y-2"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image 
                        src={product.image_url} 
                        alt={product.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-4 py-1.5 bg-white/95 dark:bg-[#1A1D23]/95 backdrop-blur-md text-[10px] font-black tracking-[0.2em] rounded-full text-[#1A1D23] dark:text-white shadow-lg border border-[#C9A961]/20">
                          {product.category}
                        </span>
                      </div>

                      {/* Quick View Button */}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: hoveredProduct === product.id ? 1 : 0, y: hoveredProduct === product.id ? 0 : 10 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-white dark:bg-[#1A1D23] text-[#1A1D23] dark:text-white font-semibold rounded-full shadow-lg border border-[#C9A961]/30 hover:bg-[#C9A961] hover:text-white transition-all duration-300 text-sm"
                      >
                        Lihat Detail
                      </motion.button>

                      {/* Sparkle Effect on Hover */}
                      <div className={`absolute top-4 left-4 transition-all duration-500 ${hoveredProduct === product.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <Sparkles size={24} className="text-[#C9A961] animate-pulse" />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="font-serif font-bold text-xl text-[#1A1D23] dark:text-white mb-2 truncate group-hover:text-[#C9A961] transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold bg-gradient-to-r from-[#C9A961] to-[#D4AF37] bg-clip-text text-transparent">
                          Rp {product.price?.toLocaleString("id-ID")}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-[#C9A961] fill-[#C9A961]" />
                          <span className="text-sm font-semibold text-[#4A5568] dark:text-[#A0AEC0]">4.9</span>
                        </div>
                      </div>
                      
                      {/* Trust Badge */}
                      <div className="mt-4 flex items-center gap-2 text-xs text-[#4A5568] dark:text-[#A0AEC0]">
                        <CheckCircle2 size={14} className="text-[#C9A961]" />
                        <span>Sertifikat Resmi & Garansi</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Limited Offer Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <Sparkles size={16} className="text-white animate-pulse" />
                  <span className="text-xs font-bold tracking-widest text-white">Penawaran Terbatas</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                  Dapatkan Diskon Hingga 15% untuk Pembelian Pertama
                </h3>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                  Wujudkan impian memiliki emas berkualitas dengan penawaran spesial kami. Penawaran terbatas!
                </p>
                <Link
                  href="/katalog"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#C9A961] font-bold rounded-2xl hover:bg-[#1A1D23] hover:text-white transition-all duration-300 shadow-xl"
                >
                  Klaim Sekarang <ChevronRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section className="py-20 sm:py-24 bg-white dark:bg-[#0F1115]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full mb-4">
                <Star size={16} className="text-[#C9A961] fill-[#C9A961]" />
                <span className="text-xs font-bold tracking-widest text-[#C9A961]">Testimoni</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1D23] dark:text-white mb-3">
                Dipercaya Ribuan Pelanggan
              </h2>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] max-w-2xl mx-auto">
                Pengalaman nyata dari pelanggan setia Mosya Gold
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  name: "Sarah Amelia",
                  role: "Pengusaha",
                  image: "https://i.pravatar.cc/150?img=1",
                  rating: 5,
                  text: "Investasi terbaik yang pernah saya lakukan! Prosesnya mudah, transparan, dan hasilnya memuaskan. Mosya Gold benar-benar terpercaya."
                },
                {
                  name: "Budi Santoso",
                  role: "Karyawan Swasta",
                  image: "https://i.pravatar.cc/150?img=12",
                  rating: 5,
                  text: "Pelayanan customer service sangat responsif dan membantu. Produk yang saya beli sesuai ekspektasi dengan sertifikat lengkap."
                },
                {
                  name: "Dewi Kusuma",
                  role: "Ibu Rumah Tangga",
                  image: "https://i.pravatar.cc/150?img=5",
                  rating: 5,
                  text: "Koleksi perhiasannya cantik-cantik! Cocok untuk investasi jangka panjang dan bisa dipakai sehari-hari. Highly recommended!"
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#FAFBFC] dark:bg-[#1A1D23] p-8 rounded-3xl border border-[#E5E7EB] dark:border-[#2D3748] hover:border-[#C9A961] transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-[#C9A961] fill-[#C9A961]" />
                    ))}
                  </div>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9A961]/30">
                      <Image src={testimonial.image} alt={testimonial.name} width={48} height={48} className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1D23] dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- LOCATION/MAP SECTION --- */}
        <section className="py-20 sm:py-24 bg-[#FAFBFC] dark:bg-[#0A0B0D]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full mb-4">
                <MapPin size={16} className="text-[#C9A961]" />
                <span className="text-xs font-bold tracking-widest text-[#C9A961]">Kunjungi Kami</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1D23] dark:text-white mb-3">
                Galeri Mosya Gold
              </h2>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] max-w-2xl mx-auto">
                Kunjungi showroom kami dan rasakan pengalaman berbelanja emas premium secara langsung
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Map Container */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-[400px] sm:h-[500px] rounded-[40px] overflow-hidden border-4 border-white dark:border-[#1A1D23] shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A961]/20 to-[#8B9DC3]/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={64} className="text-[#C9A961] mx-auto mb-4" />
                    <p className="text-[#4A5568] dark:text-[#A0AEC0] font-semibold">Google Maps Integration</p>
                    <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0] mt-2">Showroom Mosya Gold</p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-[#1A1D23] p-8 rounded-3xl border border-[#E5E7EB] dark:border-[#2D3748]">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#C9A961]/10 rounded-2xl">
                      <MapPin size={24} className="text-[#C9A961]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1D23] dark:text-white mb-2">Alamat Showroom</h3>
                      <p className="text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                        Jl. Raya Premium No. 123<br />
                        Jakarta Selatan, DKI Jakarta 12345
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1A1D23] p-8 rounded-3xl border border-[#E5E7EB] dark:border-[#2D3748]">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#8B9DC3]/10 rounded-2xl">
                      <Phone size={24} className="text-[#8B9DC3]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1D23] dark:text-white mb-2">Telepon / WhatsApp</h3>
                      <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                        +62 812-3456-7890
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#C9A961]/10 to-[#8B9DC3]/10 p-8 rounded-3xl border border-[#C9A961]/20">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white dark:bg-[#1A1D23] rounded-2xl">
                      <Clock size={24} className="text-[#C9A961]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1D23] dark:text-white mb-2">Jam Operasional</h3>
                      <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                        Senin - Jumat: 09.00 - 18.00 WIB<br />
                        Sabtu: 09.00 - 15.00 WIB<br />
                        Minggu: Tutup
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-20 sm:py-24 bg-[#1A1D23] dark:bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,169,97,0.15),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,157,195,0.15),transparent_70%)]"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <Sparkles size={16} className="text-[#C9A961] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-white">Mulai Investasi Anda</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Siap Memulai Perjalanan <br />
                <span className="bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#8B9DC3] bg-clip-text text-transparent">
                  Investasi Emas Anda?
                </span>
              </h2>
              
              <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Jangan lewatkan kesempatan untuk memiliki emas berkualitas premium dengan harga terbaik. 
                Konsultasikan kebutuhan investasi Anda bersama tim ahli kami.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/katalog"
                  className="group px-8 py-4 bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] text-white font-bold rounded-2xl shadow-2xl shadow-[#C9A961]/40 hover:shadow-[#C9A961]/60 transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
                >
                  Mulai Belanja Sekarang
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="#contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white hover:text-[#1A1D23] transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Phone size={20} />
                  Hubungi Kami
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
                {[
                  { icon: <ShieldCheck size={24} />, text: "100% Aman" },
                  { icon: <Award size={24} />, text: "Tersertifikasi" },
                  { icon: <Users size={24} />, text: "12K+ Pelanggan" },
                  { icon: <Sparkles size={24} />, text: "Gratis Konsultasi" },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/80">
                    <div className="text-[#C9A961]">{badge.icon}</div>
                    <span className="text-sm font-semibold">{badge.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloating />
    </div>
  );
}