import React, { useEffect, useRef, useState } from 'react';
import { Home, Terminal, Factory, Sprout, ShieldAlert, Network, Megaphone, Landmark, HeartPulse, Truck, Zap, BookOpen, Users, ShoppingCart, Leaf, ChevronLeft, ChevronRight, Mail, Cloud, Lock, Smartphone, Activity, Cpu, Layers, BarChart, Settings, Globe, Database, Server, Code, Maximize, Shield, Wifi, Camera, Video, Mic, Thermometer, Droplet, Sun, Wind, Compass, Map, Navigation, Crosshair, Target, Eye, Fingerprint, Key, Link, Share2, RefreshCw, Battery, Bluetooth, Monitor, Tv, Watch, Tablet, Laptop, Printer, Headphones, Gamepad, FileText, Folder, Archive, Box, Package, CreditCard, DollarSign, Wallet, Briefcase, Tag, Ticket, Calculator, Calendar, Clock, Bell, Flag, Bookmark, Star, Heart, Users as UsersIcon, CheckCircle, MessageSquare, Edit3, AlertTriangle, Search, Droplets, Image as ImageIcon, Music, ShieldCheck, ZapOff, ActivitySquare, Plus, X, ArrowRight } from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { motion, AnimatePresence } from 'motion/react';

