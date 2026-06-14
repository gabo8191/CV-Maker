import type { CVData } from './types';

// ID corto y único para items/secciones nuevos.
export const uid = () => Math.random().toString(36).slice(2, 10);

// CV de ejemplo (basado en el CV real de Gabriel Castillo) — sirve de plantilla
// y demuestra todas las secciones soportadas al abrir la app por primera vez.
export const defaultData: CVData = {
  name: 'Gabriel Fernando Castillo Mendieta',
  role: 'Backend Developer',
  location: 'Tunja, Boyacá, Colombia',
  email: 'gabo8191@gmail.com',
  phone: '+57 318 8708253',
  website: 'gabo8191.github.io/portfolio',
  linkedin: 'linkedin.com/in/gabodev8191',
  github: 'github.com/gabo8191',
  summary:
    'Backend Developer with 3+ years of experience building scalable REST APIs, microservices architectures, and containerized applications. Proficient in Laravel, NestJS, and Python with hands-on experience in Docker, AWS, CI/CD pipelines, and Linux server administration. Focused on backend systems design, infrastructure automation, and cloud deployments.',
  sections: [
    {
      id: uid(),
      kind: 'entries',
      title: 'Experience',
      items: [
        {
          id: uid(),
          heading: 'Fullstack Developer',
          subheading: 'TotalDev SAS',
          date: 'Jul. 2025 – March 2026',
          location: 'Remote',
          bullets: [
            'Developed an interbank messaging system that processes MT format files, validates encryption status, standardizes data formats, and routes messages per SWIFT/ISO 20022 specifications.',
            'Built backend systems for inventory management with REST APIs, automated CSV import/export, role-based access by geographic regions, and reporting modules with SQL views.',
            'Created QR code generation and validation systems for event management and product authentication, including pseudorandom code generation.',
          ],
        },
        {
          id: uid(),
          heading: 'Fullstack Developer',
          subheading: 'PARQ',
          date: 'Nov. 2024 – Jul. 2025',
          location: 'Remote',
          bullets: [
            'Maintained and evolved a microservice architecture with NestJS and TypeORM, refactoring legacy code and resolving production data inconsistencies.',
            'Developed electronic invoicing middleware integrating with Colombian providers (Siigo, Alegra, SATCOM) with transaction logging and error handling.',
            'Documented APIs using Swagger/OpenAPI and managed deployments through Docker and Portainer.',
          ],
        },
        {
          id: uid(),
          heading: 'Backend Developer',
          subheading: 'SEREMPRE',
          date: 'Jan. 2023 – Nov. 2024',
          location: 'Remote',
          bullets: [
            'Built backend systems for a corporate benefits platform serving multiple Latin American countries, with REST APIs consumed by mobile and web apps.',
            'Designed complex MySQL queries and stored procedures for reporting systems and configured automated cron jobs.',
            'Migrated legacy systems to containerized environments using Docker (DDEV), applying database normalization and query optimization.',
          ],
        },
      ],
    },
    {
      id: uid(),
      kind: 'entries',
      title: 'Education',
      items: [
        {
          id: uid(),
          heading: 'Systems and Computer Engineering',
          subheading:
            'Pedagogical and Technological University of Colombia (UPTC)',
          date: 'Expected 2026',
          location: 'Tunja, Boyacá',
          bullets: [
            'Relevant coursework: Databases, Distributed Systems, Computer Networks, Computer Security.',
          ],
        },
        {
          id: uid(),
          heading: 'Information Systems Analysis and Development',
          subheading: 'National Learning Service (SENA)',
          date: '2022',
          location: 'Tunja, Boyacá',
          bullets: [],
        },
      ],
    },
    {
      id: uid(),
      kind: 'skills',
      title: 'Technical Skills',
      groups: [
        {
          id: uid(),
          label: 'Languages',
          value: 'Python, TypeScript, PHP, SQL, Bash',
        },
        {
          id: uid(),
          label: 'Backend',
          value: 'Laravel, NestJS, Node.js, REST API Design, Microservices',
        },
        {
          id: uid(),
          label: 'Databases',
          value: 'PostgreSQL, MySQL, Redis, TypeORM, Eloquent ORM',
        },
        {
          id: uid(),
          label: 'DevOps / Cloud',
          value:
            'Docker, Kubernetes, AWS (EC2, S3, RDS), CI/CD, GitHub Actions, Nginx, Linux',
        },
      ],
    },
    {
      id: uid(),
      kind: 'text',
      title: 'Additional Information',
      body: 'Languages: Spanish (Native), English (B2 - Upper Intermediate). Interests: Backend architecture, distributed systems, cloud infrastructure, CI/CD automation.',
    },
  ],
};
