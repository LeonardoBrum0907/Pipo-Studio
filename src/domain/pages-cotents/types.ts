export interface OurBrandingProcessList {
   title: string;
   description: string;
}

export interface HomeContent {
   paragraph1En: string;
   paragraph1Pt: string;
   paragraph2En: string;
   paragraph2Pt: string;
   paragraph3En: string;
   paragraph3Pt: string;
   paragraph4En: string;
   paragraph4Pt: string;
   ourBrandingProcessPt: OurBrandingProcessList[];
   ourBrandingProcessEn: OurBrandingProcessList[];
}

export interface CtaContent {
   titleEn: string;
   titlePt: string;
   paragraph1En: string;
   paragraph1Pt: string;
   buttonTextEn: string;
   buttonTextPt: string;
}