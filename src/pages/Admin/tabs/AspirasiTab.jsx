import { useState, useEffect } from 'react';
import {
  FiInbox, FiClock, FiCheckCircle, FiSave, FiRefreshCw,
  FiSearch, FiUser, FiMapPin, FiTag, FiCalendar, FiCheck
} from 'react-icons/fi';
import { supabase } from '../../../utils/supabaseClient';
import initialAspirations from '../../../data/aspirations';

const statusLabels = {
  received:   { label: 'Diterima',    color: 'var(--color-status-received)' },
  processing: { label: 'Diproses',    color: 'var(--color-status-processing)' },
  done:       { label: 'Terealisasi', color: 'var(--color-status-done)' },
};

export default function AspirasiTab() {
  const [list, setList]             = useState([]);
  const [search, setSearch]         = useState('');
  const [filterStatus, setFilter]   = useState('all');
  const [savingId, setSavingId]     = useState(null);
  const [alert, setAlert]           = useState({ type: '', msg: '' });
  const [loading, setLoading]       = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('aspirations').select('*').order('date', { ascending: false });
        if (error) throw error;
        if (data?.length) { setList(data); setLoading(false); return; }
      } catch (err) { console.error(err.message); }
    }
    const saved = localStorage.getItem('aspirations-data');
    setList(saved ? JSON.parse(saved) : initialAspirations);
    setLoading(false);
  };

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert({ type: '', msg: '' }), 3000);
  };

  const handleChange = (id, field, val) =>
    setList(prev => prev.map(a => a.id === id ? { ...a, [field]: val } : a));

  const handleSave = async (id) => {
    const item = list.find(a => a.id === id);
    setSavingId(id);
    try {
      if (supabase) {
        const { error } = await supabase.from('aspirations')
          .update({ status: item.status, response: item.response }).eq('id', id);
        if (error) throw error;
        showAlert('success', `Aspirasi #${id} berhasil diperbarui di database.`);
      } else {
        localStorage.setItem('aspirations-data', JSON.stringify(list));
        showAlert('success', 'Disimpan secara lokal.');
      }
    } catch (err) { showAlert('error', err.message); }
    setSavingId(null);
  };

  const filtered = list.filter(a => {
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q || a.name?.toLowerCase().includes(q)
      || a.subject?.toLowerCase().includes(q)
      || a.kecamatan?.toLowerCase().includes(q)
      || a.kabupaten?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = {
    total: list.length,
    received: list.filter(a => a.status === 'received').length,
    processing: list.filter(a => a.status === 'processing').length,
    done: list.filter(a => a.status === 'done').length,
  };

  return (
    <div>
      <div className="tab-header">
        <h1 className="tab-title">Manajemen Aspirasi</h1>
        <p className="tab-subtitle">Kelola, balas, dan update status aspirasi yang masuk dari warga.</p>
      </div>

      {/* Stats */}
      <div className="admin-stats-strip">
        {[
          { label: 'Total', value: counts.total, icon: <FiInbox />, color: 'rgba(255,255,255,0.05)', textColor: 'var(--color-text-primary)' },
          { label: 'Diterima', value: counts.received, icon: <FiInbox />, color: 'rgba(231,76,60,0.12)', textColor: 'var(--color-status-received)' },
          { label: 'Diproses', value: counts.processing, icon: <FiClock />, color: 'rgba(240,165,0,0.12)', textColor: 'var(--color-status-processing)' },
          { label: 'Terealisasi', value: counts.done, icon: <FiCheckCircle />, color: 'rgba(39,174,96,0.12)', textColor: 'var(--color-status-done)' },
        ].map(s => (
          <div className="admin-stat-card" key={s.label}>
            <div className="admin-stat-icon" style={{ background: s.color, color: s.textColor }}>{s.icon}</div>
            <div><span className="admin-stat-value">{s.value}</span><span className="admin-stat-label">{s.label}</span></div>
          </div>
        ))}
      </div>

      {alert.msg && <div className={`admin-alert-${alert.type}`}>{alert.msg}</div>}

      {/* Toolbar */}
      <div className="tab-toolbar">
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input className="tab-search" placeholder="Cari nama, judul, kecamatan..."
            style={{ paddingLeft: '36px' }} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-select" style={{ width: 'auto', padding: '10px 14px', fontSize: 'var(--font-size-sm)' }}
          value={filterStatus} onChange={e => setFilter(e.target.value)}>
          <option value="all">Semua Status</option>
          <option value="received">🔴 Diterima</option>
          <option value="processing">🟡 Diproses</option>
          <option value="done">🟢 Terealisasi</option>
        </select>
        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', fontSize: 'var(--font-size-sm)' }}
          onClick={fetchData}><FiRefreshCw /> Refresh</button>
      </div>

      {loading && <div className="admin-empty"><div className="admin-empty-icon">⏳</div><p>Memuat data...</p></div>}

      {!loading && filtered.length === 0 && (
        <div className="admin-empty">
          <div className="admin-empty-icon"><FiInbox /></div>
          <p>Tidak ada aspirasi ditemukan.</p>
        </div>
      )}

      {!loading && filtered.map(a => (
        <div key={a.id} className="admin-card">
          <div className="admin-card-grid">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <h3 className="admin-card-title">{a.subject}</h3>
                <span className={`status-pill ${a.status}`}>{statusLabels[a.status]?.label}</span>
              </div>
              <div className="admin-card-meta">
                <span><FiUser size={11} /> {a.name}</span>
                <span><FiMapPin size={11} /> {a.kabupaten ? `${a.kabupaten}, ` : ''}{a.kecamatan}</span>
                <span><FiTag size={11} /> {a.category}</span>
                <span><FiCalendar size={11} /> {a.date ? new Date(a.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</span>
              </div>
              <p className="admin-card-text">{a.detail}</p>
              {a.phone && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '8px' }}>📞 {a.phone}</p>}
            </div>
            <div className="admin-card-actions">
              <div className="form-group">
                <label className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>Status</label>
                <select className="form-select" value={a.status}
                  onChange={e => handleChange(a.id, 'status', e.target.value)}
                  style={{ padding: '8px 12px', fontSize: 'var(--font-size-sm)' }}>
                  <option value="received">🔴 Diterima</option>
                  <option value="processing">🟡 Diproses</option>
                  <option value="done">🟢 Terealisasi</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>Tindak Lanjut</label>
                <textarea className="form-textarea" placeholder="Tulis respon resmi atau tindakan yang diambil..."
                  value={a.response || ''} onChange={e => handleChange(a.id, 'response', e.target.value)}
                  style={{ minHeight: '80px', padding: '8px 12px', fontSize: 'var(--font-size-sm)', resize: 'vertical' }} />
              </div>
              <button onClick={() => handleSave(a.id)} className="btn-primary"
                style={{ fontSize: 'var(--font-size-xs)', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', justifyContent: 'center' }}
                disabled={savingId === a.id}>
                {savingId === a.id ? 'Menyimpan...' : <><FiCheck /> Simpan ke DB</>}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
