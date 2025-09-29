import { useTranslations } from "next-intl";
import Link from "next/link";

interface ButtonCTAProps {
   children?: React.ReactNode;
   type?: "primary" | "secondary";
   className?: string;
}

export function ButtonCTA({ children, type = "primary", className }: ButtonCTAProps) {
   const t = useTranslations('homePage');
   return (
      <Link href="/contact" className={`px-8 rounded-full hover:scale-101 transition-all ${type === "primary" ? "bg-foreground-secondary text-white py-4" : "bg-transparent border border-foreground-secondary text-foreground-secondary py-2"} ${className}`}>
         {children || t("cta")}
      </Link>
   )
}