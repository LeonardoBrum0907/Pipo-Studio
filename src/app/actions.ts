'use server'

import path from "path"
import { Locale } from "@/i18n/config"
import fs from 'fs/promises'

interface CaseContent {
   slug: string
   richText: string
}

export async function updateI18nMessages(locale: Locale, cases: CaseContent[]) {
   // Lê o arquivo original para manter a estrutura base
   const originalFilePath = path.join(process.cwd(), `src/i18n/locales/${locale}.json`)
   const fileContent = await fs.readFile(originalFilePath, 'utf-8')
   const messages = JSON.parse(fileContent)

   // Prepara o conteúdo a ser atualizado
   messages.caseDinamicPage = messages.caseDinamicPage || {}

   // Atualiza todos os cases de uma vez
   cases.forEach(caseData => {
      messages.caseDinamicPage[caseData.slug] = {
         richtext: caseData.richText,
      }
   })

   let tmpDir = path.join(process.cwd(), 'src/i18n/locales/tmp')

   if (process.env.NODE_ENV !== 'development') {
      tmpDir = path.join("/tmp")
   }

   try {
      await fs.access(tmpDir)
      console.log('tmpDir found.');
   } catch {
      console.log('tmpDir not found, creating...');
   }

   // Salva o arquivo na pasta tmp
   const tmpFilePath = path.join(tmpDir, `${locale}.json`)
   await fs.writeFile(tmpFilePath, JSON.stringify(messages, null, 2))


   // try {
   //    if(process.env.NODE_ENV !== 'development') {
   //       tmpDir = path.join("/tmp")
   //    }
   //    await fs.access(tmpDir)
   //    console.log('tmpDir', tmpDir);
   // } catch {
   //    console.log('tmpDir not found.');
   //    // await fs.mkdir(tmpDir)
   // }
}