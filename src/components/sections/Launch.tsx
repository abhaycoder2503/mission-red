import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import { launchCards } from '../../data/mission';

gsap.registerPlugin(ScrollTrigger);

export default function Launch() {
  const sectionRef = useRef<HTMLElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Periodic flame flicker
      if (flameRef.current) {
        gsap.to(flameRef.current, {
          scaleY: 1.4,
          opacity: 0.6,
          duration: 0.08,
          repeat: -1,
          yoyo: true,
          transformOrigin: 'top',
          ease: 'sine.inOut',
        });
      }

      if (rocketRef.current && sectionRef.current) {
        // Main launch climb
        gsap.fromTo(
          rocketRef.current,
          { y: 150 },
          {
            y: -250,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 1.5,
            },
          }
        );

        // G-Force Shake
        gsap.to(rocketRef.current, {
          x: '+=2',
          duration: 0.04,
          repeat: -1,
          yoyo: true,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play pause resume pause',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="launch" ref={sectionRef} className="section-shell">
      <SectionTitle eyebrow="Phase 01" title="Launch & Earth Departure" subtitle="Ignition, staging, and transfer setup." />

      <div className="grid gap-6 md:grid-cols-3">
        {launchCards.map((card, i) => (
          <article key={card.title} className="reveal glass-panel p-6" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="hud-chip mb-4">Stage {String(i+1).padStart(2, '0')}</div>
            <h3 className="text-xl font-semibold text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{card.desc}</p>
            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Target</span>
                <span className="text-xs font-medium text-orange-400">{card.metric}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="reveal relative mt-32 flex justify-center py-20">
        {/* Decorative Smoke Puffs */}
        <div className="smoke-puff translate-x-[-80px] translate-y-[100px]" />
        <div className="smoke-puff translate-x-[60px] translate-y-[130px]" />
        <div className="smoke-puff translate-x-[10px] translate-y-[150px]" />
        
        <div ref={rocketRef} className="rocket">
          <div ref={flameRef} className="flame" />
        </div>
      </div>
    </section>
  );
}