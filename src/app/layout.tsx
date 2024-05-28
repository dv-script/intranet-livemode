import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/app/_components/ui/sonner";
import { Header } from "./_components/header";

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
      <body className={`dark ${inter.className}`}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
