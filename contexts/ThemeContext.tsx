import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

type ThemeColor = {
  name: string;
  primary: string;   // RGB values space separated
  secondary: string; // RGB values space separated
  hex: string;       // Hex for UI display
};

const themes: ThemeColor[] = [
  // Existing
  { name: 'Violet', primary: '139 92 246', secondary: '124 58 237', hex: '#8b5cf6' }, 
  { name: 'Sky Blue', primary: '14 165 233', secondary: '2 132 199', hex: '#0ea5e9' },
  { name: 'Emerald', primary: '16 185 129', secondary: '5 150 105', hex: '#10b981' },
  { name: 'Orange', primary: '249 115 22', secondary: '234 88 12', hex: '#f97316' },
  { name: 'Rose', primary: '244 63 94', secondary: '225 29 72', hex: '#f43f5e' },
  
  // New Additions
  { name: 'Sapphire', primary: '59 130 246', secondary: '37 99 235', hex: '#3b82f6' },
  { name: 'Indigo', primary: '99 102 241', secondary: '79 70 229', hex: '#6366f1' },
  { name: 'Cyan', primary: '6 182 212', secondary: '8 145 178', hex: '#06b6d4' },
  { name: 'Teal', primary: '20 184 166', secondary: '13 148 136', hex: '#14b8a6' },
  { name: 'Lime', primary: '132 204 22', secondary: '101 163 13', hex: '#84cc16' },
  { name: 'Amber', primary: '245 158 11', secondary: '217 119 6', hex: '#f59e0b' },
  { name: 'Yellow', primary: '234 179 8', secondary: '202 138 4', hex: '#eab308' },
  { name: 'Crimson', primary: '239 68 68', secondary: '220 38 38', hex: '#ef4444' },
  { name: 'Hot Pink', primary: '236 72 153', secondary: '219 39 119', hex: '#ec4899' },
  { name: 'Fuchsia', primary: '217 70 239', secondary: '192 38 211', hex: '#d946ef' },
];

interface ThemeContextType {
  currentTheme: ThemeColor;
  setTheme: (themeName: string) => void;
  themes: ThemeColor[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper functions for animation
const parseColor = (color: string) => color.split(' ').map(Number);
const formatColor = (rgb: number[]) => rgb.map(Math.round).join(' ');
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>(themes[0]);
  
  // Keep track of the currently displayed color values to allow smooth transition interruption
  // This ref acts as the source of truth for the animation loop
  const displayedColors = useRef({
    primary: parseColor(themes[0].primary),
    secondary: parseColor(themes[0].secondary)
  });

  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const targetPrimary = parseColor(currentTheme.primary);
    const targetSecondary = parseColor(currentTheme.secondary);
    
    // Start from wherever we are currently
    const startPrimary = displayedColors.current.primary;
    const startSecondary = displayedColors.current.secondary;

    const startTime = performance.now();
    const duration = 2000; // 2 seconds

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quartic for smooth feel
      const ease = 1 - Math.pow(1 - progress, 4); 

      const currentPrimary = startPrimary.map((start, i) => 
        lerp(start, targetPrimary[i], ease)
      );
      
      const currentSecondary = startSecondary.map((start, i) => 
        lerp(start, targetSecondary[i], ease)
      );

      // Update ref for continuity
      displayedColors.current = {
        primary: currentPrimary,
        secondary: currentSecondary
      };

      // Update CSS variables
      const root = document.documentElement;
      root.style.setProperty('--color-primary', formatColor(currentPrimary));
      root.style.setProperty('--color-secondary', formatColor(currentSecondary));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Cancel previous animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentTheme]);

  // Update Favicon based on theme
  useEffect(() => {
    const updateFavicon = () => {
      const color = currentTheme.hex;
      // Construct SVG with the current theme color
      const svg = `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
          <circle cx='50' cy='50' r='46' fill='#0B0F19' stroke='${color}' stroke-width='4'/>
          <path d='M50 50 L82 50 M50 50 L28 32 M50 50 L28 68' stroke='white' stroke-width='4' stroke-linecap='round'/>
          <circle cx='50' cy='50' r='10' fill='${color}'/>
        </svg>
      `.trim().replace(/\s+/g, ' ');
      
      const faviconUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    };

    updateFavicon();
  }, [currentTheme]);

  const setTheme = (themeName: string) => {
    const theme = themes.find(t => t.name === themeName);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};