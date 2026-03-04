"use client";

import { createContext, useContext, ReactNode } from "react";
import { usePathname } from "next/navigation";

const SUPPORTED_LANGS = ["pt", "en", "es"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

const LangContext = createContext<Lang>("pt");

export function LangProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Extrai o idioma da URL (ex: /en/contato -> en)
  const segments = pathname?.split("/").filter(Boolean) || [];
  const currentLang = SUPPORTED_LANGS.includes(segments[0] as Lang) 
    ? (segments[0] as Lang) 
    : "pt";

  return (
    <LangContext.Provider value={currentLang}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);