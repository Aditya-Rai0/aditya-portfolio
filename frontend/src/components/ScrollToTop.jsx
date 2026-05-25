import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-28 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white shadow-lg z-40 transition-all duration-300 hover:shadow-xl hover:shadow-[#00d4ff]/25 ${
        visible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}
