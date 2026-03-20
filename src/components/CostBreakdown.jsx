'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import styles from './CostBreakdown.module.css';

export default function CostBreakdown() {
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
    <section className={`section ${styles.section}`} id="cost" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">成本透明</div>
          <h2 className="section-title">
            企業導入<span className="text-gradient">費用說明</span>
          </h2>
          <p className="section-subtitle">
            我們把費用結構攤開來講，讓你在導入前就有清楚的預期。
          </p>
        </div>

        {/* ===== SVG Infographic ===== */}
        <div className={`animate-in ${styles.infographic}`}>
          <svg viewBox="0 0 900 620" className={styles.svg} xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Gradients */}
              <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(150, 55%, 92%)" />
                <stop offset="100%" stopColor="hsl(150, 55%, 85%)" />
              </linearGradient>
              <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(220, 55%, 92%)" />
                <stop offset="100%" stopColor="hsl(220, 55%, 85%)" />
              </linearGradient>
              <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(30, 60%, 92%)" />
                <stop offset="100%" stopColor="hsl(30, 60%, 85%)" />
              </linearGradient>
              <linearGradient id="grad-header" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(230, 65%, 55%)" />
                <stop offset="100%" stopColor="hsl(250, 60%, 52%)" />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* ===== Header Banner ===== */}
            <rect x="150" y="10" width="600" height="52" rx="26" fill="url(#grad-header)" filter="url(#shadow)" />
            <text x="450" y="42" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">
              🦞 龍蝦 AI 工作流 — 費用結構全覽
            </text>

            {/* ===== Connecting Lines ===== */}
            <line x1="450" y1="62" x2="450" y2="90" stroke="hsl(230, 30%, 80%)" strokeWidth="2" strokeDasharray="6 3" />
            <line x1="450" y1="90" x2="160" y2="90" stroke="hsl(230, 30%, 80%)" strokeWidth="2" />
            <line x1="450" y1="90" x2="740" y2="90" stroke="hsl(230, 30%, 80%)" strokeWidth="2" />
            <line x1="160" y1="90" x2="160" y2="108" stroke="hsl(150, 40%, 70%)" strokeWidth="2" />
            <line x1="450" y1="90" x2="450" y2="108" stroke="hsl(220, 40%, 70%)" strokeWidth="2" />
            <line x1="740" y1="90" x2="740" y2="108" stroke="hsl(30, 50%, 70%)" strokeWidth="2" />

            {/* ===== Phase 1: 導入費用 (Left) ===== */}
            <g>
              <rect x="30" y="108" width="260" height="310" rx="16" fill="url(#grad-green)" stroke="hsl(150, 40%, 75%)" strokeWidth="1.5" filter="url(#shadow)" />
              {/* Header */}
              <rect x="30" y="108" width="260" height="48" rx="16" fill="hsl(150, 50%, 40%)" />
              <rect x="30" y="132" width="260" height="24" fill="hsl(150, 50%, 40%)" />
              <text x="160" y="138" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">🎯 Phase 1 — 導入費用</text>
              {/* Pricing */}
              <text x="160" y="185" textAnchor="middle" fill="hsl(0, 0%, 60%)" fontSize="14" fontWeight="500" fontFamily="system-ui, sans-serif" textDecoration="line-through">原價 NT$ 30,000</text>
              <text x="160" y="218" textAnchor="middle" fill="hsl(150, 55%, 35%)" fontSize="32" fontWeight="900" fontFamily="system-ui, sans-serif">NT$ 0</text>
              <rect x="110" y="228" width="100" height="22" rx="11" fill="hsl(150, 55%, 40%)" opacity="0.15" />
              <text x="160" y="244" textAnchor="middle" fill="hsl(150, 55%, 35%)" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">🔥 限時免費</text>
              {/* Items */}
              <g fill="hsl(150, 40%, 30%)" fontSize="12" fontWeight="500" fontFamily="system-ui, sans-serif">
                <text x="58" y="280">✓ 課前深度訪談與需求分析</text>
                <text x="58" y="304">✓ 工作流程拆解與 AI 方案設計</text>
                <text x="58" y="328">✓ 導入規劃書交付</text>
                <text x="58" y="352">✓ 首次環境建置協助</text>
              </g>
              {/* Divider */}
              <line x1="60" y1="370" x2="260" y2="370" stroke="hsl(150, 40%, 75%)" strokeWidth="1" />
              <text x="160" y="395" textAnchor="middle" fill="hsl(150, 40%, 35%)" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">⏱ 約 1–2 週完成</text>
            </g>

            {/* ===== Arrow 1→2 ===== */}
            <g>
              <line x1="290" y1="263" x2="315" y2="263" stroke="hsl(220, 40%, 75%)" strokeWidth="2" />
              <polygon points="315,257 327,263 315,269" fill="hsl(220, 40%, 70%)" />
            </g>

            {/* ===== Phase 2: 後續費用 (Center) ===== */}
            <g>
              <rect x="320" y="108" width="260" height="310" rx="16" fill="url(#grad-blue)" stroke="hsl(220, 40%, 75%)" strokeWidth="1.5" filter="url(#shadow)" />
              {/* Header */}
              <rect x="320" y="108" width="260" height="48" rx="16" fill="hsl(220, 55%, 48%)" />
              <rect x="320" y="132" width="260" height="24" fill="hsl(220, 55%, 48%)" />
              <text x="450" y="138" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">⚙️ Phase 2 — 後續費用</text>
              {/* Pricing */}
              <text x="450" y="185" textAnchor="middle" fill="hsl(220, 30%, 50%)" fontSize="13" fontWeight="500" fontFamily="system-ui, sans-serif">依場景與規模報價</text>
              <text x="450" y="218" textAnchor="middle" fill="hsl(220, 60%, 42%)" fontSize="26" fontWeight="900" fontFamily="system-ui, sans-serif">客製化方案</text>
              {/* Example pricing */}
              <rect x="350" y="232" width="200" height="32" rx="8" fill="hsl(220, 50%, 95%)" stroke="hsl(220, 40%, 85%)" strokeWidth="1" />
              <text x="450" y="253" textAnchor="middle" fill="hsl(220, 50%, 42%)" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">📊 平均企業 NT$ 3,000–8,000 / 月</text>
              {/* Items */}
              <g fill="hsl(220, 35%, 30%)" fontSize="12" fontWeight="500" fontFamily="system-ui, sans-serif">
                <text x="348" y="288">✓ 按企業實際場景客製</text>
                <text x="348" y="312">✓ 教學 + 導入一站式完成</text>
                <text x="348" y="336">✓ 3–6 個月陪跑服務</text>
                <text x="348" y="360">✓ 成效追蹤報告</text>
              </g>
              {/* Divider */}
              <line x1="350" y1="375" x2="550" y2="375" stroke="hsl(220, 40%, 78%)" strokeWidth="1" />
              <text x="450" y="400" textAnchor="middle" fill="hsl(220, 40%, 38%)" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">⏱ 3–6 個月陪跑</text>
            </g>

            {/* ===== Arrow 2→3 ===== */}
            <g>
              <line x1="580" y1="263" x2="605" y2="263" stroke="hsl(30, 50%, 75%)" strokeWidth="2" />
              <polygon points="605,257 617,263 605,269" fill="hsl(30, 50%, 70%)" />
            </g>

            {/* ===== Phase 3: 衍生費用 (Right) ===== */}
            <g>
              <rect x="610" y="108" width="260" height="310" rx="16" fill="url(#grad-orange)" stroke="hsl(30, 50%, 75%)" strokeWidth="1.5" filter="url(#shadow)" />
              {/* Header */}
              <rect x="610" y="108" width="260" height="48" rx="16" fill="hsl(30, 65%, 42%)" />
              <rect x="610" y="132" width="260" height="24" fill="hsl(30, 65%, 42%)" />
              <text x="740" y="138" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">🔑 Phase 3 — 衍生費用</text>
              {/* Pricing */}
              <text x="740" y="185" textAnchor="middle" fill="hsl(30, 40%, 50%)" fontSize="13" fontWeight="500" fontFamily="system-ui, sans-serif">API Token 使用費</text>
              <text x="740" y="218" textAnchor="middle" fill="hsl(30, 70%, 38%)" fontSize="26" fontWeight="900" fontFamily="system-ui, sans-serif">實際用量計價</text>
              {/* Example pricing */}
              <rect x="640" y="232" width="200" height="32" rx="8" fill="hsl(30, 50%, 95%)" stroke="hsl(30, 40%, 85%)" strokeWidth="1" />
              <text x="740" y="253" textAnchor="middle" fill="hsl(30, 60%, 38%)" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">📊 平均每人 NT$ 100–500 / 月</text>
              {/* Items */}
              <g fill="hsl(30, 35%, 30%)" fontSize="12" fontWeight="500" fontFamily="system-ui, sans-serif">
                <text x="638" y="288">✓ 按實際 API 呼叫量計費</text>
                <text x="638" y="312">✓ 帳單透明，使用者自行查看</text>
                <text x="638" y="336">✓ 不綁定平台，自由選擇</text>
                <text x="638" y="360">✓ 課程教你控制優化成本</text>
              </g>
              {/* Divider */}
              <line x1="640" y1="375" x2="840" y2="375" stroke="hsl(30, 50%, 78%)" strokeWidth="1" />
              <text x="740" y="400" textAnchor="middle" fill="hsl(30, 50%, 38%)" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">💡 用多少付多少</text>
            </g>

            {/* ===== Bottom Summary Bar ===== */}
            <rect x="30" y="445" width="840" height="72" rx="16" fill="hsl(230, 25%, 97%)" stroke="hsl(230, 20%, 88%)" strokeWidth="1.5" filter="url(#shadow)" />
            <text x="450" y="473" textAnchor="middle" fill="hsl(230, 30%, 30%)" fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif">
              💰 實際案例：10 人團隊平均每月總費用約 NT$ 5,000–10,000（含 API）
            </text>
            <text x="450" y="498" textAnchor="middle" fill="hsl(230, 20%, 55%)" fontSize="12" fontWeight="500" fontFamily="system-ui, sans-serif">
              相當於每人每月一杯咖啡的價格，省下 50% 重複工作時間
            </text>

            {/* ===== Bottom Highlights ===== */}
            <g>
              <rect x="70" y="540" width="220" height="60" rx="12" fill="hsl(150, 50%, 95%)" stroke="hsl(150, 40%, 82%)" strokeWidth="1.5" />
              <text x="180" y="565" textAnchor="middle" fill="hsl(150, 50%, 32%)" fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif">🎯 導入零成本</text>
              <text x="180" y="585" textAnchor="middle" fill="hsl(150, 35%, 45%)" fontSize="11" fontWeight="500" fontFamily="system-ui, sans-serif">預約即享 NT$0 導入</text>
            </g>
            <g>
              <rect x="340" y="540" width="220" height="60" rx="12" fill="hsl(220, 50%, 95%)" stroke="hsl(220, 40%, 82%)" strokeWidth="1.5" />
              <text x="450" y="565" textAnchor="middle" fill="hsl(220, 50%, 35%)" fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif">📋 帳單全透明</text>
              <text x="450" y="585" textAnchor="middle" fill="hsl(220, 35%, 48%)" fontSize="11" fontWeight="500" fontFamily="system-ui, sans-serif">API 費用使用者直接查看</text>
            </g>
            <g>
              <rect x="610" y="540" width="220" height="60" rx="12" fill="hsl(30, 50%, 95%)" stroke="hsl(30, 40%, 82%)" strokeWidth="1.5" />
              <text x="720" y="565" textAnchor="middle" fill="hsl(30, 55%, 35%)" fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif">🔓 不綁定合約</text>
              <text x="720" y="585" textAnchor="middle" fill="hsl(30, 35%, 48%)" fontSize="11" fontWeight="500" fontFamily="system-ui, sans-serif">隨時調整，彈性自由</text>
            </g>
          </svg>
        </div>

        <div className={`animate-in ${styles.ctaWrap}`}>
          <a href="#enterprise" className="btn btn-enterprise btn-lg">
            立即預約免費諮詢
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
