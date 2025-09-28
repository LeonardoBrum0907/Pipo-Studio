import { useLocale, useTranslations } from "next-intl";
import { LocaleSwitcherSelect } from "./ui/LocaleSwitcherSelect";
import { Locale, locales } from "@/i18n/config";

export function LocaleSwitcher() {
   const locale = useLocale() as Locale
   const t = useTranslations('locales')

   return (
      <LocaleSwitcherSelect
         defaultValue={locale}
         items={locales.map((locale) => ({
            label: t(`${locale}`),
            value: locale,
         }))}
      />
   )
}