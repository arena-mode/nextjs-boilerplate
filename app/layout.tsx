import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import NavigationBar from "./components/Navigation";
import HeaderWithClient from "./components/HeaderWithClient";

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
