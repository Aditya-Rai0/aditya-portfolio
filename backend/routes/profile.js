import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Profile from '../models/Profile.js';
import auth from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|pdf/;
    const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimeOk = allowed.test(file.mimetype.split('/')[1]);
    if (extOk || mimeOk) return cb(null, true);
    cb(new Error('Only images and PDFs allowed'));
  },
});

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', auth, upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
]), async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.files?.profileImage) {
      updates.profileImage = `/uploads/${req.files.profileImage[0].filename}`;
    }
    if (req.files?.resume) {
      updates.resumeUrl = `/uploads/${req.files.resume[0].filename}`;
    }
    if (req.files?.logo) {
      updates.logo = `/uploads/${req.files.logo[0].filename}`;
    }

    if (updates.social && typeof updates.social === 'string') {
      updates.social = JSON.parse(updates.social);
    }

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(updates);
    } else {
      Object.assign(profile, updates);
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/seed', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        name: 'Aditya Rai',
        headline: 'Generative AI, Data Science & DevOps Enthusiast',
        bio: "I'm a 3rd-year B.Tech Computer Science student at Shambhunath Institute of Engineering and Technology, Prayagraj. My journey in tech is driven by an insatiable curiosity for how things work — and how to make them work better. From building AI-powered chatbots to automating cloud deployments, I thrive on creating solutions that merge intelligence with efficiency. I specialize in Generative AI, Data Science, and DevOps, constantly exploring new tools like n8n, LangChain, and cloud platforms to streamline workflows. Beyond code, I run Neural Sangam — a YouTube channel where I break down complex tech concepts and share practical knowledge with the community.",
        email: 'adityarai29052005@gmail.com',
        location: 'Prayagraj, Uttar Pradesh, India',
      });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
