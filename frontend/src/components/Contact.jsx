import { useState } from 'react';
import { sendContact } from '../api';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill out all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert('Please enter a valid email.');
      return;
    }

    setStatus('sending');
    try {
      await sendContact(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      window.location.href = `mailto:adityarai29052005@gmail.com?subject=${subject}&body=${body}`;
      setStatus('idle');
    }
  };

  return (
    <>
      <section id="contact" className="py-24 bg-[#0d0d15] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#00d4ff] font-mono text-sm mb-2">$ mail --send</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Touch</span></h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-6">Let's build something <span className="text-[#00d4ff]">amazing</span> together</h3>
              <p className="text-gray-400 mb-8">Have a project idea, collaboration opportunity, or just want to connect? Drop me a message!</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff]">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <a href="mailto:adityarai29052005@gmail.com" className="text-sm hover:text-[#00d4ff] transition-colors">adityarai29052005@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed]">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm">{profile?.location || 'Prayagraj, Uttar Pradesh, India'}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <a href={profile?.social?.github || 'https://github.com/Aditya-Rai0'} target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-github"></i></a>
                <a href={profile?.social?.linkedin || 'https://www.linkedin.com/in/aditya-rai-2a2400335/'} target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                <a href={profile?.social?.youtube || 'https://www.youtube.com/@NeuralSangam21'} target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-youtube"></i></a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors" />
              <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors" />
              <textarea name="message" rows="4" placeholder="Your Message" value={form.message} onChange={handleChange} required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"></textarea>
              <button type="submit" disabled={status === 'sending'}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50">
                <i className={`fas ${status === 'sent' ? 'fa-check' : status === 'sending' ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                {status === 'sent' ? ' Message Sent!' : status === 'sending' ? ' Sending...' : ' Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm text-gray-500 font-mono">
              <span className="text-[#00d4ff]">&lt;</span> Designed & Built with <span className="text-red-400">&hearts;</span> by <span className="text-white">Aditya Rai</span> <span className="text-[#00d4ff]">/&gt;</span>
            </p>
            <p className="text-xs text-gray-600 mt-2">&copy; {new Date().getFullYear()} Aditya Rai. All rights reserved.</p>
          </div>
        </div>
      </section>
    </>
  );
}
