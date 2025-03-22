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
            <div>🔔</div>
            <div>⋮</div>
          </div>
        </header>
        
        <div className="overflow-x-auto">
          <nav className="
