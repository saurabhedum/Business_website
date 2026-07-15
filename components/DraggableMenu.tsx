import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronLeft, Check, Network } from 'lucide-react';
import { useUI } from '../contexts/UIContext';

// Product list with cutting-edge automation systems
const products = [
  { id: 1, name: 'AI-Powered Industrial Robotics', link: '#services' },
  { id: 2, name: 'Smart Grid Energy Management', link: '#services' },
  { id: 3, name: 'Autonomous Warehouse Logistics', link: '#services' },
  { id: 4, name: 'Predictive Maintenance Systems', link: '#services' },
  { id: 5, name: 'Hyper-Automated Supply Chain', link: '#services' },
  { id: 6, name: 'Cognitive Building Automation', link: '#services' },
  { id: 7, name: 'Precision Agri-Tech Systems', link: '#services' },
  { id: 8, name: 'Digital Twin Manufacturing', link: '#services' },
  { id: 9, name: 'Edge Computing IoT Networks', link: '#services' },
  { id: 10, name: 'Robotic Process Automation (RPA)', link: '#services' },
  { id: 11, name: 'Smart City Traffic Control', link: '#services' },
  { id: 12, name: 'Automated Quality Inspection', link: '#services' },
  { id: 13, name: 'Biometric Security Systems', link: '#services' },
  { id: 14, name: 'Cloud-Native ERP Integration', link: '#services' },
  { id: 15, name: 'Zero-Touch Network Provisioning', link: '#services' },
];

export const DraggableMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { setActiveView } = useUI();

  return (
    <>
      <div
        className="fixed bottom-4 right-4 z-[110] flex flex-col items-end"
      >
        <div 
          className="relative group z-20 flex flex-col items-end"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Colorful smoky dust glow effect - only on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -inset-2 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-full blur-lg animate-pulse mix-blend-screen pointer-events-none"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1.1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -inset-1.5 bg-gradient-to-bl from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-md mix-blend-screen pointer-events-none"
                />
              </>
            )}
          </AnimatePresence>
          
          {/* Main Button / Header */}
          <motion.div 
            layout
            layoutRoot
            onClick={() => setIsOpen(!isOpen)}
            transition={{
              layout: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
            }}
            className={`relative bg-[#1e293b] shadow-[0_5px_15px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-2px_3px_rgba(0,0,0,0.4)] border border-slate-700 cursor-pointer flex items-center overflow-hidden origin-right ${
              isHovered || isOpen ? 'rounded-xl px-2.5 py-1.5 w-36' : 'rounded-full p-2 w-8 h-8 justify-center'
            }`}
          >
            <div className="flex items-center gap-2 text-slate-200 font-medium whitespace-nowrap w-full">
              <div className="shrink-0">
                <Network size={12} className={`${isHovered || isOpen ? 'text-primary' : 'text-slate-300'}`} />
              </div>
              {(isHovered || isOpen) && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-1 justify-between items-center gap-1"
                >
                  <span className="text-[10px]">Quick Menu</span>
                  <ChevronDown size={10} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 5, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
              className="w-40 bg-[#0f172a]/95 backdrop-blur-md rounded-xl border border-slate-800 shadow-2xl p-2 max-h-[40vh] overflow-y-auto custom-scrollbar flex flex-col gap-1 origin-top-right"
            >
              <div className="px-1 py-0.5 mb-0.5 border-b border-slate-800/50">
                <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">Products</span>
              </div>
              
              {products.map(p => (
                <a 
                  key={p.id} 
                  href={p.link} 
                  className="flex items-center gap-2 px-2 py-1 rounded-md bg-[#1e293b]/50 text-slate-300 hover:bg-primary/20 hover:text-white transition-all border border-slate-700/30 hover:border-primary/40 group"
                >
                  <Check size={10} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity shrink-0" />
                  <span className="text-[9px] font-medium truncate">{p.name}</span>
                </a>
              ))}
              
              <div className="h-px w-full bg-slate-800 my-1"></div>
              
              <button 
                onClick={() => {
                  setActiveView('schema');
                  setIsOpen(false);
                }} 
                className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-gradient-to-r from-primary/20 to-secondary/20 text-white hover:from-primary/30 hover:to-secondary/30 transition-all border border-primary/30 group text-left"
              >
                <Network size={10} className="group-hover:scale-110 transition-transform text-primary shrink-0" />
                <span className="text-[9px] font-bold">Project Schema</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
