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
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 hidden" id="settings-modal">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl font-bold">Settings</h2>
            <div className="mt-2">
              <p>Logged in as: Free Tier</p>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="mr-2" />
                Enable Alerts for All Tabs
              </label>
            </div>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick="document.getElementById('settings-modal').classList.add('hidden')">Close</button>
          </div>
        </div>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 hidden" id="notifications-modal">
          <div className="bg-white p-4 rounded w-96">
            <h2 className="text-xl font-bold">Notifications</h2>
            <button className="mt-2 p-1 bg-gray-200 rounded text-sm">Read All</button>
            <div className="mt-2 max-h-64 overflow-y-auto">
              <p>No notifications yet.</p>
            </div>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick="document.getElementById('notifications-modal').classList.add('hidden')">Close</button>
          </div>
        </div>
        <header className="flex justify-between p-4 bg-black text-white">
          <div className="flex items-center gap-2">
            <img src="logo.png" alt="Crypto Bellwether" className="h-8" />
            <span>Crypto Bellwether</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Free Tier</span>
            <div className="relative cursor-pointer" onClick="document.getElementById('notifications-modal').classList.remove('hidden')">
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1">0</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="cursor-pointer" onClick="document.getElementById('settings-modal').classList.remove('hidden')">⋮</div>
          </div>
        </header>
        <nav className="flex gap-4 p-4 bg-gray-800 text-white">
          <a href="/live-stream-alerts">Live Stream Alerts</a>
          <a href="/crypto-market">Crypto Market</a>
          <a href="/videos">Videos</a>
          <a href="/posts">Posts</a>
          <a href="/wallet-alerts">Wallet Alerts</a>
          <a href="/shorting">Shorting</a>
          <a href="/cb-course">CB Course</a>
          <a href="/admin">Admin</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
