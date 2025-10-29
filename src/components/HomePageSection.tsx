import Image from "next/image";
import { ButtonCTA } from "./ui/ButtonCTA";

interface HomePageSectionProps {
   hasCTAElement?: boolean;
   children: React.ReactNode;
   className?: string;
   speed?: string;
   id?: string;
}

export function HomePageSection({ children, hasCTAElement = false, className, speed, id }: HomePageSectionProps) {
   return (
      <section id={id} className={`min-h-[calc(100vh-110px)] px-8 md:px-16 py-8 not-first:mt-16 flex flex-col gap-8`} data-lag={speed}>
         {hasCTAElement && (
            <div className="flex justify-between items-center">
               <Image src="/logo.svg" alt="Pipo Studio" width={100} height={100} />

               <ButtonCTA type="secondary" />
            </div>
         )}
         <div className={`flex flex-col justify-center flex-1 ${className}`}>
            {children}
         </div>
      </section>
   )
}