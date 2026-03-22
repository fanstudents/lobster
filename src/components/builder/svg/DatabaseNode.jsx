export default function DatabaseNode({ x, y, label, hue = 25 }) {
  const bodyColor = `hsl(${hue}, 40%, 55%)`;
  const topColor = `hsl(${hue}, 40%, 68%)`;
  const bottomColor = `hsl(${hue}, 40%, 42%)`;
  const stripeColor = `hsl(${hue}, 35%, 60%)`;
  const textColor = `hsl(${hue}, 35%, 30%)`;

  return (
    <g filter="url(#bld-shadow)">
      <rect x={x} y={y + 14} width="80" height="60" rx="2" fill={bodyColor} />
      <ellipse cx={x + 40} cy={y + 14} rx="40" ry="13" fill={topColor} />
      <ellipse cx={x + 40} cy={y + 74} rx="40" ry="13" fill={bottomColor} />
      <line x1={x + 4} y1={y + 30} x2={x + 76} y2={y + 30} stroke={stripeColor} strokeWidth="1" opacity="0.4" />
      <line x1={x + 4} y1={y + 46} x2={x + 76} y2={y + 46} stroke={stripeColor} strokeWidth="1" opacity="0.4" />
      <line x1={x + 4} y1={y + 62} x2={x + 76} y2={y + 62} stroke={stripeColor} strokeWidth="1" opacity="0.4" />
      <ellipse cx={x + 40} cy={y + 14} rx="30" ry="7" fill="white" opacity="0.07" />
      <text
        x={x + 40}
        y={y + 102}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={textColor}
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}
