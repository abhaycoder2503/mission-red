import { useMemo } from 'react';
import { motion } from 'framer-motion';

const DUST_PARTICLES = 30;

export default function DustStormOverlay({ activeId }: { activeId: string }) {
  // Only show in Mars-related sections
  const isMarsSection = ['hero', 'exploration', 'team', 'conclusion'].includes(activeId);

  const particles = useMemo(() => {
    return Array.from({ length: DUST_PARTICLES }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  if (!isMarsSection) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden opacity-30">
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-full w-full"
        >
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    animate={{ 
                        x: [0, 400, 0],
                        y: [0, -100, 0],
                        opacity: [0, 0.6, 0]
                    }}
                    transition={{ 
                        duration: p.duration, 
                        repeat: Infinity, 
                        delay: p.delay,
                        ease: 'easeInOut' 
                    }}
                    className="absolute rounded-full bg-orange-400"
                    style={{ 
                        left: p.left, 
                        top: p.top, 
                        width: p.size, 
                        height: p.size,
                        filter: 'blur(1px)'
                    }}
                />
            ))}
        </motion.div>
    </div>
  );
}
