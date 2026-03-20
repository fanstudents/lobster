'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './LobsterShowcase.module.css';

// SVG Lobster component with variations
function LobsterSVG({ size = 48, hue = 8, opacity = 1, rotation = 0, variant = 0 }) {
  const bodyColor = `hsl(${hue}, 75%, ${45 + variant * 3}%)`;
  const darkColor = `hsl(${hue}, 70%, ${30 + variant * 2}%)`;
  const lightColor = `hsl(${hue}, 80%, ${55 + variant * 3}%)`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      style={{ opacity, transform: `rotate(${rotation}deg)` }}
    >
      {/* Body */}
      <ellipse cx="32" cy="34" rx="10" ry="14" fill={bodyColor} />
      <ellipse cx="32" cy="32" rx="8" ry="10" fill={lightColor} />
      {/* Head */}
      <ellipse cx="32" cy="20" rx="9" ry="8" fill={bodyColor} />
      <ellipse cx="32" cy="19" rx="7" ry="6" fill={lightColor} />
      {/* Eyes */}
      <circle cx="28" cy="16" r="2.5" fill={darkColor} />
      <circle cx="36" cy="16" r="2.5" fill={darkColor} />
      <circle cx="28.5" cy="15.5" r="1" fill="white" />
      <circle cx="36.5" cy="15.5" r="1" fill="white" />
      {/* Antennae */}
      <path d="M28 13 Q24 4 18 2" stroke={bodyColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M36 13 Q40 4 46 2" stroke={bodyColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Claws */}
      <path d="M22 26 Q14 22 10 18 Q8 22 12 26 Q8 24 6 20 Q4 24 10 28 L22 30" fill={bodyColor} stroke={darkColor} strokeWidth="0.5" />
      <path d="M42 26 Q50 22 54 18 Q56 22 52 26 Q56 24 58 20 Q60 24 54 28 L42 30" fill={bodyColor} stroke={darkColor} strokeWidth="0.5" />
      {/* Tail segments */}
      <ellipse cx="32" cy="42" rx="8" ry="4" fill={bodyColor} />
      <ellipse cx="32" cy="47" rx="7" ry="3" fill={bodyColor} />
      <ellipse cx="32" cy="51" rx="6" ry="2.5" fill={bodyColor} />
      {/* Tail fan */}
      <path d="M26 53 Q24 60 22 62 Q32 58 32 54" fill={bodyColor} />
      <path d="M38 53 Q40 60 42 62 Q32 58 32 54" fill={bodyColor} />
      <path d="M29 53 Q28 59 27 62 Q32 58 32 54" fill={lightColor} />
      <path d="M35 53 Q36 59 37 62 Q32 58 32 54" fill={lightColor} />
      {/* Legs */}
      <line x1="26" y1="32" x2="20" y2="38" stroke={darkColor} strokeWidth="1.2" />
      <line x1="26" y1="36" x2="20" y2="42" stroke={darkColor} strokeWidth="1.2" />
      <line x1="38" y1="32" x2="44" y2="38" stroke={darkColor} strokeWidth="1.2" />
      <line x1="38" y1="36" x2="44" y2="42" stroke={darkColor} strokeWidth="1.2" />
    </svg>
  );
}

// Generate a grid of lobsters with varied characteristics
const lobsterData = [
  { name: '客服龍蝦', label: 'CS-01', hue: 8, size: 52 },
  { name: '報表龍蝦', label: 'RPT-02', hue: 15, size: 44 },
  { name: '行銷龍蝦', label: 'MKT-03', hue: 5, size: 48 },
  { name: '排程龍蝦', label: 'SCH-04', hue: 350, size: 40 },
  { name: '數據龍蝦', label: 'DAT-05', hue: 20, size: 50 },
  { name: '簡報龍蝦', label: 'PPT-06', hue: 12, size: 46 },
  { name: '社群龍蝦', label: 'SOC-07', hue: 3, size: 42 },
  { name: '企劃龍蝦', label: 'PLN-08', hue: 18, size: 48 },
  { name: '翻譯龍蝦', label: 'TRL-09', hue: 355, size: 44 },
  { name: '摘要龍蝦', label: 'SUM-10', hue: 10, size: 38 },
  { name: '文案龍蝦', label: 'CPY-11', hue: 22, size: 46 },
  { name: '分析龍蝦', label: 'ANA-12', hue: 6, size: 50 },
  { name: '通知龍蝦', label: 'NTF-13', hue: 14, size: 40 },
  { name: '審核龍蝦', label: 'REV-14', hue: 2, size: 44 },
  { name: '專案龍蝦', label: 'PRJ-15', hue: 16, size: 48 },
  { name: '信件龍蝦', label: 'EML-16', hue: 8, size: 42 },
  { name: '設計龍蝦', label: 'DSN-17', hue: 348, size: 46 },
  { name: '預測龍蝦', label: 'FRC-18', hue: 12, size: 44 },
  { name: '整合龍蝦', label: 'INT-19', hue: 20, size: 40 },
  { name: '記錄龍蝦', label: 'LOG-20', hue: 5, size: 38 },
  { name: '提案龍蝦', label: 'PRP-21', hue: 15, size: 50 },
  { name: '回覆龍蝦', label: 'RPL-22', hue: 10, size: 46 },
  { name: '追蹤龍蝦', label: 'TRK-23', hue: 3, size: 42 },
  { name: '品管龍蝦', label: 'QA-24', hue: 18, size: 44 },
];

export default function LobsterShowcase() {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
    <section className={`section ${styles.section}`} id="showcase" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">龍蝦展示區</div>
          <h2 className="section-title">
            你的<span className="text-gradient">龍蝦軍團</span>正在集結
          </h2>
          <p className="section-subtitle">
            每完成一個工作流，就部署一隻龍蝦。導入結束時，你的軍團就成形了。
          </p>
        </div>

        <div className={`animate-in ${styles.showcase}`}>
          <div className={styles.showcaseInner}>
            {lobsterData.map((lobster, i) => (
              <div
                key={i}
                className={styles.lobsterCell}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div className={`${styles.lobsterWrap} ${hoveredIndex === i ? styles.hovered : ''}`}>
                  <LobsterSVG
                    size={lobster.size}
                    hue={lobster.hue}
                    variant={i % 5}
                    rotation={hoveredIndex === i ? -5 + Math.random() * 10 : 0}
                  />
                </div>
                <span className={styles.lobsterLabel}>{lobster.label}</span>
                <span className={styles.lobsterName}>{lobster.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`animate-in ${styles.counter}`}>
          <div className={styles.counterNumber}>
            <span className={styles.counterValue}>{lobsterData.length}</span>
            <span className={styles.counterUnit}>隻龍蝦已部署</span>
          </div>
          <p className={styles.counterDesc}>
            每位客戶都會在導入過程中打造自己的龍蝦軍團。你的陣容會長什麼樣子？
          </p>
        </div>
      </div>
    </section>
  );
}
