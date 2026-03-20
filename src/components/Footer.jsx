import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>AI 龍蝦課</div>
            <p className={styles.brandDesc}>
              用 AI 幫你打造可落地的工作流系統
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>服務</h4>
              <a href="#live">免費講座</a>
              <a href="#enterprise">企業導入</a>
              <a href="#cost">費用說明</a>
            </div>
            <div className={styles.linkGroup}>
              <h4>關於我們</h4>
              <a href="#instructors">團隊陣容</a>
              <Link href="/blog">案例分享</Link>
              <a href="#faq">常見問題</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2025 AI 龍蝦課. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
