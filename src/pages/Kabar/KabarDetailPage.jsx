import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import blogPosts from '../../data/blogPosts';
import './KabarPage.css';

export default function KabarDetailPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="kabar-page">
        <div className="kabar-detail container" style={{ textAlign: 'center', paddingTop: '120px' }}>
          <h2>Artikel tidak ditemukan</h2>
          <Link to="/kabar" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
            Kembali ke Kabar
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const paragraphs = post.content.split('\n\n');

  return (
    <div className="kabar-page">
      <section className="kabar-detail">
        <div className="container">
          <Link to="/kabar" className="kabar-detail-back">
            <FiArrowLeft /> Kembali ke Kabar
          </Link>

          <img src={post.image} alt={post.title} className="kabar-detail-hero-image" />

          <div className="kabar-detail-meta">
            <span className="kabar-detail-category">{post.category}</span>
            <span className="kabar-detail-date">
              <FiCalendar size={14} /> {formattedDate}
            </span>
            <span className="kabar-detail-date">
              <FiClock size={14} /> {post.readTime}
            </span>
          </div>

          <h1 className="kabar-detail-title">{post.title}</h1>

          <div className="kabar-detail-content">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="kabar-detail-share">
            <h4>Bagikan Artikel Ini</h4>
            <div className="kabar-detail-share-links">
              <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' — ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="kabar-share-btn">
                <FaWhatsapp />
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="kabar-share-btn">
                <FaFacebook />
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="kabar-share-btn">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
