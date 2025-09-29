import { Arrow } from "./ui/Arrow";

interface OurBrandingProcessProps {
   title: string;
   description: string;
}

export function OurBrandingProcess({ title, description }: OurBrandingProcessProps) {
   return (
      <div className="w-full md:max-w-2/3 mx-auto flex flex-col gap-8 border-b border-foreground pb-12 not-last:mb-12">
         <div className="flex items-center gap-4">
            <Arrow />
            <h2 className="text-2xl font-display">{title}</h2>
         </div>
         <p>
            {description}
         </p>
      </div>
   )
}