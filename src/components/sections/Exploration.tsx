import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { hotspots } from '../../data/mission';
import marsSurface from '../../assets/mars-surface.png';

export default function Exploration() {
  const [active, setActive] = useState(hotspots[0]);

  return (
    <section id="exploration" className="section-shell">
      <SectionTitle eyebrow="Phase 04" title="Surface Exploration" subtitle="Select a hotspot to inspect discoveries." />

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="reveal relative aspect-[16/9] overflow-hidden rounded-sm border border-white/20 bg-stone-950">
          <img 
            src={marsSurface} 
            alt="Mars surface orbital view" 
            className="absolute inset-0 h-full w-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[5]" />
          
          {/* Scientific Grid Overlay */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none z-10 opacity-30">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/20" />
            ))}
          </div>

          {hotspots.map((h) => (
            <button
              key={h.id}
              onClick={() => setActive(h)}
              className={`hotspot transition-all duration-300 ${
                  active.id === h.id ? 'scale-125 bg-white shadow-[0_0_15px_#fff]' : 'bg-orange-400'
              }`}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              aria-label={h.title}
            />
          ))}

          <div className="absolute bottom-4 left-4 text-[9px] font-mono text-white/20 uppercase tracking-widest z-20">
            Surface Map Alpha-1 // Latency: 12.4m
          </div>

          {/* Interactive 2D Rover Icon */}
          <motion.div 
            className="absolute z-30 pointer-events-none"
            animate={{ 
                left: `${active.x}%`, 
                top: `${active.y}%` 
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-500 drop-shadow-[0_0_8px_rgba(255,122,89,0.5)]">
                    <rect x="6" y="14" width="12" height="6" rx="2" fill="currentColor" opacity="0.8" />
                    <circle cx="8" cy="20" r="2" fill="black" />
                    <circle cx="16" cy="20" r="2" fill="black" />
                    <path d="M12 14V8L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="16" cy="6" r="1.5" fill="currentColor" className="flicker" />
                </svg>
            </div>
          </motion.div>

          {/* Lightweight Dust Particle Layer */}
          <div className="dust-container opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="dust" 
                style={{ 
                    left: `${Math.random() * 100}%`, 
                    top: `${Math.random() * 100}%`,
                    width: `${2 + Math.random() * 4}px`,
                    height: `${2 + Math.random() * 4}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${7 + Math.random() * 5}s`
                }} 
              />
            ))}
          </div>
        </div>

        <motion.aside
          key={active.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="reveal glass-panel flex flex-col p-8"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-orange-400">Target Intel</p>
            <div className="hud-chip">Signal Locked</div>
          </div>
          
          <h3 className="text-2xl font-semibold text-white">{active.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{active.detail}</p>

          <div className="mt-auto pt-8">
            <button
                className="w-full rounded-sm border border-orange-500/50 bg-orange-500/5 px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase text-orange-500 transition-all hover:bg-orange-500 hover:text-black"
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
            >
                Return to Command
            </button>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}