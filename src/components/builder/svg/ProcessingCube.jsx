export default function ProcessingCube({ x, y, height, tasks = [] }) {
  const halfW = 80;
  const topOffset = 45;

  const left = x - halfW;
  const right = x + halfW;
  const top = y;
  const bottom = y + height;

  return (
    <g>
      {/* Cube body */}
      <g filter="url(#bld-shadow)">
        <polygon points={`${left},${top + topOffset} ${x},${top} ${x},${bottom - topOffset} ${left},${bottom}`} fill="url(#bld-cubeLeft)" />
        <polygon points={`${x},${top} ${right},${top + topOffset} ${right},${bottom} ${x},${bottom - topOffset}`} fill="url(#bld-cubeRight)" />
        <polygon points={`${left},${top + topOffset} ${x},${top} ${right},${top + topOffset} ${x},${top + topOffset * 2}`} fill="url(#bld-cubeTop)" />
        {/* Edge highlights */}
        <line x1={left} y1={top + topOffset} x2={x} y2={top} stroke="white" strokeWidth="1" opacity="0.2" />
        <line x1={x} y1={top} x2={right} y2={top + topOffset} stroke="white" strokeWidth="1" opacity="0.15" />
      </g>

      {/* Gear glow */}
      <ellipse cx={x} cy={top + height * 0.45} rx="45" ry="45" fill="url(#bld-glowRed)" opacity="0.2" />

      {/* Main gear */}
      <g transform={`translate(${x}, ${top + height * 0.45})`}>
        <circle r="28" fill="none" stroke="#e0cdb8" strokeWidth="2.5" opacity="0.5" />
        <circle r="11" fill="none" stroke="#e0cdb8" strokeWidth="2.5" opacity="0.5" />
        <circle r="4" fill="#e0cdb8" opacity="0.3" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={Math.cos(rad) * 24}
              y1={Math.sin(rad) * 24}
              x2={Math.cos(rad) * 34}
              y2={Math.sin(rad) * 34}
              stroke="#e0cdb8"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.4"
            />
          );
        })}
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="15s" repeatCount="indefinite" additive="sum" />
      </g>

      {/* Small gear */}
      <g transform={`translate(${x + 28}, ${top + height * 0.55})`}>
        <circle r="14" fill="none" stroke="#c5b5a0" strokeWidth="2" opacity="0.35" />
        <circle r="5" fill="none" stroke="#c5b5a0" strokeWidth="2" opacity="0.35" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={Math.cos(rad) * 11}
              y1={Math.sin(rad) * 11}
              x2={Math.cos(rad) * 18}
              y2={Math.sin(rad) * 18}
              stroke="#c5b5a0"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.3"
            />
          );
        })}
        <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="10s" repeatCount="indefinite" additive="sum" />
      </g>

      {/* Task labels on cube face */}
      {tasks.map((task, i) => (
        <text
          key={i}
          x={x - 30}
          y={top + topOffset * 2 + 20 + i * 22}
          fontSize="11"
          fontWeight="600"
          fill="#d5c8b8"
          fontFamily="system-ui, sans-serif"
          opacity="0.7"
        >
          {task}
        </text>
      ))}
    </g>
  );
}
