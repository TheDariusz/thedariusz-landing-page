import aiCardsImage from "@/assets/projects/ai-cards.webp";
import twoDoAiImage from "@/assets/projects/2doai.webp";
import crisisAssistantImage from "@/assets/projects/crisis-assistant.webp";

const projects = [
  {
    name: "AI Cards",
    url: "https://ai-cards.app",
    description:
      "English flashcards for Polish speakers. Type a word you heard; AI builds the card (meaning, example sentence, audio) and a three-day routine takes it from first read to active recall.",
    image: aiCardsImage,
    imageAlt: "AI Cards landing page",
  },
  {
    name: "2do AI",
    url: "https://2doai.app",
    description:
      "Keeps everyday tasks, long-term goals and someday dreams in one place, reminds you of plans you set aside, and suggests a first step.",
    image: twoDoAiImage,
    imageAlt: "2do AI landing page",
  },
  {
    name: "Crisis Assistant",
    url: "https://crisisassistant.app",
    description:
      "Works out how much water, food and other emergency supplies your household needs, then tracks expiry dates. Two minutes, no account needed.",
    image: crisisAssistantImage,
    imageAlt: "Crisis Assistant landing page",
  },
];

export const siteData = {
  name: "Dariusz Szczepański",
  tagline: "Software Engineer | Backend & Integration Specialist",
  logo: {
    prefix: "dev",
    main: "TheDariusz",
  },
  email: "thedariusz@gmail.com",
  cvLinks: {
    en: {
      pdf: "/Dariusz_Szczepanski_resume-en.pdf",
      md: "/Dariusz_Szczepanski_resume-en.md",
    },
    pl: {
      pdf: "/Dariusz_Szczepanski_resume-pl.pdf",
      md: "/Dariusz_Szczepanski_resume-pl.md",
    },
  },
  socialLinks: {
    github: "https://github.com/thedariusz",
    linkedin: "https://www.linkedin.com/in/dariusz-szczepanski-dev",
    twitter: "https://x.com/thedariusz_dev",
  },
  navLinks: [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    greeting: "Hello, I'm",
    ctaPrimary: "Get in Touch",
    ctaSecondary: "Download CV",
  },
  stats: [
    { value: "4+", label: "Years Experience" },
    { value: "10+", label: "Enterprise Projects" },
    { value: "Java & Spring Boot", label: "Core Expertise" },
    { value: String(projects.length), label: "Apps Shipped" },
  ],
  portfolio: {
    heading: "Selected projects",
    projects,
  },
  about: {
    heading: "About Me",
    professional: [
      "I've spent four years as a software engineer building scalable backend systems in Java and Spring Boot. Most of that time goes into designing REST APIs, implementing complex business logic, and integrating the enterprise systems that run critical operations.",
      "I have a background in business analysis, so I start by understanding the business process before I write code. I work between stakeholders and the technical side, turning what they need into clean, maintainable code without losing sight of the overall goal.",
      "I use AI a lot and follow spec-driven development, which helps me reach business goals faster and with fewer resources. I still review every output myself and back it with tests and validation.",
    ],
    beyondWork:
      "Outside of engineering, I'm fascinated by astronomy and physics, which remind me how much exists beyond code. I train regularly and keep trying new technologies and automation tools, because I believe continuous learning matters as much for personal growth as for work.",
  },
  skills: {
    heading: "Skills & Technologies",
    categories: [
      {
        name: "Backend",
        icon: "Server",
        items: ["Java", "Spring Boot", "REST APIs", "SOAP", "Apache Camel", "RabbitMQ"],
      },
      {
        name: "Data & ORM",
        icon: "Database",
        items: ["MySQL", "MariaDB", "PostgreSQL", "Hibernate", "JPA", "JOOQ"],
      },
      {
        name: "Data Analysis & Reporting",
        icon: "BarChart3",
        items: ["SQL", "Python", "PowerBI", "Dashboards", "KPI Monitoring"],
      },
      {
        name: "DevOps & Tools",
        icon: "GitBranch",
        items: ["Docker", "Git", "GitHub Actions", "Maven", "JIRA", "Confluence", "JetBrains", "OAuth2"],
      },
      {
        name: "Testing",
        icon: "TestTube",
        items: ["JUnit 5", "Mockito", "AssertJ"],
      },
      {
        name: "Management & Business",
        icon: "Briefcase",
        items: ["Agile", "SAFe", "Scrum", "Business Analysis", "UML"],
      },
      {
        name: "AI",
        icon: "BrainCircuit",
        items: ["Spec-Driven Development", "RAG", "Agentic Workflow", "Claude Code", "Prompt Engineering", "n8n"],
      },
    ],
  },
  contact: {
    heading: "Get in Touch",
    subtitle: "Have a project in mind or just want to say hello? I'd love to hear from you.",
    location: "Warsaw, Poland",
    submitLabel: "Send Message",
    submittingLabel: "Sending...",
    fallbackText: "Or email me directly at",
    webhookUrl: "https://n8n.thedariusz.com/webhook/972def4a-2294-400f-a8f4-72df7db8e442",
  },
  business: {
    name: "TheDariusz Dariusz Szczepański",
    nip: "PL9521789822",
    address: "Ignacego Paderewskiego 144B/104, 04-438 Warsaw, Poland",
    email: "thedariusz@gmail.com",
    phone: "+48 512 241 841",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} TheDariusz Dariusz Szczepański. All rights reserved.`,
  },
};
