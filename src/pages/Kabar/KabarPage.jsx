import { useState, useEffect } from 'react';
import { FiBookOpen } from 'react-icons/fi';
import { supabase } from '../../utils/supabaseClient';
import staticBlogPosts from '../../data/blogPosts';
import BlogCard from '../../components/BlogCard/BlogCard';
import './KabarPage.css';

export default function KabarPage() {
  const [posts, setPosts]               = useState([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('published', true)
            .order('date', { ascending: false });
          if (!error && data?.length) {
            // Normalize fields so BlogCard works (cover_url → image)
            setPosts(data.map(p => ({ ...p, image: p.cover_url || p.image_url || p.image })));
            setLoading(false);
            return;
          }
        } catch (err) { console.error(err.message); }
      }
      setPosts(staticBlogPosts);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const categories = ['Semua', ...new Set(posts.map(p => p.category))];
  const filtered = activeCategory === 'Semua'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="kabar-page">
      <section className="kabar-hero">
        <div className="container">
          <div className="badge" style={{ marginBottom: '16px' }}>
            <FiBookOpen /> Kabar dari Rakyat
          </div>
          <h1 className="section-title">Cerita dari Lapangan</h1>
          <p className="section-subtitle">
            Bukan opini teoritis — ini cerita nyata saat kami turun langsung ke tengah masyarakat, mendengar, dan memperjuangkan aspirasi rakyat.
          </p>
          <div className="kabar-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
              Memuat artikel...
            </div>
          )}
          {!loading && (
            <div className="kabar-grid">
              {filtered.map(post => (
                <BlogCard key={post.id || post.slug} post={post} />
              ))}
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
              Belum ada kabar untuk kategori ini.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
