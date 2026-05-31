import { useState, useEffect } from 'react';
import { FiCheck, FiPlus, FiTrash2 } from 'react-icons/fi';
import { supabase } from '../../../utils/supabaseClient';
import { policies as staticPolicies } from '../../../data/trackRecord';

const STATUS_OPTIONS = ['Berlaku', 'Dalam Proses', 'Selesai'];

export default function KebijakanTab() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert]   = useState({ type: '', msg: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    if (supabase) {
      try {
        const { data } = await supabase.from('site_config').select('value').eq('key', 'policies_json').single();
        if (data?.value) { setItems(JSON.parse(data.value)); return; }
      } catch (_) {}
    }
    setItems(staticPolicies.map((p, i) => ({ ...p, id: i })));
  };

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert({ type: '', msg: '' }), 3000); };

  const handleChange = (index, field, val) =>
    setItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: val } : item));

  const handleAdd = () =>
    setItems(prev => [...prev, { id: Date.now(), title: '', year: new Date().getFullYear().toString(), status: 'Berlaku', description: '' }]);

  const handleRemove = (index) =>
    setItems(prev => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (supabase) {
        const { error } = await supabase.from('site_config')
          .upsert({ key: 'policies_json', value: JSON.stringify(items) }, { onConflict: 'key' });
        if (error) throw error;
      }
      showAlert('success', 'Daftar kebijakan/Perda berhasil disimpan!');
    } catch (err) { showAlert('error', err.message); }
    setSaving(false);
  };

  return (
    <div>
      <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="tab-title">Kebijakan & Perda</h1>
          <p className="tab-subtitle">Edit daftar peraturan daerah dan kebijakan yang berhasil diperjuangkan.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={handleAdd}>
            <FiPlus /> Tambah Perda
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={handleSave} disabled={saving}>
            <FiCheck /> {saving ? 'Menyimpan...' : 'Simpan Semua'}
          </button>
        </div>
      </div>

      {alert.msg && <div className={`admin-alert-${alert.type}`}>{alert.msg}</div>}

      {items.map((item, i) => (
        <div key={item.id || i} className="admin-form-card" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-primary-light)' }}>PERDA #{i + 1}</span>
            <button onClick={() => handleRemove(i)}
              style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', color: 'var(--color-primary-light)', borderRadius: 'var(--border-radius)', padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-size-xs)' }}>
              <FiTrash2 size={12} /> Hapus
            </button>
          </div>
          <div className="admin-form-row" style={{ marginBottom: '12px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>Nama Perda / Kebijakan</label>
              <input className="form-input" value={item.title} onChange={e => handleChange(i, 'title', e.target.value)} placeholder="Perda No. X Tahun XXXX..." />
            </div>
            <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>Tahun</label>
                <input className="form-input" value={item.year} onChange={e => handleChange(i, 'year', e.target.value)} placeholder="2024" />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>Status</label>
                <select className="form-select" value={item.status} onChange={e => handleChange(i, 'status', e.target.value)}>
                  {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>Deskripsi Singkat</label>
            <textarea className="form-textarea" value={item.description} onChange={e => handleChange(i, 'description', e.target.value)}
              style={{ minHeight: '70px', fontSize: 'var(--font-size-xs)' }} />
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="admin-empty">
          <div className="admin-empty-icon">📜</div>
          <p>Belum ada kebijakan. Klik "Tambah Perda" untuk memulai.</p>
        </div>
      )}
    </div>
  );
}
