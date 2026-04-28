
import React, { useState } from 'react';
import { Project } from '../types';
import { downloadProjectBrief } from '../utils/briefGenerator';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onRequestDemo: (project: Project) => void;
  onView3D: (project: Project) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onRequestDemo, onView3D }) => {
  const [activeTab, setActiveTab] = useState<'brief' | 'specs'>('brief');

  // Helper to render formatted text
  const renderBrief = (text: string) => {
    return text.split('\n\n').map((block, index) => {
      const parts = block.split('**');
      if (parts.length === 3) {
         // Format: **Header** Body
         return (
            <div key={index} className="mb-8">
               <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-3 border-l-2 border-[var(--theme-color)] pl-4">{parts[1]}</h3>
               <p className="text-slate-300 leading-relaxed text-base pl-4">{parts[2]}</p>
            </div>
         );
      }
      return <p key={index} className="mb-6 text-slate-300 leading-relaxed text-base">{block}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-10 animate-in slide-in-from-bottom-4 duration-500">
      {/* Navigation Bar for Detail View */}
      <div className="max-w-7xl mx-auto px-4 mb-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Registry
        </button>
        <div className="flex gap-2">
           <button onClick={() => onView3D(project)} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-800 px-3 py-1 rounded hover:bg-slate-900 hover:text-white transition-colors">
              View 3D Model
           </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-105 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <div className="flex items-center gap-3 mb-4">
               <span className="px-3 py-1 rounded-full bg-[var(--theme-color)] text-white text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(var(--theme-color-rgb),0.5)]">
                 {project.industry}
               </span>
               <span className="text-[10px] font-mono text-slate-300 bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                 TRM-{project.id.padStart(3, '0')}
               </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 max-w-4xl leading-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed border-l-4 border-[var(--theme-color)] pl-6 bg-black/30 backdrop-blur-sm p-4 rounded-r-xl">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
        
        {/* Left Column (Sticky Sidebar style) */}
        <div className="lg:col-span-4 space-y-8">
           {/* Tech Stack */}
           <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Architecture Stack</h4>
              <div className="flex flex-wrap gap-2">
                 {project.techStack.map(tech => (
                   <span key={tech} className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-[10px] font-bold text-slate-300 uppercase tracking-tight hover:border-[var(--theme-color)] transition-colors cursor-default">
                     {tech}
                   </span>
                 ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">AI Models</h4>
                 <ul className="space-y-2">
                    {project.modelsUsed.map((model, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                         <span className="mt-1 w-1 h-1 rounded-full bg-[var(--theme-color)] shrink-0" />
                         {model}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>

        {/* Right Column (Content) */}
        <div className="lg:col-span-8">
           {/* Tab Navigation */}
           <div className="flex border-b border-slate-800 mb-8 sticky top-20 bg-slate-950/90 backdrop-blur-md z-10 -mx-4 px-4 md:mx-0 md:px-0">
              <button 
                 onClick={() => setActiveTab('brief')}
                 className={`py-4 px-6 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'brief' ? 'border-[var(--theme-color)] text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                 Execution Brief
              </button>
              <button 
                 onClick={() => setActiveTab('specs')}
                 className={`py-4 px-6 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'specs' ? 'border-[var(--theme-color)] text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                 Specifications
              </button>
           </div>

           <div className="min-h-[500px]">
              {activeTab === 'brief' && (
                 <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="mb-8">
                       <div className="p-6 bg-slate-900/30 border border-slate-800 rounded-xl">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Business Impact</p>
                          <p className="text-white font-medium leading-relaxed text-sm">{project.impact}</p>
                       </div>
                    </div>
                    
                    <div className="prose prose-invert max-w-none">
                       {renderBrief(project.detailedBrief)}
                    </div>
                 </div>
              )}

              {activeTab === 'specs' && (
                 <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {project.specifications.map((spec, i) => (
                          <div key={i} className="flex justify-between items-center p-4 border-b border-slate-800 hover:bg-white/5 transition-colors">
                             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{spec.label}</span>
                             <span className="font-mono text-sm text-white">{spec.value}</span>
                          </div>
                       ))}
                    </div>
                    
                    <div className="mt-8 p-6 bg-slate-900/20 border border-slate-800 rounded-xl">
                       <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">System Complexity Analysis</h4>
                       <div className="mb-4">
                          <div className="flex justify-between text-[10px] uppercase text-slate-500 mb-2">
                             <span>Logic Density</span>
                             <span>{project.prototypeData.complexity}/100</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                             <div className="h-full bg-[var(--theme-color)]" style={{ width: `${project.prototypeData.complexity}%` }}></div>
                          </div>
                       </div>
                       <p className="text-xs text-slate-400 leading-relaxed">
                          This metric represents the algorithmic density of the solution, factoring in the number of decision nodes, 
                          sensor inputs, and required inference operations per second.
                       </p>
                    </div>
                 </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
