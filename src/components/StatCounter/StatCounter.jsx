import { useState, useEffect, useRef } from 'react';
import './StatCounter.css';

function AnimatedNumber({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref} className="stat-counter-value">
      {count.toLocaleString('id-ID')}{suffix}
    </span>
  );
}

export default function StatCounter({ stats }) {
  return (
    <div className="stat-counter-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-counter-item">
          <AnimatedNumber target={stat.value} suffix={stat.suffix} />
          <div className="stat-counter-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
