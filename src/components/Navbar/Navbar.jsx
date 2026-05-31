import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMessageCircle } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig';
import './Navbar.css';

const navItems = [
  { to: '/', label: 'Beranda' },
  { to: '/aspirasi', label: 'Aspirasi' },
  { to: '/kabar', label: 'Kabar' },
  { to: '/rekam-jejak', label: 'Rekam Jejak' },
  { to: '/dukungan', label: 'Dukungan' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">RS</div>
          <div className="navbar-logo-text">
            <span className="navbar-logo-name">{siteConfig.name}</span>
            <span className="navbar-logo-party">{siteConfig.party}</span>
          </div>
        </Link>

        <div className="navbar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link to="/aspirasi" className="btn-primary navbar-cta">
          <FiMessageCircle />
          Sampaikan Aspirasi
        </Link>

        <button
          className={`navbar-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`navbar-mobile-overlay ${mobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            end={item.to === '/'}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <Link to="/aspirasi" className="btn-primary" onClick={() => setMobileOpen(false)}>
          <FiMessageCircle />
          Sampaikan Aspirasi
        </Link>
      </div>
    </nav>
  );
}
