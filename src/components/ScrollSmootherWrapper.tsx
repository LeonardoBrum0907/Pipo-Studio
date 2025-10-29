'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

interface ScrollSmootherWrapperProps {
  children: React.ReactNode;
}

export function ScrollSmootherWrapper({ children }: ScrollSmootherWrapperProps) {
  const main = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollSmoother.create({
        smooth: 2, // suavidade do scroll (em segundos)
        effects: true, // ativa data-speed e data-lag
        smoothTouch: 0.1, // suavidade em dispositivos touch
      });
    },
    { scope: main }
  );

  return (
    <div id="smooth-wrapper" ref={main}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}

