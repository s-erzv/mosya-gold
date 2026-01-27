"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Tag } from "lucide-react";

export default function BlogCard({ post, index }: { post: any; index: number }) {
  // Logika ekstraksi konten dari JSON Blocks
  let coverImage = "/placeholder-blog.jpg";
  let excerpt = "";

  try {
    const blocks = JSON.parse(post.content);
    // Cari gambar pertama untuk jadi thumbnail
    const firstImage = blocks.find((b: any) => b.type === "image");
    if (firstImage) coverImage = firstImage.value;

    // Cari teks pertama untuk ringkasan (hilangkan tag HTML dari Tiptap)
    const firstText = blocks.find((b: any) => b.type === "text");
    if (firstText) {
      excerpt = firstText.value.replace(/<[^>]*>?/gm, "").substring(0, 100) + "...";
    }
  } catch (e) {
    // Fallback jika data lama masih teks biasa
    excerpt = post.content?.substring(0, 100) + "...";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] mb-6 border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#C9A961]/20">
          <Image
            src={coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          
          {/* Badge Kategori */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 dark:bg-[#1A1D23]/90 backdrop-blur-md text-[10px] font-black  tracking-widest rounded-full text-[#C9A961] shadow-sm">
              {post.category || "Edukasi"}
            </span>
          </div>

          <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-white text-[#1A1D23] p-3 rounded-full shadow-xl">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        <div className="px-2">
          <div className="flex items-center gap-3 text-[10px] font-bold  tracking-widest text-gray-400 mb-3">
            <Calendar size={12} className="text-[#C9A961]" />
            {new Date(post.created_at).toLocaleDateString("id-ID", { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-[#1A1D23] dark:text-white group-hover:text-[#C9A961] transition-colors duration-300 leading-snug">
            {post.title}
          </h3>
          <p className="mt-3 text-[#4A5568] dark:text-[#A0AEC0] text-sm leading-relaxed font-light line-clamp-2 italic">
            {excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}