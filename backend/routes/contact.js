import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Contact form submission:', { name, email, message });

    res.json({ message: 'Message received successfully! I will get back to you soon.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
