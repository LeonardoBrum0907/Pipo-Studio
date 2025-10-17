import { createCasesService } from "@/services/cases";
import { WixMediaImage } from "@/components/WixMediaImage";
import { CtaSection } from "@/components/CtaSection";
import { getLocale } from "next-intl/server";
import { SafeHTML } from "@/components/SafeHTML";
import { HomePageSection } from "@/components/HomePageSection";

interface PageProps {
   params: { slug: string }
}

export default async function Page(props: PageProps) {
   const { slug } = props.params;
   const casesService = createCasesService();
   const locale = await getLocale();
   const caseData = await casesService.getCaseBySlug(slug);

   if (!caseData) {
      return <h1 className="text-center text-xl mt-10">Case not found</h1>;
   }

   const gallery = caseData.mediaGallery;

   return (
      <HomePageSection>
         {/* MediaGallery0 */}
         {gallery[0] && (
            <div className="mb-12 text-center">
               <WixMediaImage
                  media={gallery[0].src}
                  alt={gallery[0].fileName}
                  disableZoom
                  objectFit="cover"
                  className="w-full"
               />
            </div>
         )}

         <div className="mb-16 space-y-12">
            {/* Título e descrição */}
            <div className="max-w-[1600px] mx-auto leading-relaxed font-sans">
               <SafeHTML
                  html={locale === "pt-BR" ? caseData.portugueseDescription : caseData.englishDescription}
                  className="text-left mt-4 text-base sm:text-lg lg:text-xl text-gray-700"
               />
            </div>

            {/* Linha arredondada */}
            <div className="flex flex-col sm:border rounded-full border-black sm:flex-row justify-center items-center gap-4">
               <div className="flex-1 text-center border rounded-full border-black sm:border-none py-3 px-6 text-gray-700">
                  {caseData.projectName}
               </div>
               <div className="flex-1 text-center border rounded-full border-black sm:border-none py-3 px-6 text-gray-700">
                  {caseData.projectName}
               </div>
               <div className="flex-1 text-center border rounded-full border-black sm:border-none py-3 px-6 text-gray-700">
                  {caseData.projectName}
               </div>
            </div>

            {/* Texto + Imagem lado a lado */}
            <div className="flex flex-col lg:flex-row items-center gap-8  leading-relaxed font-sans">
               <div className="flex-1">
                  <SafeHTML
                     html={locale === "pt-BR" ? caseData.portugueseDescription : caseData.englishDescription}
                     className="text-gray-700"
                  />
               </div>
               <div className="flex-1">
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
            <div className="w-full">
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
            <div className="flex flex-col lg:flex-row gap-8 leading-relaxed font-sans">
               <div className="flex-1 sm:mt-11">
                  <SafeHTML
                     html={locale === "pt-BR" ? caseData.portugueseDescription : caseData.englishDescription}
                     className="text-gray-700"
                  />
               </div>
            </div>
         </div>

         {/* MediaGallery */}
         <div className="flex flex-col max-w-[1600px] justify-center gap-6">
            {gallery.slice(1).map((item, idx) => (
               <div key={idx} className="w-full sm:basis-1/2">
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
            html={locale === "pt-BR" ? caseData.portugueseDescription : caseData.englishDescription}
            className="text-left mt-4 text-base sm:text-lg lg:text-xl text-gray-700"
         />

         <CtaSection />
      </HomePageSection>
   );
}