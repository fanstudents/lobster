'use client';

import { useState, useEffect, useRef } from 'react';
import { Brain, Zap, Link2, Rocket, Mic, ChevronDown } from 'lucide-react';
import styles from './CourseModules.module.css';

const modules = [
  {
    num: '01',
    icon: Brain,
    title: 'AI 工作流思維',
    tag: '最重要',
    items: [
      '什麼是 AI 工作流——不是工具操作，是系統設計',
      '怎麼拆解你的日常工作，找到自動化切入點',
      '判斷哪些環節值得讓 AI 接手',
      '建立「流程優先」的思維模式',
    ],
  },
  {
    num: '02',
    icon: Zap,
    title: 'AI 工具實戰',
    tag: '實作導向',
    items: [
      'ChatGPT / Gemini / Claude 的深度使用策略',
      'Prompt 設計背後的邏輯，而不只是模板',
      '文件處理實戰：簡報、試算表、Notion',
      '全部使用你自己的工作資料操作',
    ],
  },
  {
    num: '03',
    icon: Link2,
    title: '自動化流程串接',
    tag: '核心技術',
    items: [
      '表單收集 → 自動分類 → 任務派發',
      '客服自動回覆系統設計',
      '行銷流程的 AI 介入點',
      '整合 Make / n8n / Google Sheets',
    ],
  },
  {
    num: '04',
    icon: Rocket,
    title: '個人專案實作',
    tag: '帶走成果',
    items: [
      '每人完成一套自己的 AI 工作系統',
      '範例：AI 行銷助理、客服機器人、報表生成器',
      '從設計到部署的完整流程',
      '課程結束就有東西可以直接用',
    ],
  },
  {
    num: '05',
    icon: Mic,
    title: 'Demo Day + 社群',
    tag: '持續進化',
    items: [
      '學員成果發表，講師現場點評',
      '加入專屬學員社群，持續交流',
      '定期更新的工作流模板',
      '結業後系統持續可用、持續進化',
    ],
  },
  {
    num: '+1',
    icon: Zap,
    title: '安裝排除直播',
    tag: '確保上線',
    items: [
      '針對尚未完成安裝的同學開設',
      '團體線上直播，即時排除問題',
      '確保每位同學都如期完成龍蝦安裝',
      '不額外收費，課程內含',
    ],
  },
];

export default function CourseModules() {
  const [openIndex, setOpenIndex] = useState(0);
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
    <section className={`section ${styles.section}`} id="course" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">課程內容</div>
          <h2 className="section-title">
            4+1 堂課，做出<span className="text-gradient">一套能用的系統</span>
          </h2>
          <p className="section-subtitle">
            半課程、半實作、半顧問。不只教你知識，更陪你落地。
          </p>
        </div>

        <div className={`animate-in ${styles.timeline}`}>
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div
                key={i}
                className={`${styles.module} ${openIndex === i ? styles.active : ''}`}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <div className={styles.moduleHeader}>
                  <div className={styles.moduleNum}>{mod.num}</div>
                  <div className={styles.moduleIconWrap}>
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div className={styles.moduleMeta}>
                    <h3 className={styles.moduleTitle}>{mod.title}</h3>
                    <span className={styles.moduleTag}>{mod.tag}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`${styles.chevron} ${openIndex === i ? styles.chevronOpen : ''}`}
                  />
                </div>

                <div className={`${styles.moduleBody} ${openIndex === i ? styles.bodyOpen : ''}`}>
                  <div className={styles.moduleBodyInner}>
                    <ul className={styles.moduleList}>
                      {mod.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
