import Image from "next/image";

export function Arrow() {
   return (
      <div className="h-10 w-10 rounded-full border-2 border-foreground-secondary flex items-center justify-center">
         <Image src="/icons/arrow.svg" alt="Seta para baixo" width={15} height={15} />
      </div>
   )
}  