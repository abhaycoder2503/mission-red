import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCinematicSections() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('main section[id]');
      sections.forEach((section, index) => {
        if (index === 0) return; // keep hero immediate
        gsap.fromTo(
          section,
          { opacity: 0.45, y: 48, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              end: 'top 45%',
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}