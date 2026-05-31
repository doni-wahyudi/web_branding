import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX, FiImage } from 'react-icons/fi';
import { supabase } from '../../../utils/supabaseClient';
import { uploadImage, BUCKETS } from '../../../utils/imageUtils';
import { timeline as staticTimeline } from '../../../data/trackRecord';

const ICONS = ['flag','users','heart','award','briefcase','file-text','message-circle','star','trending-up','home','map-pin','check-circle'];

const emptyForm = { year: new Date().getFullYear(), title: '', aspirasi: '', realisasi: '', icon: 'flag', image_url: '', sort_order: 0 };

export default function RekamJejakTab() {
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState(emptyForm);
  const [editId, setEditId]       = useState(null);
  const [saving, setSaving]       = useState(false);
  const [alert, setAlert]         = useState({ type: '', msg: '' });
  const [imgFile, setImgFile]     = useState(null);
  const [imgPreview, setImgPreview] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    if (supabase) {
      try {
        const { data, error } = await supabase.from('track_records').select('*').order('year', { ascending: true });
        if (error) throw error;
        if (data?.length) { setItems(data); setLoading(false); return; }
      } catch (err) { console.error(err.message); }
    }
    setItems(staticTimeline.map((t, i) => ({ ...t, id: i + 1 })));
    setLoading(false);
  };

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert({ type: '', msg: '' }), 3000); };

  const handleFormChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalForm = { ...form, year: parseInt(form.year), sort_order: parseInt(form.sort_order) };

      if (imgFile && supabase) {
        const { url } = await uploadImage(imgFile, BUCKETS.TRACK_RECORD, 'timeline');
        finalForm.image_url = url;
      }

      if (supabase) {
        if (editId) {
          const { error } = await supabase.from('track_records').update(finalForm).eq('id', editId);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('track_records').insert([finalForm]);
          if (error) throw error;
        }
      }

      showAlert('success', editId ? 'Item diperbarui!' : 'Item baru ditambahkan!');
      cancelForm();
      fetchData();
    } catch (err) { showAlert('error', err.message); }
    setSaving(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setImgPreview(item.image_url || '');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus item rekam jejak ini?')) return;
    try {
      if (supabase) {
        const { error } = await supabase.from('track_records').delete().eq('id', id);
        if (error) throw error;
      }
      showAlert('success', 'Item dihapus.');
      fetchData();
    } catch (err) { showAlert('error', err.message); }
  };

  const cancelForm = () => {
    setShowForm(false); setForm(emptyForm); setEditId(null);
    setImgFile(null); setImgPreview('');
  };

  return (
    <div>
      <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="tab-title">Rekam Jejak & Timeline</h1>
          <p className="tab-subtitle">Kelola daftar pencapaian kronologis yang tampil di halaman Rekam Jejak.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => { cancelForm(); setShowForm(true); }}>
          <FiPlus /> Tambah Item
        </button>
      </div>

      {alert.msg && <div className={`admin-alert-${alert.type}`}>{alert.msg}</div>}

      {showForm && (
        <div className="admin-form-card">
          <h3 className="admin-form-title">{editId ? 'Edit Item Rekam Jejak' : 'Tambah Item Baru'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-row" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Tahun *</label>
                <input className="form-input" name="year" type="number" value={form.year} onChange={handleFormChange} required min="1990" max="2100" />
              </div>
              <div className="form-group">
                <label className="form-label">Urutan Tampil</label>
                <input className="form-input" name="sort_order" type="number" value={form.sort_order} onChange={handleFormChange} />
              </div>
            </div>

            <div className="admin-form-row" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Judul Kegiatan *</label>
                <input className="form-input" name="title" value={form.title} onChange={handleFormChange} required placeholder="Nama program atau kegiatan" />
              </div>
              <div className="form-group">
                <label className="form-label">Icon</label>
                <select className="form-select" name="icon" value={form.icon} onChange={handleFormChange}>
                  {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Latar Belakang / Aspirasi</label>
              <textarea className="form-textarea" name="aspirasi" value={form.aspirasi} onChange={handleFormChange}
                placeholder="Masalah atau kebutuhan yang melatarbelakangi..." style={{ minHeight: '80px' }} />
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Realisasi / Hasil *</label>
              <textarea className="form-textarea" name="realisasi" value={form.realisasi} onChange={handleFormChange}
                placeholder="Apa yang berhasil diwujudkan..." style={{ minHeight: '80px' }} required />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label"><FiImage style={{ display: 'inline', marginRight: '6px' }} />Foto Dokumentasi (opsional)</label>
              <input type="file" accept="image/*" className="form-input" onChange={handleImageSelect} style={{ padding: '8px' }} />
              {imgPreview && <img src={imgPreview} alt="preview" style={{ marginTop: '10px', borderRadius: '8px', maxHeight: '140px', objectFit: 'cover', width: '100%' }} />}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} disabled={saving}>
                <FiCheck /> {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button type="button" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={cancelForm}>
                <FiX /> Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && <div className="admin-empty"><div className="admin-empty-icon">⏳</div><p>Memuat data...</p></div>}

      {!loading && items.map(item => (
        <div key={item.id} className="admin-card">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--color-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
              📋
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, background: 'var(--color-primary-glow)', color: 'var(--color-primary-light)', padding: '2px 8px', borderRadius: 'var(--border-radius-pill)' }}>{item.year}</span>
                <h3 className="admin-card-title" style={{ marginBottom: 0 }}>{item.title}</h3>
              </div>
              {item.realisasi && <p className="admin-card-text" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.realisasi}</p>}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => handleEdit(item)} className="btn-secondary" style={{ padding: '6px 10px', display: 'flex' }}><FiEdit2 /></button>
              <button onClick={() => handleDelete(item.id)}
                style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', color: 'var(--color-primary-light)', borderRadius: 'var(--border-radius)', padding: '6px 10px', cursor: 'pointer', display: 'flex' }}>
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
