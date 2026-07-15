import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Eye, Calendar, Search, ArrowUpDown, CornerDownRight, MessageSquare, ExternalLink, Sparkles, FolderOpen, Video, FileText, HardDrive, Play, Globe, Download } from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { db } from '../src/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  googleDriveLink?: string;
  pdfLink?: string;
  demoLink?: string;
  views: number;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
}

export const PortfolioView: React.FC = () => {
  const { setActiveView, openContactModal } = useUI();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'views'>('newest');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch projects from Firestore
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs: Project[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        projs.push({
          id: docSnap.id,
          title: data.title || '',
          description: data.description || '',
          imageUrl: data.imageUrl || '',
          videoUrl: data.videoUrl || '',
          googleDriveLink: data.googleDriveLink || '',
          pdfLink: data.pdfLink || '',
          demoLink: data.demoLink || '',
          views: data.views || 0,
          createdAt: data.createdAt || undefined,
        });
      });
      setProjects(projs);
      setLoading(false);
    }, (error) => {
      console.error("Error loading portfolio projects:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleOpenProjectDetails = async (project: Project) => {
    setSelectedProject(project);
    
    // Increment view count in Firestore
    try {
      const projectRef = doc(db, 'projects', project.id);
      await updateDoc(projectRef, {
        views: increment(1)
      });
    } catch (err) {
      console.error("Failed to increment project view:", err);
    }
  };

  const handleInquireProject = (project: Project) => {
    if (openContactModal) {
      // Open contact modal with pre-filled details if supported
      openContactModal(
        `Inquiry: ${project.title}`,
        `Hi Trismart Team,\n\nI am interested in learning more about your project: "${project.title}".\n\nPlease share how we can collaborate or adapt similar solutions for our organization.\n\nBest regards,`
      );
    }
  };

  const filteredProjects = projects
    .filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'views') {
        return b.views - a.views;
      }
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    });

  // Abstract geometric tech visual when there is no image
  const renderFallbackImage = (title: string) => {
    const angle = (title.charCodeAt(0) * 15) % 360;
    return (
      <div 
        className="w-full h-full relative flex flex-col justify-between p-6 overflow-hidden transition-all duration-500"
        style={{
          background: `linear-gradient(${angle}deg, rgba(var(--color-primary), 0.85) 0%, rgba(var(--color-secondary), 0.85) 100%)`
        }}
      >
        {/* Dynamic circuitry background grids */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]"></div>
        
        <div className="relative z-10 self-start bg-black/30 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-yellow-400" />
          Trismart Build
        </div>

        <div className="relative z-10 mt-auto">
          <span className="font-mono text-xs text-white/60 block mb-1">AUTOMATION ENGINE</span>
          <h3 className="font-extrabold text-white text-xl line-clamp-2 tracking-tight">{title}</h3>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none"></div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-transparent text-white relative py-24 px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Decorative background grids & gradients */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(var(--color-primary), 0.05), transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(var(--color-secondary), 0.04), transparent 50%)
          `
        }}
      />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <button 
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white/80 hover:text-white transition-all group"
          id="portfolio-back-btn"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Home</span>
        </button>

        <div className="text-xs font-mono text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/5">
          PORTFOLIO SECURE FEED
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Success Stories & Deliverables</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-4"
          >
            Portfolio Catalog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base leading-relaxed"
          >
            Explore real, high-impact automation projects designed, built, and deployed by Trismart. We build custom software and ecosystem automation customized for diverse domains.
          </motion.p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-card/35 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-10 flex flex-col md:flex-row gap-4 justify-between items-center max-w-7xl mx-auto relative z-20">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by keyword, title, domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark/50 border border-white/10 hover:border-white/20 focus:border-primary/50 outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm transition-all text-white placeholder-white/30"
            />
          </div>

          {/* Sorter/Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs text-white/50 flex items-center gap-1 font-mono">
              <ArrowUpDown className="w-3 h-3" /> SORT BY:
            </span>
            <div className="bg-white/5 p-1 rounded-xl border border-white/5 flex gap-1">
              <button 
                onClick={() => setSortBy('newest')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${sortBy === 'newest' ? 'bg-primary text-white shadow-md' : 'text-white/60 hover:text-white'}`}
              >
                Newest
              </button>
              <button 
                onClick={() => setSortBy('views')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${sortBy === 'views' ? 'bg-primary text-white shadow-md' : 'text-white/60 hover:text-white'}`}
              >
                Most Viewed
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Project Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="text-white/40 text-xs font-mono">CONNECTING TO CATALOG DATABASE...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-card/20 border border-white/5 p-12 rounded-3xl text-center max-w-xl mx-auto my-12">
            <FolderOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">No Projects Added Yet</h3>
            <p className="text-white/50 text-sm mb-6">
              {searchTerm 
                ? "No custom projects matched your search criteria. Try using a different word!"
                : "You have not added any successes in your Admin Dashboard. Head over to the admin portal to publish your projects!"}
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Clear Search Filter
              </button>
            )}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 max-w-7xl mx-auto"
          >
            {filteredProjects.map((project, idx) => {
              const formattedDate = project.createdAt 
                ? new Date(project.createdAt.seconds * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
                : 'Active';

              return (
                <motion.div
                  key={project.id}
                  layoutId={`card-${project.id}`}
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.21, 1.11, 0.81, 0.99], // Highly custom sleek cubic-bezier for a soft spring feel
                    delay: (idx % 3) * 0.08 
                  }}
                  onClick={() => handleOpenProjectDetails(project)}
                  className="group bg-[#0B0F19]/40 hover:bg-[#0B0F19]/80 border border-white/5 hover:border-primary/30 rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 relative flex flex-col h-[400px]"
                >
                  {/* Image container */}
                  <div className="w-full h-48 overflow-hidden bg-dark/40 relative shrink-0">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      renderFallbackImage(project.title)
                    )}
                    {/* Hover state overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05080F]/90 via-[#05080F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-xs font-semibold text-primary flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-primary/20">
                        <Sparkles className="w-3.5 h-3.5 text-primary" /> View Details & Tech Spec
                      </span>
                    </div>

                    {/* Stats overlay badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white/80 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                        <Calendar className="w-3.5 h-3.5 text-white/50" />
                        {formattedDate}
                      </span>
                      <span className="bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-primary font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                        <Eye className="w-3.5 h-3.5 text-primary/80" />
                        {project.views} views
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-white text-lg tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                      <p className="text-white/60 text-sm line-clamp-4 leading-relaxed mb-4">{project.description}</p>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-auto flex items-center justify-between text-xs text-white/40">
                      <span className="font-mono flex items-center gap-1 text-[11px]">
                        <CornerDownRight className="w-3.5 h-3.5 text-primary" /> CASE STUDY DELIVERABLE
                      </span>
                      <span className="text-primary font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Interactive Case Study Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (() => {
          const getEmbedUrl = (url?: string) => {
            if (!url) return null;
            const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
            if (ytMatch) {
              return `https://www.youtube.com/embed/${ytMatch[1]}`;
            }
            const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)([0-9]+)/);
            if (vimeoMatch) {
              return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
            }
            return null;
          };

          const isDirectVideo = (url?: string) => {
            if (!url) return false;
            return url.match(/\.(mp4|webm|ogg)$/i) || url.includes('/storage/v0/b/') && url.toLowerCase().includes('.mp4');
          };

          const embedUrl = getEmbedUrl(selectedProject.videoUrl);
          const directVideo = isDirectVideo(selectedProject.videoUrl);

          return (
            <div className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-[#0B0F19] border border-white/10 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
              >
                {/* Header block with fallback or image / video player */}
                <div className="w-full h-72 bg-black relative shrink-0">
                  {selectedProject.videoUrl ? (
                    embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={selectedProject.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    ) : directVideo ? (
                      <video
                        src={selectedProject.videoUrl}
                        controls
                        className="w-full h-full object-contain bg-black"
                      ></video>
                    ) : (
                      <div className="w-full h-full relative group">
                        {selectedProject.imageUrl ? (
                          <img 
                            src={selectedProject.imageUrl} 
                            alt={selectedProject.title} 
                            className="w-full h-full object-cover opacity-60"
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          renderFallbackImage(selectedProject.title)
                        )}
                        <a 
                          href={selectedProject.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 hover:bg-black/60 transition-colors"
                        >
                          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/35 animate-pulse">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                          </div>
                          <span className="text-xs font-mono font-bold tracking-widest text-white uppercase bg-black/45 px-3.5 py-1.5 rounded-full border border-white/10">
                            LAUNCH VIDEO DEMO
                          </span>
                        </a>
                      </div>
                    )
                  ) : selectedProject.imageUrl ? (
                    <img 
                      src={selectedProject.imageUrl} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    renderFallbackImage(selectedProject.title)
                  )}
                  {/* Backdrop blur gradient covering bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent pointer-events-none" />
                  
                  {/* Close Button top-right */}
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white/70 hover:text-white p-2 rounded-full border border-white/10 hover:border-white/20 transition-all cursor-pointer z-10"
                    id="portfolio-close-modal-btn"
                  >
                    <ArrowLeft className="w-4 h-4 rotate-90" />
                  </button>

                  {/* Info banner overlay */}
                  <div className="absolute bottom-4 left-6 flex flex-wrap gap-3 pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white/80 font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Calendar className="w-4 h-4 text-white/50" />
                      {selectedProject.createdAt 
                        ? new Date(selectedProject.createdAt.seconds * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
                        : 'Active'}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md border border-white/10 text-xs text-primary font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Eye className="w-4 h-4 text-primary" />
                      {selectedProject.views + 1} views
                    </span>
                  </div>
                </div>

                {/* Body scroll block */}
                <div className="p-6 md:p-8 overflow-y-auto flex-grow sleek-scrollbar space-y-6">
                  <div>
                    <div className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> DEPLOYED AUTOMATION SPECIFICATION
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">{selectedProject.title}</h2>
                  </div>

                  {/* Markdown rendering container */}
                  <div className="text-white/80 text-sm leading-relaxed prose prose-invert max-w-none space-y-4 bg-white/5 p-5 rounded-2xl border border-white/5">
                    <ReactMarkdown>{selectedProject.description}</ReactMarkdown>
                  </div>

                  {/* Project Assets & Resource Vault */}
                  {(selectedProject.googleDriveLink || selectedProject.pdfLink || selectedProject.demoLink) && (
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <h3 className="text-xs font-mono font-bold tracking-widest text-primary uppercase flex items-center gap-1.5">
                        <HardDrive className="w-4.5 h-4.5 text-primary" /> PROJECT ASSETS & RESOURCE VAULT
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Google Drive Link */}
                        {selectedProject.googleDriveLink && (
                          <a 
                            href={selectedProject.googleDriveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 rounded-xl transition-all group/resource text-left cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 text-green-400 group-hover/resource:scale-110 transition-transform">
                                <HardDrive className="w-5 h-5" />
                              </div>
                              <div className="min-w-0 w-full">
                                <h4 className="font-bold text-xs text-white truncate">Google Drive Assets</h4>
                                <p className="text-[10px] text-white/40 truncate">Access folder & deliverables</p>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-white/30 group-hover/resource:text-white group-hover/resource:translate-x-0.5 transition-all shrink-0 ml-2" />
                          </a>
                        )}

                        {/* PDF Case Study Document */}
                        {selectedProject.pdfLink && (
                          <a 
                            href={selectedProject.pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 rounded-xl transition-all group/resource text-left cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 text-red-400 group-hover/resource:scale-110 transition-transform">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="min-w-0 w-full">
                                <h4 className="font-bold text-xs text-white truncate">Documentation / PDF</h4>
                                <p className="text-[10px] text-white/40 truncate">Read technical PDF spec</p>
                              </div>
                            </div>
                            <Download className="w-4 h-4 text-white/30 group-hover/resource:text-white group-hover/resource:translate-y-0.5 transition-all shrink-0 ml-2" />
                          </a>
                        )}

                        {/* Live Demo or Presentation URL */}
                        {selectedProject.demoLink && (
                          <a 
                            href={selectedProject.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 rounded-xl transition-all group/resource text-left cursor-pointer sm:col-span-2"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400 group-hover/resource:scale-110 transition-transform">
                                <Globe className="w-5 h-5" />
                              </div>
                              <div className="min-w-0 w-full">
                                <h4 className="font-bold text-xs text-white truncate">Launch Live System Demo</h4>
                                <p className="text-[10px] text-white/40 truncate">Explore interactive environment</p>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-white/30 group-hover/resource:text-white group-hover/resource:translate-x-0.5 transition-all shrink-0 ml-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action and Inquire footer */}
                <div className="border-t border-white/10 bg-dark/30 p-5 flex flex-wrap gap-3 items-center justify-between">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-xl text-sm font-semibold transition-all border border-white/5"
                  >
                    Close Spec
                  </button>

                  <button 
                    onClick={() => handleInquireProject(selectedProject)}
                    className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-primary/20 flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire About This Project</span>
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};
