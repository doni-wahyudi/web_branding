import { useState, useEffect } from 'react';
import { FiCheck, FiEdit2 } from 'react-icons/fi';
import { supabase } from '../../../utils/supabaseClient';
import { achievements as staticAchievements } from '../../../data/trackRecord';

export default function PencapaianTab() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert]   = useState({ type: '', msg: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    if (supabase) {
      try {
        const { data } = await supabase.from('site_config').select('value').eq('key', 'achievements_json').single();
        if (data?.value) { setItems(JSON.parse(data.value)); return; }
      } catch (_) {}
    }
    setItems(staticAchievements.map((a, i) => ({ ...a, id: i })));
  };

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert({ type: '', msg: '' }), 3000); };

  const handleChange = (index, field, val) =>
    setItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: val } : item));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (supabase) {
        const { error } = await supabase.from('site_config')
          .upsert({ key: 'achievements_json', value: JSON.stringify(items) }, { onConflict: 'key' });
        if (error) throw error;
      }
      showAlert('success', 'Data pencapaian berhasil disimpan!');
    } catch (err) { showAlert('error', err.message); }
    setSaving(false);
  };

  return (
    <div>
      <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="tab-title">Pencapaian & Statistik</h1>
          <p className="tab-subtitle">Edit kartu pencapaian yang tampil di halaman Rekam Jejak.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleSave} disabled={saving}>
          <FiCheck /> {saving ? 'Menyimpan...' : 'Simpan Semua'}
        </button>
      </div>

      {alert.msg && <div className={`admin-alert-${alert.type}`}>{alert.msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {items.map((item, i) => (
          <div key={i} className="admin-form-card" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <FiEdit2 size={14} style={{ color: 'var(--color-primary-light)' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-light)', fontWeight: 700 }}>CARD #{i + 1}</span>
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>Judul</label>
              <input className="form-input" value={item.title} onChange={e => handleChange(i, 'title', e.target.value)} placeholder="misal: 23 Perda Dikawal" />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>Deskripsi</label>
              <textarea className="form-textarea" value={item.description} onChange={e => handleChange(i, 'description', e.target.value)}
                style={{ minHeight: '80px', fontSize: 'var(--font-size-xs)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
