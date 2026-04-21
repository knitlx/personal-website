import { useSyncExternalStore } from "react";

const COOKIE_KEY = "cookie_consent";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getSnapshot() {
  return localStorage.getItem(COOKIE_KEY) === "accepted";
}

function getServerSnapshot() {
  return false;
}

export function useCookieConsent(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
