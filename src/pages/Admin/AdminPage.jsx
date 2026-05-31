import { useState, useEffect } from 'react';
import {
  FiLock, FiLogOut, FiInbox, FiBookOpen, FiClock,
  FiUsers, FiSettings, FiAward, FiFileText, FiMail,
  FiCloudLightning, FiAlertCircle, FiMenu, FiX
} from 'react-icons/fi';
import { supabase, signIn, signOut, onAuthStateChange } from '../../utils/supabaseClient';
import siteConfig from '../../data/siteConfig';

import AspirasiTab   from './tabs/AspirasiTab';
import KabarTab      from './tabs/KabarTab';
import RekamJejakTab from './tabs/RekamJejakTab';
import PencapaianTab from './tabs/PencapaianTab';
import KebijakanTab  from './tabs/KebijakanTab';
import DukunganTab   from './tabs/DukunganTab';
import ProfilTab     from './tabs/ProfilTab';

import './AdminPage.css';

const TABS = [
  { id: 'aspirasi',   label: 'Aspirasi',    icon: <FiInbox /> },
  { id: 'kabar',      label: 'Kabar',       icon: <FiBookOpen /> },
  { id: 'rekam',      label: 'Rekam Jejak', icon: <FiClock /> },
  { id: 'pencapaian', label: 'Pencapaian',  icon: <FiAward /> },
  { id: 'kebijakan',  label: 'Kebijakan',   icon: <FiFileText /> },
  { id: 'dukungan',   label: 'Dukungan',    icon: <FiUsers /> },
  { id: 'profil',     label: 'Profil & Config', icon: <FiSettings /> },
];

export default function AdminPage() {
  const [session, setSession]       = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab]   = useState('aspirasi');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }
    // Restore existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
    } catch (err) {
      setLoginError(err.message || 'Login gagal. Periksa email & password Anda.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setSession(null);
  };

  // ── Loading state ───────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-wrapper" style={{ textAlign: 'center' }}>
          <div className="admin-login-spinner" />
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '16px' }}>Memuat sesi...</p>
        </div>
      </div>
    );
  }

  // ── Supabase not configured ─────────────────────────────────
  if (!supabase) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-wrapper animate-fade-in-up">
          <div className="admin-login-icon" style={{ color: '#f0a500', background: 'rgba(240,165,0,0.1)', borderColor: 'rgba(240,165,0,0.2)' }}>
            <FiAlertCircle />
          </div>
          <h2 className="admin-login-title">Supabase Belum Dikonfigurasi</h2>
          <p className="admin-login-desc">
            Isi file <code>.env</code> dengan kredensial Supabase Anda untuk mengaktifkan Admin Panel.
          </p>
          <div style={{ background: 'var(--color-bg-tertiary)', borderRadius: 'var(--border-radius)', padding: '16px', textAlign: 'left', fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            VITE_SUPABASE_URL=https://xxx.supabase.co<br />
            VITE_SUPABASE_ANON_KEY=eyJ...
          </div>
        </div>
      </div>
    );
  }

  // ── Login form ──────────────────────────────────────────────
  if (!session) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-wrapper animate-fade-in-up">
          <div className="admin-login-icon">
            <FiLock />
          </div>
          <h2 className="admin-login-title">Panel Admin</h2>
          <p className="admin-login-desc">
            Masuk dengan akun Supabase Admin untuk mengelola seluruh konten website <strong>{siteConfig.name}</strong>.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '16px', textAlign: 'left' }}>
              <label className="form-label">Email Admin</label>
              <input
                type="email"
                className="form-input"
                placeholder="admin@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {loginError && (
              <div className="admin-login-error" style={{ marginBottom: '16px' }}>
                <FiAlertCircle style={{ display: 'inline', marginRight: '6px' }} />
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="btn-primary form-submit"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={loginLoading}
            >
              {loginLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
            </button>
          </form>

          <p style={{ marginTop: '16px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            <FiMail style={{ display: 'inline', marginRight: '4px' }} />
            Buat akun admin di Supabase Dashboard → Authentication → Users
          </p>
        </div>
      </div>
    );
  }

  // ── Dashboard ───────────────────────────────────────────────
  const tabComponents = {
    aspirasi:   <AspirasiTab />,
    kabar:      <KabarTab />,
    rekam:      <RekamJejakTab />,
    pencapaian: <PencapaianTab />,
    kebijakan:  <KebijakanTab />,
    dukungan:   <DukunganTab />,
    profil:     <ProfilTab />,
  };

  return (
    <div className="admin-cms-page">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">
            <span className="admin-sidebar-brandname">Admin CMS</span>
            <span className={`db-badge active`} style={{ fontSize: '10px', padding: '3px 8px' }}>
              <FiCloudLightning /> Live
            </span>
          </div>
          <div className="admin-sidebar-user">
            <FiMail size={12} />
            <span>{session.user.email}</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
            >
              <span className="admin-nav-icon">{tab.icon}</span>
              <span className="admin-nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-btn">
            <FiLogOut /> Keluar
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="admin-main">
        {/* Mobile top bar */}
        <div className="admin-mobile-topbar">
          <button className="admin-mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <span className="admin-mobile-title">
            {TABS.find(t => t.id === activeTab)?.label}
          </span>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center' }}>
            <FiLogOut />
          </button>
        </div>

        <div className="admin-tab-content">
          {tabComponents[activeTab]}
        </div>
      </div>
    </div>
  );
}
