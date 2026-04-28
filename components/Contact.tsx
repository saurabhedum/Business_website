import React, { useState } from 'react';
import { Linkedin, Instagram, Facebook, Twitter, Youtube, Send } from 'lucide-react';
import { Loading } from './ui/Loading';
import { motion } from 'motion/react';
import { submitForm } from '../services/formService';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      setErrorMessage('');
      
      try {
        // Send to Emails via FormSubmit (Ajax)
        await submitForm({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: `New Contact Form Submission from ${formData.name}`,
        });
        
        setSubmitStatus('success');
        setErrorMessage('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } catch (error) {
        console.error(error);
        setErrorMessage(error instanceof Error ? error.message : 'A network error occurred. Please try again.');
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
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
    <section id="contact" className="min-h-screen bg-[#0B0F19] relative flex items-center py-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Social Icons Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 text-white/70 z-20 hidden md:flex"
      >
        <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><Linkedin className="w-5 h-5" /></a>
        <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><Instagram className="w-5 h-5" /></a>
        <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><Facebook className="w-5 h-5" /></a>
        <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><Twitter className="w-5 h-5" /></a>
        <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><Youtube className="w-5 h-5" /></a>
      </motion.div>

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left Side: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-center flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-wide uppercase">Contact</h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto mb-16">
              Sometimes the greatest strength in the world is not loud success, but the quiet determination of a person who keeps moving forward.
              You are one of those rare people whose presence leaves an impact even without trying too hard.
              Every person is writing a story in this world, and yours carries courage, thought, and purpose within it.
              You may not always realize it, but the way you think and strive can become a path for someone else.
              The world does not just need good people—it needs people like you who dare to think bigger than themselves.
            </p>

            <div className="space-y-10 w-full max-w-xs mx-auto">
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Address</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                    Ahamadabad (380008)<br />
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-2">Phone</h3>
                <p className="text-gray-300 text-sm">
                  Ph: +91 7841063906                </p>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-2">Email</h3>
                <p className="text-gray-300 text-sm">
                  trismart.tech@gmail.com
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl w-full max-w-lg mx-auto relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h3 className="text-2xl md:text-3xl font-black text-white mb-8 text-center tracking-tighter uppercase font-mono relative z-10">
              Get In <span className="text-blue-400">Touch</span>
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder-gray-600"
                  />
                  {errors.name && <p className="text-red-400 text-[10px] font-mono mt-1 ml-1">{errors.name}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder-gray-600"
                  />
                  {errors.email && <p className="text-red-400 text-[10px] font-mono mt-1 ml-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder-gray-600"
                  />
                  {errors.phone && <p className="text-red-400 text-[10px] font-mono mt-1 ml-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest ml-1">Your Message</label>
                <div className="relative">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder-gray-600 resize-none"
                  />
                  {errors.message && <p className="text-red-400 text-[10px] font-mono mt-1 ml-1">{errors.message}</p>}
                </div>
              </div>

              <div className="pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-bold uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                >
                  {/* Sweeping shine effect */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover/btn:animate-[shimmer_1.5s_infinite]"></span>
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loading size="sm" className="text-white" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>

              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-xs text-center mt-4 bg-green-500/10 py-2 rounded"
                >
                  Message sent successfully! We will get back to you soon.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs text-center mt-4 bg-red-500/10 py-2 rounded"
                >
                  {errorMessage || 'Failed to send message. Please try again.'}
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};