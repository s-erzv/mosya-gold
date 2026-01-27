export default function WhatsAppFloating() {
  return (
    <a 
      href="https://wa.me/6282112345678?text=Halo%20Mosya%20Gold,%20saya%20tertarik%20dengan%20produk%20emas..."
      target="_blank"
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
    >
      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.2l-.719 2.637 2.709-.71c.883.52 1.861.85 2.753.85h.001c3.182 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.769-5.767zm3.387 8.264c-.147.415-.703.749-1.152.827-.327.056-.749.073-1.203-.075-.3-.099-.665-.234-1.133-.433-1.991-.849-3.269-2.868-3.368-3.001-.1-.133-.808-1.071-.808-2.043 0-.972.508-1.449.689-1.683.18-.234.393-.293.524-.293l.377.006c.115 0 .27-.043.426.331.173.412.589 1.433.64 1.539.051.106.085.23.014.371-.071.141-.106.23-.212.353-.106.123-.223.275-.319.369-.107.106-.219.222-.094.436.125.214.557.917 1.196 1.487.822.732 1.516.958 1.729 1.064.212.106.338.089.464-.057.126-.146.541-.63.685-.845.143-.215.287-.181.484-.108s1.246.587 1.463.696c.217.108.361.164.414.258.054.094.054.544-.093.959z" />
      </svg>
      <span className="absolute right-full mr-4 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all border border-zinc-100 dark:border-zinc-700">
        Konsultasi Sekarang
      </span>
    </a>
  );
}