// ─────────────────────────────────────────────────────────────────────────────
// EDIT YOUR CONTENT HERE
// Everything on the site is driven by this file. Swap text, links and images
// below — no need to touch the components.
// ─────────────────────────────────────────────────────────────────────────────

// Prefix for static files in /public so they resolve under a GitHub Pages subpath.
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${base}${path}`;

export const profile = {
  wordmark: { top: "ABHISHEK", bottom: "KUMAR" },
  name: "Abhishek Kumar",
  // Big scrolling text across the bottom of the hero.
  marquee: "ABHISHEK KUMAR",
  eyebrow: "FULL STACK DEVELOPER",
  headline: ["Building Scalable", "Web Applications"],
  // Portrait shown in the hero (lives in /public).
  photo: asset("/portrait.png"),
  initials: "AK",
  resumeUrl: asset("/Abhishek-Kumar-Resume.pdf"),
  email: "myselfabhishekthakur@gmail.com",
  phone: "+91 81269 02247",
  location: "Ghaziabad, India",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  paragraph:
    "I'm a Full Stack Developer with 7 years of experience building scalable web applications, with strong expertise in React.js, Next.js, and modern frontend architecture. I develop high-performance UI components and integrate them with robust backend services built using Node.js and NestJS. I spent almost four years across R Systems and GenAquarius contributing to enterprise-grade systems for Station Casinos — building both frontend applications and backend APIs. Skilled across the React ecosystem, API integrations, performance optimization, and microservice-based backend development, I thrive in Agile teams, collaborating with designers, backend engineers, and product stakeholders to deliver reliable, scalable solutions. Outside of tech, I am an avid guitarist and singer, having performed on Indian Idol and various other reality shows, and I have a deep passion for traveling.",
};

export type Experience = {
  role: string;
  company: string;
  companyHref?: string;
  period: string;
  description: string;
  badge: string;
  logo?: string;
};

export const experience: Experience[] = [
  {
    role: "Senior Full Stack Developer",
    company: "GenAquarius",
    period: "Oct 2025 — Mar 2026",
    description:
      "Contract → Full-time (Feb 2026) · Continued development of the Station Casinos Labor System after its migration from R Systems, ensuring & maintaining smooth functionality. Developed web applications with React.js and Next.js, integrated REST APIs, and built features (including LLM and RAG integrations) to automate workflows, including an interactive chatbot.",
    badge: "G",
  },
  {
    role: "Senior Software Developer",
    company: "R Systems",
    period: "Dec 2021 — Oct 2025",
    description:
      "Owned end-to-end feature delivery for enterprise casino management systems. Built reusable React.js/Next.js UI with SSR and performance optimization, designed Node.js + NestJS backend services and microservices, implemented auth and API error handling, set up CI/CD in Azure DevOps, and wrote unit/integration tests with Jest.",
    badge: "R",
  },
  {
    role: "Front End Developer",
    company: "K-12 Learning Solutions",
    period: "Feb 2021 — Nov 2021",
    description:
      "Developed responsive user interfaces with React.js, HTML5, CSS3 and JavaScript. Built reusable components, implemented dynamic data rendering and REST API integration, and ensured cross-browser compatibility across devices.",
    badge: "K",
  },
  {
    role: "Junior Front End Developer",
    company: "Virtual Employee",
    period: "Mar 2019 — Jan 2021",
    description:
      "Built responsive front-end layouts with HTML, CSS and JavaScript from design mockups, customized WordPress themes using PHP, created reusable UI, optimized performance, and managed source code with Git.",
    badge: "V",
  },
];

export type Project = {
  name: string;
  category: string;
  blurb: string;
  role: string;
  timeline: string;
  demo?: string;
  github?: string;
  images: string[];
  stats: { value: string; label: string }[];
  overview: string;
  problem: string;
  features: { title: string; description: string }[];
  tech: { frontend: string[]; backend: string[]; database: string[] };
  challenges: { challenge: string; solution: string }[];
  learnings: string[];
  roadmap: string[];
  isPersonal?: boolean;
};

export const projects: Project[] = [
  {
    name: "CVCraft",
    category: "Full Stack · SaaS",
    blurb: "Online CV Maker & Resume Builder with real-time editing and PDF exports.",
    role: "Full Stack Developer",
    timeline: "2026",
    demo: "https://cv-craft-seven.vercel.app/",
    images: [asset("/cv-craft.png")],
    stats: [
      { value: "13+", label: "TEMPLATES" },
      { value: "Real-time", label: "COMPILER" },
      { value: "ATS-Proof", label: "DESIGNS" },
    ],
    overview:
      "CVCraft is an online resume builder and CV maker designed to bypass the limitations of word processors. Developed with Next.js and NestJS, the application provides an optimized split-screen live editing experience with PDF export functionality, enabling candidates to build ATS-compatible resumes.",
    problem:
      "Formatting resumes using traditional tools like Microsoft Word is notoriously frustrating and often produces layouts that fail to pass through ATS parsing rules, costing candidates opportunities.",
    features: [
      { title: "13 Custom Templates", description: "Carefully designed styles including Cascade, Diamond, and Minimalist matching real-world guidelines." },
      { title: "Real-time Editing", description: "Form changes reflect immediately on the live document preview pane without page reloads." },
      { title: "Export to PDF", description: "One-click A4 styled browser print vectors preserve formatting, graphics, and page constraints." },
      { title: "Typography & Colors", description: "Choose from 9+ select professional fonts (Calibri, Arial, Georgia) and infinite colors." },
    ],
    tech: {
      frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "NestJS", "REST APIs"],
      database: ["PostgreSQL"],
    },
    isPersonal: true,
    challenges: [
      {
        challenge: "Rendering form state changes in a separate high-fidelity A4 print preview screen in real-time.",
        solution: "Structured centralized React context combined with debounced state synchronization to ensure zero layout rendering lag during typing.",
      },
      {
        challenge: "Generating pixel-perfect PDF prints matching page dimensions and layout grids.",
        solution: "Engineered customized Tailwind print directives and CSS break points, utilizing native browser vector print settings to guarantee correct formatting on export.",
      },
    ],
    learnings: [
      "Understanding Applicant Tracking System (ATS) parsing behavior to design compliant layouts.",
      "Optimizing complex form interactions and high-performance state syncing in React.",
    ],
    roadmap: ["AI-powered content recommendations for job descriptions.", "Interactive analytics to track resume view counts by recruiters."],
  },
  {
    name: "ExcelWeb",
    category: "Full Stack · SaaS",
    blurb: "Transform unformatted text, logs, and document tables into spreadsheets instantly.",
    role: "Full Stack Developer",
    timeline: "2026",
    demo: "https://createexcelfile.vercel.app/",
    images: [asset("/excel-web.png")],
    stats: [
      { value: "Instant", label: "CONVERSION" },
      { value: "95.5%", label: "OCR ACCURACY" },
      { value: "100%", label: "COMPATIBILITY" },
    ],
    overview:
      "ExcelWeb is a precision data engineering application designed to parse raw text, data streams, and document tables (PDF/DOCX) into clean Excel files. Built with Next.js and NestJS, it includes smart text instructions for spreadsheet editing, such as automatic headers format, data types casting, and custom formulas.",
    problem:
      "Parsing tabular data out of messy text blocks, log printouts, and multi-page documents to assemble correct Excel files with custom headers takes hours of repetitive manual data entry.",
    features: [
      { title: "Text to Excel", description: "Convert unstructured, CSV, TSV, or pipe-separated logs into columnized sheets." },
      { title: "Document Upload", description: "Extract tables from DOC, DOCX, and PDF documents with a high success rate." },
      { title: "Smart Natural Language Editing", description: "Execute formatting commands (e.g., currency casing, header cleanups) instantly using simple text prompts." },
      { title: "Production-Ready Exports", description: "Creates spreadsheets with aligned data types, locked headers, and auto-filters enabled." },
    ],
    tech: {
      frontend: ["React", "Next.js", "Tailwind CSS"],
      backend: ["Node.js", "NestJS", "REST APIs"],
      database: ["PostgreSQL"],
    },
    isPersonal: true,
    challenges: [
      {
        challenge: "Extracting structured data tables out of unstructured, arbitrary raw text blocks.",
        solution: "Engineered pattern-matching parser rules and schema heuristic rules to determine table borders and pre-classify column structures.",
      },
      {
        challenge: "Processing heavy document parsing and OCR tasks without blocking request loops.",
        solution: "Offloaded document extraction tasks onto an isolated background worker service powered by a RabbitMQ job queue.",
      },
    ],
    learnings: [
      "Custom binary OpenXML stream rendering in Node.js.",
      "Scalable queuing architectures using RabbitMQ and isolated background workers.",
    ],
    roadmap: ["Formula recommendation integrations using local LLMs.", "Batch file upload with multi-sheet merging support."],
  },
  {
    name: "JSFlow",
    category: "Full Stack · DevTool",
    blurb: "Understand every line of JavaScript with visual compilation and voice explanations.",
    role: "Full Stack Developer",
    timeline: "2026",
    demo: "https://jsflow-sand.vercel.app/",
    images: [asset("/jsflow.png")],
    stats: [
      { value: "Visual", label: "MEMORY PROFILE" },
      { value: "Audio", label: "VOICE EXPLANATIONS" },
      { value: "Step-by-Step", label: "AST COMPILER" },
    ],
    overview:
      "JSFlow is a step-by-step visual JavaScript learning compiler. It parses JavaScript code into an Abstract Syntax Tree (AST) to visualize variables, loop transitions, call stack frames, memory allocations, and console outputs dynamically, while providing automated voice-guided code descriptions.",
    problem:
      "Conceptualizing abstract execution flow features like variable scopes, closures, memory allocation, and the call stack is highly challenging for beginner developers when using static tutorials.",
    features: [
      { title: "AST Compiler", description: "Generates custom code snapshot timelines for line-by-line step execution." },
      { title: "State Visualizer", description: "Renders scopes, variable values, Call Stack frames, and Heap pointer allocations dynamically." },
      { title: "Voice Explainer", description: "Triggers voice commentary describing the engine execution steps audibly." },
      { title: "Standard Examples", description: "Interactive pre-loaded scripts covering loops, functions, arrays, and objects." },
    ],
    tech: {
      frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "NestJS", "REST APIs"],
      database: ["PostgreSQL"],
    },
    isPersonal: true,
    challenges: [
      {
        challenge: "Creating a step-by-step debugger framework inside browser runtimes.",
        solution: "Built a customized AST parser interpreter using visitor pattern traversal to compile snapshots of scope variables.",
      },
      {
        challenge: "Coordinating real-time TTS audio tracks with visual statement highlights.",
        solution: "Structured queue managers using standard SpeechSynthesis callbacks synchronized with the step player timeline.",
      },
    ],
    learnings: [
      "Interpreting Abstract Syntax Trees (ASTs) for custom JavaScript execution paths.",
      "Syncing Speech Synthesis Web Audio APIs dynamically with animation frames.",
    ],
    roadmap: ["Add module imports and async/await tracing.", "Visualize closures and lexically nested scopes."],
  },
  {
    name: "Teleprompt Pro",
    category: "Mobile App · React Native",
    blurb: "Professional video recording studio with high-performance autoscrolling teleprompter and real-time overlays.",
    role: "Lead Developer",
    timeline: "2026",
    images: [
      asset("/teleprompt-home.png"),
      asset("/teleprompt-settings.png"),
      asset("/teleprompt-create.jpg"),
      asset("/teleprompt-camera.jpg"),
    ],
    stats: [
      { value: "4K", label: "VIDEO CAPTURE" },
      { value: "60 FPS", label: "SMOOTH SCROLLING" },
      { value: "8", label: "LIVE FILTERS" },
    ],
    overview:
      "Teleprompt Pro is a professional, high-performance video recording studio and teleprompter application built for mobile content creators, anchors, and presenters. The app allows users to write or import scripts and read them from a smooth, custom-scrolling overlay while recording high-definition video (up to 4K) using front or back cameras. By placing the scrolling text close to the camera lens and offering advanced configuration options (like horizontal text mirroring and countdown timers), it ensures that presenters maintain natural, direct eye contact with their audience.",
    problem:
      "Content creators struggle to record high-quality videos while reading long scripts. Looking away from the lens to check notes breaks audience engagement, and traditional recording setups require expensive, bulky teleprompter hardware or external monitors.",
    features: [
      { title: "Smart Teleprompter Overlay", description: "Placed at the top near the camera sensor to help creators maintain natural eye contact during recordings." },
      { title: "Autoscrolling Engine", description: "Stutter-free scrolling powered by react-native-reanimated running on the UI thread with customizable speeds." },
      { title: "High-Definition Capture", description: "Supports video recording up to 4K resolution (2160p) with camera facings and torch options." },
      { title: "Live Video Filters", description: "8 real-time visual filter overlays (like Cinematic Teal, Sunset Glow, Noir) with SVG vignettes." },
      { title: "Physical Rig Support", description: "Horizontal text mirroring option to accommodate professional physical glass/mirror teleprompter hardware." },
      { title: "Script Manager", description: "Interactive editor with real-time word and character counters, quick creation, and deletion." },
    ],
    tech: {
      frontend: ["React Native", "TypeScript", "Expo (SDK 54)", "Reanimated", "Expo Camera", "SVG"],
      backend: ["Offline First"],
      database: ["On-device Storage"],
    },
    isPersonal: true,
    challenges: [
      {
        challenge: "Teleprompter text truncation on large scripts due to GPU texture size limits on rendering single large Text blocks.",
        solution: "Implemented a word-count-based chunking algorithm that splits scripts into paragraphs of 150 words maximum and renders them as separate sequential text elements.",
      },
      {
        challenge: "Videos recorded with the front-facing camera appeared reversed when played back, mismatching the live-mirrored preview.",
        solution: "Adjusted camera preview and saving configuration to ensure recorded output matching the live mirrored orientation.",
      },
      {
        challenge: "Native camera simulator crashes on iOS Xcode or Android simulators due to missing physical camera hardware.",
        solution: "Configured useCamera hook error boundaries to detect emulator environments and gracefully fall back to a mock recording mode for testing.",
      },
    ],
    learnings: [
      "Optimizing heavy UI tasks like 60fps autoscrolling on the UI thread while capturing 4K video streams.",
      "Handling dynamic file permissions, front/back camera configurations, and video output mirroring in React Native.",
      "Adapting mobile applications for physical hardware integrations (mirror teleprompt rigs).",
    ],
    roadmap: [
      "Voice-activation (autoscroll follows speaker's speech rate).",
      "Dynamic background music integration and audio waveform visualizers.",
      "Cloud script syncing and team sharing dashboard.",
    ],
  },
  {
    name: "Station Casinos Labor System",
    category: "Enterprise · Full Stack",
    blurb: "Workforce management platform for Station Casinos.",
    role: "Full Stack Developer",
    timeline: "2021 — 2026",
    demo: "https://stationcasinos.com/",
    images: [],
    stats: [
      { value: "4+ Yrs", label: "PROJECT SPAN" },
      { value: "6", label: "TEAM SIZE" },
      { value: "Enterprise", label: "SCALE" },
    ],
    overview:
      "An enterprise Labor System that manages team availability, schedule creation, and labor-data volume tracking for workforce planning. I built and maintained the platform across its migration from R Systems to GenAquarius, ensuring continuity of features and reliability.",
    problem:
      "Casino operations require dependable workforce planning across large teams. The Labor System centralizes availability, scheduling and labor-volume tracking into a single, performant interface.",
    features: [
      { title: "Team Availability", description: "Manage staff availability across shifts and roles." },
      { title: "Schedule Creation", description: "Build, edit and publish workforce schedules." },
      { title: "Labor Data Tracking", description: "Track labor volume for accurate planning." },
      { title: "SSR & Performance", description: "Next.js server-side rendering for fast loads." },
    ],
    tech: {
      frontend: ["React", "Next.js", "Material UI"],
      backend: ["Node.js", "NestJS", "REST APIs"],
      database: ["MongoDB", "MySQL"],
    },
    challenges: [
      {
        challenge: "Maintaining functionality through a company migration (R Systems → GenAquarius)",
        solution: "Ensured a smooth handover with thorough documentation, tests, and continued feature development.",
      },
      {
        challenge: "Performance with large workforce datasets",
        solution: "Optimized React state management and rendering, and added server-side rendering with Next.js.",
      },
    ],
    learnings: [
      "Owning enterprise features end-to-end within Agile sprints.",
      "Building maintainable, microservice-style backends with NestJS.",
    ],
    roadmap: ["Gen-AI assisted scheduling suggestions.", "Expanded workforce analytics dashboards."],
  },
  {
    name: "K-12 Learning Platform",
    category: "Frontend · React",
    blurb: "Responsive UI for an e-learning platform.",
    role: "Front End Developer",
    timeline: "2021",
    images: [],
    stats: [
      { value: "12", label: "TEAM SIZE" },
      { value: "Responsive", label: "DESIGN" },
      { value: "REST", label: "API INTEGRATION" },
    ],
    overview:
      "Built responsive, component-based user interfaces for a K-12 e-learning platform using React, focusing on reusable components and a clean, maintainable structure.",
    problem:
      "Learning platforms must render dynamic content quickly and work seamlessly across devices for students and educators.",
    features: [
      { title: "Reusable Components", description: "Component-based architecture for consistency." },
      { title: "Dynamic Rendering", description: "Data-driven UI with REST API integration." },
      { title: "Cross-Device", description: "Responsive design across browsers and devices." },
    ],
    tech: {
      frontend: ["React", "HTML5/CSS3", "JavaScript"],
      backend: ["REST APIs"],
      database: ["External Services"],
    },
    challenges: [
      {
        challenge: "Slow rendering with large data sets",
        solution: "Applied optimized React rendering techniques to improve performance and UX.",
      },
    ],
    learnings: [
      "Structuring scalable React component hierarchies.",
      "Integrating frontend cleanly with backend REST services.",
    ],
    roadmap: ["Add offline-first content caching."],
  },
  {
    name: "College Vidya Courses Portal",
    category: "Frontend · React",
    blurb: "AI-Powered course matching and selection portal for online universities.",
    role: "React JS Developer (Support)",
    timeline: "2020 — 2021",
    demo: "https://collegevidya.in/partner-online-courses/",
    images: [asset("/college-vidya.png")],
    stats: [
      { value: "1 Lakh+", label: "STUDENTS TRUSTED" },
      { value: "500+", label: "EXPERT MENTORS" },
      { value: "AI-Powered", label: "SUGGESTIONS" },
    ],
    overview:
      "College Vidya is an AI-powered course search and recommendation portal guiding students to suitable online and distance learning universities. As part of my support role, I contributed to form validations, responsiveness updates, and visual component layout enhancements.",
    problem:
      "Students struggle to choose the best distance/online university due to a lack of transparent fee data, ratings, and course information across institutions.",
    features: [
      { title: "AI-Powered Finder", description: "Asks questions and matches students with approved universities in 2 minutes." },
      { title: "Dynamic Comparison", description: "Compares fees, credentials, and learning parameters of top universities side-by-side." },
      { title: "Course Cataloging", description: "Displays available online MBA, MCA, and M.Com course curriculums and eligibility guidelines." },
    ],
    tech: {
      frontend: ["React", "JavaScript", "Bootstrap", "HTML5/CSS3"],
      backend: ["REST APIs"],
      database: ["MySQL"],
    },
    challenges: [
      {
        challenge: "Developing smooth mobile layouts for course selection sliders and interactive modals.",
        solution: "Configured clean CSS grid rules and responsive design properties using Bootstrap and vanilla styles.",
      },
      {
        challenge: "Ensuring form inputs validate accurately across multiple steps of the matching process.",
        solution: "Refined client-side validation logic and error feedback states in React to improve form submission rates.",
      },
    ],
    learnings: [
      "Translating Figma mockups into responsive React views under tight layouts.",
      "Handling client-side input safety and verification structures across multi-step forms.",
    ],
    roadmap: ["Direct consultant chat support via dashboard integrations.", "University admission fee payment tracking widgets."],
  },
];

// Devicon CDN slugs. Unknown icons fall back to a lettered tile automatically.
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const icon = (slug: string, file = "original") =>
  `${DEVICON}/${slug}/${slug}-${file}.svg`;

export type Skill = { name: string; icon?: string };
export type SkillGroup = { index: string; category: string; items: Skill[] };

export const skills: SkillGroup[] = [
  {
    index: "01",
    category: "Languages",
    items: [
      { name: "JavaScript", icon: icon("javascript") },
      { name: "PHP", icon: icon("php") },
      { name: "HTML/CSS", icon: icon("html5") },
      { name: "MySQL", icon: icon("mysql") },
    ],
  },
  {
    index: "02",
    category: "Frontend",
    items: [
      { name: "React", icon: icon("react") },
      { name: "Next.js", icon: icon("nextjs") },
      { name: "Vue.js", icon: icon("vuejs") },
      { name: "Tailwind", icon: icon("tailwindcss") },
      { name: "Material UI", icon: icon("materialui") },
      { name: "Bootstrap", icon: icon("bootstrap") },
      { name: "Sass/SCSS", icon: icon("sass") },
    ],
  },
  {
    index: "03",
    category: "Backend",
    items: [
      { name: "Node.js", icon: icon("nodejs") },
      { name: "NestJS", icon: icon("nestjs") },
      { name: "MongoDB", icon: icon("mongodb") },
      { name: "PostgreSQL", icon: icon("postgresql") },
      { name: "GraphQL", icon: icon("graphql", "plain") },
      { name: "RabbitMQ", icon: icon("rabbitmq") },
      { name: "REST APIs" },
    ],
  },
  {
    index: "04",
    category: "Tools & Others",
    items: [
      { name: "Git", icon: icon("git") },
      { name: "Azure DevOps", icon: icon("azure") },
      { name: "AWS", icon: icon("amazonwebservices", "original-wordmark") },
      { name: "Postman", icon: icon("postman") },
      { name: "Jest", icon: icon("jest", "plain") },
      { name: "VS Code", icon: icon("vscode") },
      { name: "ChatGPT / Copilot" },
      { name: "Gen AI (LLM/RAG)" },
    ],
  },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhishek-kumar-thakur-114846171/" },
  { label: "GitHub", href: "https://github.com/myselfabhishekthakur-ui" },
];

export const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Disclaimer", href: "#" },
];
