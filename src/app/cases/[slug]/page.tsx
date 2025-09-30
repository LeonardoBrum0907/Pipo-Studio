import { use } from "react";
import { casesListMock, CasesListMock } from "../page";
import Image from "next/image";

interface PageProps {
   params: Promise<{ slug: string }>
}

export default function Page(props: PageProps) {
   const { slug } = use(props.params)
   const caseData: CasesListMock | undefined = casesListMock.find((item) => item.projectName.replace(/ /g, '-') === slug)

   console.log(slug, caseData)

   return (
      <div>
         {caseData ? (
            <div>
               <h2>{caseData.projectName}</h2>
               <p>{caseData.projectDescription}</p>
               <Image src={caseData.brandLogo} alt={caseData.projectName} width={100} height={100} />
               <div>
                  {caseData.gallery.map((item, idx) => (
                     <Image key={idx} src={item} alt={caseData.projectName} width={100} height={100} />
                  ))}
               </div>
            </div>
         ) : (
            <h1>Case not found</h1>
         )}
      </div>
   )
}