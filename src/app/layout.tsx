import type { Metadata } from 'next';
import { Inter, Geist, Geist_Mono } from 'next/font/google';
import AuthProvider from '@/context/AuthProvider';
import './globals.css';
import type { ReactNode } from 'react';
import Head from 'next/head'; // Import Head from next/head

const inter = Inter({ subsets: ['latin'] });

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'HealthMonitor - Predictive Health Monitoring',
  description: 'ML-powered health monitoring and prediction system',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <Head>
        <title>HealthMonitor - Predictive Health Monitoring</title>
        <meta
          name='description'
          content='ML-powered health monitoring and prediction system'
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased dark`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
