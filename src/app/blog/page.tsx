import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/BlogGrid"; // Import komponen baru
import { Sparkles } from "lucide-react";

export const revalidate = 0; 

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-[#0A0B0D] transition-colors duration-700">
      <Navbar />
      
      {/* Background Decor yang lebih smooth */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-[#C9A961]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-[#8B9DC3]/5 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative z-10 pt-32 md:pt-44 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section dengan animasi masuk */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full mb-6">
              <Sparkles size={14} className="text-[#C9A961]" />
              <span className="text-[10px] font-black tracking-[0.2em] text-[#C9A961]  font-sans">Premium Insight</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-[#1A1D23] dark:text-white mb-8 tracking-tight leading-[1.1]">
              Jendela <span className="italic bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] bg-clip-text text-transparent">Edukasi</span> Emas
            </h1>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              Temukan strategi investasi, panduan perawatan, dan cerita di balik kemurnian setiap koleksi perhiasan eksklusif Mosya Gold.
            </p>
          </div>

          {/* Grid Area */}
          <BlogGrid initialPosts={posts || []} />
        </div>
      </main>

      <Footer />
    </div>
  );
}