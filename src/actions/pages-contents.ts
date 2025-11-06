'use server';

import { HomeContent, CtaContent } from "@/domain/pages-cotents/types";
import { createPagesContentsService } from "@/services/pages-contents";

export async function getPagesContentsAction(): Promise<{ homeContent: HomeContent | null }> {
   const pagesContentsService = createPagesContentsService();
   const homeContent = await pagesContentsService.getHomeContent();
   return { homeContent };
}

export async function getCtaContentAction(): Promise<{ ctaContent: CtaContent | null }> {
   const pagesContentsService = createPagesContentsService();
   const ctaContent = await pagesContentsService.getCtaContent();
   return { ctaContent };
}  