export type ActiveSection = 'home' | 'about' | 'services' | 'statistics' | 'portfolio' | 'blog' | 'contact';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: 'Software Engineering' | 'Cloud & DevOps' | 'Strategic Consulting' | 'Managed IT';
  summary: string;
  description: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
  imagePath: string;
}

export interface CaseStudy {
  id: string;
  clientIndustry: string;
  title: string;
  category: 'Enterprise AI' | 'FinTech' | 'Cloud & SRE' | 'Logistics';
  timeline: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string; context: string }[];
  techStack: string[];
  imagePath: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'AI & Systems' | 'Cloud Architecture' | 'Engineering Culture' | 'Company Updates';
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
  };
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface TechStackCategory {
  category: string;
  description: string;
  technologies: {
    name: string;
    role: string;
    proficiency: string;
  }[];
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  delta: string;
  period: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionLinks?: { label: string; targetSection?: ActiveSection; email?: string }[];
}
