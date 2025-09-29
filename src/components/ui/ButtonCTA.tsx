import { useTranslations } from "next-intl";
import Link from "next/link";

interface ButtonCTAProps {
   children?: React.ReactNode;
   type?: "primary" | "secondary";
   className?: string;
}

export function ButtonCTA({ children, type = "primary", className }: ButtonCTAProps) {
   const t = useTranslations('home');
   return (
      <Link href="/contact" className={`px-8 py-4 rounded-full hover:opacity-90 transition-opacity ${type === "primary" ? "bg-foreground-secondary text-white" : "bg-transparent border border-foreground-secondary text-foreground-secondary"} ${className}`}>
         {children || t("cta")}
      </Link>
   )
}