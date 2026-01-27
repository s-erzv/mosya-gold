"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Moon, Sun, ShoppingBag } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("beranda");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Katalog", href: "/katalog" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-[60] transition-all duration-500 ${
          scrolled 
            ? "bg-white/80 dark:bg-[#0A0B0D]/80 backdrop-blur-2xl py-6 shadow-md border-b border-[#E5E7EB]/50 dark:border-[#2D3748]/50" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 group z-[70]">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[#C9A961]/20 rounded-full blur-md"
                />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-[#1A1D23] dark:text-white">
                  Mosya <span className="bg-gradient-to-r from-[#C9A961] to-[#D4AF37] bg-clip-text text-transparent whitespace-nowrap">
                  Gold
                </span>
                </span>
                
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name.toLowerCase())}
                  className={`relative px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl group ${
                    activeLink === link.name.toLowerCase()
                      ? "text-[#C9A961]"
                      : "text-[#4A5568] dark:text-[#A0AEC0] hover:text-[#1A1D23] dark:hover:text-white"
                  }`}
                >
                  {link.name}
                  {activeLink === link.name.toLowerCase() && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[#C9A961]/10 dark:bg-[#C9A961]/20 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#C9A961] to-[#D4AF37] group-hover:w-8 transition-all duration-300" />
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 bg-[#FAFBFC] dark:bg-[#1A1D23] border border-[#E5E7EB] dark:border-[#2D3748] rounded-xl hover:border-[#C9A961] dark:hover:border-[#C9A961] transition-all duration-300 group"
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun size={18} className="text-[#C9A961]" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon size={18} className="text-[#8B9DC3]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <Link href="/katalog">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(201, 169, 97, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-2.5 bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#C9A961]/30 overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    <ShoppingBag size={16} />
                    Belanja Sekarang
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.button>
              </Link>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#1A1D23] dark:text-white z-[70] relative"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#0A0B0D] z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex-1 flex flex-col pt-28 px-6 pb-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-serif font-bold text-[#1A1D23] dark:text-white tracking-tight">Menu</h2>
                  </div>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-[#C9A961] to-[#D4AF37]" />
                </div>

                <div className="flex-1 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActiveLink(link.name.toLowerCase());
                          setIsOpen(false);
                        }}
                        className={`block px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                          activeLink === link.name.toLowerCase()
                            ? "bg-[#C9A961]/10 text-[#C9A961] border-l-4 border-[#C9A961]"
                            : "text-[#4A5568] dark:text-[#A0AEC0] hover:bg-gray-50 dark:hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{link.name}</span>
                          <span>→</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4 pt-8">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-6 py-4 bg-[#FAFBFC] dark:bg-[#1A1D23] border border-[#E5E7EB] dark:border-[#2D3748] rounded-2xl"
                  >
                    <span className="font-semibold text-[#1A1D23] dark:text-white">
                      {theme === "dark" ? "Mode Terang" : "Mode Gelap"}
                    </span>
                    <div className="p-2 bg-white dark:bg-[#0A0B0D] rounded-xl">
                      {theme === "dark" ? <Sun size={20} className="text-[#C9A961]" /> : <Moon size={20} className="text-[#8B9DC3]" />}
                    </div>
                  </motion.button>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <Link href="/katalog" onClick={() => setIsOpen(false)}>
                      <button className="w-full px-6 py-4 bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 group">
                        <ShoppingBag size={20} />
                        <span>Belanja Sekarang</span>
                      </button>
                    </Link>
                  </motion.div>

                  <div className="text-center text-sm text-[#4A5568] dark:text-[#A0AEC0] pt-4">
                    <p>Butuh Bantuan?</p>
                    <a href="tel:+6281234567890" className="text-[#C9A961] font-semibold hover:underline">
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}