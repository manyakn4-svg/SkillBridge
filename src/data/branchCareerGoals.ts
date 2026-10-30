import { EngineeringBranch } from '../types';

export interface BranchCareerOption {
  title: string;
  focusArea: string;
  specializedSkills: string[];
  electiveTopics: string[];
  recommendedProjects: string[];
}

export const branchCareerGoals: Record<EngineeringBranch, BranchCareerOption[]> = {
  CSE: [
    {
      title: 'Software Developer',
      focusArea: 'Core Systems, Algorithms & High-Performance Backends',
      specializedSkills: ['Advanced DSA', 'Clean Code & SOLID', 'Microservices', 'Unit Testing & CI/CD'],
      electiveTopics: ['Concurrent Java / Go', 'Profiling & Benchmarking', 'Distributed Cache (Redis)'],
      recommendedProjects: ['High-Throughput Asynchronous Task Server', 'Concurrent Key-Value Engine'],
    },
    {
      title: 'Cloud Engineer',
      focusArea: 'Cloud Architecture, Distributed Infra & Container Orchestration',
      specializedSkills: ['AWS/GCP Architecture', 'Kubernetes', 'Terraform IaC', 'Serverless'],
      electiveTopics: ['VPC Peering & Cloud Security', 'Multi-Region Replication', 'Cost Optimization'],
      recommendedProjects: ['Automated Multi-Tier Kubernetes Cluster Deployment', 'Cloud Log Aggregator'],
    },
    {
      title: 'Cybersecurity Engineer',
      focusArea: 'Network Security, Cryptography & Threat Mitigation',
      specializedSkills: ['Penetration Testing', 'SOC Operations', 'Zero Trust Architecture', 'OWASP Top 10'],
      electiveTopics: ['Cryptographic Hash Functions', 'Kernel Security Hardening', 'Packet Sniffing'],
      recommendedProjects: ['Automated Network Intrusion Detection Engine', 'Vulnerability Scanner'],
    },
    {
      title: 'Web Developer',
      focusArea: 'Modern Full-Stack Applications, React Ecosystem & REST/GraphQL',
      specializedSkills: ['React 19 / Next.js', 'TypeScript', 'Node.js & Express', 'PostgreSQL / Prisma'],
      electiveTopics: ['Web Performance & SSR', 'State Management & WebSockets', 'OAuth 2.0 / JWT'],
      recommendedProjects: ['Collaborative Real-Time Workspace Platform', 'Enterprise SaaS Dashboard'],
    },
  ],
  ISE: [
    {
      title: 'Software Engineer',
      focusArea: 'Enterprise Software, Algorithms & Enterprise Web Services',
      specializedSkills: ['Object-Oriented Design', 'Enterprise Java/Spring', 'RESTful API Contracts', 'SQL Tuning'],
      electiveTopics: ['Design Patterns', 'Message Queues (Kafka)', 'API Gateway Routing'],
      recommendedProjects: ['Enterprise Billing & Invoicing Engine', 'Multi-Tenant Auth Portal'],
    },
    {
      title: 'Cloud Engineer',
      focusArea: 'Hybrid Cloud, Virtualization & Infrastructure Automation',
      specializedSkills: ['Docker & Podman', 'AWS Solutions Architecture', 'Monitoring (Prometheus)', 'GitOps'],
      electiveTopics: ['Container Networking', 'Terraform Modules', 'High Availability DB Failover'],
      recommendedProjects: ['Automated Disaster Recovery Pipeline', 'Hybrid Cloud Sync Daemon'],
    },
    {
      title: 'Data Analyst',
      focusArea: 'Data Warehousing, BI Dashboards & Business Insights',
      specializedSkills: ['Advanced SQL', 'Tableau / PowerBI', 'Python (Pandas)', 'Data Pipelines (ETL)'],
      electiveTopics: ['Star & Snowflake Schemas', 'Cohort Analysis', 'Predictive Trend Forecasting'],
      recommendedProjects: ['Campus Placement Statistical Analytics Dashboard', 'E-Commerce Churn Model'],
    },
  ],
  'AI & DS': [
    {
      title: 'AI Engineer',
      focusArea: 'Deep Learning, Transformer Architectures & Multimodal AI',
      specializedSkills: ['PyTorch / TensorFlow', 'Transformer Models', 'Vector Databases & RAG', 'CUDA basics'],
      electiveTopics: ['Quantization & LoRA Fine-Tuning', 'ONNX Runtime', 'Attention Mechanisms'],
      recommendedProjects: ['Domain-Specific RAG Knowledge Assistant', 'Multimodal Vision-Language Classifier'],
    },
    {
      title: 'Data Scientist',
      focusArea: 'Statistical Modeling, Feature Engineering & Predictive Analytics',
      specializedSkills: ['Hypothesis Testing', 'Scikit-Learn', 'Bayesian Inference', 'A/B Testing Experiments'],
      electiveTopics: ['Time-Series Forecasting (ARIMA/Prophet)', 'Clustering & PCA', 'Data Imputation'],
      recommendedProjects: ['Healthcare Diagnostic Prediction Engine', 'Algorithmic Financial Risk Model'],
    },
    {
      title: 'Machine Learning Engineer',
      focusArea: 'MLOps, Scalable Model Serving & Real-Time Inference',
      specializedSkills: ['MLflow & Kubeflow', 'FastAPI Model Serving', 'Docker for ML', 'Feature Stores'],
      electiveTopics: ['Model Drift Detection', 'TensorRT Optimization', 'Edge Model Compilation'],
      recommendedProjects: ['Real-Time Fraud Detection Inference Service', 'Automated ML Retraining Pipeline'],
    },
  ],
  ECE: [
    {
      title: 'Embedded Engineer',
      focusArea: 'Microcontroller Firmware, RTOS & Low-Power Hardware',
      specializedSkills: ['Embedded C / Modern C++', 'ARM Cortex-M Architecture', 'FreeRTOS', 'SPI / I2C / UART / CAN'],
      electiveTopics: ['Direct Memory Access (DMA)', 'Low-Power Sleep Modes', 'Hardware Watchdogs'],
      recommendedProjects: ['Real-Time Industrial Telemetry Node with FreeRTOS', 'Smart BMS Controller'],
    },
    {
      title: 'VLSI Engineer',
      focusArea: 'Digital ASIC / FPGA Synthesis & Static Timing Analysis',
      specializedSkills: ['Verilog / SystemVerilog', 'FPGA Synthesis (Vivado)', 'Static Timing Analysis (STA)', 'RTL Simulation'],
      electiveTopics: ['Finite State Machine (FSM) Optimization', 'Clock Domain Crossing (CDC)', 'CMOS Fabrication'],
      recommendedProjects: ['Pipelined 32-Bit RISC-V Core in SystemVerilog', 'Hardware Cryptographic Accelerator'],
    },
    {
      title: 'Electronics Engineer',
      focusArea: 'PCB Design, RF Wireless Circuits & Analog Hardware',
      specializedSkills: ['KiCAD / Altium Designer', 'Analog Filtering & Op-Amps', 'RF Impedance Matching', 'Sensor Interfacing'],
      electiveTopics: ['Signal Integrity & EMI/EMC', 'Switched-Mode Power Supply (SMPS)', 'Antenna Matching'],
      recommendedProjects: ['4-Layer High-Frequency IoT Sensor Board', 'Audio Equalizer & Power Amplifier'],
    },
  ],
  EEE: [
    {
      title: 'Electrical Engineer',
      focusArea: 'Power Distribution, Industrial Drives & High-Voltage Equipment',
      specializedSkills: ['Electrical Machine Dynamics', 'Protection Relays', 'Switchgear & Busbars', 'AutoCAD Electrical'],
      electiveTopics: ['Harmonic Mitigation', 'Transformer Thermal Modeling', 'Substation Layout Design'],
      recommendedProjects: ['Automated Substation Load Shedding Simulator', 'Motor Protection System'],
    },
    {
      title: 'Power Systems Engineer',
      focusArea: 'Grid Stability, Load Flow Analysis & Smart Microgrids',
      specializedSkills: ['MATLAB / Simulink', 'ETAP / PowerWorld', 'Transmission Line Modeling', 'SCADA Networks'],
      electiveTopics: ['Economic Load Dispatch', 'Fault Analysis (Symmetrical Components)', 'FACTS Devices'],
      recommendedProjects: ['Renewable Microgrid Stability Controller', 'HVDC Transmission Line Model'],
    },
    {
      title: 'Automation Engineer',
      focusArea: 'Industrial PLC Programming, SCADA & Motor Drives',
      specializedSkills: ['PLC Ladder Logic (Siemens/Allen-Bradley)', 'VFD Speed Control', 'Industrial Sensors', 'Modbus / Profibus'],
      electiveTopics: ['PID Tuning in PLCs', 'HMI Screen Design', 'Safety Interlocks'],
      recommendedProjects: ['Automated Manufacturing Conveyor Sorting Cell', 'Chemical Batch Reactor Controller'],
    },
  ],
  Mechanical: [
    {
      title: 'Design Engineer',
      focusArea: 'Parametric 3D CAD Modeling, FEA Stress Analysis & GD&T',
      specializedSkills: ['SolidWorks / CATIA', 'ANSYS Mechanical FEA', 'ASME Y14.5 GD&T', 'Design for Assembly (DFA)'],
      electiveTopics: ['Non-linear Stress Simulation', 'Topology Optimization', 'Sheet Metal Forming'],
      recommendedProjects: ['Lightweight Formula Student Suspension Upright', 'Robotic Arm Joint Bracket Redesign'],
    },
    {
      title: 'Automotive Engineer',
      focusArea: 'Vehicle Dynamics, EV Powertrains & Thermal Cooling',
      specializedSkills: ['EV Battery Enclosure Thermal CFD', 'Chassis Structural Mechanics', 'Powertrain Transmission', 'Aerodynamic Drag'],
      electiveTopics: ['Regenerative Braking Systems', 'Crash Energy Absorption Boxes', 'Vehicle NVH'],
      recommendedProjects: ['Electric Two-Wheeler Chassis FEA Simulation', 'Liquid-Cooled Battery Pack Thermal Model'],
    },
    {
      title: 'Robotics Engineer',
      focusArea: 'Kinematics, Mechatronics & Actuator Control',
      specializedSkills: ['Forward/Inverse Kinematics', 'ROS 2 (Robot Operating System)', 'Stepper/Servo Drives', 'Sensor Fusion'],
      electiveTopics: ['Trajectory Planning', 'PID Motion Control', 'Gripper Mechanism Synthesis'],
      recommendedProjects: ['6-DOF Articulated Robotic Arm Prototype', 'Autonomous Mobile Robot (AMR) Navigation'],
    },
  ],
  Civil: [
    {
      title: 'Structural Engineer',
      focusArea: 'Seismic Building Analysis, RCC & Structural Steel Design',
      specializedSkills: ['ETABS / STAAD.Pro', 'IS 456 & IS 1893 Codes', 'Reinforced Concrete Detailing', 'Response Spectrum'],
      electiveTopics: ['Ductile Detailing of Shear Walls', 'Prestressed Concrete', 'Wind Load Analysis'],
      recommendedProjects: ['G+12 High-Rise Seismic Analysis & Design', 'Pre-Engineered Industrial Steel Warehouse'],
    },
    {
      title: 'Site Engineer',
      focusArea: 'Construction Execution, Quality Control & Survey Verification',
      specializedSkills: ['Site Supervision & BBS (Bar Bending Schedule)', 'Concrete Slump & Cube Testing', 'Safety Protocols', 'Total Station Verification'],
      electiveTopics: ['Formwork & Scaffolding Standards', 'Soil Bearing Verification', 'Subcontractor Coordination'],
      recommendedProjects: ['Commercial Building Basement Excavation & Shoring Plan', 'Concrete Quality Audit Dossier'],
    },
    {
      title: 'Construction Manager',
      focusArea: 'Project Scheduling, CPM/PERT, Cost Estimation & BIM Coordination',
      specializedSkills: ['Primavera P6 / MS Project', 'Quantity Estimation & Rate Analysis', 'Revit BIM 4D Scheduling', 'Contract Management'],
      electiveTopics: ['Earned Value Management (EVM)', 'Risk Matrix Assessment', 'Sustainable Green Building LEED'],
      recommendedProjects: ['Urban Metro Rail Station Project Schedule & Cash Flow Model', 'BIM Cost Estimation Model'],
    },
  ],
};
