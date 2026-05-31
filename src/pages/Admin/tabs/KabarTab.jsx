import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX, FiImage, FiEye, FiEyeOff } from 'react-icons/fi';
import { supabase } from '../../../utils/supabaseClient';
import { uploadImage, BUCKETS } from '../../../utils/imageUtils';
import blogPosts from '../../../data/blogPosts';

const CATEGORIES = ['Infrastruktur', 'Pendidikan', 'Kesehatan', 'Ekonomi', 'Sosial', 'Lingkungan', 'Umum'];

const emptyForm = {
  title: '', slug: '', excerpt: '', content: '',
  category: 'Umum', image_url: '', author: 'Tim Doni Wahyudi',
  published: false, date: new Date().toISOString().split('T')[0],
};

export default function KabarTab() {
  const [posts, setPosts]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState(emptyForm);
  const [editId, setEditId]       = useState(null);
  const [saving, setSaving]       = useState(false);
  const [alert, setAlert]         = useState({ type: '', msg: '' });
  const [imgFile, setImgFile]     = useState(null);
  const [imgPreview, setImgPreview] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    if (supabase) {
      try {
        const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setPosts(data || []);
        setLoading(false); return;
      } catch (err) { console.error(err.message); }
    }
    setPosts(blogPosts.map(p => ({ ...p, published: true, image_url: p.image, cover_url: p.image })));
    setLoading(false);
  };

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert({ type: '', msg: '' }), 3500); };

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'title' && !editId ? { slug: generateSlug(value) } : {}),
    }));
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    const url = URL.createObjectURL(file);
    setImgPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalForm = { ...form };

      // Upload image if selected
      if (imgFile && supabase) {
        setUploading(true);
        const { url } = await uploadImage(imgFile, BUCKETS.POSTS, 'covers');
        finalForm.cover_url = url;
        finalForm.image_url = url;
        setUploading(false);
      }

      if (supabase) {
        if (editId) {
          const { error } = await supabase.from('posts').update(finalForm).eq('id', editId);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('posts').insert([finalForm]);
          if (error) throw error;
        }
      }

      showAlert('success', editId ? 'Artikel berhasil diperbarui!' : 'Artikel baru berhasil ditambahkan!');
      setShowForm(false);
      setForm(emptyForm);
      setEditId(null);
      setImgFile(null);
      setImgPreview('');
      fetchPosts();
    } catch (err) { showAlert('error', err.message); }
    setSaving(false);
  };

  const handleEdit = (post) => {
    setForm({ ...post, date: post.date || post.created_at?.split('T')[0] || '' });
    setEditId(post.id);
    setImgPreview(post.cover_url || post.image_url || '');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus artikel ini?')) return;
    try {
      if (supabase) {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) throw error;
      }
      showAlert('success', 'Artikel dihapus.');
      fetchPosts();
    } catch (err) { showAlert('error', err.message); }
  };

  const handleTogglePublish = async (post) => {
    try {
      if (supabase) {
        const { error } = await supabase.from('posts').update({ published: !post.published }).eq('id', post.id);
        if (error) throw error;
      }
      fetchPosts();
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
          <h1 className="tab-title">Manajemen Kabar & Artikel</h1>
          <p className="tab-subtitle">Tambah, edit, dan atur publikasi artikel yang tampil di halaman Kabar.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => { cancelForm(); setShowForm(true); }}>
          <FiPlus /> Artikel Baru
        </button>
      </div>

      {alert.msg && <div className={`admin-alert-${alert.type}`}>{alert.msg}</div>}

      {/* Form */}
      {showForm && (
        <div className="admin-form-card">
          <h3 className="admin-form-title">{editId ? 'Edit Artikel' : 'Tambah Artikel Baru'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-row" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Judul Artikel *</label>
                <input className="form-input" name="title" value={form.title} onChange={handleFormChange} required placeholder="Judul yang menarik..." />
              </div>
              <div className="form-group">
                <label className="form-label">Slug URL</label>
                <input className="form-input" name="slug" value={form.slug} onChange={handleFormChange} placeholder="auto-dari-judul" />
              </div>
            </div>

            <div className="admin-form-row" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Kategori</label>
                <select className="form-select" name="category" value={form.category} onChange={handleFormChange}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tanggal</label>
                <input className="form-input" type="date" name="date" value={form.date} onChange={handleFormChange} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Ringkasan / Excerpt</label>
              <textarea className="form-textarea" name="excerpt" value={form.excerpt} onChange={handleFormChange}
                placeholder="Ringkasan singkat artikel untuk tampil di daftar..." style={{ minHeight: '70px' }} />
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Isi Artikel (Konten Penuh)</label>
              <textarea className="form-textarea" name="content" value={form.content} onChange={handleFormChange}
                placeholder="Tulis isi artikel lengkap di sini..." style={{ minHeight: '200px' }} required />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label"><FiImage style={{ display: 'inline', marginRight: '6px' }} />Foto Cover (auto-konversi ke WebP)</label>
              <input type="file" accept="image/*" className="form-input" onChange={handleImageSelect}
                style={{ padding: '8px' }} />
              {imgPreview && <img src={imgPreview} alt="preview" style={{ marginTop: '10px', borderRadius: '8px', maxHeight: '160px', objectFit: 'cover', width: '100%' }} />}
              {!supabase && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '6px' }}>⚠️ Upload foto aktif setelah Supabase terhubung.</p>}
            </div>

            <div className="form-group" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="published" name="published" checked={form.published} onChange={handleFormChange} style={{ width: '16px', height: '16px' }} />
              <label htmlFor="published" className="form-label" style={{ margin: 0 }}>Publikasikan artikel (tampil di halaman Kabar publik)</label>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                disabled={saving || uploading}>
                <FiCheck /> {saving ? (uploading ? 'Mengupload foto...' : 'Menyimpan...') : 'Simpan Artikel'}
              </button>
              <button type="button" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={cancelForm}>
                <FiX /> Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && <div className="admin-empty"><div className="admin-empty-icon">⏳</div><p>Memuat artikel...</p></div>}

      {!loading && posts.length === 0 && !showForm && (
        <div className="admin-empty">
          <div className="admin-empty-icon"><FiImage /></div>
          <p>Belum ada artikel. Klik "Artikel Baru" untuk memulai.</p>
        </div>
      )}

      {!loading && posts.map(post => (
        <div key={post.id} className="admin-card">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            {(post.cover_url || post.image_url || post.image) && (
              <img src={post.cover_url || post.image_url || post.image} alt=""
                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
                <h3 className="admin-card-title" style={{ marginBottom: 0 }}>{post.title}</h3>
                <span className={`status-pill ${post.published ? 'published' : 'draft'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="admin-card-meta">
                <span>🗂 {post.category}</span>
                <span>📅 {post.date || post.created_at?.split('T')[0]}</span>
                {post.slug && <span>🔗 /{post.slug}</span>}
              </div>
              {post.excerpt && <p className="admin-card-text" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
              <button onClick={() => handleTogglePublish(post)} className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {post.published ? <><FiEyeOff size={12} /> Draft</> : <><FiEye size={12} /> Publish</>}
              </button>
              <button onClick={() => handleEdit(post)} className="btn-secondary"
                style={{ padding: '6px 10px', fontSize: '16px', display: 'flex' }}><FiEdit2 /></button>
              <button onClick={() => handleDelete(post.id)}
                style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', color: 'var(--color-primary-light)', borderRadius: 'var(--border-radius)', padding: '6px 10px', cursor: 'pointer', fontSize: '16px', display: 'flex' }}>
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
