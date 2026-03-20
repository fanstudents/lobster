'use client';

import { useEffect, useRef } from 'react';
import { Check, Info, ArrowRight } from 'lucide-react';
import styles from './CostBreakdown.module.css';

const costTiers = [
  {
    icon: '🎯',
    title: '導入費用',
    originalPrice: 'NT$ 30,000',
    currentPrice: 'NT$ 0',
    note: '活動期間全免',
    color: 'hsl(150, 55%, 40%)',
    borderColor: 'hsl(150, 50%, 75%)',
    items: [
      '課前深度訪談與需求分析',
      '工作流程拆解與 AI 方案設計',
      '導入規劃書交付',
      '首次環境建置協助',
    ],
  },
  {
    icon: '⚙️',
    title: '後續費用',
    currentPrice: '依場景報價',
    note: '按實際需求計費',
    color: 'hsl(220, 60%, 50%)',
    borderColor: 'hsl(220, 55%, 75%)',
    items: [
      '按照企業實際工作場景客製',
      '教學 + 導入一站式完成',
      '3–6 個月陪跑服務',
      '成效追蹤報告',
    ],
  },
  {
    icon: '🔑',
    title: '衍生費用',
    currentPrice: '實際用量計價',
    note: 'API Token 使用費',
    color: 'hsl(30, 70%, 45%)',
    borderColor: 'hsl(30, 60%, 75%)',
    items: [
      '按實際 API 呼叫量計費',
      '帳單透明，使用者可自行查看',
      '不綁定特定平台，自由選擇',
      '課程中教你控制與優化成本',
    ],
  },
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

        <div className={styles.tierGrid}>
          {costTiers.map((tier, i) => (
            <div
              key={i}
              className={`animate-in glass-card ${styles.tierCard}`}
              style={{ transitionDelay: `${i * 0.15}s`, borderTopColor: tier.borderColor }}
            >
              <div className={styles.tierIcon}>{tier.icon}</div>
              <h3 className={styles.tierTitle}>{tier.title}</h3>

              <div className={styles.tierPricing}>
                {tier.originalPrice && (
                  <div className={styles.tierOriginal}>{tier.originalPrice}</div>
                )}
                <div className={styles.tierCurrent} style={{ color: tier.color }}>
                  {tier.currentPrice}
                </div>
                <div className={styles.tierNote}>{tier.note}</div>
              </div>

              <ul className={styles.tierItems}>
                {tier.items.map((item, j) => (
                  <li key={j}>
                    <Check size={14} className={styles.tierCheck} style={{ color: tier.color }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`animate-in ${styles.notice}`}>
          <Info size={16} className={styles.noticeIcon} />
          <p>
            <strong>活動限定：</strong>導入費用原價 NT$ 30,000，現在預約諮詢即享
            <strong> 0 元導入</strong>。API 使用費完全透明，帳單由使用者直接查看，不經手第三方。
          </p>
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
