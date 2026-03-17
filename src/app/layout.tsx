// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mosya Gold | Niaga Emas Syariah",
  description: "Pusat investasi emas murni dan perhiasan custom elegan dengan standar syariah.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${playfair.variable} antialiased font-sans transition-colors duration-500`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            <Toaster richColors position="top-center" />
            <main>{children}</main>
            <WhatsAppFloating />
            <div id="modal-root" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}