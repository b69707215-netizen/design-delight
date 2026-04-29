import { useCallback, useSyncExternalStore } from "react";

import type { Language } from "./academy-content";

const storageKey = "gross-academy-language";
const languageChangedEvent = "gross-academy-language-changed";

function normalizeLanguage(value: string | null): Language {
  return value === "en" ? "en" : "uk";
}

function getSnapshot(): Language {
  if (typeof window === "undefined") return "uk";
  const stored = window.localStorage.getItem(storageKey);
  if (stored === "ru") {
    window.localStorage.setItem(storageKey, "uk");
    return "uk";
  }
  return normalizeLanguage(stored);
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  window.addEventListener("storage", callback);
  window.addEventListener(languageChangedEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(languageChangedEvent, callback);
  };
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribe, getSnapshot, () => "uk");

  const setLanguage = useCallback((next: Language) => {
    window.localStorage.setItem(storageKey, next);
    window.dispatchEvent(new Event(languageChangedEvent));
  }, []);

  return { language, setLanguage };
}
