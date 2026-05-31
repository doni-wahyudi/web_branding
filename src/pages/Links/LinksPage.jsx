import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle, FiUsers, FiAward, FiBookOpen, FiHome, FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiDownload } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig';
import './LinksPage.css';

export default function LinksPage() {
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    // Generate the correct target URL for hash routing
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    setQrUrl(`${origin}${pathname}#/suara`);
  }, []);

  const qrCodeImageUrl = qrUrl 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrUrl)}` 
    : '';

  const downloadQrCodeUrl = qrUrl 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(qrUrl)}&download=1` 
    : '';

  return (
    <div className="links-page">
      <div className="links-container animate-fade-in-up">
        {/* Profile Header */}
        <div className="links-profile-header">
          <div className="links-avatar-wrapper">
            <img src="images/profile-hero.webp" alt={siteConfig.name} className="links-avatar" />
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

        {/* QR Code Aspiration Card */}
        <div className="links-qris-card">
          <div className="links-qris-header">
            <span className="links-qris-badge" style={{ color: 'var(--color-primary-light)' }}>KODE QR SUARA RAKYAT</span>
            <h2 className="links-qris-title">Pindai & Suarakan Aspirasi</h2>
            <p className="links-qris-desc">
              Cetak dan tunjukkan Kode QR ini kepada warga Provinsi Lampung. Dengan sekali pindai, warga dapat langsung menyalurkan pengaduan, keluhan, maupun saran secara instan!
            </p>
          </div>
          
          <div className="links-qris-image-wrapper" style={{ background: '#ffffff', padding: '12px' }}>
            {qrCodeImageUrl ? (
              <img src={qrCodeImageUrl} alt="QR Code Aspirasi Warga" className="links-qris-image" style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }} />
            ) : (
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a2e' }}>Memuat Kode QR...</div>
            )}
            <div className="links-qris-scan-overlay" style={{ background: 'var(--color-primary)' }}>PINDAI UNTUK ADUAN KILAT</div>
          </div>

          <div className="links-qris-instructions">
            <p><strong>Cara Penggunaan Kode QR:</strong></p>
            <ol>
              <li>Pindai Kode QR di atas menggunakan kamera handphone Anda.</li>
              <li>Tuliskan nama Anda, pilih kecamatan, dan ketik keluhan/saran Anda.</li>
              <li>Aspirasi Anda akan terkirim langsung ke database tim koordinasi dan WhatsApp pusat.</li>
            </ol>
            <a 
              href={downloadQrCodeUrl} 
              className="btn-secondary" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: 'var(--font-size-xs)', marginTop: '8px' }}
            >
              <FiDownload /> Unduh QR Code (Untuk Brosur & Banner)
            </a>
          </div>
        </div>

        {/* Quick Links Hub */}
        <div className="links-buttons-hub">
          <h3 className="links-hub-title">Tautan Cepat & Layanan</h3>
          
          <Link to="/suara" className="links-btn links-btn-primary animate-pulse-btn">
            <FiMessageCircle className="links-btn-icon" />
            <div className="links-btn-text">
              <span className="links-btn-main">Formulir Kilat Aspirasi</span>
              <span className="links-btn-sub">Tampilan sederhana khusus handphone untuk aduan kilat</span>
            </div>
          </Link>

          <Link to="/aspirasi" className="links-btn">
            <FiMessageCircle className="links-btn-icon" style={{ color: 'var(--color-secondary)' }} />
            <div className="links-btn-text">
              <span className="links-btn-main">Pojok Aspirasi & Pelacakan Progres</span>
              <span className="links-btn-sub">Kirim aspirasi detail & pantau penyelesaian real-time</span>
            </div>
          </Link>

          <Link to="/dukungan" className="links-btn">
            <FiUsers className="links-btn-icon" />
            <div className="links-btn-text">
              <span className="links-btn-main">Beri Dukungan & Relawan</span>
              <span className="links-btn-sub">Bergabung sebagai relawan lapangan atau kontributor sosial</span>
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
              <span className="links-btn-sub">Dokumentasi lapangan & kabar berita perjuangan terbaru</span>
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
