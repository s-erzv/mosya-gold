"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  BookOpen, 
  Loader2, 
  ExternalLink, 
  Calendar,
  User
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error) setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus artikel ini? Tindakan ini permanen.")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);
    
    if (error) {
      alert("Gagal menghapus: " + error.message);
    } else {
      fetchPosts();
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1D23] dark:text-white tracking-tight">Edukasi & Artikel</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola konten naratif dan berita Mosya Gold.</p>
        </div>
        <Link 
          href="/admin/blog/add" 
          className="bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#C9A961] dark:hover:bg-[#C9A961] hover:text-white transition-all shadow-xl active:scale-95"
        >
          <Plus size={20} /> Tulis Artikel Baru
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C9A961] transition-colors" size={20} />
        <input 
          type="text"
          placeholder="Cari judul artikel..."
          className="w-full pl-14 pr-6 py-5 bg-white dark:bg-[#1A1D23] border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-2 focus:ring-[#C9A961]/20 focus:border-[#C9A961] outline-none shadow-sm transition-all text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center text-gray-400">
          <Loader2 className="animate-spin mb-4 text-[#C9A961]" size={40} />
          <p className="font-medium animate-pulse tracking-widest uppercase text-[10px]">Menyusun Arsip...</p>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => {
              // Ambil gambar pertama dari blocks jika ada
              let previewImage = "/placeholder-blog.jpg";
              try {
                const blocks = JSON.parse(post.content);
                const firstImage = blocks.find((b: any) => b.type === 'image');
                if (firstImage) previewImage = firstImage.value;
              } catch (e) {}

              return (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-[#111318] rounded-[32px] border border-gray-100 dark:border-gray-800 overflow-hidden group hover:shadow-2xl hover:shadow-[#C9A961]/10 transition-all duration-500 flex flex-col"
                >
                  {/* Preview Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <img 
                      src={previewImage} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                       <Link href={`/blog/${post.slug}`} target="_blank" className="text-white text-xs font-bold flex items-center gap-2">
                         Lihat Live <ExternalLink size={14} />
                       </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#C9A961]">
                        <Calendar size={12} />
                        {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </div>
                      <span className="text-gray-300 dark:text-gray-700">•</span>
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <User size={12} />
                        {post.author || "Admin"}
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#1A1D23] dark:text-white mb-4 line-clamp-2 group-hover:text-[#C9A961] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                      <div className="flex gap-1">
                        <Link href={`/admin/blog/edit/${post.id}`}>
                        <button className="p-2.5 text-gray-400 hover:text-[#C9A961] hover:bg-[#C9A961]/5 rounded-xl transition-all">
                            <Edit3 size={18} />
                        </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                        ID: {post.id.substring(0, 5)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-gray-400 text-center bg-white dark:bg-[#1A1D23] rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800">
          <BookOpen size={64} className="mb-4 opacity-10" />
          <h3 className="text-xl font-serif font-bold text-[#1A1D23] dark:text-white">Arsip Masih Kosong</h3>
          <p className="text-sm max-w-xs mx-auto mt-2 italic">Mulailah menulis narasi kemurnian emas hari ini.</p>
        </div>
      )}
    </div>
  );
}