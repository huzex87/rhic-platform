import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";
import { AuthProvider } from "@/components/AuthProvider";
import { NotificationProvider } from "@/components/NotificationProvider";
import Link from 'next/link';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "RHIC | Renewed Hope Innovation Mobilization Hub",
  description: "A national digital infrastructure for innovators powering the Renewed Hope Movement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-body bg-ivory text-forest antialiased selection:bg-leaf/20 selection:text-forest`}>
        {/* Global Background Elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-leaf/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-gold/5 blur-[100px] rounded-full" />
          <div className="absolute top-[30%] right-[10%] w-[20%] h-[20%] bg-accent-red/5 blur-[80px] rounded-full" />
        </div>

        <AuthProvider>
          <NotificationProvider>
            <Navbar />
            <main className="pt-28 md:pt-32 pb-12 min-h-screen relative">
              {children}
            </main>
            <AIAssistant />
          </NotificationProvider>

          <footer className="py-20 border-t border-forest/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-forest/[0.02] -z-10" />
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center">
                      <span className="text-ivory font-display font-black text-xl italic">R</span>
                    </div>
                    <div>
                      <span className="text-2xl font-display font-black text-forest tracking-tighter uppercase italic leading-none block">RHIC</span>
                      <span className="text-[9px] uppercase font-black text-forest/40 tracking-[0.3em] block mt-1">Innovation Mobilize</span>
                    </div>
                  </div>
                  <p className="text-sm text-forest/60 font-medium max-w-xs text-center md:text-left">
                    The national digital engine for high-impact innovation and strategic mobilization.
                  </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-6">
                  <div className="flex gap-10 text-[11px] font-black text-forest/40 uppercase tracking-[0.2em]">
                    <Link href="/privacy" className="hover:text-forest transition-colors duration-300">Privacy Protocols</Link>
                    <Link href="/terms" className="hover:text-leaf transition-colors duration-300">Terms of Engagement</Link>
                    <span className="hover:text-gold cursor-pointer transition-colors duration-300">Security Core</span>
                  </div>
                  <div className="text-forest/30 text-[10px] font-bold tracking-widest text-center md:text-right">
                    © 2026 RENEWED HOPE INNOVATORS COALITION. ALL PROTOCOLS RESERVED.
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
