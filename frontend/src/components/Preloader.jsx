import { useState, useEffect } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-[#0a0a0f] flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}>
      <div className="loader"></div>
    </div>
  );
}
