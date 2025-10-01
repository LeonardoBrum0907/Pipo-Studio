import Image from "next/image";
import { createCasesService } from "@/services/cases";
import { WixMediaImage } from "@/components/WixMediaImage";

interface PageProps {
   params: Promise<{ slug: string }>
}

export default async function Page(props: PageProps) {
   const { slug } = await props.params
   const casesService = createCasesService();
   const caseData = await casesService.getCaseBySlug(slug);

   return (
      <div>
         {caseData ? (
            <div>
               <h2>{caseData.projectName}</h2>
               <p>{caseData.projectDescription}</p>
               <div>
                  {caseData.mediaGallery.map((item, idx) => (
                     <div key={idx} className="p-4 relative">
                        <WixMediaImage
                           media={item.src}
                           alt={caseData.projectName}
                        />
                     </div>
                  ))}
               </div>
            </div>
         ) : (
            <h1>Case not found</h1>
         )}
      </div>
   )
}