'use client';

import Image from 'next/image';
import { ArrowRight, Play, Building2, Sparkles } from 'lucide-react';
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
          <Sparkles size={14} />
          企業 AI 自動化導入
        </div>

        <h1 className={styles.title}>
          不是學工具
          <br />
          <span className="text-gradient">是建一套會自己跑的系統</span>
        </h1>

        <p className={styles.subtitle}>
          我們幫企業把 AI 嵌進工作流程，讓重複的事<strong>自動做完</strong>。
        </p>

        <div className={styles.ctaCards}>
          {/* 免費講座卡 */}
          <a href="#live" className={`${styles.ctaCard} ${styles.ctaCardLive}`}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <div className={styles.ctaTopBadge}>
                <span className={styles.liveDot} />
                LIVE 直播
              </div>
              <div className={styles.ctaIconLarge}>
                <Play size={28} />
              </div>
              <h3 className={styles.ctaTitle}>免費直播講座</h3>
              <p className={styles.ctaDate}>4/14（一）21:00</p>
              <p className={styles.ctaDuration}>1 小時 · 龍蝦案例實戰分享</p>
              <span className={styles.ctaBtn}>
                立即報名
                <ArrowRight size={14} />
              </span>
            </div>
          </a>

          {/* 企業導入卡 */}
          <a href="#enterprise" className={`${styles.ctaCard} ${styles.ctaCardEnt}`}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <div className={styles.ctaTopBadge}>
                🏢 企業方案
              </div>
              <div className={styles.ctaIconLarge}>
                <Building2 size={28} />
              </div>
              <h3 className={styles.ctaTitle}>企業導入方案</h3>
              <p className={styles.ctaDate}>0 元導入</p>
              <p className={styles.ctaDuration}>專屬顧問 · 到府服務</p>
              <span className={styles.ctaBtn}>
                了解更多
                <ArrowRight size={14} />
              </span>
            </div>
          </a>
        </div>

        {/* 龍蝦形象 */}
        <div className={styles.lobsterWrap}>
          <Image
            src="/lobster-hero.png"
            alt="AI 龍蝦"
            width={180}
            height={180}
            className={styles.lobsterImg}
            priority
          />
          <p className={styles.lobsterCaption}>
            🦞 你的專屬 AI 龍蝦，24 小時幫你工作
          </p>
        </div>
      </div>
    </section>
  );
}
