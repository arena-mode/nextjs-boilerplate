// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import NotificationDropdown from "./components/NotificationDropdown";
import NavigationBar from "./components/Navigation";
import { useState } from "react";

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
        <AuthProvider>
          <HeaderWithClient />
          <NavigationBar />
          <main className="p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

// Client component for header with interactive elements
'use client';
function HeaderWithClient() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  
  return (
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
      <div className="flex items-center gap-4 relative">
        <span>Free Tier</span>
        <a href="/login" className="text-xs hover:opacity-100">Sign In</a>
        <button 
          onClick={() => setNotificationOpen(!notificationOpen)}
          className="relative"
          aria-label="Notifications"
        >
          <span className="text-xl">🔔</span>
          {/* We can add an indicator for unread notifications here */}
        </button>
        
        <NotificationDropdown 
          isOpen={notificationOpen} 
          onClose={() => setNotificationOpen(false)} 
        />
      </div>
    </header>
  );
}
