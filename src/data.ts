// Content is taken from Mustansar Munir's CV and his own instructions. Do not add unverified claims.

export const profile = {
  name: 'Mustansar Munir',
  role: 'AI Automation Engineer',
  location: 'Islamabad, Pakistan',
  email: 'mustansarm285@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mustansar-munir-27609131a/',
  /** WhatsApp in international format, digits only, for wa.me links. */
  whatsapp: '923175223044',
  whatsappDisplay: '+92 317 5223044',
  github: 'https://github.com/mustansarm285-create' as string,
}

export const about = {
  intro:
    "I'm an AI Automation Engineer in Islamabad. Since 2023 I've designed and deployed production machine-learning systems, autonomous multi-agent workflows and LLM applications with retrieval-augmented generation, together with the backend and cloud infrastructure that runs them in real time.",
  now: 'Today I build AI voice agents at Nemax AI and AI automation systems at Boost Agency.',
  stats: [
    { value: '2023', label: 'Shipping production AI since' },
    { value: '5', label: 'Engineering teams' },
    { value: '6', label: 'Projects in this portfolio' },
    { value: 'B.E.', label: 'Computer Engineering, 2026' },
  ],
}

export const services = [
  { title: 'AI Voice Agents', body: 'Inbound and outbound voice receptionists and sales agents that qualify leads, book appointments and follow up.' },
  { title: 'Multi-Agent Systems', body: 'Autonomous agents and custom LLM tools on OpenAI, Claude and Gemini that execute real business workflows.' },
  { title: 'RAG & Knowledge Retrieval', body: 'Grounded retrieval pipelines on LangChain, LlamaIndex, Pinecone and ChromaDB that reduce hallucinations.' },
  { title: 'Workflow Automation', body: 'Webhooks, queues, ETL pipelines and CRM sync engines that take manual work out of operations.' },
  { title: 'Backend & Cloud', body: 'Async FastAPI services, Docker containers and CI/CD deployment on AWS EC2, S3 and Lambda.' },
  { title: 'Computer Vision & Robotics', body: 'OpenCV pipelines, sensor fusion and ROS2 SLAM navigation on embedded hardware.' },
]

export interface Project {
  id: string
  title: string
  tag: string
  /** one line for the card */
  short: string
  summary?: string
  problem?: string
  contribution?: string[]
  stack?: string[]
  /** Illustrative stock photo (Unsplash License). Not a screenshot of the project itself. */
  photo: { id: string; alt: string; credit: string; profile: string }
  /** true while the full write-up has not been provided yet */
  pending?: boolean
  /** label such as 'Concept · Prototype' shown on the card and in the detail view */
  status?: string
  /** key modules or capabilities, shown in the detail view */
  highlights?: string[]
}

/** The three projects shown on the home page. */
export const featured: Project[] = [
  {
    id: 'ai-receptionist',
    title: 'AI Receptionist — Multi-Agent Appointment Booking',
    tag: 'Voice AI · Multi-agent',
    short: 'A multi-agent AI receptionist that answers calls and books appointments.',
    photo: { id: 'photo-1759143545924-beb85b33c0f1', alt: 'Receptionist using a tablet at a front desk', credit: 'Bluestonex', profile: 'bluestonex_apphaus' },
    pending: true,
  },
  {
    id: 'legalflow',
    title: 'LegalFlow AI — Law Firm Automation',
    tag: 'Legal tech · Automation',
    status: 'Concept · Prototype',
    short: 'An AI automation ecosystem for US law firms, from the first call to billing, with attorneys in control.',
    summary:
      'An integrated AI automation ecosystem concept for US law firms: AI voice receptionist, lead generation, client intake & CRM, scheduling, document intelligence, case management, email & WhatsApp automation, a cited knowledge assistant and billing, all sharing one client record.',
    problem:
      'Law firm front offices juggle missed calls, manual intake, scattered documents and disconnected tools, while every new inquiry needs a fast, careful response.',
    contribution: [
      'Designed the ten-module product and layered FastAPI architecture around one shared client record',
      'Designed the voice intake, lead qualification, document intelligence and RAG assistant workflows',
      'Specified safeguards: conflict checks, attorney supervision, human approval for sensitive messages, role-based access and audit logging',
      'Built an interactive front-end prototype with synthetic demo data',
    ],
    highlights: [
      'AI voice receptionist', 'Lead generation', 'Intake & CRM', 'Conflict checks', 'Calendar & reminders',
      'Document intelligence', 'Case management', 'Email & WhatsApp', 'Knowledge assistant (RAG)', 'Billing', 'Analytics',
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'OpenAI', 'RAG', 'Twilio / Vapi', 'n8n'],
    photo: { id: 'photo-1758518731462-d091b0b4ed0d', alt: 'Lawyer meeting a client in a bright office', credit: 'Vitaly Gariev', profile: 'silverkblack' },
  },
]

