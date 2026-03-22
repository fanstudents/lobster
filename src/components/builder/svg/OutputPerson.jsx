export default function OutputPerson({ x, y, label }) {
  return (
    <g filter="url(#bld-shadow)">
      {/* Platform - isometric */}
      <polygon
        points={`${x},${y + 32} ${x + 28},${y + 22} ${x + 65},${y + 32} ${x + 37},${y + 42}`}
        fill="#c5b5a0"
      />
      <polygon
        points={`${x},${y + 32} ${x},${y + 40} ${x + 37},${y + 50} ${x + 37},${y + 42}`}
        fill="#a89880"
      />
      <polygon
        points={`${x + 65},${y + 32} ${x + 65},${y + 40} ${x + 37},${y + 50} ${x + 37},${y + 42}`}
        fill="#b5a590"
      />
      {/* Body */}
      <rect x={x + 13} y={y + 2} width="38" height="24" rx="4" fill="#b8a898" />
      <rect x={x + 17} y={y + 6} width="30" height="16" rx="3" fill="#c8baa8" opacity="0.4" />
      {/* Head */}
      <circle cx={x + 32} cy={y - 10} r="11" fill="#d0c0a8" />
      <circle cx={x + 32} cy={y - 10} r="8" fill="#ddd0b8" opacity="0.3" />
      {/* Label */}
      <text
        x={x + 32}
        y={y + 64}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="#6b5535"
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}
