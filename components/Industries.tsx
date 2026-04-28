import React, { useEffect, useRef, useState } from 'react';
import { 
  Landmark, 
  HeartPulse, 
  Factory, 
  ShoppingCart, 
  Truck, 
  Monitor,
  Brain,
  Leaf,
  Newspaper,
  Utensils,
  Bot,
  Stethoscope,
  Package,
  Glasses,
  Cpu,
  Briefcase,
  Film,
  Building2,
  X,
  CheckCircle,
  BarChart3,
  FileText,
  ArrowRight,
  Megaphone,
  Users
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

type IndustryDetails = {
  name: string;
  icon: any;
  description: string;
  automationValue: string;
  whyTrismart: string;
  services: string[];
  serviceHighlights: string[];
  industryMapping: { id: string; label: string };
  statistics: { label: string; value: string }[];
  caseStudy: { title: string; description: string; result: string };
  image: string;
};

const industries: IndustryDetails[] = [
  { 
    name: 'Financial Services & FinTech', 
    icon: Landmark,
    description: 'Modernizing financial infrastructure with secure, high-frequency automation.',
    automationValue: 'Streamlining reconciliation, fraud detection, and compliance reporting.',
    whyTrismart: 'We build audit-proof, scalable automation layers for legacy banking systems.',
    services: ['Algorithmic Trading', 'Fraud Detection AI', 'Automated Compliance', 'Smart Contracts'],
    serviceHighlights: ['High-Frequency Trading', 'DeFi Integration', 'Risk Modeling'],
    industryMapping: { id: 'fintech', label: 'Financial Tech' },
    statistics: [{ label: 'Processing Speed', value: '5x' }, { label: 'Fraud Reduction', value: '40%' }],
    caseStudy: { title: 'Global Bank Automation', description: 'End-to-end RPA for loan processing.', result: 'Reduced approval time by 80%.' },
    image: 'https://images.unsplash.com/photo-1616803140344-6682afb13cda?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'Healthcare & MedTech', 
    icon: HeartPulse,
    description: 'Empowering clinicians with intelligent, HIPAA-compliant automation.',
    automationValue: 'Synchronizing patient data and automating administrative workflows.',
    whyTrismart: 'We bridge the gap between patient portals and EMRs securely.',
    services: ['Predictive Patient Analytics', 'Telemedicine Platforms', 'Automated Billing', 'Medical Image Analysis'],
    serviceHighlights: ['EHR Integration', 'Telehealth AI', 'Predictive Diagnostics'],
    industryMapping: { id: 'health', label: 'Healthcare Tech' },
    statistics: [{ label: 'Admin Overhead', value: '-40%' }, { label: 'Diagnostic Accuracy', value: '99%' }],
    caseStudy: { title: 'Smart Hospital Integration', description: 'IoT-based patient monitoring.', result: 'Improved response times by 60%.' },
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'E-commerce & D2C', 
    icon: ShoppingCart,
    description: 'Creating seamless, personalized shopping experiences at scale.',
    automationValue: 'Automating inventory, marketing, and checkout processes.',
    whyTrismart: 'We connect physical and digital storefronts for omnichannel success.',
    services: ['Inventory Management', 'Personalized Marketing', 'Automated Checkout', 'Customer Journey Mapping'],
    serviceHighlights: ['Dynamic Pricing', 'Cart Abandonment AI', 'Omnichannel Sync'],
    industryMapping: { id: 'ecommerce', label: 'Retail & D2C' },
    statistics: [{ label: 'Sales Growth', value: '+25%' }, { label: 'Retention', value: '+15%' }],
    caseStudy: { title: 'Omnichannel Sync', description: 'Unified data across platforms.', result: 'Reduced stockouts by 40%.' },
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'Real Estate & PropTech', 
    icon: Building2,
    description: 'Optimizing property management and enhancing tenant experiences.',
    automationValue: 'Automating leasing, maintenance, and energy management.',
    whyTrismart: 'We integrate smart building systems with automated management platforms.',
    services: ['Lease Automation', 'Smart Building Management', 'Maintenance Scheduling', 'Tenant Portals'],
    serviceHighlights: ['Smart HVAC', 'Automated Leasing', 'IoT Security'],
    industryMapping: { id: 'proptech', label: 'Property Tech' },
    statistics: [{ label: 'Maintenance Costs', value: '-20%' }, { label: 'Occupancy Rate', value: '+15%' }],
    caseStudy: { title: 'Smart Building Transformation', description: 'IoT-driven HVAC and lighting.', result: '20% energy savings.' },
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'Education & EdTech', 
    icon: FileText,
    description: 'Personalizing learning and automating administrative tasks for educators.',
    automationValue: 'Automating grading, enrollment, and content delivery.',
    whyTrismart: 'We build adaptive learning platforms that scale with student needs.',
    services: ['Adaptive Learning AI', 'Automated Grading', 'Student Enrollment', 'Content Management'],
    serviceHighlights: ['AI Tutors', 'Automated Grading', 'LMS Integration'],
    industryMapping: { id: 'edtech', label: 'Education Tech' },
    statistics: [{ label: 'Grading Time', value: '-50%' }, { label: 'Student Engagement', value: '+30%' }],
    caseStudy: { title: 'Automated Learning Platform', description: 'AI-driven content delivery.', result: 'Increased completion rates by 35%.' },
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'Digital Marketing Agencies', 
    icon: Megaphone,
    description: 'Scaling campaigns and optimizing ROI with data-driven automation.',
    automationValue: 'Automating ad bidding, content creation, and performance reporting.',
    whyTrismart: 'We empower agencies to deliver better results with less manual effort.',
    services: ['Ad Campaign Automation', 'Content Generation', 'Performance Analytics', 'Lead Scoring'],
    serviceHighlights: ['Programmatic Ads', 'AI Content Gen', 'Multi-touch Attribution'],
    industryMapping: { id: 'martech', label: 'Marketing Tech' },
    statistics: [{ label: 'Campaign ROI', value: '+35%' }, { label: 'Reporting Time', value: '-70%' }],
    caseStudy: { title: 'Automated Ad Engine', description: 'AI-driven bidding.', result: 'Increased conversions by 50%.' },
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'Manufacturing & Industry 4.0', 
    icon: Factory,
    description: 'Building the self-correcting, predictive factory of the future.',
    automationValue: 'Predictive maintenance, digital twins, and automated quality control.',
    whyTrismart: 'We provide the AI brain for your hardware, turning sensor data into production gains.',
    services: ['Predictive Maintenance', 'Digital Twins', 'Quality Control', 'Robotics Integration'],
    serviceHighlights: ['IoT Sensors', 'Digital Twins', 'Supply Chain AI'],
    industryMapping: { id: 'industry40', label: 'Smart Manufacturing' },
    statistics: [{ label: 'Downtime', value: '-50%' }, { label: 'Yield', value: '+15%' }],
    caseStudy: { title: 'Automotive Plant Optimization', description: 'Computer vision defect detection.', result: 'Zero defects in 12 months.' },
    image: 'https://images.unsplash.com/photo-1565439390118-bbf175b22b8f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'Logistics & Supply Chain', 
    icon: Package,
    description: 'Ensuring global coordination and resilience in supply chain networks.',
    automationValue: 'Route optimization, warehouse robotics, and demand forecasting.',
    whyTrismart: 'We build resilient, scalable supply chain ecosystems.',
    services: ['Route Optimization', 'Warehouse Robotics', 'Fleet Management', 'Demand Forecasting'],
    serviceHighlights: ['Fleet Tracking', 'Warehouse Robotics', 'Predictive Demand'],
    industryMapping: { id: 'logistics', label: 'Global Logistics' },
    statistics: [{ label: 'Delivery Time', value: '-20%' }, { label: 'Throughput', value: '2x' }],
    caseStudy: { title: 'Next-Gen Fulfillment', description: 'Swarm robotics deployment.', result: '50k units/day capacity.' },
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'LegalTech', 
    icon: Briefcase,
    description: 'Streamlining legal processes and automating document analysis.',
    automationValue: 'Automating contract review, research, and case management.',
    whyTrismart: 'We build secure, AI-powered tools for legal professionals.',
    services: ['Contract Analysis', 'Legal Research AI', 'Case Management', 'Document Automation'],
    serviceHighlights: ['NLP Contract Review', 'E-Discovery AI', 'Automated Billing'],
    industryMapping: { id: 'legaltech', label: 'Legal Technology' },
    statistics: [{ label: 'Review Time', value: '-60%' }, { label: 'Accuracy', value: '+25%' }],
    caseStudy: { title: 'Automated Contract Review', description: 'AI-driven analysis.', result: 'Reduced review time by 70%.' },
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'HR & Recruitment Tech', 
    icon: Users,
    description: 'Optimizing talent acquisition and employee management.',
    automationValue: 'Automating resume screening, onboarding, and performance tracking.',
    whyTrismart: 'We help HR teams focus on people, not paperwork.',
    services: ['Resume Screening', 'Onboarding Automation', 'Performance Analytics', 'Employee Engagement'],
    serviceHighlights: ['AI Resume Parsing', 'Automated Onboarding', 'Retention Prediction'],
    industryMapping: { id: 'hrtech', label: 'HR Technology' },
    statistics: [{ label: 'Screening Time', value: '-80%' }, { label: 'Time to Hire', value: '-30%' }],
    caseStudy: { title: 'Automated Recruitment', description: 'AI-driven screening.', result: 'Reduced time to hire by 40%.' },
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'Government & Public Sector', 
    icon: Landmark,
    description: 'Modernizing public services with efficient, transparent automation.',
    automationValue: 'Automating citizen services, data processing, and infrastructure management.',
    whyTrismart: 'We build secure, compliant automation for public institutions.',
    services: ['Citizen Portals', 'Data Processing', 'Infrastructure Management', 'Public Service Automation'],
    serviceHighlights: ['Smart City Grids', 'Automated Permitting', 'Secure Data Vaults'],
    industryMapping: { id: 'govtech', label: 'Public Sector Tech' },
    statistics: [{ label: 'Service Speed', value: '+40%' }, { label: 'Cost Reduction', value: '-25%' }],
    caseStudy: { title: 'Digital Citizen Portal', description: 'Automated service requests.', result: 'Reduced processing time by 50%.' },
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'Agriculture & AgriTech', 
    icon: Leaf,
    description: 'Precision farming for maximum yield and sustainability.',
    automationValue: 'Automating irrigation, monitoring, and harvest planning.',
    whyTrismart: 'We provide data-backed insights for smarter farming.',
    services: ['Precision Irrigation', 'Crop Monitoring', 'Harvest Planning', 'Soil Analysis'],
    serviceHighlights: ['Drone Surveillance', 'IoT Soil Sensors', 'Yield Prediction'],
    industryMapping: { id: 'agritech', label: 'Agricultural Tech' },
    statistics: [{ label: 'Yield', value: '+20%' }, { label: 'Water Usage', value: '-30%' }],
    caseStudy: { title: 'Smart Farm Management', description: 'IoT-driven irrigation.', result: 'Increased yield by 25%.' },
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800'
  }
];

import { TiltCard } from './ui/TiltCard';

export const Industries: React.FC = () => {
  const { currentTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryDetails | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const handleIndustryClick = (industry: IndustryDetails) => {
    setSelectedIndustry(industry);
  };

  const closeModal = () => {
    setSelectedIndustry(null);
  };

  return (
    <section 
      id="industries" 
      ref={sectionRef}
      className="py-24 bg-[#040D1A] relative overflow-hidden"
    >
      <HeroMotionBackground />
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase font-mono mb-6">
            Global Impact
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase font-mono">
            Industries We <span className="text-blue-400 italic">Transform</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Empowering diverse sectors with next-generation technology and intelligent automation solutions.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto perspective-1000"
        >
          {industries.map((item, index) => {
            return (
              <TiltCard key={index} onClick={() => handleIndustryClick(item)} className="h-full">
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
                  }}
                  className="group relative h-full min-h-[420px] rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] flex flex-col"
                >
                  {/* Background Image with Gradient Overlay */}
                  <div className="absolute inset-0 h-48">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040D1A]/80 to-[#040D1A]" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 pt-32 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md">
                        {item.industryMapping.label}
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase font-mono mb-3 group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                      {item.description}
                    </p>

                    {/* Service Highlights Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {item.serviceHighlights.map((highlight, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300 uppercase tracking-wider group-hover:border-blue-500/30 transition-colors">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>

      {/* Industry Details Modal */}
      <AnimatePresence>
        {selectedIndustry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#040D1A]/90 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#0A0F1C] rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col z-10 border border-blue-500/30"
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-white/10 relative shrink-0 flex justify-between items-center bg-black/20">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <selectedIndustry.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase font-mono">{selectedIndustry.name}</h3>
                    <p className="text-blue-400 text-xs mt-1 font-mono uppercase tracking-widest">{selectedIndustry.industryMapping.label} Dashboard</p>
                  </div>
                </div>
                
                <button 
                  onClick={closeModal}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="p-6 md:p-8 overflow-y-auto sleek-scrollbar flex-1 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: Persuasive Copy */}
                  <div className="lg:col-span-1 space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <h4 className="text-sm font-bold text-white uppercase font-mono tracking-widest mb-3 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-blue-400" />
                        The Automation Advantage
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {selectedIndustry.automationValue}
                      </p>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <h4 className="text-sm font-bold text-white uppercase font-mono tracking-widest mb-3 flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-blue-400" />
                        Why Trismart?
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {selectedIndustry.whyTrismart}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-xs font-bold text-gray-500 uppercase font-mono tracking-widest mb-4 ml-2">Key Solutions</h4>
                      <div className="space-y-3">
                        {selectedIndustry.services.map((service, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (idx * 0.1) }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                          >
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            </div>
                            <span className="text-gray-300 text-sm font-mono">{service}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Middle & Right Column: Stats & Case Study */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* Stats row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {selectedIndustry.statistics.map((stat, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + (idx * 0.1) }}
                          className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden"
                        >
                          <div className="text-4xl font-black text-blue-400 font-mono tracking-tighter mb-2">{stat.value}</div>
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Case Study */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 relative overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase font-mono tracking-widest mb-4">
                          Success Story
                        </div>
                        <h5 className="text-2xl font-black text-white uppercase font-mono tracking-tighter mb-4">
                          {selectedIndustry.caseStudy.title}
                        </h5>
                        <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-xl">
                          {selectedIndustry.caseStudy.description}
                        </p>
                        
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/10 max-w-md">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-1">Measurable Result</div>
                            <div className="text-emerald-400 font-bold font-mono text-sm">
                              {selectedIndustry.caseStudy.result}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* CTA in Modal */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 }}
                      className="p-8 rounded-2xl bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                      <div>
                        <h5 className="text-xl font-black uppercase font-mono tracking-tighter mb-2">Ready to transform your operations?</h5>
                        <p className="text-blue-200 text-sm font-mono">Join the elite enterprises scaling with Trismart.</p>
                      </div>
                      <button 
                        onClick={() => {
                          closeModal();
                          const element = document.getElementById('contact');
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all shrink-0 font-mono text-sm uppercase tracking-widest"
                      >
                        Start Your Journey
                      </button>
                    </motion.div>

                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
