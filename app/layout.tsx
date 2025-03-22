import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "./components/components/Logo";
import Navigation from "./components/components/Navigation";

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
      <body className={`${inter.className} bg-black text-white`}>
        <header className="flex justify-between items-center p-4">
          <Logo />
          <div className="flex items-center gap-4">
            <span>Free Tier</span>
            <div>🔔</div>
          </div>
        </header>
        
        <Navigation />
        
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
