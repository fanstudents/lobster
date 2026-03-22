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
          <svg viewBox="0 0 1000 560" className={styles.svg} xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Gradients */}
              <linearGradient id="dbBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c9956a" />
                <stop offset="100%" stopColor="#a07350" />
              </linearGradient>
              <linearGradient id="dbTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ddb68a" />
                <stop offset="100%" stopColor="#c9a070" />
              </linearGradient>
              <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7a8aa8" />
                <stop offset="100%" stopColor="#5d6d8a" />
              </linearGradient>
              <linearGradient id="cubeRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6a7998" />
                <stop offset="100%" stopColor="#4e5e78" />
              </linearGradient>
              <linearGradient id="cubeTopFace" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9aabc5" />
                <stop offset="100%" stopColor="#7a8fb0" />
              </linearGradient>
              <linearGradient id="pipeG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d45a3a" />
                <stop offset="50%" stopColor="#e06848" />
                <stop offset="100%" stopColor="#c94a2a" />
              </linearGradient>
              <linearGradient id="outPipe" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c94a2a" />
                <stop offset="100%" stopColor="#d45a3a" />
              </linearGradient>
              <radialGradient id="glowRed" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff6b4a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff6b4a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glowBlue" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6a9fff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#6a9fff" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="bigGlow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="shadow3d">
                <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#2a1a10" floodOpacity="0.2" />
              </filter>
            </defs>

            {/* ===== BACKGROUND GLOW ===== */}
            <ellipse cx="500" cy="250" rx="420" ry="200" fill="url(#glowBlue)" opacity="0.15" />

            {/* ===== PHASE 1: DATABASES ===== */}
            {[
              { x: 60, y: 160, label: '人資資料庫' },
              { x: 130, y: 100, label: '財務資料庫' },
              { x: 210, y: 50, label: '研發資料庫' },
            ].map((db, i) => (
              <g key={i} filter="url(#shadow3d)">
                {/* Cylinder body */}
                <rect x={db.x} y={db.y + 14} width="90" height="68" rx="2" fill="url(#dbBody)" />
                {/* Top ellipse */}
                <ellipse cx={db.x + 45} cy={db.y + 14} rx="45" ry="14" fill="url(#dbTop)" />
                {/* Bottom ellipse */}
                <ellipse cx={db.x + 45} cy={db.y + 82} rx="45" ry="14" fill="#8a6540" />
                {/* Stripes */}
                <line x1={db.x + 4} y1={db.y + 32} x2={db.x + 86} y2={db.y + 32} stroke="#b88a60" strokeWidth="1" opacity="0.5" />
                <line x1={db.x + 4} y1={db.y + 50} x2={db.x + 86} y2={db.y + 50} stroke="#b88a60" strokeWidth="1" opacity="0.5" />
                <line x1={db.x + 4} y1={db.y + 68} x2={db.x + 86} y2={db.y + 68} stroke="#b88a60" strokeWidth="1" opacity="0.5" />
                {/* Highlight */}
                <ellipse cx={db.x + 45} cy={db.y + 14} rx="35" ry="8" fill="white" opacity="0.08" />
                {/* Label */}
                <text x={db.x + 45} y={db.y + 112} textAnchor="middle" fontSize="13" fontWeight="700" fill="#6b4d35" fontFamily="system-ui, sans-serif">{db.label}</text>
              </g>
            ))}

            {/* ===== PIPES (DB → CUBE) ===== */}
            {[
              { path: 'M150 205 C260 205, 310 230, 380 230', delay: '0s' },
              { path: 'M220 148 C300 148, 340 220, 380 220', delay: '0.4s' },
              { path: 'M300 100 C360 100, 370 210, 390 210', delay: '0.8s' },
            ].map((pipe, i) => (
              <g key={i}>
                {/* Pipe shadow */}
                <path d={pipe.path} stroke="#2a1a10" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.08" transform="translate(2,3)" />
                {/* Pipe body */}
                <path d={pipe.path} stroke="url(#pipeG)" strokeWidth="12" fill="none" strokeLinecap="round" />
                {/* Pipe highlight */}
                <path d={pipe.path} stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.15" transform="translate(0,-3)" />
                {/* Animated pulse */}
                <circle r="6" fill="#ff8a60" filter="url(#glow)">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path={pipe.path} begin={pipe.delay} />
                </circle>
                <circle r="3" fill="white" opacity="0.9">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path={pipe.path} begin={pipe.delay} />
                </circle>
              </g>
            ))}

            {/* ===== PHASE 2: PROCESSING CUBE ===== */}
            <g filter="url(#shadow3d)">
              {/* Cube faces */}
              <polygon points="420,100 520,50 520,310 420,360" fill="url(#cubeLeft)" />
              <polygon points="520,50 620,100 620,360 520,310" fill="url(#cubeRight)" />
              <polygon points="420,100 520,50 620,100 520,150" fill="url(#cubeTopFace)" />
              
              {/* Grid lines - left */}
              {[140, 180, 220, 260, 300, 340].map((y, i) => (
                <line key={`gl${i}`} x1="425" y1={y} x2="518" y2={y - 40} stroke="#8a9ab5" strokeWidth="0.6" opacity="0.25" />
              ))}
              {[450, 480].map((x, i) => (
                <line key={`gv${i}`} x1={x} y1={110 + (x - 420) * 0.5} x2={x} y2={350 - (520 - x) * 0.1} stroke="#8a9ab5" strokeWidth="0.6" opacity="0.25" />
              ))}
              {/* Grid lines - right */}
              {[140, 180, 220, 260, 300, 340].map((y, i) => (
                <line key={`gr${i}`} x1="522" y1={y - 40} x2="618" y2={y} stroke="#7080a0" strokeWidth="0.6" opacity="0.25" />
              ))}
              {[560, 590].map((x, i) => (
                <line key={`grv${i}`} x1={x} y1={100 + (x - 520) * 0.5} x2={x} y2={350 - (620 - x) * 0.1} stroke="#7080a0" strokeWidth="0.6" opacity="0.25" />
              ))}

              {/* Edge highlights */}
              <line x1="420" y1="100" x2="520" y2="50" stroke="white" strokeWidth="1" opacity="0.2" />
              <line x1="520" y1="50" x2="620" y2="100" stroke="white" strokeWidth="1" opacity="0.15" />
            </g>

            {/* Glow behind gear */}
            <ellipse cx="520" cy="220" rx="60" ry="60" fill="url(#glowRed)" opacity="0.3" />

            {/* Rotating gear */}
            <g transform="translate(520, 220)">
              <circle r="35" fill="none" stroke="#e8d5c0" strokeWidth="3" opacity="0.6" />
              <circle r="14" fill="none" stroke="#e8d5c0" strokeWidth="3" opacity="0.6" />
              <circle r="6" fill="#e8d5c0" opacity="0.4" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x1g = Math.cos(rad) * 30;
                const y1g = Math.sin(rad) * 30;
                const x2g = Math.cos(rad) * 42;
                const y2g = Math.sin(rad) * 42;
                return <line key={i} x1={x1g} y1={y1g} x2={x2g} y2={y2g} stroke="#e8d5c0" strokeWidth="6" strokeLinecap="round" opacity="0.5" />;
              })}
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="15s" repeatCount="indefinite" additive="sum" />
            </g>

            {/* Small 2nd gear */}
            <g transform="translate(555, 260)">
              <circle r="18" fill="none" stroke="#c5b5a0" strokeWidth="2" opacity="0.5" />
              <circle r="7" fill="none" stroke="#c5b5a0" strokeWidth="2" opacity="0.5" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                return <line key={i} x1={Math.cos(rad) * 15} y1={Math.sin(rad) * 15} x2={Math.cos(rad) * 22} y2={Math.sin(rad) * 22} stroke="#c5b5a0" strokeWidth="4" strokeLinecap="round" opacity="0.4" />;
              })}
              <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="10s" repeatCount="indefinite" additive="sum" />
            </g>

            {/* ===== PIPES (CUBE → PEOPLE) ===== */}
            {[
              { path: 'M620 140 C680 135, 720 95, 770 90', y: 90 },
              { path: 'M620 190 C680 185, 720 170, 770 165', y: 165 },
              { path: 'M620 240 C680 240, 720 240, 770 240', y: 240 },
              { path: 'M620 290 C680 295, 720 310, 770 315', y: 315 },
            ].map((pipe, i) => (
              <g key={i}>
                <path d={pipe.path} stroke="#2a1a10" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.06" transform="translate(2,3)" />
                <path d={pipe.path} stroke="url(#outPipe)" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d={pipe.path} stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.15" transform="translate(0,-2)" />
                {/* Arrowhead */}
                <polygon points={`770,${pipe.y - 7} 786,${pipe.y} 770,${pipe.y + 7}`} fill="#d45a3a" />
                {/* Pulse */}
                <circle r="5" fill="#ff8a60" filter="url(#glow)">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path={pipe.path} begin={`${i * 0.3}s`} />
                </circle>
                <circle r="2.5" fill="white" opacity="0.9">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path={pipe.path} begin={`${i * 0.3}s`} />
                </circle>
              </g>
            ))}

            {/* ===== PHASE 3: PEOPLE ===== */}
            {[
              { x: 800, y: 65, label: '決策主管' },
              { x: 800, y: 140, label: '部門經理' },
              { x: 800, y: 215, label: '執行團隊' },
              { x: 800, y: 290, label: '追蹤系統' },
            ].map((p, i) => (
              <g key={i} filter="url(#shadow3d)">
                {/* Platform */}
                <polygon points={`${p.x - 10},${p.y + 38} ${p.x + 25},${p.y + 26} ${p.x + 70},${p.y + 38} ${p.x + 35},${p.y + 50}`} fill="#c5b5a0" />
                <polygon points={`${p.x - 10},${p.y + 38} ${p.x - 10},${p.y + 46} ${p.x + 35},${p.y + 58} ${p.x + 35},${p.y + 50}`} fill="#a89880" />
                <polygon points={`${p.x + 70},${p.y + 38} ${p.x + 70},${p.y + 46} ${p.x + 35},${p.y + 58} ${p.x + 35},${p.y + 50}`} fill="#b5a590" />
                {/* Body */}
                <rect x={p.x + 10} y={p.y + 2} width="40" height="28" rx="4" fill="#b8a898" />
                <rect x={p.x + 14} y={p.y + 6} width="32" height="20" rx="3" fill="#c8baa8" opacity="0.5" />
                {/* Head */}
                <circle cx={p.x + 30} cy={p.y - 10} r="12" fill="#d0c0a8" />
                <circle cx={p.x + 30} cy={p.y - 10} r="9" fill="#ddd0b8" opacity="0.4" />
                {/* Label */}
                <text x={p.x + 30} y={p.y + 72} textAnchor="middle" fontSize="13" fontWeight="700" fill="#6b5535" fontFamily="system-ui, sans-serif">{p.label}</text>
              </g>
            ))}

            {/* ===== PHASE LABELS ===== */}
            <g fontFamily="system-ui, sans-serif">
              <text x="170" y="320" textAnchor="middle" fontSize="22" fontWeight="900" fill="#5a3a20">1. 擷取</text>
              <text x="170" y="344" textAnchor="middle" fontSize="14" fontWeight="700" fill="#8a7060" letterSpacing="2">(Grasp)</text>
              <text x="170" y="370" textAnchor="middle" fontSize="12" fontWeight="500" fill="#9a8a78">安全穿梭於人資、財務與</text>
              <text x="170" y="390" textAnchor="middle" fontSize="12" fontWeight="500" fill="#9a8a78">研發的隔離資料庫。</text>

              <text x="520" y="400" textAnchor="middle" fontSize="22" fontWeight="900" fill="#3a4a60">2. 融合</text>
              <text x="520" y="424" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6a7a90" letterSpacing="2">(Synthesize)</text>
              <text x="520" y="450" textAnchor="middle" fontSize="12" fontWeight="500" fill="#7a8a98">自動清理並無縫整合異質</text>
              <text x="520" y="470" textAnchor="middle" fontSize="12" fontWeight="500" fill="#7a8a98">企業數據。</text>

              <text x="830" y="390" textAnchor="middle" fontSize="22" fontWeight="900" fill="#6a3a25">3. 輸出</text>
              <text x="830" y="414" textAnchor="middle" fontSize="14" fontWeight="700" fill="#9a6a50" letterSpacing="2">(Act)</text>
              <text x="830" y="440" textAnchor="middle" fontSize="12" fontWeight="500" fill="#9a8070">自主生成戰略決策報告，</text>
              <text x="830" y="460" textAnchor="middle" fontSize="12" fontWeight="500" fill="#9a8070">並自動分派後續追蹤任務。</text>
            </g>

            {/* ===== BOTTOM TAGLINE ===== */}
            <g>
              <rect x="180" y="495" width="640" height="50" rx="25" fill="#f5ede5" stroke="#d5c5b0" strokeWidth="2" />
              <text x="500" y="526" textAnchor="middle" fontSize="15" fontWeight="800" fill="#4a3020" fontFamily="system-ui, sans-serif">
                價值主張：完美解決大型企業「資訊孤島」與「合規安全」痛點。
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
