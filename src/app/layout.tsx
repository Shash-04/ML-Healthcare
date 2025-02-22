import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider  from "@/context/AuthProvider";
import "./globals.css";
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"




const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HealthMonitor - Predictive Health Monitoring",
  description: "ML-powered health monitoring and prediction system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <AuthProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <body className={inter.className}>
        {children}
      </body>
      </AuthProvider>
    </html>
  )
}

