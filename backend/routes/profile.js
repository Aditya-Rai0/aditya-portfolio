import express from 'express';
import Profile from '../models/Profile.js';
import auth from '../middleware/auth.js';

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

router.put('/', auth, async (req, res) => {
  try {
    const updates = { ...req.body };

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
