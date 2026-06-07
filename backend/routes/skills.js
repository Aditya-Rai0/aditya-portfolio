import express from 'express';
import Skill from '../models/Skill.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const RESUME_SKILLS = [
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

router.get('/', async (req, res) => {
  try {
    let items = await Skill.find().sort({ category: 1, order: 1 });
    if (items.length === 0) {
      items = await Skill.insertMany(RESUME_SKILLS);
      console.log('[Skills] Auto-seeded from resume data');
    }
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Skill.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const item = await Skill.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Skill.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;