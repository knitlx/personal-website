import type { Metadata } from "next";
import { Inter as FontInter } from "next/font/google"; // Import Inter font

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const fontInter = FontInter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});



export const metadata: Metadata = {
  title: "Мой личный сайт",
  description: "Описание моего личного сайта",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700,500,600,300&display=swap"
        />
      </head>
      <body className={`${fontInter.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}