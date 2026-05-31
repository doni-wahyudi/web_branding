import { Link } from 'react-router-dom';
import { FiMessageCircle, FiUsers, FiAward, FiBookOpen, FiHome, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig';
import './LinksPage.css';

export default function LinksPage() {
  return (
    <div className="links-page">
      <div className="links-container animate-fade-in-up">
        {/* Profile Header */}
        <div className="links-profile-header">
          <div className="links-avatar-wrapper">
            <img src="images/profile-hero.png" alt={siteConfig.name} className="links-avatar" />
            <div className="links-avatar-glow"></div>
          </div>
          <h1 className="links-profile-name">{siteConfig.name}</h1>
          <p className="links-profile-title">{siteConfig.fullTitle}</p>
          <div className="links-profile-badge">
            {siteConfig.party} — {siteConfig.partyFull}
          </div>

          {/* Social Links */}
          <div className="links-social-row">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FiFacebook /></a>
            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FiTwitter /></a>
            <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FiYoutube /></a>
          </div>
        </div>

        {/* Donation QRIS Card */}
        <div className="links-qris-card">
          <div className="links-qris-header">
            <span className="links-qris-badge">DONASI KAMPANYE</span>
            <h2 className="links-qris-title">Dukung Perjuangan Kita</h2>
            <p className="links-qris-desc">
              Salurkan donasi kampanye Anda untuk mendukung biaya operasional relawan, pengadaan alat peraga, dan perjuangan aspirasi rakyat.
            </p>
          </div>
          
          <div className="links-qris-image-wrapper">
            <img src="images/qris-donasi.png" alt="QRIS Donasi Ridho Saputra" className="links-qris-image" />
            <div className="links-qris-scan-overlay">Scan QRIS Untuk Berdonasi</div>
          </div>

          <div className="links-qris-instructions">
            <p><strong>Cara Berdonasi:</strong></p>
            <ol>
              <li>Pindai QRIS di atas dengan aplikasi e-wallet (GoPay, OVO, Dana, ShopeePay) atau m-Banking Anda.</li>
              <li>Masukkan jumlah donasi komitmen Anda, lalu selesaikan pembayaran.</li>
              <li>Atau transfer bank langsung ke Rekening Tim Pemenangan:</li>
            </ol>
            <div className="links-bank-info">
              <strong>Bank Mandiri</strong><br />
              No. Rekening: <code>123-456-789-012</code><br />
              a.n. <strong>Tim Kampanye Ridho Saputra</strong>
            </div>
          </div>
        </div>

        {/* Quick Links Hub */}
        <div className="links-buttons-hub">
          <h3 className="links-hub-title">Tautan Cepat & Aksi</h3>
          
          <Link to="/aspirasi" className="links-btn links-btn-primary animate-pulse-btn">
            <FiMessageCircle className="links-btn-icon" />
            <div className="links-btn-text">
              <span className="links-btn-main">Sampaikan Aspirasi Warga</span>
              <span className="links-btn-sub">Laporan pembangunan, usulan program, & saran</span>
            </div>
          </Link>

          <Link to="/dukungan" className="links-btn">
            <FiUsers className="links-btn-icon" />
            <div className="links-btn-text">
              <span className="links-btn-main">Daftar Relawan & Saksi</span>
              <span className="links-btn-sub">Gabung barisan pendukung pemenangan</span>
            </div>
          </Link>

          <Link to="/rekam-jejak" className="links-btn">
            <FiAward className="links-btn-icon" />
            <div className="links-btn-text">
              <span className="links-btn-main">Rekam Jejak & Kerja Nyata</span>
              <span className="links-btn-sub">Matriks penyelesaian masalah legislatif (2016-2024)</span>
            </div>
          </Link>

          <Link to="/kabar" className="links-btn">
            <FiBookOpen className="links-btn-icon" />
            <div className="links-btn-text">
              <span className="links-btn-main">Kabar dari Rakyat</span>
              <span className="links-btn-sub">Berita, dokumentasi lapangan, & artikel terbaru</span>
            </div>
          </Link>

          <Link to="/" className="links-btn links-btn-secondary">
            <FiHome className="links-btn-icon" />
            <div className="links-btn-text">
              <span className="links-btn-main">Kunjungi Website Utama</span>
              <span className="links-btn-sub">Beranda profil & visi misi lengkap</span>
            </div>
          </Link>
        </div>

        {/* Footer info inside links hub */}
        <div className="links-footer">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Hak Cipta Dilindungi.</p>
          <p style={{ fontSize: '10px', marginTop: '4px', opacity: 0.6 }}>Suara Rakyat, Perjuangan Nyata.</p>
        </div>
      </div>
    </div>
  );
}
