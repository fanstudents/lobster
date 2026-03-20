'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Instructors.module.css';

const team = [
  {
    name: '樊松蒲 Dennis',
    role: 'AI 與自動化專家',
    photo: '/team-dennis.jpg',
    bio: '專注於 AI 工作流的企業內訓，已協助超過 20 間企業完成 AI 導入與服務。擅長將企業痛點轉化為可落地的 AI 自動化解決方案。',
    highlights: ['企業 AI 導入', '工作流設計', '20+ 企業服務'],
    threads: 'https://www.threads.com/@tbr.digital',
  },
  {
    name: 'Cablate',
    role: '龍蝦大神 + Claude 專家',
    photo: '/team-cablate.jpg',
    bio: '最早開始研究並自製龍蝦的技術派專家。精通 Cloud、Code、Skill，以及各種場景應用，是龍蝦技術領域的先驅。',
    highlights: ['龍蝦先驅', 'Cloud · Code · Skill', '場景應用'],
    threads: 'https://www.threads.com/@cab_late',
  },
  {
    name: 'Jane',
    role: 'AI PM',
    photo: '/team-jane.jpg',
    bio: '精通 AI 各種流程的專案溝通，確保服務品質以及後續維護的穩定性。從需求到交付，全程把關。',
    highlights: ['專案管理', '品質把關', '維護穩定'],
    threads: 'https://www.threads.com/@janesbooknote',
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

                {person.threads && (
                  <a
                    href={person.threads}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.threadsLink}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.838-1.87.912-.81 1.528-1.747 1.84-2.792.383-1.28.293-2.456-.265-3.398-.417-.707-1.08-1.263-1.935-1.632a7.3 7.3 0 0 1-.09 2.63c-.266 1.172-.753 2.106-1.453 2.782-.942.908-2.178 1.37-3.674 1.37h-.086c-1.168-.014-2.14-.428-2.812-1.198-.65-.745-.98-1.737-.928-2.788.09-1.83 1.318-3.303 3.2-3.834a15.4 15.4 0 0 1 3.09-.498c-.11-.59-.36-1.05-.756-1.373-.52-.424-1.283-.64-2.266-.645h-.055c-.834.005-1.597.227-2.094.609-.42.322-.695.78-.81 1.21l-1.97-.523c.2-.752.638-1.456 1.292-1.96.89-.686 2.11-1.054 3.527-1.054h.08c1.48.015 2.655.435 3.49 1.248.694.674 1.126 1.576 1.295 2.647.565.044 1.108.122 1.622.234 1.156.253 2.14.717 2.926 1.378 1.042.876 1.648 2.05 1.8 3.49.11 1.045-.09 2.14-.594 3.254-.458 1.008-1.142 1.888-2.036 2.62C18.098 23.16 15.588 23.972 12.186 24zm.673-10.986c-.775.07-1.485.197-2.094.377-1.194.352-1.934 1.152-1.98 2.14-.028.576.162 1.1.536 1.527.392.447.946.69 1.602.7h.062c1.34 0 2.36-.517 3.032-1.535.46-.698.714-1.593.714-2.467v-.02a6.399 6.399 0 0 0-1.872-.722z" />
                    </svg>
                    Threads
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
