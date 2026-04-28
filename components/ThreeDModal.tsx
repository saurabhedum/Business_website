
import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

interface ThreeDModalProps {
  project: Project | null;
  onClose: () => void;
}

const ThreeDModal: React.FC<ThreeDModalProps> = ({ project, onClose }) => {
  const [rotation, setRotation] = useState({ x: -20, y: 45 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  if (!project) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    setZoom(prev => Math.max(0.5, Math.min(3, prev - e.deltaY * 0.001)));
  };

  // Auto-rotate slowly if not interacting
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setRotation(prev => ({ ...prev, y: prev.y + 0.1 }));
    }, 20);
    return () => clearInterval(interval);
  }, [isDragging]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <HeroMotionBackground />
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-mono text-emerald-400 mb-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              LIVE_RENDER_SESSION
            </div>
            <h2 className="text-2xl font-black text-white">{project.title}</h2>
            <p className="text-slate-400 text-sm font-mono">ID: {project.id} // SCALE: 1:10</p>
          </div>
          <button 
            onClick={onClose}
            className="pointer-events-auto bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex justify-between items-end">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl max-w-xs pointer-events-auto">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Controls</h4>
            <div className="flex gap-4 text-[10px] text-slate-400">
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 border border-slate-600 rounded flex items-center justify-center">↺</div>
                 <span>Drag to Rotate</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 border border-slate-600 rounded flex items-center justify-center">↕</div>
                 <span>Scroll to Zoom</span>
               </div>
            </div>
          </div>
          
          <div className="text-right">
             <div className="text-[10px] font-mono text-slate-500">RENDER_LATENCY</div>
             <div className="text-xl font-mono text-emerald-400">~0.4ms</div>
          </div>
        </div>
      </div>

      {/* 3D Viewport */}
      <div 
        className="w-full h-full cursor-move perspective-container flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div 
          className="relative w-64 h-64 [transform-style:preserve-3d] transition-transform duration-75"
          style={{ 
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})` 
          }}
        >
          {/* Central Core */}
          <div className="absolute inset-0 bg-slate-900/90 border border-[var(--theme-color)] opacity-80 [transform:translateZ(32px)] flex items-center justify-center">
            <span className="text-[10px] font-mono theme-text -rotate-90">FRONT_FACE</span>
          </div>
          <div className="absolute inset-0 bg-slate-900/90 border border-[var(--theme-color)] opacity-80 [transform:rotateY(180deg)translateZ(32px)]" />
          <div className="absolute inset-0 bg-slate-900/90 border border-[var(--theme-color)] opacity-80 [transform:rotateY(90deg)translateZ(32px)]" />
          <div className="absolute inset-0 bg-slate-900/90 border border-[var(--theme-color)] opacity-80 [transform:rotateY(-90deg)translateZ(32px)]" />
          <div className="absolute inset-0 bg-slate-900/90 border border-[var(--theme-color)] opacity-80 [transform:rotateX(90deg)translateZ(32px)]" />
          <div className="absolute inset-0 bg-slate-900/90 border border-[var(--theme-color)] opacity-80 [transform:rotateX(-90deg)translateZ(32px)]" />

          {/* Internal Glowing Core */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[var(--theme-color)] opacity-20 blur-xl rounded-full animate-pulse [transform:translateZ(0)]" />
          
          {/* Floating Data Panels */}
          <div className="absolute -top-20 -left-20 w-40 h-24 bg-slate-900/80 border border-slate-700 [transform:translateZ(80px)] p-3 shadow-xl backdrop-blur-md">
             <div className="text-[8px] uppercase text-slate-500 mb-1">Architecture</div>
             <div className="text-[10px] text-white font-bold leading-tight">{project.techStack[0]}</div>
             <div className="w-full bg-slate-800 h-1 mt-2">
               <div className="bg-emerald-400 h-1 w-3/4" />
             </div>
          </div>

          <div className="absolute -bottom-10 -right-20 w-32 h-16 bg-slate-900/80 border border-slate-700 [transform:translateZ(-40px)] p-3 shadow-xl backdrop-blur-md">
             <div className="text-[8px] uppercase text-slate-500 mb-1">Status</div>
             <div className="text-[10px] text-emerald-400 font-mono">OPTIMAL</div>
          </div>

          {/* Rotating Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-slate-700 rounded-full animate-[spin_20s_linear_infinite] [transform:rotateX(90deg)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-slate-600 rounded-full animate-[spin_15s_linear_infinite_reverse] [transform:rotateY(45deg)]" />
          
          {/* Base Grid */}
          <div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-800 opacity-30 [transform:rotateX(90deg)translateZ(-100px)]"
             style={{ 
               backgroundImage: 'linear-gradient(slate-800 1px, transparent 1px), linear-gradient(90deg, slate-800 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}
          />
        </div>
      </div>
    </div>
  );
};

export default ThreeDModal;
