'use client';

import { useEffect, useRef } from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';
import styles from './PricingTable.module.css';

const plans = [
  {
    type: 'free',
    name: '免費直播講座',
    price: 'NT$ 0',
    priceNote: '限時免費',
    description: '想先了解的人',
    features: [
      '1 小時線上直播',
      'AI 工作流概念介紹',
      '現場案例示範 + Q&A',
      '直播回放 7 天',
    ],
    cta: '立即報名',
    ctaClass: 'btn btn-outline',
    href: '#live',
  },
  {
    type: 'main',
    name: 'AI 龍蝦課',
    price: '五月班開放中',
    priceNote: '價格將於直播中公佈',
    description: '想建立 AI 工作系統的個人',
    badge: '五月班預約登記',
    features: [
      '買一次，未來梯次免費回訓',
      '4+1 堂直播（含安裝排除課）',
      '5 大模組 + 實作專案',
      '使用你的工作資料練習',
      '完成個人 AI 系統',
      'Demo Day 成果展示',
      '專屬學員社群',
      '課程內容持續更新',
      '每月開班',
    ],
    cta: '預約登記',
    ctaClass: 'btn btn-primary btn-lg',
    href: '#register',
  },
  {
    type: 'enterprise',
    name: '企業導入方案',
    price: 'NT$ 0',
    priceNote: '0 元導入',
    description: '想讓團隊全面導入 AI 的企業',
    features: [
      '客製化課前訪談',
      '工作流程拆解與設計',
      '教學 + 導入一站完成',
      '3–6 個月陪跑服務',
      '成效追蹤報告',
      '專屬顧問支援',
    ],
    cta: '預約諮詢',
    ctaClass: 'btn btn-enterprise',
    href: '#enterprise',
  },
];

export default function PricingTable() {
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
    <section className={`section ${styles.section}`} id="pricing" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">方案比較</div>
          <h2 className="section-title">
            選擇適合你的<span className="text-gradient">加入方式</span>
          </h2>
          <p className="section-subtitle">
            不管你是個人還是企業，都有適合的入口。
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`animate-in glass-card ${styles.card} ${styles[plan.type]}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {plan.badge && (
                <div className={styles.badge}>
                  <Star size={12} />
                  {plan.badge}
                </div>
              )}

              <div className={styles.cardTop}>
                <h3 className={styles.cardName}>{plan.name}</h3>
                <p className={styles.cardDesc}>{plan.description}</p>
              </div>

              <div className={styles.priceBlock}>
                <div className={styles.price}>{plan.price}</div>
                <div className={styles.priceNote}>{plan.priceNote}</div>
              </div>

              <ul className={styles.features}>
                {plan.features.map((f, j) => (
                  <li key={j} className={j === 0 && plan.type === 'main' ? styles.featureHighlight : ''}>
                    <Check size={14} className={styles.checkIcon} />
                    {f}
                  </li>
                ))}
              </ul>

              <a href={plan.href} className={`${plan.ctaClass} ${styles.cta}`}>
                {plan.cta}
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
