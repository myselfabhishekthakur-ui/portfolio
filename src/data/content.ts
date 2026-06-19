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
  eyebrow: "GEN AI · FULL STACK DEVELOPER",
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
    "I'm a Full Stack Developer with 7 years of experience building scalable web applications, with strong expertise in React.js, Next.js, and modern frontend architecture. I develop high-performance UI components and integrate them with robust backend services built using Node.js and NestJS. I spent almost four years across R Systems and GenAquarius contributing to enterprise-grade systems for Station Casinos — building both frontend applications and backend APIs. Skilled across the React ecosystem, API integrations, performance optimization, and microservice-based backend development, I thrive in Agile teams, collaborating with designers, backend engineers, and product stakeholders to deliver reliable, scalable solutions. I'm currently exploring Generative AI and integrating LLM/RAG-based features into modern applications. Outside of tech, I am an avid guitarist and singer, having performed on Indian Idol and various other reality shows, and I have a deep passion for travelling.",
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
    role: "Full Stack Developer (Gen AI)",
    company: "GenAquarius",
    period: "Oct 2025 — Mar 2026",
    description:
      "Contract → Full-time (Feb 2026) · Continued the Station Casinos Labor System after its migration from R Systems, ensuring smooth functionality and ongoing feature development. Built web apps with React.js and Next.js, integrated REST APIs, and explored Generative AI — integrating LLM/RAG-based features into applications.",
    badge: "G",
  },
  {
    role: "Software Developer",
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
};

export const projects: Project[] = [
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
      "An enterprise Labor System that manages team availability, schedule creation, and labour-data volume tracking for workforce planning. I built and maintained the platform across its migration from R Systems to GenAquarius, ensuring continuity of features and reliability.",
    problem:
      "Casino operations require dependable workforce planning across large teams. The Labor System centralizes availability, scheduling and labour-volume tracking into a single, performant interface.",
    features: [
      { title: "Team Availability", description: "Manage staff availability across shifts and roles." },
      { title: "Schedule Creation", description: "Build, edit and publish workforce schedules." },
      { title: "Labour Data Tracking", description: "Track labour volume for accurate planning." },
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
