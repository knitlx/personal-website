import type { Metadata } from "next";
import { Inter as FontInter, Unbounded as FontUnbounded } from "next/font/google"; // Import Inter and Unbounded fonts

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const fontInter = FontInter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fontUnbounded = FontUnbounded({
  subsets: ["cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});



import PlexusCanvas from "./components/PlexusCanvas";
import TracerCanvas from "./components/TracerCanvas";

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
      </head>
      <body className={`${fontInter.variable} ${fontUnbounded.variable} antialiased min-h-screen flex flex-col`}>
        <div className="relative flex-grow">
          {/* <TracerCanvas /> */}
          {/* <PlexusCanvas /> */}
          <div className="site-content relative z-10 flex flex-col flex-grow">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}