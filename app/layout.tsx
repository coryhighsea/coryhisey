import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Databuddy } from '@databuddy/sdk';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cory Hisey",
  description: "Personal website of Cory Hisey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <Databuddy
        clientId="PLZBBnVTC8kK1VvhDuLxB"
        enableBatching={true}
        trackScreenViews
        trackPerformance
        trackWebVitals={true} // Default is false, explicitly enable for quick start
        trackErrors={true}    
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
