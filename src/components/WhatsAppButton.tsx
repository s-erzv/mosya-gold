// components/WhatsAppButton.tsx
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton({ product }: { product: string }) {
  const message = encodeURIComponent(`Halo Mosya Gold, saya tertarik dengan produk ${product}.`);
  
  return (
    <a 
      href={`https://wa.me/628xxxxxxxx?text=${message}`}
      className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8860B] text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg"
    >
      <MessageCircle size={20} />
      Tanya Lewat WhatsApp
    </a>
  );
}