const domains = [
  { 
    name: 'HOME AUTOMATION', 
    icon: Home, 
    color: '#F59E0B',
    animationClass: 'group-hover:animate-float',
    description: 'Smart living solutions for enhanced comfort, security, and energy efficiency in residential spaces.',
    subServices: [
      { title: 'Climate Control', desc: 'Intelligent climate systems that adapt to your routine and save energy.', icon: Thermometer, image: "https://i.pinimg.com/1200x/4e/d4/e2/4ed4e2a37ce4a5d5e26844b7bc2880fe.jpg" },
      { title: 'Smart Lighting', desc: 'Automated lighting that adjusts to natural light levels and presence.', icon: Sun, image: "https://i.pinimg.com/1200x/9f/9b/09/9f9b090ce6a35a3b39be617828db3623.jpg" },
      { title: 'Security', desc: 'Advanced security integration with real-time alerts and remote monitoring.', icon: ShieldAlert, image: "https://i.pinimg.com/1200x/54/c0/1b/54c01bc5ab153167dd9c341c0ec6797c.jpg" },
      { title: 'Voice Control', desc: 'Voice-activated controls for seamless interaction with your environment.', icon: Mic, image: "https://i.pinimg.com/1200x/21/c1/7b/21c17baa791f1d5fd81ab7dfa118fb98.jpg" },
      { title: 'Entertainment', desc: 'Automated entertainment systems for immersive audio and video.', icon: Tv, image: "https://i.pinimg.com/736x/36/d1/10/36d1106616f0dc28268ba46aa58653c1.jpg" },
      { title: 'Appliances', desc: 'Smart appliance management to optimize energy usage and convenience.', icon: Cpu, image: "https://i.pinimg.com/1200x/c3/b4/60/c3b46093e3bb832d6860f72107f1e97e.jpg" },
      { title: 'Windows', desc: 'Automated window treatments that respond to sunlight and temperature.', icon: Layers, image: "https://i.pinimg.com/736x/8c/f5/76/8cf5763a4f0fa25aba58bf561d81d7fe.jpg" },
      { title: 'Energy', desc: 'Comprehensive energy monitoring to track and reduce carbon footprint.', icon: Zap, image: "https://i.pinimg.com/1200x/b2/1e/e4/b21ee4040e8284701de62eae24fd42c5.jpg" },
      { title: 'Access', desc: 'Smart locks and garage doors for secure and keyless entry.', icon: Key, image: "https://i.pinimg.com/736x/2f/ef/45/2fef45ebd97febbf3bdc96a939993580.jpg" },
      { title: 'Water Management', desc: 'Automated leak detection and smart irrigation for home gardens.', icon: Droplets, image: "https://i.pinimg.com/736x/20/f0/1b/20f01b2cc8ffea4732382f7cc4eb5a5e.jpg" },
      { title: 'Pet Care', desc: 'Automated feeding and monitoring systems for household pets.', icon: Heart, image: "https://i.pinimg.com/1200x/c2/e9/ae/c2e9ae4bc9b169bd6986536177e7d1e6.jpg" },
      { title: 'Air Quality', desc: 'Smart purifiers that automatically adjust based on indoor air quality.', icon: Wind, image: "https://i.pinimg.com/1200x/8c/4d/76/8c4d76155d7b8132b2d93837b23df372.jpg" }
    ]
  },
  { 
    name: 'AGRICULTURE AUTOMATION', 
    icon: Sprout, 
    color: '#10B981',
    animationClass: 'group-hover:animate-grow',
    description: 'Precision farming technologies for maximizing yield while minimizing resource consumption.',
    subServices: [
      { title: 'Irrigation', desc: 'Automated irrigation systems that optimize water usage based on soil moisture.', icon: Droplet, image: "https://i.pinimg.com/1200x/62/a2/d0/62a2d00b8d14ff2e431c1bc93f29d79e.jpg" },
      { title: 'Crop Monitoring', desc: 'Drone-based crop monitoring for early disease detection and yield estimation.', icon: Camera, image: "https://i.pinimg.com/736x/49/b0/de/49b0de653a13993996498bc8d8406c3a.jpg" },
      { title: 'Harvesting', desc: 'Automated harvesting machinery to reduce labor costs and increase efficiency.', icon: Settings, image: "https://i.pinimg.com/474x/d6/57/57/d6575780c59c3e5b7a7b4b07de4f54ee.jpg" },
      { title: 'Greenhouse', desc: 'Smart greenhouse climate control for optimal growing conditions year-round.', icon: Sun, image: "https://i.pinimg.com/1200x/f9/bc/d0/f9bcd08eaf74eec40253f5cdf4909c8b.jpg" },
      { title: 'Livestock', desc: 'Livestock monitoring sensors for tracking health, location, and behavior.', icon: Activity, image: "https://i.pinimg.com/736x/32/e5/f7/32e5f736d9acd5718bbfc3ff6fe2b3db.jpg" },
      { title: 'Feeding', desc: 'Automated feeding systems that deliver precise nutrition to animals.', icon: Database, image: "https://i.pinimg.com/736x/c8/35/4b/c8354b20be0ac6e5cae8a0bb0dfd5f13.jpg" },
      { title: 'Analytics', desc: 'Predictive analytics for weather forecasting and crop planning.', icon: BarChart, image: "https://i.pinimg.com/736x/c8/35/4b/c8354b20be0ac6e5cae8a0bb0dfd5f13.jpg" },
      { title: 'Supply Chain', desc: 'Supply chain automation to ensure freshness and traceability.', icon: Truck, image: "https://i.pinimg.com/736x/a5/49/08/a549082e414567246bdc003958dd4c60.jpg" },
      { title: 'Soil Sensors', desc: 'Real-time soil nutrient and pH monitoring for targeted fertilization.', icon: Layers, image: "https://i.pinimg.com/736x/43/29/04/4329047415190125a2b59a0d51c8764a.jpg" },
      { title: 'Pest Control', desc: 'Automated pest detection and targeted, eco-friendly mitigation.', icon: Crosshair, image: "https://i.pinimg.com/1200x/e1/49/46/e14946ec08b9f5d4adf0425cf353df70.jpg" },
      { title: 'Weather Stations', desc: 'Micro-climate monitoring for hyper-local agricultural decisions.', icon: Cloud, image: "https://i.pinimg.com/1200x/68/68/6f/68686f60195caea56eb661f08feb4426.jpg" },
      { title: 'Complete Stack', desc: 'Complete automated farm with cutting edge and most advance technology specifications for high out put and profit.', icon: Cpu, image: "https://i.pinimg.com/1200x/1e/3e/33/1e3e33322e97d5b0baf5046f38e72b9c.jpg" }
    ]
  },
  { 
    name: 'SECURITY SOLUTIONS', 
    icon: ShieldAlert, 
    color: '#EF4444',
    animationClass: 'group-hover:animate-heartbeat',
    description: 'Advanced surveillance, access control, and threat detection systems for comprehensive protection.',
    subServices: [
      { title: 'Video Analytics', desc: 'AI-powered video analytics for real-time anomaly detection.', icon: Video, image: "https://i.pinimg.com/736x/f5/11/d0/f511d095b59f13c02a08c1df532fa0c2.jpg" },
      { title: 'Access Control', desc: 'Automated access control systems with biometric authentication.', icon: Fingerprint, image: "https://i.pinimg.com/736x/db/56/06/db5606a3b5aa0cccceb806946da62b08.jpg" },
      { title: 'Intrusion Detection', desc: 'Intrusion detection sensors integrated with automated response.', icon: Target, image: "https://i.pinimg.com/736x/44/52/07/44520784154d488ad0fe552deca258f4.jpg" },
      { title: 'Cybersecurity', desc: 'Cybersecurity automation to detect and mitigate digital threats.', icon: Lock, image: "https://i.pinimg.com/736x/64/9d/77/649d7718a1e1bc302a455d7a7a5f7094.jpg" },
      { title: 'Perimeter Defense', desc: 'Automated perimeter defense systems with patrols functionality.', icon: Crosshair, image: "https://i.pinimg.com/736x/d2/bf/d7/d2bfd7ff247c9a2976b69dd50b2ce69f.jpg" },
      { title: 'Emergency Response', desc: 'Integrated emergency response systems that automatically notify authorities.', icon: Bell, image: "https://i.pinimg.com/736x/53/fd/ac/53fdac190acfd1231ad4b1d9f4538e3b.jpg" },
      { title: 'Visitor Management', desc: 'Automated visitor management for secure and efficient entry.', icon: Users, image: "https://i.pinimg.com/736x/d4/13/93/d4139325d61bef7ebed631a42b3d68b8.jpg" },
      { title: 'Vulnerability Scanning', desc: 'Continuous vulnerability scanning and automated patch management.', icon: Search, image: "https://i.pinimg.com/736x/13/60/ac/1360aca94e2ca55d44e65902869713aa.jpg" },
      { title: 'Asset Tracking', desc: 'Real-time tracking of high-value physical and digital assets.', icon: Map, image: "https://i.pinimg.com/736x/9b/7d/1b/9b7d1bcfd07d447be2490d03098fdaca.jpg" },
      { title: 'Fire Detection', desc: 'Advanced thermal imaging and automated fire suppression systems.', icon: ZapOff, image: "https://i.pinimg.com/1200x/7b/d9/bb/7bd9bbf74e0da6d3ee180dbbaac5c6ab.jpg" },
      { title: 'Surveillance', desc: 'Automated aerial patrols for large-scale facility monitoring.', icon: Navigation, image: "https://i.pinimg.com/1200x/54/c0/1b/54c01bc5ab153167dd9c341c0ec6797c.jpg" },
      { title: 'Identity Verification', desc: 'Multi-factor automated identity verification at secure checkpoints.', icon: ShieldCheck, image: "https://i.pinimg.com/1200x/4a/09/71/4a0971b47f1234f321a517748677ea57.jpg" }
    ]
  }, 
  { 
    name: 'SMART ECOSYSTEMS', 
    icon: Network, 
    color: '#3B82F6',
    animationClass: 'group-hover:animate-pulse-glow',
    description: 'Interconnected networks of devices and platforms working seamlessly to create intelligent environments.',
    subServices: [
      { title: 'IoT Integration', desc: 'IoT platform integration for centralized management of diverse devices.', icon: Globe, image: "https://i.pinimg.com/1200x/2d/37/8d/2d378d734d386ba71fce2bf49ab0c120.jpg" },
      { title: 'Data Sync', desc: 'Automated data sharing and synchronization across disparate systems.', icon: RefreshCw, image: "https://i.pinimg.com/1200x/6d/58/c2/6d58c299d00e625e6e60266eb0151ac0.jpg" },
      { title: 'Smart City', desc: 'Smart city infrastructure management for traffic, waste, and energy.', icon: Map, image: "https://i.pinimg.com/1200x/75/3b/31/753b3114b5457e3996e9d51a3f8dcdbf.jpg" },
      { title: 'Building Management', desc: 'Automated building management systems for commercial real estate.', icon: Home, image: "https://i.pinimg.com/736x/8a/18/da/8a18dabb2e40d05c110df8923ff2929e.jpg" },
      { title: 'Workflow Automation', desc: 'Cross-platform workflow automation to connect software and hardware.', icon: Link, image: "https://i.pinimg.com/736x/02/68/bc/0268bc68ae5cd718cec3db58e7b3365c.jpg" },
      { title: 'Edge Computing', desc: 'Edge computing solutions for low-latency automated decision making.', icon: Server, image: "https://i.postimg.cc/15vxJFXG/What-is-Edge-Computing.png" },
      { title: 'Digital Twin', desc: 'Digital twin technology for simulating and optimizing physical environments.', icon: Layers, image: "https://i.pinimg.com/1200x/ab/47/0f/ab470fac150432b53e18c6fedf69b96a.jpg" },
      { title: 'Predictive Maintenance', desc: 'Automated predictive maintenance for complex interconnected systems.', icon: Settings, image: "https://i.pinimg.com/1200x/89/78/9b/89789b48743bf17f3f6872a7751c34bb.jpg" },
      { title: 'API Gateway', desc: 'Unified API gateways for seamless third-party integrations.', icon: Code, image: "https://i.pinimg.com/1200x/8d/ae/2a/8dae2ae4343fcf3df44a38095781ace7.jpg" },
      { title: 'Smart Grid', desc: 'Automated energy distribution and load balancing for municipalities.', icon: Zap, image: "https://i.pinimg.com/1200x/34/5c/57/345c57be6ae2c6f7aeba4d2573d8a2d6.jpg" },
      { title: 'Waste Management', desc: 'Smart bins and automated collection routing for urban areas.', icon: Archive, image: "https://i.pinimg.com/1200x/f2/01/52/f20152e1beb6d76995d9aba97821939c.jpg" },
      { title: 'Fleet Tracking', desc: 'Real-time automated tracking and optimization of project/s fleets.', icon: Truck, image: "https://i.pinimg.com/736x/35/65/d0/3565d0b9556f47c64ce45c05401944a6.jpg" }
    ]
  },
  { 
    name: 'SOFTWARE AUTOMATION', 
    icon: Terminal, 
    color: '#8B5CF6',
    animationClass: 'group-hover:animate-bounce-subtle',
    description: 'Streamline workflows and eliminate repetitive tasks with intelligent software robots and scripts.',
    subServices: [
      { title: 'RPA', desc: 'Robotic Process Automation for high-volume, rule-based tasks.', icon: Cpu, image: "https://i.pinimg.com/1200x/0e/19/0c/0e190cc1526f074a73100a44f2facecd.jpg" },
      { title: 'Data Entry', desc: 'Automated data entry and extraction using intelligent document processing.', icon: FileText, image: "https://i.pinimg.com/736x/db/07/82/db07826f6e157ace8f5d0533afa414a6.jpg" },
      { title: 'Custom Scripts', desc: 'Custom scripting for integrating legacy systems with modern APIs.', icon: Code, image: "https://i.pinimg.com/1200x/d8/6e/ba/d86ebaa2647373f64593f676993e1341.jpg" },
      { title: 'Automated Testing', desc: 'Automated software testing to accelerate development cycles.', icon: CheckCircle, image: "https://i.pinimg.com/1200x/e3/66/70/e3667031404bf95b3b15c77ac6454045.jpg" },
      { title: 'CI/CD Pipelines', desc: 'CI/CD pipeline automation for seamless software deployment.', icon: RefreshCw, image: "https://i.pinimg.com/1200x/36/72/01/367201356bea0015695ff6547dae786a.jpg" },
      { title: 'Report Generation', desc: 'Automated report generation and distribution across the organization.', icon: BarChart, image: "https://i.pinimg.com/1200x/56/52/0e/56520e7cc6ac5937d9c37851c6c04190.jpg" },
      { title: 'Chatbots', desc: 'Chatbots and virtual assistants for automated customer support.', icon: MessageSquare, image: "https://i.pinimg.com/736x/86/be/d5/86bed5805527b56efa1be6ec5a827033.jpg" },
      { title: 'IT Provisioning', desc: 'Automated IT infrastructure provisioning and scaling.', icon: Server, image: "https://i.pinimg.com/1200x/4e/fc/5d/4efc5d2435c76f131c1a28a543cefe56.jpg" },
      { title: 'Data Backup', desc: 'Automated database backups and disaster recovery protocols.', icon: Database, image: "https://i.pinimg.com/1200x/7a/9a/48/7a9a483dc487a091cd36724394fac42d.jpg" },
      { title: 'Code Generation', desc: 'AI-assisted code generation and automated refactoring tools.', icon: Terminal, image: "https://i.pinimg.com/1200x/4d/c4/ac/4dc4ac2a9f1dc43ce3884d7970150003.jpg" },
      { title: 'Log Analysis', desc: 'Automated log parsing and anomaly detection in system operations.', icon: ActivitySquare, image: "https://i.pinimg.com/1200x/6d/61/ac/6d61ac08c81cee0123b67d5f2ea4ce40.jpg" },
      { title: 'System Monitoring', desc: '24/7 automated monitoring of application health and performance.', icon: Activity, image: "https://i.pinimg.com/1200x/f9/c5/e7/f9c5e75822b1983fbf2d89be5bb19546.jpg" }
    ]
  },
  { 
    name: 'CONTENT AUTOMATION', 
    icon: Megaphone, 
    color: '#EC4899',
    animationClass: 'group-hover:animate-swing',
    description: 'AI-driven tools for generating, managing, and distributing digital content at scale.',
    subServices: [
      { title: 'Content Generation', desc: 'Automated content generation using advanced natural language processing.', icon: Edit3, image: "https://i.pinimg.com/1200x/d7/3f/dc/d73fdc04d0d1708817026a15591df73c.jpg" },
      { title: 'Social Scheduling', desc: 'Social media scheduling and automated cross-platform publishing.', icon: Calendar, image: "https://i.pinimg.com/1200x/45/25/dc/4525dcd1b8d2e0aa307e952c8ac8fe1d.jpg" },
      { title: 'Video Editing', desc: 'Automated video editing and rendering for scalable media production.', icon: Video, image: "https://i.pinimg.com/1200x/e6/4a/8f/e64a8f2df60f162a4aa5fdb4cd979bc1.jpg" },
      { title: 'Personalization', desc: 'Dynamic content personalization based on user behavior and preferences.', icon: Users, image: "https://i.pinimg.com/1200x/23/0a/e4/230ae44f01d71dc4fb33c876601d81fc.jpg" },
      { title: 'SEO Optimization', desc: 'Automated SEO optimization and keyword integration.', icon: Search, image: "https://i.pinimg.com/1200x/41/03/3e/41033e5263a091774fcf4f3b43a791dd.jpg" },
      { title: 'Email Marketing', desc: 'Email marketing automation with triggered campaigns and drip sequences.', icon: Mail, image: "https://i.pinimg.com/736x/2a/d3/e0/2ad3e0b2b0c42f074feadae9ab6958cf.jpg" },
      { title: 'Translation', desc: 'Automated translation and localization for global content reach.', icon: Globe, image: "https://i.pinimg.com/1200x/de/7a/57/de7a57ff6a294fef3288f030c43be2f0.jpg" },
      { title: 'Analytics Reporting', desc: 'Content performance tracking and automated analytics reporting.', icon: BarChart, image: "https://i.pinimg.com/1200x/cb/f0/3e/cbf03efc03e6325f7ba210148f1c4efd.jpg" },
      { title: 'Asset Management', desc: 'Automated digital asset tagging and organization.', icon: Folder, image: "https://i.pinimg.com/736x/7e/3a/7a/7e3a7a5c931ad27a70af5f7773993909.jpg" },
      { title: 'Image Generation', desc: 'AI-powered image generation and automated graphic design workflows.', icon: ImageIcon, image: "https://i.pinimg.com/1200x/2a/95/55/2a9555bcfa6ac3d7a7d4f90b2af0525e.jpg" },
      { title: 'End to End Service', desc: 'Automated workflow synthesised as per user needs and platform oriented workflows for multimedia content.', icon: Music, image: "https://i.pinimg.com/736x/15/5c/2a/155c2a08119a2d20f475c27c31062dd7.jpg" },
      { title: 'Content Moderation', desc: 'Automated filtering and moderation of user-generated content.', icon: Shield, image: "https://i.pinimg.com/736x/f8/26/74/f826748c5593092691e514f002897272.jpg" }
    ]
  },
  { 
    name: 'EDUCATION AUTOMATION', 
    icon: BookOpen, 
    color: '#06B6D4',
    animationClass: 'group-hover:animate-float',
    description: 'EdTech infrastructure for personalized learning experiences and automated administrative tasks.',
    subServices: [
      { title: 'Automated Grading', desc: 'Automated grading systems for multiple-choice and short-answer assessments.', icon: CheckCircle, image: "https://i.pinimg.com/1200x/14/52/b7/1452b7306f916f7de937d6cd850ffc07.jpg" },
      { title: 'Learning Pathways', desc: 'Personalized learning pathways adapted automatically to student performance.', icon: Map, image: "https://i.pinimg.com/1200x/cd/1f/9c/cd1f9ca21038ba4de630e99f84acb72c.jpg" },
      { title: 'Attendance Tracking', desc: 'Automated attendance tracking and student behavior monitoring.', icon: UsersIcon, image: "https://i.pinimg.com/1200x/11/00/e0/1100e02f7f72805fa7e3ee4144aa6d7e.jpg" },
      { title: 'Smart Scheduling', desc: 'Smart scheduling algorithms for classes, exams, and resources.', icon: Calendar, image: "https://i.pinimg.com/736x/8a/d3/af/8ad3af70c227dded6ce85be0297fdcd6.jpg" },
      { title: 'Communication', desc: 'Automated communication systems for parents, students, and staff.', icon: MessageSquare, image: "https://i.pinimg.com/736x/17/a8/00/17a800273285d2f4dd48d98f56589f6c.jpg" },
      { title: 'AI Tutors', desc: 'AI tutors providing automated, 24/7 learning support.', icon: Cpu, image: "https://i.pinimg.com/736x/ec/59/4d/ec594d5b9cd8e8cbc939a8744370d661.jpg" },
      { title: 'Curriculum Gen', desc: 'Automated curriculum generation and content curation.', icon: FileText, image: "https://i.pinimg.com/1200x/8c/26/b9/8c26b9ccd1c152b27895ba4e42fcbc85.jpg" },
      { title: 'Early Intervention', desc: 'Data-driven insights for automated early intervention strategies.', icon: AlertTriangle, image: "https://i.pinimg.com/1200x/b5/05/10/b505102d6642bfec4e93be7eaa0c9b99.jpg" },
      { title: 'Resource Allocation', desc: 'Automated library and lab resource management.', icon: Database, image: "https://i.pinimg.com/736x/02/f9/ec/02f9ec3811b50d1e09b061853e0b3718.jpg" },
      { title: 'Plagiarism Detection', desc: 'Automated scanning of submissions for academic integrity.', icon: Search, image: "https://i.pinimg.com/1200x/1e/a6/c1/1ea6c1726c8cbc45442158b5b16827d9.jpg" },
      { title: 'Virtual Labs', desc: 'Automated setup and grading of virtual laboratory experiments.', icon: Monitor, image: "https://i.pinimg.com/736x/4f/df/7d/4fdf7da27b98ee5b0c9073189e504083.jpg" },
      { title: 'Alumni Engagement', desc: 'Automated outreach and networking platforms for alumni.', icon: Users, image: "https://i.pinimg.com/736x/6e/01/c9/6e01c940e9e6a4a28456207c7772cc12.jpg" }
    ]
  },
  { 
    name: 'DIGITAL AUTOMATION', 
    icon: Code, 
    color: '#6366F1',
    animationClass: 'group-hover:animate-swing',
    description: 'Digital Process Automation (DPA) uses software, rules engines, APIs, RPA bots, AI/ML, and analytics to design, execute, monitor, and continuously optimize end-to-end business processes.',
    subServices: [
      { title: 'Cashierless Checkout', desc: 'Cashierless store technology using computer vision and sensor fusion.', icon: Camera, image: "https://i.pinimg.com/1200x/80/6a/e9/806ae9c0dd752a9a2abe0b7fcc004a78.jpg" },
      { title: 'Inventory Tracking', desc: 'Automated inventory management with real-time tracking and reordering.', icon: Box, image: "https://i.pinimg.com/1200x/44/f2/d8/44f2d8ccfe34ad23bb07b299bdba4228.jpg" },
      { title: 'Dynamic Pricing', desc: 'Dynamic pricing algorithms that adjust automatically to market conditions.', icon: DollarSign, image: "https://i.pinimg.com/736x/db/94/f7/db94f7f4d3c81b46484f8f67e0d0a258.jpg" },
      { title: 'Warehouse Robotics', desc: 'Automated warehouse robotics for efficient picking and packing.', icon: Truck, image: "https://i.pinimg.com/736x/82/8e/27/828e27d12514798e086a17bcd305e60f.jpg" },
      { title: 'Recommendations', desc: 'Personalized product recommendations driven by machine learning.', icon: Star, image: "https://i.pinimg.com/1200x/2d/b8/32/2db8328945952c61667be6a597977d79.jpg" },
      { title: 'Customer Service', desc: 'Automated customer service handling returns and inquiries.', icon: MessageSquare, image: "https://i.pinimg.com/736x/27/ec/93/27ec930c79b9fe811b2b2d828a57fef8.jpg" },
      { title: 'Smart Shelving', desc: 'Smart shelving that automatically detects low stock and misplacements.', icon: Layers, image: "https://i.pinimg.com/736x/52/13/3b/52133bfc2daa31b62474780ca77646b1.jpg" },
      { title: 'Supply Forecasting', desc: 'Automated supply chain forecasting to prevent stockouts.', icon: BarChart, image: "https://i.pinimg.com/736x/8a/0d/b7/8a0db7c09a4cd092d2fb0c6b21e96440.jpg" },
      { title: 'Loyalty Programs', desc: 'Automated reward distribution based on purchase history.', icon: Heart, image: "https://i.pinimg.com/736x/6d/66/eb/6d66eb77f94917b5e94c9b2e543d5a3c.jpg" },
      { title: 'Fraud Detection', desc: 'Real-time automated fraud detection for online transactions.', icon: ShieldAlert, image: "https://i.pinimg.com/736x/cd/fa/f4/cdfaf4bd142018a4652e44d026c48c38.jpg" },
      { title: 'Visual Search', desc: 'Automated product matching based on customer-uploaded images.', icon: Eye, image: "https://i.pinimg.com/1200x/3c/70/f2/3c70f261dec897183f063c6190bd881a.jpg" },
      { title: 'Automated Returns', desc: 'Streamlined, automated processing of customer returns and refunds.', icon: RefreshCw, image: "https://i.pinimg.com/736x/05/5a/ff/055aff35749197da906f2074b64a55e0.jpg" }
    ]
  },
];

