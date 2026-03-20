'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxSection({ children, speed = 0.3, className = '' }) {
  const ref = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!ref.current || !innerRef.current) return;
          const rect = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          if (rect.top < windowHeight && rect.bottom > 0) {
            const scrolled = (windowHeight - rect.top) / (windowHeight + rect.height);
            const offset = (scrolled - 0.5) * speed * 100;
            innerRef.current.style.transform = `translateY(${offset}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <div ref={innerRef} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
