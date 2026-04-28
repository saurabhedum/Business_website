import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Code, Factory, Sprout, Shield, Building, FileText, 
  DollarSign, Activity, Truck, Zap, GraduationCap, Users, 
  ShoppingCart, Leaf, Search, Database, Cpu, Settings, PenTool, Send, Phone, Lock, BarChart, CheckCircle2,
  Lightbulb, Thermometer, Video, Key, Battery, Mic, Sun, Speaker, Tv, Droplet, Flame, LayoutDashboard,
  ChevronDown, ChevronUp
} from 'lucide-react';

const industryData = [
  {
    name: 'Home Automation',
    icon: Home,
    steps: [
      { title: 'Intelligent Lighting Control', desc: 'Automated on/off scheduling, dimming, scene presets, daylight-based adjustment, and remote control via app or voice.', icon: Lightbulb },
      { title: 'Climate & HVAC Automation', desc: 'Smart thermostats, temperature zoning, humidity control, energy-optimized heating/cooling cycles.', icon: Thermometer },
      { title: 'Advanced Security & Surveillance', desc: 'Smart locks, video doorbells, AI-based CCTV monitoring, intrusion detection, remote access.', icon: Video },
      { title: 'Access Control Systems', desc: 'Biometric entry, RFID cards, keypad access, remote unlocking, visitor logs.', icon: Key },
      { title: 'Smart Energy Management', desc: 'Real-time power consumption monitoring, load balancing, solar integration, peak usage optimization.', icon: Battery },
      { title: 'Voice Assistant Integration', desc: 'Integration with platforms like Alexa, Google Assistant, Siri for centralized command control.', icon: Mic },
      { title: 'Automated Window Treatments', desc: 'Motorized blinds and curtains with time-based or light-based automation.', icon: Sun },
      { title: 'Home Theater & Audio Automation', desc: 'Multi-room audio, centralized AV control, immersive cinema room automation.', icon: Speaker },
      { title: 'Appliance & Device Automation', desc: 'Smart control of refrigerators, washing machines, geysers, ovens, etc.', icon: Tv },
      { title: 'Water & Leak Detection Systems', desc: 'Smart water flow monitoring, leak detection sensors, automatic shutoff systems.', icon: Droplet },
      { title: 'Fire & Gas Detection Integration', desc: 'Smoke sensors, gas leakage detection, automated alert systems, emergency response triggers.', icon: Flame },
      { title: 'Centralized Smart Control Dashboard', desc: 'Single interface (mobile/tablet/panel) to monitor and control all home systems.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'Software Automation',
    icon: Code,
    steps: [
      { title: 'CI/CD Pipeline Automation', desc: 'Automated build, test, and deployment pipelines for continuous delivery.', icon: Send },
      { title: 'Automated Testing & QA', desc: 'Unit, integration, and end-to-end testing with automated reporting.', icon: CheckCircle2 },
      { title: 'Infrastructure as Code (IaC)', desc: 'Automated provisioning and management of cloud infrastructure.', icon: Database },
      { title: 'Containerization & Orchestration', desc: 'Automated scaling and management of containerized applications.', icon: Settings },
      { title: 'Automated Code Review', desc: 'Static analysis and AI-driven code quality checks.', icon: Search },
      { title: 'Log Monitoring & Alerting', desc: 'Real-time log aggregation, anomaly detection, and automated alerts.', icon: Activity },
      { title: 'Automated Database Migrations', desc: 'Version-controlled, automated schema updates and rollbacks.', icon: Database },
      { title: 'Cloud Resource Provisioning', desc: 'Dynamic allocation of computing resources based on demand.', icon: Cpu },
      { title: 'Automated Security Scanning', desc: 'Continuous vulnerability scanning and dependency checks.', icon: Lock },
      { title: 'Release Management', desc: 'Automated versioning, changelog generation, and release coordination.', icon: PenTool },
      { title: 'Dependency Management', desc: 'Automated updates and patching of third-party libraries.', icon: Settings },
      { title: 'Performance Profiling', desc: 'Automated performance testing and bottleneck identification.', icon: BarChart }
    ]
  },
  {
    name: 'Industrial Automation',
    icon: Factory,
    steps: [
      { title: 'SCADA System Integration', desc: 'Centralized supervisory control and data acquisition for industrial processes.', icon: LayoutDashboard },
      { title: 'Predictive Maintenance', desc: 'AI-driven equipment monitoring to predict failures before they occur.', icon: Activity },
      { title: 'Robotic Process Automation', desc: 'Automated assembly, welding, and material handling using robotics.', icon: Cpu },
      { title: 'IoT Sensor Networks', desc: 'Real-time data collection from distributed industrial sensors.', icon: Database },
      { title: 'Automated Quality Control', desc: 'Computer vision and sensor-based product inspection.', icon: Search },
      { title: 'Inventory & Material Handling', desc: 'Automated guided vehicles (AGVs) and smart warehousing.', icon: Truck },
      { title: 'Energy Consumption Optimization', desc: 'Automated load balancing and energy efficiency management.', icon: Battery },
      { title: 'Supply Chain Integration', desc: 'Automated ordering and supplier communication based on inventory levels.', icon: Send },
      { title: 'Automated Packaging Systems', desc: 'Robotic packaging, labeling, and sorting systems.', icon: Settings },
      { title: 'Equipment Condition Monitoring', desc: 'Real-time tracking of vibration, temperature, and operational metrics.', icon: Thermometer },
      { title: 'Safety Interlock Systems', desc: 'Automated emergency shutdowns and safety protocol enforcement.', icon: Lock },
      { title: 'Real-time Production Dashboards', desc: 'Live visualization of OEE, throughput, and production KPIs.', icon: BarChart }
    ]
  },
  {
    name: 'Agriculture Automation',
    icon: Sprout,
    steps: [
      { title: 'Smart Irrigation Systems', desc: 'Automated watering based on soil moisture, weather, and crop needs.', icon: Droplet },
      { title: 'Soil Moisture Monitoring', desc: 'Real-time tracking of soil conditions using distributed sensors.', icon: Activity },
      { title: 'Automated Harvesting', desc: 'Robotic harvesting systems for precision crop collection.', icon: Cpu },
      { title: 'Drone-based Crop Scouting', desc: 'Aerial imaging and AI analysis for crop health monitoring.', icon: Video },
      { title: 'Climate Control for Greenhouses', desc: 'Automated regulation of temperature, humidity, and lighting.', icon: Thermometer },
      { title: 'Livestock Monitoring Systems', desc: 'Wearable sensors for tracking animal health and location.', icon: Search },
      { title: 'Automated Feeding Systems', desc: 'Precision feeding schedules and automated distribution.', icon: Settings },
      { title: 'Yield Prediction Models', desc: 'AI-driven forecasting of crop yields based on historical and real-time data.', icon: BarChart },
      { title: 'Pest & Disease Detection', desc: 'Automated identification of threats using computer vision.', icon: Shield },
      { title: 'Supply Chain Tracking', desc: 'Blockchain-based tracking of produce from farm to table.', icon: Truck },
      { title: 'Weather Data Integration', desc: 'Automated operational adjustments based on meteorological forecasts.', icon: Sun },
      { title: 'Farm Management Dashboard', desc: 'Centralized platform for monitoring all agricultural operations.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'Security Solutions',
    icon: Shield,
    steps: [
      { title: 'AI Video Surveillance', desc: 'Intelligent monitoring with object detection and behavior analysis.', icon: Video },
      { title: 'Biometric Access Control', desc: 'Automated entry systems using fingerprint, facial, or iris recognition.', icon: Key },
      { title: 'Intrusion Detection Systems', desc: 'Automated alerts and lockdown protocols upon unauthorized access.', icon: Lock },
      { title: 'Automated Perimeter Defense', desc: 'Smart fencing, motion sensors, and automated deterrents.', icon: Shield },
      { title: 'License Plate Recognition', desc: 'Automated vehicle tracking and access management.', icon: Search },
      { title: 'Threat Intelligence Feeds', desc: 'Automated integration of global security threat data.', icon: Database },
      { title: 'Automated Incident Response', desc: 'Pre-programmed actions triggered by specific security events.', icon: Send },
      { title: 'Visitor Management Systems', desc: 'Automated registration, screening, and tracking of guests.', icon: Users },
      { title: 'Fire & Life Safety Integration', desc: 'Automated emergency response coordination for fire or medical events.', icon: Flame },
      { title: 'Drone Surveillance Patrols', desc: 'Autonomous aerial monitoring of large facilities or perimeters.', icon: Cpu },
      { title: 'Cybersecurity Monitoring', desc: 'Automated network traffic analysis and threat mitigation.', icon: Activity },
      { title: 'Centralized Command Center', desc: 'Unified dashboard for monitoring all security subsystems.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'Smart Ecosystems',
    icon: Building,
    steps: [
      { title: 'Smart Street Lighting', desc: 'Automated illumination based on ambient light and pedestrian traffic.', icon: Lightbulb },
      { title: 'Intelligent Traffic Management', desc: 'Adaptive traffic signals and congestion routing algorithms.', icon: Activity },
      { title: 'Waste Management Automation', desc: 'Smart bins with fill-level sensors for optimized collection routes.', icon: Truck },
      { title: 'Public Wi-Fi Networks', desc: 'Automated management and load balancing of municipal internet access.', icon: Settings },
      { title: 'Environmental Monitoring', desc: 'Real-time tracking of air quality, noise levels, and pollution.', icon: Search },
      { title: 'Smart Parking Solutions', desc: 'Automated space availability tracking and dynamic pricing.', icon: Database },
      { title: 'Public Safety Integration', desc: 'Automated emergency response coordination across city services.', icon: Shield },
      { title: 'Energy Grid Optimization', desc: 'Smart distribution and load management for municipal power.', icon: Zap },
      { title: 'Water Distribution Management', desc: 'Automated leak detection and pressure optimization in city pipes.', icon: Droplet },
      { title: 'Citizen Engagement Portals', desc: 'Automated platforms for reporting issues and accessing services.', icon: Users },
      { title: 'Emergency Broadcast Systems', desc: 'Automated multi-channel alerts for severe weather or crises.', icon: Speaker },
      { title: 'City-wide Operations Dashboard', desc: 'Centralized view of all municipal systems and metrics.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'Content Automation',
    icon: FileText,
    steps: [
      { title: 'AI Copywriting Generation', desc: 'Automated drafting of articles, product descriptions, and ad copy.', icon: PenTool },
      { title: 'Automated Social Media Posting', desc: 'Scheduled distribution of content across multiple platforms.', icon: Send },
      { title: 'SEO Optimization Algorithms', desc: 'Automated keyword analysis and content structuring for search engines.', icon: Search },
      { title: 'Content Personalization', desc: 'Dynamic adjustment of content based on user behavior and preferences.', icon: Users },
      { title: 'Automated Video Editing', desc: 'AI-driven assembly of video clips, transitions, and captions.', icon: Video },
      { title: 'Image Generation & Tagging', desc: 'Automated creation and metadata tagging of visual assets.', icon: Tv },
      { title: 'Email Marketing Automation', desc: 'Trigger-based email sequences and personalized campaigns.', icon: Send },
      { title: 'Content Performance Analytics', desc: 'Automated tracking of engagement, conversion, and ROI metrics.', icon: BarChart },
      { title: 'Automated Translation Services', desc: 'Real-time localization of content for global audiences.', icon: Database },
      { title: 'Plagiarism & Fact Checking', desc: 'Automated verification of content originality and accuracy.', icon: CheckCircle2 },
      { title: 'Dynamic Content Assembly', desc: 'Automated generation of reports or documents from data sources.', icon: Settings },
      { title: 'Multi-channel Distribution', desc: 'Automated publishing to CMS, social media, and email platforms.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'Financial Automation',
    icon: DollarSign,
    steps: [
      { title: 'Algorithmic Trading Systems', desc: 'Automated execution of trades based on pre-defined mathematical models.', icon: Activity },
      { title: 'Automated Fraud Detection', desc: 'AI-driven analysis of transaction patterns to identify anomalies.', icon: Shield },
      { title: 'Robotic Process Accounting', desc: 'Automated ledger entries, reconciliation, and financial closing.', icon: Cpu },
      { title: 'Automated Loan Processing', desc: 'Instant credit scoring and automated approval workflows.', icon: CheckCircle2 },
      { title: 'Real-time Risk Assessment', desc: 'Continuous monitoring of portfolio risk and market exposure.', icon: BarChart },
      { title: 'Automated Tax Compliance', desc: 'Real-time tax calculation and automated regulatory reporting.', icon: FileText },
      { title: 'Invoice Processing & OCR', desc: 'Automated extraction and processing of invoice data using optical character recognition.', icon: Search },
      { title: 'Portfolio Rebalancing', desc: 'Automated adjustment of asset allocations to maintain target risk profiles.', icon: Settings },
      { title: 'Automated Customer Onboarding', desc: 'KYC/AML checks and account setup without manual intervention.', icon: Users },
      { title: 'Anti-Money Laundering (AML)', desc: 'Automated monitoring and reporting of suspicious financial activities.', icon: Lock },
      { title: 'Smart Contract Execution', desc: 'Automated execution of agreements using blockchain technology.', icon: Database },
      { title: 'Financial Reporting Dashboards', desc: 'Real-time visualization of financial health and KPIs.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'Healthcare Automation',
    icon: Activity,
    steps: [
      { title: 'Electronic Health Records (EHR)', desc: 'Automated data entry, retrieval, and sharing of patient records.', icon: FileText },
      { title: 'Automated Appointment Scheduling', desc: 'Self-service booking, reminders, and calendar management.', icon: Settings },
      { title: 'AI Diagnostic Assistance', desc: 'Automated analysis of medical imaging and lab results.', icon: Search },
      { title: 'Remote Patient Monitoring', desc: 'Automated tracking of vital signs via wearable devices.', icon: Activity },
      { title: 'Automated Billing & Claims', desc: 'Streamlined processing of medical coding and insurance claims.', icon: DollarSign },
      { title: 'Pharmacy Dispensing Robots', desc: 'Automated sorting, packaging, and dispensing of medications.', icon: Cpu },
      { title: 'Telemedicine Platforms', desc: 'Automated triage and virtual consultation routing.', icon: Video },
      { title: 'Medical Inventory Management', desc: 'Automated tracking and reordering of hospital supplies.', icon: Database },
      { title: 'Patient Triage Algorithms', desc: 'Automated prioritization of care based on symptom analysis.', icon: BarChart },
      { title: 'Wearable Data Integration', desc: 'Continuous ingestion and analysis of patient-generated health data.', icon: Activity },
      { title: 'Automated Follow-up Care', desc: 'Triggered communications for post-discharge monitoring.', icon: Phone },
      { title: 'Hospital Operations Dashboard', desc: 'Centralized view of bed availability, staffing, and patient flow.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'Logistics & Supply Chain Automation',
    icon: Truck,
    steps: [
      { title: 'Automated Inventory Tracking', desc: 'Real-time monitoring of stock levels using RFID and IoT sensors.', icon: Database },
      { title: 'Route Optimization Algorithms', desc: 'Dynamic calculation of the most efficient delivery paths.', icon: Activity },
      { title: 'Autonomous Delivery Vehicles', desc: 'Self-driving trucks and delivery drones for freight transport.', icon: Truck },
      { title: 'Warehouse Robotics', desc: 'Automated storage and retrieval systems (AS/RS) and picking robots.', icon: Cpu },
      { title: 'Predictive Demand Forecasting', desc: 'AI-driven prediction of future product demand based on historical data.', icon: BarChart },
      { title: 'Automated Freight Matching', desc: 'Algorithmic pairing of shipments with available carrier capacity.', icon: Settings },
      { title: 'Real-time Shipment Tracking', desc: 'Automated updates on location and status of goods in transit.', icon: Search },
      { title: 'Automated Customs Clearance', desc: 'Digital processing of international shipping documentation.', icon: FileText },
      { title: 'Cold Chain Monitoring', desc: 'Automated temperature tracking and alerts for perishable goods.', icon: Thermometer },
      { title: 'Reverse Logistics Automation', desc: 'Streamlined processing of returns and inventory restocking.', icon: Send },
      { title: 'Supplier Performance Analytics', desc: 'Automated evaluation of vendor reliability and quality metrics.', icon: BarChart },
      { title: 'Supply Chain Control Tower', desc: 'Centralized dashboard for end-to-end visibility and management.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'Energy & Utility Automation',
    icon: Zap,
    steps: [
      { title: 'Smart Grid Management', desc: 'Automated balancing of electricity supply and demand across the network.', icon: Activity },
      { title: 'Automated Meter Reading', desc: 'Remote collection of consumption data without manual intervention.', icon: Database },
      { title: 'Renewable Energy Integration', desc: 'Automated management of variable power sources like solar and wind.', icon: Sun },
      { title: 'Demand Response Systems', desc: 'Automated reduction of power consumption during peak load periods.', icon: Settings },
      { title: 'Outage Detection & Routing', desc: 'Automated identification of faults and rerouting of power.', icon: Zap },
      { title: 'Predictive Asset Maintenance', desc: 'AI-driven monitoring of transformers and infrastructure to prevent failures.', icon: Search },
      { title: 'Energy Storage Optimization', desc: 'Automated charging and discharging of grid-scale battery systems.', icon: Battery },
      { title: 'Pipeline Leak Detection', desc: 'Automated monitoring of pressure and flow to identify ruptures.', icon: Droplet },
      { title: 'Automated Billing Systems', desc: 'Streamlined generation and processing of utility invoices.', icon: DollarSign },
      { title: 'Load Balancing Algorithms', desc: 'Dynamic distribution of energy resources to maintain grid stability.', icon: BarChart },
      { title: 'Carbon Footprint Tracking', desc: 'Automated calculation and reporting of greenhouse gas emissions.', icon: Leaf },
      { title: 'Utility Operations Dashboard', desc: 'Centralized view of grid health, consumption, and infrastructure status.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'Education Automation (EdTech Infrastructure)',
    icon: GraduationCap,
    steps: [
      { title: 'Automated Grading Systems', desc: 'AI-driven assessment of multiple-choice and short-answer assignments.', icon: CheckCircle2 },
      { title: 'Personalized Learning Paths', desc: 'Algorithmic adaptation of curriculum based on student performance.', icon: Settings },
      { title: 'Student Attendance Tracking', desc: 'Automated logging of participation via biometric or digital check-ins.', icon: Users },
      { title: 'Virtual Classroom Management', desc: 'Automated recording, transcription, and resource distribution.', icon: Video },
      { title: 'Automated Enrollment Processing', desc: 'Streamlined handling of applications, prerequisites, and registration.', icon: FileText },
      { title: 'Plagiarism Detection', desc: 'Automated scanning of submissions against global databases.', icon: Search },
      { title: 'AI Tutoring Assistants', desc: 'Automated chatbots providing 24/7 academic support and explanations.', icon: Cpu },
      { title: 'Campus Security Integration', desc: 'Automated access control and emergency alert systems for educational facilities.', icon: Shield },
      { title: 'Library Resource Management', desc: 'Automated tracking, lending, and digital rights management of materials.', icon: Database },
      { title: 'Alumni Engagement Automation', desc: 'Trigger-based communication and fundraising campaigns.', icon: Send },
      { title: 'Predictive Dropout Analytics', desc: 'AI-driven identification of at-risk students for early intervention.', icon: BarChart },
      { title: 'Institutional Performance Dashboard', desc: 'Centralized view of academic outcomes, enrollment, and operational metrics.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'HR & Workforce Automation',
    icon: Users,
    steps: [
      { title: 'Automated Resume Screening', desc: 'AI-driven parsing and ranking of candidate applications.', icon: Search },
      { title: 'Employee Onboarding Workflows', desc: 'Automated provisioning of accounts, equipment, and training materials.', icon: Settings },
      { title: 'Time & Attendance Tracking', desc: 'Automated logging of hours worked, breaks, and overtime.', icon: Activity },
      { title: 'Automated Payroll Processing', desc: 'Streamlined calculation of wages, taxes, and deductions.', icon: DollarSign },
      { title: 'Performance Review Scheduling', desc: 'Automated coordination of appraisals and feedback collection.', icon: FileText },
      { title: 'Benefits Administration', desc: 'Automated enrollment and management of employee health and retirement plans.', icon: Database },
      { title: 'Employee Engagement Surveys', desc: 'Automated distribution and analysis of pulse surveys.', icon: BarChart },
      { title: 'Automated Offboarding', desc: 'Streamlined revocation of access and exit interview scheduling.', icon: Lock },
      { title: 'Training & Compliance Tracking', desc: 'Automated monitoring of mandatory certifications and coursework.', icon: CheckCircle2 },
      { title: 'AI Chatbots for HR Queries', desc: 'Automated responses to common questions regarding policies and benefits.', icon: Cpu },
      { title: 'Workforce Planning Analytics', desc: 'AI-driven forecasting of staffing needs and skill gaps.', icon: BarChart },
      { title: 'Centralized HR Dashboard', desc: 'Unified view of headcount, turnover, and workforce metrics.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'Retail & Commerce Automation',
    icon: ShoppingCart,
    steps: [
      { title: 'Automated Checkout Systems', desc: 'Cashierless stores and self-service kiosks using computer vision or RFID.', icon: ShoppingCart },
      { title: 'Dynamic Pricing Algorithms', desc: 'Automated adjustment of prices based on demand, competition, and inventory.', icon: DollarSign },
      { title: 'Inventory Replenishment', desc: 'Automated reordering of stock when levels fall below predefined thresholds.', icon: Database },
      { title: 'Personalized Recommendations', desc: 'AI-driven product suggestions based on browsing and purchase history.', icon: Users },
      { title: 'Automated Customer Service', desc: 'Chatbots and virtual assistants handling routine inquiries and returns.', icon: Phone },
      { title: 'Omnichannel Order Routing', desc: 'Automated fulfillment from the optimal warehouse or store location.', icon: Truck },
      { title: 'Visual Merchandising AI', desc: 'Automated analysis of store layouts and product placement effectiveness.', icon: Search },
      { title: 'Fraud Prevention Systems', desc: 'Automated detection of suspicious transactions and account activity.', icon: Shield },
      { title: 'Automated Return Processing', desc: 'Streamlined handling of RMAs, refunds, and inventory updates.', icon: Send },
      { title: 'Loyalty Program Management', desc: 'Automated tracking of points, rewards, and targeted promotions.', icon: Settings },
      { title: 'Store Traffic Analytics', desc: 'Automated monitoring of footfall and heatmaps using in-store sensors.', icon: Activity },
      { title: 'Retail Operations Dashboard', desc: 'Centralized view of sales, inventory, and store performance metrics.', icon: LayoutDashboard }
    ]
  },
  {
    name: 'ESG & Sustainability Automation',
    icon: Leaf,
    steps: [
      { title: 'Carbon Emission Tracking', desc: 'Automated calculation of Scope 1, 2, and 3 emissions across operations.', icon: Activity },
      { title: 'Automated Compliance Reporting', desc: 'Streamlined generation of sustainability reports for regulatory bodies.', icon: FileText },
      { title: 'Supply Chain Sustainability Audit', desc: 'Automated evaluation of vendor environmental and social practices.', icon: Search },
      { title: 'Waste Reduction Algorithms', desc: 'AI-driven optimization of material usage and scrap minimization.', icon: Cpu },
      { title: 'Energy Efficiency Monitoring', desc: 'Automated tracking and optimization of power consumption in facilities.', icon: Zap },
      { title: 'Renewable Resource Allocation', desc: 'Automated management of green energy procurement and usage.', icon: Sun },
      { title: 'Water Usage Optimization', desc: 'Automated monitoring and reduction of water consumption in processes.', icon: Droplet },
      { title: 'Sustainable Sourcing Analytics', desc: 'Automated tracking of raw material origins and environmental impact.', icon: Database },
      { title: 'Diversity & Inclusion Tracking', desc: 'Automated monitoring of workforce demographics and pay equity.', icon: Users },
      { title: 'Green Building Automation', desc: 'Automated control of HVAC and lighting to maximize energy efficiency.', icon: Building },
      { title: 'Circular Economy Modeling', desc: 'AI-driven analysis of product lifecycles for recycling and reuse.', icon: Settings },
      { title: 'ESG Performance Dashboard', desc: 'Centralized visualization of all environmental, social, and governance metrics.', icon: LayoutDashboard }
    ]
  }
];

const PipelineTemplate = ({ steps, themeColor }: { steps: any[], themeColor: string }) => {
  const topRow = steps.slice(0, 6);
  const bottomRow = steps.slice(6, 12).reverse(); // 12, 11, 10, 9, 8, 7

  // Colors chosen based on consumer psychology for distinct workflow stages
  const PSYCHOLOGY_COLORS = [
    '#3b82f6', // 1. Blue - Trust & Security (Initiation)
    '#8b5cf6', // 2. Purple - Innovation & Problem Solving
    '#10b981', // 3. Emerald - Growth & Harmony
    '#f59e0b', // 4. Amber - Energy & Confidence
    '#f43f5e', // 5. Rose - Action & Excitement
    '#06b6d4', // 6. Cyan - Clarity & Technology
    '#6366f1', // 7. Indigo - Logic & Structure
    '#ec4899', // 8. Pink - Creativity & Compassion
    '#eab308', // 9. Yellow - Attention & Optimism
    '#14b8a6', // 10. Teal - Communication & Balance
    '#84cc16', // 11. Lime - Freshness & Vitality
    '#a855f7', // 12. Violet - Vision & Luxury (Completion)
  ];

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="relative w-full max-w-6xl mx-auto py-8 hidden lg:block">
        {/* Top Row */}
        <div className="flex justify-between items-start relative z-10">
          {topRow.map((step, i) => {
            const stepColor = PSYCHOLOGY_COLORS[i];
            return (
            <div key={i} className="flex-1 flex flex-col items-center relative group">
              {/* Horizontal Line */}
              {i < 5 && (
                <div className="absolute top-8 left-1/2 w-full h-[2px] border-t-2 border-dashed z-0 opacity-30" style={{ borderColor: stepColor }} />
              )}
              {/* Vertical Line for the last item */}
              {i === 5 && (
                <div className="absolute top-8 left-1/2 w-[2px] h-[calc(100%+5rem)] border-l-2 border-dashed z-0 opacity-30" style={{ borderColor: stepColor }} />
              )}
              
              <div className="w-16 h-16 rounded-full bg-slate-950 border-2 flex items-center justify-center z-10 relative group-hover:scale-110 transition-transform shadow-lg" style={{ borderColor: stepColor, boxShadow: `0 0 20px ${stepColor}20` }}>
                <step.icon className="w-6 h-6" style={{ color: stepColor }} />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white">
                  {i + 1}
                </div>
              </div>
              <div className="mt-6 px-2 text-center">
                <h4 className="text-white font-bold text-xs mb-1.5">{step.title}</h4>
                <p className="text-slate-400 text-[10px] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          )})}
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between items-start relative z-10 mt-20">
          {bottomRow.map((step, i) => {
            const originalIndex = 11 - i;
            const stepColor = PSYCHOLOGY_COLORS[originalIndex];
            return (
            <div key={i} className="flex-1 flex flex-col items-center relative group">
              {/* Horizontal Line */}
              {i < 5 && (
                <div className="absolute top-8 left-1/2 w-full h-[2px] border-t-2 border-dashed z-0 opacity-30" style={{ borderColor: stepColor }} />
              )}
              
              <div className="w-16 h-16 rounded-full bg-slate-950 border-2 flex items-center justify-center z-10 relative group-hover:scale-110 transition-transform shadow-lg" style={{ borderColor: stepColor, boxShadow: `0 0 20px ${stepColor}20` }}>
                <step.icon className="w-6 h-6" style={{ color: stepColor }} />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white">
                  {12 - i}
                </div>
              </div>
              <div className="mt-6 px-2 text-center">
                <h4 className="text-white font-bold text-xs mb-1.5">{step.title}</h4>
                <p className="text-slate-400 text-[10px] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          )})}
        </div>
      </div>

      {/* Mobile/Tablet View */}
      <div className="lg:hidden flex flex-col gap-8 relative px-4">
        <div className="absolute left-[3.25rem] top-8 bottom-8 w-[2px] border-l-2 border-dashed opacity-30" style={{ borderColor: themeColor }} />
        {steps.map((step, i) => {
          const stepColor = PSYCHOLOGY_COLORS[i];
          return (
          <div key={i} className="flex items-start gap-6 relative z-10">
            <div className="w-14 h-14 shrink-0 rounded-full bg-slate-950 border-2 flex items-center justify-center relative shadow-lg" style={{ borderColor: stepColor, boxShadow: `0 0 15px ${stepColor}20` }}>
              <step.icon className="w-5 h-5" style={{ color: stepColor }} />
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white">
                {i + 1}
              </div>
            </div>
            <div className="pt-1.5">
              <h4 className="text-white font-bold text-sm mb-1">{step.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export function IndustryWorkflows({ themeColor }: { themeColor: string }) {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (name: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">Domain Workflows</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Explore the 12-step autonomous pipelines powering each sector of our industrial operating system.
          </p>
        </div>

        <div className="space-y-12 md:space-y-24">
          {industryData.map((industry, i) => {
            const Icon = industry.icon;
            const isExpanded = expandedCards[industry.name] || false;
            
            return (
              <div key={industry.name} className="relative bg-slate-900/30 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-sm transition-all duration-300">
                {/* Industry Header (Clickable) */}
                <button 
                  onClick={() => toggleCard(industry.name)}
                  className="w-full flex flex-col md:flex-row items-center md:items-start justify-between text-center md:text-left p-6 md:p-12 cursor-pointer hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shrink-0"
                      style={{ backgroundColor: themeColor, boxShadow: `0 0 30px ${themeColor}40` }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-2 md:mb-3">{industry.name}</h3>
                      <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <span className="w-8 h-px bg-slate-700" />
                        12-Stage Automated Pipeline
                        <span className="w-8 h-px bg-slate-700" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-0 flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors shrink-0">
                    {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </button>

                {/* Workflow Visualization (Expandable) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 md:px-12 md:pb-12 border-t border-slate-800/50 pt-8">
                        <PipelineTemplate steps={industry.steps} themeColor={themeColor} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Connecting line to next section (except last) */}
                {i < industryData.length - 1 && isExpanded && (
                  <div className="absolute left-1/2 top-[100%] bottom-[-8rem] w-px bg-gradient-to-b from-slate-800 to-transparent hidden md:block -translate-x-1/2" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
