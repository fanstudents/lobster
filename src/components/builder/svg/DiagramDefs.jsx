export default function DiagramDefs() {
  return (
    <defs>
      {/* Database gradients */}
      <linearGradient id="bld-dbBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#c9956a" />
        <stop offset="100%" stopColor="#a07350" />
      </linearGradient>
      <linearGradient id="bld-dbTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ddb68a" />
        <stop offset="100%" stopColor="#c9a070" />
      </linearGradient>

      {/* Cube gradients */}
      <linearGradient id="bld-cubeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7a8aa8" />
        <stop offset="100%" stopColor="#5d6d8a" />
      </linearGradient>
      <linearGradient id="bld-cubeRight" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6a7998" />
        <stop offset="100%" stopColor="#4e5e78" />
      </linearGradient>
      <linearGradient id="bld-cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9aabc5" />
        <stop offset="100%" stopColor="#7a8fb0" />
      </linearGradient>

      {/* Pipe gradients */}
      <linearGradient id="bld-pipeIn" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d45a3a" />
        <stop offset="50%" stopColor="#e06848" />
        <stop offset="100%" stopColor="#c94a2a" />
      </linearGradient>
      <linearGradient id="bld-pipeOut" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#c94a2a" />
        <stop offset="100%" stopColor="#d45a3a" />
      </linearGradient>

      {/* Glow effects */}
      <radialGradient id="bld-glowRed" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff6b4a" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ff6b4a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="bld-glowBlue" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#6a9fff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#6a9fff" stopOpacity="0" />
      </radialGradient>

      {/* Filters */}
      <filter id="bld-glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="bld-shadow">
        <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="#2a1a10" floodOpacity="0.15" />
      </filter>
    </defs>
  );
}
