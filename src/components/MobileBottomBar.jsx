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
      <a href="#live" className={`${styles.item} ${styles.liveItem}`}>
        <span className={styles.liveDot} />
        <span className={styles.liveText}>
          <strong>LIVE 免費直播</strong>
          <small>4/11 20:00–21:00</small>
        </span>
      </a>
      <a href="#enterprise" className={styles.item}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span>企業導入諮詢</span>
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
