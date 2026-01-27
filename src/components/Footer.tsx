import { Diamond, Instagram, Facebook, Twitter, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900/50 pt-24 pb-12 border-t border-zinc-100 dark:border-zinc-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <Diamond className="text-[#D4AF37]" size={32} />
              <span className="font-serif font-bold text-2xl tracking-tighter">MOSYAGOLD</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">Destinasi terpercaya untuk investasi emas dan koleksi perhiasan mewah dengan standar kemurnian tertinggi.</p>
            <div className="flex gap-5">
              <Instagram className="text-zinc-400 hover:text-[#D4AF37] cursor-pointer transition-colors" />
              <Facebook className="text-zinc-400 hover:text-[#D4AF37] cursor-pointer transition-colors" />
              <Twitter className="text-zinc-400 hover:text-[#D4AF37] cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h5 className="font-bold text-xs  tracking-[0.3em] text-zinc-400 mb-8">Panduan Beli</h5>
            <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
              <li className="hover:text-[#D4AF37] cursor-pointer">Cara Order</li>
              <li className="hover:text-[#D4AF37] cursor-pointer">Verifikasi Pembayaran</li>
              <li className="hover:text-[#D4AF37] cursor-pointer">Layanan Pengiriman</li>
              <li className="hover:text-[#D4AF37] cursor-pointer">Kebijakan Buyback</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs  tracking-[0.3em] text-zinc-400 mb-8">Kontak Kami</h5>
            <ul className="space-y-5 text-sm">
              <li className="flex gap-4 text-zinc-600 dark:text-zinc-300"><Phone size={18} className="text-[#D4AF37]"/> +62 821 1234 5678</li>
              <li className="flex gap-4 text-zinc-600 dark:text-zinc-300"><Mail size={18} className="text-[#D4AF37]"/> hello@mosyagold.com</li>
              <li className="flex gap-4 text-zinc-600 dark:text-zinc-300 leading-relaxed"><MapPin size={18} className="text-[#D4AF37]"/> Jakarta Selatan, DKI Jakarta</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs  tracking-[0.3em] text-zinc-400 mb-8">Newsletter</h5>
            <p className="text-xs text-zinc-500 mb-4">Dapatkan info promo dan update harga emas harian.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Email Anda" className="bg-white dark:bg-zinc-800 p-4 rounded-xl text-sm border border-zinc-100 dark:border-zinc-700 outline-none focus:border-[#D4AF37]" />
              <button className="bg-[#D4AF37] text-white p-4 rounded-xl font-bold text-sm">Berlangganan</button>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-zinc-100 dark:border-zinc-800 text-center text-sm font-medium text-zinc-400 ">
          &copy; {new Date().getFullYear()} Mosya Gold Indonesia. Elegant Investment.
        </div>
      </div>
    </footer>
  );
}