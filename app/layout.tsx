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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-between p-4 bg-black text-white">
          <div className="flex items-center gap-2">
            <span>Crypto Bellwether</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Free Tier</span>
            <div className="relative">
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1">0</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>⋮</div>
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
        
        <main>{children}</main>
      </body>
    </html>
  );
}
