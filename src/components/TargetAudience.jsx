'use client';

import { useEffect, useRef } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import styles from './TargetAudience.module.css';

// SVG: Checklist visual
function AudienceChecklistSVG() {
  const yes = [
    '已經用過 ChatGPT / Claude / Gemini',
    '知道 Prompt 是什麼、寫過幾次',
    '理解 AI 不是免費的魔法棒',
    '願意每月投入費用維持系統運作',
    '有想要自動化的工作流程',
    '有耐心完成 4+1 堂課程',
  ];

  const no = [
    '從來沒用過任何 AI 工具',
    '期待上完課就完全免費使用',
    '只想學工具操作、不想改流程',
    '沒有具體想解決的工作痛點',
  ];

  return (
    <svg viewBox="0 0 520 420" fill="none" className={styles.svg}>
      {/* Left: Suitable */}
      <rect x="10" y="10" width="240" height="400" rx="14" fill="rgba(100,200,130,0.04)" stroke="rgba(100,200,130,0.15)" strokeWidth="1" />
      <text x="130" y="42" fill="hsl(150, 60%, 55%)" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter, sans-serif">
        適合你，如果你...
      </text>

      {yes.map((item, i) => (
        <g key={i}>
          <rect x="28" y={58 + i * 54} width="18" height="18" rx="4" fill="rgba(100,200,130,0.12)" stroke="rgba(100,200,130,0.3)" strokeWidth="1" />
          <path d={`M${32} ${67 + i * 54} l3 3 l5 -5`} stroke="hsl(150, 60%, 55%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="54" y={72 + i * 54} fill="#333" fontSize="11" fontFamily="Inter, Noto Sans TC, sans-serif">
            {item}
          </text>
        </g>
      ))}

      {/* Right: Not suitable */}
      <rect x="270" y="10" width="240" height="400" rx="14" fill="rgba(230,70,50,0.03)" stroke="rgba(230,70,50,0.12)" strokeWidth="1" />
      <text x="390" y="42" fill="hsl(0, 60%, 60%)" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter, sans-serif">
        可能還不適合，如果你...
      </text>

      {no.map((item, i) => (
        <g key={i}>
          <rect x="288" y={58 + i * 54} width="18" height="18" rx="4" fill="rgba(230,70,50,0.08)" stroke="rgba(230,70,50,0.2)" strokeWidth="1" />
          <line x1="293" y1={63 + i * 54} x2="301" y2={71 + i * 54} stroke="hsl(0, 60%, 55%)" strokeWidth="2" strokeLinecap="round" />
          <line x1="301" y1={63 + i * 54} x2="293" y2={71 + i * 54} stroke="hsl(0, 60%, 55%)" strokeWidth="2" strokeLinecap="round" />
          <text x="314" y={72 + i * 54} fill="#555" fontSize="11" fontFamily="Inter, Noto Sans TC, sans-serif">
            {item}
          </text>
        </g>
      ))}

      {/* Bottom note in right column */}
      <text x="390" y="300" fill="#999" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">
        不確定？先來免費講座看看
      </text>
    </svg>
  );
}

export default function TargetAudience() {
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
    <section className={`section ${styles.section}`} id="audience" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">適合對象</div>
          <h2 className="section-title">
            這堂課<span className="text-gradient">適合你嗎？</span>
          </h2>
          <p className="section-subtitle">
            龍蝦課不是零基礎入門課。我們希望你帶著一些 AI 使用經驗來，
            這樣你才能在課程中直接進入實戰。
          </p>
        </div>

        <div className={`animate-in ${styles.svgWrap}`}>
          <AudienceChecklistSVG />
        </div>

        <div className={`animate-in ${styles.keyPoints}`}>
          <div className={styles.keyPoint}>
            <div className={styles.keyPointIcon}>
              <Check size={16} />
            </div>
            <div>
              <h4>需要有 AI 基礎</h4>
              <p>
                你不需要是專家，但至少要用過 ChatGPT 或類似工具，
                知道怎麼跟 AI 對話。我們不會從「什麼是 AI」開始教。
              </p>
            </div>
          </div>

          <div className={styles.keyPoint}>
            <div className={styles.keyPointIcon}>
              <Check size={16} />
            </div>
            <div>
              <h4>理解龍蝦需要持續餵養</h4>
              <p>
                每隻龍蝦（自動化流程）跑起來都會產生 API 呼叫費用。
                這不是一次付費就永遠免費的服務，
                而是一個持續運作、幫你省時間的系統。
                你要有「投資工具來換效率」的心態。
              </p>
            </div>
          </div>
        </div>

        <div className={`animate-in ${styles.ctaArea}`}>
          <p className={styles.ctaText}>不確定自己適不適合？</p>
          <a href="#live" className="btn btn-outline">
            先參加免費講座了解
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
