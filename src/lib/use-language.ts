import { useCallback, useEffect, useState } from "react";

import type { Language } from "./academy-content";

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("uk");

  useEffect(() => {
    const stored = window.localStorage.getItem("gross-academy-language");
    if (stored === "en" || stored === "uk") setLanguageState(stored);
    if (stored === "ru") {
      setLanguageState("uk");
      window.localStorage.setItem("gross-academy-language", "uk");
    }
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("gross-academy-language", next);
  }, []);

  return { language, setLanguage };
}
