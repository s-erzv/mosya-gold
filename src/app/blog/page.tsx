import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard"; // Pastikan path import benar
import { Sparkles, BookOpen } from "lucide-react";

export const revalidate = 0; 

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-[#0A0B0D] transition-colors duration-700">
      <Navbar />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A961]/5 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full mb-6">
              <Sparkles size={14} className="text-[#C9A961]" />
              <span className="text-[10px] font-black tracking-[0.2em] text-[#C9A961] uppercase">Insight & News</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-[#1A1D23] dark:text-white mb-6">
              Jendela <span className="italic bg-gradient-to-r from-[#C9A961] to-[#D4AF37] bg-clip-text text-transparent">Edukasi</span> Emas
            </h1>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Pelajari tren investasi emas terbaru, tips perawatan perhiasan, dan berita eksklusif dari Mosya Gold.
            </p>
          </div>

          {/* Grid Artikel - LOGIKANYA DI SINI */}
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} // Pastikan mengirim objek utuh
                  index={index} 
                />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white dark:bg-[#1A1D23] rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800">
              <BookOpen size={48} className="mx-auto mb-4 text-gray-200" />
              <p className="text-gray-500 font-serif italic text-xl">Belum ada cerita kemurnian yang dibagikan.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}