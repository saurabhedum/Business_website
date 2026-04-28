import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { motion } from 'motion/react';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

export const CTA: React.FC = () => {
  const { openContactModal } = useUI();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-darker border-y border-white/5">
      <HeroMotionBackground />
      {/* Background Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-primary/20 blur-[120px] rounded-full pointer-events-none"
      ></motion.div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-white mb-6"
        >
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Transform</span> Your <br className="hidden md:block"/> Business?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto"
        >
          Schedule a free consultation with our automation experts and discover how we can help you achieve your operational goals.
        </motion.p>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 md:mb-12 text-gray-300 text-sm font-medium"
        >
          {[
            'Free consultation and ROI assessment',
            'Custom automation strategy',
            'Proven implementation methodology',
            'Ongoing support and optimization'
          ].map((text, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>{text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openContactModal}
          className="relative overflow-hidden group bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center gap-3 shadow-[0_0_20px_rgba(var(--color-primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.6)] transition-all duration-300"
        >
          {/* Sweeping shine effect on button */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></span>
          
          {/* Background sweep effect on hover */}
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>

          <span className="relative z-10 flex items-center gap-3">
            Schedule Your Free Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>
      </div>
    </section>
  );
};