import { Metadata } from "next";
import Link from "next/link";
import { createCasesService } from "@/services/cases";
import { WixMediaImage } from "@/components/WixMediaImage";
import { HomePageSection } from "@/components/HomePageSection";
import { CtaSection } from "@/components/CtaSection";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
   title: "Cases",
   description: "Cases",
}

export default async function Cases() {
   const t = await getTranslations("casesPage");
   const casesService = createCasesService();
   const cases = await casesService.getAllCases();

   return (
      <HomePageSection className="gap-6 fadeIn">
         <h1 className="text-foreground-secondary text-5xl md:text-6xl">{t("title")}</h1>
         <p>{t("description")}</p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-lag="0.1">
            {cases.map((item) => (
               <Link key={item.id} className="flex flex-col items-center w-full h-[50vh] md:h-[70vh] shadow-lg rounded-3xl" href={`/cases/${item.slug}`}>
                  <WixMediaImage media={item.brandLogo} alt={item.projectName} objectFit="cover" imageTitle />
               </Link>
            ))}
         </div>
         <CtaSection />
      </HomePageSection>
   )
}