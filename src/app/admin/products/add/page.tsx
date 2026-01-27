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
      className="max-w-6xl mx-auto pb-20 pt-10 md:pt-0 px-4 md:px-0" // Tambah padding top di mobile
    >
      {/* Navigation Header - Sekarang stack ke bawah di mobile */}
      <div className="mb-12 flex flex-col gap-6 text-left">
        <div>
          <Link 
            href="/admin/products" 
            className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#C9A961] mb-6 hover:gap-3 transition-all"
          >
            <ArrowLeft size={14} /> Kembali ke Management
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1D23] dark:text-white tracking-tight">
            Tambah <span className="italic text-[#C9A961]">Koleksi Baru</span>
          </h1>
          <p className="text-gray-500 text-sm mt-3 max-w-2xl leading-relaxed">
            Pastikan setiap detail produk, mulai dari penamaan hingga deskripsi karat, sudah sesuai dengan standar sertifikasi Mosya Gold untuk menjaga kepercayaan pelanggan.
          </p>
        </div>
      </div>

      {/* Grid Form - Gunakan items-stretch agar kolom kiri & kanan sama tingginya di desktop */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Kolom Kiri: Detail Produk */}
        <div className="lg:col-span-7">
          <div className="h-full bg-white dark:bg-[#1A1D23] p-8 md:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-800 space-y-10 flex flex-col">
            
            <div className="space-y-3">
              <label className="text-[10px] font-black tracking-[0.2em] text-[#C9A961] ml-1 flex items-center gap-2 uppercase">
                <CheckCircle2 size={12} /> Product Identity
              </label>
              <input 
                required
                className="w-full p-6 bg-gray-50 dark:bg-[#111318] border-none rounded-[24px] focus:ring-2 focus:ring-[#C9A961]/20 focus:bg-white dark:focus:bg-black outline-none transition-all text-base font-medium"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nama Koleksi..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black tracking-[0.2em] text-[#C9A961] ml-1 flex items-center gap-2 uppercase">
                  <CheckCircle2 size={12} /> Valuation (IDR)
                </label>
                <input 
                  required
                  type="number"
                  className="w-full p-6 bg-gray-50 dark:bg-[#111318] border-none rounded-[24px] focus:ring-2 focus:ring-[#C9A961]/20 focus:bg-white dark:focus:bg-black outline-none transition-all text-base font-medium"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black tracking-[0.2em] text-[#C9A961] ml-1 flex items-center gap-2 uppercase">
                  <CheckCircle2 size={12} /> Classification
                </label>
                <select 
                  className="w-full p-6 bg-gray-50 dark:bg-[#111318] border-none rounded-[24px] focus:ring-2 focus:ring-[#C9A961]/20 focus:bg-white dark:focus:bg-black outline-none transition-all appearance-none text-base font-medium cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Perhiasan">Perhiasan</option>
                  <option value="Emas Batangan">Emas Batangan</option>
                  <option value="Logam Mulia">Logam Mulia</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 flex-1 flex flex-col">
              <label className="text-[10px] font-black tracking-[0.2em] text-[#C9A961] ml-1 flex items-center gap-2 uppercase">
                <CheckCircle2 size={12} /> Craftsmanship Story
              </label>
              <textarea 
                className="flex-1 w-full p-6 bg-gray-50 dark:bg-[#111318] border-none rounded-[24px] focus:ring-2 focus:ring-[#C9A961]/20 focus:bg-white dark:focus:bg-black outline-none transition-all min-h-[250px] resize-none text-base font-medium leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Jelaskan karat, berat, dan detail desain..."
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Media & Action */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex-1 bg-white dark:bg-[#1A1D23] p-8 md:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-800 flex flex-col">
            <label className="text-[10px] font-black tracking-[0.2em] text-[#C9A961] mb-8 block ml-1 flex items-center gap-2 uppercase">
              <CheckCircle2 size={12} /> Visual Assets
            </label>
            
            <div className="flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {previewUrl ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative aspect-square rounded-[32px] overflow-hidden border border-gray-100 dark:border-gray-800 group mx-auto w-full max-w-[400px]"
                  >
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => {setFile(null); setPreviewUrl(null);}}
                        className="p-5 bg-white text-red-500 rounded-full shadow-2xl hover:scale-110 transition-transform"
                      >
                        <X size={28} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="relative group mx-auto w-full max-w-[400px]">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={handleFileChange}
                    />
                    <div className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[32px] flex flex-col items-center justify-center p-8 transition-all group-hover:border-[#C9A961] group-hover:bg-[#C9A961]/5">
                      <div className="w-24 h-24 bg-gray-50 dark:bg-[#111318] rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#C9A961] group-hover:scale-110 transition-all mb-6">
                        <Upload size={40} />
                      </div>
                      <p className="text-base font-bold text-gray-700 dark:text-gray-300">Unggah Produk</p>
                      <p className="text-xs text-gray-400 mt-2 text-center tracking-widest">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-10 p-5 bg-amber-50 dark:bg-amber-950/20 rounded-3xl border border-amber-100 dark:border-amber-900/30 flex gap-4">
              <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
                Sistem akan memproses gambar secara publik. Gunakan resolusi tinggi untuk Katalog yang lebih menawan.
              </p>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || !file}
            className="w-full h-20 bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] rounded-[32px] font-black text-sm uppercase tracking-[0.2em] flex justify-center items-center gap-4 shadow-2xl shadow-[#C9A961]/10 disabled:opacity-50 transition-all hover:bg-[#C9A961] hover:text-white"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                Add to Collection
                <Plus size={20} />
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}