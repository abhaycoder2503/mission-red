import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import CountUp from '../ui/CountUp';
import { intelMetrics, techBriefs } from '../../data/intel';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function MissionIntel() {
  const [tab, setTab] = useState(0);
  const [entryAngle, setEntryAngle] = useState(13.2);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => setScrollProgress(self.progress),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const risk = useMemo(() => {
    if (entryAngle < 11.5 || entryAngle > 15) return { label: 'CRITICAL RISK', color: 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]' };
    if (entryAngle < 12.3 || entryAngle > 14.4) return { label: 'WARNING', color: 'bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.5)] text-black' };
    return { label: 'NOMINAL', color: 'bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.5)] text-black' };
  }, [entryAngle]);

  // SVG Trajectory Logic
  const trajectoryRotation = (entryAngle - 13.5) * 5 + (scrollProgress * 2); 

  return (
    <section id="intel" ref={sectionRef} className="section-shell">
      <SectionTitle
        eyebrow="Mission Intel"
        title="Technical Context & Surface Conditions"
        subtitle="Live telemetry and data explainer for key mission systems."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {intelMetrics.map((m, i) => (
          <article key={m.label} className="reveal glass-panel p-6 border-l-2 border-l-orange-500/20">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">{m.label}</p>
            <p className="mt-3 text-3xl font-semibold text-orange-400">
              <CountUp 
                end={m.label.includes('Distance') ? m.value - (scrollProgress * 4.2) : m.value} 
                decimals={m.decimals} 
                suffix={m.suffix} 
              />
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <article className="reveal glass-panel flex flex-col p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">EDL Entry Angle Simulator</h3>
            <div className={`rounded-sm px-3 py-1 text-[10px] font-bold tracking-widest ${risk.color}`}>{risk.label}</div>
          </div>
          
          <div className="relative mt-8 flex h-[240px] items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-white/5">
            {/* Visual SVG for Trajectory */}
            <svg viewBox="0 0 400 200" className="h-full w-full">
                {/* Mars Surface Arc */}
                <path d="M0 180 Q 200 140 400 180" stroke="#ff7a59" strokeWidth="2" fill="none" opacity="0.3" />
                <path d="M0 180 Q 200 140 400 180" stroke="#ff7a59" strokeWidth="1" fill="none" className="flicker" />
                
                {/* Atmosphere Layer */}
                <path d="M0 120 Q 200 80 400 120" stroke="#ff9e64" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.2" />

                {/* Craft Trajectory */}
                <motion.g animate={{ rotate: trajectoryRotation }} style={{ originX: '200px', originY: '180px' }}>
                    <line x1="200" y1="20" x2="200" y2="180" stroke="#fff" strokeWidth="2" strokeDasharray="10 5" opacity="0.4" />
                    <circle cx="200" cy="20" r="4" fill="#ff9e64" />
                </motion.g>

                {/* HUD Elements */}
                <text x="10" y="30" fill="gray" fontSize="10" className="uppercase tracking-widest font-mono">Entry Vector High</text>
                <text x="10" y="190" fill="gray" fontSize="10" className="uppercase tracking-widest font-mono">Atmosphere Interface</text>
            </svg>
            
            <div className="absolute top-4 right-4 text-right">
                <p className="text-[10px] text-slate-500 uppercase">Input Angle</p>
                <p className="text-2xl font-mono font-bold text-orange-400">{entryAngle.toFixed(1)}°</p>
            </div>
          </div>

          <div className="mt-8">
            <input
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10"
                type="range"
                min={10}
                max={17}
                step={0.1}
                value={entryAngle}
                onChange={(e) => setEntryAngle(Number(e.target.value))}
            />
            <div className="mt-4 flex justify-between text-[10px] font-medium uppercase tracking-widest text-slate-500">
                <span>Shallow (Skip-out)</span>
                <span>Steep (Burn-up)</span>
            </div>
          </div>
        </article>

        <article className="reveal glass-panel p-8">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-6 font-mono border-b border-white/5 pb-2">Technical Briefings</p>
          <div className="flex flex-wrap gap-3">
            {techBriefs.map((t, i) => (
              <button
                key={t.title}
                onClick={() => setTab(i)}
                className={`rounded border px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all ${
                  tab === i ? 'bg-orange-500 text-black border-orange-500' : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>
          <div className="mt-10 relative">
            <motion.p 
                key={tab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm leading-relaxed text-slate-300"
            >
                {techBriefs[tab].body}
            </motion.p>
          </div>
        </article>
      </div>
    </section>
  );
}