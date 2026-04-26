import type { Metadata } from "next";
import { Inter as FontInter, Unbounded as FontUnbounded } from "next/font/google";
import { SITE_URL } from "@/lib/constants";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ModalManager from "./components/ModalManager";
import YandexMetrika from "./components/YandexMetrika";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieConsent from "./components/CookieConsent";
import Providers from "./components/Providers";

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

const siteBaseUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  alternates: {
    canonical: siteBaseUrl,
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  title: "Внедрение ИИ и автоматизация бизнес-процессов | NoChaos",
  description:
    "Внедрение ИИ и автоматизация процессов для бизнеса: анализ задач, интеграции, запуск в работу и сопровождение",
  keywords:
    "внедрение ии, автоматизация процессов, автоматизация бизнес процессов, ии для бизнеса, ии автоматизация, ai системы, автоматизация задач, интеграция ии, внедрение ai, ai автоматизация, автоматизация бизнеса, интеграция ai, telegram боты, n8n автоматизация",
  manifest: "/manifest.json",
  openGraph: {
    title: "Внедрение ИИ и автоматизация бизнес-процессов | NoChaos",
    description:
      "Внедрение ИИ и автоматизация процессов для бизнеса: анализ задач, интеграции, запуск в работу и сопровождение",
    url: SITE_URL,
    siteName: "Внедрение ИИ и автоматизация бизнес-процессов | NoChaos",
    images: [
      {
        url: "/og-image.png",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = SITE_URL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Александра",
        url: siteUrl,
        image: `${siteUrl}/og-image.png`,
        jobTitle: "AI-специалист и разработчик автоматизаций",
        sameAs: ["https://github.com/knitlx"],
      },
      {
        "@type": "WebSite",
        url: siteUrl,
        name: "NoChaos",
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
          <YandexMetrika />
          <GoogleAnalytics />
          <ErrorBoundary>
            <div className="relative flex-grow">
              <div className="site-content relative z-10 flex flex-col flex-grow">
                <Header />
                <div className="flex-grow">{children}</div>
                <Footer />
              </div>
            </div>
          </ErrorBoundary>
          <ModalManager />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
