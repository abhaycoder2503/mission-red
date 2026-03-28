import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const steps = ['Entry Interface', 'Heat Shield Peak', 'Parachute Deploy', 'Powered Descent', 'Touchdown'];

export default function Landing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edl-step',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="landing" ref={sectionRef} className="section-shell relative overflow-hidden">
      <div className="dust" />
      <SectionTitle eyebrow="Phase 03" title="Mars Entry, Descent, Landing" subtitle="The seven-minute ballet where precision is everything." />

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {steps.map((s, i) => (
          <div key={s} className="edl-step glass-panel flex flex-col items-center justify-center p-8 text-center border-white/5">
            <span className="mb-4 text-[10px] font-bold tracking-[0.2em] text-orange-400">STAGE 0{i+1}</span>
            <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/90 leading-tight">
              {s}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}