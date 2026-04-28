import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useUI } from '../contexts/UIContext';
import { ArrowLeft } from 'lucide-react';

export const ProcessView: React.FC = () => {
  const { setActiveView } = useUI();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-[300vh] bg-[#05080F] relative overflow-hidden"
    >
      {/* Back Button */}
      <div className="fixed top-6 left-6 md:top-8 md:left-12 z-50 pointer-events-auto">
        <button 
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all group shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
        <div className="w-full flex-grow pointer-events-auto">
          <iframe 
            src="https://trismart-workflow.netlify.app" 
            className="w-full h-full border-0 bg-white"
            title="TriSmart Process Workflow"
            allowFullScreen
          />
        </div>
      </div>
    </motion.div>
  );
};
