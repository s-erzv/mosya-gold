"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Package, BookOpen, LogOut, 
  Menu, X, Diamond, ChevronLeft, ChevronRight 
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Produk Emas", href: "/admin/products", icon: <Package size={20} /> },
    { name: "Blog / Artikel", href: "/admin/blog", icon: <BookOpen size={20} /> },
  ];

  return (
    <>
      {/* 1. Mobile Top Bar - Cuma muncul Menu (Hamburger) */}
      <div className="lg:hidden bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2 text-[#D4AF37]">
          <Diamond size={20} />
          <span className="font-serif font-bold text-gray-900 text-sm">Mosya Admin</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)} 
          className="p-2 hover:bg-gray-50 rounded-lg text-gray-600 transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* 2. Desktop Sidebar (Tetap sama dengan fitur Collapse) */}
      <motion.aside 
        animate={{ width: isCollapsed ? 80 : 260 }}
        className="fixed lg:static inset-y-0 left-0 z-30 bg-white border-r border-gray-100 hidden lg:flex flex-col transition-all duration-300 shadow-sm"
      >
        <div className="p-6 flex items-center justify-between h-20">
          {!isCollapsed ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <Diamond className="text-[#D4AF37]" size={24} />
              <span className="font-serif font-bold text-lg text-gray-900">Mosya Gold</span>
            </motion.div>
          ) : (
            <Diamond className="text-[#D4AF37] mx-auto" size={28} />
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${isActive ? "bg-[#D4AF37] text-white shadow-md shadow-gold/20" : "text-gray-500 hover:bg-gray-50"}`}>
                <div className="shrink-0">{item.icon}</div>
                {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-50 space-y-2">
          <button onClick={handleLogout} className="flex items-center gap-4 px-3 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut size={20} />
            {!isCollapsed && <span className="text-sm font-medium">Log Out</span>}
          </button>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="w-full p-2 bg-gray-50 text-gray-400 hover:text-[#D4AF37] rounded-lg flex items-center justify-center transition-all">
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </motion.aside>

      {/* 3. Mobile Sidebar Overlay & Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop dengan blur */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 lg:hidden"
            />
            
            {/* Drawer Menu */}
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-[60] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <Diamond className="text-[#D4AF37]" size={24} />
                  <span className="font-serif font-bold text-gray-900">Mosya Gold</span>
                </div>
                {/* Tombol X yang manis di dalam sidebar */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 flex-1 space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      onClick={() => setIsOpen(false)} 
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isActive ? "bg-[#D4AF37] text-white" : "text-gray-600"}`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="p-6 border-t border-gray-50">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full text-red-500 p-2">
                  <LogOut size={20} />
                  <span className="font-medium text-sm">Keluar Sesi</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}