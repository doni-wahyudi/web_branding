import { useState } from 'react';
import { FiBookOpen } from 'react-icons/fi';
import blogPosts from '../../data/blogPosts';
import BlogCard from '../../components/BlogCard/BlogCard';
import './KabarPage.css';

export default function KabarPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const categories = ['Semua', ...new Set(blogPosts.map(p => p.category))];

  const filtered = activeCategory === 'Semua'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

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
          <div className="kabar-grid">
            {filtered.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
              Belum ada kabar untuk kategori ini.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
