'use server'

import path from "path"
import { Locale } from "@/i18n/config"
import fs from 'fs/promises'

export async function updateI18nMessages(locale: Locale, slug: string, caseData: { richText: string }) {
   const filePath = path.join(process.cwd(), `src/i18n/locales/${locale}.json`)
   const fileContent = await fs.readFile(filePath, 'utf-8')
   const messages = JSON.parse(fileContent)

   messages.caseDinamicPage = messages.caseDinamicPage || {}
   messages.caseDinamicPage[slug] = {
      richtext: caseData.richText,
   }

   await fs.writeFile(filePath, JSON.stringify(messages, null, 2))
}