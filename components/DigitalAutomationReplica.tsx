import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Code2, 
  Globe, 
  Layers, 
  Zap, 
  Smartphone, 
  Database, 
  Cloud, 
  Share2, 
  Terminal, 
  PenTool, 
  Video, 
  MessageSquare, 
  ArrowRight, 
  Plus, 
  Play, 
  ChevronRight, 
  ArrowLeft,
  Search,
  Settings,
  Activity,
  Menu,
  X
} from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { Logo } from './Logo';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

const ecosystemNodes = [
  { id: 'facebook', label: 'Facebook', icon: Globe, top: '10%', left: '15%' },
  { id: 'instagram', label: 'Instagram', icon: Globe, top: '10%', left: '35%' },
  { id: 'gmail', label: 'Gmail', icon: Globe, top: '10%', left: '65%' },
  { id: 'outlook', label: 'Outlook', icon: Globe, top: '10%', left: '85%' },
  { id: 'x', label: 'X', icon: Globe, top: '40%', left: '10%' },
  { id: 'linkedin', label: 'LinkedIn', icon: Globe, top: '65%', left: '10%' },
  { id: 'pinterest', label: 'Pinterest', icon: Globe, top: '90%', left: '30%' },
  { id: 'youtube', label: 'YouTube', icon: Globe, top: '90%', left: '70%' },
  { id: 'slack', label: 'Slack', icon: Globe, top: '65%', left: '90%' },
  { id: 'teams', label: 'Teams', icon: Globe, top: '40%', left: '90%' },
];

const softwareServices = [
  { 
    id: 'fullstack', 
    title: 'Full-Stack Apps', 
    icon: Layers, 
    color: 'from-blue-400 to-indigo-600',
    desc: 'Scalable, cross-domain applications built with modern frameworks.',
    features: ['React/Next.js', 'Node.js/Python', 'Cloud Native']
  },
  { 
    id: 'content', 
    title: 'Content Engine', 
    icon: PenTool, 
    color: 'from-purple-400 to-pink-600',
    desc: 'AI-driven automation for text, image, and video creation.',
    features: ['Generative AI', 'Auto-Publishing', 'SEO Optimization']
  },
  { 
    id: 'workflow', 
    title: 'Workflow Robots', 
    icon: Zap, 
    color: 'from-amber-400 to-orange-600',
    desc: 'Eliminate manual tasks with intelligent software agents.',
    features: ['RPA Integration', 'API Orchestration', 'Error Handling']
  },
  { 
    id: 'data', 
    title: 'Data Intelligence', 
    icon: Database, 
    color: 'from-emerald-400 to-teal-600',
    desc: 'Centralized data pipelines and predictive analytics.',
    features: ['ETL Automation', 'ML Ops', 'Real-time BI']
  }
];

