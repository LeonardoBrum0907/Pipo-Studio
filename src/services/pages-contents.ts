import { PagesContentsRepository } from "@/domain/pages-cotents/repository";
import { HomeContent, CtaContent } from "@/domain/pages-cotents/types";
import { WixPagesContentsRepository } from "@/infrastructure/wix/pages-contents-repository";

export class PagesContentsService {
   constructor(private repository: PagesContentsRepository) {}

   async getHomeContent(): Promise<HomeContent | null> {
      return this.repository.findHomeContent();
   }

   async getCtaContent(): Promise<CtaContent | null> {
      return this.repository.findCtaContent();
   }
}

export const createPagesContentsService = (): PagesContentsService => {
   const repository = new WixPagesContentsRepository();
   return new PagesContentsService(repository);
}