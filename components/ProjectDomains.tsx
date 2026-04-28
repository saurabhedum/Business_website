import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Sprout, 
  ShieldCheck, 
  Building2, 
  Code2, 
  KanbanSquare, 
  FileText, 
  Sparkles,
  Workflow
} from 'lucide-react';
import { IndustryWorkflows } from './IndustryWorkflows';

const domains = [
  { id: 1, title: 'Smart Home', icon: Home, color: '#3b82f6', desc: 'Intelligent living spaces' },
  { id: 2, title: 'Smart Agriculture', icon: Sprout, color: '#10b981', desc: 'Automated farming & yields' },
  { id: 3, title: 'Modern Security Systems', icon: ShieldCheck, color: '#ef4444', desc: 'Next-gen threat protection' },
  { id: 4, title: 'Smart Ecosystems', icon: Building2, color: '#8b5cf6', desc: 'Cities, buildings, offices & more' },
  { id: 5, title: 'Software Automations', icon: Code2, color: '#f59e0b', desc: 'Code & process automation' },
  { id: 6, title: 'Project Management Automation', icon: KanbanSquare, color: '#06b6d4', desc: 'Streamlined workflows' },
  { id: 7, title: 'Content Automations', icon: FileText, color: '#ec4899', desc: 'AI-driven content generation' },
  { id: 8, title: 'Coming Soon', icon: Sparkles, color: '#64748b', desc: 'Future innovations' },
];

export function ProjectDomains({ accentColor = '#8b5cf6' }: { accentColor?: string }) {
  const leftDomains = domains.slice(0, 4);
  const rightDomains = domains.slice(4, 8);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden pt-24 pb-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-[120px] md:blur-[150px] opacity-20 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="text-center mb-16 relative z-20">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">Project Domains</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Explore our comprehensive ecosystem of automation solutions, all powered by the central TriSmart Workflow.</p>
      </div>

      <div id="mindmap-container" className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-8 lg:gap-32">
        
        {/* Left Column */}
        <div className="flex flex-col gap-4 md:gap-16 w-full md:w-1/3 z-10">
          {leftDomains.map((domain, index) => (
            <DomainCard key={domain.id} domain={domain} align="right" delay={index * 0.1} />
          ))}
        </div>

        {/* Center Node */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="relative z-20 shrink-0 my-12 md:my-0"
        >
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: accentColor }} />
          <div 
            id="center-node"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-slate-900 border-4 flex flex-col items-center justify-center shadow-2xl relative"
            style={{ borderColor: accentColor, boxShadow: `0 0 40px ${accentColor}40` }}
          >
            <Workflow className="w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-4" style={{ color: accentColor }} />
            <span className="text-white font-black text-lg md:text-2xl text-center leading-tight px-4">
              TriSmart<br/>Workflow
            </span>
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 md:gap-16 w-full md:w-1/3 z-10">
          {rightDomains.map((domain, index) => (
            <DomainCard key={domain.id} domain={domain} align="left" delay={index * 0.1 + 0.4} />
          ))}
        </div>

        {/* Connecting Lines (SVG) - Desktop Only */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.1))' }}>
            <Connections leftDomains={leftDomains} rightDomains={rightDomains} accentColor={accentColor} />
          </svg>
        </div>

      </div>

      {/* Domain Workflows Section */}
      <div className="mt-32">
        <IndustryWorkflows themeColor={accentColor} />
      </div>
    </div>
  );
}

function DomainCard({ domain, align, delay }: { domain: typeof domains[0], align: 'left' | 'right', delay: number, key?: React.Key }) {
  const Icon = domain.icon;
  return (
    <motion.div 
      initial={{ opacity: 0, x: align === 'right' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay % 0.4, type: 'spring' }}
      className={`flex items-center gap-4 md:gap-6 ${align === 'right' ? 'md:flex-row-reverse md:text-right' : 'flex-row text-left'} group bg-slate-900/40 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none border border-slate-800/50 md:border-transparent`}
    >
      <div 
        id={`domain-icon-${domain.id}`}
        className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300"
        style={{ boxShadow: `0 0 20px ${domain.color}20` }}
      >
        <Icon className="w-7 h-7 md:w-10 md:h-10" style={{ color: domain.color }} />
      </div>
      <div>
        <h3 className="text-base md:text-xl font-bold text-white group-hover:text-[var(--hover-color)] transition-colors mb-1" style={{ '--hover-color': domain.color } as any}>
          {domain.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-400 max-w-[200px] md:max-w-[240px]">{domain.desc}</p>
      </div>
    </motion.div>
  );
}

function Connections({ leftDomains, rightDomains, accentColor }: { leftDomains: any[], rightDomains: any[], accentColor: string }) {
  const [lines, setLines] = useState<{x1: number, y1: number, x2: number, y2: number, color: string}[]>([]);

  useEffect(() => {
    const updateLines = () => {
      const centerNode = document.getElementById('center-node');
      const container = document.getElementById('mindmap-container');
      
      if (!centerNode || !container) return;
      
      const centerRect = centerNode.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const centerX = centerRect.left + centerRect.width / 2 - containerRect.left;
      const centerY = centerRect.top + centerRect.height / 2 - containerRect.top;

      const newLines = [];

      for (const domain of [...leftDomains, ...rightDomains]) {
        const iconNode = document.getElementById(`domain-icon-${domain.id}`);
        if (iconNode) {
          const iconRect = iconNode.getBoundingClientRect();
          const iconX = iconRect.left + iconRect.width / 2 - containerRect.left;
          const iconY = iconRect.top + iconRect.height / 2 - containerRect.top;
          newLines.push({
            x1: centerX,
            y1: centerY,
            x2: iconX,
            y2: iconY,
            color: domain.color
          });
        }
      }
      setLines(newLines);
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    
    // Multiple timeouts to catch layout shifts during initial render/animation
    const t1 = setTimeout(updateLines, 100);
    const t2 = setTimeout(updateLines, 500);
    const t3 = setTimeout(updateLines, 1000);
    
    return () => {
      window.removeEventListener('resize', updateLines);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [leftDomains, rightDomains]);

  return (
    <>
      {lines.map((line, i) => {
        // Create a curved path (bezier curve)
        const midX = (line.x1 + line.x2) / 2;
        const path = `M ${line.x1} ${line.y1} C ${midX} ${line.y1}, ${midX} ${line.y2}, ${line.x2} ${line.y2}`;
        
        return (
          <motion.path
            key={i}
            d={path}
            fill="none"
            stroke={line.color}
            strokeWidth="3"
            strokeOpacity="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeInOut" }}
          />
        );
      })}
    </>
  );
}
