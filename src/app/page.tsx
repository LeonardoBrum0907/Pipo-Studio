"use client";

import { HomePageSection } from "@/components/HomePageSection";
import { ButtonCTA } from "@/components/ui/ButtonCTA";
import { Arrow } from "@/components/ui/Arrow";
import { useTranslations, useMessages } from "next-intl";
import Image from "next/image";
import { OurBrandingProcess } from "@/components/OurBrandingProcess";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Separator } from "@/components/ui/Separator";

interface OurBrandingProcessList {
   title: string;
   description: string;
}

export default function Home() {
   const messages = useMessages();
   const t = useTranslations('homePage');
   const ourBrandingProcessList = messages['homePage']['ourBrandingProcess'] as OurBrandingProcessList[];

   return (
      <>
         <HomePageSection>
            <div className="flex flex-col gap-10 items-center justify-center">
               <div className="flex items-center justify-center">
                  <h1 className="w-full md:max-w-[49rem] text-6xl md:text-7xl text-center font-display">
                     {t("title.normalWeight")} <b>{t("title.boldWeight")}</b>
                  </h1>
               </div>
               <ButtonCTA className="text-xl" />
               <Arrow />
            </div>
         </HomePageSection>

         <HomePageSection hasCTAElement>
            <div className="flex flex-col gap-8">
               <div className="flex flex-col md:flex-row gap-8 h-[100vh] md:h-[70vh]">
                  <Image src="/images/image-1.png" alt="Image 1" width={500} height={500} className="flex-2 object-cover rounded-xl" />
                  <Image src="/images/image-2.png" alt="Image 2" width={500} height={500} className="flex-1 object-cover rounded-xl" />
               </div>
               <div className="flex flex-col md:flex-row gap-8 h-[100vh] md:h-[70vh]">
                  <Image src="/images/image-4.png" alt="Image 1" width={500} height={500} className="flex-1 object-cover rounded-xl" />
                  <Image src="/images/image-3.png" alt="Image 2" width={500} height={500} className="flex-2 object-cover rounded-xl" />
               </div>
            </div>
         </HomePageSection>

         <HomePageSection hasCTAElement>
            <div className="flex flex-col items-center gap-6 mt-8 mb-16">
               <h2 className="text-5xl md:text-6xl text-foreground-secondary text-center">
                  Our Branding Process
               </h2>
               <p className="text-center">
                  Structured steps that guarantee consistency and remarkable results.
               </p>
            </div>

            {ourBrandingProcessList.map((item) => {
               return (
                  <OurBrandingProcess key={item.title} title={item.title} description={item.description} />
               )
            })}
         </HomePageSection>

         <HomePageSection hasCTAElement>
            <div className="flex items-center justify-center flex-col gap-8">
               <h2 className="w-full md:max-w-2/3 text-5xl md:text-6xl text-foreground-secondary text-center">
                  Brands that tasted our method
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
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
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
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
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
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                     </p>

                  </SwiperSlide>

               </Swiper>
            </div>
         </HomePageSection>

         <HomePageSection hasCTAElement>
            <div className="flex flex-col items-center justify-center gap-8 w-full md:w-2/3 mx-auto text-center">
               <h2 className="text-5xl md:text-6xl text-foreground-secondary">
                  Let’s talk about your brand
               </h2>
               <p>
                  Tell us about your brand. Together we’ll build something consistent and memorable. For direct contact: ayrtonpipo@gmail.com
               </p>
               <ButtonCTA className="text-xl" />
            </div>
         </HomePageSection>
      </>
   );
}
