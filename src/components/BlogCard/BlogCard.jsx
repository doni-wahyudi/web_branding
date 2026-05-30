import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import './BlogCard.css';

export default function BlogCard({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link to={`/kabar/${post.slug}`} className="blog-card" style={{ textDecoration: 'none' }}>
      <div className="blog-card-image-wrapper">
        <img src={post.image} alt={post.title} className="blog-card-image" loading="lazy" />
        <span className="blog-card-category">{post.category}</span>
      </div>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FiCalendar /> {formattedDate}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FiClock /> {post.readTime}
          </span>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <span className="blog-card-read-more">
          Baca Selengkapnya <FiArrowRight />
        </span>
      </div>
    </Link>
  );
}
