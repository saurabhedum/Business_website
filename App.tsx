import React, { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Process } from "./components/Process";
import { Industries } from "./components/Industries";
import { AutomationDomains } from "./components/AutomationDomains";
import { CTA } from "./components/CTA";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UIProvider, useUI } from "./contexts/UIContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ContactModal } from "./components/ContactModal";
import { AboutModal } from "./components/AboutModal";
import { ExplainerModal } from "./components/ExplainerModal";
import { CosmicLoader } from "./components/CosmicLoader";
import { CatalogueDetail } from "./components/CatalogueDetail";
import { ProjectsView } from "./components/ProjectsView";
import { ProcessView } from "./components/ProcessView";
import { ProjectSchema } from "./components/ProjectSchema";
import { DraggableMenu } from "./components/DraggableMenu";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";

const MainContent = () => {
  const { activeView } = useUI();
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  
  // Hide ripples on Hero section (top of home page)
  const ripplesOpacity = useTransform(
    scrollY,
    [0, 400], // Fade in after 400px of scroll
    [0, 1]
  );

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="flex-1 w-full pl-16 md:pl-[8vw] lg:pl-[5vw] transition-all duration-500 overflow-hidden relative">
      {/* Global Interactive Ripples (Hidden on Hero) */}
      <motion.div 
        style={{ opacity: ripplesOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
      </motion.div>

      {/* Cosmic Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_50%)]"
        />
      </div>

      {/* Elite Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary z-[100] origin-left"
        style={{ scaleX }}
      />
      <AnimatePresence mode="wait">
        {activeView === "home" ? (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-10"
          >
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
              <Hero />
            </motion.section>
            
            <AutomationDomains />
            
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
              <Features />
            </motion.section>
            
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
              <Process />
            </motion.section>
            
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
              <Industries />
            </motion.section>
            
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
              <CTA />
            </motion.section>
            
            <Contact />
          </motion.main>
        ) : activeView === "projects" ? (
          <motion.main
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-10 w-full min-h-[300vh] flex flex-col"
          >
            <ProjectsView />
          </motion.main>
        ) : activeView === "process" ? (
          <motion.main
            key="process"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-10 w-full min-h-[300vh] flex flex-col"
          >
            <ProcessView />
          </motion.main>
        ) : activeView === "schema" ? (
          <motion.main
            key="schema"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ProjectSchema />
            <Contact />
          </motion.main>
        ) : activeView.startsWith("catalogue-") ? (
          <motion.main
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <CatalogueDetail id={activeView.replace("catalogue-", "")} />
            <Contact />
          </motion.main>
        ) : null}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExplainerModalOpen, setIsExplainerModalOpen] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UIProvider>
          {isLoading && <CosmicLoader onComplete={() => setIsLoading(false)} />}
          <div className="bg-[#0B0F19] text-white font-sans selection:bg-primary/30 selection:text-white flex">
            <Header />
            <MainContent />
            <DraggableMenu />
            <ContactModal />
            <AboutModal />
            <ExplainerModal isOpen={isExplainerModalOpen} onClose={() => setIsExplainerModalOpen(false)} />
          </div>
        </UIProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
