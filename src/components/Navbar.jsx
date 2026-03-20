'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMain}>AI 龍蝦課</span>
          <span className={styles.logoSub}>打造你的專屬龍蝦</span>
        </Link>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="選單"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <a href="#enterprise" onClick={() => setMenuOpen(false)}>企業導入</a>
          <a href="#live" onClick={() => setMenuOpen(false)}>免費講座</a>
          <a href="#instructors" onClick={() => setMenuOpen(false)}>團隊陣容</a>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>案例分享</Link>
          <a href="#live" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            免費報名
          </a>
        </div>
      </div>
    </nav>
  );
}
