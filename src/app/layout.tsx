import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";

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
      <body className={`${inter.variable} ${outfit.variable} font-body bg-ivory text-navy antialiased`}>
        <Navbar />
        <main className="pt-28 md:pt-32 pb-12 min-h-screen">
          {children}
        </main>
        <AIAssistant />
        <footer className="py-12 border-t border-navy/5">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 grayscale opacity-50">
              <span className="text-xl font-display font-bold text-navy">RHIC</span>
              <span className="text-[10px] uppercase font-bold text-navy">Mobilize</span>
            </div>
            <div className="text-navy/40 text-sm font-medium">
              © 2026 Renewed Hope Innovators Coalition. All Rights Reserved.
            </div>
            <div className="flex gap-6 text-sm font-bold text-navy/60">
              <span className="hover:text-navy cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-gold cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-navy cursor-pointer transition-colors">Contact</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
