import React, { useState, useEffect, useRef } from 'react';
import { Search, Database, TrendingUp, DollarSign, Laptop, Settings, Play, CheckCircle, Activity, RefreshCw } from 'lucide-react';
import { ProcessStep } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard } from './ui/TiltCard';

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Problem Identification',
    description: 'We figure out what parts of your business are slowing you down or costing too much time.',
    whatItMeans: 'We conduct a deep-dive audit of your current workflows to pinpoint inefficiencies and hidden costs that are draining your resources.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Data Collection & Process Mapping',
    description: 'We look at how you currently do things and gather the information needed to make it better.',
    whatItMeans: 'Our team maps every touchpoint in your process, creating a digital blueprint that serves as the foundation for automation.',
    icon: Database,
  },
  {
    number: '03',
    title: 'Revenue Enhancement Matrix',
    description: 'We show you exactly how our solution will help you make more money or save costs.',
    whatItMeans: 'We identify high-impact areas where automation can directly boost your top-line revenue and optimize your bottom-line margins.',
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'Profitomics',
    description: 'We calculate the exact return on investment you can expect from automating these tasks.',
    whatItMeans: 'Using our proprietary financial models, we provide a clear ROI projection, showing you exactly when your automation pays for itself.',
    icon: DollarSign,
  },
  {
    number: '05',
    title: 'System Modeling & Simulation',
    description: 'We build a digital test version of the solution to make sure it works perfectly before real use.',
    whatItMeans: 'We create a "Digital Twin" of your automated process to stress-test scenarios and ensure 100% reliability before live deployment.',
    icon: Laptop,
  },
  {
    number: '06',
    title: 'Technology Selection',
    description: 'We pick the best software and tools that fit your specific needs and budget.',
    whatItMeans: 'We evaluate the global tech landscape to select the most robust, scalable, and cost-effective tools for your unique requirements.',
    icon: Settings,
  },
  {
    number: '07',
    title: 'Pilot Deployment',
    description: 'We test the automation on a small scale in your business to catch any issues early.',
    whatItMeans: 'A controlled rollout in a specific department allows us to gather real-world feedback and fine-tune the system for maximum impact.',
    icon: Play,
  },
  {
    number: '08',
    title: 'Full-Scale Implementation',
    description: 'We roll out the final, working automation across your whole team or business.',
    whatItMeans: 'We manage the end-to-end integration across your entire enterprise, ensuring a smooth transition and immediate operational gains.',
    icon: CheckCircle,
  },
  {
    number: '09',
    title: 'Real-Time Monitoring & Analytics',
    description: 'We keep a close eye on the system to make sure it is running smoothly and doing its job.',
    whatItMeans: 'Our intelligent dashboards provide 24/7 visibility into system performance, flagging any anomalies before they become issues.',
    icon: Activity,
  },
  {
    number: '10',
    title: 'Continuous Optimization & Strategic Scaling',
    description: 'We keep improving the system and help you add more automation as your business grows.',
    whatItMeans: 'Automation is a journey. We continuously refine your systems and identify new opportunities to scale your competitive advantage.',
    icon: RefreshCw,
  },
];

const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [text]);

  return <span className="inline-block">{displayedText}<span className="animate-pulse ml-1">|</span></span>;
};

const SparkleDust = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ 
            opacity: 0, 
            x: (Math.random() - 0.5) * 300, 
            y: (Math.random() - 0.5) * 300,
            scale: 0,
            rotate: Math.random() * 360
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full"
          style={{ 
            backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
            boxShadow: `0 0 15px hsl(${Math.random() * 360}, 80%, 60%)`
          }}
        />
      ))}
    </div>
  );
};

export const Process: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastHoveredIndex, setLastHoveredIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentTheme } = useTheme();

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    setLastHoveredIndex(index);
    setTimeout(() => setLastHoveredIndex(null), 1000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      time += 0.01;
      
      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Black background
      ctx.fillStyle = '#000000'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw cosmic waves
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
          const y = Math.sin(x * 0.003 + time + i) * 60 + Math.sin(x * 0.008 - time * 0.5) * 40 + canvas.height / 2 + (i - 2) * 120;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, 0.03)`;
        ctx.stroke();
      }

      // Draw ripple effect around mouse
      if (mouseX > -500) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400);
        
        // Convert hex to rgba
        let hex = currentTheme.hex.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.15)`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.05)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some glowing particles/ripples
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          const radius = (time * 60 + i * 150) % 400;
          ctx.arc(mouseX, mouseY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(1 - radius/400) * 0.3})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTheme]);

  return (
    <section id="our-process" className="py-16 md:py-24 relative overflow-hidden bg-black">
      {/* Cosmic Wave Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Our <span className="text-primary">Proven Process</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A simple, step-by-step approach to making your business run smoother and faster.</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800/50 -translate-x-1/2 rounded-full hidden md:block">
            {/* Glowing segment that follows hover */}
            <div 
              className="absolute w-full bg-primary shadow-[0_0_15px_rgba(var(--color-primary),0.8)] transition-all duration-500 ease-out rounded-full"
              style={{
                top: hoveredIndex !== null ? `${(hoveredIndex / (steps.length - 1)) * 100}%` : '0%',
                height: hoveredIndex !== null ? '10%' : '0%',
                opacity: hoveredIndex !== null ? 1 : 0,
                transform: 'translateY(-50%)'
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  key={index} 
                  className={`relative flex flex-col md:flex-row items-center md:h-64 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pl-12' : 'md:pr-12'} z-10`}>
                    <TiltCard className="h-full">
                      <div className={`h-full bg-dark/80 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl transition-all duration-300 transform ${hoveredIndex === index ? 'border-primary/50 shadow-2xl shadow-primary/20 scale-105' : 'hover:border-gray-700'}`}>
                        <div className="flex items-center gap-4 mb-4">
                          <span className={`text-5xl font-black transition-colors duration-300 ${hoveredIndex === index ? 'text-primary/20' : 'text-gray-800/50'}`}>
                            {step.number}
                          </span>
                          <h3 className={`text-xl font-bold transition-colors duration-300 ${hoveredIndex === index ? 'text-primary' : 'text-white'}`}>
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                          {step.description}
                        </p>
                        
                        {/* Interactive Explanation Area */}
                        <div className="relative min-h-[60px]">
                          <AnimatePresence mode="wait">
                            {hoveredIndex === index && (
                              <motion.div
                                key="typing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-primary/90 text-xs font-mono italic leading-relaxed"
                              >
                                <Typewriter text={step.whatItMeans || ''} />
                              </motion.div>
                            )}
                            {lastHoveredIndex === index && hoveredIndex === null && (
                              <SparkleDust key="dust" />
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </TiltCard>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center z-20">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${hoveredIndex === index ? 'bg-primary border-primary shadow-[0_0_20px_rgba(var(--color-primary),0.6)] scale-110' : 'bg-dark border-gray-700 text-gray-500'}`}>
                      <step.icon className={`w-5 h-5 transition-colors duration-300 ${hoveredIndex === index ? 'text-white' : ''}`} />
                    </div>
                  </div>

                  {/* Mobile Icon (visible only on small screens) */}
                  <div className="md:hidden absolute -top-4 left-6 w-10 h-10 rounded-full bg-dark border-2 border-primary flex items-center justify-center shadow-[0_0_10px_rgba(var(--color-primary),0.4)] z-20">
                     <step.icon className="w-4 h-4 text-primary" />
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};