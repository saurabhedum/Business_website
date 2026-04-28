import React from 'react';
import { Bot, GitBranch, Cpu, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';
import { Service } from '../types';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

const servicesData: Service[] = [
  {
    id: 'rpa',
    title: 'Robotic Process Automation',
    description: 'Automate repetitive tasks with intelligent software robots that work 24/7, reducing errors and freeing your team for strategic initiatives.',
    image: 'https://i.pinimg.com/1200x/fb/68/b3/fb68b30bff0a5a27fd84aa28a52f4d65.jpg',
    features: ['Automated data entry and extraction', 'Cross-system integration', 'Rule-based decision making', 'Scalable bot deployment'],
    link: '#',
    icon: Bot,
  },
  {
    id: 'workflow',
    title: 'Workflow Automation',
    description: 'Streamline your business processes with custom workflow solutions that connect people, systems, and data seamlessly.',
    image: 'https://i.pinimg.com/736x/c4/6e/e3/c46ee3b7e18989566a96ed23d8d48bb4.jpg',
    features: ['Visual workflow designer', 'Approval automation', 'Document routing', 'Real-time notifications'],
    link: '#',
    icon: GitBranch,
  },
  {
    id: 'ai',
    title: 'AI Automotion',
    description: 'Leverage artificial intelligence to enhance decision-making, predict outcomes, and unlock insights from your business data.',
    image: 'https://i.pinimg.com/1200x/8b/6c/1e/8b6c1e75486266fe4da135fe750db014.jpg',
    features: ['Machine learning models', 'Natural language processing', 'Predictive analytics', 'Intelligent document processing'],
    link: '#',
    icon: Cpu,
  },
  {
    id: 'analytics',
    title: 'Data Analytics & Reporting',
    description: 'Transform raw data into actionable insights with automated reporting and real-time dashboards that drive informed decisions.',
    image: 'https://i.pinimg.com/736x/6f/08/08/6f08086d7582c9f34850bc07cbe06d87.jpg',
    features: ['Automated report generation', 'Real-time dashboards', 'Data visualization', 'KPI monitoring'],
    link: '#',
    icon: BarChart3,
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-dark relative overflow-hidden">
      <HeroMotionBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our <span className="text-primary">Automation Services</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive solutions tailored to your business needs, from process automation to AI-powered intelligence.</p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {servicesData.map((service, index) => (
            <div key={service.id} className={`flex flex-col lg:flex-row gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                   <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                   <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-64 md:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                   />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-primary font-bold text-sm tracking-wider uppercase">Service</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <span className="inline-flex items-center gap-2 text-primary font-bold cursor-not-allowed opacity-80 hover:opacity-100 hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};