import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, Filter, ArrowRight, CheckCircle2, Database, Target, Zap, ClipboardCheck, ChevronRight, ChevronLeft, RefreshCw, Activity, Layers, Cpu, Network } from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { AUTOMATION_PATTERNS, ANALYTICS_PATTERNS, FORESIGHT_TOOLS, Pattern } from '../src/constants/patterns';
import { DOMAINS, getQuestionsForDomain, calculateScore, getTier, generateReport } from '../src/constants/assessment';

type PageType = 'methodology' | 'automation' | 'analytics' | 'foresight' | 'assessment';

import { TiltCard } from './ui/TiltCard';

export const AboutModal: React.FC = () => {
  const { isAboutModalOpen, closeAboutModal, openContactModal } = useUI();
  const [activePage, setActivePage] = useState<PageType>('methodology');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);

  // Assessment State
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentPatterns = useMemo(() => {
    if (activePage === 'automation') return AUTOMATION_PATTERNS;
    if (activePage === 'analytics') return ANALYTICS_PATTERNS;
    if (activePage === 'foresight') return FORESIGHT_TOOLS;
    return [];
  }, [activePage]);

  const filteredPatterns = useMemo(() => {
    return currentPatterns.filter(p => {
      const matchFilter = activeFilter === 'all' || p.category === activeFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.label.toLowerCase().includes(q) ||
        p.triggers.some(t => t.toLowerCase().includes(q)) ||
        p.desc.toLowerCase().includes(q) ||
        p.useWhen.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [currentPatterns, searchQuery, activeFilter]);

  const filters = useMemo(() => {
    const uniqueCategories = Array.from(new Set(currentPatterns.map(p => p.category)));
    return [
      { id: 'all', label: 'All' },
      ...uniqueCategories.map(cat => ({
        id: cat,
        label: currentPatterns.find(p => p.category === cat)?.categoryLabel || cat
      }))
    ];
  }, [currentPatterns]);

  useEffect(() => {
    setActiveFilter('all');
    setSearchQuery('');
  }, [activePage]);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setShowResults(true);
        }, 500);
      }
      setAnalysisProgress(progress);
    }, 200);
  };

  const resetAssessment = () => {
    setSelectedDomain(null);
    setAssessmentStep(0);
    setAnswers({});
    setShowResults(false);
    setAnalysisProgress(0);
  };

  if (!isAboutModalOpen) return null;

  const navItems: { id: PageType; label: string; icon: any }[] = [
    { id: 'methodology', label: 'Methodology', icon: Layers },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: Database },
    { id: 'foresight', label: 'Foresight', icon: Target },
    { id: 'assessment', label: 'Assessment', icon: ClipboardCheck },
  ];

  const questions = selectedDomain ? getQuestionsForDomain(selectedDomain) : [];
  const score = calculateScore(answers);
  const tier = getTier(score);
  const reportText = selectedDomain ? generateReport(selectedDomain, score) : '';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 font-sans overflow-hidden">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#040D1A]/95 backdrop-blur-2xl" 
        onClick={closeAboutModal}
      />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-7xl h-[95vh] bg-[#040D1A] rounded-2xl border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)] overflow-hidden flex flex-col"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Header */}
        <div className="relative z-10 flex flex-col border-b border-white/5 bg-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between p-4 md:px-6">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase font-mono">
                  TRI<span className="text-blue-400">SMART</span> <span className="text-blue-500/50 ml-2">//</span> <span className="text-gray-400">INTELLIGENCE</span>
                </h2>
                <p className="text-[10px] text-blue-500/70 font-mono mt-1 tracking-widest uppercase">v4.0.0 // STRATEGIC SYSTEMS</p>
              </div>
            </div>
            <button 
              onClick={closeAboutModal}
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1 p-2 bg-white/[0.02] border-t border-white/5 overflow-x-auto sleek-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest font-mono transition-all whitespace-nowrap ${
                  activePage === item.id 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <item.icon className="w-3 h-3" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-12 relative z-10 sleek-scrollbar">
          
          <AnimatePresence mode="wait">
            {activePage === 'methodology' && (
              <motion.div
                key="methodology"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-16 max-w-5xl mx-auto"
              >
                <div className="text-center space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase font-mono"
                  >
                    How We Operate
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase font-mono"
                  >
                    The Trismart <span className="text-blue-400 italic">Method</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg leading-relaxed font-light max-w-3xl mx-auto"
                  >
                    We don't just build software. We identify the underlying patterns of your business problems and deploy intelligent systems to solve them permanently.
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
                  {[
                    {
                      step: "01",
                      title: "Pattern Recognition",
                      description: "We analyze your workflows, data pipelines, and strategic blindspots to identify recurring inefficiencies. This establishes the baseline for intelligent intervention.",
                      icon: Search,
                      color: "#3b82f6"
                    },
                    {
                      step: "02",
                      title: "System Architecture",
                      description: "We select the exact combination of Automation, Analytics, and Foresight patterns required to solve the root problem. This blueprint ensures scalable and resilient operations.",
                      icon: Network,
                      color: "#8b5cf6"
                    },
                    {
                      step: "03",
                      title: "Build & Deploy",
                      description: "We rapidly engineer and deploy the intelligent system, integrating it seamlessly with your existing technology stack. Our deployment minimizes downtime and accelerates time-to-value.",
                      icon: Cpu,
                      color: "#10b981"
                    },
                    {
                      step: "04",
                      title: "Compound Intelligence",
                      description: "As the system runs, it gathers data, learns, and provides increasingly accurate predictive insights over time. This creates a compounding advantage against competitors.",
                      icon: Activity,
                      color: "#f59e0b"
                    }
                  ].map((item, i) => (
                    <TiltCard key={i} className="h-full">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-white/20 transition-all h-full shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]"
                      >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                          <item.icon className="w-32 h-32" style={{ color: item.color }} />
                        </div>
                        <div className="text-5xl font-black text-white/10 font-mono mb-4">{item.step}</div>
                        <h3 className="text-2xl font-bold text-white uppercase font-mono tracking-tighter mb-4" style={{ color: item.color }}>{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed relative z-10">{item.description}</p>
                      </motion.div>
                    </TiltCard>
                  ))}
                </div>
              </motion.div>
            )}

            {(activePage === 'automation' || activePage === 'analytics' || activePage === 'foresight') && (
              <motion.div
                key={activePage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase font-mono"
                  >
                    {activePage === 'automation' ? 'Intelligent Automation' : activePage === 'analytics' ? 'Data Intelligence' : 'Strategic Foresight'}
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase font-mono"
                  >
                    {activePage === 'automation' ? (
                      <>AI Pattern <span className="text-blue-400 italic">Recognition</span></>
                    ) : activePage === 'analytics' ? (
                      <>Data <span className="text-blue-400 italic">Advantage</span></>
                    ) : (
                      <>Strategic <span className="text-blue-400 italic">Foresight</span></>
                    )}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg leading-relaxed font-light"
                  >
                    {activePage === 'automation' 
                      ? 'Every business problem follows a pattern. Trismart identifies yours and deploys the right intelligent automation system.'
                      : activePage === 'analytics'
                      ? 'Turn your raw data into an unfair competitive advantage with our advanced analytics intelligence patterns.'
                      : 'See what comes next. Our foresight tools give you 360° vision across time, technology, and market disruption.'}
                  </motion.p>
                </div>

                {/* Search & Filters */}
                <div className="space-y-6">
                  <div className="max-w-xl mx-auto relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    <input 
                      type="text"
                      placeholder={`Search ${activePage} patterns...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-mono text-sm"
                    />
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {filters.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest font-mono transition-all border ${
                          activeFilter === f.id 
                            ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                            : 'bg-white/5 text-gray-500 border-white/10 hover:border-white/20 hover:text-gray-300'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Patterns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredPatterns.map((p, i) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        onClick={() => setSelectedPattern(p)}
                        className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] overflow-hidden"
                      >
                        <div 
                          className="absolute top-0 left-0 w-1 h-full transition-all group-hover:w-2"
                          style={{ backgroundColor: p.accent }}
                        />

                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="text-[10px] font-mono font-bold tracking-widest mb-1" style={{ color: p.accent }}>
                              {p.id} · {p.label}
                            </div>
                            <h3 className="text-lg font-black text-white uppercase font-mono tracking-tighter group-hover:text-blue-400 transition-colors">
                              {p.title}
                            </h3>
                          </div>
                          <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: p.accent }}>
                            {p.icon}
                          </div>
                        </div>

                        <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
                          <span className="font-bold text-gray-300">Use when:</span> {p.useWhen}
                        </p>

                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                          <div className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">
                            ⟶ {p.outcome.slice(0, 30) + '...'}
                          </div>
                          <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                            {p.complexity}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activePage === 'assessment' && (
              <motion.div
                key="assessment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                {!selectedDomain ? (
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <h2 className="text-3xl md:text-5xl font-black text-white uppercase font-mono tracking-tighter">Select Your Industry</h2>
                      <p className="text-gray-400 font-light">Choose your domain to tailor the foresight assessment engine.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {DOMAINS.map(domain => (
                        <button
                          key={domain.id}
                          onClick={() => setSelectedDomain(domain.id)}
                          className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500 hover:bg-blue-500/10 transition-all text-center group"
                        >
                          <div className="text-sm font-bold text-gray-300 group-hover:text-blue-400 font-mono uppercase tracking-widest">
                            {domain.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : !showResults ? (
                  <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 space-y-8 relative overflow-hidden">
                    {isAnalyzing ? (
                      <div className="text-center space-y-8 py-12">
                        <div className="relative w-32 h-32 mx-auto">
                          <svg className="w-full h-full rotate-[-90deg]">
                            <circle cx="64" cy="64" r="60" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="4" />
                            <circle 
                              cx="64" cy="64" r="60" fill="none" stroke="#3b82f6" strokeWidth="4" 
                              strokeDasharray={2 * Math.PI * 60}
                              strokeDashoffset={2 * Math.PI * 60 * (1 - analysisProgress / 100)}
                              className="transition-all duration-300"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <RefreshCw className="w-10 h-10 text-blue-400 animate-spin" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-black text-white uppercase font-mono tracking-tighter">Analyzing Strategic Position...</h3>
                          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Scanning industry pattern database // {Math.round(analysisProgress)}%</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest flex justify-between">
                            <span>Step {assessmentStep + 1} of {questions.length}</span>
                            <span className="text-gray-500">{DOMAINS.find(d => d.id === selectedDomain)?.label}</span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-black text-white uppercase font-mono tracking-tighter leading-tight">
                            {questions[assessmentStep].q}
                          </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {questions[assessmentStep].opts.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => setAnswers({ ...answers, [assessmentStep]: idx })}
                              className={`p-5 rounded-xl text-left text-sm font-mono transition-all border ${
                                answers[assessmentStep] === idx
                                  ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${answers[assessmentStep] === idx ? 'border-blue-400' : 'border-gray-600'}`}>
                                  {answers[assessmentStep] === idx && <div className="w-2 h-2 bg-blue-400 rounded-full" />}
                                </div>
                                {opt}
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-8 border-t border-white/5">
                          <button
                            onClick={() => {
                              if (assessmentStep === 0) setSelectedDomain(null);
                              else setAssessmentStep(s => s - 1);
                            }}
                            className="flex items-center gap-2 text-gray-500 hover:text-white transition-all font-mono text-xs uppercase tracking-widest"
                          >
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          {assessmentStep < questions.length - 1 ? (
                            <button
                              disabled={answers[assessmentStep] === undefined}
                              onClick={() => setAssessmentStep(s => s + 1)}
                              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-xl font-bold transition-all font-mono text-xs uppercase tracking-widest disabled:opacity-50"
                            >
                              Next <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              disabled={answers[assessmentStep] === undefined}
                              onClick={handleStartAnalysis}
                              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-xl font-bold transition-all font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                            >
                              Generate Report <Target className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="bg-gradient-to-br from-[#0A0F1C] to-[#040D1A] border border-blue-500/30 rounded-3xl p-8 md:p-12 space-y-8">
                      <div className="text-center space-y-4">
                        <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold tracking-widest uppercase font-mono mb-4">
                          {DOMAINS.find(d => d.id === selectedDomain)?.label} Analysis
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase font-mono tracking-tighter">
                          Score: <span className={tier.color}>{Math.round(score)}</span>/100
                        </h2>
                        <div className={`text-xl font-bold uppercase tracking-widest font-mono ${tier.color}`}>
                          Tier: {tier.name}
                        </div>
                        <p className="text-gray-400 max-w-2xl mx-auto">{tier.desc}</p>
                      </div>

                      <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                        <h3 className="text-sm font-bold text-white uppercase font-mono tracking-widest mb-4">Strategic Diagnosis</h3>
                        <p className="text-gray-300 leading-relaxed font-light">{reportText}</p>
                      </div>

                      <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <button 
                          onClick={() => { closeAboutModal(); openContactModal(); }}
                          className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-xl font-bold transition-all font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        >
                          Discuss Implementation
                        </button>
                        <button 
                          onClick={resetAssessment}
                          className="px-8 py-4 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-mono text-xs uppercase tracking-widest"
                        >
                          Retake Assessment
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Bar */}
          {activePage !== 'assessment' && activePage !== 'methodology' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5 bg-white/[0.02] rounded-3xl">
              {[
                { label: 'Intelligence Patterns', value: AUTOMATION_PATTERNS.length + ANALYTICS_PATTERNS.length },
                { label: 'Foresight Tools', value: FORESIGHT_TOOLS.length },
                { label: 'ROI Potential', value: '4.7x' },
                { label: 'Combinations', value: '∞' },
              ].map((stat, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="text-3xl font-black text-blue-400 font-mono tracking-tighter">{stat.value}</div>
                  <div className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="text-center py-12 space-y-4">
            <div className="text-xl font-black text-white tracking-tighter uppercase font-mono">
              TRI<span className="text-blue-400">SMART</span>
            </div>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
              Intelligent Systems · <a href="https://trismart.tech" className="text-blue-400 hover:underline">trismart.tech</a>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPattern && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedPattern(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A0F1C] border border-blue-500/30 rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] sleek-scrollbar"
            >
              <button 
                onClick={() => setSelectedPattern(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-8">
                <div>
                  <div className="text-xs font-mono font-bold tracking-widest mb-2 uppercase" style={{ color: selectedPattern.accent }}>
                    {selectedPattern.id} · {selectedPattern.categoryLabel}
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase font-mono tracking-tighter">
                    {selectedPattern.title}
                  </h2>
                  <div className="text-xs text-gray-500 font-mono mt-2">
                    Pattern: {selectedPattern.label} · Complexity: {selectedPattern.complexity}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">When to use this pattern</div>
                  <p className="text-gray-300 leading-relaxed">{selectedPattern.desc}</p>
                </div>

                <div className="space-y-4">
                  <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Business triggers — look for these phrases</div>
                  <div className="space-y-3">
                    {selectedPattern.examples.map((ex, i) => (
                      <div key={i} className="p-4 bg-blue-500/5 border-l-2 border-blue-400 rounded-r-lg text-sm text-gray-300 italic">
                        {ex}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">What Trismart delivers</div>
                  <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-mono leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 mb-3" />
                    {selectedPattern.outcome}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => {
                      setSelectedPattern(null);
                      closeAboutModal();
                      openContactModal();
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 rounded-xl transition-all font-mono uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  >
                    Discuss this pattern
                  </button>
                  <button 
                    onClick={() => setSelectedPattern(null)}
                    className="px-8 py-4 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-mono uppercase tracking-widest text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
