
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function GlassCursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const newPoint = { x: mouseX, y: mouseY, id: trailId++ };
      
      setTrail(prev => [...prev.slice(-8), newPoint]);
    };

    const clearOldPoints = setInterval(() => {
      setTrail(prev => prev.slice(-8));
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(clearOldPoints);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className="absolute w-2 h-2 rounded-full bg-archon-primary/30 shadow-lg shadow-archon-primary/50"
            style={{
              left: point.x - 4,
              top: point.y - 4,
            }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
