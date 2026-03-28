import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { crew } from '../../data/crew';
import SectionTitle from '../ui/SectionTitle';

const EXPERTS_PER_PAGE = 3;

export default function MissionTeam() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(crew.length / EXPERTS_PER_PAGE);

  const paginatedCrew = crew.slice(
    currentPage * EXPERTS_PER_PAGE,
    (currentPage + 1) * EXPERTS_PER_PAGE
  );

  return (
    <section id="team" className="section-shell">
      <SectionTitle 
        eyebrow="Mission Command" 
        title="Visionaries & Experts" 
        subtitle="The architects of humanity's next giant leap. Meet the scientists, engineers, and commanders leading the charge." 
      />

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {paginatedCrew.map((member, i) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                }}
                className="crew-card group relative p-[1px] rounded-xl overflow-hidden min-h-[480px]"
              >
                {/* ID Badge Header */}
                <div className="absolute top-5 right-5 z-20 flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[9px] font-bold text-orange-400 uppercase tracking-[0.4em] mb-1">NASA-JPL HQ</span>
                    <span className="text-[11px] font-mono text-white/40">ID: {(currentPage * EXPERTS_PER_PAGE + 1024 + i).toString(16).toUpperCase()}</span>
                </div>

                <div className="relative h-full bg-slate-950/80 rounded-[11px] overflow-hidden flex flex-col p-8 bg-gradient-to-b from-transparent to-orange-950/20">
                    {/* Tactical Header */}
                    <div className="mb-8">
                        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-orange-500 mb-2">{member.role}</p>
                        <h3 className="text-3xl font-bold text-white group-hover:text-orange-100 transition-colors tracking-tight">{member.name}</h3>
                        <div className="mt-4 flex gap-2">
                             <div className="h-[1px] flex-1 bg-white/10" />
                             <div className="h-[1px] w-4 bg-orange-500/50" />
                        </div>
                    </div>

                    {/* Education & Highlights */}
                    <div className="space-y-6">
                        <div className="relative pl-4 border-l-2 border-orange-500/30">
                            <p className="text-[9px] font-bold uppercase text-orange-400/60 tracking-widest mb-1">Educational Background</p>
                            <p className="text-xs font-medium text-slate-300 tracking-wide">{member.education}</p>
                        </div>
                        
                        <div className="relative pl-4 border-l-2 border-orange-500/30">
                            <p className="text-[9px] font-bold uppercase text-orange-400/60 tracking-widest mb-1">Mission Highlights</p>
                            <p className="text-xs font-medium text-slate-300 tracking-wide leading-relaxed">{member.highlights}</p>
                        </div>

                        <div className="border-t border-white/5 pt-6">
                            <p className="text-[9px] font-bold uppercase text-slate-500 tracking-widest mb-3">Technical Intelligence</p>
                            <p className="text-[13px] leading-relaxed text-slate-400 group-hover:text-slate-200 transition-colors duration-500">
                                {member.bio}
                            </p>
                        </div>
                    </div>
                    
                    {/* Tactical HUD PIP */}
                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-5">
                        <div className="flex gap-2.5 items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                            <span className="text-[9px] font-bold text-orange-500/80 uppercase tracking-widest">Verified Profile</span>
                        </div>
                        <div className="h-[2px] w-16 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                                className="h-full bg-orange-500/60 w-1/2" 
                            />
                        </div>
                    </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* HUD Pagination Controls */}
        <div className="mt-16 flex items-center justify-center gap-6">
            <button 
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-orange-400 disabled:opacity-20 disabled:pointer-events-none transition-colors"
            >
                <span className="w-8 h-[1px] bg-current transition-all group-hover:w-12" />
                Prev
            </button>

            <div className="flex gap-3">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentPage === i 
                            ? 'bg-orange-500 scale-125 shadow-[0_0_8px_rgba(249,115,22,0.6)]' 
                            : 'bg-white/10 hover:bg-white/30'
                        }`}
                        aria-label={`Page ${i + 1}`}
                    />
                ))}
            </div>

            <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-orange-400 disabled:opacity-20 disabled:pointer-events-none transition-colors"
            >
                Next
                <span className="w-8 h-[1px] bg-current transition-all group-hover:w-12" />
            </button>
        </div>
      </div>
    </section>
  );
}

