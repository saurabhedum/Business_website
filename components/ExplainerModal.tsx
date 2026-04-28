import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { X } from 'lucide-react';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

interface ExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExplainerModal: React.FC<ExplainerModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      animate(modalRef.current, {
        translateY: ['100%', '0%'],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutExpo'
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current) {
      animate(modalRef.current, {
        translateY: ['0%', '100%'],
        opacity: [1, 0],
        duration: 400,
        easing: 'easeInExpo',
        complete: onClose
      });
    }
  };

  const handleScroll = () => {
    if (bgRef.current) {
      const scrollY = window.scrollY;
      bgRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose}></div>
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl bg-[#0A0F1C] rounded-t-2xl border border-blue-500/30 shadow-2xl overflow-hidden"
        style={{ maxHeight: '80vh' }}
      >
        <HeroMotionBackground />
        <div ref={bgRef} className="absolute inset-0 bg-[url('https://picsum.photos/seed/cosmic/1920/1080?blur=10')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-10 p-6">
          <button onClick={handleClose} className="absolute top-4 right-4 text-white hover:text-blue-400">
            <X />
          </button>
          <h2 className="text-2xl font-bold text-white mb-6">Explainer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="p-4 bg-[#111827] border border-blue-500/20 rounded-xl transition-all duration-300 hover:scale-105 hover:border-blue-400"
                onMouseEnter={(e) => {
                  animate(e.currentTarget, { scale: 1.05, borderColor: '#60a5fa', duration: 200 });
                }}
                onMouseLeave={(e) => {
                  animate(e.currentTarget, { scale: 1, borderColor: 'rgba(59, 130, 246, 0.2)', duration: 200 });
                }}
              >
                <h3 className="text-lg font-semibold text-white">Card {i}</h3>
                <p className="text-gray-400">Content for card {i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
