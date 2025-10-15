'use server'

import path from "path"
import { Locale } from "@/i18n/config"
import fs from 'fs/promises'
import { put } from '@vercel/blob'
import { invalidateTranslationsCache, areMessagesDifferent } from '@/services/translations-cache'

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

   try {
      // Verifica se as mensagens são diferentes antes de atualizar
      const isDifferent = await areMessagesDifferent(locale, messages)
      
      if (!isDifferent) {
         console.log(`Mensagens para ${locale} são idênticas às existentes, pulando atualização do blob`)
         return
      }
      
      // Salva no Vercel Blob apenas se as mensagens forem diferentes
      const blobName = `i18n/tmp/${locale}.json`
      const blobContent = JSON.stringify(messages, null, 2)
      
      await put(blobName, blobContent, {
         access: 'public',
         addRandomSuffix: false, // Mantém o nome consistente
         allowOverwrite: true,
      })
      
      console.log(`Traduções temporárias salvas no Blob: ${blobName}`)
      
      // Invalida o cache para forçar recarregamento
      invalidateTranslationsCache(locale)
      
   } catch (error) {
      console.error('Erro ao salvar no Vercel Blob:', error)
      throw new Error('Falha ao salvar traduções temporárias')
   }
}