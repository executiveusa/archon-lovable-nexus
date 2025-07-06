
export const archonXTheme = {
  colors: {
    stellarBlack: '#0B0B0F',
    plasmaBlue: '#1FC3FF',
    wickerGold: '#D1A85C',
    aiViolet: '#884DFF',
    cosmicWhite: '#E5E5E5',
    biophilicGreen: '#A9FFCB',
  },
  fonts: {
    title: ['Orbitron', 'sans-serif'],
    code: ['JetBrains Mono', 'monospace'],
    body: ['Poppins', 'sans-serif'],
  },
  animations: {
    transition: '0.4s ease-in-out',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    glow: 'glow 2s ease-in-out infinite',
  }
};

export type ArchonTheme = typeof archonXTheme;
