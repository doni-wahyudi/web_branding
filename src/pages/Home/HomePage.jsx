import { Link } from 'react-router-dom';
import { FiMessageCircle, FiUsers, FiArrowRight, FiCheckCircle, FiClock, FiInbox } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig';
import blogPosts from '../../data/blogPosts';
import aspirations from '../../data/aspirations';
import StatCounter from '../../components/StatCounter/StatCounter';
import BlogCard from '../../components/BlogCard/BlogCard';
import './HomePage.css';

export default function HomePage() {
  const received = aspirations.filter(a => a.status === 'received').length;
  const processing = aspirations.filter(a => a.status === 'processing').length;
  const done = aspirations.filter(a => a.status === 'done').length;

  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-bg">
          <img src="images/hero-background.png" alt="Landscape" />
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
              <img src="images/profile-hero.png" alt={siteConfig.name} />
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
              Jadilah bagian dari perubahan. Daftarkan diri Anda sebagai relawan pemenangan atau saksi TPS untuk masa depan yang lebih baik.
            </p>
            <div className="home-cta-actions">
              <Link to="/relawan" className="btn-primary">
                <FiUsers /> Daftar Relawan
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
