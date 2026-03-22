'use client';

import { useEffect, useRef } from 'react';
import styles from './LobsterDiagram.module.css';

export default function LobsterDiagram() {
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
          <div className="section-label">運作原理</div>
          <h2 className="section-title">
            龍蝦如何<span className="text-gradient">幫你工作</span>
          </h2>
          <p className="section-subtitle">
            從資料擷取到任務分派，全自動化的智慧工作流。
          </p>
        </div>

        <div className={`animate-in ${styles.diagramWrap}`}>
          <svg viewBox="0 0 960 520" className={styles.svg} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="db-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(25, 30%, 72%)" />
                <stop offset="100%" stopColor="hsl(25, 30%, 58%)" />
              </linearGradient>
              <linearGradient id="db-top" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(25, 30%, 78%)" />
                <stop offset="100%" stopColor="hsl(25, 30%, 70%)" />
              </linearGradient>
              <linearGradient id="cube-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(220, 15%, 65%)" />
                <stop offset="100%" stopColor="hsl(220, 15%, 52%)" />
              </linearGradient>
              <linearGradient id="cube-top" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(220, 15%, 75%)" />
                <stop offset="100%" stopColor="hsl(220, 15%, 65%)" />
              </linearGradient>
              <linearGradient id="pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(8, 60%, 55%)" />
                <stop offset="100%" stopColor="hsl(8, 55%, 50%)" />
              </linearGradient>
              <linearGradient id="arrow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(8, 55%, 50%)" />
                <stop offset="100%" stopColor="hsl(8, 60%, 55%)" />
              </linearGradient>
              <linearGradient id="person-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(25, 20%, 75%)" />
                <stop offset="100%" stopColor="hsl(25, 20%, 62%)" />
              </linearGradient>
              <filter id="dshadow">
                <feDropShadow dx="1" dy="2" stdDeviation="3" floodOpacity="0.1" />
              </filter>
            </defs>

            {/* ========== PHASE 1: Databases (Left) ========== */}
            {/* Database 3 (top-right, 研發資料庫) */}
            <g filter="url(#dshadow)">
              <ellipse cx="195" cy="70" rx="38" ry="12" fill="url(#db-top)" />
              <rect x="157" y="70" width="76" height="55" fill="url(#db-grad)" />
              <ellipse cx="195" cy="125" rx="38" ry="12" fill="hsl(25, 30%, 55%)" />
              {/* stripes */}
              <line x1="161" y1="85" x2="229" y2="85" stroke="hsl(25, 25%, 65%)" strokeWidth="1" opacity="0.5" />
              <line x1="161" y1="100" x2="229" y2="100" stroke="hsl(25, 25%, 65%)" strokeWidth="1" opacity="0.5" />
              <line x1="161" y1="115" x2="229" y2="115" stroke="hsl(25, 25%, 65%)" strokeWidth="1" opacity="0.5" />
            </g>
            <text x="195" y="155" textAnchor="middle" fontSize="12" fontWeight="600" fill="hsl(25, 25%, 40%)" fontFamily="system-ui, sans-serif">研發資料庫</text>

            {/* Database 2 (middle, 財務資料庫) */}
            <g filter="url(#dshadow)">
              <ellipse cx="115" cy="115" rx="38" ry="12" fill="url(#db-top)" />
              <rect x="77" y="115" width="76" height="55" fill="url(#db-grad)" />
              <ellipse cx="115" cy="170" rx="38" ry="12" fill="hsl(25, 30%, 55%)" />
              <line x1="81" y1="130" x2="149" y2="130" stroke="hsl(25, 25%, 65%)" strokeWidth="1" opacity="0.5" />
              <line x1="81" y1="145" x2="149" y2="145" stroke="hsl(25, 25%, 65%)" strokeWidth="1" opacity="0.5" />
              <line x1="81" y1="160" x2="149" y2="160" stroke="hsl(25, 25%, 65%)" strokeWidth="1" opacity="0.5" />
            </g>
            <text x="115" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="hsl(25, 25%, 40%)" fontFamily="system-ui, sans-serif">財務資料庫</text>

            {/* Database 1 (bottom-left, 人資資料庫) */}
            <g filter="url(#dshadow)">
              <ellipse cx="55" cy="170" rx="38" ry="12" fill="url(#db-top)" />
              <rect x="17" y="170" width="76" height="55" fill="url(#db-grad)" />
              <ellipse cx="55" cy="225" rx="38" ry="12" fill="hsl(25, 30%, 55%)" />
              <line x1="21" y1="185" x2="89" y2="185" stroke="hsl(25, 25%, 65%)" strokeWidth="1" opacity="0.5" />
              <line x1="21" y1="200" x2="89" y2="200" stroke="hsl(25, 25%, 65%)" strokeWidth="1" opacity="0.5" />
              <line x1="21" y1="215" x2="89" y2="215" stroke="hsl(25, 25%, 65%)" strokeWidth="1" opacity="0.5" />
            </g>
            <text x="55" y="255" textAnchor="middle" fontSize="12" fontWeight="600" fill="hsl(25, 25%, 40%)" fontFamily="system-ui, sans-serif">人資資料庫</text>

            {/* ========== Pipes (DB → Cube) ========== */}
            <path d="M233 95 C290 95, 320 175, 380 175" stroke="url(#pipe-grad)" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M153 140 C250 140, 300 175, 380 175" stroke="url(#pipe-grad)" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M93 200 C200 200, 300 185, 380 185" stroke="url(#pipe-grad)" strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* Animated dots on pipes */}
            <circle r="4" fill="hsl(8, 70%, 65%)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M233 95 C290 95, 320 175, 380 175" />
            </circle>
            <circle r="4" fill="hsl(8, 70%, 65%)">
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M153 140 C250 140, 300 175, 380 175" />
            </circle>
            <circle r="4" fill="hsl(8, 70%, 65%)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M93 200 C200 200, 300 185, 380 185" />
            </circle>

            {/* ========== PHASE 2: Processing Cube (Center) ========== */}
            <g filter="url(#dshadow)">
              {/* Cube - left face */}
              <polygon points="400,120 480,80 480,260 400,300" fill="url(#cube-grad)" />
              {/* Cube - right face */}
              <polygon points="480,80 560,120 560,300 480,260" fill="hsl(220, 15%, 58%)" />
              {/* Cube - top face */}
              <polygon points="400,120 480,80 560,120 480,160" fill="url(#cube-top)" />
              {/* Grid lines on left face */}
              <line x1="420" y1="130" x2="420" y2="290" stroke="hsl(220, 15%, 60%)" strokeWidth="0.5" opacity="0.4" />
              <line x1="440" y1="125" x2="440" y2="280" stroke="hsl(220, 15%, 60%)" strokeWidth="0.5" opacity="0.4" />
              <line x1="460" y1="120" x2="460" y2="270" stroke="hsl(220, 15%, 60%)" strokeWidth="0.5" opacity="0.4" />
              <line x1="405" y1="160" x2="478" y2="125" stroke="hsl(220, 15%, 60%)" strokeWidth="0.5" opacity="0.4" />
              <line x1="405" y1="200" x2="478" y2="165" stroke="hsl(220, 15%, 60%)" strokeWidth="0.5" opacity="0.4" />
              <line x1="405" y1="240" x2="478" y2="205" stroke="hsl(220, 15%, 60%)" strokeWidth="0.5" opacity="0.4" />
              {/* Grid on right face */}
              <line x1="500" y1="125" x2="500" y2="290" stroke="hsl(220, 12%, 55%)" strokeWidth="0.5" opacity="0.4" />
              <line x1="520" y1="120" x2="520" y2="280" stroke="hsl(220, 12%, 55%)" strokeWidth="0.5" opacity="0.4" />
              <line x1="540" y1="125" x2="540" y2="290" stroke="hsl(220, 12%, 55%)" strokeWidth="0.5" opacity="0.4" />
            </g>

            {/* Gear icon on cube */}
            <g transform="translate(480, 190)">
              <circle r="25" fill="none" stroke="hsl(220, 15%, 45%)" strokeWidth="2" opacity="0.6" />
              <circle r="10" fill="none" stroke="hsl(220, 15%, 45%)" strokeWidth="2" opacity="0.6" />
              {/* gear teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = Math.cos(rad) * 22;
                const y1 = Math.sin(rad) * 22;
                const x2 = Math.cos(rad) * 30;
                const y2 = Math.sin(rad) * 30;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(220, 15%, 45%)" strokeWidth="4" strokeLinecap="round" opacity="0.6" />;
              })}
              {/* Rotating animation */}
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="indefinite" additive="sum" />
            </g>

            {/* ========== Pipes (Cube → People) ========== */}
            <path d="M560 150 C620 150, 660 110, 720 100" stroke="url(#arrow-grad)" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M560 190 C620 190, 660 170, 720 165" stroke="url(#arrow-grad)" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M560 230 C620 230, 660 230, 720 230" stroke="url(#arrow-grad)" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M560 260 C620 260, 660 280, 720 295" stroke="url(#arrow-grad)" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Arrowheads */}
            <polygon points="720,95 732,100 720,105" fill="hsl(8, 55%, 52%)" />
            <polygon points="720,160 732,165 720,170" fill="hsl(8, 55%, 52%)" />
            <polygon points="720,225 732,230 720,235" fill="hsl(8, 55%, 52%)" />
            <polygon points="720,290 732,295 720,300" fill="hsl(8, 55%, 52%)" />
            {/* Animated dots */}
            <circle r="3" fill="hsl(8, 70%, 65%)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M560 150 C620 150, 660 110, 720 100" />
            </circle>
            <circle r="3" fill="hsl(8, 70%, 65%)">
              <animateMotion dur="2.3s" repeatCount="indefinite" path="M560 190 C620 190, 660 170, 720 165" />
            </circle>
            <circle r="3" fill="hsl(8, 70%, 65%)">
              <animateMotion dur="2.6s" repeatCount="indefinite" path="M560 230 C620 230, 660 230, 720 230" />
            </circle>
            <circle r="3" fill="hsl(8, 70%, 65%)">
              <animateMotion dur="2.9s" repeatCount="indefinite" path="M560 260 C620 260, 660 280, 720 295" />
            </circle>

            {/* ========== PHASE 3: People (Right) ========== */}
            {[
              { x: 755, y: 80, label: '決策主管' },
              { x: 755, y: 145, label: '部門經理' },
              { x: 755, y: 210, label: '執行團隊' },
              { x: 755, y: 275, label: '追蹤系統' },
            ].map((p, i) => (
              <g key={i} filter="url(#dshadow)">
                {/* Desk/platform */}
                <polygon
                  points={`${p.x - 24},${p.y + 25} ${p.x},${p.y + 15} ${p.x + 50},${p.y + 25} ${p.x + 26},${p.y + 35}`}
                  fill="url(#person-grad)"
                />
                {/* Person - body */}
                <rect x={p.x - 2} y={p.y - 8} width="30" height="22" rx="3" fill="hsl(25, 20%, 68%)" />
                {/* Person - head */}
                <circle cx={p.x + 13} cy={p.y - 16} r="9" fill="hsl(25, 25%, 72%)" />
                {/* Label */}
                <text x={p.x + 13} y={p.y + 52} textAnchor="middle" fontSize="11" fontWeight="600" fill="hsl(25, 25%, 40%)" fontFamily="system-ui, sans-serif">{p.label}</text>
              </g>
            ))}

            {/* ========== Phase Labels ========== */}
            <g fontFamily="system-ui, sans-serif">
              {/* Phase 1 */}
              <text x="130" y="310" textAnchor="middle" fontSize="18" fontWeight="800" fill="hsl(25, 30%, 35%)">1. 擷取 (Grasp)</text>
              <text x="130" y="332" textAnchor="middle" fontSize="12" fontWeight="500" fill="hsl(25, 20%, 50%)">安全穿梭於人資、財務與</text>
              <text x="130" y="350" textAnchor="middle" fontSize="12" fontWeight="500" fill="hsl(25, 20%, 50%)">研發的隔離資料庫。</text>

              {/* Phase 2 */}
              <text x="480" y="335" textAnchor="middle" fontSize="18" fontWeight="800" fill="hsl(220, 20%, 35%)">2. 融合 (Synthesize)</text>
              <text x="480" y="357" textAnchor="middle" fontSize="12" fontWeight="500" fill="hsl(220, 15%, 50%)">自動清理並無縫整合異質</text>
              <text x="480" y="375" textAnchor="middle" fontSize="12" fontWeight="500" fill="hsl(220, 15%, 50%)">企業數據。</text>

              {/* Phase 3 */}
              <text x="790" y="335" textAnchor="middle" fontSize="18" fontWeight="800" fill="hsl(8, 30%, 35%)">3. 輸出 (Act)</text>
              <text x="790" y="357" textAnchor="middle" fontSize="12" fontWeight="500" fill="hsl(8, 20%, 50%)">自主生成戰略決策報告，</text>
              <text x="790" y="375" textAnchor="middle" fontSize="12" fontWeight="500" fill="hsl(8, 20%, 50%)">並自動分派後續追蹤任務。</text>
            </g>

            {/* ========== Bottom Tagline ========== */}
            <g>
              <rect x="160" y="410" width="640" height="46" rx="23" fill="hsl(25, 15%, 94%)" stroke="hsl(25, 20%, 82%)" strokeWidth="1.5" />
              <text x="480" y="439" textAnchor="middle" fontSize="14" fontWeight="700" fill="hsl(25, 30%, 32%)" fontFamily="system-ui, sans-serif">
                價值主張：完美解決大型企業「資訊孤島」與「合規安全」痛點。
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
