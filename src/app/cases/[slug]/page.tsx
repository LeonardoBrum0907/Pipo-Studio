import { createCasesService } from "@/services/cases";
import { WixMediaImage } from "@/components/WixMediaImage";
import { CtaSection } from "@/components/CtaSection";
import { getLocale } from "next-intl/server";
import { SafeHTML } from "@/components/SafeHTML";
import { HomePageSection } from "@/components/HomePageSection";

interface PageProps {
   params: Promise<{ slug: string }>
}

export default async function Page(props: PageProps) {
   const { slug } = await props.params;
   const casesService = createCasesService();
   const caseData = await casesService.getCaseBySlug(slug);
   const locale = await getLocale();

   if (!caseData) {
      return <h1 className="text-center text-xl mt-10">Case not found</h1>;
   }

   const gallery = caseData.mediaGallery;

   return (
      <HomePageSection className="gap-16">
         {/* MediaGallery0 */}
         {gallery[0] && (
            <div className="text-center">
               <WixMediaImage
                  media={gallery[0].src}
                  alt={gallery[0].fileName}
                  disableZoom
                  objectFit="cover"
                  className="w-full"
               />
            </div>
         )}

         {/* <div className="flex flex-col gap-[5rem]"> */}
         {/* Título e descrição */}
         <div className="leading-relaxed font-sans fadeUp">
            <h1 className="font_1">{caseData.projectName}</h1>
            <SafeHTML
               html={locale === "pt-BR" ? caseData.paragraph1Pt : caseData.paragraph1En}
            />
         </div>

         {/* Linha arredondada */}
         <div className="flex flex-col sm:border rounded-full border-black sm:flex-row justify-center items-center gap-4 fadeUp">
            <div className="flex-1 text-center border rounded-full w-full border-black sm:border-none py-3 px-6 text-gray-700">
               {caseData.projectName}
            </div>
            <div className="flex-1 text-center border rounded-full w-full border-black sm:border-none py-3 px-6 text-gray-700">
               {caseData.companyName}
            </div>
            <div className="flex-1 text-center border rounded-full w-full border-black sm:border-none py-3 px-6 text-gray-700">
               {caseData.launchDate}
            </div>
         </div>

         {/* Texto + Imagem lado a lado */}
         <div className="flex flex-col lg:flex-row items-center gap-16 fadeUp">
            <div className="flex-2">
               <SafeHTML
                  html={locale === "pt-BR" ? caseData.paragraph2Pt : caseData.paragraph2En}
               />
            </div>
            <div className="flex-3">
               {caseData.mediaGallery[1] && (
                  <WixMediaImage
                     media={caseData.mediaGallery[1].src}
                     alt={caseData.mediaGallery[1].fileName}
                     disableZoom
                     objectFit="cover"
                     className="w-full"
                  />
               )}
            </div>
         </div>

         {/* MediaGallery2 */}
         <div className="w-full fadeUp">
            {caseData.mediaGallery[2] && (
               <WixMediaImage
                  media={caseData.mediaGallery[2].src}
                  alt={caseData.mediaGallery[2].fileName}
                  disableZoom
                  objectFit="cover"
                  className="w-full"
               />
            )}
         </div>

         {/* Dois paragrafos */}
         <div className="flex flex-col lg:flex-row gap-8 leading-relaxed font-sans fadeUp">
            <div className="flex-1">
               <SafeHTML
                  html={locale === "pt-BR" ? caseData.paragraph3Pt : caseData.paragraph3En}
               />
            </div>
            <div className="flex-1">
               <h2 className="font_6 opacity-0">Hidden</h2> {/* Hidden title */}
               <SafeHTML
                  html={locale === "pt-BR" ? caseData.paragraph4Pt : caseData.paragraph4En}
               />
            </div>
         </div>
         {/* </div> */}

         {/* MediaGallery */}
         <div className="flex flex-col w-full justify-center gap-6">
            {gallery.slice(1).map((item, idx) => (
               <div key={idx} className="w-full sm:basis-1/2 fadeUp">
                  <WixMediaImage
                     media={item.src}
                     alt={item.fileName}
                     disableZoom
                     objectFit="cover"
                     className="w-full"
                  />
               </div>
            ))}
         </div>

         {/* Título e descrição final */}
         <SafeHTML
            html={locale === "pt-BR" ? caseData.paragraph5Pt : caseData.paragraph5En}
            className="fadeUp"
         />

         <CtaSection speed="0.2"/>
      </HomePageSection>
   );
}