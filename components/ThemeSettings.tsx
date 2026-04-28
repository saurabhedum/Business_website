import React, { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme, themes } = useTheme();

  return (
    <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 items-center">
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-dark border border-l-white/20 border-y-white/20 border-r-0 rounded-l-lg p-3 text-white shadow-lg hover:text-primary transition-all ${isOpen ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
        aria-label="Theme Settings"
      >
        <Palette className="w-5 h-5 animate-pulse" />
      </button>

      {/* Panel */}
      <div className={`bg-dark/95 backdrop-blur-xl border border-white/10 p-4 rounded-l-2xl shadow-2xl transition-all duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
          <span className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            Theme Color
          </span>
          <button onClick={() => setIsOpen(false)} aria-label="Close Theme Settings" className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3 min-w-[200px]">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setTheme(theme.name)}
              className={`w-8 h-8 rounded-full transition-transform hover:scale-110 relative flex items-center justify-center ${currentTheme.name === theme.name ? 'ring-2 ring-white ring-offset-2 ring-offset-dark' : ''}`}
              style={{ backgroundColor: theme.hex }}
              title={theme.name}
            >
              {currentTheme.name === theme.name && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};