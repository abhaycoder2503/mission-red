import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MissionAudio() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Note: Local audio file would need to be in public/audio/mission-ambience.mp3
  // This is a placeholder for the logic to ensure the UI and system are ready.
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.loop = true;
    }
  }, []);

  const toggleAudio = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
        if (isMuted) {
            audioRef.current.play().catch(() => {
                console.log('Audio playback requires user interaction.');
                setIsMuted(true);
            });
        } else {
            audioRef.current.pause();
        }
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex items-center gap-4">
      <button 
        onClick={toggleAudio}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all hover:border-orange-500/50"
        aria-label={isMuted ? "Unmute mission ambiance" : "Mute mission ambiance"}
      >
        <div className="absolute inset-0 rounded-full bg-orange-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
        
        {isMuted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400">
            <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-orange-500">
            <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 12C17.004 13.3308 16.4774 14.6024 15.54 15.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <AnimatePresence>
        {!isMuted && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="hidden md:block"
          >
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400/60 font-mono">
              Ambiant Link Active
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src="/audio/mission-ambience.mp3" />
    </div>
  );
}
