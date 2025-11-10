"use client";

import { HomePageSection } from "@/components/HomePageSection";
import { ButtonCTA } from "@/components/ui/ButtonCTA";
import { Arrow } from "@/components/ui/Arrow";
import { useTranslations, useMessages, useLocale } from "next-intl";
import { OurBrandingProcess } from "@/components/OurBrandingProcess";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Separator } from "@/components/ui/Separator";
import { CtaSection } from "@/components/CtaSection";
import { Case } from "@/domain/cases/types";
import { useEffect, useState } from "react";
import { getAllCasesAction } from "@/actions/cases";
import Link from "next/link";
import { WixMediaImage } from "@/components/WixMediaImage";
import { Loader2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPagesContentsAction } from "@/actions/pages-contents";
import { HomeContent, OurBrandingProcessList } from "@/domain/pages-cotents/types";
import { SafeHTML } from "@/components/SafeHTML";
import { getAllFeedbacksAction } from "@/actions/feedbacks";
import { Feedback } from "@/domain/feedbacks/types";
import { Skeleton } from "@/components/ui/Skeleton";

// gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Home() {
   const messages = useMessages();
   const t = useTranslations('homePage');
   const ourBrandingProcessList = messages['homePage']['ourBrandingProcess'] as OurBrandingProcessList[];
   const [cases, setCases] = useState<Case[]>([]);
   const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
   const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const locale = useLocale();

   const homePageRef = useRef<HTMLDivElement>(null);

   useGSAP(
      () => {
         const itemsLeft = gsap.utils.toArray('.left');
         itemsLeft.forEach((item: any) => {
            gsap.from(item, {
               x: 200,
               scrollTrigger: {
                  trigger: '#section-2',
                  start: 'top bottom',
                  end: 'top 70%',
                  scrub: true,
                  // markers: true,
               }
            })
         })

         const itemsRight = gsap.utils.toArray('.right');
         itemsRight.forEach((item: any) => {
            gsap.from(item, {
               x: -150,
               scrollTrigger: {
                  trigger: '#section-2',
                  start: 'top bottom',
                  end: 'top 70%',
                  scrub: true,
                  // markers: true,
               }
            })
         })

         ScrollTrigger.create({
            trigger: '#section-2',
            pin: ".ctaElement",
            start: 'top top',
            endTrigger: '#cta-section',
            // end: '+=3500',
            // scrub: true,
            // markers: true,
         });

         const itemsFadeDown = gsap.utils.toArray('.fadeDown');
         itemsFadeDown.forEach((item: any) => {
            gsap.to(item, {
               y: -150,
               scrollTrigger: {
                  trigger: item,
                  start: '40% 20%',
                  end: 'bottom 20%',
                  scrub: true,
                  // markers: true,
               }
            })
         })
      },
      { scope: homePageRef }
   );

   useEffect(() => {
      getAllCasesAction().then(({ cases }) => {
         setCases(cases);
         setIsLoading(false);
      });
      getPagesContentsAction().then(({ homeContent }) => {
         setHomeContent(homeContent);
      });
      getAllFeedbacksAction().then(({ feedbacks }) => {
         setFeedbacks(feedbacks);
      });
   }, []);

   const scrollTo = (element: string) => {
      window.scrollTo({
         top: document.getElementById(element)?.offsetTop,
         behavior: 'smooth'
      });
   };

   return (
      <div ref={homePageRef}>
         <HomePageSection speed="0.1">
            <div className="flex flex-col gap-10 items-center justify-center fadeDown fadeIn">
               <div className="flex items-center justify-center">
                  {homeContent ? (
                     <SafeHTML
                        html={locale === "pt-BR" ? homeContent?.paragraph1Pt : homeContent?.paragraph1En}
                        className="w-full md:max-w-[49rem] text-6xl md:text-7xl text-center font-display"
                     />
                  ) : (
                     <h1 className="w-full md:max-w-[49rem] text-6xl md:text-7xl text-center font-display">
                        {t("title.normalWeight")} <b>{t("title.boldWeight")}</b>
                     </h1>
                  )}
               </div>
               <ButtonCTA className="text-xl" />
               <button onClick={() => scrollTo('section-2')} className="cursor-pointer">
                  <Arrow />
               </button>
            </div>
         </HomePageSection>

         <HomePageSection hasCTAElement id="section-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fadeUp">
               {isLoading ? (
                  <>
                     <Skeleton className="w-full h-[50vh] md:h-[70vh]" />
                     <Skeleton className="w-full h-[50vh] md:h-[70vh]" />
                     <Skeleton className="w-full h-[50vh] md:h-[70vh]" />
                     <Skeleton className="w-full h-[50vh] md:h-[70vh]" />
                  </>
               ) : (
                  cases.slice(0, 4).map((item) => (
                     <Link key={item.id} className="flex flex-col items-center w-full h-[50vh] md:h-[70vh] shadow-lg rounded-3xl" href={`/cases/${item.slug}`}>
                        <WixMediaImage media={item.brandLogo} alt={item.projectName} objectFit="cover" imageTitle projectName={item.projectName} companyName={item.companyName} />
                     </Link>
                  ))
               )}
            </div>
         </HomePageSection>

         <HomePageSection speed="0.2">
            <div className="flex flex-col items-center gap-6 mt-8 mb-16">
               {homeContent ? (
                  <SafeHTML
                     html={locale === "pt-BR" ? homeContent?.paragraph2Pt : homeContent?.paragraph2En}
                     className="text-5xl md:text-6xl text-foreground-secondary text-center"
                  />
               ) : (
                  <h2 className="text-5xl md:text-6xl text-foreground-secondary text-center">
                     {t("ourBrandingProcessTitle")}
                  </h2>
               )}
               {homeContent ? (
                  <SafeHTML
                     html={locale === "pt-BR" ? homeContent?.paragraph3Pt : homeContent?.paragraph3En}
                     className="text-center"
                  />
               ) : (
                  <p className="text-center">
                     {t("ourBrandingProcessDescription")}
                  </p>
               )}
            </div>

            {homeContent ? (
               locale === "pt-BR" ? (
                  homeContent.ourBrandingProcessPt.map((item, idx) => {
                     return (
                        <OurBrandingProcess key={idx} title={item.title} description={item.description} />
                     )
                  })
               ) : (
                  homeContent.ourBrandingProcessEn.map((item, idx) => {
                     return (
                        <OurBrandingProcess key={idx} title={item.title} description={item.description} />
                     )
                  })
               )
            ) : (
               ourBrandingProcessList.map((item, idx) => {
                  return (
                     <OurBrandingProcess key={idx} title={item.title} description={item.description} />
                  )
               })
            )}
         </HomePageSection>

         <HomePageSection speed="0.3" id="cta-section">
            <div className="flex items-center justify-center flex-col gap-8">
               {homeContent ? (
                  <SafeHTML
                     html={locale === "pt-BR" ? homeContent?.paragraph4Pt : homeContent?.paragraph4En}
                     className="w-full md:max-w-2/3 text-5xl md:text-6xl text-foreground-secondary text-center"
                  />
               ) : (
                  <h2 className="w-full md:max-w-2/3 text-5xl md:text-6xl text-foreground-secondary text-center">
                     {t("brandsThatTastedOurMethod")}
                  </h2>
               )}

               {feedbacks.length ? (
                  <Swiper
                     navigation={true}
                     spaceBetween={48}
                     loop={true}
                     modules={[Navigation, Autoplay]}
                     autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                     }}
                     className="mySwiper w-full md:w-2/3 !px-8 !py-4 md:!px-6 md:!py-8"
                  >
                     {feedbacks.map((item, idx) => (
                        <SwiperSlide key={idx} className="!flex flex-col md:flex-row items-center justify-center py-8 px-12 gap-12 ring ring-foreground rounded-2xl">

                           <div className="flex flex-col items-center justify-center gap-4 flex-1">
                              {item.avatarUrl ? (
                                 <WixMediaImage media={item.avatarUrl} alt={item.companyName} objectFit="cover" width={100} height={100} disableZoom className="rounded-full !h-[100px] !w-[100px]" />
                              ) : (
                                 <div className="h-[100px] w-[100px] shrink-0 bg-foreground-secondary rounded-full"></div>
                              )}
                              <div className="text-center">
                                 <p>{item.customerName}</p>
                                 <p className="text-foreground-secondary font-bold">{item.companyName}</p>
                              </div>
                           </div>

                           <Separator orientation="vertical" className="!h-[200px] bg-foreground hidden md:block " />
                           <Separator className="bg-foreground block md:hidden " />

                           <p className="text-xl flex-2">
                              &quot;{ locale === "pt-BR" ? item.feedbackTextPt : item.feedbackTextEn }&quot;
                           </p>

                        </SwiperSlide>
                     ))}
                  </Swiper>
               ) : (
                  <div className="flex items-center justify-center w-full min-h-[calc(100vh-110px)] col-span-full">
                     <Loader2 className="w-10 h-10 animate-spin" />
                  </div>
               )}
            </div>
         </HomePageSection>

         <CtaSection speed="0.4" />
      </div>
   );
}
