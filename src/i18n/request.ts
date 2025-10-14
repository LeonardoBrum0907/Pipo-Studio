import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/services/locale";

export default getRequestConfig(async () => {
   const locale = await getUserLocale();

   const messages = await import(`@/i18n/locales/${locale}.json`)

   return {
      locale,
      messages: messages.default,
   }
})