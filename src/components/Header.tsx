import Link from "next/link";
import Image from "next/image";

export function Header() {
   return (
      <header className="w-full px-8 h-[110px] flex justify-between items-center">
         <Image src="/logo.svg" alt="Pipo Studio" width={100} height={100} />
         <nav>
            <ul className="flex gap-4 text-foreground-secondary">
               <Link href="/about">about.</Link>
               <Link href="/cases">cases.</Link>
               <Link href="/contact">contact.</Link>
            </ul>
         </nav>
      </header>

   )
}