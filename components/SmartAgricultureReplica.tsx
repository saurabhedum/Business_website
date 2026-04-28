import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  Droplets, 
  Sun, 
  Wind, 
  CloudRain, 
  Thermometer, 
  ShieldCheck, 
  BarChart3, 
  Navigation, 
  Zap, 
  ArrowRight, 
  Plus, 
  Play, 
  ChevronRight, 
  ArrowLeft,
  Cpu,
  Database,
  Menu,
  X
} from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { Logo } from './Logo';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

const hotspots = [
  { id: 1, top: '30%', left: '40%', label: 'Multispectral Drone Node', desc: 'Autonomous aerial monitoring for early pest detection and crop health analysis.' },
  { id: 2, top: '60%', left: '70%', label: 'Sub-surface Moisture Sensor', desc: 'Real-time soil data transmission for precision irrigation scheduling.' },
  { id: 3, top: '45%', left: '55%', label: 'Automated Nutrient Injector', desc: 'Precision fertigation system that delivers exact nutrient doses to individual zones.' },
  { id: 4, top: '25%', left: '20%', label: 'Climate Control Unit', desc: 'Intelligent greenhouse management for optimal temperature and humidity.' }
];

const coreSystems = [
  { 
    id: 'irrigation', 
    title: 'Precision Irrigation', 
    icon: Droplets, 
    color: 'from-blue-400 to-indigo-500',
    desc: 'Smart water management that reduces waste by up to 50%.',
    features: ['Soil Moisture Sync', 'Weather Integration', 'Leak Detection']
  },
  { 
    id: 'health', 
    title: 'Crop Health AI', 
    icon: Sprout, 
    color: 'from-emerald-400 to-green-500',
    desc: 'Computer vision and sensor data to monitor growth and disease.',
    features: ['Pest Prediction', 'Yield Estimation', 'Nutrient Analysis']
  },
  { 
    id: 'climate', 
    title: 'Climate Automation', 
    icon: Wind, 
    color: 'from-orange-400 to-red-500',
    desc: 'Total control over greenhouse and storage environments.',
    features: ['HVAC Automation', 'CO2 Monitoring', 'Automated Shading']
  },
  { 
    id: 'analytics', 
    title: 'Farm Intelligence', 
    icon: BarChart3, 
    color: 'from-purple-400 to-fuchsia-500',
    desc: 'Centralized data platform for end-to-end farm management.',
    features: ['Real-time Dashboards', 'Predictive Modeling', 'Inventory Tracking']
  }
];

export const SmartAgricultureReplica: React.FC = () => {
  const { setActiveView } = useUI();
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1D1D1F] font-sans overflow-x-hidden relative">
      <HeroMotionBackground />
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-2xl border border-white/30 rounded-2xl px-6 py-3 shadow-sm">
          <div className="flex items-center gap-8">
            <Logo className="h-8" />
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#86868B]">
              <a href="#" className="text-[#1D1D1F] hover:text-primary transition-colors">Ecosystem</a>
              <a href="#" className="hover:text-primary transition-colors">Sensors</a>
              <a href="#" className="hover:text-primary transition-colors">Software</a>
              <a href="#" className="hover:text-primary transition-colors">Case Studies</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' })}
              className="hidden md:block bg-white/10 backdrop-blur-xl border border-white/20 text-[#1D1D1F] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white/20 transition-all shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.8)]"
            >
              Request Demo
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
                <a href="#" className="text-[#1D1D1F] hover:text-primary transition-colors">Ecosystem</a>
                <a href="#" className="hover:text-primary transition-colors">Sensors</a>
                <a href="#" className="hover:text-primary transition-colors">Software</a>
                <a href="#" className="hover:text-primary transition-colors">Case Studies</a>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' });
                  }}
                  className="bg-emerald-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-600 transition-all"
                >
                  Request Demo
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section - Immersive Agriculture (Image 1 Style) */}
      <section className="relative h-screen min-h-[700px] w-full bg-[#051008] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://i.pinimg.com/1200x/9a/6f/aa/9a6faa50791df71e6ed6ba2df1ccc68e.jpg" 
            alt="Futuristic Agriculture" 
            className="w-full h-full object-cover opacity-50 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#051008]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              Precision Farming 4.0
            </span>
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tighter">
              Modular <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">Intelligent Farm</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/70 leading-relaxed mb-10">
              Transform traditional fields into data-driven ecosystems. Trismart provides end-to-end automation for maximum yield and sustainability.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 text-white font-bold rounded-full hover:bg-emerald-500/20 transition-all flex items-center gap-2 group shadow-[8px_8px_16px_rgba(0,0,0,0.4),-8px_-8px_16px_rgba(255,255,255,0.05)]">
                Explore Technology
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                System Overview
              </button>
            </div>
          </motion.div>
        </div>

        {/* Hotspots */}
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
                <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(52,211,153,0.8)] animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
                
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

      {/* Modular Product Grid - Apple Vision Pro Style (Image 2 Style) */}
      <section className="py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Automation Modules</h2>
            <p className="text-xl text-[#86868B] max-w-2xl mx-auto">
              Trismart delivers a complete hardware and software stack for modern agricultural excellence.
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
                      <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="mt-auto w-full py-4 bg-white/50 backdrop-blur-md border border-white text-[#1D1D1F] font-bold rounded-2xl hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group/btn shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.8)]">
                  View Details
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
              <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">End-to-End Service</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">From Soil Analysis to <br /> <span className="text-emerald-500">Smart Harvest.</span></h2>
              <p className="text-xl text-[#86868B] leading-relaxed mb-12">
                We provide a turnkey solution that integrates seamlessly with your existing infrastructure, providing real-time visibility and control.
              </p>

              <div className="space-y-8">
                {[
                  { title: 'Site Audit & Analysis', desc: 'Comprehensive mapping of your land, soil types, and water resources.' },
                  { title: 'Custom Hardware Deployment', desc: 'Installation of industrial-grade sensors and automated control valves.' },
                  { title: 'AI Platform Integration', desc: 'Bespoke software setup with predictive models for your specific crops.' },
                  { title: 'Ongoing Optimization', desc: 'Continuous monitoring and system tuning to ensure peak performance.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center font-bold text-emerald-600">
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
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
                      <Droplets className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-[#86868B] uppercase mb-1">Moisture</p>
                    <p className="text-2xl font-bold">42%</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-500 mb-4">
                      <Sprout className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-[#86868B] uppercase mb-1">Health</p>
                    <p className="text-2xl font-bold">Optimal</p>
                  </div>
                  <div className="col-span-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-xs font-bold uppercase mb-1">Irrigation Status</p>
                      <p className="text-2xl font-bold">Zone 4 Active</p>
                    </div>
                    <CloudRain className="w-10 h-10 opacity-50" />
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button className="px-8 py-4 bg-white/80 backdrop-blur-md border border-white rounded-full shadow-[10px_10px_20px_rgba(0,0,0,0.05),-10px_-10px_20px_rgba(255,255,255,0.8)] text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                    Open Farm Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 bg-[#051008] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">Ready to automate your harvest?</h2>
          <p className="text-xl text-white/60 mb-12">
            Join the agricultural revolution with Trismart. Scale your operations with precision and intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 text-white font-bold rounded-full hover:bg-emerald-500/20 transition-all shadow-[10px_10px_20px_rgba(0,0,0,0.4),-10px_-10px_20px_rgba(255,255,255,0.05)]"
            >
              Schedule Consultation
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all">
              Download Ag-Tech Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
