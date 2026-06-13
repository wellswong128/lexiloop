import { useId } from "react";

const sizeMap = {
  sm: 36,
  md: 72,
  lg: 108,
  xl: 144,
};

function LexiMascot({ className = "", size = "md", title }) {
  const dimension = sizeMap[size] ?? sizeMap.md;
  const uid = useId().replace(/:/g, "");
  const headGradient = `lexi-head-${uid}`;
  const bookLeftGradient = `lexi-book-left-${uid}`;
  const bookRightGradient = `lexi-book-right-${uid}`;

  return (
    <svg
      aria-hidden={title ? undefined : true}
      className={["lexi-mascot", className].filter(Boolean).join(" ")}
      height={dimension}
      role={title ? "img" : undefined}
      viewBox="0 0 120 120"
      width={dimension}
    >
      {title ? <title>{title}</title> : null}

      <defs>
        <linearGradient id={headGradient} x1="20%" x2="80%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd93d" />
          <stop offset="55%" stopColor="#ff8e53" />
          <stop offset="100%" stopColor="#ff6b6b" />
        </linearGradient>
        <linearGradient id={bookLeftGradient} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id={bookRightGradient} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#6ee7d6" />
          <stop offset="100%" stopColor="#4dccbd" />
        </linearGradient>
      </defs>

      <ellipse cx="60" cy="112" fill="rgba(255, 107, 107, 0.18)" rx="34" ry="6" />

      <g className="lexi-mascot-sparkle lexi-mascot-sparkle-a">
        <path
          d="M14 24l1.6 3.2 3.5.5-2.5 2.5.7 3.5-3.2-1.7-3.2 1.7.7-3.5-2.5-2.5 3.5-.5z"
          fill="#ffd93d"
        />
      </g>
      <g className="lexi-mascot-sparkle lexi-mascot-sparkle-b">
        <path
          d="M106 30l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.2-2.4 1.2.5-2.6-1.9-1.8 2.6-.4z"
          fill="#4dccbd"
        />
      </g>
      <g className="lexi-mascot-sparkle lexi-mascot-sparkle-c">
        <path
          d="M8 82l1 2 2.2.3-1.6 1.5.4 2.2-2-.9-2 .9.4-2.2-1.6-1.5 2.2-.3z"
          fill="#fb7185"
        />
      </g>

      <g className="lexi-mascot-letter lexi-mascot-letter-a">
        <circle cx="16" cy="44" fill="#ff6b6b" r="9" />
        <text
          fill="#fff"
          fontFamily="Fredoka, Nunito, sans-serif"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
          x="16"
          y="48"
        >
          A
        </text>
      </g>
      <g className="lexi-mascot-letter lexi-mascot-letter-b">
        <circle cx="104" cy="56" fill="#4dccbd" r="8" />
        <text
          fill="#fff"
          fontFamily="Fredoka, Nunito, sans-serif"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="104"
          y="60"
        >
          B
        </text>
      </g>
      <g className="lexi-mascot-letter lexi-mascot-letter-c">
        <circle cx="98" cy="92" fill="#8b5cf6" r="7.5" />
        <text
          fill="#fff"
          fontFamily="Fredoka, Nunito, sans-serif"
          fontSize="9"
          fontWeight="700"
          textAnchor="middle"
          x="98"
          y="96"
        >
          C
        </text>
      </g>

      <g className="lexi-mascot-body">
        <ellipse cx="48" cy="100" fill="#374151" rx="11" ry="5.5" />
        <ellipse cx="72" cy="100" fill="#374151" rx="11" ry="5.5" />
        <ellipse cx="48" cy="98" fill="#ff6b6b" rx="9" ry="4.5" />
        <ellipse cx="72" cy="98" fill="#8b5cf6" rx="9" ry="4.5" />
        <rect fill="#fff" height="2" rx="1" width="6" x="42" y="97" />
        <rect fill="#fff" height="2" rx="1" width="6" x="66" y="97" />

        <rect fill="#ff8e53" height="14" rx="5" width="10" x="43" y="86" />
        <rect fill="#ff8e53" height="14" rx="5" width="10" x="67" y="86" />

        <g className="lexi-mascot-book">
          <path
            d="M60 58 L34 64 L34 92 Q34 96 38 96 L58 92 Z"
            fill={`url(#${bookLeftGradient})`}
            stroke="#6d28d9"
            strokeWidth="1.5"
          />
          <path
            d="M60 58 L86 64 L86 92 Q86 96 82 96 L62 92 Z"
            fill={`url(#${bookRightGradient})`}
            stroke="#0d9488"
            strokeWidth="1.5"
          />
          <rect fill="#fffbeb" height="28" rx="1" width="22" x="36" y="66" />
          <rect fill="#fffbeb" height="28" rx="1" width="22" x="62" y="66" />
          <path d="M60 58 L60 94" stroke="#fcd34d" strokeLinecap="round" strokeWidth="2.5" />
          <path
            d="M42 74h14M42 80h10M66 74h14M66 80h10"
            stroke="#cbd5e1"
            strokeLinecap="round"
            strokeWidth="1.2"
          />
        </g>

        <circle cx="60" cy="40" fill={`url(#${headGradient})`} r="24" stroke="#e85d04" strokeWidth="2" />
        <ellipse cx="42" cy="46" fill="#ffb4b4" opacity="0.85" rx="6" ry="4.5" />
        <ellipse cx="78" cy="46" fill="#ffb4b4" opacity="0.85" rx="6" ry="4.5" />

        <ellipse cx="49" cy="38" fill="#fff" rx="9" ry="10" stroke="#1e3a5f" strokeWidth="1.5" />
        <ellipse cx="71" cy="38" fill="#fff" rx="9" ry="10" stroke="#1e3a5f" strokeWidth="1.5" />
        <circle cx="51" cy="39" fill="#1e3a5f" r="5" />
        <circle cx="73" cy="39" fill="#1e3a5f" r="5" />
        <circle cx="53" cy="37" fill="#fff" r="2" />
        <circle cx="75" cy="37" fill="#fff" r="2" />

        <path
          d="M50 50 Q60 58 70 50"
          fill="#fff"
          stroke="#1e3a5f"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <ellipse cx="60" cy="52" fill="#fb7185" rx="4" ry="2.5" />

        <g className="lexi-mascot-wave">
          <ellipse cx="22" cy="72" fill="#ff8e53" rx="7" ry="9" stroke="#e85d04" strokeWidth="1.5" />
          <ellipse cx="22" cy="68" fill="#ffd93d" rx="4.5" ry="3.5" />
        </g>

        <g transform="translate(88 62) rotate(25)">
          <rect fill="#ffd93d" height="22" rx="1.5" width="5" x="0" y="0" />
          <polygon fill="#fde68a" points="0,0 5,0 2.5,5" />
          <rect fill="#374151" height="4" rx="1" width="5" x="0" y="18" />
          <rect fill="#fb7185" height="5" rx="1" width="5" x="0" y="13" />
        </g>
      </g>

      <g className="lexi-mascot-star">
        <circle cx="60" cy="12" fill="#ffd93d" r="11" stroke="#f59e0b" strokeWidth="2" />
        <path
          d="M60 3l2.2 4.4 4.9.7-3.5 3.4.8 4.9-4.4-2.3-4.4 2.3.8-4.9-3.5-3.4 4.9-.7z"
          fill="#fffbeb"
        />
      </g>
    </svg>
  );
}

export default LexiMascot;
