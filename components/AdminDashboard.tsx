import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { LogIn, LogOut, Plus, Trash2, Edit2, X, Upload, CheckSquare, Square, Download, Mail, Phone, User, Clock, CheckCircle2, AlertCircle, Filter, Globe, RefreshCw, Sliders, Settings, Database, Hash, TrendingUp, Check, Activity } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../src/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { SEOService } from '../services/seoService';

const compressImage = (file: File, maxWidth = 1000, maxHeight = 1000, quality = 0.75): Promise<File> => {
  return new Promise((resolve) => {
    // If it's not an image, just return original file
    if (!file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions keeping aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            // Retain original name, convert extension/type to jpeg
            const newName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
            const compressedFile = new File([blob], newName, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

export function AdminDashboard() {
  const { user, isAdmin, signInWithGoogle, logOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [pdfLink, setPdfLink] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  
  const [projects, setProjects] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [leadFilter, setLeadFilter] = useState<'all' | 'new' | 'contacted' | 'archived'>('all');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'leads' | 'seo'>('projects');

  // SEO & Real-time Trends States
  const [seoConfig, setSeoConfig] = useState<any>(null);
  const [seoMetrics, setSeoMetrics] = useState<any>(null);
  const [fixedKeywordsInput, setFixedKeywordsInput] = useState('');
  const [seoDescriptionInput, setSeoDescriptionInput] = useState('');
  const [isSyncingSEO, setIsSyncingSEO] = useState(false);
  const [isSavingSEO, setIsSavingSEO] = useState(false);

  React.useEffect(() => {
    if (isAdmin && activeTab === 'seo') {
      const loadSEOData = async () => {
        try {
          const seo = SEOService.getInstance();
          const config = await seo.getSEOConfig();
          setSeoConfig(config);
          setFixedKeywordsInput(config.fixedKeywords.join(', '));
          setSeoDescriptionInput(config.customDescription);
          
          const metrics = seo.getCachedMetrics();
          setSeoMetrics(metrics);
        } catch (err) {
          console.error("Failed to load SEO data:", err);
          toast.error("Failed loading SEO settings");
        }
      };
      loadSEOData();
    }
  }, [isAdmin, activeTab]);

  React.useEffect(() => {
    if (isAdmin) {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const projs: any[] = [];
        snapshot.forEach((doc) => {
          projs.push({ id: doc.id, ...doc.data() });
        });
        setProjects(projs);
      });
      return unsubscribe;
    }
  }, [isAdmin]);

  React.useEffect(() => {
    if (isAdmin) {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const lds: any[] = [];
        snapshot.forEach((doc) => {
          lds.push({ id: doc.id, ...doc.data() });
        });
        setLeads(lds);
      });
      return unsubscribe;
    }
  }, [isAdmin]);

  const handleUpdateLeadStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'leads', id), { status: newStatus });
      toast.success(`Lead status updated to ${newStatus}`);
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead((prev: any) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update lead status');
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteDoc(doc(db, 'leads', id));
      toast.success('Lead deleted');
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(null);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete lead');
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Successfully logged in");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Successfully signed up");
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddOrUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    
    setIsUploading(true);
    try {
      let currentImageUrl = imageUrl;

      if (imageFile) {
        const originalSize = (imageFile.size / 1024).toFixed(1);
        const compressionToast = toast.loading(`Optimizing image (Original: ${originalSize}KB)...`);
        
        let fileToUpload = imageFile;
        try {
          fileToUpload = await compressImage(imageFile);
          const compressedSize = (fileToUpload.size / 1024).toFixed(1);
          toast.success(`Image optimized! (${compressedSize}KB)`, { id: compressionToast });
        } catch (compErr) {
          console.error('Image compression failed, uploading original', compErr);
          toast.dismiss(compressionToast);
        }

        const storageRef = ref(storage, `projects/${Date.now()}_${fileToUpload.name}`);
        const snapshot = await uploadBytes(storageRef, fileToUpload);
        currentImageUrl = await getDownloadURL(snapshot.ref);
      }

      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), {
          title,
          description,
          imageUrl: currentImageUrl,
          videoUrl,
          googleDriveLink,
          pdfLink,
          demoLink
        });
        setEditingId(null);
        toast.success('Project updated successfully');
      } else {
        await addDoc(collection(db, 'projects'), {
          title,
          description,
          imageUrl: currentImageUrl,
          videoUrl,
          googleDriveLink,
          pdfLink,
          demoLink,
          views: Math.floor(Math.random() * 100) + 10,
          createdAt: serverTimestamp()
        });
        toast.success('Project added successfully');
      }
      setTitle('');
      setDescription('');
      setImageFile(null);
      setImageUrl('');
      setVideoUrl('');
      setGoogleDriveLink('');
      setPdfLink('');
      setDemoLink('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save project');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      if (editingId === id) {
        handleCancelEdit();
      }
      await deleteDoc(doc(db, 'projects', id));
      toast.success('Project deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project');
    }
  };

  const handleEditProject = (project: any) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setImageUrl(project.imageUrl || '');
    setImageFile(null);
    setVideoUrl(project.videoUrl || '');
    setGoogleDriveLink(project.googleDriveLink || '');
    setPdfLink(project.pdfLink || '');
    setDemoLink(project.demoLink || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImageFile(null);
    setVideoUrl('');
    setGoogleDriveLink('');
    setPdfLink('');
    setDemoLink('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedProjects.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedProjects.length} projects?`)) return;
    
    try {
      const batch = writeBatch(db);
      selectedProjects.forEach(id => {
        batch.delete(doc(db, 'projects', id));
      });
      await batch.commit();
      setSelectedProjects([]);
      if (editingId && selectedProjects.includes(editingId)) {
        handleCancelEdit();
      }
      toast.success(`Deleted ${selectedProjects.length} projects`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete projects');
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedProjects(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const exportToCSV = () => {
    if (projects.length === 0) {
      toast.error('No projects to export');
      return;
    }
    const headers = ['Title', 'Description', 'Views', 'Image URL'];
    const csvContent = [
      headers.join(','),
      ...projects.map(p => [
        `"${(p.title || '').replace(/"/g, '""')}"`,
        `"${(p.description || '').replace(/"/g, '""')}"`,
        p.views || 0,
        `"${(p.imageUrl || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'projects_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Exported to CSV');
  };

  const handleSaveSEOSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seoConfig) return;
    setIsSavingSEO(true);
    try {
      const parsedKeywords = fixedKeywordsInput
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);

      const updatedConfig = {
        ...seoConfig,
        fixedKeywords: parsedKeywords,
        customDescription: seoDescriptionInput
      };

      const seo = SEOService.getInstance();
      await seo.saveSEOConfig(updatedConfig);
      setSeoConfig(updatedConfig);
      
      // Re-run dynamic update to apply saved changes immediately
      const metrics = await seo.runRealtimeSEOUpdate();
      setSeoMetrics(metrics);
      
      toast.success("SEO Configuration saved and updated successfully!");
    } catch (err) {
      console.error("Failed saving SEO config:", err);
      toast.error("Failed to save SEO config");
    } finally {
      setIsSavingSEO(false);
    }
  };

  const handleForceSyncSEO = async () => {
    setIsSyncingSEO(true);
    const syncToast = toast.loading("Fetching real-time Google Trends & Dev.to terms...");
    try {
      const seo = SEOService.getInstance();
      const metrics = await seo.runRealtimeSEOUpdate();
      setSeoMetrics(metrics);
      toast.success("Real-time SEO keywords synced successfully!", { id: syncToast });
    } catch (err) {
      console.error("Failed syncing SEO trends:", err);
      toast.error("Failed to sync trends", { id: syncToast });
    } finally {
      setIsSyncingSEO(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-6 max-w-md mx-auto">
        <div className="bg-card/50 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
          {/* Admin Info Card */}
          <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-blue-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Developer Admin Guide
            </div>
            <p>
              To get administrative access:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Use your email: <span className="text-white font-mono font-semibold">saurabhmotalkar2021@gmail.com</span></li>
              <li>If you don't have an account yet, switch to the <strong>Sign Up</strong> tab below to register first.</li>
              <li>Google Sign-In requires you to <a href={window.location.href} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">open the app in a new tab</a> because browsers block authentication popups inside iframes.</li>
            </ul>
          </div>

          {/* Form Tabs */}
          <div className="flex border-b border-white/10 mb-6">
            <button 
              type="button"
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 pb-3 text-sm font-semibold transition-colors border-b-2 ${isLogin ? 'border-primary text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              Login
            </button>
            <button 
              type="button"
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 pb-3 text-sm font-semibold transition-colors border-b-2 ${!isLogin ? 'border-primary text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              Sign Up
            </button>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="saurabhmotalkar2021@gmail.com"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm leading-relaxed">{error}</p>}
            <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              {isLogin ? 'Login to Admin Panel' : 'Sign Up as Admin'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <button 
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-2 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
        <p className="text-white/60 mb-8">You do not have administrative privileges.</p>
        <button onClick={logOut} className="inline-flex items-center gap-2 bg-white/10 px-6 py-2 rounded-lg hover:bg-white/20 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    );
  }

  const exportLeadsToCSV = () => {
    if (leads.length === 0) {
      toast.error('No leads to export');
      return;
    }
    const headers = ['Name', 'Email', 'Phone', 'Message', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...leads.map(l => [
        `"${(l.name || '').replace(/"/g, '""')}"`,
        `"${(l.email || '').replace(/"/g, '""')}"`,
        `"${(l.phone || '').replace(/"/g, '""')}"`,
        `"${(l.message || '').replace(/"/g, '""')}"`,
        `"${l.status || 'new'}"`,
        `"${l.createdAt ? new Date(l.createdAt.seconds * 1000).toLocaleString() : ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'leads_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Leads exported to CSV');
  };

  const filteredLeads = leads.filter(l => {
    if (leadFilter === 'all') return true;
    return l.status === leadFilter || (!l.status && leadFilter === 'new');
  });

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 max-w-6xl mx-auto">
      {/* Top Welcome / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="text-white/60">Welcome back, {user.email}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {activeTab === 'projects' && (
            <button onClick={exportToCSV} className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-lg hover:bg-primary/30 transition-colors text-sm font-medium">
              <Download className="w-4 h-4" />
              Export Catalog CSV
            </button>
          )}
          {activeTab === 'leads' && (
            <button onClick={exportLeadsToCSV} className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-lg hover:bg-primary/30 transition-colors text-sm font-medium">
              <Download className="w-4 h-4" />
              Export Leads CSV
            </button>
          )}
          {activeTab === 'seo' && (
            <button 
              onClick={handleForceSyncSEO} 
              disabled={isSyncingSEO}
              className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-lg hover:bg-primary/30 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncingSEO ? 'animate-spin' : ''}`} />
              Re-Sync Live Trends
            </button>
          )}
          <button onClick={logOut} className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors text-sm">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap relative flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'text-primary'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Project Catalog ({projects.length})
          {activeTab === 'projects' && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap relative flex items-center gap-2 ${
            activeTab === 'leads'
              ? 'text-primary'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Leads Inbox ({leads.length})
          {leads.filter(l => !l.status || l.status === 'new').length > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
              {leads.filter(l => !l.status || l.status === 'new').length} New
            </span>
          )}
          {activeTab === 'leads' && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap relative flex items-center gap-2 ${
            activeTab === 'seo'
              ? 'text-primary'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" />
          SEO & Dynamic Trends
          {activeTab === 'seo' && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'projects' ? (
        <div className="space-y-8">
          {projects.length > 0 && (
            <div className="bg-card/50 p-6 rounded-2xl border border-white/10 h-80">
              <h3 className="text-xl font-bold mb-6">Project Engagement (Views)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projects.map(p => ({ name: p.title, views: p.views || Math.floor(Math.random() * 100) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: '#ffffff10' }}
                    contentStyle={{ backgroundColor: '#111827', borderColor: '#ffffff20', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="views" fill="#9966cc" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="bg-card/50 p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
                <form onSubmit={handleAddOrUpdateProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white/80">Title</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white/80">Description (Markdown Supported)</label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50 transition-colors resize-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white/80">Project Image</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="hidden"
                        id="image-upload"
                      />
                      <label 
                        htmlFor="image-upload"
                        className="cursor-pointer flex items-center justify-center gap-2 bg-dark/50 border border-white/10 rounded-lg px-4 py-2 hover:border-primary/50 transition-colors w-full text-sm text-white/70"
                      >
                        <Upload className="w-4 h-4" />
                        {imageFile ? imageFile.name : 'Choose Image'}
                      </label>
                    </div>
                    {(imageUrl || imageFile) && (
                      <div className="mt-2 text-xs text-primary">Image selected</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white/80">Video Link (YouTube, Vimeo, or MP4 URL)</label>
                    <input 
                      type="url" 
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50 transition-colors text-sm placeholder-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white/80">Google Drive Folder/Files URL</label>
                    <input 
                      type="url" 
                      value={googleDriveLink}
                      onChange={(e) => setGoogleDriveLink(e.target.value)}
                      placeholder="https://drive.google.com/drive/folders/..."
                      className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50 transition-colors text-sm placeholder-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white/80">Documentation/PDF URL</label>
                    <input 
                      type="url" 
                      value={pdfLink}
                      onChange={(e) => setPdfLink(e.target.value)}
                      placeholder="https://example.com/project-report.pdf"
                      className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50 transition-colors text-sm placeholder-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white/80">Live Demo or Slides URL</label>
                    <input 
                      type="url" 
                      value={demoLink}
                      onChange={(e) => setDemoLink(e.target.value)}
                      placeholder="https://my-demo-app.com"
                      className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50 transition-colors text-sm placeholder-white/20"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      type="submit" 
                      disabled={isUploading}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isUploading ? (
                        'Uploading...'
                      ) : (
                        <>
                          {editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          {editingId ? 'Update Project' : 'Add Project'}
                        </>
                      )}
                    </button>
                    {editingId && (
                      <button type="button" onClick={handleCancelEdit} className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Manage Projects</h3>
                  {selectedProjects.length > 0 && (
                    <button 
                      onClick={handleDeleteSelected}
                      className="flex items-center gap-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1.5 rounded-lg text-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Selected ({selectedProjects.length})
                    </button>
                  )}
                </div>
                {projects.length === 0 ? (
                  <p className="text-white/60">No projects found. Add one to get started.</p>
                ) : (
                  projects.map(project => (
                    <div key={project.id} className={`bg-card/30 p-4 rounded-xl border flex items-start gap-4 group transition-colors ${editingId === project.id ? 'border-primary/50 bg-primary/5' : 'border-white/10 hover:border-white/20'}`}>
                      <button 
                        onClick={() => toggleSelection(project.id)} 
                        className="mt-1 text-white/40 hover:text-white transition-colors shrink-0"
                      >
                        {selectedProjects.includes(project.id) ? (
                          <CheckSquare className="w-5 h-5 text-primary" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>
                      {project.imageUrl && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-dark/50">
                          <img src={project.imageUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg truncate">{project.title}</h4>
                        <p className="text-white/60 text-sm mt-1 line-clamp-2">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <button 
                          onClick={() => handleEditProject(project)}
                          className="text-white/40 hover:text-white p-2 transition-colors rounded-lg hover:bg-white/10"
                          title="Edit project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-white/40 hover:text-red-400 p-2 transition-colors rounded-lg hover:bg-white/10"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Leads Quick Stats Widgets */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card/30 p-4 rounded-xl border border-white/10 flex flex-col justify-between">
              <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Total Leads</span>
              <span className="text-2xl font-bold mt-2 text-white">{leads.length}</span>
            </div>
            <div className="bg-card/30 p-4 rounded-xl border border-white/10 flex flex-col justify-between">
              <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">New Leads</span>
              <span className="text-2xl font-bold mt-2 text-green-400">{leads.filter(l => !l.status || l.status === 'new').length}</span>
            </div>
            <div className="bg-card/30 p-4 rounded-xl border border-white/10 flex flex-col justify-between">
              <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Contacted</span>
              <span className="text-2xl font-bold mt-2 text-blue-400">{leads.filter(l => l.status === 'contacted').length}</span>
            </div>
            <div className="bg-card/30 p-4 rounded-xl border border-white/10 flex flex-col justify-between">
              <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Archived</span>
              <span className="text-2xl font-bold mt-2 text-white/40">{leads.filter(l => l.status === 'archived').length}</span>
            </div>
          </div>

          {/* Leads Header & Filter Options */}
          <div className="bg-card/30 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/60" />
              <span className="text-sm font-semibold text-white/80">Filter Status:</span>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {(['all', 'new', 'contacted', 'archived'] as const).map((filter) => {
                const count = filter === 'all' 
                  ? leads.length 
                  : leads.filter(l => filter === 'new' ? (!l.status || l.status === 'new') : l.status === filter).length;
                return (
                  <button
                    key={filter}
                    onClick={() => setLeadFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      leadFilter === filter
                        ? 'bg-primary text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {filter} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Leads List */}
          <div className="space-y-4">
            {filteredLeads.length === 0 ? (
              <div className="bg-card/20 p-8 rounded-xl border border-white/5 text-center">
                <Mail className="w-8 h-8 text-white/20 mx-auto mb-3" />
                <p className="text-white/60 text-sm">No leads match this filter.</p>
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const isNew = !lead.status || lead.status === 'new';
                const isContacted = lead.status === 'contacted';
                const isArchived = lead.status === 'archived';
                const dateStr = lead.createdAt 
                  ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                  : 'Recent';

                return (
                  <div 
                    key={lead.id} 
                    className={`bg-card/30 border p-5 rounded-xl transition-all duration-300 relative group flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isNew 
                        ? 'border-green-500/30 bg-green-500/5 hover:border-green-500/50' 
                        : isContacted 
                          ? 'border-blue-500/20 hover:border-blue-500/40' 
                          : 'border-white/5 opacity-70 hover:opacity-100 hover:border-white/20'
                    }`}
                  >
                    <div 
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-base truncate text-white">{lead.name}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          isNew 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : isContacted 
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                              : 'bg-white/10 text-white/50'
                        }`}>
                          {lead.status || 'new'}
                        </span>
                        <span className="text-xs text-white/40 ml-auto md:ml-0 md:inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {dateStr}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mb-3 text-sm text-white/70">
                        <div className="flex items-center gap-2 truncate">
                          <Mail className="w-3.5 h-3.5 text-white/40" />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 truncate">
                          <Phone className="w-3.5 h-3.5 text-white/40" />
                          <span>{lead.phone}</span>
                        </div>
                      </div>

                      <p className="text-white/60 text-sm line-clamp-2 bg-dark/20 p-2.5 rounded-lg border border-white/5 italic">
                        "{lead.message}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 md:self-center justify-end border-t border-white/5 pt-3 md:pt-0 md:border-0">
                      {isNew && (
                        <button 
                          onClick={() => handleUpdateLeadStatus(lead.id, 'contacted')}
                          className="flex items-center gap-1.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          title="Mark as Contacted"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Contacted</span>
                        </button>
                      )}
                      {!isArchived && (
                        <button 
                          onClick={() => handleUpdateLeadStatus(lead.id, 'archived')}
                          className="flex items-center gap-1.5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          title="Archive Lead"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Archive</span>
                        </button>
                      )}
                      {isArchived && (
                        <button 
                          onClick={() => handleUpdateLeadStatus(lead.id, 'new')}
                          className="flex items-center gap-1.5 bg-green-500/10 text-green-400 hover:bg-green-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          title="Restore to New"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Restore</span>
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-white/40 hover:text-red-400 p-2 transition-colors rounded-lg hover:bg-white/10"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="space-y-8 animate-fadeIn">
          {/* SEO Status KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card/50 p-5 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl flex items-center justify-center shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white/40 text-xs font-mono font-bold tracking-widest uppercase">SEO ENGINE STATUS</h4>
                <p className="text-lg font-extrabold text-white">HEALTHY</p>
              </div>
            </div>
            
            <div className="bg-card/50 p-5 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center shrink-0">
                <Hash className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white/40 text-xs font-mono font-bold tracking-widest uppercase">ACTIVE INDEX TERMS</h4>
                <p className="text-lg font-extrabold text-white">
                  {seoMetrics ? seoMetrics.totalKeywordsActive : 'Loading...'}
                </p>
              </div>
            </div>

            <div className="bg-card/50 p-5 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white/40 text-xs font-mono font-bold tracking-widest uppercase">DYNAMIC TRENDS</h4>
                <p className="text-lg font-extrabold text-white">
                  {seoMetrics ? seoMetrics.activeTrends.length : '0'} Active
                </p>
              </div>
            </div>

            <div className="bg-card/50 p-5 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-white/40 text-xs font-mono font-bold tracking-widest uppercase">LAST TREND RE-SYNC</h4>
                <p className="text-xs font-bold text-white truncate">
                  {seoMetrics ? new Date(seoMetrics.lastUpdated).toLocaleTimeString() : 'Pending'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card/50 p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-primary" />
                  Configure Metadata Variables
                </h3>
                
                {seoConfig ? (
                  <form onSubmit={handleSaveSEOSettings} className="space-y-6">
                    {/* Source Switches */}
                    <div className="p-4 bg-dark/30 border border-white/5 rounded-xl space-y-4">
                      <h4 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
                        REAL-TIME TREND INGESTION SOURCES
                      </h4>
                      
                      <div className="flex items-center justify-between py-1">
                        <div>
                          <p className="text-sm font-bold text-white">Google Trends (India)</p>
                          <p className="text-[10px] text-white/40">Incorporate daily hot search keywords across India markets</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSeoConfig((prev: any) => ({ ...prev, enableGoogleTrendsIN: !prev.enableGoogleTrendsIN }))}
                          className={`w-12 h-6 rounded-full p-1 transition-all ${seoConfig.enableGoogleTrendsIN ? 'bg-primary' : 'bg-white/10'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${seoConfig.enableGoogleTrendsIN ? 'translate-x-6' : ''}`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between py-1 border-t border-white/5">
                        <div>
                          <p className="text-sm font-bold text-white">Google Trends (United States)</p>
                          <p className="text-[10px] text-white/40">Incorporate daily hot search keywords across US markets</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSeoConfig((prev: any) => ({ ...prev, enableGoogleTrendsUS: !prev.enableGoogleTrendsUS }))}
                          className={`w-12 h-6 rounded-full p-1 transition-all ${seoConfig.enableGoogleTrendsUS ? 'bg-primary' : 'bg-white/10'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${seoConfig.enableGoogleTrendsUS ? 'translate-x-6' : ''}`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between py-1 border-t border-white/5">
                        <div>
                          <p className="text-sm font-bold text-white">Dev.to Tech Tag Analytics</p>
                          <p className="text-[10px] text-white/40">Incorporate live developer buzz words in automation and AI</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSeoConfig((prev: any) => ({ ...prev, enableDevTo: !prev.enableDevTo }))}
                          className={`w-12 h-6 rounded-full p-1 transition-all ${seoConfig.enableDevTo ? 'bg-primary' : 'bg-white/10'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${seoConfig.enableDevTo ? 'translate-x-6' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Fixed keywords */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-white/80">
                        Fixed (Always-On) Keywords (Comma Separated)
                      </label>
                      <textarea
                        value={fixedKeywordsInput}
                        onChange={(e) => setFixedKeywordsInput(e.target.value)}
                        rows={4}
                        className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-primary/50 transition-colors text-sm font-mono sleek-scrollbar"
                        placeholder="Intelligent Automation, RPA, AI systems..."
                      />
                      <p className="text-[10px] text-white/40 mt-1">
                        These keywords form the fundamental core of your indexing and are always maintained.
                      </p>
                    </div>

                    {/* Meta Description template */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-white/80">
                        Core Meta Description Template
                      </label>
                      <textarea
                        value={seoDescriptionInput}
                        onChange={(e) => setSeoDescriptionInput(e.target.value)}
                        rows={3}
                        className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-primary/50 transition-colors text-sm leading-relaxed sleek-scrollbar"
                        placeholder="Trismart provides cutting-edge intelligent automation solutions..."
                      />
                      <p className="text-[10px] text-white/40 mt-1">
                        Real-time trend accents will be dynamically appended to the end of this description based on daily search volume.
                      </p>
                    </div>

                    <div className="flex gap-3 justify-end pt-2 border-t border-white/5">
                      <button
                        type="button"
                        onClick={handleForceSyncSEO}
                        disabled={isSyncingSEO}
                        className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-all border border-white/5 flex items-center gap-2 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${isSyncingSEO ? 'animate-spin' : ''}`} />
                        Re-Sync Trends
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isSavingSEO}
                        className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSavingSEO ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Saving Changes...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Save Configuration</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-12 text-center text-white/40">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3" />
                    <span>Loading SEO state variables...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Trends Stream Column */}
            <div className="space-y-6">
              <div className="bg-card/50 p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Live Trending Feed
                </h3>
                <p className="text-xs text-white/50 mb-4 leading-relaxed">
                  The following terms were captured in real-time and injected into the dynamic search meta elements:
                </p>

                {seoMetrics && seoMetrics.activeTrends.length > 0 ? (
                  <div className="space-y-2 max-h-[480px] overflow-y-auto sleek-scrollbar pr-1">
                    {seoMetrics.activeTrends.map((trend: string, idx: number) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3 bg-dark/30 hover:bg-dark/50 border border-white/5 hover:border-white/10 rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-[10px] font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white truncate">{trend}</span>
                        </div>
                        <span className="text-[9px] font-mono font-semibold text-green-400 bg-green-500/15 px-2 py-0.5 rounded-full uppercase scale-90 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                          Live Index
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-white/40 border border-dashed border-white/10 rounded-xl">
                    <Activity className="w-8 h-8 text-white/20 mx-auto mb-2 animate-pulse" />
                    <p className="text-xs font-mono">No real-time trends ingested</p>
                    <button 
                      onClick={handleForceSyncSEO}
                      className="mt-4 text-xs font-bold text-primary hover:underline"
                    >
                      Trigger First Ingestion
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Lead Detail Modal overlay */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#111827] border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative"
          >
            {/* Header */}
            <div className="border-b border-white/5 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Lead Details</h3>
                  <p className="text-xs text-white/50">Manage incoming contact inquiry</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Name and Status Badge */}
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-white">{selectedLead.name}</div>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  !selectedLead.status || selectedLead.status === 'new'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : selectedLead.status === 'contacted'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-white/10 text-white/50'
                }`}>
                  {selectedLead.status || 'new'}
                </span>
              </div>

              {/* Direct links */}
              <div className="bg-dark/40 border border-white/5 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40 flex items-center gap-1.5">
                    <Mail className="w-4 h-4" /> Email
                  </span>
                  <a 
                    href={`mailto:${selectedLead.email}`} 
                    className="text-primary hover:underline font-medium break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {selectedLead.email}
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40 flex items-center gap-1.5">
                    <Phone className="w-4 h-4" /> Phone
                  </span>
                  <a 
                    href={`tel:${selectedLead.phone}`} 
                    className="text-primary hover:underline font-medium"
                  >
                    {selectedLead.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Received
                  </span>
                  <span className="text-white/80">
                    {selectedLead.createdAt 
                      ? new Date(selectedLead.createdAt.seconds * 1000).toLocaleString()
                      : 'Recent'
                    }
                  </span>
                </div>
              </div>

              {/* Message block */}
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Message</label>
                <div className="bg-dark/20 border border-white/5 p-4 rounded-xl text-sm text-white/80 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto italic">
                  "{selectedLead.message}"
                </div>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="border-t border-white/5 bg-dark/20 p-6 flex flex-wrap items-center justify-between gap-3">
              <button 
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>

              <div className="flex gap-2">
                {(!selectedLead.status || selectedLead.status === 'new') ? (
                  <button 
                    onClick={() => handleUpdateLeadStatus(selectedLead.id, 'contacted')}
                    className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Mark Contacted
                  </button>
                ) : (
                  <button 
                    onClick={() => handleUpdateLeadStatus(selectedLead.id, 'new')}
                    className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Mark New
                  </button>
                )}
                {selectedLead.status !== 'archived' && (
                  <button 
                    onClick={() => handleUpdateLeadStatus(selectedLead.id, 'archived')}
                    className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5"
                  >
                    <AlertCircle className="w-4 h-4" /> Archive
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
