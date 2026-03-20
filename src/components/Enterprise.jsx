'use client';

import { useEffect, useRef } from 'react';
import { Check, ArrowRight, BookOpen, Rocket } from 'lucide-react';
import ConsultationForm from './ConsultationForm';
import styles from './Enterprise.module.css';

const plans = [
  {
    icon: BookOpen,
    name: '方案 A：企業課程版',
    price: '依需求報價',
    desc: '適合想快速建立團隊 AI 基礎認知的企業',
    features: [
      '4–8 小時課程',
      '200 人以內內訓',
      '基礎 AI 認知 + 實作',
      '客製化案例設計',
      '課後建議報告',
    ],
  },
  {
    icon: Rocket,
    name: '方案 B：企業導入版',
    price: '依需求報價',
    desc: '適合想全面導入 AI 工作流的企業',
    badge: '推薦',
    features: [
      '課前深度訪談與診斷',
      '工作流程拆解與重設計',
      'AI 工作流建置與導入',
      '教學 + 導入一站完成',
      '成效追蹤報告',
      '3–6 個月陪跑服務',
      '專屬顧問支援',
    ],
  },
];

export default function Enterprise() {
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
    <section className={`section ${styles.section}`} id="enterprise" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">企業導入</div>
          <h2 className="section-title">
            讓整個團隊
            <span className="text-gradient-blue"> AI 化</span>
          </h2>
          <p className="section-subtitle">
            不只是上課，是幫你的企業建立可落地的 AI 工作流系統。
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <div
                key={i}
                className={`animate-in glass-card ${styles.card}`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
                <div className={styles.cardIconWrap}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardName}>{plan.name}</h3>
                <p className={styles.cardDesc}>{plan.desc}</p>
                <div className={styles.cardPrice}>{plan.price}</div>
                <ul className={styles.features}>
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <Check size={14} className={styles.checkIcon} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className={`animate-in ${styles.ctaArea}`}>
          <div className={styles.zeroCostBadge}>0 元導入</div>
          <p className={styles.ctaText}>
            不確定需要哪種方案？預約免費諮詢，讓我們幫你評估最適合的導入方式。
          </p>
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
