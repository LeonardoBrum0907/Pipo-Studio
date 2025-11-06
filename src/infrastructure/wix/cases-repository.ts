import { CasesRepository } from '@/domain/cases/repository';
import { Case, CaseFilters } from '@/domain/cases/types';
import { getWixClient } from './client';

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
   paragraph1En: string;
   paragraph1Pt: string;
   paragraph2En: string;
   paragraph2Pt: string;
   paragraph3En: string;
   paragraph3Pt: string;
   paragraph4En: string;
   paragraph4Pt: string;
   paragraph5En: string;
   paragraph5Pt: string;
   companyName: string;
   launchDate: string;
   mediagallery?: WixImageDTO[];
   projectName: string;
   projectDescription: string;
   _id: string;
}

// Mapper: converte dados do Wix para o domínio
const mapWixCaseToCase = (wixCase: WixCaseDTO): Case => {
   const formatLaunchDate = (launchDate: string) => {
      const [year, month, day] = launchDate.split('-');
      return `${day}/${month}/${year}`;
   }

   return {
      id: wixCase._id,
      projectName: wixCase.projectName,
      companyName: wixCase.companyName,
      paragraph1En: wixCase.paragraph1En,
      paragraph1Pt: wixCase.paragraph1Pt,
      paragraph2En: wixCase.paragraph2En,
      paragraph2Pt: wixCase.paragraph2Pt,
      paragraph3En: wixCase.paragraph3En,
      paragraph3Pt: wixCase.paragraph3Pt,
      paragraph4En: wixCase.paragraph4En,
      paragraph4Pt: wixCase.paragraph4Pt,
      paragraph5En: wixCase.paragraph5En,
      paragraph5Pt: wixCase.paragraph5Pt,
      launchDate: formatLaunchDate(wixCase.launchDate),
      projectDescription: wixCase.projectDescription,
      brandLogo: wixCase.brandLogo,
      mediaGallery: Array.isArray(wixCase.mediagallery)
         ? wixCase.mediagallery.map(item => item as WixImageDTO)
         : [],
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
      
      return (items as WixCaseDTO[]).map(mapWixCaseToCase);
   }

   async findBySlug(slug: string): Promise<Case | null> {
      const cases = await this.findAll();
      return cases.find(c => c.slug === slug) || null;
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

