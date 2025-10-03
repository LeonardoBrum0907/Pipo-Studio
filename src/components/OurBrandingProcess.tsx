"use client";

import { useState } from "react";
import { Arrow } from "./ui/Arrow";

interface OurBrandingProcessProps {
   title: string;
   description: string;
}

export function OurBrandingProcess({ title, description }: OurBrandingProcessProps) {
   const [expandedBrandingProcessList, setExpandedBrandingProcessList] = useState(false);

   const toggleBrandingProcessList = () => {
      setExpandedBrandingProcessList(!expandedBrandingProcessList);
   }

   return (
      <div className={`w-full md:max-w-2/3 mx-auto flex flex-col gap-8 border-b border-foreground not-last:mb-12 cursor-pointer ${expandedBrandingProcessList ? 'h-[180px] md:h-[200px] pb-12' : 'h-0 pb-16'} transition-all duration-300 overflow-hidden`} onClick={toggleBrandingProcessList}>
         <div className="flex items-center gap-4">
            <Arrow isOpen={expandedBrandingProcessList} />
            <h2 className="text-2xl md:text-4xl font-display">{title}</h2>
         </div>
         <p className="md:text-2xl">
            {description}
         </p>
      </div>
   )
}