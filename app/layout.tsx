import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        {/* Settings Modal */}
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 hidden z-50" id="settings-modal">
          <div className="bg-[#444654] p-4 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold">Settings</h2>
            <div className="mt-2">
              <p>Logged in as: Free Tier</p>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="mr-2" defaultChecked />
                Admin Important Alerts
              </label>
            </div>
            <button 
              className="mt-4 p-2 bg-[#565869] text-white rounded-lg w-full" 
              onClick={() => {
                document.getElementById('settings-modal')?.classList.add('hidden');
              }}
            >
              Close
            </button>
          </div>
        </div>

        {/* Notifications Modal */}
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 hidden z-50" id="notifications-modal">
          <div className="bg-[#444654] p-4 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold">Notifications</h2>
            <button className="mt-2 p-1 bg-[#565869] rounded text-sm">Read All</button>
            <div className="mt-2 max-h-64 overflow-y-auto">
              <p>No notifications yet.</p>
            </div>
            <button 
              className="mt-4 p-2 bg-[#565869] text-white rounded-lg w-full" 
              onClick={() => {
                document.getElementById('notifications-modal')?.classList.add('hidden');
              }}
            >
              Close
            </button>
          </div>
        </div>

        {/* Header */}
        <header className="flex flex-row justify-between p-4 bg-[#1e1e1e] text-[#ECECF1] border-b border-gray-800">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Crypto Bellwether" className="h-8 w-8" />
            <span className="text-base md:text-lg font-bold">Crypto Bellwether</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Free Tier</span>
            <div 
              className="relative cursor-pointer" 
              onClick={() => {
                document.getElementById('notifications-modal')?.classList.remove('hidden');
              }}
            >
              <span className="absolute -top-1 -right-1 bg-[#9792E3] text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div 
              className="cursor-pointer text-xl" 
              onClick={() => {
                document.getElementById('settings-modal')?.classList.remove('hidden');
              }}
            >
              ⋮
            </div>
          </div>
        </header>

        {/* Navigation - X-style tabs */}
        <nav className="overflow-x-auto bg-[#1e1e1e] border-b border-gray-800 flex">
          <div className="flex w-full">
            <Link 
              href="/live-stream-alerts" 
              className="px-3 py-3 text-sm font-medium whitespace-nowrap hover:bg-[#2D2D2D] text-center flex-1 border-b-2 border-transparent hover:border-[#565869]"
            >
              Live Stream Alerts
            </Link>
            <Link 
              href="/crypto-market" 
              className="px-3 py-3 text-sm font-medium whitespace-nowrap hover:bg-[#2D2D2D] text-center flex-1 border-b-2 border-transparent hover:border-[#565869]"
            >
              Crypto Market
            </Link>
            <Link 
              href="/videos" 
              className="px-3 py-3 text-sm font-medium whitespace-nowrap hover:bg-[#2D2D2D] text-center flex-1 border-b-2 border-transparent hover:border-[#565869]"
            >
              Videos
            </Link>
            <Link 
              href="/posts" 
              className="px-3 py-3 text-sm font-medium whitespace-nowrap hover:bg-[#2D2D2D] text-center flex-1 border-b-2 border-transparent hover:border-[#565869]"
            >
              Posts
            </Link>
            <Link 
              href="/wallet-alerts" 
              className="px-3 py-3 text-sm font-medium whitespace-nowrap hover:bg-[#2D2D2D] text-center flex-1 border-b-2 border-transparent hover:border-[#565869]"
            >
              Wallet Alerts
            </Link>
            <Link 
              href="/shorting" 
              className="px-3 py-3 text-sm font-medium whitespace-nowrap hover:bg-[#2D2D2D] text-center flex-1 border-b-2 border-transparent hover:border-[#565869]"
            >
              Shorting
            </Link>
            <Link 
              href="/cb-course" 
              className="px-3 py-3 text-sm font-medium whitespace-nowrap hover:bg-[#2D2D2D] text-center flex-1 border-b-2 border-transparent hover:border-[#565869]"
            >
              CB Course
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="p-4 container mx-auto">{children}</main>

        {/* Add client-side script for JS event handling */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              // Settings modal
              document.querySelector('[onclick*="settings-modal"]').addEventListener('click', function() {
                document.getElementById('settings-modal').classList.remove('hidden');
              });
              
              // Notifications modal
              document.querySelector('[onclick*="notifications-modal"]').addEventListener('click', function() {
                document.getElementById('notifications-modal').classList.remove('hidden');
              });
              
              // Close buttons
              document.querySelectorAll('[onclick*="classList.add(\'hidden\')"]').forEach(button => {
                button.addEventListener('click', function() {
                  const modalId = this.closest('[id]').id;
                  document.getElementById(modalId).classList.add('hidden');
                });
              });
            });
          `
        }} />
      </body>
    </html>
  );
}
