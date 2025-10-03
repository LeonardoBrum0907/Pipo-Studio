import { Metadata } from "next";
import Link from "next/link";
import { createCasesService } from "@/services/cases";
import { WixMediaImage } from "@/components/WixMediaImage";
import { HomePageSection } from "@/components/HomePageSection";


export const metadata: Metadata = {
   title: "Cases",
   description: "Cases",
}

export default async function Cases() {
   const casesService = createCasesService();
   const cases = await casesService.getAllCases();

   return (
      <HomePageSection className="flex flex-col gap-8">
         <h1 className="text-foreground-secondary text-8xl">Cases</h1>
         <p>Confira os principais projetos de Identidade Visual desenvolvidos aqui no estúdio. Sempre trabalhamos em grande colaboração com nossos clientes, buscando alcançar o melhor resultado possível para o projeto e, assim, posicionar cada marca de forma única.</p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {cases.map((item) => (
            <Link key={item.id} className="flex flex-col items-center w-full h-[50vh] md:h-[70vh]" href={`/cases/${item.slug}`}>
               <WixMediaImage media={item.brandLogo} alt={item.projectName} objectFit="cover" imageTitle/>
            </Link>
         ))}
      </div>
      </HomePageSection>
   )
}