const PowerPointSlide = ({ service, index, color, total, domainName }: { service: any, index: number, color: string, total: number, domainName?: string, key?: any }) => {
  if (!service) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 text-gray-500 italic">
        Service details coming soon...
      </div>
    );
  }

  // Create a highly specific prompt for the AI image generator to ensure relevance
  const imagePrompt = encodeURIComponent(`Professional corporate technology, ${service.title}, ${domainName || 'business'} automation, modern sleek UI, high quality`);
  
  // Use the provided image or fallback to the generated one
  const imageUrl = service.image || `https://image.pollinations.ai/prompt/${imagePrompt}?width=800&height=400&nologo=true`;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full h-full flex flex-col p-6 relative"
    >
      <h4 className="text-lg font-bold text-white mb-2 leading-tight">{service.title}</h4>
      <p className="text-xs text-gray-400 leading-relaxed mb-6">
        {service.desc}
      </p>

      {/* Image Area */}
      <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10 mt-auto group bg-black/50">
        <img 
          src={imageUrl} 
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-0 left-0 w-full p-3 flex items-center justify-between z-10">
          <div className="text-[10px] font-mono text-white/80 uppercase tracking-wider flex items-center gap-2">
            <div className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ backgroundColor: color }} />
            Visual Reference
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GeometricArt = ({ index, color }: { index: number, color: string }) => {
  switch (index % 6) {
    case 0: // Red style
      return (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/20 origin-bottom-left -skew-y-12"></div>
          <div className="absolute top-1/3 left-1/4 w-1/2 h-8 bg-white/90 shadow-lg transform rotate-12"></div>
          <div className="absolute top-1/3 left-1/4 w-8 h-16 bg-white/70 shadow-lg transform rotate-12 translate-y-8"></div>
        </div>
      );
    case 1: // Green style
      return (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-12 bg-white/90 shadow-[10px_10px_0_rgba(0,0,0,0.2)]"></div>
          <div className="absolute top-1/2 right-1/4 w-1/3 h-12 bg-white/80 shadow-[10px_10px_0_rgba(0,0,0,0.2)]"></div>
          <div className="absolute bottom-0 right-1/3 w-16 h-32 bg-black/10 skew-x-12"></div>
        </div>
      );
    case 2: // Cyan/Stairs style
      return (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end items-start opacity-80">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-orange-300/80 shadow-[-5px_5px_0_rgba(0,0,0,0.1)]" style={{ width: `${(i+1)*20}%`, height: '15%' }}></div>
            ))}
          </div>
          <div className="absolute top-1/4 right-1/4 w-12 h-12 rounded-full bg-blue-500/80 shadow-lg"></div>
        </div>
      );
    case 3: // Window style
      return (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
          <div className="w-1/2 h-1/2 border-8 border-white/90 shadow-[15px_15px_0_rgba(0,0,0,0.15)] relative">
            <div className="absolute bottom-0 right-0 w-full h-full bg-black/10 origin-bottom-right skew-x-12 translate-x-full"></div>
          </div>
        </div>
      );
    case 4: // Purple/Mountains style
      return (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-full h-full bg-pink-300/40 origin-bottom-right -skew-x-12 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-white/20 origin-bottom-left skew-x-12 -translate-x-1/4"></div>
          <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-yellow-300/80"></div>
        </div>
      );
    case 5: // Abstract blocks
    default:
      return (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-white/80 rotate-45 shadow-[10px_10px_0_rgba(0,0,0,0.1)]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-black/20 rotate-12"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/50 rounded-full shadow-lg"></div>
        </div>
      );
  }
};

