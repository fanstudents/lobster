'use client';

import { useEffect, useRef } from 'react';
import {
  CloudSun, BarChart3, Presentation, Image, FileText, MessageSquare,
  Mail, CalendarCheck, Search, ShoppingCart, Globe, BookOpen,
  PieChart, Bell, Users, FileSpreadsheet, ArrowRight, Layers
} from 'lucide-react';
import styles from './TemplateGallery.module.css';

const templates = [
  { icon: CloudSun, name: '天氣預報通知', desc: '自動抓取天氣資料，每日推播到群組' },
  { icon: BarChart3, name: '數據回報', desc: '自動彙整多平台數據，產出摘要報告' },
  { icon: Presentation, name: '簡報製作', desc: '從大綱到完成簡報，10 分鐘搞定' },
  { icon: Image, name: '社群圖片產出', desc: '輸入主題自動生成多尺寸社群圖' },
  { icon: FileText, name: '企劃撰寫', desc: '從需求到完整企劃書，AI 幫你架構' },
  { icon: MessageSquare, name: '客戶訊息回覆', desc: '自動分類客戶問題，生成專業回覆' },
  { icon: Mail, name: '郵件自動化', desc: '自動撰寫、分類和排程寄送信件' },
  { icon: CalendarCheck, name: '會議紀錄整理', desc: '錄音轉文字 → 摘要 → 待辦事項' },
  { icon: Search, name: '競品分析', desc: '自動蒐集競品動態，產出比較報告' },
  { icon: ShoppingCart, name: '訂單處理通知', desc: '新訂單自動分類通知對應負責人' },
  { icon: Globe, name: '多語系翻譯', desc: '一鍵將文件翻譯成多國語言' },
  { icon: BookOpen, name: '內容改寫優化', desc: '文章 SEO 優化、語氣調整、摘要' },
  { icon: PieChart, name: '週報 / 月報生成', desc: '自動拉數據產出圖表與報告' },
  { icon: Bell, name: '異常監控警報', desc: '數據異常自動偵測並即時通知' },
  { icon: Users, name: '人資表單流程', desc: '請假、簽核、入職流程自動化' },
  { icon: FileSpreadsheet, name: '試算表自動化', desc: '自動整理、計算、產出 Excel 報表' },
];

export default function TemplateGallery() {
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
    <section className={`section ${styles.section}`} id="templates" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">實戰模板</div>
          <h2 className="section-title">
            超過 <span className="text-gradient">50 種工作流模板</span>
            <br />
            導入後直接套用
          </h2>
          <p className="section-subtitle">
            每個模板都是經過驗證的實戰工作流。不是教你理論，是讓你的團隊馬上就能用。
          </p>
        </div>

        <div className={`animate-in ${styles.grid}`}>
          {templates.map((t, i) => {
            const Icon = t.icon;
            return (
              <div
                key={i}
                className={`${styles.card} ${i >= 8 ? styles.mobileHidden : ''}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={styles.cardIcon}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div className={styles.cardContent}>
                  <h4 className={styles.cardName}>{t.name}</h4>
                  <p className={styles.cardDesc}>{t.desc}</p>
                </div>
              </div>
            );
          })}
          <div className={styles.mobileMore}>
            <span>... 還有 8 種以上模板</span>
          </div>
        </div>

        <div className={`animate-in ${styles.more}`}>
          <div className={styles.moreBox}>
            <Layers size={20} className={styles.moreIcon} />
            <div>
              <p className={styles.moreTitle}>以上只是其中 16 種</p>
              <p className={styles.moreDesc}>
                我們提供超過 <strong>50 種可直接套用的工作流模板</strong>，
                涵蓋行銷、客服、人資、財務、專案管理等領域。
                導入後不是空手而歸，是帶著一整套系統開始運作。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
