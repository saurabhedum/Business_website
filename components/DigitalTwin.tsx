
import React from 'react';

interface DigitalTwinProps {
  complexity: number;
  sensors: number;
  industry: string;
}

const DigitalTwin: React.FC<DigitalTwinProps> = ({ complexity, sensors, industry }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-800 rounded-xl group">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--theme-color) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      {/* Schematic Container */}
      <div className="relative w-48 h-48 animate-[spin_20s_linear_infinite] [transform-style:preserve-3d]">
        {/* Core Block */}
        <div className="absolute inset-0 border-2 theme-border opacity-40 rounded-lg [transform:translateZ(40px)]" />
        <div className="absolute inset-0 border-2 theme-border opacity-20 rounded-lg [transform:translateZ(-40px)]" />
        
        {/* Sensor Points */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 theme-bg rounded-full shadow-[0_0_10px_var(--theme-color)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translateZ(${Math.random() * 80 - 40}px)`
            }}
          />
        ))}

        {/* Industry Specific icon overlays */}
        <div className="absolute inset-0 flex items-center justify-center [transform:rotateX(-90deg)] opacity-30">
          <div className="w-full h-[1px] theme-bg blur-[2px]" />
        </div>
      </div>

      {/* Real-time Data Readout Overlay */}
      <div className="absolute top-4 left-4 font-mono text-[10px] theme-text space-y-1">
        <p className="flex items-center gap-2"><span className="w-1 h-1 theme-bg animate-pulse" /> SYSTEM_UPTIME: 142.3h</p>
        <p className="flex items-center gap-2"><span className="w-1 h-1 theme-bg animate-pulse" /> LOAD_VAR: {(complexity / 10).toFixed(2)}%</p>
        <p className="flex items-center gap-2"><span className="w-1 h-1 theme-bg animate-pulse" /> NODES_ACTIVE: {sensors}</p>
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] text-slate-500 font-bold tracking-widest uppercase">
        Simulation Active
      </div>
      
      {/* Scanning Line */}
      <div className="absolute inset-x-0 h-[2px] theme-bg opacity-20 blur-[1px] animate-[scan_4s_ease-in-out_infinite]" />

      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default DigitalTwin;
