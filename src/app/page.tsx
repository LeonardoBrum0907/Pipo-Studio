"use client";

import { HomePageSection } from "@/components/HomePageSection";
import { ButtonCTA } from "@/components/ui/ButtonCTA";
import { Arrow } from "@/components/ui/Arrow";
import { useTranslations, useMessages } from "next-intl";
import { OurBrandingProcess } from "@/components/OurBrandingProcess";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Separator } from "@/components/ui/Separator";
import { CtaSection } from "@/components/CtaSection";
import { Case } from "@/domain/cases/types";
import { useEffect, useState } from "react";
import { getAllCasesAction } from "@/actions/cases";
import Link from "next/link";
import { WixMediaImage } from "@/components/WixMediaImage";
import { Loader2 } from "lucide-react";

interface OurBrandingProcessList {
   title: string;
   description: string;
}

export default function Home() {
   const messages = useMessages();
   const t = useTranslations('homePage');
   const ourBrandingProcessList = messages['homePage']['ourBrandingProcess'] as OurBrandingProcessList[];
   const [cases, setCases] = useState<Case[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      getAllCasesAction().then(({ cases }) => {
         setCases(cases);
         setIsLoading(false);
      });
   }, []);

   const scrollTo = (element: string) => {
      window.scrollTo({
         top: document.getElementById(element)?.offsetTop,
         behavior: 'smooth'
      });
   };

   return (
      <>
         <HomePageSection speed="0.1">
            <div className="flex flex-col gap-10 items-center justify-center">
               <div className="flex items-center justify-center">
                  <h1 className="w-full md:max-w-[49rem] text-6xl md:text-7xl text-center font-display">
                     {t("title.normalWeight")} <b>{t("title.boldWeight")}</b>
                  </h1>
               </div>
               <ButtonCTA className="text-xl" />
               <button onClick={() => scrollTo('section-2')} className="cursor-pointer">
                  <Arrow />
               </button>
            </div>
         </HomePageSection>

         <HomePageSection hasCTAElement speed="0.2" id="section-2">
            <div className="flex flex-col gap-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {isLoading ? (
                     <div className="flex items-center justify-center w-full h-full ring col-span-full">
                        <Loader2 className="w-10 h-10 animate-spin" />
                     </div>
                  ) : (
                     cases.slice(0,4).map((item) => (
                        <Link key={item.id} className="flex flex-col items-center w-full h-[50vh] md:h-[70vh] shadow-lg rounded-3xl" href={`/cases/${item.slug}`}>
                           <WixMediaImage media={item.brandLogo} alt={item.projectName} objectFit="cover" imageTitle />
                        </Link>
                     ))
                  )}
               </div>
            </div>
         </HomePageSection>

         <HomePageSection hasCTAElement speed="0.3">
            <div className="flex flex-col items-center gap-6 mt-8 mb-16">
               <h2 className="text-5xl md:text-6xl text-foreground-secondary text-center">
                  {t("ourBrandingProcessTitle")}
               </h2>
               <p className="text-center">
                  {t("ourBrandingProcessDescription")}
               </p>
            </div>

            {ourBrandingProcessList.map((item) => {
               return (
                  <OurBrandingProcess key={item.title} title={item.title} description={item.description} />
               )
            })}
         </HomePageSection>

         <HomePageSection hasCTAElement speed="0.4">
            <div className="flex items-center justify-center flex-col gap-8">
               <h2 className="w-full md:max-w-2/3 text-5xl md:text-6xl text-foreground-secondary text-center">
                  {t("brandsThatTastedOurMethod")}
               </h2>

               <Swiper
                  navigation={true}
                  spaceBetween={48}
                  modules={[Navigation]}
                  className="mySwiper w-full md:w-2/3 !px-8 !py-4 md:!px-12 md:!py-8"
               >

                  <SwiperSlide className="!flex flex-col md:flex-row items-center justify-center py-8 px-12 gap-12 ring ring-foreground rounded-2xl">

                     <div className="flex flex-col items-center justify-center gap-4 flex-1">
                        <div className="h-[100px] w-[100px] bg-foreground-secondary rounded-full"></div>
                        <div className="text-center">
                           <p>Nome do cliente</p>
                           <p className="text-foreground-secondary font-bold">Empresa do Cliente</p>
                        </div>
                     </div>

                     <Separator orientation="vertical" className="!h-[200px] bg-foreground hidden md:block " />
                     <Separator className="bg-foreground block md:hidden " />

                     <p className="text-xl flex-2">
                        &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.&quot;
                     </p>

                  </SwiperSlide>
                  <SwiperSlide className="!flex flex-col md:flex-row items-center justify-center py-8 px-12 gap-12 ring ring-foreground rounded-2xl">

                     <div className="flex flex-col items-center justify-center gap-4 flex-1">
                        <div className="h-[100px] w-[100px] bg-foreground-secondary rounded-full"></div>
                        <div className="text-center">
                           <p>Nome do cliente</p>
                           <p className="text-foreground-secondary font-bold">Empresa do Cliente</p>
                        </div>
                     </div>

                     <Separator orientation="vertical" className="!h-[200px] bg-foreground hidden md:block " />
                     <Separator className="bg-foreground block md:hidden " />

                     <p className="text-xl flex-2">
                        &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.&quot;
                     </p>

                  </SwiperSlide>
                  <SwiperSlide className="!flex flex-col md:flex-row items-center justify-center py-8 px-12 gap-12 ring ring-foreground rounded-2xl">

                     <div className="flex flex-col items-center justify-center gap-4 flex-1">
                        <div className="h-[100px] w-[100px] bg-foreground-secondary rounded-full"></div>
                        <div className="text-center">
                           <p>Nome do cliente</p>
                           <p className="text-foreground-secondary font-bold">Empresa do Cliente</p>
                        </div>
                     </div>

                     <Separator orientation="vertical" className="!h-[200px] bg-foreground hidden md:block " />
                     <Separator className="bg-foreground block md:hidden " />

                     <p className="text-xl flex-2">
                        &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.&quot;
                     </p>

                  </SwiperSlide>

               </Swiper>
            </div>
         </HomePageSection>

         <CtaSection hasCTAElement speed="0.5" />
      </>
   );
}
