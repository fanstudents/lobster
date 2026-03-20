'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './StickyBar.module.css';

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (around 600px)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ''}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.info}>
          <span className={styles.dot} />
          <span className={styles.label}>龍蝦工作流</span>
          <span className={styles.sub}>免費直播講座 · 4/14 報名中</span>
        </div>
        <a href="#live" className={`btn btn-accent ${styles.cta}`}>
          免費報名
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
