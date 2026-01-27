"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) throw error;

      // Jika sukses, lempar ke dashboard
      if (data.user) {
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      alert("Login Gagal: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl border-t-4 border-[#D4AF37] relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#FDF8E7] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
            <Lock size={28} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Mosya Gold</h1>
          <p className="text-gray-400 text-sm mt-2 uppercase tracking-widest font-medium">Internal Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full p-4 border border-gray-100 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all duration-300"
              placeholder="admin@mosyagold.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-4 border border-gray-100 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all duration-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#D4AF37] text-white p-4 rounded-xl font-bold hover:bg-[#B8860B] transition-all flex justify-center items-center gap-3 shadow-lg shadow-gold/30 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Authorize Access"}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-[0.2em]">
          Authorized Personnel Only
        </p>
      </div>
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
