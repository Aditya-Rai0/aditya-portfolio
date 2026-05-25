import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, default: 'fas fa-code' },
  iconColor: { type: String, default: '#00d4ff' },
  level: { type: Number, default: 70 },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
