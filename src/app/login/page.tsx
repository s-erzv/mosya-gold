"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, Lock, ShieldCheck, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) throw error;

      if (data.user) {
        window.location.href = "/admin/dashboard"; 
      }
    } catch (error: any) {
      alert("Akses Ditolak: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFBFC] dark:bg-[#0A0B0D] px-4 overflow-hidden relative">
      
      {/* Background Ornaments (Luxury Vibe) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C9A961]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#C9A961]/5 rounded-full blur-[120px]" />
        
        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]" 
             style={{ backgroundImage: `radial-gradient(#C9A961 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card Container */}
        <div className="bg-white dark:bg-[#111318] p-8 md:p-12 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(201,169,97,0.15)] border border-[#E5E7EB] dark:border-[#2D3748] relative overflow-hidden">
          
          {/* Top Decorative Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C9A961] via-[#D4AF37] to-[#C9A961]" />

          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-20 h-20 bg-[#C9A961]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[#C9A961]/20 rotate-3"
            >
              <Lock size={32} className="text-[#C9A961]" />
            </motion.div>
            
            <h1 className="text-3xl font-serif font-bold text-[#1A1D23] dark:text-white tracking-tight">
              Mosya <span className="text-[#C9A961]">Gold</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <ShieldCheck size={14} className="text-[#C9A961]" />
              <p className="text-[10px] text-gray-400  tracking-[0.3em] font-black">
                Administrator Portal
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black  tracking-widest text-[#4A5568] dark:text-[#A0AEC0] ml-1">
                Admin Credential
              </label>
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pl-5 rounded-2xl bg-[#F3F4F6] dark:bg-[#1A1D23] border border-transparent focus:border-[#C9A961] focus:bg-white dark:focus:bg-[#0A0B0D] outline-none transition-all duration-300 text-sm font-medium"
                  placeholder="email@mosyagold.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black  tracking-widest text-[#4A5568] dark:text-[#A0AEC0] ml-1">
                Secure Key
              </label>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pl-5 pr-12 rounded-2xl bg-[#F3F4F6] dark:bg-[#1A1D23] border border-transparent focus:border-[#C9A961] focus:bg-white dark:focus:bg-[#0A0B0D] outline-none transition-all duration-300 text-sm font-medium"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C9A961] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full relative group h-14 overflow-hidden rounded-2xl bg-[#1A1D23] dark:bg-white text-white dark:text-[#1A1D23] font-bold shadow-xl transition-all duration-300 disabled:opacity-70"
            >
              <div className="absolute inset-0 w-0 bg-[#C9A961] transition-all duration-500 group-hover:w-full opacity-100" />
              <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300  tracking-widest text-xs">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Grant Access
                    <ArrowRight size={16} />
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* Footer Card */}
          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-[10px] text-gray-400  tracking-[0.2em] italic">
              Access attempts are logged and monitored
            </p>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-8">
          <button 
            onClick={() => router.push("/")}
            className="text-xs font-bold text-gray-400 hover:text-[#C9A961] transition-colors  tracking-widest"
          >
            ← Back to Public Site
          </button>
        </div>
      </motion.div>
    </div>
  );
}
// "use client";
// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";

// export default function AdminAuth() {
//   const [isRegister, setIsRegister] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isRegister) {
//         // --- PROSES REGISTER ---
//         const { data, error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             emailRedirectTo: `${window.location.origin}/admin/dashboard`,
//           }
//         });
//         if (error) throw error;
//         alert("Pendaftaran berhasil! Silahkan coba login (Jika error, cek konfirmasi email di dashboard)");
//         setIsRegister(false); // Balik ke login
//       } else {
//         const { error } = await supabase.auth.signInWithPassword({ email, password });
//         if (error) throw error;
//         router.push("/admin/dashboard");
//       }
//     } catch (error: any) {
//       alert("Error: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#D4AF37]">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-serif font-bold text-gray-900">Mosya Gold</h1>
//           <p className="text-gray-500 text-sm mt-2">
//             {isRegister ? "Buat akun admin baru" : "Masuk ke dashboard management"}
//           </p>
//         </div>

//         <form onSubmit={handleAuth} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//             <input 
//               type="email" 
//               required
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
//               placeholder="admin@mosyagold.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input 
//               type="password" 
//               required
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button 
//             disabled={loading}
//             className="w-full bg-[#D4AF37] text-white p-3 rounded-lg font-bold hover:bg-[#B8860B] transition-all flex justify-center items-center gap-2 shadow-lg shadow-gold/20"
//           >
//             {loading ? <Loader2 className="animate-spin" /> : (isRegister ? "Daftar Akun" : "Masuk Admin")}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <button 
//             onClick={() => setIsRegister(!isRegister)}
//             className="text-sm text-gray-500 hover:text-[#D4AF37] transition-colors"
//           >
//             {isRegister ? "Sudah punya akun? Login di sini" : "Belum punya akun? Daftar dulu bos"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
