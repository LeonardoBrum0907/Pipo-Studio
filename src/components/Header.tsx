import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Separator } from "./ui/Separator";

export function Header() {
   const t = useTranslations('homePage');

   const links = [
      { href: '/', label: t('about') },
      { href: '/cases', label: t('cases') },
      { href: '/contact', label: t('contact') },
   ]

   return (
      <header className="w-full px-8 h-[110px] flex justify-between items-center">
         <Image src="/logo.svg" alt="Pipo Studio" width={100} height={100} />
         <nav className="flex items-center gap-4 h-5">
            <ul className="flex gap-4 text-foreground-secondary">
               {links.map((link) => (
                  <Link href={link.href} key={link.label} className="border-b-2 border-transparent hover:border-foreground-secondary">{link.label}</Link>
               ))}
            </ul>
            <Separator orientation="vertical" />
            <LocaleSwitcher />
         </nav>
      </header>

   )
}