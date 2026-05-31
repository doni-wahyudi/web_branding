import { useState, useEffect } from 'react';
import { FiLock, FiLogOut, FiInbox, FiClock, FiCheckCircle, FiSave, FiRefreshCw, FiCopy, FiMapPin, FiCalendar, FiTag, FiUser, FiCloudLightning, FiCheck } from 'react-icons/fi';
import initialAspirations from '../../data/aspirations';
import siteConfig from '../../data/siteConfig';
import { supabase } from '../../utils/supabaseClient';
import './AdminPage.css';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [aspirationsList, setAspirationsList] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [savingCardId, setSavingCardId] = useState(null);

  useEffect(() => {
    // Check if authenticated in current session
    const authStatus = sessionStorage.getItem('admin-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    fetchAspirations();
  }, []);

  const fetchAspirations = async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('aspirations')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setAspirationsList(data);
          return;
        }
      } catch (err) {
        console.error('Gagal mengambil data dari Supabase:', err.message);
      }
    }

    // Fallback: load aspirations from localStorage or fallback to initial data
    const savedAspirations = localStorage.getItem('aspirations-data');
    if (savedAspirations) {
      setAspirationsList(JSON.parse(savedAspirations));
    } else {
      setAspirationsList(initialAspirations);
    }
  };

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
      // Handle both integer ids (fallback) and bigints from Supabase
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

  const handleSaveCard = async (id) => {
    const item = aspirationsList.find(a => a.id === id);
    if (!item) return;

    setSavingCardId(id);

    if (supabase) {
      try {
        const { error } = await supabase
          .from('aspirations')
          .update({ status: item.status, response: item.response })
          .eq('id', id);
        
        if (error) throw error;
        setSaveSuccess(`Aspirasi #${id} berhasil diperbarui di Supabase!`);
      } catch (err) {
        console.error('Gagal memperbarui ke Supabase:', err.message);
        alert(`Gagal menyimpan ke Supabase: ${err.message}`);
      }
    } else {
      // Save locally to localStorage
      localStorage.setItem('aspirations-data', JSON.stringify(aspirationsList));
      setSaveSuccess(`Perubahan aspirasi disimpan secara lokal!`);
    }

    setSavingCardId(null);
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleSaveAllLocal = () => {
    localStorage.setItem('aspirations-data', JSON.stringify(aspirationsList));
    setSaveSuccess('Seluruh data lokal berhasil disimpan di browser!');
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
            <h1 className="admin-dashboard-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              Dashboard Aspirasi 
              {supabase ? (
                <span className="db-badge active"><FiCloudLightning /> Supabase Connected</span>
              ) : (
                <span className="db-badge"><FiCloudLightning /> Local Offline Mode</span>
              )}
            </h1>
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
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: '6px' }}>
              {supabase ? 'Mode Database Cloud Aktif' : 'Pusat Integrasi Data'}
            </h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {supabase 
                ? 'Website terhubung langsung dengan Supabase. Anda dapat memperbarui status & menulis tindak lanjut per aspirasi dan langsung menyimpannya ke database cloud dengan tombol "Simpan ke DB" di tiap kartu.'
                : 'Sistem terhubung secara lokal. Anda dapat memperbarui status di bawah secara lokal, lalu klik "Simpan Perubahan Browser" agar tersimpan di browser ini. Hubungkan Supabase dengan menuliskan kredensial di file .env untuk mengaktifkan sinkronisasi otomatis.'
              }
            </p>
          </div>
          <div className="admin-controls-actions">
            {!supabase && (
              <button onClick={handleSaveAllLocal} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiSave /> Simpan Perubahan Browser
              </button>
            )}
            <button onClick={handleCopyJSON} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-secondary-light)', borderColor: 'var(--color-secondary)' }}>
              <FiCopy /> {copiedIndex ? 'Tersalin!' : 'Salin File Kode JS'}
            </button>
            {!supabase && (
              <button onClick={handleResetData} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8 }}>
                <FiRefreshCw /> Setel Ulang Data
              </button>
            )}
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
              <span className="admin-stat-label">Diterima</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: 'rgba(240, 165, 0, 0.15)', color: 'var(--color-status-processing)' }}><FiClock /></div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{processing}</span>
              <span className="admin-stat-label">Diproses</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: 'rgba(39, 174, 96, 0.15)', color: 'var(--color-status-done)' }}><FiCheckCircle /></div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{done}</span>
              <span className="admin-stat-label">Terealisasi</span>
            </div>
          </div>
        </section>

        {/* Aspirations manager table / cards */}
        <section className="admin-list-section">
          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: '24px' }}>Daftar Aspirasi Warga</h2>
          
          <div className="admin-cards-list">
            {aspirationsList.map(a => (
              <div key={a.id || a.created_at} className="admin-aspiration-card">
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

                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>Tindak Lanjut / Jawaban Tim</label>
                      <textarea
                        className="form-textarea"
                        placeholder="Tuliskan respon resmi, dana aspirasi yang dialokasikan, atau tanggal penyelesaian..."
                        value={a.response || ''}
                        onChange={(e) => handleResponseChange(a.id, e.target.value)}
                        style={{ minHeight: '80px', padding: '8px 12px', fontSize: 'var(--font-size-sm)', resize: 'vertical' }}
                      />
                    </div>

                    <button 
                      onClick={() => handleSaveCard(a.id)} 
                      className="btn-primary" 
                      style={{ fontSize: 'var(--font-size-xs)', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', justifyContent: 'center' }}
                      disabled={savingCardId === a.id}
                    >
                      {savingCardId === a.id ? (
                        <>Sedang Menyimpan...</>
                      ) : (
                        <>{supabase ? <FiCheck /> : <FiSave />} {supabase ? 'Simpan ke Database' : 'Simpan Perubahan'}</>
                      )}
                    </button>
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
