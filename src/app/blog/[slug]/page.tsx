import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600; // Revalidate setiap jam

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!post) notFound();

  // Parse konten dari JSON string (Sistem Blocks)
  let contentBlocks = [];
  try {
    contentBlocks = JSON.parse(post.content);
  } catch (e) {
    // Fallback untuk data lama
    contentBlocks = [{ type: 'text', value: post.content }];
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-[#0A0B0D] transition-colors duration-700">
      <Navbar />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A961]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B9DC3]/5 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative z-10 pt-32 md:pt-48 pb-24 px-6">
        <article className="max-w-4xl mx-auto">
          
          {/* Back Button & Breadcrumb */}
          <div className="flex items-center justify-between mb-12">
            <Link 
              href="/blog" 
              className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#C9A961] hover:gap-4 transition-all"
            >
              <ArrowLeft size={16} /> Kembali ke Blog
            </Link>
            <button className="p-3 bg-white dark:bg-[#1A1D23] rounded-full border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-[#C9A961] transition-all shadow-sm">
              <Share2 size={18} />
            </button>
          </div>

          {/* Header Section */}
          <header className="mb-16">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A961]">
                <Calendar size={14} />
                {new Date(post.created_at).toLocaleDateString("id-ID", { 
                  day: 'numeric', month: 'long', year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                <User size={14} />
                {post.author || "Admin Mosya"}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1D23] dark:text-white leading-[1.1] tracking-tight mb-8">
              {post.title}
            </h1>
            
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#C9A961] to-[#D4AF37] rounded-full"></div>
          </header>

          {/* Content Sections */}
          <div className="space-y-12">
            {contentBlocks.map((block: any, i: number) => (
              <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {block.type === "text" ? (
                  <p className="text-xl md:text-2xl leading-[1.8] text-[#4A5568] dark:text-[#A0AEC0] font-light font-sans">
                    {block.value}
                  </p>
                ) : (
                  <div className="my-16 group">
                    <div className="relative aspect-video rounded-[40px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                      <Image 
                        src={block.value} 
                        alt="Visual Edukasi Mosya Gold"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-3">
                       <div className="h-px w-8 bg-[#C9A961]/30"></div>
                       <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 italic">
                         Exclusive Collection Insights
                       </p>
                       <div className="h-px w-8 bg-[#C9A961]/30"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Article */}
          <footer className="mt-24 pt-12 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-400 italic mb-8">
              Terima kasih telah membaca. Bagikan edukasi ini untuk mendukung investasi cerdas.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/katalog" className="px-8 py-4 bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] rounded-2xl font-bold text-sm hover:bg-[#C9A961] hover:text-white transition-all shadow-xl">
                Lihat Koleksi Emas
              </Link>
            </div>
          </footer>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}