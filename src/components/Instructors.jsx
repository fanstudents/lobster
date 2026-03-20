'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Instructors.module.css';

const team = [
  {
    name: '樊松蒲 Dennis',
    role: 'AI 自動化專家',
    photo: '/team-dennis.jpg',
    bio: '專注於 AI 工作流的企業內訓，已協助超過 20 間企業完成 AI 導入與服務。擅長將企業痛點轉化為可落地的 AI 自動化解決方案。',
    highlights: ['企業 AI 導入', '工作流設計', '20+ 企業服務'],
  },
  {
    name: 'Cablate',
    role: '龍蝦大神',
    photo: '/team-cablate.jpg',
    bio: '最早開始研究並自製龍蝦的技術派專家。精通 Cloud、Code、Skill，以及各種場景應用，是龍蝦技術領域的先驅。',
    highlights: ['龍蝦先驅', 'Cloud · Code · Skill', '場景應用'],
  },
  {
    name: 'Jane',
    role: 'AI PM',
    photo: '/team-jane.jpg',
    bio: '精通 AI 各種流程的專案溝通，確保服務品質以及後續維護的穩定性。從需求到交付，全程把關。',
    highlights: ['專案管理', '品質把關', '維護穩定'],
  },
];

export default function Instructors() {
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
    <section className={`section ${styles.section}`} id="instructors" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">團隊陣容</div>
          <h2 className="section-title">
            不只會教，<span className="text-gradient">更做過</span>
          </h2>
          <p className="section-subtitle">
            我們的團隊來自第一線的企業 AI 導入實務，教的每一件事都是親手做過的。
          </p>
        </div>

        <div className={styles.grid}>
          {team.map((person, i) => (
            <div
              key={i}
              className={`animate-in glass-card ${styles.card}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.photoWrap}>
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={120}
                  height={120}
                  className={styles.photo}
                />
              </div>

              <div className={styles.info}>
                <h3 className={styles.name}>{person.name}</h3>
                <p className={styles.role}>{person.role}</p>
                <p className={styles.bio}>{person.bio}</p>

                <div className={styles.highlights}>
                  {person.highlights.map((h, j) => (
                    <span key={j} className={styles.tag}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
