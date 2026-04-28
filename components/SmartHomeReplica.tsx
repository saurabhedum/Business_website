import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Shield, 
  Zap, 
  Thermometer, 
  Lightbulb, 
  Lock, 
  Smartphone, 
  Wifi, 
  ArrowRight, 
  Plus, 
  Play, 
  ChevronRight, 
  ArrowLeft,
  Eye,
  Volume2,
  Wind,
  Menu,
  X
} from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { Logo } from './Logo';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

const hotspots = [
  { id: 1, top: '35%', left: '45%', label: 'Adaptive Facade Panels', desc: 'Self-adjusting panels that optimize thermal insulation based on external temperature.' },
  { id: 2, top: '55%', left: '65%', label: 'Panoramic Smart Glass', desc: 'Electrochromic glass that tints automatically to reduce glare and heat gain.' },
  { id: 3, top: '75%', left: '50%', label: 'Dynamic Ambient Lighting', desc: 'Integrated LED systems that sync with your circadian rhythm for better sleep.' },
  { id: 4, top: '45%', left: '25%', label: 'Biometric Access Point', desc: 'Secure, touchless entry using advanced facial recognition and palm vein scanning.' }
];

const coreSystems = [
  { 
    id: 'lighting', 
    title: 'Smart Illumination', 
    icon: Lightbulb, 
    color: 'from-amber-400 to-orange-500',
    desc: 'Intelligent lighting that follows your mood and schedule.',
    features: ['Scene Control', 'Circadian Sync', 'Motion Sensing']
  },
  { 
    id: 'climate', 
    title: 'Climate Control', 
    icon: Wind, 
    color: 'from-blue-400 to-cyan-500',
    desc: 'Precision HVAC management for ultimate comfort and efficiency.',
    features: ['Multi-zone Control', 'Air Quality Monitoring', 'Predictive Heating']
  },
  { 
    id: 'security', 
    title: 'Fortress Security', 
    icon: Shield, 
    color: 'from-emerald-400 to-teal-500',
    desc: 'AI-powered surveillance and proactive threat detection.',
    features: ['Facial Recognition', 'Smart Locks', 'Remote Monitoring']
  },
  { 
    id: 'entertainment', 
    title: 'Immersive Media', 
    icon: Volume2, 
    color: 'from-purple-400 to-pink-500',
    desc: 'Whole-home audio and cinematic experiences at your fingertips.',
    features: ['Multi-room Audio', 'Home Theater', 'Voice Integration']
  }
];

