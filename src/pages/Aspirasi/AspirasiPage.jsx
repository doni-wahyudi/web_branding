import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSend, FiMessageCircle, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import siteConfig from '../../data/siteConfig';
import './AspirasiPage.css';

export default function AspirasiPage() {
  const [form, setForm] = useState({
    nama: '',
    phone: '',
    kecamatan: '',
    category: '',
    detail: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*ASPIRASI RAKYAT*%0A%0ANama: ${form.nama}%0ANo. HP: ${form.phone}%0AKecamatan: ${form.kecamatan}%0AKategori: ${form.category}%0A%0ADetail Aspirasi:%0A${form.detail}`;
    const waLink = `https://wa.me/${siteConfig.whatsapp}?text=${message}`;
    window.open(waLink, '_blank');
  };

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
            Kami hadir untuk mendengarkan. Sampaikan aduan, saran, atau harapan Anda melalui formulir di bawah ini. Setiap suara Anda berarti.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="aspirasi-form-section">
        <div className="container">
          <div className="aspirasi-form-wrapper animate-fade-in-up">
            <h2 className="aspirasi-form-title">Formulir Aspirasi</h2>
            <p className="aspirasi-form-desc">
              Isi formulir berikut untuk menyampaikan aspirasi Anda. Data akan dikirim langsung ke tim melalui WhatsApp.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
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
                <div className="form-group">
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
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Kecamatan</label>
                  <select
                    name="kecamatan"
                    className="form-select"
                    value={form.kecamatan}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Kecamatan</option>
                    {siteConfig.kecamatan.map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Kategori Aspirasi</label>
                  <select
                    name="category"
                    className="form-select"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {siteConfig.categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Detail Aspirasi</label>
                <textarea
                  name="detail"
                  className="form-textarea"
                  placeholder="Jelaskan aspirasi, aduan, atau saran Anda secara detail..."
                  value={form.detail}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primary form-submit">
                <FiSend /> Kirim via WhatsApp
              </button>

              <div className="form-whatsapp-note">
                <FaWhatsapp size={18} />
                Aspirasi Anda akan dikirim langsung ke WhatsApp tim {siteConfig.name}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Link to Transparansi */}
      <section className="aspirasi-transparansi-link">
        <div className="container">
          <h3>Ingin melihat status aspirasi yang sudah masuk?</h3>
          <p>Kami bekerja secara transparan. Pantau status aspirasi rakyat secara real-time.</p>
          <Link to="/aspirasi/transparansi" className="btn-primary">
            Lihat Transparansi Aspirasi <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
