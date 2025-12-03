
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useBrandKit } from './BrandKit';

interface ModuleButton {
  name: string;
  icon: string;
  position: { x: number; y: number };
  color: string;
}

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const modules: ModuleButton[] = [
  { name: 'REMOTION', icon: '▶', position: { x: -200, y: -100 }, color: '#1FC3FF' },
  { name: 'TRADINGAGENTS', icon: '📈', position: { x: 200, y: -100 }, color: '#884DFF' },
  { name: 'NOTEGEN', icon: '🎤', position: { x: -200, y: 0 }, color: '#A9FFCB' },
  { name: 'MEDIACRAWLER', icon: '📦', position: { x: 200, y: 0 }, color: '#D1A85C' },
  { name: 'ML FOR BEGINNERS', icon: '🌐', position: { x: -200, y: 100 }, color: '#1FC3FF' },
  { name: 'DREAMGRAFTOD', icon: '💎', position: { x: 200, y: 100 }, color: '#884DFF' },
];

// Breakpoint configuration
const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
};

export default function InteractiveHero() {
  const { theme, brandName, tagline } = useBrandKit();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');
  const controls = useAnimation();

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.mobile) {
        setBreakpoint('mobile');
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };
    
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  useEffect(() => {
    if (breakpoint === 'desktop') {
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePosition({ x: x * 10, y: y * 10 });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [breakpoint]);

  useEffect(() => {
    if (breakpoint === 'desktop') {
      controls.start({
        rotateX: mousePosition.y,
        rotateY: mousePosition.x,
        transition: { duration: 0.4 }
      });
    }
  }, [mousePosition, controls, breakpoint]);

  // Responsive module positions based on breakpoint
  const getResponsivePosition = (module: ModuleButton, index: number) => {
    switch (breakpoint) {
      case 'mobile':
        // Stack modules in 2 columns on mobile
        const row = Math.floor(index / 2);
        const col = index % 2;
        return {
          x: col === 0 ? -60 : 60,
          y: (row - 1) * 70
        };
      case 'tablet':
        // Closer positioning for tablet
        return {
          x: module.position.x * 0.65,
          y: module.position.y * 0.75
        };
      case 'desktop':
      default:
        // Full desktop positioning
        return module.position;
    }
  };

  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';
  const isDesktop = breakpoint === 'desktop';

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{
        background: `radial-gradient(circle at center, ${theme.colors.stellarBlack}dd 0%, ${theme.colors.stellarBlack} 70%)`,
        backgroundImage: `url('/lovable-uploads/2cc99226-eb1d-41f5-b1b1-3df839964bd7.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isDesktop ? 'fixed' : 'scroll'
      }}
    >
      {/* Ambient Particles - reduced on mobile/tablet for performance */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 15 : isTablet ? 30 : 50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: theme.colors.plasmaBlue,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Central Cockpit Area */}
      <motion.div
        className="relative flex flex-col items-center z-10 w-full max-w-7xl mx-auto"
        animate={isDesktop ? controls : {}}
        style={{ perspective: 1000 }}
      >
        {/* Brand Title */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-2 sm:mb-4 tracking-wider px-4"
            style={{ 
              fontFamily: theme.fonts.title.join(', '),
              color: theme.colors.plasmaBlue,
              textShadow: `0 0 30px ${theme.colors.plasmaBlue}80`,
            }}
          >
            {brandName}
          </h1>
          <p 
            className="text-sm sm:text-xl md:text-2xl tracking-wide px-4 max-w-4xl mx-auto"
            style={{ 
              fontFamily: theme.fonts.body.join(', '),
              color: theme.colors.cosmicWhite,
            }}
          >
            {tagline}
          </p>
        </motion.div>

        {/* Central Orb/Globe */}
        <motion.div
          className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-8 sm:mb-12"
          animate={{ rotateY: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="w-full h-full rounded-full border-2 opacity-60"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${theme.colors.plasmaBlue}40, ${theme.colors.aiViolet}20, transparent)`,
              borderColor: theme.colors.plasmaBlue,
              boxShadow: `0 0 50px ${theme.colors.plasmaBlue}60, inset 0 0 30px ${theme.colors.aiViolet}40`,
            }}
          />
          
          {/* Orbital Rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 border rounded-full opacity-30"
              style={{
                borderColor: ring === 2 ? theme.colors.wickerGold : theme.colors.plasmaBlue,
                transform: `scale(${1 + ring * 0.3})`,
              }}
              animate={{ rotate: ring % 2 === 0 ? -360 : 360 }}
              transition={{ 
                duration: 10 + ring * 5, 
                repeat: Infinity, 
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        {/* Module Buttons */}
        <div className="relative w-full max-w-6xl">
          {modules.map((module, index) => {
            const position = getResponsivePosition(module, index);
            return (
              <motion.button
                key={module.name}
                className="absolute p-2 sm:p-3 md:p-4 rounded-xl border-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                  background: `${module.color}20`,
                  borderColor: module.color,
                  boxShadow: `0 0 20px ${module.color}40`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                whileHover={{
                  boxShadow: `0 0 30px ${module.color}80`,
                  borderColor: theme.colors.cosmicWhite,
                }}
              >
                <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-[80px] sm:min-w-[100px] md:min-w-[120px]">
                  <span className="text-lg sm:text-xl md:text-2xl">{module.icon}</span>
                  <span 
                    className="text-xs sm:text-sm font-medium tracking-wide text-center"
                    style={{ 
                      fontFamily: theme.fonts.code.join(', '),
                      color: theme.colors.cosmicWhite,
                    }}
                  >
                    {module.name}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Wicker Throne Overlay */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-40 pointer-events-none"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div
          className="w-48 h-24 sm:w-72 sm:h-36 md:w-96 md:h-48"
          style={{
            background: `linear-gradient(to top, ${theme.colors.wickerGold}60, transparent)`,
            clipPath: 'polygon(20% 100%, 80% 100%, 70% 0%, 30% 0%)',
          }}
        />
      </motion.div>
    </div>
  );
}