/** Further CV projects, listed compactly and opened in the same detail view. */
export const moreWork: Project[] = [
  {
    id: 'rag-saas',
    title: 'Enterprise Multi-Agent RAG Platform',
    tag: 'SaaS · Knowledge retrieval',
    short: 'Multi-agent framework for context-aware enterprise knowledge retrieval.',
    summary: 'A production-ready multi-agent framework that orchestrates autonomous tasks and retrieves context-aware knowledge across an enterprise.',
    problem: 'Enterprise knowledge sits scattered across documents and systems, so answers are slow to find and generic LLMs hallucinate without grounding.',
    contribution: [
      'Engineered the multi-agent framework with LangChain and LlamaIndex',
      'Built low-latency semantic search on Pinecone and ChromaDB',
      'Optimised agent scheduling and async background workers for high concurrent load',
    ],
    stack: ['LangChain', 'LlamaIndex', 'Pinecone', 'ChromaDB', 'Docker', 'AWS'],
    photo: { id: 'photo-1558494949-ef010cbdcc31', alt: 'Server rack with network cabling', credit: 'Taylor Vick', profile: 'tvick' },
  },
  {
    id: 'automation',
    title: 'AI Business Process Automation',
    tag: 'Boost Agency · Client work',
    short: 'Automation workflows and agents for client acquisition, support and reporting.',
    summary: 'End-to-end AI automation workflows and autonomous agents that handle client acquisition, customer support and workflow execution.',
    problem: 'Manual lead handling, support and reporting slow operations down and leave CRM data out of sync.',
    contribution: [
      'Architected Python + REST API automation workflows on integration platforms',
      'Built multi-agent systems and custom LLM tools with OpenAI and Claude',
      'Hardened async webhooks and queues for concurrent traffic with fail-safe handling',
      'Implemented ETL pipelines and CRM sync engines for accurate reporting',
    ],
    stack: ['Python', 'OpenAI', 'Claude', 'REST APIs', 'Webhooks', 'ETL'],
    photo: { id: 'photo-1551288049-bebda4e38f71', alt: 'Analytics dashboard on a laptop screen', credit: 'Luke Chesser', profile: 'lukechesser' },
  },
  {
    id: 'unimind',
    title: 'UniMind — AI Academic Assistant',
    tag: 'EdTech · Generative AI',
    short: 'Conversational retrieval over course documents for students.',
    summary: 'An end-to-end academic AI platform that indexes course documents and lets students retrieve answers through conversation.',
    problem: 'Students lose time searching through lecture notes and documents for the specific answer they need.',
    contribution: [
      'Built the platform on the Google Gemini API with ChromaDB vector search',
      'Automated document indexing and retrieval',
      'Implemented persistent conversation memory and role-based authentication',
    ],
    stack: ['FastAPI', 'Gemini API', 'ChromaDB', 'React'],
    photo: { id: 'photo-1515378960530-7c0da6231fb1', alt: 'Person working on a laptop', credit: 'Christin Hume', profile: 'christinhumephoto' },
  },
  {
    id: 'rover',
    title: 'Autonomous Campus Rover',
    tag: 'Final year project · Robotics',
    short: 'ROS2 + SLAM rover for campus guidance with live telemetry.',
    summary: 'An intelligent autonomous rover for campus guidance and exploration, mapping and navigating dynamic environments in real time.',
    problem: 'Guiding visitors through a busy, changing campus needs real-time localisation, path planning and safe collision avoidance.',
    contribution: [
      'Built on ROS2 and Jetson Nano with SLAM for real-time localisation and paths',
      'Integrated computer vision and sensor fusion for object detection and collision avoidance',
      'Built an async FastAPI backend streaming telemetry to a live monitoring app',
    ],
    stack: ['ROS2', 'SLAM', 'Jetson Nano', 'Python', 'FastAPI', 'OpenCV'],
    photo: { id: 'photo-1743611978046-9723d29b99cb', alt: 'Small wheeled robot on a campus sidewalk', credit: 'Leiada Krözjhen', profile: 'leiadakrozjhen' },
  },
]

