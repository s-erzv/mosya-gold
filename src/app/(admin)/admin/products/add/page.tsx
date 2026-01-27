"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Plus, Upload, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Perhiasan",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);

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
      alert("Produk Mosya Gold berhasil ditambah!");
      
      setFormData({ name: "", price: "", category: "Perhiasan", description: "" });
      setFile(null);
      setPreviewUrl(null);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      <header className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-[#FDF8E7] rounded-lg text-[#D4AF37]">
            <Plus size={24} />
          </div>
          Tambah Koleksi Baru
        </h1>
        <p className="text-gray-500 mt-2">Masukkan detail perhiasan atau emas batangan terbaru Mosya Gold.</p>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Detail Produk */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 text-sm font-medium mb-1">Nama Produk</label>
              <input 
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Contoh: Kalung Emas 18K"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 text-sm font-medium mb-1">Harga (Rp)</label>
                <input 
                  required
                  type="number"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 text-sm font-medium mb-1">Kategori</label>
                <select 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Perhiasan">Perhiasan</option>
                  <option value="Emas Batangan">Emas Batangan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 text-sm font-medium mb-1">Deskripsi Produk</label>
              <textarea 
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all h-40 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Ceritakan tentang kemurnian, berat, dan keunikan produk ini..."
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Media/Upload */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Media Produk</label>
            
            <AnimatePresence mode="wait">
              {previewUrl ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100"
                >
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => {setFile(null); setPreviewUrl(null);}}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full text-red-500 shadow-sm hover:bg-white"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ) : (
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                  />
                  <div className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 transition-all group-hover:border-[#D4AF37] group-hover:bg-[#FDF8E7]/30">
                    <div className="p-4 bg-gray-50 rounded-full text-gray-400 group-hover:text-[#D4AF37] group-hover:bg-white transition-all mb-4">
                      <Upload size={32} />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Pilih Foto Produk</p>
                    <p className="text-xs text-gray-400 mt-2 text-center">Rekomendasi ratio 1:1 atau 4:5</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          <button 
            disabled={loading || !file}
            className="w-full bg-[#D4AF37] text-white py-4 rounded-2xl font-bold hover:bg-[#B8860B] transition-all flex justify-center items-center gap-3 shadow-lg shadow-gold/20 disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Simpan ke Koleksi</>}
          </button>
        </div>
      </form>
    </motion.div>
  );
}