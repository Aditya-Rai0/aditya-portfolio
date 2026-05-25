import express from 'express';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Certificate from '../models/Certificate.js';
import Experience from '../models/Experience.js';
import Achievement from '../models/Achievement.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const DEFAULT_SKILLS = [
  { name: 'Python', category: 'Gen AI & Data Science', icon: 'fab fa-python', iconColor: '#e6a23c', level: 90, order: 0 },
  { name: 'Machine Learning', category: 'Gen AI & Data Science', icon: 'fas fa-robot', iconColor: '#00d4ff', level: 80, order: 1 },
  { name: 'LLMs & RAG', category: 'Gen AI & Data Science', icon: 'fas fa-network-wired', iconColor: '#7c3aed', level: 85, order: 2 },
  { name: 'LangChain', category: 'Gen AI & Data Science', icon: 'fas fa-link', iconColor: '#00d4ff', level: 80, order: 3 },
  { name: 'LangGraph', category: 'Gen AI & Data Science', icon: 'fas fa-project-diagram', iconColor: '#7c3aed', level: 70, order: 4 },
  { name: 'Docker', category: 'DevOps & Cloud', icon: 'fab fa-docker', iconColor: '#2496ed', level: 75, order: 5 },
  { name: 'Git', category: 'DevOps & Cloud', icon: 'fab fa-git-alt', iconColor: '#f05133', level: 85, order: 6 },
  { name: 'CI/CD', category: 'DevOps & Cloud', icon: 'fas fa-code-branch', iconColor: '#00d4ff', level: 70, order: 7 },
  { name: 'Kubernetes', category: 'DevOps & Cloud', icon: 'fab fa-kubernetes', iconColor: '#326ce5', level: 55, order: 8 },
  { name: 'n8n', category: 'Automation & Tools', icon: 'fas fa-plug', iconColor: '#00d4ff', level: 85, order: 9 },
  { name: 'FastAPI', category: 'Automation & Tools', icon: 'fas fa-bolt', iconColor: '#00d4ff', level: 75, order: 10 },
  { name: 'C / C++', category: 'Programming', icon: 'fas fa-code', iconColor: '#00599c', level: 70, order: 11 },
  { name: 'HTML / CSS', category: 'Programming', icon: 'fab fa-html5', iconColor: '#e34f26', level: 85, order: 12 },
];

const DEFAULT_PROJECTS = [
  { title: 'AI Medical Bot', description: 'An AI-powered medical assistant that provides preliminary health insights using LLMs and medical knowledge bases.', techStack: ['LangChain', 'LLMs', 'Python', 'FastAPI'], category: 'Gen AI', order: 0 },
  { title: 'CareReply AI', description: 'Intelligent automated response system leveraging AI to draft context-aware replies for customer support and communication.', techStack: ['n8n', 'NLP', 'Python', 'GPT'], category: 'Automation', order: 1 },
  { title: 'SIET Career Guider', description: 'A career guidance platform for students at Shambhunath Institute, offering personalized recommendations and roadmaps.', techStack: ['React', 'Node.js', 'MongoDB', 'AI'], category: 'Web App', order: 2 },
  { title: 'Create Your Own Story with AI', description: 'Interactive storytelling platform where users co-create narratives with AI. Generates dynamic, context-aware story branches.', techStack: ['LangChain', 'GPT', 'Flask', 'HTML/CSS'], category: 'Creative AI', order: 3 },
];

const DEFAULT_CERTIFICATES = [
  { title: 'Python with Data Science', issuer: 'Euron', url: 'https://euron.one/certificate/075db80f-395a-40ac-b4aa-49924dfa7a5f', icon: 'fa-certificate' },
  { title: 'AI & Machine Learning', issuer: 'Euron', url: 'https://euron.one/certificate/00a4e7af-9609-4cd8-86c9-36619e757161', icon: 'fa-robot' },
  { title: 'DevOps Fundamentals', issuer: 'Euron', url: 'https://euron.one/certificate/eaf74e2f-829d-4117-8c4d-9ae805e3af63', icon: 'fa-cloud-upload-alt' },
  { title: 'Data Analytics', issuer: 'Euron', url: 'https://euron.one/certificate/075db80f-395a-40ac-b4aa-49924dfa7a5f', icon: 'fa-chart-bar' },
  { title: 'Internship Completion', issuer: 'Euron — Marketing', url: 'https://euron.one/internship/verify/completion-letter/68453d2b2b118477c8859774_22448828-2a0e-4286-9189-6e6521bc3084', icon: 'fa-briefcase' },
];

const DEFAULT_EXPERIENCES = [
  {
    title: 'Marketing Intern',
    company: 'Euron',
    companyTag: 'EdTech Platform',
    startDate: 'Jun 2024',
    endDate: 'Aug 2024',
    description: '',
    highlights: [
      'Developed and executed marketing strategies to promote Euron\'s educational offerings, driving user engagement.',
      'Collaborated with cross-functional teams to optimize content and outreach campaigns.',
      'Gained hands-on experience in digital marketing, analytics, and brand positioning in the EdTech space.',
    ],
    tags: ['Digital Marketing', 'Content Strategy', 'Analytics'],
    order: 0,
  },
];

router.post('/all', auth, async (req, res) => {
  try {
    await Promise.all([
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Certificate.deleteMany({}),
      Experience.deleteMany({}),
      Achievement.deleteMany({}),
    ]);

    await Promise.all([
      Skill.insertMany(DEFAULT_SKILLS),
      Project.insertMany(DEFAULT_PROJECTS),
      Certificate.insertMany(DEFAULT_CERTIFICATES),
      Experience.insertMany(DEFAULT_EXPERIENCES),
    ]);

    res.json({
      message: 'All sample data seeded successfully!',
      counts: {
        skills: DEFAULT_SKILLS.length,
        projects: DEFAULT_PROJECTS.length,
        certificates: DEFAULT_CERTIFICATES.length,
        experiences: DEFAULT_EXPERIENCES.length,
      },
    });
  } catch (error) {
    console.error('[Seed] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
