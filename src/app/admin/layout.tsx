import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // overflow-hidden di sini mencegah scroll di level window/body
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#FAFBFC] dark:bg-[#0A0B0D] overflow-hidden transition-colors duration-500">
      <Sidebar />
      
      {/* Container utama yang bisa di-scroll */}
      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth no-scrollbar">
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}