import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Share2, Tag, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 0;

interface ContentBlock {
  type: "text" | "image";
  value: string;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    console.error("Gagal ambil data:", error);
    return notFound();
  }

  let contentBlocks: ContentBlock[] = [];
  try {
    contentBlocks = JSON.parse(post.content);
  } catch (e) {
    contentBlocks = [{ type: 'text', value: post.content }];
  }

  const fullText = contentBlocks
    .filter((b: ContentBlock) => b.type === 'text')
    .map((b: ContentBlock) => b.value)
    .join(" ");
    
  const wordCount = fullText.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-[#0A0B0D] transition-colors duration-700">
      <Navbar />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[70] pointer-events-none">
        <div className="h-full bg-gradient-to-r from-[#C9A961] to-[#D4AF37] shadow-[0_0_10px_#C9A961]" style={{ width: '0%' }} id="progress-bar"></div>
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A961]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8B9DC3]/5 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative z-10 pt-32 md:pt-48 pb-24 px-6">
        <article className="max-w-4xl mx-auto">
          
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <Link 
              href="/blog" 
              className="group flex items-center gap-2 text-sm font-black  tracking-[0.2em] text-[#C9A961] hover:gap-4 transition-all"
            >
              <ArrowLeft size={18} /> Kembali ke Blog
            </Link>
            
            <div className="flex items-center gap-4">
               {post.category && (
                <div className="flex items-center gap-2 px-5 py-2 bg-[#C9A961]/10 rounded-full border border-[#C9A961]/20">
                  <Tag size={16} className="text-[#C9A961]" />
                  <span className="text-xs font-bold  tracking-widest text-[#C9A961]">
                    {post.category}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 px-5 py-2 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10">
                <Clock size={16} className="text-gray-400" />
                <span className="text-xs font-bold  tracking-widest text-gray-400">
                  {readingTime} Menit Baca
                </span>
              </div>
            </div>
          </div>

          <header className="mb-16">
            <div className="flex flex-wrap items-center gap-8 mb-8">
              <div className="flex items-center gap-3 text-sm md:text-base font-bold  tracking-[0.1em] text-[#C9A961]">
                <Calendar size={18} />
                {new Date(post.created_at).toLocaleDateString("id-ID", { 
                  day: 'numeric', month: 'long', year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-3 text-sm md:text-base font-bold  tracking-[0.1em] text-gray-500 dark:text-gray-400">
                <User size={18} />
                {post.author || "Admin Mosya"}
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1A1D23] dark:text-white leading-[1.1] tracking-tight mb-8">
              {post.title}
            </h1>
            
            <div className="w-32 h-2 bg-gradient-to-r from-[#C9A961] to-[#D4AF37] rounded-full"></div>
          </header>

          <div className="space-y-12">
            {contentBlocks.map((block: ContentBlock, i: number) => (
              <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {block.type === "text" ? (
                  <div 
                    className="prose prose-base md:prose-xl dark:prose-invert max-w-none leading-[1.8] text-[#4A5568] dark:text-[#A0AEC0] font-normal 
                    prose-headings:font-serif prose-headings:text-[#1A1D23] dark:prose-headings:text-white
                    prose-strong:text-[#C9A961] prose-strong:font-bold
                    prose-ul:list-disc prose-li:marker:text-[#C9A961]
                    prose-blockquote:border-l-[#C9A961] prose-blockquote:bg-[#C9A961]/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                    prose-img:rounded-[32px] prose-a:text-[#C9A961] prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: block.value }} 
                  />
                ) : (
                  <div className="my-16 group">
                    <div className="relative aspect-video rounded-[32px] md:rounded-[40px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl transition-all duration-700 group-hover:scale-[1.01]">
                      <Image 
                        src={block.value} 
                        alt="Visual Edukasi Mosya Gold"
                        fill
                        className="object-cover"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <footer className="mt-24">
            <div className="p-8 md:p-12 bg-white dark:bg-[#1A1D23] rounded-[40px] border border-gray-100 dark:border-gray-800 text-center shadow-xl shadow-[#C9A961]/5">
              <h3 className="text-3xl font-serif font-bold text-[#1A1D23] dark:text-white mb-4">
                Bagikan Edukasi Ini
              </h3>
              <p className="text-base text-gray-500 mb-8 max-w-sm mx-auto">
                Bantu teman atau keluarga Anda mendapatkan informasi investasi emas yang tepat.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="flex items-center justify-center gap-3 px-10 py-5 bg-[#C9A961] text-white rounded-2xl font-bold text-base hover:bg-[#B8860B] transition-all shadow-lg shadow-[#C9A961]/20">
                  <Share2 size={20} /> Salin Tautan
                </button>
                <Link href="/katalog" className="flex items-center justify-center gap-3 px-10 py-5 bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] rounded-2xl font-bold text-base hover:bg-[#C9A961] hover:text-white transition-all">
                  Lihat Koleksi Produk
                </Link>
              </div>
            </div>
          </footer>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}