export const DigitalAutomationReplica: React.FC = () => {
  const { setActiveView } = useUI();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans overflow-x-hidden relative">
      <HeroMotionBackground />
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/60 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-3 shadow-sm">
          <div className="flex items-center gap-8">
            <Logo className="h-8" />
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#86868B]">
              <a href="#" className="text-[#1D1D1F] hover:text-primary transition-colors">Ecosystem</a>
              <a href="#" className="hover:text-primary transition-colors">Stack</a>
              <a href="#" className="hover:text-primary transition-colors">Automation</a>
              <a href="#" className="hover:text-primary transition-colors">Case Studies</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' })}
              className="hidden md:block bg-white/10 backdrop-blur-xl border border-white/20 text-[#1D1D1F] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white/20 transition-all shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.8)]"
            >
              Start Building
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
                <a href="#" className="hover:text-primary transition-colors">Stack</a>
                <a href="#" className="hover:text-primary transition-colors">Automation</a>
                <a href="#" className="hover:text-primary transition-colors">Case Studies</a>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' });
                  }}
                  className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-all"
                >
                  Start Building
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section - Software Map (Image 1 Style) */}
      <section className="relative h-screen min-h-[800px] w-full bg-white overflow-hidden flex items-center justify-center">
        {/* Abstract Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Software Automation 2.0
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">Digital Intelligence</span>
            </h1>
            <p className="text-xl text-[#86868B] leading-relaxed mb-10 max-w-lg">
              Trismart builds end-to-end software ecosystems. From automated content engines to cross-domain full-stack applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-primary/10 backdrop-blur-xl border border-primary/20 text-[#1D1D1F] font-bold rounded-full hover:bg-primary/20 transition-all flex items-center gap-2 group shadow-[8px_8px_16px_rgba(0,0,0,0.05),-8px_-8px_16px_rgba(255,255,255,0.8)]">
                View Stack
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-[#F5F5F7]/50 backdrop-blur-md border border-white text-[#1D1D1F] font-bold rounded-full hover:bg-[#E8E8ED] transition-all">
                Case Studies
              </button>
            </div>
          </motion.div>

          {/* Interactive Software Map (Image 1 & 4 Style) */}
          <div className="relative aspect-square w-full max-w-[600px] mx-auto">
            {/* Glass Map Container */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl border border-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] overflow-hidden">
              {/* Decorative "State River" of Data */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                <path d="M200 0C200 100 100 100 100 200C100 300 300 300 300 400" stroke="url(#river-grad)" strokeWidth="40" strokeOpacity="0.1" />
                <defs>
                  <linearGradient id="river-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Tiers/Modules (Image 1 Style) */}
              <div className="absolute top-10 left-10 w-40 p-4 bg-white/80 rounded-2xl shadow-sm border border-white">
                <p className="text-[10px] font-bold text-primary uppercase mb-1">Tier-1</p>
                <p className="text-xs font-bold">Content Engine</p>
                <div className="mt-2 h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-primary"></div>
                </div>
              </div>

              <div className="absolute top-40 left-10 w-40 p-4 bg-white/80 rounded-2xl shadow-sm border border-white">
                <p className="text-[10px] font-bold text-blue-500 uppercase mb-1">Tier-2</p>
                <p className="text-xs font-bold">Full-Stack Core</p>
                <div className="mt-2 h-1 w-full bg-blue-500/20 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-blue-500"></div>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 w-40 p-4 bg-white/80 rounded-2xl shadow-sm border border-white">
                <p className="text-[10px] font-bold text-emerald-500 uppercase mb-1">Tier-3</p>
                <p className="text-xs font-bold">Data Pipeline</p>
                <div className="mt-2 h-1 w-full bg-emerald-500/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-emerald-500"></div>
                </div>
              </div>

              {/* Central Processor Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-3xl shadow-xl border border-white flex items-center justify-center">
                <Cpu className="w-10 h-10 text-primary animate-pulse" />
              </div>

              {/* Floating Nodes (Image 4 Style) */}
              <div className="absolute top-20 right-20 w-32 p-4 bg-primary/10 backdrop-blur-md rounded-2xl border border-primary/20">
                <p className="text-[10px] font-bold text-primary uppercase">API Gateway</p>
                <p className="text-[8px] text-primary/60">Connected</p>
              </div>
            </div>

            {/* Compass Detail (Image 1 Style) */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white rounded-full shadow-2xl border border-white flex items-center justify-center">
              <div className="relative w-20 h-20 border border-gray-100 rounded-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-50"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-0.5 bg-gray-50"></div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-1 h-12 bg-red-500 rounded-full origin-center"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connectivity Ecosystem (Image 4 Style) */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Omnichannel Automation</h2>
            <p className="text-xl text-[#86868B] max-w-2xl mx-auto">
              We connect your software core to every major platform, automating content delivery and data synchronization.
            </p>
          </div>

          <div className="relative h-[600px] w-full max-w-4xl mx-auto">
            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#F5F5F7] rounded-[3rem] shadow-[inset_10px_10px_20px_rgba(0,0,0,0.05),inset_-10px_-10px_20px_rgba(255,255,255,0.8)] border border-white flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                <p className="text-xs font-bold text-[#1D1D1F]">Trismart Core</p>
              </div>
              <p className="text-[10px] text-[#86868B] leading-tight">
                "Automated content delivery for all prospects."
              </p>
            </div>

            {/* Connecting Lines & Nodes */}
            {ecosystemNodes.map((node) => (
              <div 
                key={node.id}
                className="absolute group cursor-pointer"
                style={{ top: node.top, left: node.left }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Connection Line (SVG) */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none -z-10 overflow-visible">
                  <motion.line 
                    x1="200" y1="200" 
                    x2={parseInt(node.left) > 50 ? 400 : 0} 
                    y2={parseInt(node.top) > 50 ? 400 : 0} 
                    stroke="currentColor" 
                    strokeWidth="1" 
                    className="text-primary/20"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: activeNode === node.id ? 1 : 0 }}
                  />
                </svg>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-white group-hover:scale-110 transition-all duration-300 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-[#F5F5F7] rounded-lg flex items-center justify-center text-[#1D1D1F]">
                    <node.icon className="w-4 h-4" />
                  </div>
                  <p className="text-[8px] font-bold uppercase tracking-widest">{node.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modular Service Grid (Image 2 Style) */}
      <section className="py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Software Modules</h2>
            <p className="text-xl text-[#86868B] max-w-2xl mx-auto">
              End-to-end software engineering and automation services for the modern enterprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {softwareServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col items-center text-center border border-white"
              >
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${service.color} p-0.5 mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full bg-white rounded-[calc(1.5rem-2px)] flex items-center justify-center text-[#1D1D1F]">
                    <service.icon className="w-10 h-10" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-[#86868B] text-sm leading-relaxed mb-8">
                  {service.desc}
                </p>

                <div className="w-full space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center justify-center gap-2 text-xs font-medium text-[#1D1D1F]">
                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="mt-auto w-full py-4 bg-white/50 backdrop-blur-md border border-white text-[#1D1D1F] font-bold rounded-2xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group/btn shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.8)]">
                  Explore Stack
                  <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* End-to-End Process Section */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">End-to-End Service</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">From Concept to <br /> <span className="text-primary">Cloud Scale.</span></h2>
              <p className="text-xl text-[#86868B] leading-relaxed mb-12">
                We don't just write code. We build resilient, automated software ecosystems that grow with your business.
              </p>

              <div className="space-y-8">
                {[
                  { title: 'System Architecture', desc: 'Designing high-availability, cross-domain software infrastructures.' },
                  { title: 'Full-Stack Development', desc: 'Building responsive web and mobile applications with modern stacks.' },
                  { title: 'Automation Engineering', desc: 'Implementing CI/CD, automated testing, and software robots.' },
                  { title: 'Security & Compliance', desc: 'Ensuring your data is protected with enterprise-grade encryption.' }
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
              {/* Neumorphic Dashboard Mockup (Image 2 Style) */}
              <div className="relative z-10 bg-[#F5F5F7] rounded-[3rem] p-12 shadow-[50px_50px_100px_rgba(0,0,0,0.1),-50px_-50px_100px_rgba(255,255,255,0.8)] border border-white">
                <div className="flex items-center justify-between mb-12">
                  <Logo className="h-6" />
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Deployment</p>
                        <p className="text-[10px] text-[#86868B]">v2.4.0 Live</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-emerald-500">99.9% Uptime</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-500">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Content Sync</p>
                        <p className="text-[10px] text-[#86868B]">12 Channels Active</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-primary">Automated</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-white/70 text-xs font-bold uppercase">System Health</p>
                      <Activity className="w-5 h-5" />
                    </div>
                    <div className="flex items-end gap-1 h-12">
                      {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-white/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button className="px-8 py-4 bg-white/80 backdrop-blur-md border border-white rounded-full shadow-[10px_10px_20px_rgba(0,0,0,0.05),-10px_-10px_20px_rgba(255,255,255,0.8)] text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                    Launch Console
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 bg-[#1D1D1F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">Build the future of your stack.</h2>
          <p className="text-xl text-white/60 mb-12">
            Trismart Automations provides the engineering excellence required to scale your digital presence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 bg-primary/10 backdrop-blur-xl border border-primary/20 text-white font-bold rounded-full hover:bg-primary/20 transition-all shadow-[10px_10px_20px_rgba(0,0,0,0.4),-10px_-10px_20px_rgba(255,255,255,0.05)]"
            >
              Start Your Project
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all">
              Request Stack Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
