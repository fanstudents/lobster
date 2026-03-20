'use client';

import { useEffect, useRef } from 'react';
import { Gauge, RotateCcw, Puzzle } from 'lucide-react';
import styles from './PainPoints.module.css';

const painPoints = [
  {
    icon: Gauge,
    title: '團隊學了 AI，但效率沒提升',
    description: '花了預算讓團隊參加 AI 課程，但工作流程還是一樣。會用工具不代表能落地到業務。',
  },
  {
    icon: RotateCcw,
    title: '重複的流程還是用人力處理',
    description: '明知可以自動化，但不知道從哪切入。每天一樣的報表、一樣的回覆，一樣花人力。',
  },
  {
    icon: Puzzle,
    title: '試了很多工具，但串不起來',
    description: '團隊用了十幾種 AI 服務，各自獨立。缺的不是工具，是把它們串成系統的導入方法。',
  },
];

export default function PainPoints() {
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
          <div className="section-label">企業常見困境</div>
          <h2 className="section-title">
            這些問題，您的團隊也有嗎？
          </h2>
          <p className="section-subtitle">
            這不是團隊的問題，是因為缺少一套專業的 AI 導入方法。
          </p>
        </div>

        <div className={styles.grid}>
          {painPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <div
                key={i}
                className={`animate-in glass-card ${styles.card}`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className={styles.cardIconWrap}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitle}>{point.title}</h3>
                <p className={styles.cardDesc}>{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
