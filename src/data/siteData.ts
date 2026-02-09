export const siteData = {
  name: "Dariusz Szczepański",
  tagline: "Software Engineer | Backend & Integration Specialist",
  logo: {
    prefix: "dev",
    dot: ".",
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
  about: {
    heading: "About Me",
    professional: [
      "With over a decade of experience in software engineering, I specialize in building robust, scalable backend systems using Java and the Spring Boot ecosystem. My expertise spans designing RESTful and SOAP APIs, implementing complex business logic, and integrating enterprise-grade systems that power critical operations.",
      "I've contributed to projects across industries including fintech, logistics, and telecommunications — always focusing on clean architecture, performance optimization, and reliable data management. I'm proficient in working with relational databases (MySQL, PostgreSQL, MariaDB), ORM frameworks (Hibernate, JPA, JOOQ), and workflow engines like Apache Camel.",
      "Beyond writing code, I bring strong skills in business analysis, Agile methodologies (Scrum, SAFe), and cross-functional team collaboration. I believe in bridging the gap between technical and business stakeholders to deliver solutions that truly matter.",
    ],
    beyondWork:
      "Outside of engineering, I'm passionate about continuous learning and exploring emerging technologies. I contribute to open-source projects, enjoy mentoring junior developers, and stay curious about the intersection of software and real-world impact.",
  },
  skills: {
    heading: "Skills & Technologies",
    categories: [
      {
        name: "Backend",
        items: ["Java 8-24", "Spring Boot 3", "REST APIs", "SOAP", "Apache Camel"],
      },
      {
        name: "Data & ORM",
        items: ["MySQL", "MariaDB", "PostgreSQL", "Hibernate", "JPA", "JOOQ"],
      },
      {
        name: "Data Analysis & Reporting",
        items: ["SQL", "Python", "PowerBI", "Dashboards", "KPI Monitoring"],
      },
      {
        name: "DevOps & Tools",
        items: ["Docker", "Git", "GitHub Actions", "Maven", "JIRA", "Confluence", "JetBrains", "Keycloak"],
      },
      {
        name: "Testing",
        items: ["JUnit 5", "Mockito", "AssertJ"],
      },
      {
        name: "Management & Business",
        items: ["Agile", "SAFe", "Scrum", "Business Analysis", "UML"],
      },
    ],
  },
  contact: {
    heading: "Get in Touch",
    subtitle: "Have a project in mind or just want to say hello? I'd love to hear from you.",
    submitLabel: "Send Message",
    fallbackText: "Or email me directly at",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Dariusz Szczepański. All rights reserved.`,
  },
};
