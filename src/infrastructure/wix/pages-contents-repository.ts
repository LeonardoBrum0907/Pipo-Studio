import { PagesContentsRepository } from "@/domain/pages-cotents/repository";
import { HomeContent, OurBrandingProcessList, CtaContent } from "@/domain/pages-cotents/types";
import { getWixClient } from "./client";

interface WixHomeContentDTO {
   paragraph1En: string;
   paragraph1Pt: string;
   paragraph2En: string;
   paragraph2Pt: string;
   paragraph3En: string;
   paragraph3Pt: string;
   paragraph4En: string;
   paragraph4Pt: string;
   ourBrandingProcessListPt: OurBrandingProcessList[];
   ourBrandingProcessListEn: OurBrandingProcessList[];
}

const mapWixHomeContentToHomeContent = (item: WixHomeContentDTO): HomeContent => {
   return {
      paragraph1En: item.paragraph1En,
      paragraph1Pt: item.paragraph1Pt,
      paragraph2En: item.paragraph2En,
      paragraph2Pt: item.paragraph2Pt,
      paragraph3En: item.paragraph3En,
      paragraph3Pt: item.paragraph3Pt,
      paragraph4En: item.paragraph4En,
      paragraph4Pt: item.paragraph4Pt,
      ourBrandingProcessPt: item.ourBrandingProcessListPt,
      ourBrandingProcessEn: item.ourBrandingProcessListEn,
   };
};

interface WixCtaContentDTO {
   titleEn: string;
   titlePt: string;
   paragraph1En: string;
   paragraph1Pt: string;
   buttonTextEn: string;
   buttonTextPt: string;
}

const mapWixCtaContentToCtaContent = (item: WixCtaContentDTO): CtaContent => {
   return {
      titleEn: item.titleEn,
      titlePt: item.titlePt,
      paragraph1En: item.paragraph1En,
      paragraph1Pt: item.paragraph1Pt,
      buttonTextEn: item.buttonTextEn,
      buttonTextPt: item.buttonTextPt,
   };
};

export class WixPagesContentsRepository implements PagesContentsRepository {
   async findHomeContent(): Promise<HomeContent | null> {
      const wixClient = await getWixClient();

      const { items } = await wixClient.items.query('HomeContent').find();

      // console.log('items', items);
      
      return (items as WixHomeContentDTO[]).map(mapWixHomeContentToHomeContent)[0];
   }

   async findCtaContent(): Promise<CtaContent | null> {
      const wixClient = await getWixClient();

      const { items } = await wixClient.items.query('CtaContent').find();

      console.log('items', items);
      
      return (items as WixCtaContentDTO[]).map(mapWixCtaContentToCtaContent)[0];
   }
}