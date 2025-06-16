
import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';

interface GlassButtonProps extends ButtonProps {
  glassVariant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning';
  shimmer?: boolean;
}

export function GlassButton({ 
  children, 
  className = '', 
  glassVariant = 'primary',
  shimmer = false,
  ...props 
}: GlassButtonProps) {
  const variants = {
    primary: 'glass-btn-primary border-archon-primary/30 bg-archon-primary/10 hover:bg-archon-primary/20 text-archon-primary',
    secondary: 'glass-btn-secondary border-archon-secondary/30 bg-archon-secondary/10 hover:bg-archon-secondary/20 text-archon-secondary',
    accent: 'glass-btn-accent border-archon-accent/30 bg-archon-accent/10 hover:bg-archon-accent/20 text-archon-accent',
    danger: 'glass-btn-danger border-archon-danger/30 bg-archon-danger/10 hover:bg-archon-danger/20 text-archon-danger',
    warning: 'glass-btn-warning border-archon-warning/30 bg-archon-warning/10 hover:bg-archon-warning/20 text-archon-warning'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        className={`
          ${variants[glassVariant]} 
          backdrop-blur-md 
          transition-all 
          duration-300 
          hover:shadow-glass-btn
          ${shimmer ? 'animate-shimmer' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}
