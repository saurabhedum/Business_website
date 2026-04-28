
import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

interface BrochureProps {
  accentColor: string;
}

// --- ICONS & ASSETS ---
const Icons = {
  Globe: () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
  Precision: () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /><circle cx="12" cy="12" r="3" /></svg>,
  Shield: () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Coins: () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Close: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
};

const AdvancedIcons = {
  Optimization: () => (
    <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
       <path d="M20 80L40 60L60 70L90 20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white transition-colors" />
       <circle cx="20" cy="80" r="3" fill="currentColor" />
       <circle cx="40" cy="60" r="3" fill="currentColor" />
       <circle cx="60" cy="70" r="3" fill="currentColor" />
       <circle cx="90" cy="20" r="5" fill="currentColor" className="animate-ping" style={{ animationDuration: '3s' }} />
       <circle cx="90" cy="20" r="3" fill="currentColor" />
       <path d="M90 20L90 90" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
    </svg>
  ),
  Latency: () => (
    <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
       <circle cx="50" cy="50" r="40" strokeWidth="1" opacity="0.2" />
       <circle cx="50" cy="50" r="25" strokeWidth="1" opacity="0.4" />
       <line x1="50" y1="50" x2="50" y2="10" strokeWidth="2" strokeLinecap="round" className="origin-center animate-[spin_4s_linear_infinite]" />
       <circle cx="50" cy="10" r="3" fill="currentColor" className="animate-pulse" />
       <circle cx="50" cy="50" r="2" fill="currentColor" />
    </svg>
  ),
  Scale: () => (
    <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
       <rect x="10" y="70" width="15" height="30" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
       <rect x="35" y="50" width="15" height="50" strokeWidth="1" fill="currentColor" fillOpacity="0.3" />
       <rect x="60" y="30" width="15" height="70" strokeWidth="1" fill="currentColor" fillOpacity="0.5" />
       <rect x="85" y="10" width="15" height="90" strokeWidth="1" fill="currentColor" fillOpacity="0.8" className="animate-pulse" />
    </svg>
  ),
  Visibility: () => (
    <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
       <path d="M10 50C10 50 30 20 50 20C70 20 90 50 90 50C90 50 70 80 50 80C30 80 10 50 10 50Z" strokeWidth="2" strokeLinejoin="round" />
       <circle cx="50" cy="50" r="12" strokeWidth="2" />
       <circle cx="50" cy="50" r="4" fill="currentColor" className="animate-pulse" />
       <path d="M50 20V10" strokeWidth="1" opacity="0.5" />
       <path d="M50 80V90" strokeWidth="1" opacity="0.5" />
       <path d="M80 50H90" strokeWidth="1" opacity="0.5" />
       <path d="M10 50H20" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  Predictive: () => (
    <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
       <path d="M10 50 Q 30 10, 50 50 T 90 50" strokeWidth="2" strokeLinecap="round" className="animate-[pulse_3s_infinite]" />
       <path d="M10 50 Q 30 90, 50 50 T 90 50" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
       <circle cx="50" cy="50" r="3" fill="currentColor" />
       <line x1="10" y1="50" x2="90" y2="50" strokeWidth="1" opacity="0.1" />
    </svg>
  ),
  Process: () => (
    <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
       <path d="M25 40L45 60L75 30" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
       <rect x="15" y="15" width="70" height="70" rx="10" strokeWidth="1" opacity="0.3" />
       <path d="M25 80h50" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
};

// --- DATA STRUCTURES ---

interface SystemParam {
  id: string;
  category: 'PESTLE' | 'OPS' | 'FINANCE' | 'STRATEGY';
  name: string;
  val: string;
  delta: string;
  desc: string;
  impact: string;
  chartType: 'bar' | 'wave' | 'radar' | 'pie';
}

const SYSTEM_METRICS: SystemParam[] = [
  // PESTLE (6)
  { id: 'P-01', category: 'PESTLE', name: 'Political / Regs', val: '98.5%', delta: '+12%', desc: 'Cross-border data sovereignty compliance.', impact: 'Automated geo-fencing and regulatory reporting engines that adapt to local laws in real-time.', chartType: 'radar' },
  { id: 'E-02', category: 'PESTLE', name: 'Economic ROI', val: '4.2x', delta: '+0.8', desc: 'Capital efficiency per automation unit.', impact: 'Algorithmic resource allocation reducing waste and maximizing yield per dollar spent.', chartType: 'bar' },
  { id: 'S-03', category: 'PESTLE', name: 'Social / Labor', val: '-40%', delta: 'Hrs', desc: 'Reduction in manual repetitive labor.', impact: 'Shift from "Human-Middleware" to "Human-Strategy". We delete the boring work.', chartType: 'pie' },
  { id: 'T-04', category: 'PESTLE', name: 'Tech Debt', val: '0.05%', delta: '-92%', desc: 'Legacy system dependency rating.', impact: 'Modular API layers that strangle legacy code without breaking production uptime.', chartType: 'wave' },
  { id: 'L-05', category: 'PESTLE', name: 'Legal Risk', val: '0', delta: 'Flat', desc: 'Contract and SLA breach incidents.', impact: 'Smart contracts and automated SLA enforcement ensuring zero-breach operations.', chartType: 'radar' },
  { id: 'E-06', category: 'PESTLE', name: 'Enviro / Energy', val: '-22%', delta: 'KwH', desc: 'Server and machine energy optimization.', impact: 'Smart-sleep cycles for machinery and cloud compute scaling to minimize carbon footprint.', chartType: 'wave' },

  // OPERATIONS (5)
  { id: 'OP-01', category: 'OPS', name: 'Throughput', val: '12k', delta: '/sec', desc: 'Transaction processing volume.', impact: 'Vertical scaling architecture allowing infinite burst capacity during peak loads.', chartType: 'bar' },
  { id: 'OP-02', category: 'OPS', name: 'Latency', val: '14ms', delta: '-80%', desc: 'End-to-end workflow execution time.', impact: 'Event-driven architecture replacing batch polling with instant websocket triggers.', chartType: 'wave' },
  { id: 'OP-03', category: 'OPS', name: 'Error Rate', val: '0.001%', delta: 'Low', desc: 'Data handling and entry variance.', impact: 'Input validation gates and AI-based anomaly detection correcting errors pre-commit.', chartType: 'bar' },
  { id: 'OP-04', category: 'OPS', name: 'Uptime', val: '99.99%', delta: 'High', desc: 'System availability consistency.', impact: 'Self-healing Kubernetes clusters that restart failed nodes before users notice.', chartType: 'wave' },
  { id: 'OP-05', category: 'OPS', name: 'Scalability', val: 'Linear', delta: '1:1', desc: 'Cost to growth correlation.', impact: 'Decoupled architecture where revenue grows exponentially while costs grow logarithmically.', chartType: 'bar' },

  // FINANCE (5)
  { id: 'FN-01', category: 'FINANCE', name: 'OPEX', val: '-35%', delta: 'Decr', desc: 'Operational expenditure baseline.', impact: 'Replacement of varied contractor costs with fixed, predictable server costs.', chartType: 'bar' },
  { id: 'FN-02', category: 'FINANCE', name: 'CAPEX', val: 'Smart', delta: 'Opt', desc: 'Asset utilization efficiency.', impact: 'Predictive maintenance extending asset life and delaying replacement capital spend.', chartType: 'pie' },
  { id: 'FN-03', category: 'FINANCE', name: 'Cash Flow', val: 'T+1', delta: 'Fast', desc: 'Invoice to cash cycle time.', impact: 'Automated dunning, invoicing, and reconciliation reducing DSO (Days Sales Outstanding).', chartType: 'wave' },
  { id: 'FN-04', category: 'FINANCE', name: 'CAC', val: '-15%', delta: 'Drop', desc: 'Customer Acquisition Cost.', impact: 'Automated lead nurturing sequences increasing conversion rates without sales rep intervention.', chartType: 'radar' },
  { id: 'FN-05', category: 'FINANCE', name: 'Margin', val: '+18%', delta: 'Net', desc: 'Net profit margin expansion.', impact: 'Systemic removal of "hidden factory" costs and rework loops.', chartType: 'bar' },

  // STRATEGY (5)
  { id: 'ST-01', category: 'STRATEGY', name: 'Retention', val: '92%', delta: '+5%', desc: 'Customer lifecycle duration.', impact: 'Algorithmic health-checks triggering success teams before a customer churns.', chartType: 'wave' },
  { id: 'ST-02', category: 'STRATEGY', name: 'Compliance', val: '100%', delta: 'Pass', desc: 'Audit readiness state.', impact: 'Immutable logs create a perpetual, "always-on" audit trail for any regulator.', chartType: 'radar' },
  { id: 'ST-03', category: 'STRATEGY', name: 'Innovation', val: '2wk', delta: 'Sprints', desc: 'Feature deployment velocity.', impact: 'CI/CD pipelines allowing safe, daily deployments of new business logic.', chartType: 'bar' },
  { id: 'ST-04', category: 'STRATEGY', name: 'Data Integrity', val: 'Sanitized', delta: '100%', desc: 'Single source of truth reliability.', impact: 'Master Data Management (MDM) layers preventing duplicate or dirty data entry.', chartType: 'pie' },
  { id: 'ST-05', category: 'STRATEGY', name: 'Agility', val: 'High', delta: 'Fluid', desc: 'Market pivot reaction time.', impact: 'Modular rules engines allowing business logic changes without code redeployment.', chartType: 'radar' }
];

// --- INFOGRAPHIC COMPONENTS ---

const MiniChart = ({ type, color }: { type: string, color: string }) => {
  if (type === 'bar') {
    return (
      <svg viewBox="0 0 100 50" className="w-full h-full opacity-80">
        {[20, 35, 50, 45, 60, 75, 90].map((h, i) => (
           <rect key={i} x={i * 14} y={50 - h/2} width="8" height={h/2} fill={color} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </svg>
    );
  }
  if (type === 'wave') {
    return (
      <svg viewBox="0 0 100 50" className="w-full h-full opacity-80">
        <path d="M0 25 Q 12.5 5, 25 25 T 50 25 T 75 25 T 100 25" fill="none" stroke={color} strokeWidth="2" className="animate-pulse">
           <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M0 25 Q 12.5 5, 25 25 T 50 25 T 75 25 T 100 25; M0 25 Q 12.5 45, 25 25 T 50 25 T 75 25 T 100 25; M0 25 Q 12.5 5, 25 25 T 50 25 T 75 25 T 100 25" />
        </path>
        <path d="M0 35 Q 12.5 15, 25 35 T 50 35 T 75 35 T 100 35" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      </svg>
    );
  }
  if (type === 'radar') {
    return (
       <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
          <polygon points="50,10 90,40 70,90 30,90 10,40" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="50,25 75,45 65,75 35,75 25,45" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" className="animate-pulse" />
          <line x1="50" y1="50" x2="50" y2="10" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="50" y1="50" x2="90" y2="40" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="50" y1="50" x2="70" y2="90" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="50" y1="50" x2="30" y2="90" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="50" y1="50" x2="10" y2="40" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
       </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
       <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="2" fill="none" strokeDasharray="60 40" className="animate-spin-slow" />
       <circle cx="50" cy="50" r="25" fill={color} fillOpacity="0.3" />
    </svg>
  );
}

// --- MAIN COMPONENT ---

export const Brochure: React.FC<BrochureProps> = ({ accentColor }) => {
  const [activeFramework, setActiveFramework] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedParam, setSelectedParam] = useState<SystemParam | null>(null);

  const handleDownload = () => {
    window.print();
  };

  // Refined "Why" Data
  const WHY_AUTOMATION = [
    { id: "OP-01", title: "Capital Leakage", solution: "Algorithmic Efficiency", desc: "Manual workflows are hidden taxes. We replace human latency with instant trigger-based execution.", icon: <AdvancedIcons.Optimization />, stat: "-40% Overhead" },
    { id: "OP-02", title: "System Latency", solution: "Real-Time Core", desc: "Batch processing kills momentum. Our architectures move data the instant it's generated.", icon: <AdvancedIcons.Latency />, stat: "0ms Delay" },
    { id: "OP-03", title: "Scale Friction", solution: "Linear Decoupling", desc: "Disconnect revenue growth from headcount. Scale output exponentially, not your payroll.", icon: <AdvancedIcons.Scale />, stat: "10x Output" },
    { id: "OP-04", title: "Dark Data", solution: "Total Visibility", desc: "Silos hide truth. We convert physical and digital actions into a unified, auditable stream.", icon: <AdvancedIcons.Visibility />, stat: "100% Insight" },
    { id: "OP-05", title: "Variance Risk", solution: "Predictive Logic", desc: "Reactive maintenance is too expensive. We deploy sensors to predict failures before they occur.", icon: <AdvancedIcons.Predictive />, stat: "Pre-Emptive" },
    { id: "OP-06", title: "Human Error", solution: "Codified SOPs", desc: "Variance is the enemy of quality. We hardcode your best practices into the software layer.", icon: <AdvancedIcons.Process />, stat: "Zero Defects" }
  ];

  const WHY_US_PILLARS = [
    { title: "Wide Spectrum", subtitle: "One-Stop Sovereignty", desc: "We don't just patch software. From turnkey factory robotics to cloud-native ERPs, we own the entire stack.", icon: <Icons.Globe /> },
    { title: "Flawless Precision", subtitle: "Micron-Level Logic", desc: "With over a decade of high-stakes industrial experience, we know the nuances of 'zero-tolerance'.", icon: <Icons.Precision /> },
    { title: "Deep Reliability", subtitle: "Partner, Not Vendor", desc: "We bring profound knowledge of diverse technologies and long-term relations with global leaders.", icon: <Icons.Shield /> },
    { title: "Cost Efficiency", subtitle: "High-End, Low-Waste", desc: "Our solutions are elite, but our engineering is lean. We work with strict budgets to ensure minimum gap.", icon: <Icons.Coins /> }
  ];

  const SERVICES = [
    { category: "Process Engineering", role: "The Architect", items: ["Workflow Audits & Mapping", "SOP Digitalization", "Logic Extraction", "Bottleneck Discovery"] },
    { category: "System Integration", role: "The Bridge", items: ["API Orchestration", "Legacy Data Bridging", "Custom Middleware", "ERP/CRM Sync"] },
    { category: "Industrial IoT & Robotics", role: "The Muscle", items: ["Shop-floor Connectivity", "Sensor Data Pipelines", "SCADA/PLC Integration", "Asset Lifecycle Tracking"] },
    { category: "Observability & BAM", role: "The Brain", items: ["Custom Dashboards", "KPI Automation", "Real-time Alerting", "Financial Reporting"] }
  ];

  const FRAMEWORKS = [
    { id: '7S', title: 'McKinsey 7S', desc: 'Internal alignment audit for tech-staff synergy.', color: '#3b82f6' },
    { id: '5P', title: "Porter's 5", desc: 'Market leverage through automated moats.', color: '#f59e0b' },
    { id: 'VC', title: 'Value Chain', desc: 'Margin extraction from activity flows.', color: '#8b5cf6' },
    { id: 'LE', title: 'Lean 5S', desc: 'Digital hygiene and standardization.', color: '#10b981' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 relative">
      {/* Dynamic Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 theme-controls gap-6 print:hidden">
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-none overflow-x-auto max-w-full">
          {['THE MANIFESTO', 'THE SYSTEM', 'THE STRATEGY'].map((label, p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-4 md:px-6 py-2 text-[9px] font-mono transition-all uppercase tracking-widest whitespace-nowrap ${
                currentPage === p ? 'accent-bg text-white' : 'opacity-40 hover:opacity-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-blue-50 transition-all text-[10px] font-black uppercase tracking-widest shadow-xl shadow-white/5 whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Technical Brief (PDF)
        </button>
      </div>

      {/* Brochure Container */}
      <div className="brochure-page glass-panel border border-white/5 p-8 md:p-16 relative overflow-hidden bg-[#0a0a0a] min-h-[1100px] transition-all duration-700 shadow-2xl">
        <HeroMotionBackground />
        {/* Dynamic Background Effects */}
        <div className="absolute top-0 left-0 w-full h-1 accent-bg opacity-50"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* HEADER */}
        <header className="flex justify-between items-start mb-20 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Logo className="h-10 w-auto" accentColor={accentColor} />
            </div>
            <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.3em]">Business Engineering & Systemic Order</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-mono opacity-30 uppercase tracking-widest leading-none">
              TR-V2.5-2025 // CONFIDENTIAL <br />
              SYSTEM_CORE_DOC
            </p>
          </div>
        </header>

        {/* PAGE 0: THE MANIFESTO (Why & Why Us) */}
        {currentPage === 0 && (
          <div className="animate-in duration-500">
            {/* INTRO HERO */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
              <div className="lg:col-span-7">
                <span className="inline-block px-3 py-1 border border-white/20 text-[10px] font-mono accent-text mb-6 tracking-widest">A STEP BEYOND IN AUTOMATION</span>
                <h2 className="text-[80px] font-black uppercase leading-[0.85] tracking-tighter mb-10">
                  FUTURE <br />
                  <span className="accent-text opacity-90">IS SYSTEMIC.</span>
                </h2>
                <p className="text-xl text-white/50 font-light leading-relaxed mb-8 max-w-lg">
                  Organizations fail when they rely on <span className="text-white font-medium">talent over logic</span>. We implement the architectures that make consistency inevitable.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-end">
                 {/* Visual Statistic */}
                 <div className="glass-panel p-8 border-l-4 border-l-white/20 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                         <svg className="w-20 h-20 animate-spin-slow" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="10 5" /></svg>
                     </div>
                     <div className="text-[10px] font-mono uppercase tracking-widest mb-2 opacity-50">Operational Philosophy</div>
                     <div className="text-2xl font-light italic leading-relaxed text-white/80">
                        "If data is the new oil, automation is the growth engine that refines it into profit."
                     </div>
                 </div>
              </div>
            </div>

            {/* SECTION: ENTROPY VS ORDER (THE WHY) */}
            <div className="mb-24">
               <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                 <h3 className="text-xs font-mono accent-text uppercase tracking-[0.4em]">Diagnostic: Entropy vs Order</h3>
                 <span className="text-[9px] font-mono opacity-30 uppercase">System Status: Analysis</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
                  {WHY_AUTOMATION.map((item, i) => (
                    <div key={i} className="relative bg-[#0b0b0b] p-8 group hover:bg-[#111] transition-all duration-300 overflow-hidden">
                      {/* Hover Reveal Background */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--accent)_0%,_transparent_40%)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                      
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-white/20 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                           {item.icon}
                        </span>
                        <span className="text-[9px] font-mono text-white/10 group-hover:text-white/40 transition-colors">{item.id}</span>
                      </div>
                      
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white/40 group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h4>
                      
                      {/* The Pivot: Problem to Solution */}
                      <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                          <div className="py-2 flex items-center gap-2">
                             <div className="h-[1px] w-4 bg-white/20"></div>
                             <span className="text-[10px] font-mono uppercase text-white/40">Re-Engineering</span>
                          </div>
                      </div>

                      <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-white group-hover:accent-text transition-colors translate-y-2 group-hover:translate-y-0 duration-300">
                        {item.solution}
                      </h4>

                      <p className="text-[11px] text-white/40 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {item.desc}
                      </p>

                      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/5 flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
                         <span className="text-[9px] font-mono uppercase tracking-widest">Impact</span>
                         <span className="text-[10px] font-bold accent-text">{item.stat}</span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* SECTION: THE TRISMART STANDARD (WHY US) */}
            <div className="relative">
                <div className="absolute -top-10 left-0 text-[120px] font-black text-white/[0.02] pointer-events-none select-none tracking-tighter z-0">
                    ASSURANCE
                </div>
                
                <div className="relative z-10 mb-8 flex justify-between items-end">
                    <h3 className="text-xs font-mono accent-text uppercase tracking-[0.4em]">The Trismart Standard // Why Us</h3>
                    <div className="h-1 w-20 accent-bg"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {WHY_US_PILLARS.map((pillar, idx) => (
                        <div key={idx} className="glass-panel border border-white/10 p-6 flex flex-col justify-between group hover:border-white/30 transition-all">
                            <div className="mb-6">
                                <div className="mb-4 text-white/30 group-hover:text-white transition-colors duration-300">
                                    {pillar.icon}
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-tight mb-1 group-hover:text-white transition-colors">{pillar.title}</h4>
                                <span className="text-[9px] font-mono uppercase tracking-widest accent-text mb-4 block">{pillar.subtitle}</span>
                                <div className="w-8 h-[1px] bg-white/20 group-hover:w-full transition-all duration-500 mb-4"></div>
                                <p className="text-[10px] text-white/50 leading-relaxed font-light group-hover:text-white/70">
                                    {pillar.desc}
                                </p>
                            </div>
                            <div className="text-[8px] font-mono opacity-20 uppercase tracking-widest text-right group-hover:opacity-50">
                                Protocol 0{idx+1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* PAGE 1: THE SYSTEM (Global Parameter Grid) */}
        {currentPage === 1 && (
          <div className="animate-in duration-500 relative">
             <div className="flex justify-between items-end mb-12">
               <div>
                  <h3 className="text-xs font-mono accent-text uppercase tracking-[0.4em] mb-4">Global System Telemetry</h3>
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Performance Matrix</h2>
               </div>
               <div className="text-right hidden md:block">
                  <p className="text-[9px] font-mono opacity-40 uppercase tracking-widest">Active Parameters: 21</p>
                  <p className="text-[9px] font-mono opacity-40 uppercase tracking-widest">System Status: Monitoring</p>
               </div>
             </div>
             
             {/* THE GRID */}
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 relative z-10">
                {SYSTEM_METRICS.map((param, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedParam(param)}
                    className="group relative p-4 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-left overflow-hidden h-[140px] flex flex-col justify-between"
                  >
                     <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full accent-bg animate-pulse"></div>
                     </div>
                     
                     {/* Category Label */}
                     <span className="text-[8px] font-mono opacity-30 uppercase tracking-widest group-hover:accent-text transition-colors">
                       {param.category}
                     </span>
                     
                     {/* Value & Delta */}
                     <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-bold font-mono tracking-tight text-white group-hover:scale-105 transition-transform origin-left">
                          {param.val}
                        </span>
                        <span className="text-[9px] font-mono text-white/50">{param.delta}</span>
                     </div>

                     {/* Name */}
                     <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
                           {param.name}
                        </h4>
                        <div className="h-[1px] w-0 group-hover:w-full accent-bg transition-all duration-500 mt-2"></div>
                     </div>

                     {/* Bg Effect */}
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] pointer-events-none bg-gradient-to-br from-transparent to-white"></div>
                  </button>
                ))}
                
                {/* Filler blocks to complete grid aesthetic */}
                <div className="bg-white/[0.02] border border-white/5 flex items-center justify-center">
                   <div className="text-[8px] font-mono opacity-20 uppercase rotate-45">SYS_END</div>
                </div>
                <div className="bg-white/[0.02] border border-white/5"></div>
             </div>

             {/* INTERACTIVE DETAIL OVERLAY (MODAL) */}
             {selectedParam && (
               <div className="absolute inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60 animate-in fade-in duration-200">
                  <div className="w-full max-w-3xl glass-panel border accent-border p-1 shadow-2xl relative overflow-hidden">
                     {/* Modal Background FX */}
                     <div className="absolute inset-0 bg-[#0a0a0a] z-0"></div>
                     <div className="absolute top-0 left-0 w-full h-[2px] accent-bg z-10"></div>
                     <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                     <div className="relative z-10 flex flex-col md:flex-row h-full min-h-[400px]">
                        {/* LEFT: INFO */}
                        <div className="w-full md:w-1/2 p-10 flex flex-col justify-between border-r border-white/10">
                           <div>
                              <div className="flex justify-between items-start mb-6">
                                 <span className="px-2 py-1 bg-white/10 text-[9px] font-mono uppercase tracking-widest rounded-sm accent-text border border-white/10">
                                   {selectedParam.category} :: {selectedParam.id}
                                 </span>
                                 <button onClick={() => setSelectedParam(null)} className="text-white/40 hover:text-white transition-colors">
                                    <Icons.Close />
                                 </button>
                              </div>
                              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-none">{selectedParam.name}</h2>
                              <p className="text-sm text-white/50 leading-relaxed mb-8">{selectedParam.desc}</p>
                           </div>

                           <div>
                              <div className="mb-2 text-[9px] font-mono uppercase tracking-widest text-white/30">Automation Impact</div>
                              <div className="p-4 border border-white/10 bg-white/5 backdrop-blur-md">
                                 <p className="text-sm font-bold text-white leading-relaxed">
                                   <span className="accent-text mr-2">»</span>
                                   {selectedParam.impact}
                                 </p>
                              </div>
                           </div>
                        </div>

                        {/* RIGHT: VISUALIZATION */}
                        <div className="w-full md:w-1/2 p-10 bg-black relative flex flex-col justify-center items-center overflow-hidden">
                           <div className="absolute inset-0 opacity-20">
                              <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite]"></div>
                           </div>
                           
                           {/* Dynamic Chart Container */}
                           <div className="w-48 h-48 relative mb-8">
                              <MiniChart type={selectedParam.chartType} color={accentColor} />
                           </div>

                           <div className="grid grid-cols-3 gap-8 w-full border-t border-white/10 pt-8">
                              <div className="text-center">
                                 <div className="text-[9px] font-mono uppercase opacity-40 mb-1">Current</div>
                                 <div className="text-xl font-bold font-mono">{selectedParam.val}</div>
                              </div>
                              <div className="text-center border-l border-white/10 border-r">
                                 <div className="text-[9px] font-mono uppercase opacity-40 mb-1">Delta</div>
                                 <div className="text-xl font-bold font-mono accent-text">{selectedParam.delta}</div>
                              </div>
                              <div className="text-center">
                                 <div className="text-[9px] font-mono uppercase opacity-40 mb-1">Status</div>
                                 <div className="flex justify-center mt-1"><div className="w-2 h-2 rounded-full accent-bg animate-pulse"></div></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </div>
        )}

        {/* PAGE 2: STRATEGY & SERVICES (Hybrid Portfolio) */}
        {currentPage === 2 && (
          <div className="animate-in duration-500">
             <div className="mb-20">
               <h3 className="text-xs font-mono accent-text uppercase tracking-[0.4em] mb-12">Service Portfolio // Rev 2025</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SERVICES.map((s, i) => (
                    <div key={i} className="p-8 glass-panel border border-white/10 bg-white/2 hover:bg-white/5 transition-all group">
                      <div className="text-[9px] font-mono opacity-30 uppercase tracking-widest mb-2">{s.role}</div>
                      <h5 className="font-black uppercase text-sm tracking-tight mb-6 text-white group-hover:accent-text transition-colors">{s.category}</h5>
                      <div className="h-[1px] w-8 accent-bg mb-6"></div>
                      <ul className="space-y-3">
                        {s.items.map((item, idx) => (
                          <li key={idx} className="text-[10px] text-white/50 leading-tight flex items-start gap-2">
                            <span className="opacity-20 mt-1 text-[8px]">■</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
               </div>
             </div>

             <div className="mb-12">
                <h3 className="text-xs font-mono uppercase tracking-[0.4em] mb-8 opacity-40">Interactive Strategy Framework Exploration</h3>
                <div className="flex flex-col lg:flex-row gap-8">
                   <div className="w-full lg:w-1/3 space-y-2">
                     {FRAMEWORKS.map((fw, idx) => (
                       <button
                         key={idx}
                         onClick={() => setActiveFramework(idx)}
                         className={`w-full text-left p-6 transition-all border ${
                           activeFramework === idx 
                             ? 'bg-white/5 border-white/20' 
                             : 'border-transparent opacity-40 hover:opacity-100'
                         }`}
                       >
                         <span className="text-[9px] font-mono uppercase tracking-[0.3em] block mb-2" style={{ color: fw.color }}>FRAMEWORK_0{idx+1}</span>
                         <h4 className="font-bold uppercase tracking-tight text-sm">{fw.title}</h4>
                       </button>
                     ))}
                   </div>
                   <div className="flex-grow p-12 bg-white/5 border border-white/10 relative overflow-hidden flex flex-col justify-center">
                      <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: FRAMEWORKS[activeFramework].color }}></div>
                      <h4 className="text-3xl font-black uppercase tracking-tighter mb-6">The {FRAMEWORKS[activeFramework].title} Audit</h4>
                      <p className="text-lg text-white/50 font-light leading-relaxed mb-10">{FRAMEWORKS[activeFramework].desc}</p>
                      <div className="grid grid-cols-2 gap-8 text-[10px] font-mono uppercase tracking-widest opacity-40">
                         <div className="border-l border-white/20 pl-4">Target: Structural Logic</div>
                         <div className="border-l border-white/20 pl-4">Output: Profit Optimization</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* UNIVERSAL FOOTER */}
        <footer className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12 relative z-10 pointer-events-none opacity-20 transition-opacity hover:opacity-100">
          <div className="text-[8px] font-mono uppercase tracking-[0.5em] space-y-1">
            <p>Trismart Automation Collective</p>
            <p>Global Systems Engineering HQ</p>
            <p>© 2025 Order Beats Hustle.</p>
          </div>
          <div className="text-right flex items-center gap-6">
             <div className="flex flex-col items-end">
                <p className="text-[10px] font-black uppercase tracking-widest italic mb-1">Scale with Precision.</p>
                <p className="text-[8px] font-mono opacity-50 uppercase tracking-tighter">WWW.TRISMARTAUTOMATION.COM</p>
             </div>
             <Logo className="h-12 w-auto" accentColor={accentColor} />
          </div>
        </footer>
      </div>

      {/* Post-brochure CTA */}
      <div className="mt-20 text-center theme-controls print:hidden">
        <p className="text-sm opacity-40 mb-10 italic max-w-md mx-auto">Ready to bridge your operational gaps with world-class engineering?</p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95"
        >
          Book Technical Discovery Call
        </button>
      </div>
    </div>
  );
};
