import { useState } from 'react';
import { FiMessageCircle, FiUser, FiMapPin, FiCalendar, FiTag, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import siteConfig from '../../data/siteConfig';
import aspirations, { statusLabels } from '../../data/aspirations';
import './AspirasiPage.css';

export default function AspirasiPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const filtered = aspirations.filter(a => {
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    if (filterCategory !== 'all' && a.category !== filterCategory) return false;
    return true;
  });

  const total = aspirations.length;
  const received = aspirations.filter(a => a.status === 'received').length;
  const processing = aspirations.filter(a => a.status === 'processing').length;
  const done = aspirations.filter(a => a.status === 'done').length;

  const categories = [...new Set(aspirations.map(a => a.category))];

  return (
    <div className="aspirasi-page">
      {/* Hero */}
      <section className="aspirasi-hero">
        <div className="container">
          <div className="badge" style={{ marginBottom: '16px' }}>
            <FiMessageCircle /> Pojok Aspirasi Rakyat
          </div>
          <h1 className="section-title">Suarakan Aspirasi Anda</h1>
          <p className="section-subtitle">
            Kami hadir untuk mendengarkan. Sampaikan aduan, saran, atau harapan Anda langsung kepada tim kami, dan pantau progres penyelesaiannya di bawah secara real-time.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="aspirasi-form-section">
        <div className="container">
          <div className="aspirasi-form-wrapper animate-fade-in-up" style={{ textAlign: 'center' }}>
            <div className="navbar-logo-icon" style={{ margin: '0 auto 20px', width: '56px', height: '56px', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-primary-glow)', color: 'var(--color-primary-light)', borderRadius: '50%' }}>
              <FaWhatsapp size={28} />
            </div>
            <h2 className="aspirasi-form-title">Hubungi Kami Langsung</h2>
            <p className="aspirasi-form-desc" style={{ marginBottom: '24px', maxWidth: '580px', margin: '0 auto 24px' }}>
              Saluran aspirasi kini terintegrasi langsung dengan WhatsApp Resmi tim {siteConfig.name}. Kami siap menerima keluhan pembangunan, pelayanan publik, maupun usulan program kesejahteraan.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', margin: '0 auto 32px', maxWidth: '640px', textAlign: 'left' }}>
              <div style={{ padding: '16px', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-primary-light)', marginBottom: '6px' }}>
                  <FiCheckCircle /> Respon Lebih Cepat
                </h4>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  Aspirasi langsung masuk ke koordinasi utama untuk percepatan realisasi.
                </p>
              </div>
              <div style={{ padding: '16px', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-primary-light)', marginBottom: '6px' }}>
                  <FiCheckCircle /> Lampiran Lengkap
                </h4>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  Kirimkan bukti berupa foto, video, atau dokumen pendukung secara langsung.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Halo%20Pak%20Ridho%20Saputra%2C%20saya%20ingin%20menyampaikan%20aspirasi%20mengenai%3A%0A%0A-%20Nama%3A%20%0A-%20Kecamatan%3A%20%0A-%20Kategori%20(Infrastruktur%2FPendidikan%2FKesehatan%2FEkonomi%2FLainnya)%3A%20%0A-%20Detail%20Aspirasi%3A%20`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary form-submit"
              style={{ display: 'inline-flex', textDecoration: 'none', maxWidth: '440px', margin: '0 auto', fontSize: 'var(--font-size-base)', fontWeight: 700, padding: '14px 28px', gap: '10px', alignItems: 'center', justifyContent: 'center' }}
            >
              <FaWhatsapp size={22} /> Sampaikan Aspirasi via WhatsApp
            </a>

            <div className="form-whatsapp-note" style={{ justifyContent: 'center', maxWidth: '440px', margin: '20px auto 0' }}>
              <FaWhatsapp size={18} />
              Saluran resmi bebas biaya & aktif mendampingi kepentingan rakyat.
            </div>
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
              <div className="progress-bar-segment" style={{ width: `${(done / total) * 100}%`, background: 'var(--color-status-done)' }}></div>
              <div className="progress-bar-segment" style={{ width: `${(processing / total) * 100}%`, background: 'var(--color-status-processing)' }}></div>
              <div className="progress-bar-segment" style={{ width: `${(received / total) * 100}%`, background: 'var(--color-status-received)' }}></div>
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
              <div key={a.id} className="aspirasi-card">
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
