import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderWithBell from "./components/HeaderWithBell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Bellwether",
  description: "A comprehensive cryptocurrency platform",
  metadataBase: new URL('https://your-site.com'),
  // Add these CSP headers
  other: {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://sosrdqwwmyzvnspfmyid.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://sosrdqwwmyzvnspfmyid.supabase.co wss://sosrdqwwmyzvnspfmyid.supabase.co"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderWithBell />
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
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
