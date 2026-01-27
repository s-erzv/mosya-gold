"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { 
  Plus, Type, Image as ImageIcon, Trash2, 
  Save, Loader2, ArrowLeft, AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<any[]>([]);

  // 1. Ambil data lama dari Supabase
  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("Artikel tidak ditemukan");
        router.push("/admin/blog");
        return;
      }

      setTitle(data.title);
      try {
        setBlocks(JSON.parse(data.content));
      } catch (e) {
        // Fallback jika datanya masih teks biasa (sebelum sistem block)
        setBlocks([{ type: "text", value: data.content }]);
      }
      setLoading(false);
    };

    if (id) fetchBlog();
  }, [id, router]);

  const addTextBlock = () => setBlocks([...blocks, { type: "text", value: "" }]);
  
  const addImageBlock = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSaving(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage.from('blogs').upload(fileName, file);
    if (uploadError) return alert("Gagal upload gambar");

    const { data: { publicUrl } } = supabase.storage.from('blogs').getPublicUrl(fileName);
    setBlocks([...blocks, { type: "image", value: publicUrl }]);
    setIsSaving(false);
  };

  const updateBlock = (index: number, value: string) => {
    const newBlocks = [...blocks];
    newBlocks[index].value = value;
    setBlocks(newBlocks);
  };

  const removeBlock = (index: number) => {
    if (confirm("Hapus blok ini?")) {
      setBlocks(blocks.filter((_, i) => i !== index));
    }
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    const { error } = await supabase
      .from("blogs")
      .update({
        title,
        slug,
        content: JSON.stringify(blocks),
      })
      .eq("id", id);

    if (error) {
      alert("Gagal update: " + error.message);
    } else {
      router.push("/admin/blog");
      router.refresh();
    }
    setIsSaving(false);
  };

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="animate-spin text-[#C9A961]" size={40} />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto pb-20"
    >
      <div className="flex items-center justify-between mb-10">
        <Link href="/admin/blog" className="flex items-center gap-2 text-gray-400 hover:text-[#C9A961] font-bold transition-all text-sm uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Archive
        </Link>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-950/20 rounded-full border border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest">
          <AlertCircle size={12} /> Editing Mode
        </div>
      </div>

      <div className="bg-white dark:bg-[#1A1D23] p-8 md:p-12 rounded-[40px] shadow-2xl shadow-black/5 border border-gray-100 dark:border-gray-800">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A961] mb-4 block">Main Headline</label>
        <input 
          placeholder="Judul Artikel..." 
          className="w-full text-4xl font-serif font-bold bg-transparent border-none outline-none mb-12 dark:text-white placeholder:text-gray-200"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {blocks.map((block, index) => (
              <motion.div 
                key={index}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative group"
              >
                {block.type === "text" ? (
                  <div className="relative">
                    <div className="absolute -left-6 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300">
                      <Type size={14} />
                    </div>
                    <textarea 
                      placeholder="Lanjutkan ceritamu..."
                      className="w-full p-6 bg-gray-50 dark:bg-[#111318] rounded-[24px] border-none outline-none min-h-[120px] text-lg leading-relaxed focus:ring-2 focus:ring-[#C9A961]/20 transition-all"
                      value={block.value}
                      onChange={(e) => updateBlock(index, e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300">
                      <ImageIcon size={14} />
                    </div>
                    <div className="relative aspect-video rounded-[32px] overflow-hidden border-2 border-[#C9A961]/10 group-hover:border-[#C9A961]/30 transition-all">
                      <img src={block.value} className="w-full h-full object-cover" alt="Blog content" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => removeBlock(index)}
                  className="absolute -right-3 -top-3 p-2 bg-white dark:bg-[#1A1D23] text-red-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 border border-gray-100 dark:border-gray-800"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Toolset */}
        <div className="mt-16 grid grid-cols-2 gap-4">
          <button 
            onClick={addTextBlock} 
            className="flex items-center justify-center gap-3 p-5 bg-gray-50 dark:bg-[#111318] rounded-2xl font-bold text-xs uppercase tracking-widest text-gray-500 hover:text-[#C9A961] hover:bg-[#C9A961]/5 transition-all border border-transparent hover:border-[#C9A961]/20"
          >
            <Type size={18} /> Add Text
          </button>
          
          <label className="flex items-center justify-center gap-3 p-5 bg-gray-50 dark:bg-[#111318] rounded-2xl font-bold text-xs uppercase tracking-widest text-gray-500 hover:text-[#C9A961] hover:bg-[#C9A961]/5 transition-all border border-transparent hover:border-[#C9A961]/20 cursor-pointer">
            <ImageIcon size={18} /> Add Photo
            <input type="file" className="hidden" onChange={addImageBlock} accept="image/*" />
          </label>
        </div>

        <div className="mt-12 pt-10 border-t border-gray-50 dark:border-gray-800">
          <button 
            onClick={handleUpdate}
            disabled={isSaving || !title}
            className="w-full py-5 bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] rounded-[24px] font-black uppercase tracking-[0.3em] text-xs hover:bg-[#C9A961] hover:text-white transition-all shadow-xl shadow-black/10 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Save Masterpiece</>}
          </button>
        </div>
      </div>
    </motion.div>
  );
}