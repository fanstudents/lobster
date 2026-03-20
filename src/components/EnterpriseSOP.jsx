'use client';

import { useEffect, useRef } from 'react';
import ConsultationForm from './ConsultationForm';
import styles from './EnterpriseSOP.module.css';

const steps = [
  {
    num: '01',
    title: '預約諮詢',
    desc: '選擇線上或實體諮詢，我們先了解你的企業現況和痛點。',
    detail: '30 分鐘免費',
  },
  {
    num: '02',
    title: '企業診斷',
    desc: '深入訪談，盤點現有工作流程，找出最值得自動化的環節。',
    detail: '1–2 週',
  },
  {
    num: '03',
    title: '流程設計',
    desc: '根據診斷結果，設計出客製化的 AI 工作流藍圖和導入計畫。',
    detail: '1–2 週',
  },
  {
    num: '04',
    title: '教學 + 建置',
    desc: '帶著團隊一起建系統。邊教邊做，確保每個人都能獨立操作。',
    detail: '4–8 週',
  },
  {
    num: '05',
    title: '上線測試',
    desc: '系統上線試跑，即時調整，確保每條龍蝦都跑得正確。',
    detail: '2–4 週',
  },
  {
    num: '06',
    title: '成效追蹤',
    desc: '持續追蹤省下的時間與成本，產出成效報告。持續優化迭代。',
    detail: '持續進行',
  },
];

// SVG Timeline
function SOPTimeline() {
  const totalWidth = 960;
  const stepWidth = totalWidth / steps.length;

  return (
    <svg viewBox={`0 0 ${totalWidth} 220`} fill="none" className={styles.svg}>
      {/* Connection line */}
      <line x1="60" y1="40" x2={totalWidth - 60} y2="40" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />

      {/* Progress fill */}
      <line x1="60" y1="40" x2={totalWidth - 60} y2="40" stroke="url(#sopGradient)" strokeWidth="2" strokeDasharray="6 4" />

      <defs>
        <linearGradient id="sopGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(8, 85%, 55%)" />
          <stop offset="50%" stopColor="hsl(42, 90%, 60%)" />
          <stop offset="100%" stopColor="hsl(220, 70%, 60%)" />
        </linearGradient>
      </defs>

      {steps.map((step, i) => {
        const cx = 60 + i * (totalWidth - 120) / (steps.length - 1);
        const colors = [
          'hsl(8, 75%, 50%)', 'hsl(12, 70%, 52%)', 'hsl(20, 65%, 50%)',
          'hsl(30, 70%, 48%)', 'hsl(42, 80%, 50%)', 'hsl(220, 60%, 55%)',
        ];

        return (
          <g key={i}>
            {/* Node circle */}
            <circle cx={cx} cy="40" r="24" fill="rgba(250,250,250,0.95)" stroke={colors[i]} strokeWidth="2" />
            <text x={cx} y="45" fill={colors[i]} fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="Inter, sans-serif">
              {step.num}
            </text>

            {/* Title */}
            <text x={cx} y="85" fill="#333" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter, Noto Sans TC, sans-serif">
              {step.title}
            </text>

            {/* Description - wrap text */}
            {step.desc.match(/.{1,12}/g)?.slice(0, 3).map((line, j) => (
              <text key={j} x={cx} y={105 + j * 16} fill="#777" fontSize="10" textAnchor="middle" fontFamily="Inter, Noto Sans TC, sans-serif">
                {line}
              </text>
            ))}

            {/* Duration tag */}
            <rect x={cx - 30} y="170" width="60" height="20" rx="10" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
            <text x={cx} y="184" fill="#999" fontSize="9" fontWeight="500" textAnchor="middle" fontFamily="Inter, Noto Sans TC, sans-serif">
              {step.detail}
            </text>

            {/* Arrow between nodes */}
            {i < steps.length - 1 && (
              <polygon
                points={`${cx + 28},37 ${cx + 36},40 ${cx + 28},43`}
                fill="rgba(0,0,0,0.1)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function EnterpriseSOP() {
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
    <section className={`section ${styles.section}`} id="sop" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">導入流程</div>
          <h2 className="section-title">
            企業導入龍蝦的<span className="text-gradient-blue"> 6 步驟 SOP</span>
          </h2>
          <p className="section-subtitle">
            從第一次諮詢到系統上線，每一步都有明確規劃。不打糊塗仗。
          </p>
        </div>

        <div className={`animate-in ${styles.timelineWrap}`}>
          <SOPTimeline />
        </div>

        {/* Mobile cards fallback */}
        <div className={`animate-in ${styles.mobileSteps}`}>
          {steps.map((step, i) => (
            <div key={i} className={styles.stepCard}>
              <div className={styles.stepNum}>{step.num}</div>
              <div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
                <span className={styles.stepDetail}>{step.detail}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`animate-in ${styles.booking}`}>
          <h3 className={styles.bookingTitle}>有興趣？先聊聊</h3>
          <p className={styles.bookingDesc}>30 分鐘免費諮詢，線上或實體都可以。填寫表單後我們會主動與你聯繫。</p>
          <div className={styles.bookingAction}>
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
