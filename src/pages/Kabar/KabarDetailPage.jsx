import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import staticBlogPosts from '../../data/blogPosts';
import './KabarPage.css';

export default function KabarDetailPage() {
  const { slug } = useParams();
  const [post, setPost]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();
          if (!error && data) {
            setPost({ ...data, image: data.cover_url || data.image_url || data.image });
            setLoading(false);
            return;
          }
        } catch (err) { console.error(err.message); }
      }
      setPost(staticBlogPosts.find(p => p.slug === slug) || null);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="kabar-page">
        <div className="container" style={{ textAlign: 'center', paddingTop: '120px', color: 'var(--color-text-muted)' }}>
          Memuat artikel...
        </div>
      </div>
    );
  }

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

  const formattedDate = new Date(post.date || post.created_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const paragraphs = (post.content || '').split('\n\n');

  return (
    <div className="kabar-page">
      <section className="kabar-detail">
        <div className="container">
          <Link to="/kabar" className="kabar-detail-back">
            <FiArrowLeft /> Kembali ke Kabar
          </Link>

          {(post.image || post.cover_url) && (
            <img src={post.image || post.cover_url} alt={post.title} className="kabar-detail-hero-image" />
          )}

          <div className="kabar-detail-meta">
            <span className="kabar-detail-category">{post.category}</span>
            <span className="kabar-detail-date">
              <FiCalendar size={14} /> {formattedDate}
            </span>
            {post.readTime && (
              <span className="kabar-detail-date">
                <FiClock size={14} /> {post.readTime}
              </span>
            )}
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
