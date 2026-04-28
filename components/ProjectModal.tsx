
import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import DigitalTwin from './DigitalTwin';
import { downloadProjectBrief } from '../utils/briefGenerator';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestDemo: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onRequestDemo }) => {
  const [activeTab, setActiveTab] = useState<'visuals' | 'brief' | 'specs'>('visuals');

  useEffect(() => {
    // Reset to visuals on mobile, brief on desktop when project changes
    const isMobile = window.innerWidth < 1024;
    setActiveTab(isMobile ? 'visuals' : 'brief');
  }, [project]);
  
  if (!project) return null;

  // Helper to render formatted text from the brief
  const renderBrief = (text: string) => {
    return text.split('\n\n').map((block, index) => {
      const [header, ...body] = block.split('**');
      if (block.startsWith('**')) {
         // Format: **Header** Body
         const content = block.split('**');
         if (content.length >= 3) {
            return (
              <div key={index} className="mb-6">
                 <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-2 border-l-2 border-[var(--theme-color)] pl-3">{content[1]}</h5>
                 <p className="text-slate-300 leading-relaxed text-sm md:text-base pl-3">{content[2]}</p>
              </div>
            );
         }
      }
      return <p key={index} className="mb-4 text-slate-300 leading-relaxed">{block}</p>;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8 bg-black/90 backdrop-blur-md overflow-hidden">
      <HeroMotionBackground />
      <div className="bg-slate-950 border border-slate-800 w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] md:rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all relative z-10">
        
        {/* Header Bar */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 theme-bg animate-pulse rounded-full" />
            <h2 className="text-xl font-bold text-white tracking-tight">{project.title}</h2>
            <span className="hidden sm:inline-block text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">
              PROJECT_ID: TRM-{project.id.padStart(3, '0')}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col lg:grid lg:grid-cols-12 gap-0 relative">
          
          {/* Mobile Tabs */}
          <div className="flex lg:hidden border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 overflow-x-auto hide-scrollbar shrink-0">
            <button
              onClick={() => setActiveTab('visuals')}
              className={`flex-1 min-w-[100px] py-4 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${
                activeTab === 'visuals' ? 'theme-border theme-text bg-slate-800/50' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Visuals
            </button>
            <button
              onClick={() => setActiveTab('brief')}
              className={`flex-1 min-w-[100px] py-4 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${
                activeTab === 'brief' ? 'theme-border theme-text bg-slate-800/50' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Brief
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex-1 min-w-[100px] py-4 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${
                activeTab === 'specs' ? 'theme-border theme-text bg-slate-800/50' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Specs
            </button>
          </div>

          {/* Left Panel - Visuals */}
          <div className={`lg:col-span-5 p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/50 flex flex-col gap-6 ${activeTab === 'visuals' ? 'flex' : 'hidden lg:flex'}`}>
            <div className="aspect-video relative rounded-xl overflow-hidden group shadow-lg">
              <img src={project.imageUrl} loading="lazy" className="w-full h-full object-cover" alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <p className="text-xs font-bold theme-text uppercase tracking-widest mb-1">{project.industry}</p>
                  <p className="text-white text-lg font-bold">{project.title}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-[300px] relative">
              <div className="absolute top-0 left-0 p-2 text-[10px] font-mono theme-text z-10 bg-slate-950/80 rounded">
                DIGITAL_TWIN_SIMULATION
              </div>
              <DigitalTwin 
                complexity={project.prototypeData.complexity} 
                sensors={project.prototypeData.sensorCount} 
                industry={project.industry} 
              />
            </div>
          </div>

          {/* Right Panel - Information */}
          <div className={`lg:col-span-7 flex flex-col h-full ${activeTab === 'visuals' ? 'hidden lg:flex' : 'flex'}`}>
            
            {/* Tabs */}
            <div className="hidden lg:flex border-b border-slate-800 bg-slate-900/50">
              <button 
                onClick={() => setActiveTab('brief')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'brief' || activeTab === 'visuals' ? 'theme-text border-b-2 theme-border bg-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Project Brief
              </button>
              <button 
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'specs' ? 'theme-text border-b-2 theme-border bg-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Technical Specs
              </button>
            </div>

            <div className="p-4 md:p-8 flex-1 overflow-y-auto bg-slate-950/30">
              {(activeTab === 'brief' || (activeTab === 'visuals' && window.innerWidth >= 1024)) && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <section>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Executive Summary</h4>
                    <p className="text-slate-300 leading-relaxed text-lg italic border-l-4 border-slate-700 pl-4">"{project.shortDescription}"</p>
                  </section>
                  
                  <section>
                    <div className="bg-slate-900/40 rounded-xl p-6 border border-slate-800/50">
                       {renderBrief(project.detailedBrief)}
                    </div>
                  </section>

                  <section className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-inner">
                      <p className="text-xs text-slate-500 font-bold uppercase mb-2">ROI Metric</p>
                      <p className="text-emerald-400 font-mono text-2xl">{project.roi}</p>
                    </div>
                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-inner">
                      <p className="text-xs text-slate-500 font-bold uppercase mb-2">Business Impact</p>
                      <p className="text-white text-sm leading-tight">{project.impact}</p>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-2 gap-6">
                    {project.specifications.map((spec, i) => (
                      <div key={i} className="border-b border-slate-800 pb-4">
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">{spec.label}</p>
                        <p className="text-white font-mono">{spec.value}</p>
                      </div>
                    ))}
                  </div>

                  <section>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Automation Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="bg-slate-900 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded border border-slate-800 uppercase tracking-tighter hover:border-[var(--theme-color)] transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core Models & Algorithms</h4>
                    <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800">
                       <ul className="space-y-3">
                        {project.modelsUsed.map((model, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full theme-bg" />
                            {model}
                          </li>
                        ))}
                       </ul>
                    </div>
                  </section>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="p-4 md:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row gap-3 md:gap-4 items-center shrink-0">
              <button 
                onClick={() => downloadProjectBrief(project)}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 min-h-[44px] text-sm md:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Brief
              </button>
              <button 
                onClick={() => onRequestDemo(project)}
                className="w-full sm:w-auto flex-1 theme-bg hover:brightness-110 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg theme-shadow flex items-center justify-center gap-2 min-h-[44px] text-sm md:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Request Implementation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
