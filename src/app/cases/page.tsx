import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createCasesService } from "@/services/cases";
import { WixMediaImage } from "@/components/WixMediaImage";

export const metadata: Metadata = {
   title: "Cases",
   description: "Cases",
}

export default async function Cases() {
   const casesService = createCasesService();
   const cases = await casesService.getAllCases();

   return (
      <div className="flex gap-4">
         {cases.map((item) => (
            <div key={item.id}>
               <Link href={`/cases/${item.slug}`}>
                  <h2>{item.projectName}</h2>
                  <WixMediaImage media={item.brandLogo} alt={item.projectName} width={100} height={100} />
               </Link>
            </div>
         ))}
      </div>
   )
}