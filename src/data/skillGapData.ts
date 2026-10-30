import { EngineeringBranch, SkillGapItem, TargetRole } from '../types';

export const targetRolesByBranch: Record<EngineeringBranch, TargetRole[]> = {
  CSE: [
    {
      id: 'role-cse-1',
      title: 'Full Stack Software Engineer',
      branch: 'CSE',
      description: 'Build robust web applications, scalable APIs, and modern cloud microservices.',
      requiredSkills: [
        { name: 'Data Structures & Algorithms', target: 85 },
        { name: 'System Design & Architecture', target: 80 },
        { name: 'Database Management (SQL/NoSQL)', target: 85 },
        { name: 'Backend Engineering (Node/Java/Go)', target: 85 },
        { name: 'Frontend Frameworks (React/Vue)', target: 80 },
        { name: 'CI/CD & Docker', target: 75 },
      ],
    },
    {
      id: 'role-cse-2',
      title: 'Cloud DevOps & Infrastructure Engineer',
      branch: 'CSE',
      description: 'Automate build pipelines, orchestrate Kubernetes clusters, and manage cloud infra.',
      requiredSkills: [
        { name: 'Linux System Administration', target: 90 },
        { name: 'Docker & Kubernetes', target: 85 },
        { name: 'Cloud Providers (AWS/GCP)', target: 85 },
        { name: 'Infrastructure as Code (Terraform)', target: 80 },
        { name: 'Monitoring & Telemetry', target: 75 },
        { name: 'CI/CD Automation', target: 85 },
      ],
    },
  ],
  ISE: [
    {
      id: 'role-ise-1',
      title: 'Enterprise Systems & Cloud Architect',
      branch: 'ISE',
      description: 'Design distributed architectures, enterprise data pipelines, and scalable APIs.',
      requiredSkills: [
        { name: 'Cloud Infrastructure & Microservices', target: 85 },
        { name: 'Enterprise DBMS & Big Data', target: 80 },
        { name: 'Data Structures & Algorithms', target: 80 },
        { name: 'Web Security & OAuth', target: 75 },
        { name: 'Software Design Patterns', target: 80 },
      ],
    },
  ],
  'AI & DS': [
    {
      id: 'role-aids-1',
      title: 'AI / Machine Learning Engineer',
      branch: 'AI & DS',
      description: 'Train deep neural models, deploy ML inference pipelines, and optimize embeddings.',
      requiredSkills: [
        { name: 'Python & NumPy/Pandas', target: 90 },
        { name: 'Deep Learning (PyTorch/TensorFlow)', target: 85 },
        { name: 'Mathematics & Statistics', target: 85 },
        { name: 'MLOps & Model Serving', target: 80 },
        { name: 'Data Preprocessing & EDA', target: 85 },
        { name: 'Computer Vision / NLP', target: 75 },
      ],
    },
    {
      id: 'role-aids-2',
      title: 'Data Science & BI Specialist',
      branch: 'AI & DS',
      description: 'Extract statistical insights, build predictive pipelines, and executive dashboards.',
      requiredSkills: [
        { name: 'SQL & Data Warehousing', target: 90 },
        { name: 'Statistical Hypothesis Testing', target: 85 },
        { name: 'Python / R Analytics', target: 85 },
        { name: 'BI Tools (Tableau / PowerBI)', target: 80 },
        { name: 'Storytelling & Presentation', target: 80 },
      ],
    },
  ],
  ECE: [
    {
      id: 'role-ece-1',
      title: 'Embedded Systems & Firmware Engineer',
      branch: 'ECE',
      description: 'Develop low-level bare-metal and RTOS firmware for microcontrollers and IoT devices.',
      requiredSkills: [
        { name: 'Embedded C / C++', target: 90 },
        { name: 'ARM Cortex & Microcontrollers', target: 85 },
        { name: 'Communication Protocols (I2C/SPI/CAN)', target: 85 },
        { name: 'RTOS (FreeRTOS)', target: 80 },
        { name: 'Hardware Debugging & Oscilloscopes', target: 80 },
        { name: 'PCB Layout & Schematics', target: 70 },
      ],
    },
    {
      id: 'role-ece-2',
      title: 'VLSI & Digital ASIC Design Engineer',
      branch: 'ECE',
      description: 'Design digital logic IP cores, write Verilog/SystemVerilog, and perform timing closure.',
      requiredSkills: [
        { name: 'Verilog / SystemVerilog', target: 90 },
        { name: 'Digital Electronics & FSMs', target: 90 },
        { name: 'Static Timing Analysis (STA)', target: 80 },
        { name: 'ASIC/FPGA Design Flow', target: 85 },
        { name: 'Scripting (Tcl / Python)', target: 75 },
      ],
    },
  ],
  EEE: [
    {
      id: 'role-eee-1',
      title: 'EV Powertrain & Power Electronics Engineer',
      branch: 'EEE',
      description: 'Design inverter drives, battery management systems, and high-voltage DC-DC converters.',
      requiredSkills: [
        { name: 'Power Electronics & Converters', target: 90 },
        { name: 'MATLAB & Simulink', target: 85 },
        { name: 'Motor Drives & PMSM Control', target: 85 },
        { name: 'Battery Management Systems (BMS)', target: 80 },
        { name: 'Thermal & High Voltage Safety', target: 75 },
      ],
    },
  ],
  Mechanical: [
    {
      id: 'role-mech-1',
      title: 'Mechanical Design & FEA Engineer',
      branch: 'Mechanical',
      description: 'Perform parametric 3D CAD modeling, structural FEA stress, and thermal simulations.',
      requiredSkills: [
        { name: '3D CAD (SolidWorks/Creo)', target: 90 },
        { name: 'Finite Element Analysis (ANSYS)', target: 85 },
        { name: 'GD&T & Drafting Standards', target: 85 },
        { name: 'Mechanics of Materials', target: 85 },
        { name: 'Design for Manufacturing (DFM)', target: 80 },
      ],
    },
  ],
  Civil: [
    {
      id: 'role-civ-1',
      title: 'Structural Design & BIM Engineer',
      branch: 'Civil',
      description: 'Design reinforced concrete and steel structures, generate BIM models and rebar schedules.',
      requiredSkills: [
        { name: 'Structural Analysis (ETABS/STAAD)', target: 90 },
        { name: 'AutoCAD & Revit BIM', target: 85 },
        { name: 'RCC & Steel Design (IS Codes)', target: 85 },
        { name: 'Geotechnical Soil Mechanics', target: 75 },
        { name: 'Quantity Survey & Estimation', target: 80 },
      ],
    },
  ],
};