export interface Role {
  company: string
  role: string
  period: string
  note?: string
  /** one-line summary shown in the timeline */
  line: string
  /** full detail, shown when the entry is expanded */
  points: string[]
}

export const experience: Role[] = [
  {
    company: 'Nemax AI',
    role: 'AI Automation Engineer / AI Voice Agent Developer',
    period: 'Jun 2025 — Present',
    note: 'Part-time',
    line: 'Voice receptionists and sales agents that qualify leads, book appointments and automate follow-ups.',
    points: [
      'Built conversational AI voice agents with natural customer conversations and business-specific workflows for inbound and outbound calls',
      'Designed sales conversations that qualify customers, capture requirements, identify buying intent and route qualified leads to sales teams',
      'Supported appointment booking and automated follow-ups',
      'Connected voice agents to business workflows to automate repetitive interactions and improve lead response',
    ],
  },
  {
    company: 'Boost Agency',
    role: 'Automation Engineer',
    period: 'Jul 2024 — Present',
    note: 'Islamabad',
    line: 'End-to-end AI automation, multi-agent LLM tools, webhooks, ETL and CRM sync.',
    points: [
      'End-to-end AI automation workflows with Python, custom REST APIs and integration platforms',
      'Multi-agent systems and LLM tools (OpenAI, Claude) for client acquisition, support and workflow execution',
      'Async webhooks, queues and API endpoints with fail-safe exception handling',
      'Automated data extraction, ETL pipelines and CRM sync engines',
    ],
  },
  {
    company: 'TechGIS',
    role: 'AI / ML Engineer',
    period: 'May 2023 — Jun 2024',
    note: 'Islamabad',
    line: 'Production RAG pipelines, LLM integrations and FastAPI services on AWS.',
    points: [
      'Production RAG pipelines with LangChain, LlamaIndex, Pinecone and ChromaDB for enterprise SaaS',
      'Integrated OpenAI, Claude and Gemini models, reducing hallucinations via strict prompt engineering',
      'Async FastAPI services, Docker and CI/CD deployment on AWS EC2, S3 and Lambda',
      'Refactored legacy code to speed up queries and reduce API latency for analytics dashboards',
    ],
  },
  {
    company: 'NIC Lab',
    role: 'AI Software Engineering Intern',
    period: '6 months',
    note: 'Islamabad',
    line: 'ML data pipelines, computer vision research and model evaluation.',
    points: [
      'Data preprocessing, validation and automated extraction scripts in Python for ML training datasets',
      'OpenCV computer vision pipelines for research-oriented object detection and visual recognition',
      'Modular model evaluation frameworks to bench-test accuracy and improve deployment stability',
    ],
  },
  {
    company: 'ITSolera',
    role: 'Data Science Intern',
    period: '3 months',
    note: 'Remote',
    line: 'Exploratory data analysis and SQL data validation.',
    points: [
      'Exploratory data analysis and statistical preprocessing of structured and unstructured datasets in Python',
      'SQL-based data validation and automated extraction workflows to improve data quality and reporting speed',
    ],
  },
]

export const skills = [
  { group: 'AI & agents', items: ['OpenAI', 'Claude', 'Gemini', 'Multi-agent systems', 'Voice agents', 'Prompt engineering'] },
  { group: 'RAG & data', items: ['LangChain', 'LlamaIndex', 'Pinecone', 'ChromaDB', 'PostgreSQL', 'MongoDB'] },
  { group: 'Automation & backend', items: ['Python', 'FastAPI', 'Node.js', 'REST APIs', 'Webhooks', 'ETL'] },
  { group: 'Cloud & tooling', items: ['AWS', 'Docker', 'CI/CD', 'Git', 'TypeScript'] },
  { group: 'Vision & robotics', items: ['OpenCV', 'ROS2', 'SLAM', 'Jetson Nano'] },
]

export const education = {
  degree: 'B.E. Computer Engineering',
  school: 'NUTECH, Islamabad',
  period: '2022 — 2026',
  cert: 'NAVTTC Certification in AI & ML',
}
