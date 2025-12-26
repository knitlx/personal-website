import type { Metadata } from "next";
import {
  Inter as FontInter,
  Unbounded as FontUnbounded,
} from "next/font/google"; // Import Inter and Unbounded fonts

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
  weight: ["400", "500", "600", "700"],
});

import PlexusCanvas from "./components/PlexusCanvas";
import TracerCanvas from "./components/TracerCanvas";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-future-domain.com"),
  title: "Александра | AI-универсал и промт-инженер",
  description:
    "Помогаю навести цифровой порядок, создаю автоматизации и настраиваю AI-инструменты под задачи бизнеса. Разработка ботов, мини-приложений и другие кейсы.",
  openGraph: {
    title: "Александра | AI-универсал и промт-инженер",
    description:
      "Помогаю навести цифровой порядок, создаю автоматизации и настраиваю AI-инструменты под задачи бизнеса.",
    url: "https://your-future-domain.com", // <-- ЗАГЛУШКА, замените на ваш домен
    siteName: "Портфолио Александры",
    images: [
      {
        url: "/profile.png", // Путь к вашему фото
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
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  name: "Александра",
                  url: "https://your-future-domain.com",
                  image: "https://your-future-domain.com/profile.png",
                  jobTitle: "AI-универсал и промт-инженер",
                  sameAs: ["https://github.com/knitlx"],
                },
                {
                  "@type": "WebSite",
                  url: "https://your-future-domain.com",
                  name: "Портфолио Александры",
                  author: {
                    "@type": "Person",
                    name: "Александра",
                  },
                  description:
                    "Помогаю навести цифровой порядок, создаю автоматизации и настраиваю AI-инструменты под задачи бизнеса.",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${fontInter.variable} ${fontUnbounded.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <div className="relative flex-grow">
            {/* <TracerCanvas /> */}
            {/* <PlexusCanvas /> */}
            <div className="site-content relative z-10 flex flex-col flex-grow">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
