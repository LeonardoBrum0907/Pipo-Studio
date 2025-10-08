import { useTranslations } from "next-intl";
import { HomePageSection } from "./HomePageSection";
import { ButtonCTA } from "./ui/ButtonCTA";

export function CtaSection({hasCTAElement = false}) {
   const t = useTranslations('homePage');
   return (
      <HomePageSection hasCTAElement={hasCTAElement}>
         <div className="flex flex-col items-center justify-center gap-8 w-full md:w-2/3 mx-auto text-center">
            <h2 className="text-5xl md:text-6xl text-foreground-secondary">
               {t("letTalkAboutYourBrand")}
            </h2>
            <p>
               {t("tellUsAboutYourBrand")}
            </p>
            <ButtonCTA className="text-xl" />
         </div>
      </HomePageSection>
   )
}
