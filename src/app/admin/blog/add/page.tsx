"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Plus, ImageIcon, Trash2, Loader2, ArrowLeft, 
  Bold, Italic, Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, Code, Strikethrough,
  Undo, Redo, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
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
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-30 transition-all"
          title="Undo"
        >
          <Undo size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-30 transition-all"
          title="Redo"
        >
          <Redo size={16} />
        </button>
      </div>

      <div className="flex gap-1 pr-2 border-r border-gray-300 dark:border-gray-700">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('underline') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Underline"
        >
          <span className="font-bold underline">U</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('strike') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('highlight') ? 'bg-yellow-400 text-black' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Highlight"
        >
          <span className="font-bold bg-yellow-300 px-1">H</span>
        </button>
      </div>

      <div className="flex gap-1 pr-2 border-r border-gray-300 dark:border-gray-700">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 px-3 rounded-lg transition-all font-bold text-sm ${editor.isActive('heading', { level: 1 }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 px-3 rounded-lg transition-all font-bold text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 px-3 rounded-lg transition-all font-bold text-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Heading 3"
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`p-2 px-3 rounded-lg transition-all font-bold text-sm ${editor.isActive('heading', { level: 4 }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Heading 4"
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`p-2 px-3 rounded-lg transition-all font-bold text-sm ${editor.isActive('heading', { level: 5 }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Heading 5"
        >
          H5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`p-2 px-3 rounded-lg transition-all font-bold text-sm ${editor.isActive('heading', { level: 6 }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Heading 6"
        >
          H6
        </button>
      </div>

      <div className="flex gap-1 pr-2 border-r border-gray-300 dark:border-gray-700">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('orderedList') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
      </div>

      <div className="flex gap-1 pr-2 border-r border-gray-300 dark:border-gray-700">
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'left' }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'center' }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'right' }) ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('blockquote') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Quote"
        >
          <Quote size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('codeBlock') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Code Block"
        >
          <Code size={16} />
        </button>
        <button
          onClick={setLink}
          className={`p-2 rounded-lg transition-all ${editor.isActive('link') ? 'bg-[#C9A961] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          title="Add Link"
        >
          <LinkIcon size={16} />
        </button>
      </div>
    </div>
  );
};

const TextBlock = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      TiptapLink.configure({ 
        openOnClick: false, 
        HTMLAttributes: { class: 'text-[#C9A961] underline cursor-pointer' } 
      }),
      Placeholder.configure({ 
        placeholder: 'Mulai menulis konten blog yang menarik...', 
      }),
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none p-6 focus:outline-none min-h-[200px] leading-relaxed',
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
      <div className="bg-white dark:bg-transparent">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default function AddBlogPage() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Edukasi");
  const [blocks, setBlocks] = useState<any[]>([]);
  const router = useRouter();

  const addTextBlock = () => setBlocks([...blocks, { id: Date.now(), type: "text", value: "" }]);
  
  const addImageBlock = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage.from('blogs').upload(fileName, file);
    if (uploadError) {
      toast("Gagal upload gambar");
      setLoading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('blogs').getPublicUrl(fileName);
    setBlocks([...blocks, { id: Date.now(), type: "image", value: publicUrl }]);
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
    if(!title || blocks.length === 0) return toast("Isi judul dan konten dulu ya!");
    setLoading(true);
    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    const { error } = await supabase.from("blogs").insert([{
      title,
      slug,
      category,
      content: JSON.stringify(blocks),
      created_at: new Date()
    }]);

    if (!error) router.push("/admin/blog");
    else toast("Error: " + error.message);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4">
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-[#C9A961] font-bold mb-8 hover:opacity-70 transition-all">
        <ArrowLeft size={18} /> Kembali ke Management
      </Link>

      <div className="bg-white dark:bg-[#1A1D23] p-6 md:p-12 rounded-[40px] shadow-2xl shadow-black/5 border border-gray-100 dark:border-gray-800">
        <input 
          placeholder="Judul Artikel Yang Menarik..." 
          className="w-full text-3xl md:text-5xl font-serif font-bold bg-transparent border-none outline-none mb-6 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {["Edukasi", "Tips", "Berita", "Investasi"].map(cat => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${category === cat ? 'bg-[#C9A961] text-white shadow-lg' : 'bg-gray-100 dark:bg-black text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-900'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <AnimatePresence>
            {blocks.map((block, index) => (
              <motion.div 
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group"
              >
                {block.type === "text" ? (
                  <TextBlock value={block.value} onChange={(val) => updateBlock(index, val)} />
                ) : (
                  <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 group-hover:border-[#C9A961] transition-all shadow-md">
                    <img src={block.value} className="w-full h-full object-cover" alt="Blog content" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                <button 
                  onClick={() => removeBlock(index)}
                  className="absolute -right-3 -top-3 p-2.5 bg-red-500 text-white rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:scale-110 z-20"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={addTextBlock} 
            className="flex items-center justify-center gap-2 p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 rounded-2xl font-bold text-sm text-gray-600 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-[#C9A961] hover:text-[#C9A961] hover:shadow-lg transition-all"
          >
            <Plus size={20} /> Tambah Paragraf Baru
          </button>
          
          <label className="flex items-center justify-center gap-2 p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 rounded-2xl font-bold text-sm text-gray-600 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-700 cursor-pointer hover:border-[#C9A961] hover:text-[#C9A961] hover:shadow-lg transition-all">
            <ImageIcon size={20} /> Tambah Gambar
            <input type="file" className="hidden" onChange={addImageBlock} accept="image/*" />
          </label>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={loading || !title || blocks.length === 0}
          className="w-full mt-12 py-6 bg-gradient-to-r from-[#1A1D23] to-[#2A2D33] dark:from-white dark:to-gray-100 text-white dark:text-[#1A1D23] rounded-3xl font-black text-lg  tracking-[0.2em] shadow-2xl hover:shadow-[#C9A961]/20 hover:from-[#C9A961] hover:to-[#B89851] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="animate-spin" size={20} />
              <span>Publishing...</span>
            </div>
          ) : (
            "Publish to Blog"
          )}
        </button>
      </div>
    </div>
  );
}