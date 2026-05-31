import { useState, useEffect } from 'react';
import { FiCheck, FiImage, FiPlus, FiTrash2 } from 'react-icons/fi';
import { supabase } from '../../../utils/supabaseClient';
import { uploadImage, BUCKETS } from '../../../utils/imageUtils';
import staticConfig from '../../../data/siteConfig';

export default function ProfilTab() {
  const [config, setConfig] = useState({ ...staticConfig, social: { ...staticConfig.social } });
  const [saving, setSaving] = useState(false);
  const [alert, setAlert]   = useState({ type: '', msg: '' });
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState('');

  useEffect(() => { loadConfig(); }, []);

  const loadConfig = async () => {
    if (!supabase) return;
    try {
      const { data } = await supabase.from('site_config').select('key, value');
      if (!data) return;
      const map = {};
      data.forEach(row => { map[row.key] = row.value; });

      setConfig(prev => ({
        ...prev,
        name:        map.candidate_name    || prev.name,
        tagline:     map.candidate_tagline || prev.tagline,
        whatsapp:    map.whatsapp_number   || prev.whatsapp,
        title:       map.candidate_title   || prev.title,
        fullTitle:   map.candidate_fulltitle || prev.fullTitle,
        party:       map.party             || prev.party,
        partyFull:   map.party_full        || prev.partyFull,
        dapil:       map.dapil             || prev.dapil,
        subtitle:    map.subtitle          || prev.subtitle,
        email:       map.email             || prev.email,
        address:     map.address           || prev.address,
        profileImage: map.profile_image_url || prev.profileImage,
        social: {
          instagram: map.social_instagram || prev.social.instagram,
          facebook:  map.social_facebook  || prev.social.facebook,
          twitter:   map.social_twitter   || prev.social.twitter,
          youtube:   map.social_youtube   || prev.social.youtube,
          tiktok:    map.social_tiktok    || prev.social.tiktok,
        },
        stats: map.stats_json ? JSON.parse(map.stats_json) : prev.stats,
        kecamatan: map.kecamatan_json ? JSON.parse(map.kecamatan_json) : prev.kecamatan,
      }));
    } catch (err) { console.error(err.message); }
  };

  const showAlert = (type, msg) => { setAlert({ type, msg }); setTimeout(() => setAlert({ type: '', msg: '' }), 3500); };

  const set = (key, val) => setConfig(prev => ({ ...prev, [key]: val }));
  const setSocial = (key, val) => setConfig(prev => ({ ...prev, social: { ...prev.social, [key]: val } }));
  const setStatVal = (i, field, val) =>
    setConfig(prev => ({ ...prev, stats: prev.stats.map((s, idx) => idx === i ? { ...s, [field]: field === 'value' ? Number(val) : val } : s) }));
  const setKecamatan = (i, val) =>
    setConfig(prev => ({ ...prev, kecamatan: prev.kecamatan.map((k, idx) => idx === i ? val : k) }));
  const addKecamatan = () => setConfig(prev => ({ ...prev, kecamatan: [...prev.kecamatan, ''] }));
  const removeKecamatan = (i) => setConfig(prev => ({ ...prev, kecamatan: prev.kecamatan.filter((_, idx) => idx !== i) }));

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let profileImageUrl = config.profileImage;

      if (imgFile && supabase) {
        const { url } = await uploadImage(imgFile, BUCKETS.PROFILE, 'hero');
        profileImageUrl = url;
      }

      if (supabase) {
        const rows = [
          { key: 'candidate_name',       value: config.name },
          { key: 'candidate_tagline',    value: config.tagline },
          { key: 'candidate_title',      value: config.title },
          { key: 'candidate_fulltitle',  value: config.fullTitle },
          { key: 'whatsapp_number',      value: config.whatsapp },
          { key: 'party',                value: config.party },
          { key: 'party_full',           value: config.partyFull },
          { key: 'dapil',                value: config.dapil },
          { key: 'subtitle',             value: config.subtitle },
          { key: 'email',                value: config.email },
          { key: 'address',              value: config.address },
          { key: 'profile_image_url',    value: profileImageUrl },
          { key: 'social_instagram',     value: config.social.instagram },
          { key: 'social_facebook',      value: config.social.facebook },
          { key: 'social_twitter',       value: config.social.twitter },
          { key: 'social_youtube',       value: config.social.youtube },
          { key: 'social_tiktok',        value: config.social.tiktok },
          { key: 'stats_json',           value: JSON.stringify(config.stats) },
          { key: 'kecamatan_json',       value: JSON.stringify(config.kecamatan) },
        ];
        const { error } = await supabase.from('site_config').upsert(rows, { onConflict: 'key' });
        if (error) throw error;
      }

      showAlert('success', 'Profil & konfigurasi berhasil disimpan! Refresh halaman publik untuk melihat perubahan.');
    } catch (err) { showAlert('error', err.message); }
    setSaving(false);
  };

  return (
    <div>
      <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="tab-title">Profil & Konfigurasi</h1>
          <p className="tab-subtitle">Edit informasi kandidat, kontak, sosial media, dan pengaturan website.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleSave} disabled={saving}>
          <FiCheck /> {saving ? 'Menyimpan...' : 'Simpan Semua'}
        </button>
      </div>

      {alert.msg && <div className={`admin-alert-${alert.type}`}>{alert.msg}</div>}

      <div className="admin-form-card">
        <Section title="📸 Foto Profil / Hero">
          <div className="form-group">
            <label className="form-label"><FiImage style={{ display: 'inline', marginRight: '6px' }} />Upload Foto Profil Baru (auto WebP)</label>
            <input type="file" accept="image/*" className="form-input" onChange={handleImageSelect} style={{ padding: '8px' }} />
            {(imgPreview || config.profileImage) && (
              <img src={imgPreview || config.profileImage} alt="preview" style={{ marginTop: '10px', width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--color-border)' }} />
            )}
          </div>
        </Section>

        <Section title="👤 Identitas Kandidat">
          <div className="admin-form-row" style={{ marginBottom: '12px' }}>
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input className="form-input" value={config.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Jabatan / Title</label>
              <input className="form-input" value={config.title} onChange={e => set('title', e.target.value)} />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Title Lengkap</label>
            <input className="form-input" value={config.fullTitle} onChange={e => set('fullTitle', e.target.value)} />
          </div>
          <div className="admin-form-row" style={{ marginBottom: '12px' }}>
            <div className="form-group">
              <label className="form-label">Partai</label>
              <input className="form-input" value={config.party} onChange={e => set('party', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Nama Panjang Partai</label>
              <input className="form-input" value={config.partyFull} onChange={e => set('partyFull', e.target.value)} />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Dapil</label>
            <input className="form-input" value={config.dapil} onChange={e => set('dapil', e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Tagline Utama</label>
            <input className="form-input" value={config.tagline} onChange={e => set('tagline', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Subtitle / Deskripsi Hero</label>
            <textarea className="form-textarea" value={config.subtitle} onChange={e => set('subtitle', e.target.value)} style={{ minHeight: '80px' }} />
          </div>
        </Section>

        <Section title="📞 Kontak">
          <div className="admin-form-row" style={{ marginBottom: '12px' }}>
            <div className="form-group">
              <label className="form-label">Nomor WhatsApp (format: 628xxx)</label>
              <input className="form-input" value={config.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="628123456789" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={config.email} onChange={e => set('email', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Alamat Kantor</label>
            <input className="form-input" value={config.address} onChange={e => set('address', e.target.value)} />
          </div>
        </Section>

        <Section title="📱 Sosial Media">
          {['instagram', 'facebook', 'twitter', 'youtube', 'tiktok'].map(key => (
            <div className="form-group" key={key} style={{ marginBottom: '10px' }}>
              <label className="form-label" style={{ textTransform: 'capitalize' }}>{key}</label>
              <input className="form-input" value={config.social[key] || ''} onChange={e => setSocial(key, e.target.value)} placeholder={`https://${key}.com/...`} />
            </div>
          ))}
        </Section>

        <Section title="📊 Statistik Hero">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {config.stats?.map((stat, i) => (
              <div key={i} style={{ padding: '12px', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)' }}>
                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label className="form-label" style={{ fontSize: '10px' }}>Label</label>
                  <input className="form-input" style={{ padding: '6px 10px', fontSize: 'var(--font-size-xs)' }} value={stat.label} onChange={e => setStatVal(i, 'label', e.target.value)} />
                </div>
                <div className="admin-form-row">
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '10px' }}>Angka</label>
                    <input className="form-input" type="number" style={{ padding: '6px 10px', fontSize: 'var(--font-size-xs)' }} value={stat.value} onChange={e => setStatVal(i, 'value', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '10px' }}>Suffix</label>
                    <input className="form-input" style={{ padding: '6px 10px', fontSize: 'var(--font-size-xs)' }} value={stat.suffix || ''} onChange={e => setStatVal(i, 'suffix', e.target.value)} placeholder="+, Tahun, dll" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="🗺️ Daftar Kecamatan (untuk Form Aspirasi)">
          {config.kecamatan?.map((k, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input className="form-input" value={k} onChange={e => setKecamatan(i, e.target.value)} placeholder="Nama kecamatan" />
              <button onClick={() => removeKecamatan(i)}
                style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', color: 'var(--color-primary-light)', borderRadius: 'var(--border-radius)', padding: '0 12px', cursor: 'pointer' }}>
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-sm)', marginTop: '8px' }} onClick={addKecamatan}>
            <FiPlus size={14} /> Tambah Kecamatan
          </button>
        </Section>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '32px' }}>
    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>{title}</h3>
    {children}
  </div>
);
