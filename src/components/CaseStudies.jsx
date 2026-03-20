'use client';

import { useEffect, useRef } from 'react';
import { TrendingUp, Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './CaseStudies.module.css';

const cases = [
  {
    icon: TrendingUp,
    category: '行銷自動化',
    title: '一人行銷團隊做到 3 人份產出',
    metric: '產出量提升 300%',
    description: '新創公司行銷部只有一人，透過 AI 工作流建立從內容產出到社群排程的全自動化流程。',
  },
  {
    icon: Clock,
    category: '自動報表',
    title: '每週報表從 4 小時變 10 分鐘',
    metric: '節省 95% 時間',
    description: '專案經理每週 4 小時整理報表，導入 AI 報表系統後只需 10 分鐘確認。',
  },
  {
    icon: Users,
    category: '企業導入',
    title: '50 人公司 90 天全面 AI 化',
    metric: '人力成本降 40%',
    description: '從訪談、流程拆解到系統上線，完整記錄一家科技公司的 AI 轉型過程。',
  },
];

export default function CaseStudies() {
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
          <div className="section-label">成功案例</div>
          <h2 className="section-title">
            他們已經<span className="text-gradient">做到了</span>
          </h2>
          <p className="section-subtitle">
            這些都是真實的工作流改造成果，不是假設。
          </p>
        </div>

        <div className={styles.grid}>
          {cases.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`animate-in glass-card ${styles.card}`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.category}>{item.category}</span>
                  <div className={styles.metric}>{item.metric}</div>
                </div>
                <div className={styles.cardIconWrap}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className={`animate-in ${styles.moreLink}`}>
          <Link href="/blog" className="btn btn-outline">
            查看更多案例
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
