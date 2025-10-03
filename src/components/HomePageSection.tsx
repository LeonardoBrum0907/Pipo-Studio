import Image from "next/image";
import { ButtonCTA } from "./ui/ButtonCTA";

interface HomePageSectionProps {
   hasCTAElement?: boolean;
   children: React.ReactNode;
   className?: string;
}

export function HomePageSection({ children, hasCTAElement = false, className }: HomePageSectionProps) {
   return (
      <section className={`min-h-[calc(100vh-110px)] px-8 md:px-16 not-first:mt-16 ${className}`}>
         {hasCTAElement && (
            <div className="flex justify-between items-center">
               <Image src="/logo.svg" alt="Pipo Studio" width={100} height={100} />

               <ButtonCTA type="secondary" />
            </div>
         )}
         {children}
      </section>
   )
}