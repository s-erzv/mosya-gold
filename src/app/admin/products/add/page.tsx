"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Upload, X, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Perhiasan",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await handleUpload();

      const { error } = await supabase.from("products").insert([
        {
          name: formData.name,
          price: parseInt(formData.price),
          category: formData.category,
          description: formData.description,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;
      
      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto pb-20"
    >
      {/* Navigation Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link 
            href="/admin/products" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#C9A961] mb-4 hover:gap-3 transition-all"
          >
            <ArrowLeft size={14} /> Kembali ke Management
          </Link>
          <h1 className="text-4xl font-serif font-bold text-[#1A1D23] dark:text-white tracking-tight flex items-center gap-4">
            Tambah <span className="italic text-[#C9A961]">Koleksi Baru</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 max-w-md">
            Pastikan detail produk yang dimasukkan sudah sesuai dengan sertifikasi keaslian Mosya Gold.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Kolom Kiri: Input Detail (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-[#1A1D23] p-8 md:p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-800 space-y-8">
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A961] ml-1 flex items-center gap-2">
                <CheckCircle2 size={12} /> Product Identity
              </label>
              <input 
                required
                className="w-full p-5 bg-gray-50 dark:bg-[#111318] border-none rounded-2xl focus:ring-2 focus:ring-[#C9A961]/20 focus:bg-white dark:focus:bg-black outline-none transition-all text-sm font-medium"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Contoh: Kalung Emas 18K Rose Gold"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A961] ml-1 flex items-center gap-2">
                  <CheckCircle2 size={12} /> Valuation (IDR)
                </label>
                <input 
                  required
                  type="number"
                  className="w-full p-5 bg-gray-50 dark:bg-[#111318] border-none rounded-2xl focus:ring-2 focus:ring-[#C9A961]/20 focus:bg-white dark:focus:bg-black outline-none transition-all text-sm font-medium"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A961] ml-1 flex items-center gap-2">
                  <CheckCircle2 size={12} /> Classification
                </label>
                <select 
                  className="w-full p-5 bg-gray-50 dark:bg-[#111318] border-none rounded-2xl focus:ring-2 focus:ring-[#C9A961]/20 focus:bg-white dark:focus:bg-black outline-none transition-all appearance-none text-sm font-medium"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Perhiasan">Perhiasan</option>
                  <option value="Emas Batangan">Emas Batangan</option>
                  <option value="Logam Mulia">Logam Mulia</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A961] ml-1 flex items-center gap-2">
                <CheckCircle2 size={12} /> Craftsmanship Story
              </label>
              <textarea 
                className="w-full p-5 bg-gray-50 dark:bg-[#111318] border-none rounded-2xl focus:ring-2 focus:ring-[#C9A961]/20 focus:bg-white dark:focus:bg-black outline-none transition-all h-48 resize-none text-sm font-medium leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Jelaskan detail karat, berat gram, dan filosofi desain produk ini..."
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Media & Action (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#1A1D23] p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-800">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A961] mb-6 block ml-1 flex items-center gap-2">
              <CheckCircle2 size={12} /> Visual Assets
            </label>
            
            <AnimatePresence mode="wait">
              {previewUrl ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative aspect-square rounded-[32px] overflow-hidden border border-gray-100 dark:border-gray-800 group"
                >
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => {setFile(null); setPreviewUrl(null);}}
                      className="p-4 bg-white text-red-500 rounded-full shadow-2xl hover:scale-110 transition-transform"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                  />
                  <div className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[32px] flex flex-col items-center justify-center p-8 transition-all group-hover:border-[#C9A961] group-hover:bg-[#C9A961]/5">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-[#111318] rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#C9A961] group-hover:scale-110 transition-all mb-4">
                      <Upload size={32} />
                    </div>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Unggah Masterpiece</p>
                    <p className="text-[10px] text-gray-400 mt-2 text-center uppercase tracking-widest">JPG, PNG up to 5MB</p>
                  </div>
                </div>
              )}
            </AnimatePresence>

            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex gap-3">
              <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
                Gambar akan otomatis di-hosting secara publik. Gunakan foto dengan pencahayaan studio untuk hasil terbaik di Katalog.
              </p>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || !file}
            className="w-full h-16 bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] rounded-2xl font-bold flex justify-center items-center gap-3 shadow-2xl shadow-black/10 disabled:opacity-50 transition-all hover:bg-[#C9A961] hover:text-white"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                Publish to Collection
                <Plus size={18} />
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}