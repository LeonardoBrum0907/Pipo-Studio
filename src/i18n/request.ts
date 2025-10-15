import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/services/locale";
import path from "path";
import fs from 'fs/promises'

async function fileExists(filePath: string): Promise<boolean> {
   try {
      await fs.access(filePath)
      return true
   } catch {
      return false
   }
}

export default getRequestConfig(async () => {
   const locale = await getUserLocale();
   const messages = (await import(`@/i18n/locales/${locale}.json`)).default
   let tmpMessages = { default: {} };
   let tmpDir = path.join(process.cwd(), 'src/i18n/locales/tmp')
   let tmpFilePath = path.join(`${tmpDir}/${locale}.json`)
   
   if (process.env.NODE_ENV !== 'development') {
      tmpDir = path.join("/tmp")
   }
         
   try {
      console.log('temp folder found.');
      await fs.access(tmpDir)
   } catch {
      console.log(`temp folder not found: ${tmpDir}, creating...`);
      await fs.mkdir(tmpDir)
   }

   if (await fileExists(tmpFilePath)) {
      try {
         tmpMessages = (await import(`@/i18n/locales/tmp/${locale}.json`)).default;
      } catch (error: any) {
         console.warn('Failed to load tmp messages:', error.message);
      }
   }

   return {
      locale,
      messages: { ...messages, ...tmpMessages },
   }
})