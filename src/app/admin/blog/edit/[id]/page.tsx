"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { 
  Plus, ImageIcon, Trash2, Save, Loader2, ArrowLeft, 
  AlertCircle, Bold, Italic, Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, Code, Strikethrough,
  Undo, Redo, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, Type
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import TiptapLink from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

const TiptapToolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt('Masukkan URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-1 p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/50 rounded-t-2xl sticky top-0 z-10 backdrop-blur-sm">
      <div className="flex gap-1 pr-2 border-r border-gray-300 dark:border-gray-700">
        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-30 transition-all"><Undo size={16} /></button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-30 transition-all"><Redo size={16} /></button>
      </div>

      <div className="flex gap-1 pr-2 border-r border-gray-300 dark:border-gray-700">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}><Bold size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}><Italic size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded-lg transition-all ${editor.isActive('underline') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}><span className="font-bold underline">U</span></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded-lg transition-all ${editor.isActive('strike') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}><Strikethrough size={16} /></button>
      </div>

      <div className="flex gap-1 pr-2 border-r border-gray-300 dark:border-gray-700">
        {[1, 2, 3].map((level) => (
          <button key={level} onClick={() => editor.chain().focus().toggleHeading({ level: level as any }).run()} className={`p-2 px-3 rounded-lg transition-all font-bold text-sm ${editor.isActive('heading', { level }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}>H{level}</button>
        ))}
      </div>

      <div className="flex gap-1 pr-2 border-r border-gray-300 dark:border-gray-700">
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}><List size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded-lg transition-all ${editor.isActive('orderedList') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}><ListOrdered size={16} /></button>
      </div>

      <div className="flex gap-1 pr-2 border-r border-gray-300 dark:border-gray-700">
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'left' }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}><AlignLeft size={16} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'center' }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}><AlignCenter size={16} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'right' }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}><AlignRight size={16} /></button>
      </div>

      <div className="flex gap-1">
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded-lg transition-all ${editor.isActive('blockquote') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}><Quote size={16} /></button>
        <button onClick={setLink} className={`p-2 rounded-lg transition-all ${editor.isActive('link') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}><LinkIcon size={16} /></button>
      </div>
    </div>
  );
};

const TextBlock = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      TiptapLink.configure({ openOnClick: false, HTMLAttributes: { class: 'text-[#C9A961] underline cursor-pointer' } }),
      Placeholder.configure({ placeholder: 'Lanjutkan menulis masterpiece Anda...' }),
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none p-6 focus:outline-none min-h-[150px] leading-relaxed',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#1A1D23] overflow-hidden shadow-sm">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Edukasi");
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single();
      if (error) {
        alert("Artikel tidak ditemukan");
        router.push("/admin/blog");
        return;
      }
      setTitle(data.title);
      setCategory(data.category || "Edukasi");
      try {
        setBlocks(JSON.parse(data.content));
      } catch (e) {
        setBlocks([{ id: Date.now(), type: "text", value: data.content }]);
      }
      setLoading(false);
    };
    if (id) fetchBlog();
  }, [id, router]);

  const addTextBlock = () => setBlocks([...blocks, { id: Date.now(), type: "text", value: "" }]);
  
  const addImageBlock = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsSaving(true);
    const fileName = `${Date.now()}.${file.name.split('.').pop()}`;
    const { error: uploadError } = await supabase.storage.from('blogs').upload(fileName, file);
    if (uploadError) {
      alert("Gagal upload gambar");
      setIsSaving(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from('blogs').getPublicUrl(fileName);
    setBlocks([...blocks, { id: Date.now(), type: "image", value: publicUrl }]);
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
    if(!title || blocks.length === 0) return alert("Data belum lengkap!");
    setIsSaving(true);
    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const { error } = await supabase.from("blogs").update({
      title, slug, category, content: JSON.stringify(blocks),
    }).eq("id", id);

    if (!error) {
      router.push("/admin/blog");
      router.refresh();
    } else {
      alert("Error: " + error.message);
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="animate-spin text-[#C9A961]" size={40} />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin/blog" className="flex items-center gap-2 text-gray-400 hover:text-[#C9A961] font-bold transition-all text-xs  tracking-[0.2em]">
          <ArrowLeft size={16} /> Back to Archive
        </Link>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-950/20 rounded-full border border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-black  tracking-widest">
          <AlertCircle size={12} /> Editing Mode
        </div>
      </div>

      <div className="bg-white dark:bg-[#1A1D23] p-6 md:p-12 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-800">
        <input 
          placeholder="Judul Artikel..." 
          className="w-full text-3xl md:text-5xl font-serif font-bold bg-transparent border-none outline-none mb-6 dark:text-white placeholder:text-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {["Edukasi", "Tips", "Berita", "Investasi"].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${category === cat ? 'bg-[#C9A961] text-white shadow-lg' : 'bg-gray-100 dark:bg-black text-gray-500'}`}>{cat}</button>
          ))}
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {blocks.map((block, index) => (
              <motion.div key={block.id || index} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative group">
                {block.type === "text" ? (
                  <TextBlock value={block.value} onChange={(val) => updateBlock(index, val)} />
                ) : (
                  <div className="relative aspect-video rounded-[32px] overflow-hidden border-2 border-[#C9A961]/10 group-hover:border-[#C9A961]/30 transition-all shadow-md">
                    <img src={block.value} className="w-full h-full object-cover" alt="Blog content" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                <button onClick={() => removeBlock(index)} className="absolute -right-3 -top-3 p-2.5 bg-white dark:bg-[#1A1D23] text-red-500 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all border border-gray-100 dark:border-gray-800 z-10"><Trash2 size={14} /></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={addTextBlock} className="flex items-center justify-center gap-3 p-5 bg-gray-50 dark:bg-black rounded-2xl font-bold text-sm text-gray-500 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-[#C9A961] hover:text-[#C9A961] transition-all"><Plus size={18} /> Add Text Block</button>
          <label className="flex items-center justify-center gap-3 p-5 bg-gray-50 dark:bg-black rounded-2xl font-bold text-sm text-gray-500 border-2 border-dashed border-gray-300 dark:border-gray-700 cursor-pointer hover:border-[#C9A961] hover:text-[#C9A961] transition-all"><ImageIcon size={18} /> Add Photo Block<input type="file" className="hidden" onChange={addImageBlock} accept="image/*" /></label>
        </div>

        <div className="mt-12 pt-10 border-t border-gray-50 dark:border-gray-800">
          <button onClick={handleUpdate} disabled={isSaving || !title} className="w-full py-6 bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] rounded-[24px] font-black  tracking-[0.2em] text-xs hover:bg-[#C9A961] hover:text-white transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3">
            {isSaving ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Update Masterpiece</>}
          </button>
        </div>
      </div>
    </div>
  );
}