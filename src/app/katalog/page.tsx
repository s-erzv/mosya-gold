import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Sparkles } from "lucide-material"; // atau lucide-react

export const revalidate = 0; // Set ke 0 agar selalu ambil data terbaru dari DB

export default async function KatalogPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-[#0A0B0D] transition-colors duration-700">
      <Navbar />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#C9A961]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#8B9DC3]/5 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative z-10 pt-28 md:pt-40 pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full mb-6">
              <span className="text-[10px] font-black tracking-[0.2em] text-[#C9A961] uppercase">Premium Inventory</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-[#1A1D23] dark:text-white mb-6 tracking-tight">
              Eksplorasi <span className="italic bg-gradient-to-r from-[#C9A961] to-[#D4AF37] bg-clip-text text-transparent underline decoration-[#C9A961]/20 underline-offset-8">Kemurnian</span>
            </h1>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed">
              Koleksi pilihan emas batang dan perhiasan eksklusif Mosya Gold, dikurasi khusus untuk investasi dan gaya hidup Anda.
            </p>
          </div>

          {/* Kirim data produk ke grid */}
          <ProductGrid initialProducts={products || []} />
        </div>
      </main>

      <Footer />
    </div>
  );
}