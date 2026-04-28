import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  link: string;
  icon: LucideIcon;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  whatItMeans?: string;
  icon: LucideIcon;
}

export interface Testimonial {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  stats: {
    label: string;
    value: string;
  }[];
  quote: string;
  author: string;
  role: string;
}

export interface Industry {
  name: string;
  icon: LucideIcon;
}

export type ProjectIndustry = 
  | 'Home Automation'
  | 'Software Automation'
  | 'Industrial Automation'
  | 'Agriculture Automation'
  | 'Security Solutions'
  | 'Smart Ecosystems'
  | 'Content Automation'
  | 'Financial Automation'
  | 'Healthcare Automation'
  | 'Logistics & Supply Chain Automation'
  | 'Energy & Utility Automation'
  | 'Education Automation (EdTech Infrastructure)'
  | 'HR & Workforce Automation'
  | 'Retail & Commerce Automation'
  | 'ESG & Sustainability Automation';

export interface TechSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  industry: ProjectIndustry;
  description: string;
  shortDescription: string;
  detailedBrief: string;
  impact: string;
  roi: string;
  techStack: string[];
  modelsUsed: string[]; // New field for AI/Algo specifics
  imageUrl: string;
  specifications: TechSpec[];
  prototypeData: {
    complexity: number;
    sensorCount: number;
    latency: string;
  };
}

export interface AIPromptResult {
  title: string;
  summary: string;
  steps: string[];
  estimatedTime: string;
  costEstimate: string;
}
