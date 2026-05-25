import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Certificate from '../models/Certificate.js';
import auth from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `cert-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|pdf/;
    const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
    cb(null, extOk);
  },
});

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, upload.single('certFile'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.fileUrl = `/uploads/${req.file.filename}`;
    }
    const cert = await Certificate.create(data);
    res.status(201).json(cert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', auth, upload.single('certFile'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.fileUrl = `/uploads/${req.file.filename}`;
    }
    const cert = await Certificate.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
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
