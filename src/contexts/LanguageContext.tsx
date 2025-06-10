import React, { createContext, useContext, useState } from "react";
import type { Language } from "@/lib/i18n";
import { translations, getNestedValue } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section?: keyof typeof translations) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string, section?: keyof typeof translations): any => {
    try {
      // If section is provided, look in that section first
      if (section && translations[section]) {
        const sectionTranslations = translations[section][language];
        const value = getNestedValue(sectionTranslations, key);
        if (value !== undefined) return value;
      }

      // Try to find the translation in all sections
      for (const sectionKey in translations) {
        const sectionTranslations =
          translations[sectionKey as keyof typeof translations][language];
        const value = getNestedValue(sectionTranslations, key);
        if (value !== undefined) return value;
      }

      // If no translation found in current language, try English
      if (language !== "en") {
        for (const sectionKey in translations) {
          const sectionTranslations =
            translations[sectionKey as keyof typeof translations]["en"];
          const value = getNestedValue(sectionTranslations, key);
          if (value !== undefined) return value;
        }
      }

      // If still no translation found, return the key for debugging
      console.warn(`Translation not found for key: ${key}`);
      return key;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
