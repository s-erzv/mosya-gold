"use client";
import React from "react";
import { MapPin, Phone, Clock, Instagram, Mail, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

export const LocationMapSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#FAFBFC] dark:bg-[#0A0B0D] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A961]/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full mb-4 border border-[#C9A961]/20">
            <MapPin size={14} className="text-[#C9A961]" />
            <span className="text-[10px] font-black tracking-[0.2em] text-[#C9A961] uppercase">Lokasi & Kontak</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1D23] dark:text-white mb-4">
            Hubungi <span className="italic text-[#C9A961]">Mosya Gold</span>
          </h2>
          <p className="text-[#4A5568] dark:text-[#A0AEC0] max-w-2xl mx-auto font-light leading-relaxed">
            Berbasis di Depok dan melayani layanan <span className="font-semibold text-[#1A1D23] dark:text-white">Antar-Jemput (COD) se-Jabodetabek</span>. Transaksi aman, nyaman, dan transparan langsung di depan mata Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Map Container - 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 h-[350px] md:h-[550px] rounded-[40px] overflow-hidden border-8 border-white dark:border-[#1A1D23] shadow-2xl relative"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126891.13540209935!2d106.74614144415514!3d-6.34898145781476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec069f0367eb%3A0xc682914104975775!2sDepok%2C%20Kota%20Depok%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1707830000000!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.2] dark:invert-[0.9] dark:hue-rotate-[180deg]"
            ></iframe>
            
            {/* Floating Badge on Map */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-white/90 dark:bg-[#1A1D23]/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#C9A961]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C9A961] rounded-full flex items-center justify-center text-white shadow-lg">
                  <Send size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#C9A961] uppercase tracking-widest">Layanan Utama</p>
                  <p className="text-sm font-bold dark:text-white">COD JABODETABEK</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info - 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Address Card */}
            <div className="group bg-white dark:bg-[#1A1D23] p-6 rounded-[32px] border border-[#E5E7EB] dark:border-[#2D3748] hover:border-[#C9A961] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#C9A961]/10 rounded-2xl text-[#C9A961] group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1D23] dark:text-white mb-1">Pusat Operasional</h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0] text-sm leading-relaxed">
                    Depok, Jawa Barat<br />
                    <span className="text-[#C9A961] font-medium italic">*Tersedia Layanan Antar-Jemput se-Jabodetabek</span>
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/6282226555028" 
              target="_blank" 
              className="block group bg-white dark:bg-[#1A1D23] p-6 rounded-[32px] border border-[#E5E7EB] dark:border-[#2D3748] hover:border-[#25D366] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#25D366]/10 rounded-2xl text-[#25D366] group-hover:scale-110 transition-transform">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1D23] dark:text-white mb-1">WhatsApp Business</h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0] text-sm font-serif font-bold group-hover:text-[#25D366] transition-colors">
                    0822-2655-5028
                  </p>
                </div>
              </div>
            </a>

            {/* Social & Email Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a href="https://instagram.com/mosyagold" target="_blank" className="group bg-white dark:bg-[#1A1D23] p-5 rounded-[32px] border border-[#E5E7EB] dark:border-[#2D3748] hover:border-[#E1306C] transition-all text-center">
                <Instagram size={20} className="mx-auto mb-2 text-[#E1306C] group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-bold dark:text-white">@mosyagold</p>
              </a>
              <a href="mailto:Hellomosyagold@gmail.com" className="group bg-white dark:bg-[#1A1D23] p-5 rounded-[32px] border border-[#E5E7EB] dark:border-[#2D3748] hover:border-[#C9A961] transition-all text-center">
                <Mail size={20} className="mx-auto mb-2 text-[#C9A961] group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-bold dark:text-white">Email Us</p>
              </a>
            </div>

            {/* Operational Hours */}
            <div className="bg-gradient-to-br from-[#1A1D23] to-[#0A0B0D] p-7 rounded-[32px] text-white relative overflow-hidden shadow-xl border border-white/5">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <Clock size={80} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Clock size={18} className="text-[#C9A961]" />
                <h3 className="font-bold text-sm tracking-widest uppercase">Waktu Operasional</h3>
              </div>
              <div className="space-y-2 relative z-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-xs text-gray-400">Setiap Hari</span>
                  <span className="text-sm font-bold text-[#C9A961]">08:00 — 22:00 WIB</span>
                </div>
                <p className="text-[10px] text-gray-400 italic mt-2 text-center">
                  *Silahkan hubungi kami di luar jam kerja, admin akan membalas segera.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};