import { HomePageSection } from "@/components/HomePageSection";
import { ButtonCTA } from "@/components/ui/ButtonCTA";
import { Arrow } from "@/components/ui/Arrow";

export default function Home() {
   return (
      <HomePageSection className="flex flex-col gap-10 items-center justify-center">
         <div className="flex items-center justify-center">
            <h1 className="w-full md:max-w-[45rem] text-6xl md:text-8xl text-center font-display">
               We build brands with <b>flavor, strategy, and presence.</b>
            </h1>
         </div>
         <ButtonCTA className="text-2xl" />
         <Arrow />
      </HomePageSection>
   );
}
