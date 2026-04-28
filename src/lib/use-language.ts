import { useEffect, useState } from "react";

import type { Language } from "./academy-content";

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("ru");

  useEffect(() => {
    const stored = window.localStorage.getItem("gross-academy-language");
    if (stored === "en" || stored === "ru") setLanguageState(stored);
  }, []);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("gross-academy-language", next);
  };

  return { language, setLanguage };
}
