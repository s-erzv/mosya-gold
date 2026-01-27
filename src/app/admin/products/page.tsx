"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Search, Trash2, Edit3, PackageOpen, Loader2, X, Save, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State untuk Edit Modal
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Yakin ingin menghapus produk ini? Tindakan ini tidak bisa dibatalkan.")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    
    if (error) {
      alert("Gagal menghapus: " + error.message);
    } else {
      // Hapus gambar jika ada
      if (imageUrl) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) await supabase.storage.from('products').remove([fileName]);
      }
      fetchProducts();
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const { error } = await supabase
      .from("products")
      .update({
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        description: editingProduct.description
      })
      .eq("id", editingProduct.id);

    if (error) {
      alert("Gagal update: " + error.message);
    } else {
      setIsEditModalOpen(false);
      fetchProducts();
    }
    setIsSaving(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1D23] dark:text-white tracking-tight">Management Produk</h1>
          <p className="text-gray-500 text-sm mt-1">Total {products.length} koleksi terdaftar di Mosya Gold.</p>
        </div>
        <Link 
          href="/admin/products/add" 
          className="bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#C9A961] dark:hover:bg-[#C9A961] hover:text-white transition-all shadow-xl shadow-black/5 active:scale-95"
        >
          <Plus size={20} /> Tambah Produk Baru
        </Link>
      </div>

      {/* Filter & Search */}
      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C9A961] transition-colors" size={20} />
        <input 
          type="text"
          placeholder="Cari nama atau kategori perhiasan..."
          className="w-full pl-14 pr-6 py-5 bg-white dark:bg-[#1A1D23] border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-2 focus:ring-[#C9A961]/20 focus:border-[#C9A961] outline-none shadow-sm transition-all text-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Card Grid */}
      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center text-gray-400">
          <Loader2 className="animate-spin mb-4 text-[#C9A961]" size={40} />
          <p className="font-medium animate-pulse">Menghubungkan ke Brankas...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-[#1A1D23] rounded-[32px] border border-gray-100 dark:border-gray-800 overflow-hidden group hover:shadow-2xl hover:shadow-[#C9A961]/10 transition-all duration-500"
              >
                {/* Image Preview */}
                <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
                  <img src={product.image_url} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full text-[#1A1D23] shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate mb-1">{product.name}</h3>
                  <p className="text-[#C9A961] font-black text-xl mb-4">
                    Rp {product.price?.toLocaleString('id-ID')}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-50 dark:border-gray-800">
                    <button 
                      onClick={() => { setEditingProduct(product); setIsEditModalOpen(true); }}
                      className="flex items-center justify-center gap-2 py-3 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-[#C9A961]/10 hover:text-[#C9A961] transition-all font-bold text-xs"
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id, product.image_url)}
                      className="flex items-center justify-center gap-2 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold text-xs"
                    >
                      <Trash2 size={14} /> Hapus
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-gray-400 text-center bg-white dark:bg-[#1A1D23] rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800">
          <PackageOpen size={64} className="mb-4 opacity-10" />
          <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white">Brankas Kosong</h3>
          <p className="text-sm max-w-xs mx-auto mt-2">Tidak ada produk yang sesuai dengan pencarian Anda.</p>
        </div>
      )}

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsEditModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#111318] rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif font-bold">Edit Detail Produk</h2>
                  <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Produk</label>
                    <input 
                      type="text" 
                      required
                      value={editingProduct?.name || ""}
                      onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                      className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1D23] border-none focus:ring-2 focus:ring-[#C9A961] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Harga (Rp)</label>
                      <input 
                        type="number" 
                        required
                        value={editingProduct?.price || ""}
                        onChange={(e) => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})}
                        className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1D23] border-none focus:ring-2 focus:ring-[#C9A961] outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Kategori</label>
                      <select 
                        value={editingProduct?.category || ""}
                        onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1D23] border-none focus:ring-2 focus:ring-[#C9A961] outline-none"
                      >
                        <option value="Emas Batang">Emas Batang</option>
                        <option value="Perhiasan">Perhiasan</option>
                        <option value="Logam Mulia">Logam Mulia</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      disabled={isSaving}
                      className="w-full py-4 bg-[#C9A961] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#B8860B] transition-all disabled:opacity-50"
                    >
                      {isSaving ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Simpan Perubahan</>}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}