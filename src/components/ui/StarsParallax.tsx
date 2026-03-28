import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import marsBg from '../../assets/mars-bg.png';

gsap.registerPlugin(ScrollTrigger);

export default function StarsParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marsRef = useRef<HTMLDivElement>(null);
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const l3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const starLayers = [l1.current, l2.current, l3.current];
        const scrollSpeeds = [-5, -10, -15];
        const marsScroll = -2;
        
        starLayers.forEach((layer, i) => {
            if (!layer) return;
            gsap.to(layer, {
                yPercent: scrollSpeeds[i],
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                },
            });
        });

        if (marsRef.current) {
            gsap.to(marsRef.current, {
                yPercent: marsScroll,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                },
            });
        }

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5);
            const yPos = (clientY / window.innerHeight - 0.5);

            if (marsRef.current) {
                gsap.to(marsRef.current, {
                    x: xPos * 25,
                    y: yPos * 25,
                    duration: 1.5,
                    ease: 'power2.out',
                });
            }
            if (l1.current) gsap.to(l1.current, { x: xPos * 40, y: yPos * 40, duration: 1.2, ease: 'power2.out' });
            if (l2.current) gsap.to(l2.current, { x: xPos * 70, y: yPos * 70, duration: 1, ease: 'power2.out' });
            if (l3.current) gsap.to(l3.current, { x: xPos * 100, y: yPos * 100, duration: 0.8, ease: 'power2.out' });
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden bg-transparent">
      {/* Background Mars scenery */}
      <div 
        ref={marsRef} 
        className="mars-scenery-backdrop"
        style={{ backgroundImage: `url(${marsBg})` }}
      />
      
      {/* Star layers */}
      <div ref={l1} className="star-layer layer-1" />
      <div ref={l2} className="star-layer layer-2" />
      <div ref={l3} className="star-layer layer-3" />
      
      {/* Darkening overlay for contrast */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}