"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, User } from "lucide-react";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    content: string; // JSON string dari sistem blocks
    author?: string;
    created_at: string;
  };
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  // Logika untuk mengambil gambar pertama dari content blocks sebagai cover
  let coverImage = "/placeholder-blog.jpg";
  let excerpt = "Klik untuk membaca selengkapnya tentang edukasi emas Mosya Gold.";

  try {
    const blocks = JSON.parse(post.content);
    // Cari blok gambar pertama
    const firstImageBlock = blocks.find((b: any) => b.type === "image");
    if (firstImageBlock) coverImage = firstImageBlock.value;

    // Cari blok teks pertama untuk kutipan
    const firstTextBlock = blocks.find((b: any) => b.type === "text");
    if (firstTextBlock) excerpt = firstTextBlock.value.substring(0, 120) + "...";
  } catch (e) {
    // Fallback jika bukan JSON (data lama)
    if (typeof post.content === "string") excerpt = post.content.substring(0, 120) + "...";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group cursor-pointer"
    >
      <Link href={`/blog/${post.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] mb-6 border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#C9A961]/20">
          <Image
            src={coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <span className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              Baca Artikel <ArrowUpRight size={14} />
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3 px-2">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A961]">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(post.created_at).toLocaleDateString("id-ID", { month: 'short', day: 'numeric' })}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1.5">
              <User size={12} />
              {post.author || "Admin"}
            </span>
          </div>

          <h3 className="text-2xl font-serif font-bold text-[#1A1D23] dark:text-white leading-tight group-hover:text-[#C9A961] transition-colors duration-300">
            {post.title}
          </h3>
          
          <p className="text-[#4A5568] dark:text-[#A0AEC0] text-sm font-light leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}