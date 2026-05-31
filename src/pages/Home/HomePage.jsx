import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle, FiUsers, FiArrowRight, FiCheckCircle, FiClock, FiInbox, FiBookOpen, FiActivity, FiBriefcase, FiAward } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig';
import blogPosts from '../../data/blogPosts';
import aspirations from '../../data/aspirations';
import StatCounter from '../../components/StatCounter/StatCounter';
import BlogCard from '../../components/BlogCard/BlogCard';
import './HomePage.css';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('profil');
  
  const received = aspirations.filter(a => a.status === 'received').length;
  const processing = aspirations.filter(a => a.status === 'processing').length;
  const done = aspirations.filter(a => a.status === 'done').length;

  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-bg">
          <img src="images/hero-background.webp" alt="Landscape" />
        </div>
        <div className="home-hero-content">
          <div className="home-hero-text">
            <div className="home-hero-badge">
              <span className="home-hero-badge-dot"></span>
              {siteConfig.party} — {siteConfig.partyFull}
            </div>
            <h1 className="home-hero-title">
              Suara Rakyat,<br />
              <span>Perjuangan Nyata</span>
            </h1>
            <p className="home-hero-subtitle">{siteConfig.subtitle}</p>
            <p className="home-hero-name">{siteConfig.name} — {siteConfig.title}</p>
            <div className="home-hero-actions">
              <Link to="/aspirasi" className="btn-primary">
                <FiMessageCircle /> Sampaikan Aspirasi
              </Link>
              <Link to="/rekam-jejak" className="btn-secondary">
                Rekam Jejak <FiArrowRight />
              </Link>
            </div>
          </div>
          <div className="home-hero-image">
            <div className="home-hero-image-wrapper">
              <div className="home-hero-image-glow"></div>
              <img src="images/profile-hero.webp" alt={siteConfig.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="home-stats">
        <div className="container">
          <StatCounter stats={siteConfig.stats} />
        </div>
      </section>

      {/* Perkenalan Singkat / CV Section */}
      <section className="home-intro">
        <div className="container">
          <div className="home-intro-wrapper">
            <div className="home-intro-grid">
              
              {/* Kolom Kiri: Profil & Visi */}
              <div className="home-intro-left animate-fade-in-up">
                <div className="badge" style={{ marginBottom: '16px' }}>Mengenal Lebih Dekat</div>
                <h2 className="section-title text-left">Dedikasi Nyata Untuk Rakyat Lampung</h2>
                <p className="home-intro-text">
                  Sebagai bagian dari generasi muda yang dipercaya mengemban amanah di DPRD Provinsi Lampung, <strong>{siteConfig.name}</strong> berkomitmen mengabdikan seluruh tenaga dan pemikirannya untuk kemajuan daerah. 
                </p>
                <p className="home-intro-text">
                  Melalui keterbukaan, kerja nyata, dan penyerapan aspirasi yang transparan, beliau bertekad menjadi jembatan yang kokoh bagi kemakmuran dan pembangunan yang merata di seluruh penjuru Provinsi Lampung.
                </p>
                
                <div className="intro-vision-box">
                  <div className="intro-vision-item">
                    <div className="intro-vision-icon"><FiAward /></div>
                    <div>
                      <h4>Integritas & Keterbukaan</h4>
                      <p>Menjamin setiap aspirasi ditindaklanjuti secara akuntabel dan transparan.</p>
                    </div>
                  </div>
                  <div className="intro-vision-item">
                    <div className="intro-vision-icon"><FiActivity /></div>
                    <div>
                      <h4>Pembangunan Merata</h4>
                      <p>Fokus mengawal perbaikan infrastruktur jalan, fasilitas kesehatan, dan sekolah di pedesaan.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Kolom Kanan: CV Card Interaktif */}
              <div className="home-intro-right animate-fade-in-up">
                <div className="cv-card">
                  <div className="cv-card-header">
                    <h3>Curriculum Vitae Singkat</h3>
                    <p>{siteConfig.fullTitle}</p>
                  </div>
                  
                  {/* Tab Navigation */}
                  <div className="cv-tabs">
                    <button 
                      className={`cv-tab-btn ${activeTab === 'profil' ? 'active' : ''}`}
                      onClick={() => setActiveTab('profil')}
                    >
                      <FiUsers /> Profil
                    </button>
                    <button 
                      className={`cv-tab-btn ${activeTab === 'pendidikan' ? 'active' : ''}`}
                      onClick={() => setActiveTab('pendidikan')}
                    >
                      <FiBookOpen /> Pendidikan
                    </button>
                    <button 
                      className={`cv-tab-btn ${activeTab === 'organisasi' ? 'active' : ''}`}
                      onClick={() => setActiveTab('organisasi')}
                    >
                      <FiBriefcase /> Pengabdian
                    </button>
                  </div>
                  
                  {/* Tab Content */}
                  <div className="cv-tab-content">
                    {activeTab === 'profil' && (
                      <div className="cv-tab-panel animate-fade-in-up">
                        <table className="cv-table">
                          <tbody>
                            <tr>
                              <td className="cv-table-label">Nama Lengkap</td>
                              <td>{siteConfig.name}</td>
                            </tr>
                            <tr>
                              <td className="cv-table-label">Jabatan</td>
                              <td>{siteConfig.title}</td>
                            </tr>
                            <tr>
                              <td className="cv-table-label">Partai Politik</td>
                              <td>{siteConfig.party} ({siteConfig.partyFull})</td>
                            </tr>
                            <tr>
                              <td className="cv-table-label">Visi Utama</td>
                              <td>"Mendorong transparansi kebijakan legislatif dan pembangunan berbasis aspirasi rakyat Lampung."</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    {activeTab === 'pendidikan' && (
                      <div className="cv-tab-panel animate-fade-in-up">
                        <div className="cv-timeline">
                          <div className="cv-timeline-item">
                            <span className="cv-timeline-year">2022 - 2024</span>
                            <h4 className="cv-timeline-title">S2 Agribisnis</h4>
                            <p className="cv-timeline-desc">Institut Pertanian Bogor (IPB) — Riset komprehensif mengenai hilirisasi pertanian, rantai pasok agribisnis, dan kesejahteraan petani di Lampung Pesisir.</p>
                          </div>
                          <div className="cv-timeline-item">
                            <span className="cv-timeline-year">2015 - 2020</span>
                            <h4 className="cv-timeline-title">S1 Proteksi Tanaman</h4>
                            <p className="cv-timeline-desc">Institut Pertanian Bogor (IPB) — Aktif dalam ikatan mahasiswa pertanian dan riset pengendalian hayati hama tanaman pangan.</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'organisasi' && (
                      <div className="cv-tab-panel animate-fade-in-up">
                        <div className="cv-timeline">
                          <div className="cv-timeline-item">
                            <span className="cv-timeline-year">2024 - Sekarang</span>
                            <h4 className="cv-timeline-title">Anggota DPRD Provinsi Lampung</h4>
                            <p className="cv-timeline-desc">Fokus komisi pembangunan daerah, anggaran belanja transparan, dan infrastruktur desa.</p>
                          </div>
                          <div className="cv-timeline-item">
                            <span className="cv-timeline-year">2020 - Sekarang</span>
                            <h4 className="cv-timeline-title">Ketua DPD Gerakan Muda Mendunia (GEMA) Lampung</h4>
                            <p className="cv-timeline-desc">Memimpin organisasi kepemudaan untuk program pemberdayaan UMKM, pendidikan gratis, dan advokasi sosial.</p>
                          </div>
                          <div className="cv-timeline-item">
                            <span className="cv-timeline-year">2016 - 2020</span>
                            <h4 className="cv-timeline-title">Inisiator Lampung Digital Care</h4>
                            <p className="cv-timeline-desc">Mendirikan yayasan sosial untuk menggalang donasi kesehatan, pendidikan inklusif, dan tanggap bencana daerah.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="cv-card-footer">
                    <Link to="/tentang" className="btn-secondary w-full text-center" style={{ justifyContent: 'center' }}>
                      Selengkapnya Tentang Ridho <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Aspirasi Highlight */}
      <section className="home-aspirasi">
        <div className="container">
          <div className="home-aspirasi-header">
            <div className="badge" style={{ marginBottom: '16px' }}>Transparansi</div>
            <h2 className="section-title">Aspirasi Rakyat Kami Kawal</h2>
            <p className="section-subtitle">
              Setiap aspirasi warga tercatat dan dikerjakan secara transparan. Lihat progres penanganan aspirasi secara real-time.
            </p>
          </div>
          <div className="home-aspirasi-stats">
            <div className="home-aspirasi-stat">
              <div className="home-aspirasi-stat-value" style={{ color: 'var(--color-status-received)' }}>
                <FiInbox style={{ marginRight: 8 }} />{received}
              </div>
              <div className="home-aspirasi-stat-label">Diterima</div>
            </div>
            <div className="home-aspirasi-stat">
              <div className="home-aspirasi-stat-value" style={{ color: 'var(--color-status-processing)' }}>
                <FiClock style={{ marginRight: 8 }} />{processing}
              </div>
              <div className="home-aspirasi-stat-label">Sedang Diproses</div>
            </div>
            <div className="home-aspirasi-stat">
              <div className="home-aspirasi-stat-value" style={{ color: 'var(--color-status-done)' }}>
                <FiCheckCircle style={{ marginRight: 8 }} />{done}
              </div>
              <div className="home-aspirasi-stat-label">Terealisasi</div>
            </div>
          </div>
          <div className="home-aspirasi-cta">
            <Link to="/aspirasi" className="btn-primary">
              Lihat Transparansi Aspirasi <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="home-blog">
        <div className="container">
          <div className="home-blog-header">
            <div>
              <div className="badge" style={{ marginBottom: '16px' }}>Kabar Terbaru</div>
              <h2 className="section-title">Kabar dari Rakyat</h2>
              <p className="section-subtitle">Cerita nyata dari lapangan — perjuangan bersama rakyat</p>
            </div>
            <Link to="/kabar" className="btn-secondary">
              Semua Kabar <FiArrowRight />
            </Link>
          </div>
          <div className="home-blog-grid">
            {blogPosts.slice(0, 3).map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="container">
          <div className="home-cta-card">
            <h2>Bergabunglah Bersama Kami</h2>
            <p>
              Jadilah bagian dari gerakan nyata bersama masyarakat. Daftarkan diri Anda sebagai relawan lapangan, kontributor sosial, atau pendukung program aspirasi untuk masa depan yang lebih baik.
            </p>
            <div className="home-cta-actions">
              <Link to="/dukungan" className="btn-primary">
                <FiUsers /> Beri Dukungan & Relawan
              </Link>
              <Link to="/aspirasi" className="btn-secondary">
                <FiMessageCircle /> Sampaikan Aspirasi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
