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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {cases.map((item) => (
            <Link key={item.id} className="flex flex-col items-center w-full h-[50vh] md:h-[70vh] " href={`/cases/${item.slug}`}>
               <WixMediaImage media={item.brandLogo} alt={item.projectName} objectFit="cover"/>
            </Link>
         ))}
      </div>
   )
}