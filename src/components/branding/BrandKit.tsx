
import React, { createContext, useContext } from 'react';
import { archonXTheme, ArchonTheme } from '@/styles/theme';

interface BrandKitContextType {
  theme: ArchonTheme;
  brandName: string;
  tagline: string;
}

const BrandKitContext = createContext<BrandKitContextType | undefined>(undefined);

interface BrandKitProviderProps {
  children: React.ReactNode;
}

export function BrandKitProvider({ children }: BrandKitProviderProps) {
  const value = {
    theme: archonXTheme,
    brandName: 'SkipAgentX',
    tagline: 'Automating nonprofit grant seeking.',
  };

  return (
    <BrandKitContext.Provider value={value}>
      {children}
    </BrandKitContext.Provider>
  );
}

export function useBrandKit() {
  const context = useContext(BrandKitContext);
  if (context === undefined) {
    throw new Error('useBrandKit must be used within a BrandKitProvider');
  }
  return context;
}
