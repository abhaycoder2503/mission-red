import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  { title: 'Launch & TMI', text: 'July 30, 2020: Atlas V-541 launch followed by Trans-Mars Injection at Earth escape velocity.', telemetry: 'Velocity: 11.2 km/s' },
  { title: 'Interplanetary Cruise', text: 'A 203-day journey across 471 million kilometers, with 8 Trajectory Correction Maneuvers.', telemetry: 'Dist: 471M km' },
  { title: 'Atmospheric Entry', text: 'Feb 18, 2021: Hypersonic entry at 19,500 kph. 21-meter parachute deployment for initial deceleration.', telemetry: 'V_entry: 19.5k kph' },
  { title: 'Sky Crane Landing', text: 'Soft touchdown at Jezero Crater Delta. Retro-rockets lower Perseverance to the Martian surface.', telemetry: 'Alt: < 21m' },
];

export default function PinnedPhases() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<SVGCircleElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(cards, { autoAlpha: 0, y: 28, scale: 0.97 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3200',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(cards[i - 1], { autoAlpha: 0, y: -20, scale: 0.98, duration: 0.2 }, i * 0.25)
          .to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.24 }, i * 0.25);
      });

      if (pathRef.current && shipRef.current) {
        const path = pathRef.current;
        const ship = shipRef.current;
        const length = path.getTotalLength();

        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        const proxy = { p: 0 };
        tl.to(path, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0);
        tl.to(proxy, {
          p: 1,
          duration: 1,
          ease: 'none',
          onUpdate: () => {
            const p = proxy.p * length;
            const pt = path.getPointAtLength(p);
            const pt2 = path.getPointAtLength(Math.min(p + 1, length));
            const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
            
            gsap.set(ship, { 
                x: pt.x, 
                y: pt.y, 
                rotation: angle,
                transformOrigin: "center center"
            });
          },
        }, 0);

      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="section-shell">
      <SectionTitle eyebrow="Cinematic Sequence" title="Mission Flight Profile" subtitle="Pinned storyboard with path-trace animation." />

      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="trajectory-wrap relative overflow-hidden rounded-2xl bg-slate-950/40 border border-white/5 shadow-2xl">
          {/* Space Background Layer */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-10 left-20 w-1 h-1 bg-white rounded-full animate-pulse" />
            <div className="absolute top-40 left-60 w-0.5 h-0.5 bg-white/60 rounded-full" />
            <div className="absolute top-20 right-40 w-1 h-1 bg-white/80 rounded-full animate-pulse delay-700" />
            <div className="absolute bottom-20 left-1/2 w-0.5 h-0.5 bg-white/40 rounded-full" />
          </div>

          <svg viewBox="0 0 900 400" className="relative z-10 w-full drop-shadow-2xl">
            <defs>
              <radialGradient id="earthGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="70%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
              <radialGradient id="marsGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="70%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>
              <radialGradient id="moonGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Trajectory Path */}
            <path 
                ref={pathRef} 
                d="M60 300 C 220 120, 380 130, 540 210 S 790 320, 860 120" 
                stroke="url(#marsGradient)" 
                strokeWidth="4" 
                fill="none" 
                strokeLinecap="round" 
                className="opacity-40"
                style={{ filter: 'url(#glow)' }}
            />

            {/* Earth & Moon System */}
            <g transform="translate(60, 300)">
              <circle r="22" fill="url(#earthGradient)" className="animate-pulse duration-[3000ms]" style={{ filter: 'url(#glow)' }} />
              <circle cx="28" cy="-15" r="5" fill="url(#moonGradient)" />
            </g>

            {/* Mars */}
            <g transform="translate(860, 120)">
              <circle r="18" fill="url(#marsGradient)" style={{ filter: 'url(#glow)' }} />
              <circle r="20" fill="none" stroke="#f97316" strokeWidth="0.5" strokeDasharray="4 4" className="animate-spin duration-[10s]" />
            </g>

            {/* Rocket ship SVG */}
            <g ref={shipRef}>
                <path 
                    d="M-8,-4 L8,0 L-8,4 L-4,0 Z" 
                    fill="#ffffff" 
                    style={{ filter: 'url(#glow)' }}
                />
                <circle r="2" cx="-6" fill="#f97316" className="animate-pulse" />
            </g>
          </svg>
        </div>


        <div className="relative h-[280px] md:h-[320px]">
          {phases.map((p, i) => (
            <article
              key={p.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="phase-card absolute inset-0"
            >
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-[0.2em] text-orange-400">Phase {String(i + 1).padStart(2, '0')}</p>
                <div className="text-[10px] font-mono text-orange-300/40 uppercase tracking-tighter bg-orange-500/5 px-2 py-0.5 rounded border border-orange-500/10">
                    {p.telemetry}
                </div>
            </div>
            <h3 className="mt-1 text-2xl font-semibold md:text-3xl">{p.title}</h3>
            <p className="mt-4 max-w-xl text-slate-300">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}