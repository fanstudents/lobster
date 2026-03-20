'use client';

import { useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import ConsultationForm from './ConsultationForm';
import styles from './Enterprise.module.css';

const highlights = [
  '課前深度訪談與需求診斷',
  '工作流程拆解與 AI 方案設計',
  'AI 工作流建置與導入執行',
  '教學 + 導入一站式完成',
  '3–6 個月專屬顧問陪跑',
  '成效追蹤與系統持續優化',
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

        <div className={`animate-in ${styles.serviceWrap}`}>
          <div className={`glass-card ${styles.serviceCard}`}>
            <div className={styles.zeroCostBadge}>0 元導入</div>
            <h3 className={styles.serviceTitle}>企業 AI 工作流導入服務</h3>
            <p className={styles.serviceDesc}>
              從診斷到建置到陪跑，一站式幫你的團隊把 AI 真正用進日常工作。
            </p>
            <div className={styles.highlightGrid}>
              {highlights.map((item, i) => (
                <div key={i} className={styles.highlightItem}>
                  <Check size={16} className={styles.checkIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`animate-in ${styles.ctaArea}`}>
          <p className={styles.ctaText}>
            預約免費諮詢，讓我們了解你的需求，為你設計最適合的導入方案。
          </p>
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
