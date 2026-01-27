"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Search, Trash2, Edit3, PackageOpen, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
    if (!confirm("Yakin ingin menghapus produk ini dari koleksi Mosya Gold?")) return;

    // 1. Hapus Foto dari Storage
    const fileName = imageUrl.split('/').pop();
    if (fileName) {
      await supabase.storage.from('products').remove([fileName]);
    }

    // 2. Hapus Data dari Tabel
    const { error } = await supabase.from("products").delete().eq("id", id);
    
    if (error) {
      alert("Gagal menghapus: " + error.message);
    } else {
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Koleksi Produk</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola perhiasan dan emas batangan Mosya Gold.</p>
        </div>
        <Link 
          href="/admin/products/add" 
          className="bg-[#D4AF37] text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#B8860B] transition-all shadow-lg shadow-gold/20"
        >
          <Plus size={20} /> Tambah Produk
        </Link>
      </div>

      {/* Filter & Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text"
          placeholder="Cari nama perhiasan..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none shadow-sm transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p>Memuat koleksi...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                  <th className="px-8 py-5">Produk</th>
                  <th className="px-6 py-5">Kategori</th>
                  <th className="px-6 py-5">Harga</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                          <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-semibold text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-medium text-gray-600">
                      Rp {product.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-[#D4AF37] transition-colors">
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id, product.image_url)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 flex flex-col items-center justify-center text-gray-400 text-center">
            <PackageOpen size={48} className="mb-4 opacity-20" />
            <p className="font-medium">Belum ada koleksi yang ditambahkan.</p>
            <p className="text-xs">Klik tombol tambah di atas untuk memulai.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}