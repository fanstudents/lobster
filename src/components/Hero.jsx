'use client';

import { ArrowRight, Play, Building2 } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bgOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>
      <div className={styles.gridOverlay} />

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          2026 年度最佳 AI 龍蝦課程
        </div>

        <h1 className={styles.title}>
          企業學了 AI，但工作流沒變？
          <br />
          <span className="text-gradient">讓我們幫你導入 AI 工作流系統</span>
        </h1>

        <p className={styles.subtitle}>
          大部分企業讓團隊學了 AI 工具，但工作量却沒有真的減少。
          <br />
          因為缺的不是工具，是一套<strong>把 AI 串進企業流程</strong>的方法。
        </p>

        <div className={styles.ctaCards}>
          <a href="#live" className={`${styles.ctaCard} ${styles.ctaCardLive}`}>
            <div className={styles.ctaTopBadge}>
              <span className={styles.liveDot} />
              LIVE
            </div>
            <div className={styles.ctaIconLarge}>
              <Play size={28} />
            </div>
            <h3 className={styles.ctaTitle}>免費直播講座</h3>
            <p className={styles.ctaSubtext}>4/14（一）21:00</p>
            <p className={styles.ctaDuration}>1 小時 · 龍蝦案例分享</p>
            <span className={styles.ctaBtn}>立即報名 <ArrowRight size={14} /></span>
          </a>

          <a href="#enterprise" className={`${styles.ctaCard} ${styles.ctaCardEnt}`}>
            <div className={styles.ctaTopBadge}>🏢 企業</div>
            <div className={styles.ctaIconLarge}>
              <Building2 size={28} />
            </div>
            <h3 className={styles.ctaTitle}>企業導入方案</h3>
            <p className={styles.ctaSubtext}>0 元導入</p>
            <p className={styles.ctaDuration}>專屬顧問 · 到府服務</p>
            <span className={styles.ctaBtn}>了解更多 <ArrowRight size={14} /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
