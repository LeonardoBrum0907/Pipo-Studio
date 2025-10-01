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

