import { HomePageSection } from "@/components/HomePageSection";
import { ButtonCTA } from "@/components/ui/ButtonCTA";
import { Arrow } from "@/components/ui/Arrow";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
   const t = useTranslations('home');

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
            <div className="flex gap-8 h-[70vh]">
               <Image src="/images/image-1.png" alt="Image 1" width={500} height={500}className="flex-2 object-cover rounded-xl" />
               <Image src="/images/image-2.png" alt="Image 2" width={500} height={500}className="flex-1 object-cover rounded-xl" />
            </div>
            <div className="flex gap-8 h-[70vh]">
               <Image src="/images/image-4.png" alt="Image 1" width={500} height={500}className="flex-1 object-cover rounded-xl" />
               <Image src="/images/image-3.png" alt="Image 2" width={500} height={500}className="flex-2 object-cover rounded-xl" />
            </div>
         </HomePageSection>
      </>
   );
}
