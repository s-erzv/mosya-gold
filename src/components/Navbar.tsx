"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, ShoppingBag } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!mounted) return null;

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Katalog", href: "/katalog" },
    { name: "Blog", href: "/blog" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <div className="fixed w-full top-0 left-0 z-[60] px-4 sm:px-6 lg:px-8 pt-4 pointer-events-none">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "circOut" }}
          className={`mx-auto max-w-[95rem] pointer-events-auto transition-all duration-500 rounded-[28px] border ${
            scrolled 
              ? "bg-white/90 dark:bg-[#0A0B0D]/90 backdrop-blur-2xl py-3 shadow-2xl border-[#C9A961]/20 shadow-[#C9A961]/5" 
              : "bg-white/10 dark:bg-black/10 backdrop-blur-md py-4 border-white/10"
          }`}
        >
          <div className="px-6 sm:px-8 lg:px-10">
            <div className="flex justify-between items-center">
              {/* Logo Area - Gedein dikit fontnya */}
              <Link href="/" className="flex items-center gap-2 group z-[70]">
                <span className="font-serif font-black text-2xl sm:text-3xl tracking-tighter text-[#1A1D23] dark:text-white transition-transform group-hover:scale-105">
                  Mosya <span className="bg-gradient-to-r from-[#C9A961] to-[#D4AF37] bg-clip-text text-transparent">Gold</span>
                </span>
              </Link>

              {/* Desktop Navigation - Whitespace lebih rapat, Font lebih gede */}
              <div className="hidden lg:flex items-center gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-6 py-3 text-base font-bold transition-all duration-300 rounded-2xl group ${
                      isActive(link.href)
                        ? "text-[#C9A961]"
                        : "text-[#4A5568] dark:text-[#A0AEC0] hover:text-[#1A1D23] dark:hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-[#C9A961]/10 dark:bg-[#C9A961]/20 rounded-2xl -z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="hidden lg:flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-3 bg-white dark:bg-[#1A1D23] border border-[#E5E7EB] dark:border-[#2D3748] rounded-2xl hover:border-[#C9A961] shadow-sm transition-all duration-300"
                  aria-label="Toggle Theme"
                >
                  <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                      <motion.div key="sun" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Sun size={20} className="text-[#C9A961]" />
                      </motion.div>
                    ) : (
                      <motion.div key="moon" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Moon size={20} className="text-[#8B9DC3]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <Link href="/katalog">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#C9A961] to-[#D4AF37] text-white text-base font-black rounded-2xl shadow-xl shadow-[#C9A961]/20 group"
                  >
                    <ShoppingBag size={20} strokeWidth={2.5} />
                    <span>Belanja Sekarang</span>
                  </motion.button>
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 text-[#1A1D23] dark:text-white z-[70]"
              >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay - Desain tetap konsisten */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#0A0B0D] z-50 lg:hidden flex flex-col shadow-2xl p-8 pt-28"
            >
              <div className="flex-1 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-8 py-5 rounded-3xl text-xl font-bold transition-all ${
                      isActive(link.href)
                        ? "bg-[#C9A961] text-white shadow-lg"
                        : "text-[#4A5568] dark:text-[#A0AEC0]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="pt-8 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <button 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center justify-between w-full p-6 bg-gray-50 dark:bg-white/5 rounded-3xl text-lg font-bold"
                >
                  <span>Tema {theme === "dark" ? "Terang" : "Gelap"}</span>
                  {theme === "dark" ? <Sun className="text-[#C9A961]" /> : <Moon className="text-[#C9A961]" />}
                </button>
                <Link href="/katalog">
                  <button className="w-full py-6 bg-gradient-to-r from-[#C9A961] to-[#D4AF37] text-white font-black text-xl rounded-3xl shadow-xl flex items-center justify-center gap-3">
                    <ShoppingBag size={24} /> Belanja Sekarang
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}