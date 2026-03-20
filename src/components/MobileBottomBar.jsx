'use client';

import { useState, useEffect } from 'react';
import { trackLineClick } from '@/lib/tracking';
import styles from './MobileBottomBar.module.css';

export default function MobileBottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.bar}>
      <a href="#enterprise" className={styles.item}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>首頁</span>
      </a>
      <a href="#live" className={styles.item}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
        <span>免費講座</span>
      </a>
      <a href="#consult" className={`${styles.item} ${styles.ctaItem}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span>預約諮詢</span>
      </a>
      <a
        href="https://lin.ee/7ZiyWDS"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.item} ${styles.lineItem}`}
        onClick={() => trackLineClick('mobile_bar')}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/LINE_New_App_Icon_%282020-12%29.png/500px-LINE_New_App_Icon_%282020-12%29.png"
          alt="LINE"
          className={styles.lineIcon}
        />
        <span>LINE</span>
      </a>
    </div>
  );
}
