import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "./Button";

interface ButtonCTAProps {
   children?: React.ReactNode;
   type?: "primary" | "secondary";
   className?: string;
}

export function ButtonCTA({ children, type = "primary", className }: ButtonCTAProps) {
   const t = useTranslations('homePage');
   return (
      <>
         {type === "primary" && (
            <Button asChild size="lg" className={`px-8 transition-all bg-foreground-secondary text-white py-6 ${className}`}>
               <Link href="/contact">
                  {children || t("cta")}
               </Link>
            </Button>
         )}
         {type === "secondary" && (
            <Button asChild className={`px-8 transition-all bg-transparent border border-foreground-secondary text-foreground-secondary ${className}`}>
               <Link href="/contact">
                  {children || t("cta")}
               </Link>
            </Button>
         )}
      </>
   )}