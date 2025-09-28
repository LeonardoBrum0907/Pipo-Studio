import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Header() {
   const t = useTranslations('home');

   const links = [
      { href: '/about', label: t('about') },
      { href: '/cases', label: t('cases') },
      { href: '/contact', label: t('contact') },
   ]
   
   return (
      <header className="w-full px-8 h-[110px] flex justify-between items-center">
         <Image src="/logo.svg" alt="Pipo Studio" width={100} height={100} />
         <nav>
            <ul className="flex gap-4 text-foreground-secondary">
               {links.map((link) => (
                  <Link href={link.href} key={link.label}>{link.label}</Link>
               ))}
            </ul>
         </nav>
      </header>

   )
}