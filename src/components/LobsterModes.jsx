'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './LobsterModes.module.css';

const modes = [
  {
    icon: '🦀',
    name: 'OpenClaw',
    tagline: '開源社群驅動',
    color: 'green',
    description:
      '由開源社群打造的龍蝦框架，任何人都可以貢獻與使用。透過社群力量不斷迭代，擁有最多元的場景覆蓋與最活躍的開發者生態。',
    features: ['社群驅動', '開源免費', '場景多元', '快速迭代'],
    fit: '適合有技術底子、喜歡自己動手改的團隊',
  },
  {
    icon: '🐟',
    name: 'NemoClaw',
    tagline: '即用型龍蝦方案',
    color: 'blue',
    description:
      '開箱即用的商業化龍蝦解決方案，內建常見工作場景模板，不需要寫 code 就能快速部署。適合想要最快上手的企業。',
    features: ['開箱即用', '視覺化配置', '商業支援', '企業級安全'],
    fit: '適合追求效率、不想碰 code 的企業用戶',
  },
  {
    icon: '⚡',
    name: 'Claude Channels',
    tagline: 'Cowork Dispatch 協作',
    color: 'purple',
    description:
      '基於 Claude 原生能力的多 Agent 協作模式，透過 Channels 機制讓多隻龍蝦分工合作，自動調度任務，實現複雜工作流。',
    features: ['多 Agent 協作', '自動調度', '原生整合', '任務拆解'],
    fit: '適合需要複雜多步驟工作流的進階場景',
  },
  {
    icon: '🔧',
    name: '自製龍蝦',
    tagline: '完全客製化',
    color: 'orange',
    description:
      '從零打造專屬於你的龍蝦。完全掌控架構、Prompt、工具鏈與部署方式，最高自由度，也最能貼合企業獨特的業務邏輯。',
    features: ['完全掌控', '深度客製', '自訂架構', '最高彈性'],
    fit: '適合有明確需求、需要深度整合既有系統的企業',
  },
];

export default function LobsterModes() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

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
    <section className={`section ${styles.section}`} id="modes" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">龍蝦生態</div>
          <h2 className="section-title">
            四大<span className="text-gradient">龍蝦模式</span>
          </h2>
          <p className="section-subtitle">
            不同的需求，不同的龍蝦。了解目前主流的四種龍蝦路線，找到最適合你的那一隻。
          </p>
        </div>

        <div className={styles.grid}>
          {modes.map((mode, i) => (
            <div
              key={i}
              className={`animate-in ${styles.card} ${styles[mode.color]} ${activeIndex === i ? styles.active : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{mode.icon}</span>
                <div>
                  <h3 className={styles.name}>{mode.name}</h3>
                  <p className={styles.tagline}>{mode.tagline}</p>
                </div>
              </div>

              <p className={styles.desc}>{mode.description}</p>

              <div className={styles.features}>
                {mode.features.map((f, j) => (
                  <span key={j} className={styles.tag}>{f}</span>
                ))}
              </div>

              <p className={styles.fit}>💡 {mode.fit}</p>
            </div>
          ))}
        </div>

        <div className={`animate-in ${styles.note}`}>
          <p>
            <strong>我們怎麼教？</strong>
            課程會帶你理解這四種模式的差異與適用場景，並根據你的企業需求，選擇最適合的路線來導入。不管你選哪條路，龍蝦都能幫你跑起來。
          </p>
        </div>
      </div>
    </section>
  );
}
