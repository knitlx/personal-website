"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const consentAccepted = useCookieConsent();

  // Не загружаем счетчик на админских страницах, без ID или без согласия
  if (pathname?.startsWith("/admin") || !gaId || !consentAccepted) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
