import { useState, useEffect } from 'react';
import { FiMessageCircle, FiSend, FiDownload, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import siteConfig from '../../data/siteConfig';
import { supabase } from '../../utils/supabaseClient';
import './QuickAspirasiPage.css';

export default function QuickAspirasiPage() {
  const [form, setForm] = useState({
    nama: '',
    phone: '',
    kabupaten: '',
    kecamatan: '',
    detail: '',
  });

  const [currentUrl, setCurrentUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Resolve current URL dynamically for the QR code
    setCurrentUrl(window.location.href);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formattedMessage = `*ASPIRASI WARGA (KILAT)*%0A%0A*Nama:* ${form.nama}%0A*No. HP:* ${form.phone}%0A*Kabupaten:* ${form.kabupaten}%0A*Kecamatan:* ${form.kecamatan}%0A%0A*Aspirasi:*%0A${form.detail}`;
    
    // 1. If Supabase is connected, write directly to the database
    if (supabase) {
      try {
        const { error } = await supabase.from('aspirations').insert([
          {
            name: form.nama,
            phone: form.phone,
            kabupaten: form.kabupaten,
            kecamatan: form.kecamatan,
            category: 'Lainnya',
            subject: 'Aspirasi Kilat Warga',
            detail: form.detail,
            status: 'received',
            date: new Date().toISOString().split('T')[0]
          }
        ]);
        if (error) throw error;
      } catch (err) {
        console.error('Gagal menulis data ke Supabase:', err.message);
      }
    } else {
      // Fallback: save to localStorage mock database
      const saved = localStorage.getItem('aspirations-data');
      let currentAspirations = saved ? JSON.parse(saved) : [];
      const newAspiration = {
        id: Date.now(),
        name: form.nama,
        phone: form.phone,
        kabupaten: form.kabupaten,
        kecamatan: form.kecamatan,
        category: 'Lainnya',
        subject: 'Aspirasi Kilat Warga',
        detail: form.detail,
        status: 'received',
        date: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem('aspirations-data', JSON.stringify([newAspiration, ...currentAspirations]));
    }

    setSubmitting(false);
    setSubmitSuccess(true);

    // 2. Open WhatsApp in new tab
    const waLink = `https://wa.me/${siteConfig.whatsapp}?text=${formattedMessage}`;
    window.open(waLink, '_blank');

    // Reset form after a delay
    setTimeout(() => {
      setForm({ nama: '', phone: '', kabupaten: '', kecamatan: '', detail: '' });
      setSubmitSuccess(false);
    }, 4000);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}`;
  const downloadQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(currentUrl)}&download=1`;

  return (
    <div className="quick-aspirasi-page">
      <div className="quick-container">
        {/* Banner header */}
        <div className="quick-header animate-fade-in-up">
          <div className="badge" style={{ marginBottom: '12px' }}>
            <FiMessageCircle /> Pojok Aspirasi QR
          </div>
          <h1 className="quick-title">Kanal Suara Rakyat</h1>
          <p className="quick-subtitle">
            Pindai Kode QR atau isi formulir di bawah secara instan untuk menyampaikan aduan langsung ke tim <strong>{siteConfig.name}</strong>.
          </p>
        </div>

        <div className="quick-grid animate-fade-in-up">
          {/* QR Code Placard */}
          <div className="quick-qr-card">
            <h3 className="quick-card-title">Bagikan QR Code Aspirasi</h3>
            <p className="quick-card-desc">
              Tunjukkan atau cetak QR Code ini di kantor kelurahan, balai warga, baliho, atau brosur agar warga bisa langsung memindai dan mengirim aspirasi mereka secara mudah lewat handphone!
            </p>

            <div className="quick-qr-box">
              {currentUrl ? (
                <img src={qrCodeUrl} alt="QR Code Aspirasi Warga" className="quick-qr-img" />
              ) : (
                <div style={{ height: '220px', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Memuat Kode QR...</div>
              )}
              <div className="quick-qr-badge">PINDAI SAYA</div>
            </div>

            <a href={downloadQrCodeUrl} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: 'var(--font-size-sm)' }}>
              <FiDownload /> Unduh QR Resolusi Tinggi (Cetak)
            </a>
          </div>

          {/* Simplified Fast Form */}
          <div className="quick-form-card">
            <h3 className="quick-card-title">Formulir Cepat Aspirasi</h3>
            <p className="quick-card-desc" style={{ marginBottom: '24px' }}>
              Isi data di bawah ini untuk menyuarakan masalah Anda dalam 1 menit:
            </p>

            {submitSuccess && (
              <div className="quick-success-alert animate-fade-in-up">
                <FiCheckCircle size={20} />
                Aspirasi berhasil terkirim dan disimpan! WhatsApp sedang dibuka...
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Nama Anda</label>
                <input
                  type="text"
                  name="nama"
                  className="form-input"
                  placeholder="Masukkan nama Anda"
                  value={form.nama}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
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

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Kabupaten / Kota</label>
                <select
                  name="kabupaten"
                  className="form-select"
                  value={form.kabupaten}
                  onChange={(e) => {
                    handleChange(e);
                    setForm(prev => ({ ...prev, kecamatan: '' }));
                  }}
                  required
                >
                  <option value="">Pilih Kabupaten / Kota</option>
                  {Object.keys(siteConfig.kabupatenKecamatan).map(kab => (
                    <option key={kab} value={kab}>{kab}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Kecamatan</label>
                <select
                  name="kecamatan"
                  className="form-select"
                  value={form.kecamatan}
                  onChange={handleChange}
                  disabled={!form.kabupaten}
                  required
                >
                  <option value="">Pilih Kecamatan</option>
                  {form.kabupaten && siteConfig.kabupatenKecamatan[form.kabupaten]?.map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Aduan / Masalah Anda</label>
                <textarea
                  name="detail"
                  className="form-textarea"
                  placeholder="Jelaskan secara singkat masalah di daerah Anda (misal: jalan berlubang di RT 03/RW 04 Desa Sejahtera)..."
                  value={form.detail}
                  onChange={handleChange}
                  required
                  style={{ minHeight: '120px' }}
                />
              </div>

              <button type="submit" className="btn-primary form-submit" style={{ width: '100%', justifyContent: 'center' }} disabled={submitting}>
                <FaWhatsapp size={18} style={{ marginRight: '6px' }} /> Kirim via WhatsApp
              </button>
            </form>
          </div>
        </div>

        {/* Footer note */}
        <div className="quick-footer">
          <p>{siteConfig.name} — {siteConfig.tagline}</p>
          <p style={{ opacity: 0.5, marginTop: '4px' }}>Supabase DB & WhatsApp Integration</p>
        </div>
      </div>
    </div>
  );
}
