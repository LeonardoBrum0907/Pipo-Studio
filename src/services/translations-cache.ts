import { head } from '@vercel/blob'
import fs from 'fs/promises'
import path from 'path'

interface CacheEntry {
  data: Record<string, any>
  timestamp: number
  ttl: number // Time to live em milliseconds
  source: 'blob' | 'local' | 'cache'
}

class TranslationsCache {
  private cache = new Map<string, CacheEntry>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutos

  /**
   * Obtém traduções do cache, blob ou arquivos locais
   */
  async get(locale: string): Promise<Record<string, any>> {
    const cacheKey = `blob_${locale}`
    const now = Date.now()

    // Verifica se existe no cache e se ainda é válido
    const cached = this.cache.get(cacheKey)
    if (cached && (now - cached.timestamp) < cached.ttl) {
      console.log(`Cache hit para traduções temporárias: ${locale} (fonte: ${cached.source})`)
      return cached.data
    }

    // Tenta carregar do blob primeiro
    try {
      const blobData = await this.fetchFromBlob(locale)
      
      // Salva no cache
      this.cache.set(cacheKey, {
        data: blobData,
        timestamp: now,
        ttl: this.DEFAULT_TTL,
        source: 'blob'
      })

      console.log(`Traduções temporárias carregadas do Blob e cacheadas: ${locale}`)
      return blobData
    } catch (error) {
      console.warn(`Falha ao carregar traduções temporárias do Blob para ${locale}:`, error)
      
      // Fallback para arquivos locais (desenvolvimento)
      if (process.env.NODE_ENV === 'development') {
        try {
          const localData = await this.fetchFromLocal(locale)
          
          // Salva no cache com TTL menor para arquivos locais
          this.cache.set(cacheKey, {
            data: localData,
            timestamp: now,
            ttl: 1 * 60 * 1000, // 1 minuto para arquivos locais
            source: 'local'
          })

          console.log(`Traduções temporárias carregadas de arquivos locais: ${locale}`)
          return localData
        } catch (localError) {
          console.warn(`Falha ao carregar traduções temporárias locais para ${locale}:`, localError)
        }
      }
      
      // Retorna cache expirado se disponível, senão objeto vazio
      return cached?.data || {}
    }
  }

  /**
   * Busca traduções diretamente do blob
   */
  private async fetchFromBlob(locale: string): Promise<Record<string, any>> {
    const blobName = `i18n/tmp/${locale}.json`
    
    // Verifica se o blob existe
    const blob = await head(blobName)
    
    if (!blob) {
      throw new Error(`Nenhuma tradução temporária encontrada no Blob para ${locale}`)
    }

    // Busca o conteúdo do blob
    const response = await fetch(blob.url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Busca traduções de arquivos locais (fallback para desenvolvimento)
   */
  private async fetchFromLocal(locale: string): Promise<Record<string, any>> {
    const tmpFilePath = path.join(process.cwd(), 'src/i18n/locales/tmp', `${locale}.json`)
    
    try {
      const fileContent = await fs.readFile(tmpFilePath, 'utf-8')
      return JSON.parse(fileContent)
    } catch (error) {
      throw new Error(`Arquivo local não encontrado: ${tmpFilePath}`)
    }
  }

  /**
   * Invalida o cache para um locale específico
   */
  invalidate(locale: string): void {
    const cacheKey = `blob_${locale}`
    this.cache.delete(cacheKey)
    console.log(`Cache invalidado para: ${locale}`)
  }

  /**
   * Invalida todo o cache
   */
  clear(): void {
    this.cache.clear()
    console.log('Cache de traduções limpo')
  }

  /**
   * Define TTL personalizado para um locale
   */
  setTTL(locale: string, ttl: number): void {
    const cacheKey = `blob_${locale}`
    const cached = this.cache.get(cacheKey)
    
    if (cached) {
      cached.ttl = ttl
      this.cache.set(cacheKey, cached)
    }
  }

  /**
   * Compara se as novas mensagens são diferentes das que estão no cache/blob
   */
  async areMessagesDifferent(locale: string, newMessages: Record<string, any>): Promise<boolean> {
    try {
      // Primeiro, tenta pegar do cache
      const cacheKey = `blob_${locale}`
      const cached = this.cache.get(cacheKey)
      
      let existingMessages: Record<string, any> = {}
      
      if (cached) {
        existingMessages = cached.data
        console.log(`Comparando com dados do cache para ${locale}`)
      } else {
        // Se não tem cache, busca diretamente do blob
        try {
          existingMessages = await this.fetchFromBlob(locale)
          console.log(`Comparando com dados do blob para ${locale}`)
        } catch (error) {
          // Se não existe no blob, considera diferente (primeira vez)
          console.log(`Nenhum dado existente encontrado para ${locale}, considerando diferente`)
          return true
        }
      }

      // Normaliza ambos os objetos para comparação precisa
      const normalizedNew = this.normalizeMessages(newMessages)
      const normalizedExisting = this.normalizeMessages(existingMessages)
      
      const isDifferent = JSON.stringify(normalizedNew) !== JSON.stringify(normalizedExisting)
      
      console.log(`Comparação de mensagens para ${locale}: ${isDifferent ? 'DIFERENTE' : 'IGUAL'}`)
      return isDifferent
      
    } catch (error) {
      console.warn(`Erro ao comparar mensagens para ${locale}:`, error)
      // Em caso de erro, considera diferente para garantir atualização
      return true
    }
  }

  /**
   * Normaliza as mensagens para comparação (remove propriedades que não devem ser comparadas)
   */
  private normalizeMessages(messages: Record<string, any>): Record<string, any> {
    // Cria uma cópia profunda e remove propriedades que podem causar diferenças falsas
    const normalized = JSON.parse(JSON.stringify(messages))
    
    // Remove propriedades que não são relevantes para comparação
    // Por exemplo, se houver timestamps ou metadados
    
    return normalized
  }
}

// Instância singleton do cache
export const translationsCache = new TranslationsCache()

// Função utilitária para obter traduções temporárias
export async function getTemporaryTranslations(locale: string): Promise<Record<string, any>> {
  return await translationsCache.get(locale)
}

// Função para invalidar cache após atualizações
export function invalidateTranslationsCache(locale: string): void {
  translationsCache.invalidate(locale)
}

// Função para comparar se as mensagens são diferentes
export async function areMessagesDifferent(locale: string, newMessages: Record<string, any>): Promise<boolean> {
  return await translationsCache.areMessagesDifferent(locale, newMessages)
}
