import express from 'express';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Certificate from '../models/Certificate.js';
import Experience from '../models/Experience.js';
import Achievement from '../models/Achievement.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const DEFAULT_SKILLS = [
  { name: 'Machine Learning', category: 'AI / ML', icon: 'fas fa-robot', iconColor: '#00d4ff', level: 80, order: 0 },
  { name: 'Deep Learning', category: 'AI / ML', icon: 'fas fa-layer-group', iconColor: '#7c3aed', level: 75, order: 1 },
  { name: 'NLP', category: 'AI / ML', icon: 'fas fa-language', iconColor: '#00d4ff', level: 80, order: 2 },
  { name: 'Agentic AI', category: 'AI / ML', icon: 'fas fa-robot', iconColor: '#7c3aed', level: 70, order: 3 },
  { name: 'LLMs', category: 'Generative AI & LLMs', icon: 'fas fa-comment-dots', iconColor: '#00d4ff', level: 85, order: 4 },
  { name: 'RAG', category: 'Generative AI & LLMs', icon: 'fas fa-database', iconColor: '#7c3aed', level: 85, order: 5 },
  { name: 'LangChain', category: 'Generative AI & LLMs', icon: 'fas fa-link', iconColor: '#00d4ff', level: 85, order: 6 },
  { name: 'LangGraph', category: 'Generative AI & LLMs', icon: 'fas fa-project-diagram', iconColor: '#7c3aed', level: 70, order: 7 },
  { name: 'Prompt Engineering', category: 'Generative AI & LLMs', icon: 'fas fa-pen-fancy', iconColor: '#00d4ff', level: 80, order: 8 },
  { name: 'FAISS', category: 'Generative AI & LLMs', icon: 'fas fa-search', iconColor: '#7c3aed', level: 75, order: 9 },
  { name: 'Pinecone', category: 'Generative AI & LLMs', icon: 'fas fa-database', iconColor: '#00d4ff', level: 75, order: 10 },
  { name: 'HuggingFace', category: 'Generative AI & LLMs', icon: 'fas fa-smile', iconColor: '#f9a825', level: 80, order: 11 },
  { name: 'Python', category: 'Data Science', icon: 'fab fa-python', iconColor: '#e6a23c', level: 90, order: 12 },
  { name: 'Pandas', category: 'Data Science', icon: 'fas fa-table', iconColor: '#00d4ff', level: 80, order: 13 },
  { name: 'NumPy', category: 'Data Science', icon: 'fas fa-cube', iconColor: '#7c3aed', level: 80, order: 14 },
  { name: 'Data Analysis', category: 'Data Science', icon: 'fas fa-chart-line', iconColor: '#00d4ff', level: 80, order: 15 },
  { name: 'Statistics', category: 'Data Science', icon: 'fas fa-calculator', iconColor: '#7c3aed', level: 75, order: 16 },
  { name: 'Flask', category: 'Frameworks & Tools', icon: 'fas fa-flask', iconColor: '#00d4ff', level: 85, order: 17 },
  { name: 'FastAPI', category: 'Frameworks & Tools', icon: 'fas fa-bolt', iconColor: '#7c3aed', level: 80, order: 18 },
  { name: 'Streamlit', category: 'Frameworks & Tools', icon: 'fas fa-chart-line', iconColor: '#ff4b4b', level: 80, order: 19 },
  { name: 'Docker', category: 'Frameworks & Tools', icon: 'fab fa-docker', iconColor: '#2496ed', level: 75, order: 20 },
  { name: 'Git', category: 'Frameworks & Tools', icon: 'fab fa-git-alt', iconColor: '#f05133', level: 85, order: 21 },
  { name: 'GitHub', category: 'Frameworks & Tools', icon: 'fab fa-github', iconColor: '#ffffff', level: 85, order: 22 },
];

const DEFAULT_PROJECTS = [
  { title: 'National Security Shield', description: 'AI-powered video threat analysis platform processing 5+ threat categories (terrorism, misinformation, hate speech, espionage, cyber threats) from YouTube videos using speech-to-text, OCR, and multilingual translation.', techStack: ['FastAPI', 'LangGraph', 'Azure AI Search', 'Groq Llama-3.3-70B', 'HuggingFace'], category: 'Security AI', githubUrl: 'https://github.com/AdityaRai05', order: 0 },
  { title: 'SIET Career Guider', description: 'AI career guidance platform serving personalized roadmaps across 10+ career domains with market trend analysis. Built a RAG-powered chatbot using FAISS vector store.', techStack: ['Streamlit', 'LangChain', 'Google Gemini API', 'FAISS', 'Python'], category: 'Career AI', githubUrl: 'https://github.com/AdityaRai05', order: 1 },
  { title: 'Care Reply — AI Medical Bot', description: 'End-to-end medical Q&A chatbot using RAG over a PDF knowledge base, achieving context-aware responses across 100+ medical topics. Integrated Pinecone serverless vector DB.', techStack: ['Flask', 'LangChain', 'Google Gemini Pro', 'Pinecone', 'Docker'], category: 'Healthcare AI', githubUrl: 'https://github.com/AdityaRai05', order: 2 },
];

const DEFAULT_CERTIFICATES = [
  { title: 'Generative AI with NLP, Agentic AI and Fine Tuning', issuer: 'Euron', icon: 'fa-robot' },
  { title: 'Full Stack Data Science', issuer: 'Euron', icon: 'fa-chart-bar' },
  { title: 'Master Statistics', issuer: 'Euron', icon: 'fa-calculator' },
];

const DEFAULT_EXPERIENCES = [
  {
    title: 'AI Developer Intern',
    company: 'Euron (Engagesphere Technology Pvt. Ltd.)',
    companyTag: 'Bengaluru, India',
    startDate: 'Jun 2025',
    endDate: 'Aug 2025',
    highlights: [
      'Built\'CareReply\', a full-stack AI web application using Python, Flask, and Google Gemini API to generate empathetic, professional patient communication for healthcare staff.',
      'Designed precision prompt engineering to ensure AI-generated responses avoided medical advice while maintaining clinical tone and accuracy.',
      'Delivered an intuitive single-page UI with HTML/CSS/JavaScript enabling quick review, editing, and one-click copying of AI-generated messages.',
    ],
    tags: ['Python', 'Flask', 'Gemini API', 'Prompt Engineering', 'Healthcare AI'],
    order: 0,
  },
  {
    title: 'Marketing Intern',
    company: 'Euron (Engagesphere Technology Pvt. Ltd.)',
    companyTag: 'Remote',
    startDate: 'Mar 2026',
    endDate: 'Present',
    highlights: [
      'Executing digital and social media campaigns; creating data-driven content for LinkedIn and Instagram to drive audience engagement and brand awareness.',
      'Conducting market research on industry trends and competitive positioning; supporting lead generation via email and WhatsApp outreach initiatives.',
    ],
    tags: ['Digital Marketing', 'Social Media', 'Market Research'],
    order: 1,
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