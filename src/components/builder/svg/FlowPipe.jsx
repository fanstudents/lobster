export default function FlowPipe({ path, delay = '0s', direction = 'right', strokeWidth = 10 }) {
  const gradId = direction === 'right' ? 'bld-pipeIn' : 'bld-pipeOut';

  return (
    <g>
      {/* Shadow */}
      <path
        d={path}
        stroke="#2a1a10"
        strokeWidth={strokeWidth + 2}
        fill="none"
        strokeLinecap="round"
        opacity="0.06"
        transform="translate(2,3)"
      />
      {/* Pipe body */}
      <path
        d={path}
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
      {/* Highlight */}
      <path
        d={path}
        stroke="white"
        strokeWidth={Math.max(1.5, strokeWidth * 0.2)}
        fill="none"
        strokeLinecap="round"
        opacity="0.14"
        transform="translate(0,-3)"
      />
      {/* Animated glow dot */}
      <circle r={strokeWidth * 0.5} fill="#ff8a60" filter="url(#bld-glow)">
        <animateMotion dur="2.2s" repeatCount="indefinite" path={path} begin={delay} />
      </circle>
      {/* Bright core dot */}
      <circle r={strokeWidth * 0.25} fill="white" opacity="0.9">
        <animateMotion dur="2.2s" repeatCount="indefinite" path={path} begin={delay} />
      </circle>
    </g>
  );
}
