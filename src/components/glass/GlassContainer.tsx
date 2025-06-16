
import React from 'react';
import { motion } from 'framer-motion';

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'panel' | 'overlay';
}

export function GlassContainer({ children, className = '', variant = 'default' }: GlassContainerProps) {
  const variants = {
    default: 'glass-morphism border-glass-border bg-glass-bg backdrop-blur-xl',
    hero: 'glass-morphism-hero border-glass-border-bright bg-glass-bg-bright backdrop-blur-2xl',
    panel: 'glass-morphism-panel border-glass-panel bg-glass-panel-bg backdrop-blur-lg',
    overlay: 'glass-morphism-overlay border-glass-overlay bg-glass-overlay-bg backdrop-blur-3xl'
  };

  return (
    <motion.div
      className={`${variants[variant]} rounded-2xl shadow-glass transition-all duration-300 hover:shadow-glass-hover ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}
