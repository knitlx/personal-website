"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Не загружаем счетчик на админских страницах или если ID не указан
  if (pathname?.startsWith("/admin") || !gaId) {
    return null;
  }

  useEffect(() => {
    // Инициализируем dataLayer
    window.dataLayer = window.dataLayer || [];

    // Загружаем gtag.js
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Инициализируем gtag
    window.gtag("js", new Date());
    window.gtag("config", gaId);

    // Отслеживаем просмотр страницы при инициализации
    if (pathname && !pathname.startsWith("/admin")) {
      window.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [gaId]);

  // Отслеживаем SPA-переходы
  useEffect(() => {
    if (typeof window !== "undefined" && pathname && !pathname.startsWith("/admin") && gaId) {
      window.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [pathname, gaId]);

  return null;
}
