export const siteData = {
  name: "Dariusz Szczepański",
  tagline: "Software Engineer | Backend & Integration Specialist",
  logo: {
    prefix: "dev",
    main: "TheDariusz",
  },
  email: "thedariusz@gmail.com",
  cvLink: "#",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  navLinks: [
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
    { value: "AI-Driven", label: "Development Approach" },
  ],
  about: {
    heading: "About Me",
    professional: [
      "With four years of hands-on experience in software engineering, I specialize in building robust, scalable backend systems using Java and the Spring Boot ecosystem. My expertise spans designing RESTful and SOAP APIs, implementing complex business logic, and integrating enterprise-grade systems that power critical operations.",
      "What sets me apart is my strong analytical mindset and deep understanding of business processes. I act as a bridge between business requirements and technical implementation, translating complex stakeholder needs into clean, maintainable code. My background in business analysis allows me to see the bigger picture while delivering precise technical solutions.",
      "I'm an active AI user who embraces spec-driven development — leveraging AI as a tool for achieving business goals faster and more effectively while using fewer resources. However, every output remains under my full control, backed by proper tests and validations. AI accelerates my workflow; it never replaces my judgment.",
    ],
    beyondWork:
      "Outside of engineering, I'm fascinated by astronomy and physics — the kind of thinking that reminds me how vast the world is beyond code. I stay active through regular fitness routines, constantly explore emerging technologies and automation tools, and believe that continuous learning is the foundation of both personal and professional growth.",
  },
  skills: {
    heading: "Skills & Technologies",
    categories: [
      {
        name: "Backend",
        icon: "Server",
        items: ["Java", "Spring Boot", "REST APIs", "SOAP", "Apache Camel"],
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
        items: ["Docker", "Git", "GitHub Actions", "Maven", "JIRA", "Confluence", "JetBrains", "Keycloak"],
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
    ],
  },
  contact: {
    heading: "Get in Touch",
    subheading: "Let's Work Together",
    subtitle: "Have a project in mind or just want to say hello? I'd love to hear from you.",
    location: "Warsaw, Poland",
    submitLabel: "Send Message",
    fallbackText: "Or email me directly at",
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
