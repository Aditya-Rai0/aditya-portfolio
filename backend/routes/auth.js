import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`[Auth] Login attempt for email: "${email}"`);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log(`[Auth] User not found for email: "${email}"`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(`[Auth] User found: ${user.email}, password field length: ${user.password.length}`);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`[Auth] Password match: ${isMatch}`);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { email: user.email } });
  } catch (error) {
    console.error(`[Auth] Login error:`, error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/seed', async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL || 'adityarai29052005@gmail.com';
    const password = process.env.ADMIN_PASSWORD || 'Adityarai@2005';

    await User.deleteOne({ email });
    const user = await User.create({ email, password });

    console.log(`[Auth] Admin user seeded: ${user.email} (password hashed: ${user.password.startsWith('$2b$')})`);
    res.json({ message: 'Admin user created successfully', email: user.email });
  } catch (error) {
    console.error(`[Auth] Seed error:`, error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
