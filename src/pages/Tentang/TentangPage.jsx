import { FiUser, FiBookOpen, FiBriefcase, FiAward, FiHeart, FiMapPin, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import siteConfig from '../../data/siteConfig';
import './TentangPage.css';

export default function TentangPage() {
  const visiNilai = [
    {
      icon: <FiAward />,
      title: "Transparansi Total",
      desc: "Menjamin seluruh proses legislasi, penganggaran daerah, dan pengawasan kerja dinas Provinsi Lampung dipublikasikan secara transparan agar bisa diawasi langsung oleh rakyat."
    },
    {
      icon: <FiBriefcase />,
      title: "Pembangunan Berkeadilan",
      desc: "Memastikan anggaran pembangunan difokuskan untuk infrastruktur jalan, jembatan, irigasi, dan listrik di desa-desa Lampung yang selama ini minim perhatian."
    },
    {
      icon: <FiBookOpen />,
      title: "Pendidikan & SDM Unggul",
      desc: "Mendorong program beasiswa perguruan tinggi untuk anak petani/nelayan Lampung, peningkatan mutu sekolah kejuruan, dan pembinaan kewirausahaan pemuda."
    },
    {
      icon: <FiHeart />,
      title: "Kesehatan Terjangkau",
      desc: "Memperjuangkan perluasan jangkauan BPJS gratis di Lampung, perbaikan layanan Puskesmas 24 jam di pelosok, dan penyediaan ambulans desa gratis."
    }
  ];

  return (
    <div className="tentang-page">
      {/* Hero Header */}
      <section className="tentang-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Beranda</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Tentang</span>
          </div>
          <div className="tentang-hero-content animate-fade-in-up">
            <div className="badge"><FiUser /> Profil Legislator</div>
            <h1 className="section-title text-left">Mengenal Ridho Saputra</h1>
            <p className="section-subtitle text-left">
              Mengabdi dengan ketulusan, berjuang dengan integritas, dan melayani masyarakat Provinsi Lampung dengan tindakan nyata.
            </p>
          </div>
        </div>
      </section>

      {/* Biografi Utama */}
      <section className="tentang-bio">
        <div className="container">
          <div className="bio-grid">
            <div className="bio-left animate-fade-in-up">
              <div className="bio-image-wrapper">
                <div className="bio-image-glow"></div>
                <img src="images/profile-hero.webp" alt={siteConfig.name} className="bio-img" />
                <div className="bio-badge">
                  <h4>{siteConfig.name}</h4>
                  <p>{siteConfig.title}</p>
                </div>
              </div>
            </div>
            
            <div className="bio-right animate-fade-in-up">
              <h3 className="bio-heading">Biografi & Perjalanan Hidup</h3>
              <p className="bio-text">
                Lahir dan dibesarkan di pesisir **Krui, Pesisir Barat, Lampung**, <strong>{siteConfig.name}</strong> memahami betul dinamika kehidupan masyarakat pesisir, tantangan ekonomi perdesaan, dan impian kemajuan masyarakat di Bumi Ruwa Jurai. Tumbuh besar di Krui membentuk kecintaan mendalam dan komitmen kuatnya untuk memajukan daerah kelahirannya.
              </p>
              <p className="bio-text">
                Beliau menempuh pendidikan tinggi di **Institut Pertanian Bogor (IPB)**. Latar belakang akademis S1 Proteksi Tanaman serta S2 Agribisnis memberinya landasan analitis yang kuat tentang ketahanan pangan, rantai pasok ekonomi pertanian, dan strategi pemberdayaan komunitas tani/nelayan yang menjadi tulang punggung perekonomian Provinsi Lampung.
              </p>
              <p className="bio-text">
                Sebelum memasuki panggung legislatif DPRD Provinsi Lampung, Ridho mendedikasikan bertahun-tahun waktunya dalam aksi kerelawanan sosial. Sebagai inisiator gerakan sosial kepemudaan, beliau percaya bahwa perubahan sejati hanya bisa diwujudkan jika kita mau turun langsung mendengarkan dan merasakan kesulitan warga di lapangan.
              </p>
              <p className="bio-text font-italic">
                "Kekuasaan legislatif bukanlah tentang hak istimewa, melainkan kewajiban mutlak untuk menyuarakan aspirasi mereka yang tidak terdengar dan mengawal keadilan bagi seluruh lapisan masyarakat Lampung."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Riwayat & Pendidikan Timeline */}
      <section className="tentang-timeline-sec">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge" style={{ marginBottom: '12px' }}>Riwayat Hidup</div>
            <h2 className="section-title">Pendidikan & Pengabdian</h2>
            <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
              Rekam jejak akademis, kepemimpinan organisasi, dan dedikasi profesional dalam melayani masyarakat Lampung.
            </p>
          </div>

          <div className="timeline-container animate-fade-in-up">
            <div className="timeline-block">
              
              {/* Pendidikan Timeline Column */}
              <div className="timeline-col">
                <h3 className="timeline-col-title"><FiBookOpen /> Riwayat Pendidikan</h3>
                <div className="main-timeline">
                  <div className="timeline-card">
                    <div className="timeline-icon-dot"></div>
                    <span className="timeline-year">2022 - 2024</span>
                    <h4>Magister Agribisnis (M.Si.)</h4>
                    <h5>Institut Pertanian Bogor (IPB)</h5>
                    <p>Lulus dengan kajian mendalam perihal hilirisasi agroindustri, manajemen rantai pasok ketahanan pangan daerah, dan pemberdayaan agribisnis pedesaan Lampung.</p>
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-icon-dot"></div>
                    <span className="timeline-year">2015 - 2020</span>
                    <h4>Sarjana Proteksi Tanaman (S.P.)</h4>
                    <h5>Institut Pertanian Bogor (IPB)</h5>
                    <p>Aktif dalam pergerakan kepemudaan, ikatan mahasiswa pertanian, serta riset terapan di bidang pengendalian hayati hama untuk menunjang pertanian ramah lingkungan.</p>
                  </div>
                </div>
              </div>
              
              {/* Pengabdian Timeline Column */}
              <div className="timeline-col">
                <h3 className="timeline-col-title"><FiBriefcase /> Riwayat Pengabdian & Karir</h3>
                <div className="main-timeline">
                  <div className="timeline-card">
                    <div className="timeline-icon-dot"></div>
                    <span className="timeline-year">2024 - Sekarang</span>
                    <h4>Anggota DPRD Provinsi Lampung</h4>
                    <h5>DPRD Provinsi Lampung</h5>
                    <p>Mengemban amanah mengawal anggaran daerah yang transparan, memprioritaskan pembangunan infrastruktur pedesaan, serta menerima aduan masyarakat secara langsung lewat sistem digital.</p>
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-icon-dot"></div>
                    <span className="timeline-year">2020 - Sekarang</span>
                    <h4>Ketua DPD Gerakan Muda Mendunia (GEMA) Lampung</h4>
                    <h5>DPD GEMA Lampung</h5>
                    <p>Memimpin organisasi kepemudaan tingkat provinsi dalam aksi kemanusiaan, pemberdayaan ekonomi kreatif pemuda, dan advokasi sosial bagi masyarakat marjinal.</p>
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-icon-dot"></div>
                    <span className="timeline-year">2016 - 2020</span>
                    <h4>Inisiator & Pembina Yayasan</h4>
                    <h5>Lampung Digital Care</h5>
                    <p>Garda terdepan penggalangan solidaritas sosial digital, memberikan bantuan fasilitas kesehatan di pedesaan, beasiswa anak putus sekolah, dan tanggap darurat bencana di wilayah Lampung.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Pilar Nilai & Visi Perjuangan */}
      <section className="tentang-values">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge" style={{ marginBottom: '12px' }}>Pilar Nilai</div>
            <h2 className="section-title">Visi Pelayanan Publik</h2>
            <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
              Komitmen perjuangan legislatif yang bersih, terbuka, dan berfokus pada pemenuhan hak-hak dasar warga Lampung.
            </p>
          </div>

          <div className="values-grid animate-fade-in-up">
            {visiNilai.map((item, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{item.icon}</div>
                <h3 className="value-title">{item.title}</h3>
                <p className="value-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri Pengabdian Ringkas */}
      <section className="tentang-gallery">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge" style={{ marginBottom: '12px' }}>Aktivitas</div>
            <h2 className="section-title">Dokumentasi Pengabdian</h2>
            <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
              Potret kerja nyata, dengar pendapat warga, dan aksi lapangan bersama masyarakat Lampung.
            </p>
          </div>

          <div className="gallery-grid animate-fade-in-up">
            {[
              { src: 'images/blog-field-visit.webp', title: 'Dengar Aspirasi Jalan Rusak' },
              { src: 'images/blog-education.webp', title: 'Pemberian Beasiswa Belajar' },
              { src: 'images/blog-healthcare.webp', title: 'Layanan Ambulans Siaga Gratis' },
              { src: 'images/blog-infrastructure.webp', title: 'Tinjau Pembangunan Irigasi' }
            ].map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img.src} alt={img.title} />
                <div className="gallery-overlay">
                  <h4>{img.title}</h4>
                  <p>Provinsi Lampung</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hubungi Section (CTA) */}
      <section className="tentang-cta">
        <div className="container">
          <div className="tentang-cta-card">
            <h2>Ingin Berbagi Masukan Untuk Lampung Lebih Baik?</h2>
            <p>
              Pintu komunikasi selalu terbuka lebar bagi setiap gagasan, keluhan, atau ide konstruktif Anda. Mari bersama mengawal pembangunan Provinsi Lampung yang bersih, maju, dan berkeadilan.
            </p>
            <div className="tentang-cta-actions">
              <Link to="/aspirasi" className="btn-primary">
                Sampaikan Aspirasi Sekarang <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
