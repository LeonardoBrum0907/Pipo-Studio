import Image from "next/image";

export default function Home() {
   return (
      <div className="font-sans min-h-screen flex flex-col">
         <header className="w-full p-8 flex justify-between items-center">
            <Image src="/logo.svg" alt="Pipo Studio" width={100} height={100} />
            <nav>
               <ul className="flex gap-4 text-foreground-secondary">
                  <li>about.</li>
                  <li>cases.</li>
                  <li>contact.</li>
               </ul>
            </nav>
         </header>
         <main className="flex flex-1 flex-col gap-[32px] justify-center items-center">
            <h1 className="text-4xl">Pipo Studio - Em desenvolvimento</h1>
         </main>
      </div>
   );
}
