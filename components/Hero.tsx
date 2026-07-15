import React from 'react';
import { ShieldCheck, Mail, ChevronRight } from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { TiltCard } from './ui/TiltCard';
import { HeroMotionBackground } from './ui/HeroMotionBackground';
import { EditableText } from '../contexts/CMSContext';

export const Hero: React.FC = () => {
  const { openContactModal } = useUI();

  const cosmicDots = React.useMemo(() => {
    return [...Array(35)].map((_, i) => {
      const leftPos = Math.random() * 100;
      const delay = (leftPos / 100) * 1.5; // Appears as the line draws
      const duration = 1.5 + Math.random() * 2;
      const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e', '#f59e0b', '#10b981'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        id: i,
        left: `${leftPos}%`,
        bottom: `${-12 + (Math.random() * 24 - 12)}px`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        backgroundColor: color,
        color: color,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`
      } as React.CSSProperties & { id: number };
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      <HeroMotionBackground />
      
      {/* Styles for animations */}
      <style>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-flow 4s linear infinite;
        }
        .animate-hero-text {
          opacity: 0;
          animation: fade-in-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave-slow {
          animation: wave 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
        }
        .animate-wave-fast {
          animation: wave 15s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
        }
        @keyframes draw-line {
          0% { width: 0%; }
          60% { width: 50%; }
          100% { width: 100%; }
        }
        @keyframes draw-spark {
          0% { left: 0%; opacity: 0; transform: translate(-50%, -50%) scale(0); }
          5% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          60% { left: 50%; transform: translate(-50%, -50%) scale(1.5); filter: hue-rotate(180deg) brightness(1.5); }
          95% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: hue-rotate(360deg) brightness(1); }
          100% { left: 100%; opacity: 0; transform: translate(-50%, -50%) scale(0); }
        }
        .bg-cosmic-gradient {
          background: linear-gradient(90deg, 
            #06b6d4, /* Cyan */
            #3b82f6, /* Blue */
            #8b5cf6, /* Violet */
            #d946ef, /* Fuchsia */
            #f43f5e, /* Rose */
            #f59e0b, /* Amber */
            #10b981  /* Emerald */
          );
          background-size: 200% auto;
          animation: gradient-flow 4s linear infinite;
        }
        @keyframes cosmic-float {
          0% { transform: translateY(0) scale(0); opacity: 0; box-shadow: 0 0 0px 0px currentColor; }
          20% { transform: translateY(-4px) scale(1); opacity: 0.7; box-shadow: 0 0 8px 1px currentColor; }
          50% { transform: translateY(-12px) scale(1.3); opacity: 1; box-shadow: 0 0 15px 3px currentColor; }
          80% { transform: translateY(-20px) scale(0.9); opacity: 0.6; box-shadow: 0 0 6px 1px currentColor; }
          100% { transform: translateY(-28px) scale(0); opacity: 0; box-shadow: 0 0 0px 0px currentColor; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-12deg); }
          50% { transform: translateX(150%) skewX(-12deg); }
          100% { transform: translateX(150%) skewX(-12deg); }
        }
        .cosmic-dot {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          z-index: 20;
        }
        .group:hover .cosmic-dot {
          animation: cosmic-float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
      `}</style>

      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 z-0 pointer-events-none">
          <svg className="relative block w-[200%] h-[100px] md:h-[150px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  className="fill-primary/5 animate-wave-slow" 
                  style={{ animationDelay: '-2s' }}></path>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-[100px] md:h-[150px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
                  className="fill-secondary/5 animate-wave-fast" 
                  style={{ animationDelay: '-5s' }}></path>
          </svg>
      </div>

      <div className="container mx-auto px-[5vw] relative z-10 text-center mt-10">
        
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium mb-8 animate-hero-text hover:border-primary/50 transition-colors duration-300" style={{ animationDelay: '0.1s' }}>
          <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <EditableText id="hero.badge" defaultText="Trusted by 20+ Enterprises Worldwide" />
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight max-w-5xl mx-auto animate-hero-text group cursor-default" style={{ animationDelay: '0.3s' }}>
          <EditableText id="hero.titleLine1" defaultText="Transform Your Business" /> <br className="hidden md:block" />
          with <span className="relative inline-block overflow-hidden">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-text">
              <EditableText id="hero.titleLine2" defaultText="Intelligent Automation" />
            </span>
            
            {/* Elite Sweeping Shine Effect */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-[shimmer_3s_infinite_cubic-bezier(0.4,0,0.2,1)]"></span>

            {/* Animated Underline */}
            <span className="absolute -bottom-2 left-0 h-1.5 bg-cosmic-gradient rounded-full w-0 group-hover:animate-[draw-line_2.5s_cubic-bezier(0.25,0.1,0.25,1)_forwards]"></span>
            
            {/* Cosmic Dots Effect */}
            {cosmicDots.map((dot) => (
              <span 
                key={dot.id}
                className="cosmic-dot"
                style={dot}
              ></span>
            ))}
            
            {/* Spark */}
            <span className="absolute -bottom-2 left-0 w-4 h-4 bg-white rounded-full opacity-0 pointer-events-none mix-blend-screen shadow-[0_0_20px_5px_#fff,0_0_30px_10px_var(--color-primary)] group-hover:animate-[draw-spark_2.5s_cubic-bezier(0.25,0.1,0.25,1)_forwards]"></span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed animate-hero-text" style={{ animationDelay: '0.5s' }}>
          <EditableText id="hero.description" defaultText="We provide end-to-end automation services and bespoke digital software solutions designed to eliminate operational friction and drive measurable ROI for modern enterprises." />
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-hero-text" style={{ animationDelay: '0.7s' }}>
          <button 
            onClick={() => {
              const element = document.getElementById('automation-domains');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_20px_rgba(var(--color-primary),0.5)] border border-transparent px-8 py-3.5 rounded-lg font-semibold flex items-center gap-2 transition-all group"
          >
            <EditableText id="hero.exploreBtn" defaultText="Explore Services" />
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={openContactModal} 
            className="bg-white/5 backdrop-blur-md text-white border border-white/10 hover:bg-white/10 px-8 py-3.5 rounded-lg font-semibold flex items-center gap-2 transition-all"
          >
            <Mail className="w-4 h-4 text-primary flex-shrink-0" />
            <EditableText id="hero.consultBtn" defaultText="Get a Consultation" />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="animate-hero-text perspective-1000" style={{ animationDelay: '0.9s' }}>
          <TiltCard>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-white/10 max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
              <div className="p-6 md:p-8 group hover:bg-white/5 transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                  <EditableText id="hero.stat1Value" defaultText="23+" />
                </div>
                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                  <EditableText id="hero.stat1Label" defaultText="Automations Deployed" />
                </div>
              </div>
              <div className="p-6 md:p-8 group hover:bg-white/5 transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  <EditableText id="hero.stat2Value" defaultText="95%" />
                </div>
                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                  <EditableText id="hero.stat2Label" defaultText="Workflow Efficiency" />
                </div>
              </div>
              <div className="p-6 md:p-8 group hover:bg-white/5 transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">
                  <EditableText id="hero.stat3Value" defaultText="10+" />
                </div>
                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                  <EditableText id="hero.stat3Label" defaultText="Domain Expertise" />
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

      </div>
      
      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent z-10"></div>
    </section>
  );
};