import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/app/_components/ui/sonner";
import { Header } from "./_components/header";
import Head from "next/head";
import faviconImage from "@public/favicon.ico";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intranet - Livemode",
  description:
    "A Intranet da Livemode é um espaço para você poder localizar todos os links de configuração de broadcast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href={faviconImage.src} sizes="any" />
      </Head>
      <body className={`dark ${inter.className}`}>
        <Header />
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
