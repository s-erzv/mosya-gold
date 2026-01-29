"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Package, BookOpen, LogOut, 
  Menu, X, Diamond, ChevronLeft, ChevronRight,
  Sun, Moon, TrendingUp
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Produk Emas", href: "/admin/products", icon: <Package size={20} /> },
    { name: "Blog / Artikel", href: "/admin/blog", icon: <BookOpen size={20} /> },
    { name: "Margin Harga", href: "/admin/gold-price", icon: <TrendingUp size={20} /> },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Top Bar - Tetap sama */}
      <div className="lg:hidden bg-white/80 dark:bg-[#0A0B0D]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between sticky top-0 z-[60]">
        <div className="flex items-center gap-2 text-[#C9A961]">
          <Diamond size={20} className="fill-[#C9A961]/20" />
          <span className="font-serif font-bold text-[#1A1D23] dark:text-white text-sm">Mosya Admin</span>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 text-[#C9A961]">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(true)} className="p-2 text-gray-600 dark:text-gray-400">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Desktop Sidebar - DIPERBAIKI */}
      <motion.aside 
        animate={{ width: isCollapsed ? 90 : 280 }}
        className="hidden lg:flex flex-col bg-white dark:bg-[#111318] border-r border-gray-100 dark:border-gray-800 transition-all duration-300 relative z-50 h-screen"
      >
        <div className={`p-8 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              <div className="p-2 bg-[#C9A961]/10 rounded-xl">
                <Diamond className="text-[#C9A961]" size={24} />
              </div>
              <span className="font-serif font-bold text-xl text-[#1A1D23] dark:text-white tracking-tight">Mosya</span>
            </motion.div>
          ) : (
            <div className="p-2 bg-[#C9A961]/10 rounded-xl">
              <Diamond className="text-[#C9A961]" size={24} />
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`flex items-center transition-all relative group h-12 rounded-2xl ${
                  isCollapsed ? "justify-center px-0" : "justify-start px-4 gap-4"
                } ${
                  isActive 
                  ? "bg-[#C9A961] text-white shadow-lg shadow-[#C9A961]/20" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#C9A961]"
                }`}
              >
                <div className="shrink-0 flex items-center justify-center">{item.icon}</div>
                {!isCollapsed && <span className="text-sm font-bold tracking-wide truncate">{item.name}</span>}
                
                {isCollapsed && (
                  <div className="absolute left-16 bg-[#1A1D23] text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 space-y-4">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`flex items-center w-full bg-gray-50 dark:bg-[#1A1D23] text-[#C9A961] rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-[#C9A961] transition-all h-12 ${
               isCollapsed ? "justify-center px-0" : "px-4 gap-4"
            }`}
          >
            <div className="shrink-0">{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}</div>
            {!isCollapsed && <span className="text-xs font-bold tracking-widest truncate">{theme === "dark" ? "Light" : "Dark"}</span>}
          </button>

          <button 
            onClick={handleLogout} 
            className={`flex items-center w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-colors font-bold text-sm h-12 ${
               isCollapsed ? "justify-center px-0" : "px-4 gap-4"
            }`}
          >
            <div className="shrink-0"><LogOut size={20} /></div>
            {!isCollapsed && <span className="truncate">Logout</span>}
          </button>

          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="w-full flex justify-center p-2 text-gray-300 hover:text-[#C9A961] transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Menu Overlay - Tetap sama */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[300px] bg-white dark:bg-[#0A0B0D] z-[80] lg:hidden flex flex-col p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <Diamond className="text-[#C9A961]" size={28} />
                  <span className="font-serif font-bold text-xl dark:text-white">Mosya Gold</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-50 dark:bg-white/5 rounded-full">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="flex-1 space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.href} href={item.href} 
                      className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                        isActive ? "bg-[#C9A961] text-white" : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {item.icon} {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                 <button 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl"
                >
                  <span className="text-sm font-bold dark:text-white">Ganti Tema</span>
                  {theme === "dark" ? <Sun size={20} className="text-[#C9A961]" /> : <Moon size={20} className="text-[#C9A961]" />}
                </button>
                <button onClick={handleLogout} className="flex items-center gap-4 w-full text-red-500 p-4 font-bold">
                  <LogOut size={20} /> Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}