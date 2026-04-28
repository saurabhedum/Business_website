import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { SmartHomeReplica } from './SmartHomeReplica';
import { SmartAgricultureReplica } from './SmartAgricultureReplica';
import { DigitalAutomationReplica } from './DigitalAutomationReplica';
import { getCatalogueItem } from '../services/catalogueService';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

export const CatalogueDetail: React.FC<{ id: string }> = ({ id }) => {
  const { setActiveView } = useUI();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const item = await getCatalogueItem(id);
        setData(item);
      } catch (err) {
        console.error('Failed to fetch catalogue item:', err);
        setError('Failed to load catalogue details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const backButton = (
    <div className="fixed bottom-8 right-8 z-[150]">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-full text-white hover:bg-white/30 transition-all group shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]"
        title="Back to Home"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      </button>
    </div>
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => setActiveView('home')}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (id === 'smart-home') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen relative"
      >
        {backButton}
        <SmartHomeReplica />
      </motion.div>
    );
  }

  if (id === 'smart-agriculture') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen relative"
      >
        {backButton}
        <SmartAgricultureReplica />
      </motion.div>
    );
  }

  if (id === 'digital-automation') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen relative"
      >
        {backButton}
        <DigitalAutomationReplica />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen pt-24 pb-16 px-4 md:px-12 lg:px-24 relative overflow-hidden"
    >
      <HeroMotionBackground />
      {backButton}
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col gap-8 items-start mt-4">
          <div className="w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex p-3 bg-primary/20 text-primary rounded-xl mb-4"
            >
              <data.icon className="w-6 h-6 md:w-8 md:h-8" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              {data.title} <span className="text-primary">Automation</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg md:text-xl text-gray-400 mb-6 leading-relaxed"
            >
              {data.description}
            </motion.p>
            <div className="prose prose-invert max-w-none">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-base md:text-lg text-gray-300 leading-relaxed mb-8"
              >
                {data.content}
              </motion.p>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-xl md:text-2xl font-bold text-white mb-6"
              >
                End-to-End Implementation Process
              </motion.h2>
              <div className="space-y-6 md:space-y-12">
                {[
                  { step: '01', title: 'Strategic Consultation', desc: 'We analyze your current operations to identify high-impact automation opportunities.' },
                  { step: '02', title: 'System Architecture', desc: 'Our engineers design a custom hardware and software stack tailored to your environment.' },
                  { step: '03', title: 'Seamless Integration', desc: 'We deploy the solution with minimal disruption, ensuring all components work in harmony.' },
                  { step: '04', title: 'Optimization & Training', desc: 'We fine-tune the system and train your team to manage the new automated workflows.' }
                ].map((phase, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (i * 0.1), duration: 0.5 }}
                    className="flex gap-4 md:gap-8 group"
                  >
                    <div className="text-2xl md:text-4xl font-black text-white/10 group-hover:text-primary/20 transition-colors font-mono">
                      {phase.step}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{phase.title}</h3>
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">{phase.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-full md:w-80 space-y-6"
          >
            <div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl backdrop-blur-xl hover:border-white/20 transition-colors">
              <h3 className="text-base md:text-lg font-bold text-white mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {['Increased Efficiency', 'Reduced Operational Costs', 'Enhanced Data Accuracy', 'Scalable Infrastructure'].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs md:text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' })}
                className="w-full mt-6 md:mt-8 py-3 md:py-4 bg-white/10 backdrop-blur-2xl border border-white/30 text-white font-bold rounded-xl hover:bg-white/30 transition-all shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.1)] relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
