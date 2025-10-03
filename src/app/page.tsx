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

interface OurBrandingProcessList {
   title: string;
   description: string;
}

const customerFeedbacks = [
   {
      customerName: "John Doe",
      customerFeedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      customerImage: "/images/customer-1.png"
   }
]

export default function Home() {
   const messages = useMessages();
   const t = useTranslations('homePage');
   const ourBrandingProcessList = messages['homePage']['ourBrandingProcess'] as OurBrandingProcessList[];

   return (
      <>
         <HomePageSection className="flex flex-col gap-10 items-center justify-center">
            <div className="flex items-center justify-center">
               <h1 className="w-full md:max-w-[49rem] text-6xl md:text-8xl text-center font-display">
                  {t("title.normalWeight")} <b>{t("title.boldWeight")}</b>
               </h1>
            </div>
            <ButtonCTA className="text-2xl" />
            <Arrow />
         </HomePageSection>

         <HomePageSection className="flex flex-col gap-8" hasCTAElement>
            <div className="flex flex-col md:flex-row gap-8 h-[100vh] md:h-[70vh]">
               <Image src="/images/image-1.png" alt="Image 1" width={500} height={500} className="flex-2 object-cover rounded-xl" />
               <Image src="/images/image-2.png" alt="Image 2" width={500} height={500} className="flex-1 object-cover rounded-xl" />
            </div>
            <div className="flex flex-col md:flex-row gap-8 h-[100vh] md:h-[70vh]">
               <Image src="/images/image-4.png" alt="Image 1" width={500} height={500} className="flex-1 object-cover rounded-xl" />
               <Image src="/images/image-3.png" alt="Image 2" width={500} height={500} className="flex-2 object-cover rounded-xl" />
            </div>
         </HomePageSection>

         <HomePageSection hasCTAElement>
            <div className="flex flex-col items-center gap-6 mt-8 mb-16">
               <h2 className="text-6xl md:text-8xl text-foreground-secondary text-center">Our Branding Process</h2>
               <p className="md:text-2xl text-center">
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
               <h2 className="w-full md:max-w-2/3 text-6xl md:text-8xl text-foreground-secondary text-center">
                  Brands that tasted our method
               </h2>

               <Swiper navigation={true} modules={[Navigation]} className="mySwiper ring w-2/3">
                  <SwiperSlide>Slide 1</SwiperSlide>
                  <SwiperSlide>Slide 2</SwiperSlide>
                  <SwiperSlide>Slide 3</SwiperSlide>
                  <SwiperSlide>Slide 4</SwiperSlide>
                  <SwiperSlide>Slide 5</SwiperSlide>
                  <SwiperSlide>Slide 6</SwiperSlide>
                  <SwiperSlide>Slide 7</SwiperSlide>
                  <SwiperSlide>Slide 8</SwiperSlide>
                  <SwiperSlide>Slide 9</SwiperSlide>
               </Swiper>
            </div>
         </HomePageSection>
      </>
   );
}
