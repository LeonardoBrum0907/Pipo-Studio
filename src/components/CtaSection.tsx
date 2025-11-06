'use client';

import { useLocale, useTranslations } from "next-intl";
import { HomePageSection } from "./HomePageSection";
import { ButtonCTA } from "./ui/ButtonCTA";
import { CtaContent } from "@/domain/pages-cotents/types";
import { useEffect, useState } from "react";
import { getCtaContentAction } from "@/actions/pages-contents";
import { SafeHTML } from "./SafeHTML";

export function CtaSection({ hasCTAElement = false, speed }: { hasCTAElement?: boolean, speed?: string }) {
   const t = useTranslations('homePage');
   const locale = useLocale();
   const [ctaContent, setCtaContent] = useState<CtaContent | null>(null);

   useEffect(() => {
      getCtaContentAction().then(({ ctaContent }) => {
         setCtaContent(ctaContent);
      });
   }, []);

   return (
      <HomePageSection hasCTAElement={hasCTAElement} speed={speed}>
         {ctaContent ? (
            <div className="flex flex-col items-center justify-center gap-8 w-full md:w-2/3 mx-auto text-center">
               <SafeHTML
                  html={locale === "pt-BR" ? ctaContent.titlePt : ctaContent.titleEn}
                  className="text-5xl md:text-6xl text-foreground-secondary"
               />
               <SafeHTML
                  html={locale === "pt-BR" ? ctaContent.paragraph1Pt : ctaContent.paragraph1En}
               />
               <ButtonCTA className="text-xl">
                  <SafeHTML
                     html={locale === "pt-BR" ? ctaContent.buttonTextPt : ctaContent.buttonTextEn}
                     className="text-xl"
                  />
               </ButtonCTA>
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center gap-8 w-full md:w-2/3 mx-auto text-center">
               <h2 className="text-5xl md:text-6xl text-foreground-secondary">
                  {t("letTalkAboutYourBrand")}
               </h2>
               <p>
                  {t("tellUsAboutYourBrand")}
               </p>
               <ButtonCTA className="text-xl" />
            </div>
         )
         }
      </HomePageSection >
   )
}
