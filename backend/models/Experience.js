import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyTag: { type: String, default: '' },
  description: { type: String, default: '' },
  highlights: [{ type: String }],
  tags: [{ type: String }],
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
