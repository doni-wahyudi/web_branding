import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col">
            <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
              <div className="navbar-logo-icon">RS</div>
              <div className="navbar-logo-text">
                <span className="navbar-logo-name">{siteConfig.name}</span>
                <span className="navbar-logo-party">{siteConfig.party}</span>
              </div>
            </Link>
            <p className="footer-brand-desc">
              {siteConfig.tagline}. Bersama rakyat membangun masa depan yang lebih baik untuk Kabupaten Nusantara.
            </p>
            <div className="footer-social">
              <a href={siteConfig.social.instagram} className="footer-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <FiInstagram />
              </a>
              <a href={siteConfig.social.facebook} className="footer-social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FiFacebook />
              </a>
              <a href={siteConfig.social.twitter} className="footer-social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <FiTwitter />
              </a>
              <a href={siteConfig.social.youtube} className="footer-social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigasi</h4>
            <Link to="/">Beranda</Link>
            <Link to="/aspirasi">Pojok Aspirasi</Link>
            <Link to="/kabar">Kabar dari Rakyat</Link>
            <Link to="/rekam-jejak">Rekam Jejak</Link>
            <Link to="/relawan">Relawan & Dukungan</Link>
          </div>

          {/* Layanan */}
          <div className="footer-col">
            <h4 className="footer-col-title">Layanan</h4>
            <Link to="/aspirasi">Sampaikan Aspirasi</Link>
            <Link to="/aspirasi/transparansi">Transparansi Aspirasi</Link>
            <Link to="/relawan">Daftar Relawan</Link>
            <Link to="/kabar">Berita Terkini</Link>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Kontak</h4>
            <div className="footer-contact-item">
              <FiMapPin size={16} />
              <span>{siteConfig.address}</span>
            </div>
            <div className="footer-contact-item">
              <FiPhone size={16} />
              <span>+{siteConfig.whatsapp}</span>
            </div>
            <div className="footer-contact-item">
              <FiMail size={16} />
              <span>{siteConfig.email}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {siteConfig.name} — {siteConfig.partyFull}</span>
          <span>Dibuat dengan ❤️ untuk Rakyat</span>
        </div>
      </div>
    </footer>
  );
}