export const sampleSkillGaps: Record<string, SkillGapItem[]> = {
  'role-cse-1': [
    {
      skill: 'Data Structures & Algorithms',
      category: 'Core',
      currentLevel: 75,
      requiredLevel: 85,
      status: 'Weak',
      recommendation: 'Practice dynamic programming and advanced graph traversal patterns on LeetCode/SkillBridge DSA drills.',
    },
    {
      skill: 'System Design & Architecture',
      category: 'Domain',
      currentLevel: 45,
      requiredLevel: 80,
      status: 'Missing',
      recommendation: 'Study caching strategies, database partitioning, and rate-limiting patterns in the Learning Resources library.',
    },
    {
      skill: 'Database Management (SQL/NoSQL)',
      category: 'Core',
      currentLevel: 85,
      requiredLevel: 85,
      status: 'Strong',
      recommendation: 'Strong foundation! Continue optimizing query execution plans and indexing techniques.',
    },
    {
      skill: 'Backend Engineering (Node/Java/Go)',
      category: 'Core',
      currentLevel: 80,
      requiredLevel: 85,
      status: 'Strong',
      recommendation: 'Solid skills. Build the Distributed Task Orchestrator project to test concurrency.',
    },
    {
      skill: 'Frontend Frameworks (React/Vue)',
      category: 'Core',
      currentLevel: 85,
      requiredLevel: 80,
      status: 'Strong',
      recommendation: 'Exceeds requirement. Good grasp of component lifecycle and modern hooks.',
    },
    {
      skill: 'CI/CD & Docker',
      category: 'Tool',
      currentLevel: 40,
      requiredLevel: 75,
      status: 'Missing',
      recommendation: 'Set up multi-stage Docker builds and automated GitHub Actions workflows for existing projects.',
    },
  ],
};
