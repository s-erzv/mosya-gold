"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0A0B0D] pt-24 pb-12 border-t border-zinc-100 dark:border-zinc-800 relative overflow-hidden">
      {/* Dekorasi Background Halus */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A961]/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              {/* Menggunakan logo.png sesuai permintaan */}
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.png" 
                  alt="Mosya Gold Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tighter dark:text-white">
                MOSYA<span className="text-[#C9A961]">GOLD</span>
              </span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
              Solusi cerdas investasi emas dan koleksi perhiasan murni 99.9% dengan layanan antar-jemput (COD) se-Jabodetabek.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/mosyagold" target="_blank" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:bg-[#E1306C] hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:bg-[#1877F2] hover:text-white transition-all duration-300 cursor-pointer">
                <Facebook size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 cursor-pointer">
                <Twitter size={18} />
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-[10px] tracking-[0.3em] text-[#C9A961] mb-8">Layanan Kami</h5>
            <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
              <li className="hover:text-[#C9A961] transition-colors cursor-pointer">Beli Emas Online</li>
              <li className="hover:text-[#C9A961] transition-colors cursor-pointer">Jual Kembali (Buyback)</li>
              <li className="hover:text-[#C9A961] transition-colors cursor-pointer">Tabungan Gotong Royong</li>
              <li className="hover:text-[#C9A961] transition-colors cursor-pointer">Layanan COD</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[10px] tracking-[0.3em] text-[#C9A961] mb-8">Kontak & Lokasi</h5>
            <ul className="space-y-5 text-sm">
              <li className="flex gap-4 text-zinc-600 dark:text-zinc-300 items-center group">
                <div className="p-2 bg-[#C9A961]/10 rounded-lg text-[#C9A961] group-hover:bg-[#C9A961] group-hover:text-white transition-all">
                  <Phone size={16}/>
                </div>
                <span className="font-serif font-bold tracking-tight text-base">0822-2655-5028</span>
              </li>
              <li className="flex gap-4 text-zinc-600 dark:text-zinc-300 items-center group">
                <div className="p-2 bg-[#C9A961]/10 rounded-lg text-[#C9A961] group-hover:bg-[#C9A961] group-hover:text-white transition-all">
                  <Mail size={16}/>
                </div>
                Hellomosyagold@gmail.com
              </li>
              <li className="flex gap-4 text-zinc-600 dark:text-zinc-300 leading-relaxed items-start group">
                <div className="p-2 bg-[#C9A961]/10 rounded-lg text-[#C9A961] group-hover:bg-[#C9A961] group-hover:text-white transition-all mt-1">
                  <MapPin size={16}/>
                </div>
                Depok, Jawa Barat<br/>
                (Siap COD se-Jabodetabek)
              </li>
            </ul>
          </div>

          
        </div>

        <div className="pt-12 border-t border-zinc-100 dark:border-zinc-800 text-center items-center gap-4 text-xs font-medium text-zinc-400 tracking-widest">
          <div>
            &copy; {new Date().getFullYear()} Mosya Gold Indonesia. Elegant Investment.
          </div>
        </div>
      </div>
    </footer>
  );
}