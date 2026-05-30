import { FiAward, FiFlag, FiUsers, FiHeart, FiBriefcase, FiFileText, FiMessageCircle, FiStar, FiTrendingUp, FiShield, FiInbox, FiMapPin, FiDollarSign, FiBookOpen, FiTool } from 'react-icons/fi';
import { timeline, achievements, policies } from '../../data/trackRecord';
import './RekamJejakPage.css';

const iconMap = {
  flag: FiFlag,
  users: FiUsers,
  heart: FiHeart,
  award: FiAward,
  briefcase: FiBriefcase,
  'file-text': FiFileText,
  'message-circle': FiMessageCircle,
  star: FiStar,
  'trending-up': FiTrendingUp,
  shield: FiShield,
  inbox: FiInbox,
  'map-pin': FiMapPin,
  'dollar-sign': FiDollarSign,
  'book-open': FiBookOpen,
  tool: FiTool,
};

export default function RekamJejakPage() {
  return (
    <div className="rekam-page">
      {/* Hero */}
      <section className="rekam-hero">
        <div className="container">
          <div className="badge" style={{ marginBottom: '16px' }}>
            <FiAward /> Rekam Jejak & Pengabdian
          </div>
          <h1 className="section-title">Perjalanan Mengabdi untuk Rakyat</h1>
          <p className="section-subtitle">
            Dari pemuda biasa hingga wakil rakyat — setiap langkah kami dedikasikan untuk kepentingan masyarakat.
          </p>
        </div>
      </section>

      {/* Timeline - Concept 5: Matrix Aspirasi vs Realisasi */}
      <section className="rekam-matrix">
        <div className="container">
          <div className="rekam-matrix-header">
            <div className="badge" style={{ marginBottom: '16px' }}>Matriks Pengabdian</div>
            <h2 className="section-title">Aspirasi Rakyat & Solusi Nyata</h2>
            <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
              Rekam jejak komparasi langsung keluhan warga di lapangan dan hasil perjuangan legislatif nyata.
            </p>
          </div>
          <div className="matrix-wrapper">
            <div className="matrix-line"></div>
            {timeline.map((item, index) => {
              const Icon = iconMap[item.icon] || FiAward;
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`matrix-row ${isEven ? 'row-normal' : 'row-reversed'}`}>
                  {/* Left Column */}
                  <div className="matrix-col col-left">
                    {isEven ? (
                      <div className="matrix-card card-aspirasi">
                        <div className="card-header-pill">🔴 Aspirasi & Masalah Warga</div>
                        <p className="card-text">"{item.aspirasi}"</p>
                      </div>
                    ) : (
                      <div className="matrix-card card-realisasi">
                        <div className="card-header-pill">🟢 Aksi Nyata & Solusi</div>
                        <div className="realisasi-content">
                          <div className="realisasi-icon"><Icon /></div>
                          <div>
                            <h4 className="realisasi-title">{item.title}</h4>
                            <p className="card-text">{item.realisasi}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Center Node */}
                  <div className="matrix-node">
                    <div className="node-line-connect"></div>
                    <div className="node-circle">
                      <span className="node-year">{item.year}</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="matrix-col col-right">
                    {!isEven ? (
                      <div className="matrix-card card-aspirasi">
                        <div className="card-header-pill">🔴 Aspirasi & Masalah Warga</div>
                        <p className="card-text">"{item.aspirasi}"</p>
                      </div>
                    ) : (
                      <div className="matrix-card card-realisasi">
                        <div className="card-header-pill">🟢 Aksi Nyata & Solusi</div>
                        <div className="realisasi-content">
                          <div className="realisasi-icon"><Icon /></div>
                          <div>
                            <h4 className="realisasi-title">{item.title}</h4>
                            <p className="card-text">{item.realisasi}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="rekam-achievements">
        <div className="container">
          <div className="rekam-achievements-header">
            <div className="badge" style={{ marginBottom: '16px' }}>Capaian</div>
            <h2 className="section-title">Pencapaian Utama</h2>
            <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
              Angka-angka ini bukan sekadar statistik — ini adalah bukti nyata kerja keras bersama rakyat.
            </p>
          </div>
          <div className="achievements-grid">
            {achievements.map((item, index) => {
              const Icon = iconMap[item.icon] || FiAward;
              return (
                <div key={index} className="achievement-card">
                  <div className="achievement-icon">
                    <Icon />
                  </div>
                  <h3 className="achievement-title">{item.title}</h3>
                  <p className="achievement-desc">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="rekam-policies">
        <div className="container">
          <div className="rekam-policies-header">
            <div className="badge" style={{ marginBottom: '16px' }}>Kebijakan</div>
            <h2 className="section-title">Perda yang Dikawal</h2>
            <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
              Peraturan Daerah yang kami inisiasi dan kawal demi kepentingan rakyat.
            </p>
          </div>
          <div className="policies-grid">
            {policies.map((item, index) => (
              <div key={index} className="policy-card">
                <div className="policy-header">
                  <h3 className="policy-title">{item.title}</h3>
                  <span className="policy-badge">{item.status}</span>
                </div>
                <div className="policy-year">Tahun {item.year}</div>
                <p className="policy-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
