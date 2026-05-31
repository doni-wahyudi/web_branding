import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiUser, FiMapPin, FiPhone } from 'react-icons/fi';
import { supabase } from '../../../utils/supabaseClient';

const statusLabels = {
  pending:  { label: 'Menunggu', pill: 'pending' },
  approved: { label: 'Diterima', pill: 'approved' },
  rejected: { label: 'Ditolak',  pill: 'rejected' },
};

export default function DukunganTab() {
  const [list, setList]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('all');
  const [alert, setAlert]       = useState({ type: '', msg: '' });
  const [savingId, setSavingId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    if (supabase) {
      try {
        const { data, error } = await supabase.from('volunteers').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setList(data || []);
      } catch (err) { console.error(err.message); }
    }
    setLoading(false);
  };

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert({ type: '', msg: '' }), 3000); };

  const handleUpdateStatus = async (id, status) => {
    setSavingId(id);
    try {
      if (supabase) {
        const { error } = await supabase.from('volunteers').update({ status }).eq('id', id);
        if (error) throw error;
      }
      setList(prev => prev.map(v => v.id === id ? { ...v, status } : v));
      showAlert('success', `Status berhasil diperbarui menjadi "${statusLabels[status].label}".`);
    } catch (err) { showAlert('error', err.message); }
    setSavingId(null);
  };

  const filtered = filter === 'all' ? list : list.filter(v => v.status === filter);
  const counts = { total: list.length, pending: list.filter(v => v.status === 'pending').length, approved: list.filter(v => v.status === 'approved').length };

  return (
    <div>
      <div className="tab-header">
        <h1 className="tab-title">Manajemen Dukungan & Relawan</h1>
        <p className="tab-subtitle">Tinjau dan setujui pendaftaran relawan dan kontributor dari halaman Dukungan.</p>
      </div>

      <div className="admin-stats-strip" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[
          { label: 'Total Pendaftar', value: counts.total,   color: 'rgba(255,255,255,0.05)', textColor: 'var(--color-text-primary)' },
          { label: 'Menunggu',        value: counts.pending,  color: 'rgba(240,165,0,0.12)',   textColor: 'var(--color-status-processing)' },
          { label: 'Diterima',        value: counts.approved, color: 'rgba(39,174,96,0.12)',   textColor: 'var(--color-status-done)' },
        ].map(s => (
          <div className="admin-stat-card" key={s.label}>
            <div className="admin-stat-icon" style={{ background: s.color, color: s.textColor, fontSize: '22px' }}>👥</div>
            <div><span className="admin-stat-value">{s.value}</span><span className="admin-stat-label">{s.label}</span></div>
          </div>
        ))}
      </div>

      {alert.msg && <div className={`admin-alert-${alert.type}`}>{alert.msg}</div>}

      {/* Filter */}
      <div className="tab-toolbar">
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={filter === f ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: 'var(--font-size-sm)' }}>
            {f === 'all' ? 'Semua' : statusLabels[f]?.label}
          </button>
        ))}
        <button className="btn-secondary" style={{ marginLeft: 'auto', fontSize: 'var(--font-size-sm)' }} onClick={fetchData}>🔄 Refresh</button>
      </div>

      {loading && <div className="admin-empty"><div className="admin-empty-icon">⏳</div><p>Memuat data...</p></div>}

      {!loading && filtered.length === 0 && (
        <div className="admin-empty">
          <div className="admin-empty-icon">👥</div>
          <p>{supabase ? 'Belum ada pendaftar.' : 'Hubungkan Supabase untuk melihat data pendaftar.'}</p>
        </div>
      )}

      {!loading && filtered.map(v => (
        <div key={v.id} className="admin-card">
          <div className="admin-card-grid">
            <div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                <h3 className="admin-card-title" style={{ marginBottom: 0 }}>{v.name}</h3>
                <span className={`status-pill ${v.status}`}>{statusLabels[v.status]?.label}</span>
                {v.role && <span style={{ fontSize: 'var(--font-size-xs)', background: 'var(--color-bg-tertiary)', padding: '2px 8px', borderRadius: 'var(--border-radius-pill)', color: 'var(--color-text-secondary)' }}>{v.role}</span>}
              </div>
              <div className="admin-card-meta">
                {v.phone     && <span><FiPhone size={11} /> {v.phone}</span>}
                {v.kecamatan && <span><FiMapPin size={11} /> {v.kabupaten ? `${v.kabupaten}, ` : ''}{v.kecamatan}</span>}
                {v.created_at && <span>📅 {new Date(v.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
              </div>
              {v.nik && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '6px' }}><FiUser size={11} style={{ display: 'inline' }} /> NIK: {v.nik}</p>}
              {v.kelurahan && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Kel/Desa: {v.kelurahan}</p>}
            </div>
            <div className="admin-card-actions">
              {v.status !== 'approved' && (
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', fontSize: 'var(--font-size-sm)' }}
                  onClick={() => handleUpdateStatus(v.id, 'approved')} disabled={savingId === v.id}>
                  <FiCheck /> Terima
                </button>
              )}
              {v.status !== 'rejected' && (
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-primary-light)', borderColor: 'rgba(231,76,60,0.3)' }}
                  onClick={() => handleUpdateStatus(v.id, 'rejected')} disabled={savingId === v.id}>
                  <FiX /> Tolak
                </button>
              )}
              {v.status !== 'pending' && (
                <button className="btn-secondary" style={{ fontSize: 'var(--font-size-sm)', justifyContent: 'center', display: 'flex' }}
                  onClick={() => handleUpdateStatus(v.id, 'pending')} disabled={savingId === v.id}>
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
