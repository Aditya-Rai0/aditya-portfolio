import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Aditya Rai' },
  headline: { type: String, default: 'Generative AI, Data Science & DevOps Enthusiast' },
  bio: { type: String, default: '' },
  email: { type: String, default: 'adityarai29052005@gmail.com' },
  resumeUrl: { type: String, default: '' },
  profileImage: { type: String, default: 'Profile.png' },
  logo: { type: String, default: '/logo.svg' },
  location: { type: String, default: 'Prayagraj, Uttar Pradesh, India' },
  social: {
    github: { type: String, default: 'https://github.com/Aditya-Rai0' },
    linkedin: { type: String, default: 'https://www.linkedin.com/in/aditya-rai-2a2400335/' },
    youtube: { type: String, default: 'https://www.youtube.com/@NeuralSangam21' },
  },
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
