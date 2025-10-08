import { createCasesService } from "@/services/cases";
import { WixMediaImage } from "@/components/WixMediaImage";
import { CtaSection } from "@/components/CtaSection";

interface PageProps {
   params: { slug: string }
}

export default async function Page(props: PageProps) {
   const { slug } = props.params;
   const casesService = createCasesService();
   const caseData = await casesService.getCaseBySlug(slug);

   if (!caseData) {
      return <h1 className="text-center text-xl mt-10">Case not found</h1>;
   }

   const gallery = caseData.mediaGallery;

   return (
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 text-gray-800">
         {/* MediaGallery0 */}
         {gallery[0] && (
            <section className="mb-12 text-center">
               <WixMediaImage
                  media={gallery[0].src}
                  alt={gallery[0].fileName}
                  className="w-full rounded-lg hover:scale-100 hover:transform-none transition-none"
               />
            </section>
         )}

         <section className="mb-16 space-y-12">
            {/* Título e descrição */}
            <div className="max-w-[1600px] mx-auto leading-relaxed font-sans">
               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600">
                  {caseData.projectName}
               </h1>
               <h2 className="text-xl mt-4 font-semibold text-gray-900 mb-4">{caseData.projectName}</h2>
               <p className="text-left mt-4 text-base sm:text-lg lg:text-xl text-gray-700">
                  {caseData.projectDescription}
               </p>
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
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{caseData.projectName}</h2>
                  <p className="text-gray-700">{caseData.projectDescription}</p>
               </div>
               <div className="flex-1">
                  {caseData.mediaGallery[1] && (
                     <WixMediaImage
                        media={caseData.mediaGallery[1].src}
                        alt={caseData.mediaGallery[1].fileName}
                        className="w-full rounded-lg hover:scale-100 hover:transform-none transition-none"
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
                     className="w-full rounded-lg hover:scale-100 hover:transform-none transition-none"
                  />
               )}
            </div>

            {/* Dois paragrafos */}
            <div className="flex flex-col lg:flex-row gap-8 leading-relaxed font-sans">
               <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{caseData.projectName}</h2>
                  <p className="text-gray-700d">{caseData.projectDescription}</p>
               </div>
               <div className="flex-1 sm:mt-11">
                  <p className="text-gray-700">{caseData.projectDescription}</p>
               </div>
            </div>
         </section>

         {/* MediaGallery */}
         <section className="flex flex-col max-w-[1600px] justify-center gap-6">
            {gallery.slice(1).map((item, idx) => (
               <div key={idx} className="w-full sm:basis-1/2">
                  <WixMediaImage
                     media={item.src}
                     alt={item.fileName}
                     className="w-full rounded-lg hover:scale-100 hover:transform-none transition-none"
                  />
               </div>
            ))}
         </section>

         {/* Título e descrição final */}
         <div className="max-w-[1600px] mx-auto mb-16 space-y-12 leading-relaxed font-sans">
            <h2 className="text-xl mt-8 font-semibold text-gray-900 mb-4">{caseData.projectName}</h2>
            <p className="text-left mt-4 text-base sm:text-lg lg:text-xl text-gray-700">
               {caseData.projectDescription}
            </p>
         </div>

         <CtaSection />
      </div>
   );
}