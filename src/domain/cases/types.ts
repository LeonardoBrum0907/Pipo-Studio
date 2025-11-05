interface Image {
  alt: string;
  fileName: string;
  settings: {
    height: number;
    width: number;
  };
  title: string;
  src: string;
}

// Domain types - agnóstico de infraestrutura
export interface Case {
  id: string;
  projectName: string;
  companyName: string;
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
  launchDate: string;
  projectDescription: string;
  brandLogo: string;
  mediaGallery: Image[];
  slug: string;
}

export interface CaseFilters {
  limit?: number;
  skip?: number;
  companyName?: string;
}

