import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { AuthProvider } from "@/context/auth-contex";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeuroMark",
  description: "Created by Aral Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AuthProvider>
        <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main>
          {children}
          <SpeedInsights />
          </main>
          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </html>
      </AuthProvider>
  );
}
