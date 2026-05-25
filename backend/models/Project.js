import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  category: { type: String, default: 'Gen AI' },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
