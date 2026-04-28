import { Home, Sprout, Cpu, Plus } from 'lucide-react';

export const catalogueData: Record<string, any> = {
  'smart-home': {
    title: 'Smart Home',
    icon: Home,
    description: 'Intelligent living spaces that adapt to your needs.',
    content: 'Our smart home solutions integrate lighting, climate, security, and entertainment into a single, cohesive ecosystem. We use advanced sensors and AI to learn your patterns and optimize your environment for comfort and efficiency.'
  },
  'smart-agriculture': {
    title: 'Smart Agriculture',
    icon: Sprout,
    description: 'Precision farming for the next generation.',
    content: 'Transform your agricultural operations with IoT-driven precision farming. Monitor soil health, automate irrigation, and use drone analytics to maximize crop yield while minimizing resource waste.'
  },
  'digital-automation': {
    title: 'Digital Automation',
    icon: Cpu,
    description: 'Streamlining business processes with software.',
    content: 'Digital Process Automation (DPA) leverages software robots, AI, and analytics to design, execute, and optimize end-to-end business workflows. Eliminate manual errors and accelerate your time-to-market.'
  },
  'more': {
    title: 'More Solutions',
    icon: Plus,
    description: 'Bespoke automation for unique challenges.',
    content: 'We specialize in custom automation solutions for industries ranging from healthcare to logistics. If you have a repetitive process or a complex operational challenge, we can design a system to solve it.'
  }
};

export const getCatalogueItem = async (id: string): Promise<any> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return catalogueData[id] || catalogueData['more'];
};
