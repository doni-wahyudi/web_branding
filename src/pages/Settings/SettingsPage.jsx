import { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import './SettingsPage.css';

const themes = [
  { id: 'default', name: 'Merah (Default)', color: '#b91c1c' },
  { id: 'blue', name: 'Biru', color: '#1a6fbf' },
  { id: 'green', name: 'Hijau', color: '#15803d' },
  { id: 'purple', name: 'Ungu', color: '#7c3aed' },
  { id: 'teal', name: 'Teal', color: '#0d9488' },
  { id: 'orange', name: 'Oranye', color: '#c2410c' },
];

export default function SettingsPage() {
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('web-politisi-theme') || 'default';
  });

  useEffect(() => {
    if (activeTheme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', activeTheme);
    }
    localStorage.setItem('web-politisi-theme', activeTheme);
  }, [activeTheme]);

  return (
    <div className="settings-page">
      <section className="settings-hero">
        <div className="container">
          <div className="badge" style={{ marginBottom: '16px' }}>
            <FiSettings /> Pengaturan
          </div>
          <h1 className="section-title">Pengaturan Tampilan</h1>
          <p className="section-subtitle">
            Sesuaikan tema warna website sesuai preferensi Anda.
          </p>
        </div>
      </section>

      <section className="settings-content">
        <div className="container">
          <div className="settings-card">
            <h2 className="settings-section-title">Tema Warna</h2>
            <div className="theme-grid">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  className={`theme-option ${activeTheme === theme.id ? 'active' : ''}`}
                  onClick={() => setActiveTheme(theme.id)}
                >
                  <div className="theme-swatch" style={{ background: theme.color }}></div>
                  <span className="theme-label">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
