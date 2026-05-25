import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProfile } from '../api';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    getProfile().then((res) => setLogo(res.data.logo)).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (!isHome) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleHireMe = (e) => {
    if (!isHome) return;
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-white/5 py-3' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          {logo ? (
            <img src={logo} alt="Aditya Rai" className="h-10 w-10 rounded-xl object-cover" onError={() => setLogo(null)} />
          ) : (
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-[#00d4ff]">&lt;</span>
              <span className="text-white">Aditya</span>
              <span className="text-[#00d4ff]">/&gt;</span>
            </span>
          )}
        </Link>
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={isHome ? link.href : `/${link.href}`} onClick={(e) => handleNavClick(e, link.href)} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={isHome ? '#contact' : '/#contact'} onClick={handleHireMe}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all">
            <i className="fas fa-briefcase text-xs"></i>Hire Me
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl text-white">
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#12121a]/95 backdrop-blur-xl border-t border-white/5 mt-4">
          <ul className="flex flex-col gap-2 px-6 py-4 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={isHome ? link.href : `/${link.href}`} onClick={(e) => { handleNavClick(e, link.href); setMenuOpen(false); }}
                  className="block py-2 text-gray-400 hover:text-[#00d4ff] transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-white/10">
              <a href={isHome ? '#contact' : '/#contact'} onClick={handleHireMe}
                className="flex items-center gap-2 py-2 text-[#00d4ff] font-semibold">
                <i className="fas fa-briefcase text-xs"></i>Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
