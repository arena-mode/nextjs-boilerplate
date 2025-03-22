import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Bellwether",
  description: "A comprehensive cryptocurrency platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-between p-4 bg-black text-white">
          <div className="flex items-center gap-2">
            <img 
              src="/goat.png" 
              alt="Crypto Bellwether" 
              width={32} 
              height={32} 
              className="rounded-full"
            />
            <span className="font-bold text-xl text-white">Crypto Bellwether</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Free Tier</span>
            <span>🔔</span>
          </div>
        </header>
        
        <div className="overflow-x-auto">
          <nav className="flex whitespace-nowrap">
            <a href="/" className="px-4 py-3 flex-shrink-0">Home</a>
            <a href="/live-stream-alerts" className="px-4 py-3 flex-shrink-0">Live Stream Alerts</a>
            <a href="/crypto-market" className="px-4 py-3 flex-shrink-0">Crypto Market</a>
            <a href="/videos" className="px-4 py-3 flex-shrink-0">Videos</a>
            <a href="/posts" className="px-4 py-3 flex-shrink-0">Posts</a>
            <a href="/wallet-alerts" className="px-4 py-3 flex-shrink-0">Wallet Alerts</a>
            <a href="/shorting" className="px-4 py-3 flex-shrink-0">Shorting</a>
            <a href="/cb-course" className="px-4 py-3 flex-shrink-0">CB Course</a>
          </nav>
        </div>
        
        <main c
