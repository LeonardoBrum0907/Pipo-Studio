interface HomePageSectionProps {
   hasCTAElement?: boolean;
   children: React.ReactNode;
   className?: string;
}

export function HomePageSection({ children, hasCTAElement = false, className }: HomePageSectionProps) {
   return (
      <section className={`min-h-[calc(100vh-110px)] ${className}`}>
         {hasCTAElement && (
            <div className="flex justify-center items-center">
               <button className="bg-foreground-secondary text-white px-4 py-2 rounded-md">
                  CTA
               </button>
            </div>
         )}
         {children}
      </section>
   )
}