import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { Loading } from './ui/Loading';
import { submitForm } from '../services/formService';

const quotes = [
  "“The future belongs to those who automate the ordinary so humans can achieve the extraordinary. Tell us what you want to transform.”",
  "“Every automation we build begins with one question: How can we make your life easier? Let’s start that conversation.”",
  "“Technology should remove friction, not create it. Share your challenge — we’ll design the system that solves it.”",
  "“Automation is not about machines replacing people. It’s about empowering people with better systems. Let’s build yours.”",
  "“Behind every successful business is a system that works while you sleep. Let’s design that system for you.”",
  "“Your ideas deserve systems that work flawlessly. Tell us your vision — we’ll engineer the intelligence behind it.”",
  "“Great companies run on great systems. Let’s build automation that moves your business forward.”",
  "“We don't just install technology. We design solutions that quietly solve problems every day.”",
  "“If a task repeats, it can be automated. Tell us what slows you down.”",
  "“Automation isn’t a product. It’s a strategy. Let’s craft one for you.”"
];

export const ContactModal: React.FC = () => {
  const { isContactModalOpen, closeContactModal } = useUI();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    if (!isContactModalOpen) return;
    
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isContactModalOpen]);

  if (!isContactModalOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
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
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        _subject: `New Contact Form Submission from ${formData.name}`,
      });
      
      setSubmitStatus('success');
      setErrorMessage('');
      setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
      });
      setTimeout(() => {
        setSubmitStatus('idle');
        closeContactModal();
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'A network error occurred. Please check your connection and try again.');
      setSubmitStatus('error');
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
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Transparent/Video Background Placeholder */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover absolute inset-0 opacity-50 mix-blend-overlay">
          <source src="" type="" />
        </video>
      </div>

      {/* Close Button */}
      <button 
        onClick={closeContactModal}
        className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-full py-10">
        
        {/* Transparent Form Container */}
        <div className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 sm:p-10 shadow-2xl animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">Get In Touch</h2>
          <p className="text-gray-300 text-sm mb-8">
            
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Full Name"
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder-gray-400" 
                />
                {errors.name && <p className="text-red-400 text-[10px] ml-1">{errors.name}</p>}
              </div>
              <div className="space-y-1">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address"
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder-gray-400" 
                />
                {errors.email && <p className="text-red-400 text-[10px] ml-1">{errors.email}</p>}
              </div>
            </div>
            
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone Number"
              value={formData.phone} 
              onChange={handleChange} 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder-gray-400" 
            />
            
            <input 
              type="text" 
              name="subject" 
              placeholder="Subject"
              value={formData.subject} 
              onChange={handleChange} 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder-gray-400" 
            />

            <div className="space-y-1">
              <textarea 
                name="message" 
                placeholder="Your Message..."
                value={formData.message} 
                onChange={handleChange} 
                rows={4} 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none placeholder-gray-400"
              ></textarea>
              {errors.message && <p className="text-red-400 text-[10px] ml-1">{errors.message}</p>}
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full mt-4 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold tracking-wider py-4 px-8 rounded-xl shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 uppercase"
            >
              {isSubmitting ? (
                <>
                  <Loading size="sm" />
                  <span>Sending...</span>
                </>
              ) : (
                'SEND MESSAGE'
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-sm text-center font-medium">
                Message sent successfully! We will get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center font-medium">
                {errorMessage || 'Failed to send message. Please try again.'}
              </div>
            )}
          </form>
        </div>

        {/* Quotes Slideshow */}
        <div className="mt-12 w-full max-w-4xl text-center px-4 h-24 relative flex items-center justify-center">
          {quotes.map((quote, index) => (
            <p 
              key={index}
              className={`absolute w-full text-white/90 text-lg sm:text-xl font-medium italic transition-all duration-1000 ease-in-out ${
                index === currentQuoteIndex 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4 pointer-events-none'
              }`}
            >
              {quote}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
};