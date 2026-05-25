import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, default: 'Euron' },
  url: { type: String, default: '' },
  fileUrl: { type: String, default: '' },
  icon: { type: String, default: 'fa-certificate' },
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);
