import { useState } from 'react';
import { FiUsers, FiShield, FiHeart, FiTrendingUp, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import siteConfig from '../../data/siteConfig';
import './RelawanPage.css';

const whyJoinData = [
  {
    icon: <FiHeart />,
    title: "Berjuang untuk Rakyat",
    description: "Bergabunglah dalam gerakan nyata membantu masyarakat. Setiap kontribusi Anda berdampak langsung bagi kehidupan warga.",
  },
  {
    icon: <FiUsers />,
    title: "Komunitas Solid",
    description: "Jadilah bagian dari jaringan relawan yang solid, saling mendukung, dan bersama-sama mewujudkan perubahan positif.",
  },
  {
    icon: <FiTrendingUp />,
    title: "Pengembangan Diri",
    description: "Dapatkan pelatihan kepemimpinan, komunikasi, dan organisasi. Tingkatkan kapasitas diri sambil berkontribusi untuk sesama.",
  },
];

const testimonials = [
  {
    quote: "Menjadi relawan Pak Ridho membuka mata saya tentang betapa pentingnya suara rakyat. Kami tidak hanya bekerja untuk menang, tapi benar-benar membantu warga.",
    author: "Dimas Pratama",
    role: "Relawan sejak 2019",
  },
  {
    quote: "Saya bangga menjadi saksi TPS di pemilu kemarin. Prosesnya profesional dan kami diberikan pelatihan yang sangat baik oleh tim Pak Ridho.",
    author: "Siti Nurhaliza",
    role: "Saksi TPS 2024",
  },
  {
    quote: "Sebagai pemuda, saya merasa ini cara terbaik untuk berkontribusi bagi daerah. Tim ini benar-benar merangkul semua kalangan tanpa membeda-bedakan.",
    author: "Fajar Ramadhan",
    role: "Relawan Muda GEMA",
  },
];

export default function RelawanPage() {
  const [form, setForm] = useState({
    nama: '',
    nik: '',
    phone: '',
    kecamatan: '',
    kelurahan: '',
    role: 'relawan',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roleLabel = form.role === 'relawan' ? 'Relawan Pemenangan' : form.role === 'saksi' ? 'Saksi TPS' : 'Relawan & Saksi TPS';
    const message = `*PENDAFTARAN RELAWAN*%0A%0ANama: ${form.nama}%0ANIK: ${form.nik}%0ANo. HP: ${form.phone}%0AKecamatan: ${form.kecamatan}%0AKelurahan/Desa: ${form.kelurahan}%0APilihan: ${roleLabel}`;
    const waLink = `https://wa.me/${siteConfig.whatsapp}?text=${message}`;
    window.open(waLink, '_blank');
  };

  return (
    <div className="relawan-page">
      {/* Hero */}
      <section className="relawan-hero">
        <div className="container">
          <div className="badge" style={{ marginBottom: '16px' }}>
            <FiUsers /> Relawan & Dukungan
          </div>
          <h1 className="section-title">Bergabung Bersama Kami</h1>
          <p className="section-subtitle">
            Jadilah bagian dari perubahan. Daftarkan diri Anda sebagai relawan pemenangan atau saksi TPS untuk masa depan yang lebih baik.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="relawan-why">
        <div className="container">
          <div className="relawan-why-grid">
            {whyJoinData.map((item, index) => (
              <div key={index} className="relawan-why-card">
                <div className="relawan-why-icon">{item.icon}</div>
                <h3 className="relawan-why-title">{item.title}</h3>
                <p className="relawan-why-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="relawan-form-section">
        <div className="container">
          <div className="relawan-form-wrapper animate-fade-in-up">
            <h2 className="relawan-form-title">Formulir Pendaftaran</h2>
            <p className="relawan-form-desc">
              Isi data diri Anda di bawah ini. Data akan dikirim langsung ke WhatsApp tim koordinasi relawan.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input type="text" name="nama" className="form-input" placeholder="Masukkan nama lengkap" value={form.nama} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">NIK</label>
                  <input type="text" name="nik" className="form-input" placeholder="16 digit NIK" maxLength={16} value={form.nik} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">No. HP / WhatsApp</label>
                  <input type="tel" name="phone" className="form-input" placeholder="08xxxxxxxxxx" value={form.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Kecamatan</label>
                  <select name="kecamatan" className="form-select" value={form.kecamatan} onChange={handleChange} required>
                    <option value="">Pilih Kecamatan</option>
                    {siteConfig.kecamatan.map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Kelurahan / Desa</label>
                <input type="text" name="kelurahan" className="form-input" placeholder="Masukkan kelurahan atau desa" value={form.kelurahan} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Daftar Sebagai</label>
                <div className="form-radio-group">
                  <div className="form-radio-option">
                    <input type="radio" id="role-relawan" name="role" value="relawan" checked={form.role === 'relawan'} onChange={handleChange} />
                    <label htmlFor="role-relawan" className="form-radio-label">
                      <FiUsers /> Relawan Pemenangan
                    </label>
                  </div>
                  <div className="form-radio-option">
                    <input type="radio" id="role-saksi" name="role" value="saksi" checked={form.role === 'saksi'} onChange={handleChange} />
                    <label htmlFor="role-saksi" className="form-radio-label">
                      <FiShield /> Saksi TPS
                    </label>
                  </div>
                  <div className="form-radio-option">
                    <input type="radio" id="role-both" name="role" value="both" checked={form.role === 'both'} onChange={handleChange} />
                    <label htmlFor="role-both" className="form-radio-label">
                      <FiHeart /> Keduanya
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary form-submit" style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }}>
                <FiSend /> Daftar via WhatsApp
              </button>

              <div className="form-whatsapp-note">
                <FaWhatsapp size={18} />
                Pendaftaran Anda akan dikirim langsung ke WhatsApp tim koordinasi
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Counter */}
      <section className="relawan-counter">
        <div className="container">
          <div className="relawan-counter-number">2.450+</div>
          <p className="relawan-counter-label">Relawan dan Pendukung Terdaftar</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relawan-testimonials">
        <div className="container">
          <div className="relawan-testimonials-header">
            <div className="badge" style={{ marginBottom: '16px' }}>Testimoni</div>
            <h2 className="section-title">Kata Mereka tentang Kami</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((item, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-quote">{item.quote}</p>
                <div className="testimonial-author">{item.author}</div>
                <div className="testimonial-role">{item.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
