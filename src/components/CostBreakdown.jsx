'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import styles from './CostBreakdown.module.css';

const phases = [
  {
    phase: 'Phase 1',
    icon: '🎯',
    title: '導入費用',
    color: 'green',
    originalPrice: 'NT$ 30,000',
    currentPrice: 'NT$ 0',
    badge: '🔥 限時免費',
    items: [
      '課前深度訪談與需求分析',
      '工作流程拆解與 AI 方案設計',
      '導入規劃書交付',
      '首次環境建置協助',
    ],
    footer: '⏱ 約 1–2 週完成',
  },
  {
    phase: 'Phase 2',
    icon: '⚙️',
    title: '後續費用',
    color: 'blue',
    currentPrice: '按場景收取月費',
    subtitle: '依企業實際場景客製報價',
    items: [
      '按照企業實際工作場景客製',
      '教學 + 導入一站式完成',
      '3–6 個月陪跑服務',
      '成效追蹤報告',
    ],
    footer: '⏱ 3–6 個月陪跑',
  },
  {
    phase: 'Phase 3',
    icon: '🔑',
    title: '衍生費用',
    color: 'orange',
    currentPrice: '用多少算多少',
    subtitle: '帳單看得見，完全透明',
    items: [
      '按實際 API 呼叫量計費',
      '帳單透明，使用者可自行查看',
      '不綁定特定平台，自由選擇',
      '課程中教你控制與優化成本',
    ],
    footer: '💡 用多少付多少',
  },
];

const highlights = [
  { icon: '🎯', title: '導入零成本', desc: '預約即享 NT$0 導入', color: 'green' },
  { icon: '📋', title: '帳單全透明', desc: 'API 費用使用者直接查看', color: 'blue' },
  { icon: '🔓', title: '不綁定合約', desc: '隨時調整，彈性自由', color: 'orange' },
];

export default function CostBreakdown() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current?.querySelectorAll('.animate-in');
    items?.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.section}`} id="cost" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">成本透明</div>
          <h2 className="section-title">
            企業導入<span className="text-gradient">費用說明</span>
          </h2>
          <p className="section-subtitle">
            我們把費用結構攤開來講，讓你在導入前就有清楚的預期。
          </p>
        </div>

        {/* Infographic Title */}
        <div className={`animate-in ${styles.infoBanner}`}>
          🦞 龍蝦 AI 工作流 — 費用結構全覽
        </div>

        {/* Phase Cards with Arrows */}
        <div className={styles.phaseFlow}>
          {phases.map((p, i) => (
            <div key={i}>
              <div className={`animate-in ${styles.phaseCard} ${styles[p.color]}`} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className={styles.phaseHeader}>
                  <span>{p.icon} {p.phase} — {p.title}</span>
                </div>
                <div className={styles.phaseBody}>
                  <div className={styles.pricing}>
                    {p.originalPrice && (
                      <div className={styles.originalPrice}>{p.originalPrice}</div>
                    )}
                    <div className={styles.currentPrice}>{p.currentPrice}</div>
                    {p.badge && <div className={styles.priceBadge}>{p.badge}</div>}
                    {p.subtitle && <div className={styles.priceSubtitle}>{p.subtitle}</div>}
                  </div>
                  <ul className={styles.items}>
                    {p.items.map((item, j) => (
                      <li key={j}>✓ {item}</li>
                    ))}
                  </ul>
                  <div className={styles.phaseFooter}>{p.footer}</div>
                </div>
              </div>
              {i < phases.length - 1 && (
                <div className={styles.arrow}>
                  <ArrowDown size={20} className={styles.arrowMobile} />
                  <ArrowRight size={20} className={styles.arrowDesktop} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className={`animate-in ${styles.highlightRow}`}>
          {highlights.map((h, i) => (
            <div key={i} className={`${styles.highlight} ${styles[`hl${h.color}`]}`}>
              <strong>{h.icon} {h.title}</strong>
              <span>{h.desc}</span>
            </div>
          ))}
        </div>

        <div className={`animate-in ${styles.ctaWrap}`}>
          <a href="#enterprise" className="btn btn-enterprise btn-lg">
            立即預約免費諮詢
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
