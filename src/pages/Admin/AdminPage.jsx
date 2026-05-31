import { useState, useEffect } from 'react';
import { FiLock, FiLogOut, FiInbox, FiClock, FiCheckCircle, FiSave, FiRefreshCw, FiCopy, FiMapPin, FiCalendar, FiTag, FiUser } from 'react-icons/fi';
import initialAspirations from '../../data/aspirations';
import siteConfig from '../../data/siteConfig';
import './AdminPage.css';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [aspirationsList, setAspirationsList] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');

  useEffect(() => {
    // Check if authenticated in current session
    const authStatus = sessionStorage.getItem('admin-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    // Load aspirations from localStorage or fallback to initial data
    const savedAspirations = localStorage.getItem('aspirations-data');
    if (savedAspirations) {
      setAspirationsList(JSON.parse(savedAspirations));
    } else {
      setAspirationsList(initialAspirations);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'gema2026' || password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Kode akses admin salah. Silakan coba lagi.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin-auth');
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = aspirationsList.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setAspirationsList(updated);
  };

  const handleResponseChange = (id, newResponse) => {
    const updated = aspirationsList.map(item => {
      if (item.id === id) {
        return { ...item, response: newResponse };
      }
      return item;
    });
    setAspirationsList(updated);
  };

  const handleSaveAll = () => {
    localStorage.setItem('aspirations-data', JSON.stringify(aspirationsList));
    setSaveSuccess('Seluruh perubahan berhasil disimpan di browser!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin menyetel ulang data ke data bawaan awal? Semua perubahan lokal akan terhapus.')) {
      localStorage.removeItem('aspirations-data');
      setAspirationsList(initialAspirations);
      setSaveSuccess('Data berhasil disetel ulang ke data bawaan.');
      setTimeout(() => setSaveSuccess(''), 3000);
    }
  };

  const handleCopyJSON = () => {
    // Generate clean javascript export content
    const code = `const aspirations = ${JSON.stringify(aspirationsList, null, 2)};\n\nexport const statusLabels = {\n  received: { label: 'Diterima', color: 'var(--color-status-received)' },\n  processing: { label: 'Diproses', color: 'var(--color-status-processing)' },\n  done: { label: 'Terealisasi', color: 'var(--color-status-done)' }\n};\n\nexport default aspirations;`;
    
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(true);
      setTimeout(() => setCopiedIndex(false), 2000);
    });
  };

  // Stats calculation
  const total = aspirationsList.length;
  const received = aspirationsList.filter(a => a.status === 'received').length;
  const processing = aspirationsList.filter(a => a.status === 'processing').length;
  const done = aspirationsList.filter(a => a.status === 'done').length;

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-wrapper animate-fade-in-up">
          <div className="admin-login-icon">
            <FiLock />
          </div>
          <h2 className="admin-login-title">Panel Tim Sukses</h2>
          <p className="admin-login-desc">
            Masukkan kode akses khusus admin untuk mengelola, memperbarui status, dan menjawab aspirasi dari warga.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ textAlign: 'left' }}>Kode Akses Admin</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {loginError && <p className="admin-login-error">{loginError}</p>}
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '8px', textAlign: 'left' }}>
                💡 Hint: Gunakan <code>gema2026</code> atau <code>admin123</code> untuk menguji panel.
              </p>
            </div>
            <button type="submit" className="btn-primary form-submit" style={{ width: '100%', justifyContent: 'center' }}>
              Buka Dashboard Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      {/* Admin Header */}
      <header className="admin-dashboard-header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="admin-dashboard-title">Dashboard Aspirasi</h1>
            <p className="admin-dashboard-subtitle">
              Mengelola data aspirasi masuk untuk tim pendukung <strong>{siteConfig.name}</strong>
            </p>
          </div>
          <button onClick={handleLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: 'var(--font-size-sm)' }}>
            <FiLogOut /> Keluar
          </button>
        </div>
      </header>

      <div className="container animate-fade-in-up" style={{ paddingBottom: '100px' }}>
        {/* Save Notifications */}
        {saveSuccess && (
          <div className="admin-alert-success animate-fade-in-up">
            {saveSuccess}
          </div>
        )}

        {/* Admin Controls Panel */}
        <section className="admin-controls-card">
          <div className="admin-controls-info">
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: '6px' }}>Pusat Integrasi Data</h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Karena website ini berbasis static-deployment (GitHub Pages), Anda dapat memperbarui status di bawah secara lokal, lalu klik <strong>Simpan Perubahan</strong> agar tersimpan di browser ini. Untuk memperbarui website secara permanen bagi semua pengunjung, klik <strong>Salin File Kode JS</strong> lalu gantikan isi file <code>src/data/aspirations.js</code> di proyek.
            </p>
          </div>
          <div className="admin-controls-actions">
            <button onClick={handleSaveAll} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiSave /> Simpan Perubahan Browser
            </button>
            <button onClick={handleCopyJSON} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-secondary-light)', borderColor: 'var(--color-secondary)' }}>
              <FiCopy /> {copiedIndex ? 'Tersalin!' : 'Salin File Kode JS'}
            </button>
            <button onClick={handleResetData} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8 }}>
              <FiRefreshCw /> Setel Ulang Data
            </button>
          </div>
        </section>

        {/* Stats strip */}
        <section className="admin-stats-strip">
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-primary)' }}><FiInbox /></div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{total}</span>
              <span className="admin-stat-label">Total Masuk</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: 'rgba(231, 76, 60, 0.15)', color: 'var(--color-status-received)' }}><FiInbox /></div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{received}</span>
              <span className="admin-stat-label">Diterima (Merah)</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: 'rgba(240, 165, 0, 0.15)', color: 'var(--color-status-processing)' }}><FiClock /></div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{processing}</span>
              <span className="admin-stat-label">Diproses (Kuning)</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: 'rgba(39, 174, 96, 0.15)', color: 'var(--color-status-done)' }}><FiCheckCircle /></div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{done}</span>
              <span className="admin-stat-label">Terealisasi (Hijau)</span>
            </div>
          </div>
        </section>

        {/* Aspirations manager table / cards */}
        <section className="admin-list-section">
          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: '24px' }}>Daftar Aspirasi Masyarakat</h2>
          
          <div className="admin-cards-list">
            {aspirationsList.map(a => (
              <div key={a.id} className="admin-aspiration-card">
                <div className="admin-card-main">
                  <div className="admin-card-details">
                    <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                      <h3 className="admin-card-title">{a.subject}</h3>
                      <span className={`aspirasi-card-status ${a.status}`}>
                        {statusLabels[a.status].label}
                      </span>
                    </div>

                    <div className="aspirasi-card-meta" style={{ marginBottom: '16px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiUser size={12} /> {a.name}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiMapPin size={12} /> {a.kecamatan}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiTag size={12} /> {a.category}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiCalendar size={12} /> {new Date(a.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>

                    <p className="admin-card-text">{a.detail}</p>
                  </div>

                  <div className="admin-card-inputs">
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>Ubah Status Progres</label>
                      <select
                        className="form-select"
                        value={a.status}
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                        style={{ padding: '8px 12px', fontSize: 'var(--font-size-sm)' }}
                      >
                        <option value="received">🔴 Diterima (Received)</option>
                        <option value="processing">🟡 Sedang Diproses (Processing)</option>
                        <option value="done">🟢 Terealisasi (Done)</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '0' }}>
                      <label className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>Tindak Lanjut / Jawaban Tim</label>
                      <textarea
                        className="form-textarea"
                        placeholder="Tuliskan respon resmi, dana aspirasi yang dialokasikan, atau tanggal penyelesaian..."
                        value={a.response || ''}
                        onChange={(e) => handleResponseChange(a.id, e.target.value)}
                        style={{ minHeight: '80px', padding: '8px 12px', fontSize: 'var(--font-size-sm)', resize: 'vertical' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
