'use client';

import { useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';
import styles from './Solution.module.css';

const oldWay = [
  '只教工具操作，不管落地',
  '用假資料做練習，學完用不上',
  '上完課團隊還是不知道怎麼用',
  '缺乏後續維護與陪跑',
  '沒有針對企業場景客製化',
];

const newWay = [
  '拆解企業真實工作流程',
  '用你的業務資料設計 AI 方案',
  '做出可立即上線的自動化系統',
  '3–6 個月專屬顧問陪跑',
  '持續追蹤成效與系統優化',
];

export default function Solution() {
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
    <section className={`section ${styles.section}`} ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">我們的做法</div>
          <h2 className="section-title">
            不只教工具操作
            <br />
            <span className="text-gradient">直接幫企業建系統</span>
          </h2>
        </div>

        <div className={`animate-in ${styles.comparison}`}>
          <div className={`glass-card ${styles.compCard} ${styles.bad}`}>
            <div className={styles.compHeader}>
              <h3>一般 AI 導入</h3>
            </div>
            <ul className={styles.compList}>
              {oldWay.map((item, i) => (
                <li key={i}>
                  <X size={14} className={styles.xIcon} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.vsCircle}>VS</div>

          <div className={`glass-card ${styles.compCard} ${styles.good}`}>
            <div className={styles.compHeader}>
              <h3>AI 龍蝦導入</h3>
            </div>
            <ul className={styles.compList}>
              {newWay.map((item, i) => (
                <li key={i}>
                  <Check size={14} className={styles.checkIcon} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`animate-in ${styles.bottom}`}>
          <p className={styles.bottomText}>
            核心理念：幫企業建出一套<strong>直接能用的 AI 工作流系統</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
