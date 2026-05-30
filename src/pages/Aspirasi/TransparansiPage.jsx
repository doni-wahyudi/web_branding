import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMapPin, FiCalendar, FiTag } from 'react-icons/fi';
import aspirations, { statusLabels } from '../../data/aspirations';
import './AspirasiPage.css';

export default function TransparansiPage() {
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
      <section className="aspirasi-hero">
        <div className="container">
          <Link to="/aspirasi" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '16px' }}>
            <FiArrowLeft /> Kembali ke Formulir Aspirasi
          </Link>
          <div className="badge" style={{ marginBottom: '16px' }}>Transparansi</div>
          <h1 className="section-title">Transparansi Aspirasi</h1>
          <p className="section-subtitle">
            Pantau status setiap aspirasi rakyat yang telah kami terima dan kerjakan secara transparan.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: '100px' }}>
        <div className="container">
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
