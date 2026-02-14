"use client";
import React, { useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

import { fetchGoldPriceData } from "@/lib/gold";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import GoldInteractiveSection from "@/components/GoldInteractiveSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { WhyMosyaGoldSection } from "@/components/landing/WhyMosyaGoldSection";
import { FeaturedProductsSection } from "@/components/landing/FeaturedProductsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { LocationMapSection } from "@/components/landing/LocationMapSection";
import { CallToActionSection } from "@/components/landing/CallToActionSection";
import { ServiceBuybackSection } from "@/components/landing/ServiceBuybackSection";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const [goldData, setGoldData] = useState<any>(null);

  useEffect(() => {
    // Fetch Data Harga Emas
    fetchGoldPriceData().then(res => setGoldData(res));
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

      <main className="relative z-10 pt-3 md:pt-0">
        <HeroSection heroOpacity={heroOpacity} heroScale={heroScale} />


        <section>
          <GoldInteractiveSection />
        </section>

        <WhyMosyaGoldSection />

        <ServiceBuybackSection />


        <FeaturedProductsSection />

        <TestimonialsSection />
        <CallToActionSection />

        <LocationMapSection />

      </main>

      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
