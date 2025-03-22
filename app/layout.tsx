import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Bellwether",
  description: "A comprehensive cryptocurrency platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#2D2D2D] text-[#ECECF1]`}>
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-[#1e1e1e]">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Crypto" className="h-8 w-8" />
            <span className="font-bold">Crypto Bellwether</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Free Tier</span>
            <div className="relative">
              <span className="absolute -top-1 -right-1 bg-[#9792E3] text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>⋮</div>
          </div>
        </header>

        {/* Nav Tabs - Horizontal Scrolling */}
        <div className="overflow-x-auto scrollbar-hide border-b border-gray-800">
          <nav className="flex whitespace-nowrap">
            <Link href="/" className="px-4 py-3 hover:bg-[#565869]">Home</Link>
            <Link href="/live-stream-alerts" className="px-4 py-3 hover:bg-[#565869]">Live Stream Alerts</Link>
            <Link href="/crypto-market" className="px-4 py-3 hover:bg-[#565869]">Crypto Market</Link>
            <Link href="/videos" className="px-4 py-3 hover:bg-[#565869]">Videos</Link>
            <Link href="/posts" className="px-4 py-3 hover:bg-[#565869]">Posts</Link>
            <Link href="/wallet-alerts" className="px-4 py-3 hover:bg-[#565869]">Wallet Alerts</Link>
            <Link href="/shorting" className="px-4 py-3 hover:bg-[#565869]">Shorting</Link>
            <Link href="/cb-course" className="px-4 py-3 hover:bg-[#565869]">CB Course</Link>
          </nav>
        </div>

        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
