import express from 'express';
import Certificate from '../models/Certificate.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const cert = await Certificate.create(req.body);
    res.status(201).json(cert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    res.json(cert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
