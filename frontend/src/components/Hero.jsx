import { useState, useEffect } from 'react';

const PHRASES = [
  'Generative AI, Data Science & DevOps Enthusiast',
  'Building intelligent automation tools',
  'Sharing knowledge on Neural Sangam',
  '3rd Year CSE @ SIET Prayagraj',
];

export default function Hero({ profile }) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIdx];
    let timeout;

    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setText(current.substring(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 60 + Math.random() * 40);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setText(current.substring(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 30 + Math.random() * 20);
      } else {
        setDeleting(false);
        setPhraseIdx((p) => (p + 1) % PHRASES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-[128px]"></div>
        <div className="grid-overlay"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-[#00d4ff] font-mono text-sm mb-2 animate-fade-in">
              <span className="text-gray-500">$</span> whoami
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">{profile?.name || 'Aditya Rai'}</span>
            </h1>
            <div className="text-lg sm:text-xl text-gray-400 font-mono mb-6 h-8">
              <span className="text-[#00d4ff]">$</span> echo <span className="text-white">{text}</span><span className="animate-pulse text-[#00d4ff]">|</span>
            </div>
            <p className="text-gray-400 max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">
              {profile?.headline || 'Generative AI, Data Science & DevOps Enthusiast'} — building intelligent tools, automating workflows, and sharing knowledge through <span className="text-[#00d4ff]">Neural Sangam</span>.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href={profile?.resumeUrl || '/Aditya_Rai_Resume.pdf'} download
                className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-download"></i> Download Resume
              </a>
              <a href="#contact"
                className="px-6 py-3 border border-white/20 rounded-lg font-semibold text-sm hover:border-[#00d4ff]/50 hover:text-[#00d4ff] transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-envelope"></i> Contact Me
              </a>
            </div>
            <div className="flex gap-4 mt-8 justify-center md:justify-start">
              <a href={profile?.social?.github || 'https://github.com/Aditya-Rai0'} target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-github"></i>
              </a>
              <a href={profile?.social?.linkedin || 'https://www.linkedin.com/in/aditya-rai-2a2400335/'} target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href={profile?.social?.youtube || 'https://www.youtube.com/@NeuralSangam21'} target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-[#00d4ff]/20 shadow-2xl shadow-[#00d4ff]/10">
                <img src={profile?.profileImage || '/Profile.png'} alt="Aditya Rai" className="w-full h-full object-cover" onError={(e) => { e.target.src = '/Profile.png' }} />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#7c3aed]/20 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#00d4ff]/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-gray-500 hover:text-[#00d4ff] transition-colors text-xl">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
}
