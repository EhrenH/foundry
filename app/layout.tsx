import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Foundry | Growth for ambitious businesses",
    template: "%s | Foundry",
  },
  description:
    "Foundry builds the digital systems that grow your business: websites that earn trust, referral programmes that pay for themselves and product consulting that makes sure you build the right thing.",
  keywords: ["web design South Africa", "referral programme", "product consulting", "business growth"],
  authors: [{ name: "Foundry", url: SITE_URL }],
  creator: "Foundry",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: "Foundry",
    title: "Foundry | Growth for ambitious businesses",
    description:
      "Websites, referral systems and product consulting for businesses that want more.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Foundry: Every business has a next level. We help you reach it.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foundry | Growth for ambitious businesses",
    description:
      "Websites, referral systems and product consulting for businesses that want more.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
