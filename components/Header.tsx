import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { Home, Fingerprint, Workflow, Factory, Cpu, FolderKanban, Mail, Palette, ChevronRight, X, ArrowLeft, ArrowRight, RotateCw, FileText, Brain, BarChart, Activity, Landmark, ShoppingCart, Truck, Sprout, ShieldAlert, Network, Megaphone, Monitor, Leaf, Newspaper, Utensils, Bot, Stethoscope, Package, Glasses, Film, Building2, HeartPulse, Terminal, Library, Plus, Zap, Briefcase, Menu, Users } from 'lucide-react';
import { Logo } from './Logo';
import { useTheme } from '../contexts/ThemeContext';
import { useUI } from '../contexts/UIContext';
import { motion, AnimatePresence } from 'motion/react';


const servicesData = [
  { id: 'home', title: 'Home Automation', description: 'Smart living solutions for enhanced comfort, security, and energy efficiency.', icon: Home },
  { id: 'agriculture', title: 'Agriculture Automation', description: 'Precision farming technologies for maximizing yield while minimizing resource consumption.', icon: Sprout },
  { id: 'security', title: 'Security Solutions', description: 'Advanced surveillance, access control, and threat detection systems.', icon: ShieldAlert },
  { id: 'smart-eco', title: 'Smart Ecosystems', description: 'Interconnected networks of devices and platforms working seamlessly.', icon: Network },
  { id: 'software', title: 'Software Automation', description: 'Streamline workflows and eliminate repetitive tasks with intelligent software robots.', icon: Terminal },
  { id: 'content', title: 'Content Automation', description: 'Scale your digital presence with AI-driven content generation and distribution.', icon: Megaphone }
];

const industriesData = [
  { id: 'finance', title: 'Financial Services & FinTech', description: 'Modernizing financial infrastructure.', icon: Landmark },
  { id: 'healthcare', title: 'Healthcare & MedTech', description: 'Empowering clinicians with intelligent automation.', icon: HeartPulse },
  { id: 'ecommerce', title: 'E-commerce & D2C', description: 'Creating seamless shopping experiences.', icon: ShoppingCart },
  { id: 'realestate', title: 'Real Estate & PropTech', description: 'Optimizing property management.', icon: Building2 },
  { id: 'education', title: 'Education & EdTech', description: 'Personalizing learning.', icon: FileText },
  { id: 'marketing', title: 'Digital Marketing Agencies', description: 'Scaling campaigns with data.', icon: Megaphone },
  { id: 'manufacturing', title: 'Manufacturing & Industry 4.0', description: 'Building the predictive factory.', icon: Factory },
  { id: 'logistics', title: 'Logistics & Supply Chain', description: 'Ensuring global coordination.', icon: Truck },
  { id: 'legaltech', title: 'LegalTech', description: 'Streamlining legal processes.', icon: Briefcase },
  { id: 'hrtech', title: 'HR & Recruitment Tech', description: 'Optimizing talent acquisition.', icon: Users },
  { id: 'government', title: 'Government & Public Sector', description: 'Modernizing public services.', icon: Building2 },
  { id: 'agriculture', title: 'Agriculture & AgriTech', description: 'Precision farming.', icon: Leaf },
  { id: 'media', title: 'Media & Creator Economy', description: 'Empowering creators.', icon: Film },
  { id: 'intelligentbs', title: 'Intelligent B.S.', description: 'Advanced business systems.', icon: Cpu },
  { id: 'saas', title: 'SaaS & Technology Startups', description: 'Accelerating growth.', icon: Monitor },
  { id: 'travel', title: 'Travel & Hospitality', description: 'Seamless travel experiences.', icon: Utensils },
  { id: 'retail', title: 'Retail & Omnichannel Commerce', description: 'Unified commerce.', icon: ShoppingCart },
  { id: 'energy', title: 'Energy & Utilities', description: 'Optimizing sustainability.', icon: Leaf },
];

const processData = ['Discovery & Audit', 'Strategy & Design', 'Implementation', 'Optimization'];

