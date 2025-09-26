import Image from "next/image";
import Link from "next/link";

export default function Home() {
   return (
      <div className="font-sans min-h-screen flex flex-col">
         <header className="w-full p-8 flex justify-between items-center">
            <Image src="/logo.svg" alt="Pipo Studio" width={100} height={100} />
            <nav>
               <ul className="flex gap-4 text-foreground-secondary">
                  <Link href="/about">about.</Link>
                  <Link href="/cases">cases.</Link>
                  <Link href="/contact">contact.</Link>
               </ul>
            </nav>
         </header>
         <main className="flex flex-1 flex-col gap-[32px] justify-center items-center">
            <h1 className="text-4xl">Pipo Studio - Em desenvolvimento</h1>
         </main>
      </div>
   );
}
