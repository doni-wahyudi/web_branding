import { useState } from 'react';
import { FiUsers, FiHeart, FiTrendingUp, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import siteConfig from '../../data/siteConfig';
import { supabase } from '../../utils/supabaseClient';
import './DukunganPage.css';

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
    quote: "Menjadi bagian dari gerakan ini membuka mata saya tentang betapa pentingnya suara rakyat. Kami benar-benar turun tangan membantu warga yang membutuhkan.",
    author: "Dimas Pratama",
    role: "Relawan sejak 2019",
  },
  {
    quote: "Saya bangga bisa berkontribusi langsung di lapangan. Tim ini profesional dan selalu memberikan arahan yang jelas dalam setiap kegiatan sosial.",
    author: "Siti Nurhaliza",
    role: "Relawan Sosial 2024",
  },
  {
    quote: "Sebagai pemuda, saya merasa ini cara terbaik untuk berkontribusi bagi daerah. Tim ini benar-benar merangkul semua kalangan tanpa membeda-bedakan.",
    author: "Fajar Ramadhan",
    role: "Relawan Muda",
  },
];

export default function DukunganPage() {
  const [form, setForm] = useState({
    nama: '',
    nik: '',
    phone: '',
    kabupaten: '',
    kecamatan: '',
    kelurahan: '',
    role: 'relawan',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const roleLabel = form.role === 'relawan' ? 'Relawan Lapangan' : form.role === 'donasi' ? 'Kontributor Sosial' : 'Relawan & Kontributor';
    
    // 1. Save to Supabase if available
    if (supabase) {
      try {
        const { error } = await supabase.from('volunteers').insert([
          {
            name: form.nama,
            nik: form.nik,
            phone: form.phone,
            kabupaten: form.kabupaten,
            kecamatan: form.kecamatan,
            kelurahan: form.kelurahan,
            role: roleLabel,
            status: 'pending'
          }
        ]);
        if (error) throw error;
      } catch (err) {
        console.error('Gagal mendaftar relawan di Supabase:', err.message);
      }
    } else {
      // Mock save to localStorage
      const saved = localStorage.getItem('volunteers-data');
      const current = saved ? JSON.parse(saved) : [];
      const newVol = {
        id: Date.now(),
        name: form.nama,
        nik: form.nik,
        phone: form.phone,
        kabupaten: form.kabupaten,
        kecamatan: form.kecamatan,
        kelurahan: form.kelurahan,
        role: roleLabel,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      localStorage.setItem('volunteers-data', JSON.stringify([newVol, ...current]));
    }

    setSubmitting(false);

    // 2. Open WhatsApp
    const message = `*PENDAFTARAN RELAWAN & DUKUNGAN*%0A%0ANama: ${form.nama}%0ANIK: ${form.nik}%0ANo. HP: ${form.phone}%0AKabupaten: ${form.kabupaten}%0AKecamatan: ${form.kecamatan}%0AKelurahan/Desa: ${form.kelurahan}%0ABentuk Kontribusi: ${roleLabel}`;
    const waLink = `https://wa.me/${siteConfig.whatsapp}?text=${message}`;
    window.open(waLink, '_blank');

    // Reset Form
    setForm({
      nama: '',
      nik: '',
      phone: '',
      kabupaten: '',
      kecamatan: '',
      kelurahan: '',
      role: 'relawan',
    });
  };

  return (
    <div className="dukungan-page">
      {/* Hero */}
      <section className="dukungan-hero">
        <div className="container">
          <div className="badge" style={{ marginBottom: '16px' }}>
            <FiUsers /> Dukungan & Relawan
          </div>
          <h1 className="section-title">Kanal Dukungan Anda</h1>
          <p className="section-subtitle">
            Jadilah bagian dari gerakan nyata bersama masyarakat. Bergabunglah sebagai relawan lapangan, kontributor sosial, atau pendukung program aspirasi untuk masa depan Provinsi Lampung yang lebih baik.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="dukungan-why">
        <div className="container">
          <div className="dukungan-why-grid">
            {whyJoinData.map((item, index) => (
              <div key={index} className="dukungan-why-card">
                <div className="dukungan-why-icon">{item.icon}</div>
                <h3 className="dukungan-why-title">{item.title}</h3>
                <p className="dukungan-why-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="dukungan-form-section">
        <div className="container">
          <div className="dukungan-form-wrapper animate-fade-in-up">
            <h2 className="dukungan-form-title">Formulir Komitmen Dukungan</h2>
            <p className="dukungan-form-desc">
              Isi data diri Anda di bawah ini. Data komitmen dukungan akan dikirim langsung ke WhatsApp tim koordinasi pusat.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input type="text" name="nama" className="form-input" placeholder="Masukkan nama lengkap" value={form.nama} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">NIK (Nomor Induk Kependudukan)</label>
                  <input type="text" name="nik" className="form-input" placeholder="16 digit NIK" maxLength={16} value={form.nik} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">No. HP / WhatsApp</label>
                  <input type="tel" name="phone" className="form-input" placeholder="08xxxxxxxxxx" value={form.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
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
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: '1 1 100%' }}>
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
              </div>

              <div className="form-group">
                <label className="form-label">Kelurahan / Desa</label>
                <input type="text" name="kelurahan" className="form-input" placeholder="Masukkan kelurahan atau desa" value={form.kelurahan} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Bentuk Kontribusi</label>
                <div className="form-radio-group">
                  <div className="form-radio-option">
                    <input type="radio" id="role-relawan" name="role" value="relawan" checked={form.role === 'relawan'} onChange={handleChange} />
                    <label htmlFor="role-relawan" className="form-radio-label">
                      <FiUsers /> Relawan Lapangan
                    </label>
                  </div>
                  <div className="form-radio-option">
                    <input type="radio" id="role-donasi" name="role" value="donasi" checked={form.role === 'donasi'} onChange={handleChange} />
                    <label htmlFor="role-donasi" className="form-radio-label">
                      <FiHeart /> Kontributor Sosial
                    </label>
                  </div>
                  <div className="form-radio-option">
                    <input type="radio" id="role-both" name="role" value="both" checked={form.role === 'both'} onChange={handleChange} />
                    <label htmlFor="role-both" className="form-radio-label">
                      <FiTrendingUp /> Relawan & Kontributor
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary form-submit" style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }} disabled={submitting}>
                <FiSend /> {submitting ? 'Mengirim...' : 'Kirim Dukungan via WhatsApp'}
              </button>

              <div className="form-whatsapp-note">
                <FaWhatsapp size={18} />
                Pernyataan dukungan Anda akan dikirim langsung ke WhatsApp tim koordinasi
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Counter */}
      <section className="dukungan-counter">
        <div className="container">
          <div className="dukungan-counter-number">2.450+</div>
          <p className="dukungan-counter-label">Relawan & Pendukung Terdaftar Secara Resmi</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="dukungan-testimonials">
        <div className="container">
          <div className="dukungan-testimonials-header">
            <div className="badge" style={{ marginBottom: '16px' }}>Testimoni</div>
            <h2 className="section-title">Kata Mereka tentang Perjuangan Kita</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((item, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-quote">"{item.quote}"</p>
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