export const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCatalogueModalOpen, setIsCatalogueModalOpen] = useState(false);
  const [activeCatalogue, setActiveCatalogue] = useState<any>(null);
  
  const { currentTheme, setTheme, themes } = useTheme();
  const { openContactModal, openAboutModal, setActiveView, activeView: currentView } = useUI();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'automation-domains', 'our-process', 'industries', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setActiveView('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 50;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
    setActiveMenu(null);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveMenu(null);
  };

  const toggleMenu = (menu: string) => {
    if (isTransitioning) return;

    if (activeMenu && activeMenu !== menu) {
      setIsTransitioning(true);
      setActiveMenu(null);
      setTimeout(() => {
        setActiveMenu(menu);
        setIsTransitioning(false);
      }, 400); // Wait for the panel to mostly close before reopening
    } else {
      setActiveMenu(activeMenu === menu ? null : menu);
    }
  };

  const hoverEffects = [
    'hover:bg-blue-500/20 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]',
    'hover:bg-purple-500/20 hover:text-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    'hover:bg-emerald-500/20 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]',
    'hover:bg-pink-500/20 hover:text-pink-400 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]',
    'hover:bg-amber-500/20 hover:text-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]',
  ];

  const NavIconButton = ({ icon: Icon, label, onClick, isActive, hasSubmenu, index = 0, isExpanded }: any) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseEnter = () => {
      if (buttonRef.current) {
        animate(buttonRef.current.querySelector('svg'), {
          scale: 1.2,
          rotate: 10,
          duration: 300,
          easing: 'easeOutElastic(1, .5)'
        });
      }
    };

    const handleMouseLeave = () => {
      if (buttonRef.current) {
        animate(buttonRef.current.querySelector('svg'), {
          scale: 1,
          rotate: 0,
          duration: 300,
          easing: 'easeOutElastic(1, .5)'
        });
      }
    };

    return (
      <button
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`relative group flex flex-col md:flex-row items-center w-full h-auto py-2 md:h-12 rounded-xl transition-all duration-500 ${
          isActive 
            ? 'bg-primary/20 text-primary shadow-[0_0_20px_rgba(var(--color-primary),0.3)] border border-primary/50' 
            : 'text-gray-500 hover:text-gray-200 hover:bg-white/5 border border-transparent'
        } active:scale-95 px-1 md:px-3`}
        aria-label={label}
      >
        <div className="flex items-center justify-center w-6 h-6 shrink-0">
          <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
        </div>
        
        <span className={`mt-1 md:mt-0 md:ml-3 text-[8px] md:text-[10px] font-bold uppercase tracking-tighter md:tracking-widest transition-all duration-300 text-center md:text-left md:whitespace-nowrap overflow-hidden leading-tight ${isExpanded ? 'opacity-100 w-auto delay-100' : 'opacity-100 md:opacity-0 md:w-0 w-auto'}`}>
          {label}
        </span>

        {/* Active Indicator Dot */}
        {isActive && (
          <motion.div 
            layoutId="activeDot"
            className="absolute left-0 md:-left-1 top-1/2 -translate-y-1/2 w-0.5 md:w-1 h-3 md:h-4 bg-primary rounded-r-full shadow-[0_0_10px_rgba(var(--color-primary),0.8)]"
          />
        )}

        {hasSubmenu && !isActive && (
          <div className={`absolute right-0.5 md:right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 md:h-2 bg-white/10 rounded-full group-hover:bg-primary/40 transition-all duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`} />
        )}
      </button>
    );
  };

  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  return (
    <>
      {/* Logo at top left */}
      <div className={`fixed top-4 left-4 md:top-6 md:left-6 z-[60] transition-all duration-500 ${isScrolled || currentView === 'projects' || currentView === 'process' ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <style>{`
          @keyframes cosmic-shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes cosmic-pulse {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px #fff, 0 0 20px var(--color-primary); }
          }
        `}</style>
        <a 
          href="/" 
          onClick={scrollToTop} 
          className="relative flex items-center group p-2 md:p-3 rounded-2xl transition-all duration-500 hover:bg-white/5 hover:backdrop-blur-xl hover:shadow-[0_8px_32px_rgba(0,112,243,0.15)] border border-transparent hover:border-white/10 overflow-hidden" 
          aria-label="Back to home"
        >
          {/* Glass glare effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <Logo className="h-8 md:h-10 text-white transition-colors relative z-10" />
          
          {/* Cosmic Dots Underline Effect */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary/30 group-hover:w-[80%] transition-all duration-700 ease-out rounded-full shadow-[0_0_15px_rgba(0,112,243,0.8)]">
            {/* Moving light beam */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-full group-hover:animate-[cosmic-shimmer_2s_infinite]" />
            
            {/* Animated Cosmic Dots */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 h-1 rounded-full bg-white" 
                  style={{ 
                    animation: `cosmic-pulse 1.5s infinite ${i * 0.2}s`
                  }} 
                />
              ))}
            </div>
          </div>
        </a>
      </div>

      <aside 
        ref={sidebarRef}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className="fixed top-20 bottom-4 left-2 md:top-24 md:bottom-6 md:left-4 z-50 flex items-start"
      >
        {/* Primary Thin Sidebar */}
        <div className={`h-full bg-[#0B0F19]/60 backdrop-blur-3xl border border-white/10 rounded-2xl flex flex-col items-center py-4 md:py-6 shadow-[0_8px_32px_rgba(0,0,0,0.8)] z-20 relative overflow-y-auto overflow-x-hidden sleek-scrollbar transition-all duration-300 ease-in-out ${isSidebarHovered ? 'md:w-48 w-14' : 'w-14 md:w-[8vw] lg:w-[5vw]'}`}>
          {/* Subtle hardware-like detail */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          {/* Navigation Icons */}
          <nav className="flex-1 flex flex-col gap-2 w-full px-2 items-center">
            <NavIconButton icon={Home} label="Home" onClick={scrollToTop} isActive={currentView === 'home' && activeSection === 'home' && !activeMenu} index={0} isExpanded={isSidebarHovered} />
            <NavIconButton icon={Fingerprint} label="About Us" onClick={() => { openAboutModal(); setActiveMenu(null); }} index={1} isExpanded={isSidebarHovered} />
            <NavIconButton icon={Workflow} label="Process" onClick={() => toggleMenu('process')} isActive={activeMenu === 'process'} hasSubmenu index={2} isExpanded={isSidebarHovered} />
            <NavIconButton icon={Factory} label="Industries" onClick={() => toggleMenu('industries')} isActive={activeMenu === 'industries'} hasSubmenu index={3} isExpanded={isSidebarHovered} />
            <NavIconButton icon={Cpu} label="Services" onClick={() => toggleMenu('services')} isActive={activeMenu === 'services'} hasSubmenu index={4} isExpanded={isSidebarHovered} />
            <NavIconButton icon={FolderKanban} label="Projects" onClick={() => { setActiveView('projects'); setActiveMenu(null); window.scrollTo(0, 0); }} isActive={currentView === 'projects'} index={5} isExpanded={isSidebarHovered} />
            <NavIconButton icon={Briefcase} label="Port folio" onClick={() => { setActiveView('portfolio'); setActiveMenu(null); window.scrollTo(0, 0); }} isActive={currentView === 'portfolio'} index={6} isExpanded={isSidebarHovered} />
            <NavIconButton 
              icon={FileText} 
              label="Brochure" 
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/file/d/1hAeBG5waUxNRtzTI0AVUAsW2GJsyj_Aj/view?usp=drive_link'; // Placeholder PDF
                link.download = 'TRISMART_Brochure.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }} 
              index={7} 
              isExpanded={isSidebarHovered} 
            />
          </nav>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-2 w-full px-2 items-center mt-auto pt-4 border-t border-white/5">
            <NavIconButton icon={Palette} label="Theme" onClick={() => toggleMenu('theme')} isActive={activeMenu === 'theme'} hasSubmenu index={8} isExpanded={isSidebarHovered} />
            <NavIconButton icon={Mail} label="Contact" onClick={() => { openContactModal(); setActiveMenu(null); }} index={9} isExpanded={isSidebarHovered} />
          </div>
        </div>

        {/* Secondary Expanded Panel */}
        <AnimatePresence>
          {activeMenu && (
            <>
              {/* Mobile Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] md:hidden"
                onClick={() => setActiveMenu(null)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                className="h-full bg-[#0B0F19]/95 backdrop-blur-3xl border border-white/10 rounded-3xl md:rounded-l-none md:rounded-r-3xl shadow-[8px_0_32px_rgba(0,0,0,0.5)] overflow-hidden z-50 md:z-10 flex flex-col origin-left w-[80vw] sm:w-80 md:w-80 ml-1 md:ml-0 absolute md:relative left-14 md:left-auto"
              >
                <div className="w-full h-full flex flex-col pl-4 md:pl-10 pr-4 py-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white capitalize">
                      {activeMenu === 'process' ? 'Our Process' : activeMenu}
                    </h3>
                    <button onClick={() => setActiveMenu(null)} aria-label="Close menu" className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-white/10 transition-colors bg-white/5 md:bg-transparent">
                      <X className="w-5 h-5 md:w-4 md:h-4" />
                    </button>
                  </div>

              <div className="flex-1 overflow-y-auto pr-2 sleek-scrollbar relative">
              <AnimatePresence mode="wait">
                {activeMenu === 'services' && (
                  <motion.div 
                    key="services"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    {servicesData.map(service => (
                      <a 
                        key={service.id} 
                        href="#automation-domains" 
                        onClick={(e) => handleNavClick(e, 'automation-domains')} 
                        aria-label={`Go to ${service.title} section`}
                        className="group relative p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-primary/30 transition-all duration-300 flex items-start gap-3 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 text-gray-400 group-hover:text-primary transition-all duration-300 mt-0.5 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                          <service.icon className="w-4 h-4" />
                        </div>
                        <div className="relative transform group-hover:translate-x-1 transition-transform duration-300">
                          <h4 className="text-white font-medium text-sm group-hover:text-primary transition-colors">{service.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-300 transition-colors">{service.description}</p>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}

                {activeMenu === 'industries' && (
                  <motion.div 
                    key="industries"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    {industriesData.map(industry => (
                      <a 
                        key={industry.id} 
                        href="#industries" 
                        onClick={(e) => handleNavClick(e, 'industries')} 
                        aria-label={`Go to ${industry.title} section`}
                        className="group relative p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-primary/30 transition-all duration-300 flex items-start gap-3 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 text-gray-400 group-hover:text-primary transition-all duration-300 mt-0.5 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                          <industry.icon className="w-4 h-4" />
                        </div>
                        <div className="relative transform group-hover:translate-x-1 transition-transform duration-300">
                          <h4 className="text-white font-medium text-sm group-hover:text-primary transition-colors">{industry.title}</h4>
                          <p className="text-[10px] text-gray-500 mt-1 leading-relaxed group-hover:text-gray-300 transition-colors">{industry.description}</p>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}

                {activeMenu === 'process' && (
                  <motion.div 
                    key="process"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    {processData.map((step, idx) => (
                      <a 
                        key={step} 
                        href="#our-process" 
                        onClick={(e) => handleNavClick(e, 'our-process')} 
                        aria-label={`Go to ${step} process step`}
                        className="text-sm text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-colors flex items-center gap-3 group"
                      >
                        <span className="text-xs font-mono text-gray-600 group-hover:text-primary transition-colors">0{idx + 1}</span>
                        {step}
                      </a>
                    ))}
                    <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20">
                      <p className="text-xs text-gray-300 mb-3">View our interactive process workflow diagram.</p>
                      <button 
                        onClick={() => { setActiveView('process'); setActiveMenu(null); window.scrollTo(0, 0); }}
                        className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        View Full Process
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeMenu === 'theme' && (
                  <motion.div 
                    key="theme"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-4 gap-3"
                  >
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => setTheme(theme.name)}
                        className={`aspect-square rounded-xl flex items-center justify-center transition-all hover:scale-110 relative ${currentTheme.name === theme.name ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0B0F19]' : ''}`}
                        style={{ backgroundColor: theme.hex }}
                        title={theme.name}
                      >
                        {currentTheme.name === theme.name && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
};