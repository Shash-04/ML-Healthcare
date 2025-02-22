import type { Metadata } from "next";
import { Inter,Geist,Geist_Mono } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });


export const metadata: Metadata = {
  title: "HealthMonitor - Predictive Health Monitoring",
  description: "ML-powered health monitoring and prediction system",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <AuthProvider>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}>
        {children}
      </body>
      </AuthProvider>
    </html>
  );
}
