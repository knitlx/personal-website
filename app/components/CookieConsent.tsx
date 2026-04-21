"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";

const COOKIE_KEY = "cookie_consent";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getSnapshot() {
  return !localStorage.getItem(COOKIE_KEY);
}

function getServerSnapshot() {
  return false;
}

export default function CookieConsent() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const accept = useCallback(() => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    window.dispatchEvent(new Event("storage"));
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(COOKIE_KEY, "declined");
    window.dispatchEvent(new Event("storage"));
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookie"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a2e] border-t border-white/10 px-4 py-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-[#b0b0b0] max-w-2xl">
          Мы используем файлы cookie и аналитику (Яндекс.Метрика, Google Analytics) для улучшения
          работы сайта. Подробнее —{" "}
          <Link
            href="/privacy"
            className="underline text-[#9B8FF0] hover:text-white transition-colors"
          >
            политика конфиденциальности
          </Link>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-medium rounded-lg gradient-bg-diagonal text-white hover:opacity-90 transition-opacity"
          >
            Принять
          </button>
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-white/20 text-[#b0b0b0] hover:text-white hover:border-white/40 transition-colors"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
}
