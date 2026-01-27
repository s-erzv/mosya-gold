"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Plus, Type, Image as ImageIcon, Trash2, Save, Loader2, ArrowLeft } from "lucide-react";
import { motion, Reorder } from "framer-motion";
import Link from "next/link";

export default function AddBlogPage() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<any[]>([]); // Array of { type: 'text' | 'image', value: string }
  const router = useRouter();

  const addTextBlock = () => setBlocks([...blocks, { type: "text", value: "" }]);
  
  const addImageBlock = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage.from('blogs').upload(fileName, file);
    if (uploadError) return alert("Gagal upload gambar");

    const { data: { publicUrl } } = supabase.storage.from('blogs').getPublicUrl(fileName);
    setBlocks([...blocks, { type: "image", value: publicUrl }]);
    setLoading(false);
  };

  const updateBlock = (index: number, value: string) => {
    const newBlocks = [...blocks];
    newBlocks[index].value = value;
    setBlocks(newBlocks);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    // Kita simpan blocks sebagai JSON di kolom content
    const { error } = await supabase.from("blogs").insert([{
      title,
      slug,
      content: JSON.stringify(blocks), // Simpan sebagai string JSON
      created_at: new Date()
    }]);

    if (!error) router.push("/admin/blog");
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link href="/admin/blog" className="flex items-center gap-2 text-[#C9A961] font-bold mb-8">
        <ArrowLeft size={18} /> Kembali
      </Link>

      <div className="bg-white dark:bg-[#1A1D23] p-10 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800">
        <input 
          placeholder="Judul Artikel..." 
          className="w-full text-4xl font-serif font-bold bg-transparent border-none outline-none mb-10 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="space-y-6">
          {blocks.map((block, index) => (
            <div key={index} className="relative group">
              {block.type === "text" ? (
                <textarea 
                  placeholder="Tulis paragraf di sini..."
                  className="w-full p-4 bg-gray-50 dark:bg-black rounded-2xl border-none outline-none min-h-[100px] text-lg leading-relaxed"
                  value={block.value}
                  onChange={(e) => updateBlock(index, e.target.value)}
                />
              ) : (
                <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-[#C9A961]/20">
                  <img src={block.value} className="w-full h-full object-cover" />
                </div>
              )}
              <button 
                onClick={() => removeBlock(index)}
                className="absolute -right-4 top-0 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Floating Controls */}
        <div className="mt-12 flex items-center justify-center gap-4 p-4 bg-gray-50 dark:bg-black rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
          <button onClick={addTextBlock} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1A1D23] rounded-xl font-bold text-sm shadow-sm hover:text-[#C9A961] transition-all">
            <Type size={18} /> Tambah Teks
          </button>
          
          <label className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1A1D23] rounded-xl font-bold text-sm shadow-sm cursor-pointer hover:text-[#C9A961] transition-all">
            <ImageIcon size={18} /> Tambah Foto
            <input type="file" className="hidden" onChange={addImageBlock} accept="image/*" />
          </label>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={loading || !title}
          className="w-full mt-10 py-5 bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] rounded-[24px] font-black uppercase tracking-widest hover:bg-[#C9A961] transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Publish Article"}
        </button>
      </div>
    </div>
  );
}