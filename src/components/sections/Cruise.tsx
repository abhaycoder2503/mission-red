import { useEffect, useRef, useState, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import { trajectoryData } from '../../data/mission';
import CountUp from '../ui/CountUp';

gsap.registerPlugin(ScrollTrigger);

type Route = 'hohmann' | 'fast';

export default function Cruise() {
  const [route, setRoute] = useState<Route>('hohmann');
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!progressRef.current || !sectionRef.current) return;
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => setScrollProgress(self.progress),
      });

      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const data = trajectoryData[route as keyof typeof trajectoryData];

  return (
    <section id="cruise" ref={sectionRef} className="section-shell">
      <SectionTitle eyebrow="Phase 02" title="Deep Space Cruise" subtitle="Trajectory planning and long-haul mission operations." />

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="reveal space-y-8">
          <div className="glass-panel p-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-400">Route Simulator</p>
                    <p className="text-[10px] text-orange-300/40 uppercase font-mono mt-1">
                        Est. Dist: <CountUp end={225 - (scrollProgress * 4.2)} decimals={1} />M km
                    </p>
                </div>
                <div className="hud-chip">System Stable</div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setRoute('hohmann')} 
                className={`rounded border px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all ${
                    route === 'hohmann' ? 'bg-orange-500 text-black border-orange-500' : 'bg-white/5 text-white border-white/10 hover:border-white/30'
                }`}
              >
                Hohmann
              </button>
              <button 
                onClick={() => setRoute('fast')} 
                className={`rounded border px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all ${
                    route === 'fast' ? 'bg-orange-500 text-black border-orange-500' : 'bg-white/10 text-white border-white/10 hover:border-white/30'
                }`}
              >
                Fast Transfer
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="space-y-1">
                    <p className="text-[10px] uppercase text-slate-400">Duration</p>
                    <p className="text-sm font-semibold text-orange-100">{data.duration}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] uppercase text-slate-400">Fuel Intensity</p>
                    <p className="text-sm font-semibold text-orange-100">{data.fuel}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] uppercase text-slate-400">System Risk</p>
                    <p className="text-sm font-semibold text-orange-100">{data.risk}</p>
                </div>
            </div>
            
            <p className="mt-6 text-sm leading-relaxed text-slate-300">{data.note}</p>
          </div>

          <div className="glass-panel p-8">
            <h3 className="text-lg font-semibold text-white/90">Communication Latency</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Round-trip signals to Earth currently take <b>12:43m</b>. 
                All onboard systems are in High-Autonomy mode.
            </p>
          </div>
        </div>

        <div className="reveal relative flex flex-col items-center justify-center lg:sticky lg:top-32 h-[450px] overflow-hidden rounded-3xl border border-orange-500/20 bg-orange-950/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,158,100,0.1)_0%,transparent_70%)]" />
            
            {/* Stable 2D Telemetry Scenery */}
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-8 relative">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-orange-400/40 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(255,158,100,0.6)]" />
                    </div>
                </div>
                <h4 className="text-xs font-bold tracking-[0.4em] uppercase text-orange-400">Trajectory Locked</h4>
                <p className="mt-2 text-[10px] font-mono text-orange-300/60 uppercase">
                    Ship Vector: {route === 'hohmann' ? 'Delta-V Optimal' : 'Burst Momentum'}<br />
                    Status: Powered Transit
                </p>
            </div>

            <div className="absolute top-6 left-6 flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[8px] font-bold text-orange-400/50 uppercase tracking-widest">Live Uplink</span>
            </div>
            
            <div className="absolute bottom-6 left-6 text-[10px] font-mono text-orange-300/40 uppercase">
                Vector: Trajectory Alpha-9<br />
                Status: Powered Cruise
            </div>
        </div>
      </div>
    </section>
  );
}