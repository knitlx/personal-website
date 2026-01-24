"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    ym: (id: number, action: string, ...args: any[]) => void;
  }
}

export default function YandexMetrika() {
  const pathname = usePathname();

  // Не загружаем счетчик на админских страницах
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  if (!metrikaId) {
    return null;
  }

  useEffect(() => {
    // Загружаем код Яндекс Метрики
    (function (m: any, e: any, t: any, r: any, i: any, k: any, a: any) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
          return;
        }
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode!.insertBefore(k, a);
    })(
      window,
      document,
      "script",
      `https://mc.yandex.ru/metrika/tag.js?id=${metrikaId}`,
      "ym"
    );

    // @ts-ignore
    window.ym(parseInt(metrikaId), "init", {
      ssr: true,
      webvisor: true,
      trackHash: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true,
    });
  }, [metrikaId]);

  // Отслеживаем SPA-переходы
  useEffect(() => {
    if (typeof window !== "undefined" && pathname && !pathname.startsWith("/admin") && metrikaId) {
      // @ts-ignore
      window.ym(parseInt(metrikaId), "hit", pathname);
    }
  }, [pathname, metrikaId]);

  return (
    <>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${metrikaId}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
