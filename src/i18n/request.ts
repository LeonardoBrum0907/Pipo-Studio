import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/services/locale";
import { getTemporaryTranslations } from "@/services/translations-cache";

export default getRequestConfig(async () => {
   const locale = await getUserLocale();
   const messages = (await import(`@/i18n/locales/${locale}.json`)).default
   
   // Carrega traduções temporárias usando cache otimizado
   const tmpMessages = await getTemporaryTranslations(locale)

   return {
      locale,
      messages: { ...messages, ...tmpMessages },
   }
})