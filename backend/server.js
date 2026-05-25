import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import certificateRoutes from './routes/certificates.js';
import profileRoutes from './routes/profile.js';
import contactRoutes from './routes/contact.js';
import chatRoutes from './routes/chat.js';
import experienceRoutes from './routes/experiences.js';
import skillRoutes from './routes/skills.js';
import achievementRoutes from './routes/achievements.js';
import seedRoutes from './routes/seed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/seed', seedRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
});

async function seedAdmin() {
  try {
    const email = (process.env.ADMIN_EMAIL || 'adityarai29052005@gmail.com').toLowerCase().trim();
    const exists = await User.findOne({ email });
    if (!exists) {
      const password = process.env.ADMIN_PASSWORD || 'Adityarai@2005';
      await User.create({ email, password });
      console.log(`[Seed] Admin user created: ${email}`);
    } else {
      console.log(`[Seed] Admin user already exists: ${email}`);
    }
  } catch (error) {
    console.error('[Seed] Error:', error.message);
  }
}

if (process.env.NODE_ENV !== 'production') {
  connectDB().then(async () => {
    await seedAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}

export default app;
