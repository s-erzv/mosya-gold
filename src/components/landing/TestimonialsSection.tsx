"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export const TestimonialsSection: React.FC = () => {
  return (
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
  );
};
