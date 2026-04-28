
import React, { useState } from 'react';
import { Project } from '../types';
import { submitForm } from '../services/formService';

interface RequestDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

const RequestDemoModal: React.FC<RequestDemoModalProps> = ({ project, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requirements: ''
  });

  if (!project) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      // Send to Emails via FormSubmit (Ajax)
      await submitForm({
        name: formData.name,
        email: formData.email,
        requirements: formData.requirements,
        project: project.title,
        _subject: `New Demo Request for ${project.title} from ${formData.name}`,
      });

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-950 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-xl font-bold text-white mb-1">Request Demo</h3>
        <p className="text-sm text-slate-400 mb-6">
          Schedule a technical deep-dive of the <span className="theme-text font-bold">{project.title}</span> architecture.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Project Ref</label>
              <input 
                type="text" 
                value={`TRM-${project.id.padStart(3, '0')}`} 
                disabled 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-400 text-sm font-mono cursor-not-allowed opacity-70"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Est. ROI</label>
               <input 
                type="text" 
                value={project.roi.split(' ')[0]} 
                disabled 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-emerald-400 text-sm font-bold cursor-not-allowed opacity-70"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-[var(--theme-color)] focus:ring-1 focus:ring-[var(--theme-color)] transition-all" 
              placeholder="Dr. Engineering Lead" 
            />
            {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Corporate Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-[var(--theme-color)] focus:ring-1 focus:ring-[var(--theme-color)] transition-all" 
              placeholder="engineer@enterprise.com" 
            />
            {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
          </div>

           <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Technical Requirements (Optional)</label>
            <textarea 
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-[var(--theme-color)] focus:ring-1 focus:ring-[var(--theme-color)] transition-all h-24 resize-none" 
              placeholder="Describe your current infrastructure scale..." 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || submitStatus === 'success'}
            className="w-full theme-bg text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all theme-shadow mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Request...
              </>
            ) : submitStatus === 'success' ? (
              'Request Sent Successfully!'
            ) : (
              'Initiate Demo Protocol'
            )}
          </button>

          {submitStatus === 'success' && (
            <p className="text-emerald-400 text-xs text-center mt-4 font-medium">
              Demo request received. Our engineering team will contact you shortly.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-400 text-xs text-center mt-4 font-medium">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RequestDemoModal;
