import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/sections/Hero';
import Launch from './components/sections/Launch';
import Cruise from './components/sections/Cruise';
import Landing from './components/sections/Landing';
import Exploration from './components/sections/Exploration';
import Conclusion from './components/sections/Conclusion';
import StarsParallax from './components/ui/StarsParallax';
import MissionNav from './components/ui/MissionNav';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useActiveSection } from './hooks/useActiveSection';
import PinnedPhases from './components/sections/PinnedPhases';
import MissionIntel from './components/sections/MissionIntel';
import { useCinematicSections } from './hooks/useCinematicSections';
import MissionAudio from './components/ui/MissionAudio';
import MissionTeam from './components/sections/MissionTeam';
import MissionTelemetry from './components/ui/MissionTelemetry';
import DustStormOverlay from './components/ui/DustStormOverlay';

const sections = [
    { id: 'hero', label: 'Start' },
    { id: 'launch', label: 'Launch' },
    { id: 'timeline', label: 'Profile' },
    { id: 'cruise', label: 'Cruise' },
    { id: 'landing', label: 'EDL' },
    { id: 'exploration', label: 'Explore' },
    { id: 'team', label: 'Team' },
    { id: 'intel', label: 'Intel' },
    { id: 'conclusion', label: 'Final' },
];

const sectionIds = sections.map(s => s.id);

export default function App() {
    useSmoothScroll();
    useScrollReveal();
    useCinematicSections();

    const activeId = useActiveSection(sectionIds);
    const [progress, setProgress] = useState(0);
    const [isBooting, setIsBooting] = useState(true);

    useEffect(() => {
        let lastKnownScrollPosition = 0;
        let ticking = false;

        const updateProgress = (scrollPos: number) => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const newProgress = docHeight > 0 ? (scrollPos / docHeight) * 100 : 0;
            setProgress(newProgress);
        };

        const onScroll = () => {
            lastKnownScrollPosition = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateProgress(lastKnownScrollPosition);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        const timer = setTimeout(() => setIsBooting(false), 2400);

        return () => {
            window.removeEventListener('scroll', onScroll);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="app-shell relative overflow-x-clip text-slate-100">
            <AnimatePresence>
                {isBooting && (
                    <motion.div
                        key="boot"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
                    >
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: 200 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-[1px] bg-orange-500"
                        />
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-4 text-[10px] font-medium tracking-[0.4em] uppercase text-orange-300/60"
                        >
                            Establishing Uplink...
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="hud-root">
                <div className="hud-grid" />
                <div className="scanline-overlay" />
                <div className="scanner-line" />
            </div>
            
            <StarsParallax />
            <DustStormOverlay activeId={activeId} />
            <MissionTelemetry activeId={activeId} />
            <MissionNav sections={sections} activeId={activeId} />

            <div className="fixed left-0 top-0 z-40 h-[2px] w-full bg-white/5">
                <div 
                    className="h-full bg-orange-500 shadow-[0_0_12px_rgba(255,158,100,0.6)] transition-[width] duration-150" 
                    style={{ width: `${progress}%` }} 
                />
            </div>

            <main>
                <Hero />
                <div className="scene-divider" />
                <Launch />
                <div className="scene-divider" />
                <PinnedPhases />
                <div className="scene-divider" />
                <Cruise />
                <div className="scene-divider" />
                <Landing />
                <div className="scene-divider" />
                <Exploration />
                <div className="scene-divider" />
                <MissionTeam />
                <div className="scene-divider" />
                <MissionIntel />
                <div className="scene-divider" />
                <Conclusion />
            </main>

            <footer className="px-6 py-24 text-center text-[11px] font-medium tracking-[0.2em] uppercase text-slate-500 md:px-12 lg:px-20">
                Mission Red • Final Protocol Active • 2026
            </footer>
        </div>
    );
}