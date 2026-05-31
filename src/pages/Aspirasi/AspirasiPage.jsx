import { useState, useEffect } from 'react';
import { FiMessageCircle, FiUser, FiMapPin, FiCalendar, FiTag, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import siteConfig from '../../data/siteConfig';
import initialAspirations, { statusLabels } from '../../data/aspirations';
import { supabase } from '../../utils/supabaseClient';
import './AspirasiPage.css';

export default function AspirasiPage() {
  const [form, setForm] = useState({
    nama: '',
    phone: '',
    kecamatan: '',
    category: '',
    detail: '',
  });

  const [aspirationsList, setAspirationsList] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Load aspirations from Supabase if connected, otherwise fallback to localStorage / static data
    async function fetchAspirations() {
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
      
      // Fallback: check localStorage, otherwise use initial static data
      const saved = localStorage.getItem('aspirations-data');
      if (saved) {
        setAspirationsList(JSON.parse(saved));
      } else {
        setAspirationsList(initialAspirations);
      }
    }

    fetchAspirations();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const message = `*ASPIRASI RAKYAT*%0A%0A*Nama:* ${form.nama}%0A*No. HP:* ${form.phone}%0A*Kecamatan:* ${form.kecamatan}%0A*Kategori:* ${form.category}%0A%0A*Detail Aspirasi:*%0A${form.detail}`;
    
    // 1. Save data
    if (supabase) {
      try {
        const { error } = await supabase.from('aspirations').insert([
          {
            name: form.nama,
            phone: form.phone,
            kecamatan: form.kecamatan,
            category: form.category,
            subject: `Aspirasi ${form.category}`,
            detail: form.detail,
            status: 'received',
            date: new Date().toISOString().split('T')[0]
          }
        ]);
        if (error) throw error;
        
        // Refresh local list from Supabase
        const { data } = await supabase.from('aspirations').select('*').order('date', { ascending: false });
        if (data) setAspirationsList(data);
      } catch (err) {
        console.error('Gagal menyimpan ke Supabase:', err.message);
      }
    } else {
      // Save locally to localStorage
      const newAspiration = {
        id: Date.now(),
        name: form.nama,
        phone: form.phone,
        kecamatan: form.kecamatan,
        category: form.category,
        subject: `Aspirasi ${form.category}`,
        detail: form.detail,
        status: 'received',
        date: new Date().toISOString().split('T')[0]
      };
      const updated = [newAspiration, ...aspirationsList];
      setAspirationsList(updated);
      localStorage.setItem('aspirations-data', JSON.stringify(updated));
    }

    setSubmitting(false);

    // 2. Proceed to WhatsApp
    const waLink = `https://wa.me/${siteConfig.whatsapp}?text=${message}`;
    window.open(waLink, '_blank');

    // Reset Form
    setForm({ nama: '', phone: '', kecamatan: '', category: '', detail: '' });
  };

  const filtered = aspirationsList.filter(a => {
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    if (filterCategory !== 'all' && a.category !== filterCategory) return false;
    return true;
  });

  const total = aspirationsList.length;
  const received = aspirationsList.filter(a => a.status === 'received').length;
  const processing = aspirationsList.filter(a => a.status === 'processing').length;
  const done = aspirationsList.filter(a => a.status === 'done').length;

  const categories = [...new Set(aspirationsList.map(a => a.category))];

  return (
    <div className="aspirasi-page">
      {/* Hero */}
      <section className="aspirasi-hero">
        <div className="container">
          <div className="badge" style={{ marginBottom: '16px' }}>
            <FiMessageCircle /> Pojok Aspirasi Warga
          </div>
          <h1 className="section-title">Suarakan Aspirasi Anda</h1>
          <p className="section-subtitle">
            Kami hadir untuk mendengarkan secara tulus. Isi formulir di bawah untuk menyampaikan aduan, saran, atau usulan langsung via WhatsApp, dan pantau progres penyelesaiannya secara real-time.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="aspirasi-form-section">
        <div className="container">
          <div className="aspirasi-form-wrapper animate-fade-in-up">
            <h2 className="aspirasi-form-title">Formulir Aspirasi</h2>
            <p className="aspirasi-form-desc">
              Isi data diri dan detail laporan Anda. Sistem akan merangkum pesan secara otomatis sebelum dikirim langsung ke WhatsApp tim koordinasi.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    name="nama"
                    className="form-input"
                    placeholder="Masukkan nama lengkap Anda"
                    value={form.nama}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">No. HP / WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="08xxxxxxxxxx"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Kecamatan</label>
                  <select
                    name="kecamatan"
                    className="form-select"
                    value={form.kecamatan}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Kecamatan</option>
                    {siteConfig.kecamatan.map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Kategori Aspirasi</label>
                  <select
                    name="category"
                    className="form-select"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {siteConfig.categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Detail Aspirasi / Aduan</label>
                <textarea
                  name="detail"
                  className="form-textarea"
                  placeholder="Jelaskan aspirasi, keluhan pembangunan, atau saran Anda secara rinci (misal: lokasi jalan rusak, kebutuhan puskesmas, dll.)..."
                  value={form.detail}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primary form-submit" disabled={submitting}>
                <FiSend /> {submitting ? 'Mengirim...' : 'Kirim via WhatsApp'}
              </button>

              <div className="form-whatsapp-note">
                <FaWhatsapp size={18} />
                Aspirasi Anda akan diteruskan langsung ke WhatsApp Resmi tim {siteConfig.name}.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Tracker Section */}
      <section className="aspirasi-transparansi-section" style={{ paddingBottom: '100px', borderTop: '1px solid var(--color-border)', paddingTop: '60px', background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="badge" style={{ marginBottom: '12px' }}>Pelacakan Transparansi</div>
            <h2 className="section-title" style={{ fontSize: 'var(--font-size-2xl)' }}>Transparansi Progres Aspirasi</h2>
            <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Wujud nyata komitmen akuntabilitas kami. Pantau secara terbuka status penyelesaian setiap aspirasi masyarakat yang telah masuk.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="transparansi-progress animate-fade-in-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>Progres Keseluruhan</h3>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Total: {total} aspirasi</span>
            </div>
            <div className="progress-bar-wrapper">
              <div className="progress-bar-segment" style={{ width: `${total > 0 ? (done / total) * 100 : 0}%`, background: 'var(--color-status-done)' }}></div>
              <div className="progress-bar-segment" style={{ width: `${total > 0 ? (processing / total) * 100 : 0}%`, background: 'var(--color-status-processing)' }}></div>
              <div className="progress-bar-segment" style={{ width: `${total > 0 ? (received / total) * 100 : 0}%`, background: 'var(--color-status-received)' }}></div>
            </div>
            <div className="progress-labels">
              <span className="progress-label">
                <span className="progress-label-dot" style={{ background: 'var(--color-status-done)' }}></span>
                Terealisasi ({done})
              </span>
              <span className="progress-label">
                <span className="progress-label-dot" style={{ background: 'var(--color-status-processing)' }}></span>
                Diproses ({processing})
              </span>
              <span className="progress-label">
                <span className="progress-label-dot" style={{ background: 'var(--color-status-received)' }}></span>
                Diterima ({received})
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="transparansi-filters">
            <button className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => setFilterStatus('all')}>Semua Status</button>
            <button className={`filter-btn ${filterStatus === 'received' ? 'active' : ''}`} onClick={() => setFilterStatus('received')}>Diterima</button>
            <button className={`filter-btn ${filterStatus === 'processing' ? 'active' : ''}`} onClick={() => setFilterStatus('processing')}>Diproses</button>
            <button className={`filter-btn ${filterStatus === 'done' ? 'active' : ''}`} onClick={() => setFilterStatus('done')}>Terealisasi</button>
            <span style={{ width: '1px', background: 'var(--color-border)', margin: '0 4px' }}></span>
            <button className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`} onClick={() => setFilterCategory('all')}>Semua Kategori</button>
            {categories.map(c => (
              <button key={c} className={`filter-btn ${filterCategory === c ? 'active' : ''}`} onClick={() => setFilterCategory(c)}>{c}</button>
            ))}
          </div>

          {/* Cards */}
          <div className="transparansi-grid">
            {filtered.map(a => (
              <div key={a.id || a.created_at} className="aspirasi-card">
                <div className="aspirasi-card-header">
                  <h3 className="aspirasi-card-title">{a.subject}</h3>
                  <span className={`aspirasi-card-status ${a.status}`}>
                    {statusLabels[a.status].label}
                  </span>
                </div>
                <div className="aspirasi-card-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiUser size={12} /> {a.name}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiMapPin size={12} /> {a.kecamatan}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiTag size={12} /> {a.category}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiCalendar size={12} /> {new Date(a.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <p className="aspirasi-card-detail">{a.detail}</p>
                {a.response && (
                  <div className="aspirasi-card-response">
                    <strong>Tindak Lanjut:</strong>
                    {a.response}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
              Tidak ada aspirasi dengan filter ini.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
