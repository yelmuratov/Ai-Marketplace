import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import SessionWrapper from "./components/sessionWrapper";
import { SpeedInsights } from '@vercel/speed-insights/next';


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
    <SessionWrapper>
      <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>
        {children}
        <SpeedInsights />
          {/* <Dashboard /> */}
        </main>
      </body>
    </html>
    </SessionWrapper>
  );
}
