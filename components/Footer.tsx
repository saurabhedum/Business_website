import React from 'react';
import { Linkedin, Twitter, Facebook, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { useUI } from '../contexts/UIContext';
import { motion } from 'motion/react';

export const Footer: React.FC = () => {
  const { openContactModal } = useUI();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer className="relative bg-[#05080F] pt-16 md:pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Top Section: Newsletter & CTA */}
        <motion.div variants={itemVariants as any} className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-16 border-b border-white/10 mb-16">
          <div className="max-w-xl">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to automate your future?</h3>
            <p className="text-gray-400 text-lg">Join our newsletter for the latest insights on AI, automation, and digital transformation.</p>
          </div>
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow sm:w-80">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={openContactModal}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-medium transition-all hover:border-white/20 whitespace-nowrap relative overflow-hidden group"
            >
              <span className="relative z-10">Contact Sales</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column (Spans 4 cols on lg) */}
          <motion.div variants={itemVariants as any} className="lg:col-span-4 space-y-8">
            <a 
              href="/"
              onClick={scrollToTop}
              className="inline-block hover:opacity-90 transition-opacity"
              aria-label="Back to home"
            >
               <Logo className="h-12 text-white" />
            </a>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
              Pioneering the future of business through intelligent automation, AI integration, and transformative digital solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">trismart.tech@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+91 7841063906</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </motion.div>

          {/* Links Columns (Span 2 cols each on lg) */}
          <motion.div variants={itemVariants as any} className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Solutions</h4>
            <ul className="space-y-4">
              {['Home Automation', 'Software Automation', 'Industrial Automation', 'Smart Ecosystems', 'Financial Automation'].map((item) => (
                <li key={item}>
                  <a href="#" aria-label={item} className="text-gray-400 hover:text-primary text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants as any} className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Leadership Team', 'Careers', 'News & Press', 'Sustainability'].map((item) => (
                <li key={item}>
                  <a href="#" aria-label={item} className="text-gray-400 hover:text-primary text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants as any} className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Resources</h4>
            <ul className="space-y-4">
              {['Blog', 'Case Studies', 'Documentation'].map((item) => (
                <li key={item}>
                  <a href="#" aria-label={item} className="text-gray-400 hover:text-primary text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants as any} className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" aria-label={item} className="text-gray-400 hover:text-primary text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div variants={itemVariants as any} className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Trismart Automation. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/trismart-automations-4723103b3/' },
              { name: 'X', icon: () => (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ), href: 'https://x.com/Raviraj1323255' },
              { name: 'Instagram', icon: () => (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                ), href: 'https://www.instagram.com/trismart.automations/' },
              { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@trismartautomationsyt?si=4Yw0fKuuZpoyJhzN' }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all hover:-translate-y-1"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};