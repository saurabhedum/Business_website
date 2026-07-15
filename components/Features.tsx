import React from 'react';
import { TrendingUp, Cpu, Target, CheckCircle } from 'lucide-react';
import { Feature } from '../types';
import { motion } from 'motion/react';
import { TiltCard } from './ui/TiltCard';
import { EditableText } from '../contexts/CMSContext';

const featuresData: Feature[] = [
  {
    icon: TrendingUp,
    title: 'ROI & Profitability',
    description: 'We redesign operations for measurable profitability. Our solutions combine business ROI modeling to ensure every automation pays for itself.',
    stat: 'Measurable Impact',
  },
  {
    icon: Cpu,
    title: 'Engineering Depth',
    description: 'Combining industrial engineering with AI-driven analytics to build robust, scalable systems without unnecessary complexity.',
    stat: 'Deep Tech Integration',
  },
  {
    icon: Target,
    title: 'Strategic Vision',
    description: 'Outcome-driven and data-backed strategies that eliminate inefficiencies and focus on what truly matters for your growth.',
    stat: 'Data-Backed Strategy',
  },
  {
    icon: CheckCircle,
    title: 'Practical Implementation',
    description: 'Built for the real world. We ensure our solutions are practical, scalable, and ready for immediate deployment in the Indian market.',
    stat: 'Real-World Ready',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15,
      duration: 0.6
    }
  },
};

export const Features: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-darker relative overflow-hidden">
      <div className="container mx-auto px-[5vw] relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <div className="text-primary font-bold text-sm tracking-wider uppercase mb-3">
            <EditableText id="features.sectionBadge" defaultText="INTELLIGENCE LAYER" />
          </div>
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-6">
            <EditableText id="features.sectionTitle" defaultText="Custom Software Built for Enterprise Operations" />
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            <EditableText id="features.sectionDesc" defaultText="We engineer high-performance systems integrated with neural cognition and visual processing pipelines." />
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuresData.map((feature, index) => (
            <TiltCard key={index} className="h-full">
              <motion.div 
                variants={cardVariants as any}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-[#0f1523] border border-gray-800 p-8 rounded-xl hover:border-primary/50 transition-all duration-300 group relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(var(--color-primary),0.15)] h-full flex flex-col"
              >
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300 shadow-inner">
                  <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="relative z-10 text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                  {feature.description}
                </p>
                <div className="relative z-10 text-sm font-semibold text-primary pt-4 border-t border-gray-800 group-hover:border-primary/30 transition-colors duration-300 flex items-center gap-2 mt-auto">
                  {feature.stat}
                  <motion.span
                    initial={{ x: -5, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};