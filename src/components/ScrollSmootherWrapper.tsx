'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

interface ScrollSmootherWrapperProps {
   children: React.ReactNode;
}

export function ScrollSmootherWrapper({ children }: ScrollSmootherWrapperProps) {
   const main = useRef<HTMLDivElement>(null);
   const pathname = usePathname();

   useGSAP(
      () => {
         ScrollSmoother.create({
            smooth: 3, // suavidade do scroll (em segundos)
            effects: true, // ativa data-speed e data-lag
            smoothTouch: 0.1, // suavidade em dispositivos touch
            
         });

         const itemsFadeUp = gsap.utils.toArray('.fadeUp');
         itemsFadeUp.forEach((item: any) => {
            gsap.from(item, {
               y: 200,
               scrollTrigger: {
                  trigger: item,
                  start: 'top bottom',
                  end: 'top 75%',
                  scrub: true,
                  // markers: true,
               }
            })
         })

         gsap.fromTo('.fadeIn', {
            opacity: 0,
            y: 100,
            delay: 0.3,
            duration: 0.6,
         }, {
            opacity: 1,
            y: 0,
            delay: 0.3,
            duration: 0.6,
         })
      },
      { scope: main, dependencies: [pathname] }
   );

   return (
      <div id="smooth-wrapper" ref={main}>
         <div id="smooth-content">
            {children}
         </div>
      </div>
   );
}

