import { CasesRepository } from '@/domain/cases/repository';
import { Case, CaseFilters } from '@/domain/cases/types';
import { getWixClient } from './client';
import { RichContent } from '@wix/ricos';
import { updateI18nMessages } from '@/app/actions';

interface WixImageDTO {
   alt: string;
   fileName: string;
   settings: {
      height: number;
      width: number;
   };
   title: string;
   src: string;
}

// DTO retornado pelo Wix
interface WixCaseDTO {
   brandLogo: string;
   companyName: string;
   launchDate: string;
   mediagallery?: WixImageDTO[];
   projectName: string;
   richcontent: RichContent;
   portugueseDescriptions: string;
   englishDescriptions: string;
   projectDescription: string;
   _id: string;
}

// Mapper: converte dados do Wix para o domínio
const mapWixCaseToCase = (wixCase: WixCaseDTO): Case => {
   return {
      id: wixCase._id,
      projectName: wixCase.projectName,
      companyName: wixCase.companyName,
      projectDescription: wixCase.projectDescription,
      brandLogo: wixCase.brandLogo,
      mediaGallery: Array.isArray(wixCase.mediagallery)
         ? wixCase.mediagallery.map(item => item as WixImageDTO)
         : [],
      richContent: wixCase.richcontent,
      englishDescriptions: wixCase.englishDescriptions,
      portugueseDescriptions: wixCase.portugueseDescriptions,
      slug: wixCase.projectName.toLowerCase().replace(/\s+/g, '-'),
   };
};

// Implementação concreta usando Wix
export class WixCasesRepository implements CasesRepository {
   private readonly collectionName = 'BrandingProjects';

   async findAll(filters?: CaseFilters): Promise<Case[]> {
      const wixClient = await getWixClient();
      let query = wixClient.items.query(this.collectionName);

      if (filters?.limit) {
         query = query.limit(filters.limit);
      }

      if (filters?.skip) {
         query = query.skip(filters.skip);
      }

      if (filters?.companyName) {
         query = query.eq('companyName', filters.companyName);
      }

      const { items } = await query.find();
      console.log('items', items);
      return (items as WixCaseDTO[]).map(mapWixCaseToCase);
   }

   async findBySlug(slug: string): Promise<Case | null> {
      const cases = await this.findAll();
      const caseData = cases.find(c => c.slug === slug) || null;
      if (caseData) {
         await Promise.all([
            updateI18nMessages('pt-BR', slug, {
               richText: caseData.portugueseDescriptions,
            }),
            updateI18nMessages('en', slug, {
               richText: caseData.englishDescriptions,
            })
         ])
      }
      return caseData;
   }

   async findById(id: string): Promise<Case | null> {
      const wixClient = await getWixClient();

      try {
         const response = await wixClient.items
            .query(this.collectionName)
            .eq('_id', id)
            .find();

         const item = response.items[0] as WixCaseDTO | undefined;
         return item ? mapWixCaseToCase(item) : null;
      } catch (error) {
         console.error('Error fetching case by id:', error);
         return null;
      }
   }
}

