import i18n from "@/i18n";
import { createContext, useState } from "react";

interface LanguageOptions {
   value: string;
   label: string;
}

type LanguagesOptionsContextType = {
   language: string;
   setLanguage: (language: string) => void;
   languagesOptions: LanguageOptions[];
}

export const LanguagesOptionsContext = createContext<LanguagesOptionsContextType>({} as LanguagesOptionsContextType);

export const LanguagesOptionsProvider = ({ children }: { children: React.ReactNode }) => {
   const [language, setLanguage] = useState("pt-BR");
   const languagesOptions = [
      { value: "pt-BR", label: "Português" },
      { value: "en", label: "Inglês" },
   ]

   const handleSetLanguage = (newLanguage: string) => {
      setLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
   }

   return (
      <LanguagesOptionsContext.Provider value={{ language, setLanguage: handleSetLanguage, languagesOptions }}>
         {children}
      </LanguagesOptionsContext.Provider>
   )
}
