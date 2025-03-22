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
            <img src="/goat.png" alt="Logo" width={32} height={32} />
            <span>Crypto Bellwether</span>
          </div>
          <div>
            <span>Free Tier</span>
          </div>
        </header>
        <nav className="flex overflow-x-auto">
          <a href="/" className="px-4 py-2">Home</a>
          <a href="/live-stream-alerts" className="px-4 py-2">Live Stream Alerts</a>
          <a href="/crypto-market" className="px-4 py-2">Crypto Market</a>
          <a href="/videos" className="px-4 py-2">Videos</a>
          <a href="/posts" className="px-4 py-2">Posts</a>
          <a href="/wallet-alerts" className="px-4 py-2">Wallet Alerts</a>
          <a href="/shorting" className="px-4 py-2">Shorting</a>
          <a href="/cb-course" className="px-4 py-2">CB Course</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
