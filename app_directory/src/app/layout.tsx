import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TradeMind AI - Intelligent Market Analysis & Trading Assistant",
  description: "Advanced AI-powered trading assistant providing real-time market analysis, predictive modeling, and institutional-grade insights for crypto and equities traders.",
  keywords: [
    "AI trading",
    "market analysis",
    "crypto trading",
    "stock trading",
    "predictive analytics",
    "trading assistant",
    "investment AI"
  ],
  authors: [{ name: "TradeMind Team" }],
  openGraph: {
    title: "TradeMind AI - Intelligent Market Analysis",
    description: "AI-powered trading assistant for institutional-grade market insights",
    url: "https://trademind.ai",
    siteName: "TradeMind",
    images: [
      {
        url: "https://trademind.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TradeMind AI Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeMind AI - Intelligent Market Analysis",
    description: "AI-powered trading assistant for institutional-grade market insights",
    images: ["https://trademind.ai/twitter-image.jpg"],
  },
  themeColor: "#0f172a", // slate-900
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
