
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  onRequestDemo: (project: Project) => void;
  onView3D: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, onRequestDemo, onView3D }) => {
  return (
    <div 
      onClick={() => onClick(project)}
      className="group relative bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden cursor-pointer hover:border-[var(--theme-color)] hover:shadow-[0_30px_60px_-15px_rgba(var(--theme-color-rgb),0.3)] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform hover:-translate-y-2 hover:scale-[1.02] hover:rotate-[0.5deg] flex flex-col h-full will-change-transform"
    >
      {/* Visual Header */}
      <div className="h-44 relative overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

        {/* Industry Tag */}
        <div className="absolute top-3 right-3">
          <span className="text-[8px] uppercase tracking-widest font-black theme-text bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800 transition-colors">
            {project.industry}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 md:p-5 flex-1 flex flex-col">
        <h3 className="text-base md:text-lg font-bold text-white mb-2 group-hover:theme-text transition-colors line-clamp-1">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2 italic">
          "{project.shortDescription}"
        </p>

        {/* AI Models / Tech Stack Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.modelsUsed?.slice(0, 3).map((model, i) => (
             <span key={i} className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700 truncate max-w-[100%]">
               <span className="w-1 h-1 rounded-full bg-[var(--theme-color)] mr-1.5 opacity-70"></span>
               {model}
             </span>
          ))}
          {project.modelsUsed && project.modelsUsed.length > 3 && (
            <span className="text-[8px] font-mono text-slate-500 py-0.5">+{project.modelsUsed.length - 3}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRequestDemo(project);
            }}
            className="flex-1 text-[10px] md:text-xs font-bold uppercase tracking-widest theme-text border border-slate-700 bg-slate-900/50 hover:bg-[var(--theme-color)] hover:text-white hover:border-[var(--theme-color)] px-3 py-3 md:py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Demo
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onView3D(project);
            }}
            className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-3 md:py-2 rounded-lg transition-all duration-300 flex items-center justify-center min-h-[44px]"
            title="View 3D Prototype"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover Interaction Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1 theme-bg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
    </div>
  );
};

export default ProjectCard;
