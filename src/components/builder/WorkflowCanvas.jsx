'use client';

import DiagramDefs from './svg/DiagramDefs';
import DatabaseNode from './svg/DatabaseNode';
import ProcessingCube from './svg/ProcessingCube';
import OutputPerson from './svg/OutputPerson';
import FlowPipe from './svg/FlowPipe';

const DB_HUES = [25, 15, 35, 8, 45];

export default function WorkflowCanvas({ data }) {
  const { sources = [], tasks = [], outputs = [], title = '', subtitle = '' } = data;

  // Guard
  if (sources.length === 0 && outputs.length === 0) return null;

  // Layout calculations
  const maxNodes = Math.max(sources.length, outputs.length, 1);
  const nodeSpacing = 90;
  const topPadding = 80;
  const svgH = topPadding + maxNodes * nodeSpacing + 200;
  const svgW = 1200;

  // Database positions (left)
  const dbX = 50;
  const dbPositions = sources.map((_, i) => ({
    x: dbX + i * 15,
    y: topPadding + i * nodeSpacing,
    cx: dbX + i * 15 + 80, // right edge for pipe start
    cy: topPadding + i * nodeSpacing + 45, // center y
  }));

  // Cube position (center)
  const cubeX = svgW / 2;
  const cubeTop = topPadding;
  const cubeH = Math.max(250, maxNodes * nodeSpacing);

  // Output positions (right)
  const outX = 920;
  const outPositions = outputs.map((_, i) => ({
    x: outX,
    y: topPadding + i * nodeSpacing + 10,
    cx: outX, // left edge for pipe end
    cy: topPadding + i * nodeSpacing + 25, // center y
  }));

  // Pipe paths
  const cubeLX = cubeX - 80; // left face of cube
  const cubeRX = cubeX + 80; // right face of cube

  const inPipes = dbPositions.map((db, i) => {
    const cubeEntryY = cubeTop + 60 + (i / Math.max(sources.length - 1, 1)) * (cubeH - 120);
    return {
      path: `M${db.cx} ${db.cy} C${db.cx + 100} ${db.cy}, ${cubeLX - 100} ${cubeEntryY}, ${cubeLX} ${cubeEntryY}`,
      delay: `${i * 0.5}s`,
    };
  });

  const outPipes = outPositions.map((out, i) => {
    const cubeExitY = cubeTop + 60 + (i / Math.max(outputs.length - 1, 1)) * (cubeH - 120);
    return {
      path: `M${cubeRX} ${cubeExitY} C${cubeRX + 100} ${cubeExitY}, ${out.cx - 100} ${out.cy}, ${out.cx} ${out.cy}`,
      delay: `${i * 0.35}s`,
      arrowY: out.cy,
    };
  });

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', maxWidth: 1200, minWidth: 700, height: 'auto', display: 'block', margin: '0 auto' }}>
        <DiagramDefs />

        {/* Background glow */}
        <ellipse cx={svgW / 2} cy={svgH * 0.4} rx="420" ry="180" fill="url(#bld-glowBlue)" opacity="0.1" />

        {/* Title */}
        {title && (
          <text x={svgW / 2} y="30" textAnchor="middle" fontSize="20" fontWeight="900" fill="#3a3a3a" fontFamily="system-ui, sans-serif">
            🦞 {title}
          </text>
        )}
        {subtitle && (
          <text x={svgW / 2} y="55" textAnchor="middle" fontSize="13" fontWeight="500" fill="#8a8a8a" fontFamily="system-ui, sans-serif">
            {subtitle}
          </text>
        )}

        {/* Input pipes */}
        {inPipes.map((pipe, i) => (
          <FlowPipe key={`in-${i}`} path={pipe.path} delay={pipe.delay} direction="right" />
        ))}

        {/* Output pipes + arrowheads */}
        {outPipes.map((pipe, i) => (
          <g key={`out-${i}`}>
            <FlowPipe path={pipe.path} delay={pipe.delay} direction="left" strokeWidth={7} />
            <polygon
              points={`${outX - 5},${pipe.arrowY - 6} ${outX + 9},${pipe.arrowY} ${outX - 5},${pipe.arrowY + 6}`}
              fill="#d45a3a"
            />
          </g>
        ))}

        {/* Databases */}
        {dbPositions.map((pos, i) => (
          <DatabaseNode key={i} x={pos.x} y={pos.y} label={sources[i]} hue={DB_HUES[i % DB_HUES.length]} />
        ))}

        {/* Processing Cube */}
        <ProcessingCube x={cubeX} y={cubeTop} height={cubeH} tasks={tasks} />

        {/* Output People */}
        {outPositions.map((pos, i) => (
          <OutputPerson key={i} x={pos.x} y={pos.y} label={outputs[i]} />
        ))}

        {/* Phase labels */}
        <g fontFamily="system-ui, sans-serif">
          <text x={dbX + 50} y={svgH - 80} textAnchor="middle" fontSize="18" fontWeight="900" fill="#5a3a20">擷取 Grasp</text>
          <text x={dbX + 50} y={svgH - 58} textAnchor="middle" fontSize="11" fill="#9a8a78">安全連接各資料來源</text>

          <text x={cubeX} y={svgH - 80} textAnchor="middle" fontSize="18" fontWeight="900" fill="#3a4a60">融合 Synthesize</text>
          <text x={cubeX} y={svgH - 58} textAnchor="middle" fontSize="11" fill="#7a8a98">自動整合處理數據</text>

          <text x={outX + 35} y={svgH - 80} textAnchor="middle" fontSize="18" fontWeight="900" fill="#6a3a25">輸出 Act</text>
          <text x={outX + 35} y={svgH - 58} textAnchor="middle" fontSize="11" fill="#9a8070">分派任務與報告</text>
        </g>

        {/* Tagline */}
        <rect x={svgW * 0.18} y={svgH - 42} width={svgW * 0.64} height="34" rx="17" fill="#f5ede5" stroke="#d5c5b0" strokeWidth="1.5" />
        <text x={svgW / 2} y={svgH - 20} textAnchor="middle" fontSize="13" fontWeight="700" fill="#4a3020" fontFamily="system-ui, sans-serif">
          你的龍蝦工作流，從這裡開始。
        </text>
      </svg>
    </div>
  );
}
