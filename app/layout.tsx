import type { Metadata } from "next";
import {
  Inter as FontInter,
  Unbounded as FontUnbounded,
} from "next/font/google";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ModalManager from "./components/ModalManager";

const fontInter = FontInter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fontUnbounded = FontUnbounded({
  subsets: ["cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Александра | AI-универсал и промт-инженер",
  description:
    "Помогаю навести цифровой порядок, создаю автоматизации и настраиваю AI-инструменты под задачи бизнеса. Разработка ботов, мини-приложений и другие кейсы.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Александра | AI-универсал и промт-инженер",
    description:
      "Помогаю навести цифровой порядок, создаю автоматизации и настраиваю AI-инструменты под задачи бизнеса.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    siteName: "Портфолио Александры",
    images: [
      {
        url: "/profile.png",
        width: 400,
        height: 400,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

import Providers from "./components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Александра",
        url: siteUrl,
        image: `${siteUrl}/profile.png`,
        jobTitle: "AI-универсал и промт-инженер",
        sameAs: ["https://github.com/knitlx"],
      },
      {
        "@type": "WebSite",
        url: siteUrl,
        name: "Портфолио Александры",
        author: {
          "@type": "Person",
          name: "Александра",
        },
        description:
          "Помогаю навести цифровой порядок, создаю автоматизации и настраиваю AI-инструменты под задачи бизнеса.",
      },
    ],
  };

  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${fontInter.variable} ${fontUnbounded.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <ErrorBoundary>
            <div className="relative flex-grow">
              {/* <TracerCanvas /> */}
              {/* <PlexusCanvas /> */}
              <div className="site-content relative z-10 flex flex-col flex-grow">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </div>
          </ErrorBoundary>
          <ModalManager />
        </Providers>
      </body>
    </html>
  );
}
