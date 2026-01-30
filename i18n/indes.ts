import pt from "./pt";
import en from "./en";
import es from "./es";

export const dictionaries = { pt, en, es };

export function getDictionary(locale: string) {
  return dictionaries[locale as "pt" | "en" | "es"] ?? dictionaries.pt;
}
