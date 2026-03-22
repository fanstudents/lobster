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
          <svg viewBox="0 0 1200 520" className={styles.svg} xmlns="http://www.w3.org/2000/svg">
            <defs>
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
                <stop offset="0%" stopColor="#ff6b4a" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff6b4a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glowBlue" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6a9fff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6a9fff" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="shadow3d">
                <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="#2a1a10" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* Background glow */}
            <ellipse cx="600" cy="220" rx="500" ry="200" fill="url(#glowBlue)" opacity="0.1" />

            {/* ===== PHASE 1: DATABASES (x: 40–280) ===== */}
            {[
              { x: 40, y: 140, label: '人資資料庫' },
              { x: 120, y: 85, label: '財務資料庫' },
              { x: 210, y: 35, label: '研發資料庫' },
            ].map((db, i) => (
              <g key={i} filter="url(#shadow3d)">
                <rect x={db.x} y={db.y + 14} width="80" height="60" rx="2" fill="url(#dbBody)" />
                <ellipse cx={db.x + 40} cy={db.y + 14} rx="40" ry="13" fill="url(#dbTop)" />
                <ellipse cx={db.x + 40} cy={db.y + 74} rx="40" ry="13" fill="#8a6540" />
                <line x1={db.x + 4} y1={db.y + 30} x2={db.x + 76} y2={db.y + 30} stroke="#b88a60" strokeWidth="1" opacity="0.4" />
                <line x1={db.x + 4} y1={db.y + 46} x2={db.x + 76} y2={db.y + 46} stroke="#b88a60" strokeWidth="1" opacity="0.4" />
                <line x1={db.x + 4} y1={db.y + 62} x2={db.x + 76} y2={db.y + 62} stroke="#b88a60" strokeWidth="1" opacity="0.4" />
                <ellipse cx={db.x + 40} cy={db.y + 14} rx="30" ry="7" fill="white" opacity="0.07" />
                <text x={db.x + 40} y={db.y + 102} textAnchor="middle" fontSize="12" fontWeight="700" fill="#6b4d35" fontFamily="system-ui, sans-serif">{db.label}</text>
              </g>
            ))}

            {/* ===== PIPES DB → CUBE ===== */}
            {[
              { path: 'M120 190 C250 190, 380 210, 470 210', delay: '0s' },
              { path: 'M200 130 C300 130, 400 200, 470 200', delay: '0.5s' },
              { path: 'M290 80 C360 80, 430 190, 470 190', delay: '1s' },
            ].map((pipe, i) => (
              <g key={i}>
                <path d={pipe.path} stroke="#2a1a10" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.06" transform="translate(2,3)" />
                <path d={pipe.path} stroke="url(#pipeG)" strokeWidth="10" fill="none" strokeLinecap="round" />
                <path d={pipe.path} stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.15" transform="translate(0,-3)" />
                <circle r="5" fill="#ff8a60" filter="url(#glow)">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path={pipe.path} begin={pipe.delay} />
                </circle>
                <circle r="2.5" fill="white" opacity="0.9">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path={pipe.path} begin={pipe.delay} />
                </circle>
              </g>
            ))}

            {/* ===== PHASE 2: CUBE (center: 480–680) ===== */}
            <g filter="url(#shadow3d)">
              <polygon points="490,90 580,45 580,295 490,340" fill="url(#cubeLeft)" />
              <polygon points="580,45 670,90 670,340 580,295" fill="url(#cubeRight)" />
              <polygon points="490,90 580,45 670,90 580,135" fill="url(#cubeTopFace)" />
              {/* Grid left */}
              {[130, 170, 210, 250, 290].map((y, i) => (
                <line key={`gl${i}`} x1="495" y1={y} x2="578" y2={y - 38} stroke="#8a9ab5" strokeWidth="0.5" opacity="0.2" />
              ))}
              {/* Grid right */}
              {[130, 170, 210, 250, 290].map((y, i) => (
                <line key={`gr${i}`} x1="582" y1={y - 38} x2="668" y2={y} stroke="#7080a0" strokeWidth="0.5" opacity="0.2" />
              ))}
              <line x1="490" y1="90" x2="580" y2="45" stroke="white" strokeWidth="1" opacity="0.2" />
              <line x1="580" y1="45" x2="670" y2="90" stroke="white" strokeWidth="1" opacity="0.15" />
            </g>

            {/* Gear glow */}
            <ellipse cx="580" cy="200" rx="50" ry="50" fill="url(#glowRed)" opacity="0.25" />

            {/* Main gear */}
            <g transform="translate(580, 200)">
              <circle r="30" fill="none" stroke="#e0cdb8" strokeWidth="2.5" opacity="0.6" />
              <circle r="12" fill="none" stroke="#e0cdb8" strokeWidth="2.5" opacity="0.6" />
              <circle r="5" fill="#e0cdb8" opacity="0.3" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                return <line key={i} x1={Math.cos(rad) * 26} y1={Math.sin(rad) * 26} x2={Math.cos(rad) * 36} y2={Math.sin(rad) * 36} stroke="#e0cdb8" strokeWidth="5" strokeLinecap="round" opacity="0.45" />;
              })}
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="15s" repeatCount="indefinite" additive="sum" />
            </g>

            {/* Small gear */}
            <g transform="translate(610, 235)">
              <circle r="15" fill="none" stroke="#c5b5a0" strokeWidth="2" opacity="0.4" />
              <circle r="6" fill="none" stroke="#c5b5a0" strokeWidth="2" opacity="0.4" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                return <line key={i} x1={Math.cos(rad) * 12} y1={Math.sin(rad) * 12} x2={Math.cos(rad) * 19} y2={Math.sin(rad) * 19} stroke="#c5b5a0" strokeWidth="3.5" strokeLinecap="round" opacity="0.35" />;
              })}
              <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="10s" repeatCount="indefinite" additive="sum" />
            </g>

            {/* ===== PIPES CUBE → PEOPLE ===== */}
            {[
              { path: 'M670 130 C750 125, 820 90, 890 85', y: 85 },
              { path: 'M670 180 C750 178, 830 165, 890 162', y: 162 },
              { path: 'M670 220 C750 220, 830 235, 890 238', y: 238 },
              { path: 'M670 270 C750 275, 830 308, 890 312', y: 312 },
            ].map((pipe, i) => (
              <g key={i}>
                <path d={pipe.path} stroke="#2a1a10" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.05" transform="translate(2,3)" />
                <path d={pipe.path} stroke="url(#outPipe)" strokeWidth="7" fill="none" strokeLinecap="round" />
                <path d={pipe.path} stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.12" transform="translate(0,-2)" />
                <polygon points={`890,${pipe.y - 6} 904,${pipe.y} 890,${pipe.y + 6}`} fill="#d45a3a" />
                <circle r="4" fill="#ff8a60" filter="url(#glow)">
                  <animateMotion dur="2s" repeatCount="indefinite" path={pipe.path} begin={`${i * 0.35}s`} />
                </circle>
                <circle r="2" fill="white" opacity="0.9">
                  <animateMotion dur="2s" repeatCount="indefinite" path={pipe.path} begin={`${i * 0.35}s`} />
                </circle>
              </g>
            ))}

            {/* ===== PHASE 3: PEOPLE (x: 920+) ===== */}
            {[
              { x: 930, y: 60, label: '決策主管' },
              { x: 930, y: 138, label: '部門經理' },
              { x: 930, y: 214, label: '執行團隊' },
              { x: 930, y: 290, label: '追蹤系統' },
            ].map((p, i) => (
              <g key={i} filter="url(#shadow3d)">
                <polygon points={`${p.x},${p.y + 32} ${p.x + 28},${p.y + 22} ${p.x + 65},${p.y + 32} ${p.x + 37},${p.y + 42}`} fill="#c5b5a0" />
                <polygon points={`${p.x},${p.y + 32} ${p.x},${p.y + 40} ${p.x + 37},${p.y + 50} ${p.x + 37},${p.y + 42}`} fill="#a89880" />
                <polygon points={`${p.x + 65},${p.y + 32} ${p.x + 65},${p.y + 40} ${p.x + 37},${p.y + 50} ${p.x + 37},${p.y + 42}`} fill="#b5a590" />
                <rect x={p.x + 13} y={p.y + 2} width="38" height="24" rx="4" fill="#b8a898" />
                <circle cx={p.x + 32} cy={p.y - 10} r="11" fill="#d0c0a8" />
                <circle cx={p.x + 32} cy={p.y - 10} r="8" fill="#ddd0b8" opacity="0.3" />
                <text x={p.x + 32} y={p.y + 64} textAnchor="middle" fontSize="12" fontWeight="700" fill="#6b5535" fontFamily="system-ui, sans-serif">{p.label}</text>
              </g>
            ))}

            {/* ===== PHASE LABELS ===== */}
            <g fontFamily="system-ui, sans-serif">
              <text x="160" y="290" textAnchor="middle" fontSize="22" fontWeight="900" fill="#5a3a20">1. 擷取</text>
              <text x="160" y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill="#8a7060" letterSpacing="2">(Grasp)</text>
              <text x="160" y="338" textAnchor="middle" fontSize="12" fontWeight="500" fill="#9a8a78">安全穿梭於人資、財務與</text>
              <text x="160" y="356" textAnchor="middle" fontSize="12" fontWeight="500" fill="#9a8a78">研發的隔離資料庫。</text>

              <text x="580" y="378" textAnchor="middle" fontSize="22" fontWeight="900" fill="#3a4a60">2. 融合</text>
              <text x="580" y="400" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6a7a90" letterSpacing="2">(Synthesize)</text>
              <text x="580" y="426" textAnchor="middle" fontSize="12" fontWeight="500" fill="#7a8a98">自動清理並無縫整合異質</text>
              <text x="580" y="444" textAnchor="middle" fontSize="12" fontWeight="500" fill="#7a8a98">企業數據。</text>

              <text x="962" y="378" textAnchor="middle" fontSize="22" fontWeight="900" fill="#6a3a25">3. 輸出</text>
              <text x="962" y="400" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9a6a50" letterSpacing="2">(Act)</text>
              <text x="962" y="426" textAnchor="middle" fontSize="12" fontWeight="500" fill="#9a8070">自主生成戰略決策報告，</text>
              <text x="962" y="444" textAnchor="middle" fontSize="12" fontWeight="500" fill="#9a8070">並自動分派後續追蹤任務。</text>
            </g>

            {/* ===== TAGLINE ===== */}
            <g>
              <rect x="220" y="472" width="760" height="38" rx="19" fill="#f5ede5" stroke="#d5c5b0" strokeWidth="1.5" />
              <text x="600" y="497" textAnchor="middle" fontSize="14" fontWeight="800" fill="#4a3020" fontFamily="system-ui, sans-serif">
                價值主張：完美解決大型企業「資訊孤島」與「合規安全」痛點。
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
