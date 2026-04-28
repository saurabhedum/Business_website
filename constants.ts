
import { Project } from './types';

export const AUTOMATION_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Predictive Maintenance Engine',
    industry: 'Industrial Automation',
    shortDescription: 'AI-driven failure prediction architecture for high-velocity assembly lines.',
    detailedBrief: '**Operational Friction:** Conventional preventative maintenance relies on static schedules, resulting in either unnecessary downtime or catastrophic failure during production runs. The client lost approximately $42k/hr during unplanned stoppages due to undetected bearing fatigue.\n\n**Technical Intervention:** We deployed a bespoke Edge-AI architecture ingesting 20kHz vibration telemetry alongside high-resolution thermal matrices. Data is pre-processed via FPGA before being fed into a local inference cluster, ensuring millisecond-level anomaly detection.\n\n**Systemic Innovation:** The system identifies non-linear degradation patterns in rotary equipment (bearings, stators, gearboxes) by analyzing spectral harmonics. This enables "just-in-time" maintenance interventions that align perfectly with scheduled downtime windows, decoupling asset health from operational risk.',
    description: 'A comprehensive sensor-fusion system that monitors vibration, temperature, and acoustics.',
    impact: 'Reduced unplanned downtime by 94% and decreased MRO (Maintenance, Repair, and Operations) inventory costs by 35% through precise component lifespan forecasting.',
    roi: 'Payback achieved in 7.2 months.',
    techStack: ['NVIDIA Jetson AGX', 'TensorFlow Lite', 'MQTT/Sparkplug B', 'Beckhoff EtherCAT'],
    modelsUsed: ['Bi-Directional LSTM Autoencoders', 'Isolation Forests for Anomaly Detection', 'Fast Fourier Transform (FFT) Signal Processing'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Sampling Rate', value: '25,600 samples/sec' },
      { label: 'Network Architecture', value: 'Hybrid Edge-Fog-Cloud' },
      { label: 'Detection Accuracy', value: '99.4% F1 Score' },
      { label: 'Protocol', value: 'OPC-UA Pub/Sub' }
    ],
    prototypeData: { complexity: 88, sensorCount: 32, latency: '15ms' }
  },
  {
    id: '2',
    title: 'Automated Warehouse Sorting',
    industry: 'Logistics & Supply Chain Automation',
    shortDescription: 'Swarm-robotics orchestration for ultra-high throughput logistics.',
    detailedBrief: '**Operational Friction:** Standard rigid automation cannot handle seasonal volume spikes or irregular parcel shapes, creating bottlenecks that cap revenue during peak periods. Manual sorting errors accounted for 3.5% of all shipments.\n\n**Technical Intervention:** This solution implements a decentralized control plane for a fleet of 6-axis Delta robots and smart conveyor belts. Utilizing multi-agent reinforcement learning, the system dynamically balances load across sorting lanes to prevent congestion before it occurs.\n\n**Systemic Innovation:** The vision system fuses depth maps with RGB data to calculate optimal grasp points for irregular parcels in real-time. This allows the system to handle varying weights and centers-of-mass without recalibration, achieving "lights-out" logistics capability.',
    description: 'Autonomous conveyor and robotic arm system for package sorting.',
    impact: 'Increased sorting throughput by 310% to 6,200 UPH (Units Per Hour) and reduced package mishandling rates to near-zero levels (<0.001%).',
    roi: 'Payback achieved in 13.5 months.',
    techStack: ['Siemens TIA Portal', 'ROS 2 (Robot Operating System)', 'Cognex ViDi', 'Profinet IRT'],
    modelsUsed: ['YOLOv8-Large (Custom Fine-tune)', 'Deep Q-Network (DQN) for Multi-Agent Pathfinding', 'Kalman Filter Trajectory Prediction'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Robot Payload', value: '12kg (Delta Config)' },
      { label: 'Throughput', value: '6,200 Units/Hr' },
      { label: 'Grasp Precision', value: '±0.05mm' },
      { label: 'Safety Rating', value: 'SIL 3 / PLe' }
    ],
    prototypeData: { complexity: 94, sensorCount: 184, latency: '40ms' }
  },
  {
    id: '3',
    title: 'Smart Building Optimizer',
    industry: 'Energy & Utility Automation',
    shortDescription: 'Cognitive BMS (Building Management System) for energy efficiency.',
    detailedBrief: '**Operational Friction:** Legacy HVAC systems operate on static setpoints, blasting conditioned air into empty rooms and reacting too slowly to thermal loads, resulting in massive energy waste and occupant discomfort.\n\n**Technical Intervention:** Our Smart Building Optimizer overlays a software-defined brain onto existing BACnet and Modbus infrastructure. Aggregating data from CO2 sensors, occupancy heat-maps, and external weather APIs, the system uses Model Predictive Control (MPC) to modulate loads.\n\n**Systemic Innovation:** The system proactively cools or heats zones based on *predicted* occupancy rather than current state. This shift from reactive to predictive thermal management eliminates the "hysteresis loop" of energy waste found in traditional PID loops.',
    description: 'AI-driven HVAC and lighting control based on real-time occupancy.',
    impact: 'Achieved a 38% reduction in total energy expenditure and improved ASHRAE-55 thermal comfort compliance scores by 22%.',
    roi: 'Payback achieved in 1.8 years.',
    techStack: ['Tridium Niagara 4', 'Azure Digital Twins', 'InfluxDB', 'Grafana Enterprise'],
    modelsUsed: ['Reinforcement Learning (PPO)', 'ARIMA Time-Series Forecasting', 'K-Means Clustering for Occupancy Profiling'],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Protocol Support', value: 'BACnet, LonWorks, Modbus' },
      { label: 'Cloud Connectivity', value: 'Azure IoT Hub' },
      { label: 'Security Standard', value: 'TLS 1.3 / OAuth 2.0' },
      { label: 'Data Retention', value: '5 Years Historical' }
    ],
    prototypeData: { complexity: 72, sensorCount: 1120, latency: '350ms' }
  },
  {
    id: '4',
    title: 'Autonomous Irrigation',
    industry: 'Agriculture Automation',
    shortDescription: 'Precision agronomy platform utilizing sensor fusion and satellite data.',
    detailedBrief: '**Operational Friction:** Uniform irrigation ignores soil variability, leading to water waste in saturated zones and crop stress in arid patches. Manual soil testing is too slow to inform daily watering decisions.\n\n**Technical Intervention:** We deployed a mesh of LoRaWAN soil probes measuring volumetric water content (VWC) and electro-conductivity. The central engine cross-references this ground-truth data with multi-spectral satellite imagery (NDVI indices) to calculate accurate evapotranspiration rates.\n\n**Systemic Innovation:** A variable-rate control loop adjusts solenoid valves to deliver precise water volumes to specific root zones. This "digital dowsing" ensures every drop of water is legally attributable to crop yield, optimizing for both resource scarcity and plant physiology.',
    description: 'Sensor-driven irrigation responding to real-time soil and weather conditions.',
    impact: 'Reduced water consumption by 52% and fertilizer runoff by 30%, while increasing crop yield consistency across variable terrain.',
    roi: 'Payback achieved in 2 harvest cycles.',
    techStack: ['LoRaWAN', 'Python/Django', 'Sentinel-2 Satellite API', 'Solar Mesh Network'],
    modelsUsed: ['Random Forest Regression for Moisture Prediction', 'CNN for NDVI Image Analysis', 'Fuzzy Logic Control Systems'],
    imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Wireless Range', value: '15km (Line of Sight)' },
      { label: 'Battery Life', value: '7 Years (LiSOCl2)' },
      { label: 'Moisture Range', value: '0 - 100% VWC' },
      { label: 'Actuator Type', value: 'Latching Solenoid' }
    ],
    prototypeData: { complexity: 65, sensorCount: 450, latency: '2500ms' }
  },
  {
    id: '5',
    title: 'Robotic Quality Inspection',
    industry: 'Industrial Automation',
    shortDescription: 'Micro-precision computer vision for zero-defect manufacturing.',
    detailedBrief: '**Operational Friction:** Human visual inspection is prone to fatigue, with defect detection rates dropping significantly after 2 hours of shift work. This variability allowed substandard parts to reach assembly, causing expensive downstream failures.\n\n**Technical Intervention:** This inspection cell utilizes a structured light projector and four synchronized 12MP industrial cameras to generate high-density 3D point clouds. A custom deep learning model performs semantic segmentation in under 180ms, identifying surface defects down to 15 microns.\n\n**Systemic Innovation:** By integrating directly with the PLC to pneumatically reject non-conforming parts, we created a closed-loop quality gate. The system doesn\'t just reject bad parts; it feeds data back to the CNC machines to auto-correct tool offset, preventing defects before they happen.',
    description: 'Automated optical inspection (AOI) utilizing 3D scanning.',
    impact: 'Improved First Pass Yield (FPY) from 91% to 99.8% and eliminated human visual inspection fatigue errors.',
    roi: 'Immediate brand reputation protection.',
    techStack: ['OpenCV', 'CUDA', 'PyTorch', 'Basler GigE Cameras'],
    modelsUsed: ['YOLOv9-E', 'Siamese Networks for One-Shot Learning', 'PointNet for 3D Segmentation'],
    imageUrl: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Min Defect Size', value: '0.015mm' },
      { label: 'Inspection Cycle', value: '180ms per unit' },
      { label: 'Training Dataset', value: '250k Annotated Images' },
      { label: 'Interface', value: 'HMI / EtherNet/IP' }
    ],
    prototypeData: { complexity: 91, sensorCount: 6, latency: '42ms' }
  },
  {
    id: '6',
    title: 'Automated Invoice Processor',
    industry: 'Financial Automation',
    shortDescription: 'Enterprise IDP (Intelligent Document Processing) for financial operations.',
    detailedBrief: '**Operational Friction:** The finance team was drowning in 5,000+ monthly invoices, utilizing highly paid accountants for data entry. This manual pipeline introduced a 2% error rate and delayed month-end closing by 6 days.\n\n**Technical Intervention:** An end-to-end accounting automation platform that ingests invoices, purchase orders, and receipts from multiple channels. Utilizing a multi-stage NLP pipeline, it extracts unstructured data, maps it to GL codes, and performs 3-way matching against ERP records.\n\n**Systemic Innovation:** The system features a "Human-in-the-Loop" validation interface for low-confidence extractions. However, every human correction retrains the model, creating an asymptotic improvement curve where the system gets smarter with every invoice processed.',
    description: 'AI-powered OCR and data extraction for accounts payable.',
    impact: 'Reduced manual data entry hours by 92% and lowered processing cost-per-invoice from $14.00 to $0.85.',
    roi: 'Payback achieved in 4.5 months.',
    techStack: ['Python', 'AWS Textract', 'FastAPI', 'PostgreSQL'],
    modelsUsed: ['BERT (Bidirectional Encoder Representations)', 'LayoutLMv3', 'CRNN (Convolutional Recurrent Neural Network)'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Extraction Accuracy', value: '99.2% (Validated)' },
      { label: 'Language Support', value: '45+ Global Languages' },
      { label: 'ERP Connectors', value: 'SAP, Oracle, NetSuite' },
      { label: 'Compliance', value: 'SOC2 Type II / GDPR' }
    ],
    prototypeData: { complexity: 58, sensorCount: 0, latency: '1200ms' }
  },
  {
    id: '7',
    title: 'Smart Street Lighting Grid',
    industry: 'Smart Ecosystems',
    shortDescription: 'Adaptive municipal infrastructure powered by mesh networking.',
    detailedBrief: '**Operational Friction:** Municipal lighting was a "dumb" asset—burning at 100% brightness all night regardless of activity, and requiring citizens to report outages manually.\n\n**Technical Intervention:** We upgraded standard streetlights into intelligent IoT nodes connected via a 6LoWPAN mesh. Each pole adjusts luminosity based on real-time pedestrian and vehicle traffic data. Integrated acoustic sensors detect anomalies like glass breakage or collisions.\n\n**Systemic Innovation:** The network acts as a digital nervous system for the city. Beyond energy savings, it provides a "high-visibility" public safety mode that automatically illuminates crime scenes or accident zones to aid emergency responders, turning infrastructure into an active service.',
    description: 'Intelligent lighting network that responds to traffic and environmental cues.',
    impact: 'Generated city-wide energy savings of 64% and reduced maintenance response times by 80% through automated fault reporting.',
    roi: 'Payback achieved in 32 months.',
    techStack: ['6LoWPAN', 'Philips CityTouch', 'DALI-2 Protocol', 'Node-RED'],
    modelsUsed: ['Graph Neural Networks (GNN) for Mesh Routing', 'ANFIS (Adaptive Neuro-Fuzzy Inference System)', 'Acoustic Event Detection Models'],
    imageUrl: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Network Nodes', value: 'Up to 25,000' },
      { label: 'Encryption', value: 'DTLS / AES-128' },
      { label: 'Fail-Safe', value: 'Local Photocell Override' },
      { label: 'Data Export', value: 'CSV / JSON / MQTT' }
    ],
    prototypeData: { complexity: 78, sensorCount: 15400, latency: '250ms' }
  },
  {
    id: '8',
    title: 'Connected Health Monitor',
    industry: 'Healthcare Automation',
    shortDescription: 'Medical-grade remote patient telemetry for critical care.',
    detailedBrief: '**Operational Friction:** Post-operative monitoring relied on periodic nurse checks, leaving 4-hour blind spots where patient deterioration could go unnoticed until it became critical.\n\n**Technical Intervention:** A secure, compliant wearable platform streaming continuous multi-lead ECG and photoplethysmography (PPG) data. The proprietary "Early Warning Score" algorithm analyzes trend lines to predict decompensation events up to 45 minutes before standard alarms would trigger.\n\n**Systemic Innovation:** By moving from "spot-check" to "continuous stream," we shifted care from reactive rescue to proactive stabilization. The system filters signal noise to prevent alarm fatigue, ensuring clinical staff only respond to genuine physiological decline.',
    description: 'Real-time vital sign tracking and predictive deterioration alerts.',
    impact: 'Reduced "Code Blue" emergency events by 34% and lowered ICU readmission rates by 15% through earlier detection.',
    roi: 'Significant operational and clinical value.',
    techStack: ['BLE Mesh', 'HL7/FHIR Interoperability', 'React Native', 'Redis'],
    modelsUsed: ['1D-CNN for ECG Arrhythmia Detection', 'Logistic Regression for EWS Scoring', 'Bayesian Belief Networks'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Regulatory Cert', value: 'FDA Class II / CE' },
      { label: 'Monitoring Channels', value: '3-Lead ECG / SpO2 / RR' },
      { label: 'Latency', value: '< 2.0s End-to-End' },
      { label: 'Protocol', value: 'CoAP over UDP' }
    ],
    prototypeData: { complexity: 82, sensorCount: 150, latency: '80ms' }
  },
  {
    id: '9',
    title: 'Unmanned Retail Kiosk',
    industry: 'Retail & Commerce Automation',
    shortDescription: 'Frictionless "Just Walk Out" retail experience.',
    detailedBrief: '**Operational Friction:** Traditional retail suffers from the "checkout bottleneck," where customers abandon purchases due to long lines. Staffing costs for low-value transactions also erode margins.\n\n**Technical Intervention:** A cashier-less store environment powered by advanced computer vision fusion. Ceiling-mounted cameras track customer skeletal pose while weight-sensitive smart shelves confirm SKU interaction. The system builds a virtual cart in real-time, attributing items to specific users with high confidence.\n\n**Systemic Innovation:** We eliminated the concept of the "transaction moment." Payment is processed automatically upon exiting the geofenced zone. This required solving the "occlusion problem" (users blocking cameras) through multi-angle sensor fusion, ensuring 99.1% attribution accuracy even in crowded stores.',
    description: 'Automated checkout utilizing sensor fusion and skeletal tracking.',
    impact: 'Eliminated checkout queues entirely and reduced operational overhead by removing cashier staffing requirements.',
    roi: 'Payback achieved in 14 months.',
    techStack: ['Edge AI Computing', 'LiDAR', 'Stripe API', 'Go (Golang)'],
    modelsUsed: ['PoseNet / OpenPose', '3D ResNet for Action Recognition', 'Sensor Fusion Kalman Filters'],
    imageUrl: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Simultaneous Users', value: '60 Pax Capacity' },
      { label: 'Attribution Accuracy', value: '99.1%' },
      { label: 'Sensor Precision', value: '±0.2g (Load Cells)' },
      { label: 'Network', value: 'Dedicated Fiber 1Gbps' }
    ],
    prototypeData: { complexity: 97, sensorCount: 420, latency: '25ms' }
  },
  {
    id: '10',
    title: 'Automated Fleet Telematics',
    industry: 'Logistics & Supply Chain Automation',
    shortDescription: 'Intelligent logistics orchestration and route optimization.',
    detailedBrief: '**Operational Friction:** Fleet managers lacked visibility into driver behavior and real-time vehicle health, leading to fuel theft, unsafe driving, and reactive maintenance that took trucks off the road.\n\n**Technical Intervention:** The platform integrates directly with vehicle CAN bus systems (J1939) to monitor engine health, fuel consumption, and driver metrics. This data feeds into a dynamic routing engine that uses genetic algorithms to calculate optimal delivery paths in real-time.\n\n**Systemic Innovation:** The system treats the fleet as a single organism. If a vehicle reports a "Check Engine" code, the routing algorithm automatically re-assigns its future deliveries to healthy trucks and routes the damaged vehicle to the nearest service center, minimizing network disruption.',
    description: 'Real-time fleet monitoring and AI-driven route planning.',
    impact: 'Reduced fuel expenditure by 14% and improved on-time delivery (OTD) metrics to 99.2% across the fleet.',
    roi: 'Payback achieved in 5 months.',
    techStack: ['J1939 CAN Standard', 'Scala', 'Kubernetes', 'Google Maps Platform'],
    modelsUsed: ['Genetic Algorithms (NSGA-II) for Routing', 'Gradient Boosting (LightGBM) for Fuel Pred', 'DBSCAN for Stop Detection'],
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Polling Rate', value: '500ms (Real-time)' },
      { label: 'Compliance', value: 'ELD / FMCSA Mandate' },
      { label: 'Optimization', value: 'Multi-Stop VRP' },
      { label: 'Messaging', value: 'MQTT / Protobuf' }
    ],
    prototypeData: { complexity: 62, sensorCount: 45, latency: '400ms' }
  },
  {
    id: '11',
    title: 'Smart Waste Management',
    industry: 'ESG & Sustainability Automation',
    shortDescription: 'IoT-enabled sanitation logistics optimization.',
    detailedBrief: '**Operational Friction:** City sanitation trucks drove static routes daily, emptying 80% empty bins while overflowing bins elsewhere created health hazards. This inefficiency wasted fuel and labor.\n\n**Technical Intervention:** Ruggedized ultrasonic sensors were retrofitted to municipal waste containers to measure fill levels in real-time. Transmitting via NB-IoT, these sensors feed a central dispatch algorithm that generates dynamic daily collection routes.\n\n**Systemic Innovation:** We inverted the logistics model from "schedule-based" to "demand-based." Trucks are only dispatched to bins exceeding 85% capacity. This dynamic routing reduced the fleet size requirement while eliminating the public nuisance of overflowing waste containers.',
    description: 'Fill-level monitoring system optimizing collection truck routing.',
    impact: 'Reduced municipal waste collection mileage by 38% and fuel costs by 45%, significantly lowering the city carbon footprint.',
    roi: 'Payback achieved in 9.5 months.',
    techStack: ['NB-IoT (Narrowband)', 'PostGIS', 'React', 'C++ (Embedded)'],
    modelsUsed: ['Travelling Salesman Problem (TSP) Solvers', 'Linear Regression for Fill-Rate Prediction', 'LoRaWAN Adaptive Data Rate'],
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Sensor Tech', value: 'Ultrasonic ToF' },
      { label: 'Connectivity', value: 'NB-IoT (Cat-M1)' },
      { label: 'Enclosure Rating', value: 'IK10 Impact / IP68' },
      { label: 'Scale', value: '1,200 Nodes/City' }
    ],
    prototypeData: { complexity: 48, sensorCount: 1200, latency: '5000ms' }
  },
  {
    id: '13',
    title: 'AI Personalization Engine',
    industry: 'Software Automation',
    shortDescription: 'Real-time behavioral recommendation system for e-commerce.',
    detailedBrief: '**Operational Friction:** The client’s e-commerce platform treated every visitor the same, displaying generic "Best Sellers." This lack of relevance led to high bounce rates and low average order values.\n\n**Technical Intervention:** An omni-channel personalization engine that constructs a real-time graph of user intent. Ingesting clickstream data, historical transactions, and session context, the system utilizes a hybrid recommender model to serve hyper-relevant product suggestions within 50ms.\n\n**Systemic Innovation:** Unlike static rule-based systems, this engine uses Multi-Armed Bandit algorithms to continuously experiment. It balances "exploitation" (showing what we know you like) with "exploration" (testing new trends), automatically optimizing its own conversion strategy without human marketing intervention.',
    description: 'Machine learning system delivering custom content experiences.',
    impact: 'Increased Average Order Value (AOV) by 22% and improved email click-through rates (CTR) by 400%.',
    roi: 'Payback achieved in 2 months.',
    techStack: ['Apache Kafka', 'Scikit-learn', 'GraphQL', 'Next.js'],
    modelsUsed: ['Matrix Factorization (SVD)', 'Multi-Armed Bandits (Thompson Sampling)', 'Transformer-based Recommendation (SASRec)'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Inference Latency', value: '38ms (P99)' },
      { label: 'Throughput', value: '150,000 req/sec' },
      { label: 'Model Refresh', value: 'Continuous Online' },
      { label: 'Feature Space', value: '1.2k Dense Vectors' }
    ],
    prototypeData: { complexity: 84, sensorCount: 0, latency: '38ms' }
  },
  {
    id: '14',
    title: 'Home Cinema Automation',
    industry: 'Home Automation',
    shortDescription: 'Luxury audiovisual integration with environmental control.',
    detailedBrief: '**Operational Friction:** High-end home cinemas often consist of 10+ disparately controlled systems (projector, processor, amps, HVAC, shades, lighting). The complexity of operation discouraged the client from using the room.\n\n**Technical Intervention:** A premium residential integration consolidating all subsystems into a single cohesive experience. A "Showtime" macro triggers a synchronized sequence: motorized blackout shades descend, HVAC enters silent mode, lighting dims to 10%, and the Dolby Atmos processor calibrates to the room\'s current acoustic signature.\n\n**Systemic Innovation:** We focused on "One-Touch Simplicity." Behind the simple UI lies complex logic that manages HDCP handshakes, thermal management of the rack, and acoustic optimization. The room prepares itself for the user, rather than the user preparing the room.',
    description: 'Unified control of entertainment and environmental systems.',
    impact: 'Delivers a seamless, theater-quality experience and increases property resale valuation by approximately 15%.',
    roi: 'High lifestyle and asset value ROI.',
    techStack: ['KNX Protocol', 'DALI Lighting', 'Savant Host', 'Dante Audio'],
    modelsUsed: ['Rule-Based Expert System', 'Voice Activity Detection (VAD)', 'Room Impulse Response (RIR) Analysis'],
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Audio Latency', value: '< 1ms (Dante)' },
      { label: 'Lighting Control', value: 'Lutron QSX' },
      { label: 'Video Signal', value: '8K / 120Hz Native' },
      { label: 'Interface', value: 'Voice / Tablet / Keypad' }
    ],
    prototypeData: { complexity: 52, sensorCount: 24, latency: '150ms' }
  },
  {
    id: '16',
    title: 'Automatic Parking Hub',
    industry: 'Smart Ecosystems',
    shortDescription: 'High-density robotic valet parking system.',
    detailedBrief: '**Operational Friction:** Urban real estate is expensive, and traditional ramps waste 40% of volume on drive aisles. The client needed to maximize parking density in a small downtown footprint.\n\n**Technical Intervention:** A fully automated parking structure utilizing pallet-based shuttles and vertical lifts. Upon vehicle entry, laser scanners verify dimensions and occupancy. A central scheduling algorithm assigns the optimal storage slot based on retrieval frequency data.\n\n**Systemic Innovation:** By removing humans from the storage area, we reduced slab-to-slab heights (no headroom needed) and eliminated lighting/ventilation requirements. The system also "defrauds" peak times by pre-shuffling cars near the exit based on predicted commuter behavior.',
    description: 'Mechanical shuttle system for compact vehicle storage and retrieval.',
    impact: 'Tripled vehicle storage capacity within the same building footprint compared to traditional ramps.',
    roi: 'Payback achieved in 42 months (Real Estate Multiplier).',
    techStack: ['Siemens S7-1500 PLC', 'SEW Eurodrive', 'WinCC SCADA', 'RFID Tracking'],
    modelsUsed: ['A* Search Algorithm for Pathfinding', 'Finite State Machines (FSM)', 'Object Detection (SSD MobileNet) for Safety'],
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Load Capacity', value: '3,200kg per pallet' },
      { label: 'Retrieval Time', value: 'Avg 82 Seconds' },
      { label: 'System Uptime', value: '99.98%' },
      { label: 'Safety Sys', value: 'SIL 3 Light Curtains' }
    ],
    prototypeData: { complexity: 87, sensorCount: 78, latency: '120ms' }
  },
  {
    id: '17',
    title: 'Smart Greenhouse Controller',
    industry: 'Agriculture Automation',
    shortDescription: 'CEA (Controlled Environment Agriculture) operating system.',
    detailedBrief: '**Operational Friction:** Balancing humidity, temperature, and light levels manually is a constant battle. A sudden cloud cover or temperature spike can stress plants within minutes, reducing harvest quality.\n\n**Technical Intervention:** An integrated climate control system designed for high-value crops. It manages VPD (Vapor Pressure Deficit) by coordinating vents, misting systems, and heating. The controller also automates nutrient delivery (fertigation) based on pH and EC sensor readings.\n\n**Systemic Innovation:** The system implements a "Solar-Sync" algorithm that adjusts LED grow light intensity in inverse proportion to sunlight availability, maintaining a perfect Daily Light Integral (DLI) while minimizing electricity costs. It turns the greenhouse into a predictable factory floor.',
    description: 'Automated environmental control for vertical farming and greenhouses.',
    impact: 'Increased crop yields by 45% and reduced energy consumption for HVAC by 30%.',
    roi: 'Payback achieved in 14 months.',
    techStack: ['ESP32 Nodes', 'Node-RED', 'MQTT Broker', 'InfluxDB'],
    modelsUsed: ['Model Predictive Control (MPC)', 'RNN for Micro-Climate Forecasting', 'Computer Vision for Plant Phenotyping'],
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Sensors', value: 'PAR, CO2, VPD, Soil' },
      { label: 'Lighting', value: 'PWM Full Spectrum' },
      { label: 'Irrigation', value: 'Precision Fertigation' },
      { label: 'Network', value: 'Ethernet / Wi-Fi Mesh' }
    ],
    prototypeData: { complexity: 70, sensorCount: 56, latency: '1200ms' }
  },
  {
    id: '18',
    title: 'Contactless RFID Inventory',
    industry: 'Logistics & Supply Chain Automation',
    shortDescription: 'Real-time asset visibility using UHF RFID technology.',
    detailedBrief: '**Operational Friction:** Manual barcode scanning was labor-intensive and error-prone. The client lost millions annually in "shrinkage" and had poor visibility into actual stock levels vs. ERP records.\n\n**Technical Intervention:** A passive UHF RFID implementation providing item-level granularity. Fixed readers at dock doors automatically record goods-in/goods-out movements, while handheld units allow for rapid cycle counting (1000+ items/min).\n\n**Systemic Innovation:** We implemented "Directional Logic" using antenna arrays to determine if an item is entering or leaving a zone. This distinguishes between a forklift driving *past* a dock door versus *through* it, creating a flawless automated ledger of asset movement without human input.',
    description: 'Automated inventory tracking system replacing manual barcode scanning.',
    impact: 'Improved inventory accuracy from 72% to 99.7% and reduced labor hours for stock-taking by 85%.',
    roi: 'Payback achieved in 6 months.',
    techStack: ['Impinj UHF RFID', 'Java/Spring Boot', 'MySQL', 'LLRP Protocol'],
    modelsUsed: ['Anti-Collision Algorithms (Q-Algorithm)', 'RSS-based Localization', 'Time-Series Anomaly Detection'],
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Read Rate', value: '1,200 tags/sec' },
      { label: 'Infrastructure', value: '48 Fixed / 12 Handheld' },
      { label: 'Standard', value: 'EPC Gen2v2 / ISO 18000-63' },
      { label: 'Read Range', value: 'Up to 12 Meters' }
    ],
    prototypeData: { complexity: 45, sensorCount: 60, latency: '12ms' }
  },
  {
    id: '19',
    title: 'Autonomous Perimeter Security',
    industry: 'Security Solutions',
    shortDescription: 'Drone-in-a-Box solution for critical facility protection.',
    detailedBrief: '**Operational Friction:** Securing large industrial perimeters with static guards is expensive and ineffective against determined intruders. Blind spots and patrol gaps created vulnerability windows.\n\n**Technical Intervention:** A multi-layered security system combining ground-based LiDAR fences with autonomous aerial response. When a perimeter breach is detected, a drone automatically launches, flies to the coordinate, and streams 4K thermal video to the security operations center.\n\n**Systemic Innovation:** This is "Active Deterrence." The system doesn\'t just record the intrusion; it tracks the target autonomously using visual SLAM and object detection, allowing a single remote operator to manage security for a 500-acre facility effectively.',
    description: 'Automated aerial surveillance triggered by ground sensor arrays.',
    impact: 'Reduced security response time by 85% and halved the requirement for static guard patrols.',
    roi: 'Opex reduction of $180k/annually.',
    techStack: ['ROS (Robot Operating System)', 'Velodyne LiDAR', 'Thermal Imaging', 'C++'],
    modelsUsed: ['YOLO-Thermal Object Detection', 'Visual SLAM (Simultaneous Localization and Mapping)', 'Siamese Object Trackers'],
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'LiDAR Range', value: '250m Radial' },
      { label: 'Drone Speed', value: '65 km/h' },
      { label: 'Data Security', value: 'AES-256 GCM' },
      { label: 'Durability', value: 'IP55 Storm-Rated' }
    ],
    prototypeData: { complexity: 98, sensorCount: 18, latency: '120ms' }
  },
  {
    id: '20',
    title: 'Cyber-Physical SOAR',
    industry: 'Security Solutions',
    shortDescription: 'Automated cyber-defense for Industrial Control Systems (ICS).',
    detailedBrief: '**Operational Friction:** OT (Operational Technology) networks are often legacy systems vulnerable to modern cyber-attacks. Manual incident response is too slow to stop a ransomware attack from seizing control of physical machinery.\n\n**Technical Intervention:** A specialized SOAR (Security Orchestration, Automation, and Response) platform for OT networks. It performs deep packet inspection on industrial protocols (Modbus, DNP3) to identify anomalous command sequences.\n\n**Systemic Innovation:** The system implements "Physical Safety Logic." If it detects a cyber-threat attempting to unsafe machinery (e.g., spinning a turbine beyond limits), it physically isolates the compromised PLC from the network instantly, sacrificing connectivity to preserve the physical asset and human safety.',
    description: 'Automated threat response system for industrial networks.',
    impact: 'Prevents physical infrastructure damage and reduces "dwell time" of intruders to near zero.',
    roi: 'Drastic reduction in cyber-insurance premiums and risk exposure.',
    techStack: ['Python', 'Snort/Suricata IDS', 'Elasticsearch', 'Cisco ASA'],
    modelsUsed: ['Deep Autoencoders for Anomaly Detection', 'Decision Trees for Playbook Logic', 'Packet Byte Frequency Analysis'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'DPI Support', value: 'Modbus, DNP3, CIP' },
      { label: 'Response Time', value: '< 15ms Auto-Shunt' },
      { label: 'Threat Intel', value: 'STIX/TAXII Feeds' },
      { label: 'Integration', value: 'Palo Alto / Fortinet' }
    ],
    prototypeData: { complexity: 85, sensorCount: 0, latency: '4ms' }
  },
  {
    id: '21',
    title: 'Generative Content Engine',
    industry: 'Content Automation',
    shortDescription: 'AI-driven content creation and localization pipeline.',
    detailedBrief: '**Operational Friction:** Marketing teams struggled to produce localized content for 50+ markets, leading to brand inconsistency and slow campaign rollouts.\n\n**Technical Intervention:** A generative AI pipeline that ingests core brand assets and automatically generates localized copy, images, and video variations. The system uses RAG (Retrieval-Augmented Generation) to ensure all output adheres to strict brand guidelines.\n\n**Systemic Innovation:** By decoupling content creation from human bandwidth, the system allows for "Hyper-Personalization at Scale," generating unique creative assets for every single user segment in real-time.',
    description: 'Automated content generation and localization system.',
    impact: 'Reduced content production costs by 75% and accelerated time-to-market for global campaigns by 10x.',
    roi: 'Payback achieved in 3 months.',
    techStack: ['Python', 'LangChain', 'Stable Diffusion', 'React'],
    modelsUsed: ['GPT-4 (Fine-tuned)', 'CLIP for Image-Text Matching', 'Multilingual BERT'],
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Generation Speed', value: '2.5s per asset' },
      { label: 'Languages', value: '100+ Supported' },
      { label: 'Brand Safety', value: '99.9% Compliance' },
      { label: 'Format', value: 'Text / Image / Video' }
    ],
    prototypeData: { complexity: 60, sensorCount: 0, latency: '2500ms' }
  },
  {
    id: '22',
    title: 'Adaptive Learning Platform',
    industry: 'Education Automation (EdTech Infrastructure)',
    shortDescription: 'AI-powered personalized learning pathways for students.',
    detailedBrief: '**Operational Friction:** Traditional "one-size-fits-all" education leaves behind struggling students while boring advanced ones. Teachers lack the time to create individual lesson plans for 30+ students.\n\n**Technical Intervention:** An adaptive learning engine that analyzes student performance in real-time. It constructs a dynamic knowledge graph for each learner, automatically adjusting the difficulty, format, and pacing of content to optimize retention.\n\n**Systemic Innovation:** The system identifies "Knowledge Gaps" before they become critical. If a student struggles with calculus, the system traces the root cause back to a missing algebra concept and seamlessly inserts a remedial micro-lesson, repairing the foundation without stalling progress.',
    description: 'Personalized education platform using knowledge graph technology.',
    impact: 'Improved student test scores by 28% and reduced dropout rates by 15% through early intervention.',
    roi: 'Significant social and long-term economic impact.',
    techStack: ['Neo4j', 'Python', 'React', 'AWS Lambda'],
    modelsUsed: ['Knowledge Tracing (BKT/DKT)', 'Item Response Theory (IRT)', 'Recommender Systems'],
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Concurrent Users', value: '500,000+' },
      { label: 'Adaptivity', value: 'Real-time' },
      { label: 'Content Types', value: 'Video / Quiz / Interactive' },
      { label: 'Standards', value: 'LTI 1.3 / xAPI' }
    ],
    prototypeData: { complexity: 75, sensorCount: 0, latency: '150ms' }
  },
  {
    id: '23',
    title: 'Intelligent Recruitment Bot',
    industry: 'HR & Workforce Automation',
    shortDescription: 'Automated candidate sourcing and screening assistant.',
    detailedBrief: '**Operational Friction:** HR teams were overwhelmed by thousands of resumes for open positions, leading to slow hiring cycles and missed top talent. Bias in manual screening also limited diversity.\n\n**Technical Intervention:** An AI-driven recruitment assistant that automates the top-of-funnel process. It sources candidates from multiple platforms, parses resumes to match skills against job descriptions, and conducts initial chat-based screening interviews.\n\n**Systemic Innovation:** The system uses "Blind Screening" to eliminate unconscious bias. It evaluates candidates solely on skills and experience, redacting names, genders, and universities from the initial review, resulting in a more diverse and qualified candidate pool.',
    description: 'AI recruiter for sourcing, screening, and scheduling.',
    impact: 'Reduced time-to-hire by 40% and increased candidate quality scores by 25%.',
    roi: 'Payback achieved in 6 months.',
    techStack: ['Node.js', 'Dialogflow', 'LinkedIn API', 'MongoDB'],
    modelsUsed: ['Named Entity Recognition (NER) for Resume Parsing', 'Sentiment Analysis', 'Matching Algorithms'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    specifications: [
      { label: 'Screening Capacity', value: '1000+ per day' },
      { label: 'Integration', value: 'Workday / Greenhouse' },
      { label: 'Bias Reduction', value: 'Algorithmic Audited' },
      { label: 'Availability', value: '24/7' }
    ],
    prototypeData: { complexity: 55, sensorCount: 0, latency: '800ms' }
  }
];