const DomainCard: React.FC<{ domain: any, index: number }> = ({ domain, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openContactModal } = useUI();

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlide < 11) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleFlipBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    // Reset slide after animation completes
    setTimeout(() => setCurrentSlide(0), 500);
  };

  return (
    <div 
      className="relative w-full h-[380px] md:h-[420px] group cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 hover:z-20"
      style={{ perspective: '1200px' }}
      onClick={(e) => {
        if (!isFlipped) {
          e.preventDefault();
          setIsFlipped(true);
        }
      }}
    >
      <div 
        className="w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] relative z-10"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front Side */}
        <div 
          className={`
            absolute inset-0 w-full h-full
            bg-[#0B0F19] rounded-2xl border border-white/5
            overflow-hidden flex flex-col p-6
            transition-all duration-300 hover:border-white/10
            ${isFlipped ? 'pointer-events-none' : ''}
          `}
          style={{ 
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Soft Glow */}
          <div 
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[80px] opacity-30 pointer-events-none"
            style={{ backgroundColor: domain.color }}
          />
          
          {/* Top Header */}
          <div className="flex items-center gap-3 relative z-10 mb-auto">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <domain.icon className="w-5 h-5" style={{ color: domain.color }} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm leading-none">Domain</span>
              <span className="text-gray-500 text-[10px] mt-1 uppercase tracking-wider">Automation Solutions</span>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 mt-auto">
            <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
              {domain.name}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
              {domain.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span 
                className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors duration-300" 
                style={{ color: 'white' }}
                onMouseEnter={(e) => e.currentTarget.style.color = domain.color}
                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              >
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <button 
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 z-20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                onClick={(e) => {
                  e.preventDefault();
                  setIsFlipped(true);
                }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Back Side - PowerPoint Style */}
        <div 
          className={`
            absolute inset-0 w-full h-full
            bg-[#0B0F19] rounded-2xl border border-white/5
            flex flex-col overflow-hidden cursor-default
            ${!isFlipped ? 'pointer-events-none' : ''}
          `}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Soft Glow */}
          <div 
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
            style={{ backgroundColor: domain.color }}
          />

          {/* Top Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/5 relative z-10">
            <div className="flex items-center gap-3">
              <domain.icon className="w-5 h-5" style={{ color: domain.color }} />
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm leading-none">{domain.name}</span>
                <span className="text-gray-500 text-[10px] mt-0.5">Scope {domain.subServices.length > 0 ? currentSlide + 1 : 0} of {domain.subServices.length}</span>
              </div>
            </div>
            <button 
              onClick={handleFlipBack}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Content */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              <PowerPointSlide 
                key={currentSlide} 
                service={domain.subServices[currentSlide]} 
                index={currentSlide} 
                color={domain.color} 
                total={domain.subServices.length} 
                domainName={domain.name}
              />
            </AnimatePresence>
          </div>

          {/* Navigation Controls (Bottom Left) */}
          <div className="absolute bottom-5 left-5 flex items-center gap-2 z-20">
            <button 
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              disabled={currentSlide >= domain.subServices.length - 1}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Contact Button (First and Last Slide) */}
          <AnimatePresence>
            {(currentSlide === 0 || currentSlide === domain.subServices.length - 1 || domain.subServices.length === 0) && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  openContactModal();
                }}
                className="absolute bottom-5 right-5 px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors z-20 flex items-center gap-2 shadow-lg"
              >
                Let's Talk
                <ArrowRight className="w-3 h-3" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const AutomationDomains: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { setActiveView } = useUI();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !parallaxRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        const speed = 0.15;
        const yOffset = rect.top * speed;
        parallaxRef.current.style.transform = `translateY(${yOffset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="automation-domains" ref={sectionRef} className="relative py-16 md:py-24 bg-darker overflow-hidden z-10">
      {/* Custom Keyframes for motion graphics */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes gear {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes grow {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.15); }
          60% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(var(--color-primary), 0.5)); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 15px rgba(var(--color-primary), 0.8)); }
        }
        @keyframes swing {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(10deg); }
          40% { transform: rotate(-8deg); }
          60% { transform: rotate(4deg); }
          80% { transform: rotate(-4deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.4; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ripple-dot {
          0% { top: 0px; right: 0px; bottom: 0px; left: 0px; opacity: 0.2; border-radius: 24px; }
          100% { top: -20px; right: -20px; bottom: -20px; left: -20px; opacity: 0; border-radius: 32px; }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-gear { animation: gear 8s linear infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-grow { animation: grow 2s ease-in-out infinite; }
        .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-swing { animation: swing 2s ease-in-out infinite; transform-origin: top center; }
        .animate-ripple { animation: ripple 2s linear infinite; }
        .animate-border-flow { animation: border-flow 3s ease infinite; background-size: 200% 200%; }
      `}</style>

      {/* Parallax Background Layer */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 z-0 w-full h-[120%] -top-[10%] pointer-events-none will-change-transform"
      >
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" 
          alt="Technology Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-darker via-darker/95 to-darker"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        ></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Automation Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
            Explore our comprehensive range of automation and digital software solutions tailored for modern businesses.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full opacity-80"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <DomainCard domain={domain} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};