export const SmartHomeReplica: React.FC = () => {
  const { setActiveView } = useUI();
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans overflow-x-hidden relative">
      <HeroMotionBackground />
      {/* Futuristic Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/60 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-3 shadow-sm">
          <div className="flex items-center gap-8">
            <Logo className="h-8" />
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#86868B]">
              <a href="#" className="text-[#1D1D1F] hover:text-primary transition-colors">Overview</a>
              <a href="#" className="hover:text-primary transition-colors">Technology</a>
              <a href="#" className="hover:text-primary transition-colors">Process</a>
              <a href="#" className="hover:text-primary transition-colors">Case Studies</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' })}
              className="hidden md:block bg-white/10 backdrop-blur-2xl border border-white/30 text-[#1D1D1F] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white/30 transition-all shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]"
            >
              Book a Consultation
            </button>
            <button 
              className="lg:hidden p-2 text-[#1D1D1F]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-2 bg-white/80 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-lg"
            >
              <nav className="flex flex-col gap-4 text-sm font-medium text-[#86868B]">
                <a href="#" className="text-[#1D1D1F] hover:text-primary transition-colors">Overview</a>
                <a href="#" className="hover:text-primary transition-colors">Technology</a>
                <a href="#" className="hover:text-primary transition-colors">Process</a>
                <a href="#" className="hover:text-primary transition-colors">Case Studies</a>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' });
                  }}
                  className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-all"
                >
                  Book a Consultation
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section - Futuristic Dark Theme (Image 1 Style) */}
      <section className="relative h-screen min-h-[700px] w-full bg-black overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://i.pinimg.com/736x/c7/05/12/c7051200837284dd430812723956e378.jpg" 
            alt="Futuristic Smart Home" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
              The Future of Living
            </span>
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tighter">
              Modular <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">Intelligent Home</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/70 leading-relaxed mb-10">
              Transform your environment into a responsive ecosystem that anticipates your needs and enhances your daily rituals.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white/10 backdrop-blur-2xl border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all flex items-center gap-2 group shadow-[10px_10px_20px_rgba(0,0,0,0.3),-10px_-10px_20px_rgba(255,255,255,0.1)]">
                Explore Solutions
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
                Watch the Vision
              </button>
            </div>
          </motion.div>
        </div>

        {/* Hotspots (Image 1 Style) */}
        <div className="absolute inset-0 pointer-events-none">
          {hotspots.map((spot) => (
            <div 
              key={spot.id}
              className="absolute pointer-events-auto group"
              style={{ top: spot.top, left: spot.left }}
            >
              <button 
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                className="relative flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-white rounded-full animate-ping opacity-40"></div>
                
                {/* Hotspot Label */}
                <div className={`absolute left-8 whitespace-nowrap bg-black/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl transition-all duration-300 ${activeHotspot === spot.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  <p className="text-white text-sm font-bold">{spot.label}</p>
                  <p className="text-white/60 text-[10px] mt-0.5 max-w-[150px] leading-tight">{spot.desc}</p>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Bar removed as per request */}
      </section>

      {/* Modular Product Grid - Light/Glassmorphic (Image 2 Style) */}
      <section className="py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Core Ecosystem</h2>
            <p className="text-xl text-[#86868B] max-w-2xl mx-auto">
              Trismart provides an end-to-end service, from architectural integration to seamless software control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreSystems.map((system, idx) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col items-center text-center border border-white"
              >
                {/* Icon with soft gradient backdrop */}
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${system.color} p-0.5 mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full bg-white rounded-[calc(1.5rem-2px)] flex items-center justify-center text-[#1D1D1F]">
                    <system.icon className="w-10 h-10" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4">{system.title}</h3>
                <p className="text-[#86868B] text-sm leading-relaxed mb-8">
                  {system.desc}
                </p>

                <div className="w-full space-y-3 mb-8">
                  {system.features.map((feature, i) => (
                    <div key={i} className="flex items-center justify-center gap-2 text-xs font-medium text-[#1D1D1F]">
                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="mt-auto w-full py-4 bg-white/60 backdrop-blur-xl border border-white text-[#1D1D1F] font-bold rounded-2xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group/btn shadow-[6px_6px_12px_rgba(0,0,0,0.05),-6px_-6px_12px_rgba(255,255,255,0.9)]">
                  Learn More
                  <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* End-to-End Service Section */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">End-to-End Service</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">From Blueprint to <br /> <span className="text-primary">Brilliant Living.</span></h2>
              <p className="text-xl text-[#86868B] leading-relaxed mb-12">
                We don't just install gadgets. We design and implement complete smart ecosystems that are built into the very fabric of your home.
              </p>

              <div className="space-y-8">
                {[
                  { title: 'Architectural Design', desc: 'Working with your architects to integrate wiring and sensors invisibly.' },
                  { title: 'Hardware Installation', desc: 'Professional deployment of premium sensors, controllers, and actuators.' },
                  { title: 'Software Customization', desc: 'A bespoke control interface tailored to your family\'s specific needs.' },
                  { title: 'Lifetime Support', desc: 'Continuous updates and 24/7 technical assistance for your peace of mind.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center font-bold text-primary">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{step.title}</h4>
                      <p className="text-[#86868B] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
              {/* Neumorphic Device Mockup (Image 2 Style) */}
              <div className="relative z-10 bg-[#F5F5F7] rounded-[3rem] p-12 shadow-[50px_50px_100px_rgba(0,0,0,0.1),-50px_-50px_100px_rgba(255,255,255,0.8)] border border-white">
                <div className="flex items-center justify-between mb-12">
                  <Logo className="h-6" />
                  <div className="w-10 h-10 bg-white rounded-full shadow-inner flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-500 mb-4">
                      <Thermometer className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-[#86868B] uppercase mb-1">Climate</p>
                    <p className="text-2xl font-bold">22.5°C</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-[#86868B] uppercase mb-1">Lights</p>
                    <p className="text-2xl font-bold">65%</p>
                  </div>
                  <div className="col-span-2 bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 text-white flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-xs font-bold uppercase mb-1">Security Status</p>
                      <p className="text-2xl font-bold">All Systems Secure</p>
                    </div>
                    <Shield className="w-10 h-10 opacity-50" />
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button className="px-8 py-4 bg-white/90 backdrop-blur-2xl border border-white rounded-full shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.9)] text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                    Open Control Center
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 bg-[#1D1D1F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">Ready to evolve your home?</h2>
          <p className="text-xl text-white/60 mb-12">
            Join the hundreds of families who have transformed their living experience with Trismart Automations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-2xl border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all shadow-[12px_12px_24px_rgba(0,0,0,0.5),-12px_-12px_24px_rgba(255,255,255,0.1)]"
            >
              Start Your Project
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all">
              Download Full Catalogue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

