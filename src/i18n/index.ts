import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./translations/en.json";
import ptBRTranslations from "./translations/pt-BR.json";

i18n.use(initReactI18next).init({
   fallbackLng: "pt-BR",
   resources: {
      en: enTranslations,
      "pt-BR": ptBRTranslations,
   }
})

export default i18n;