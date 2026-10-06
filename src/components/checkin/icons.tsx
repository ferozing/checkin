// Line icons for the landing page. No emoji, per CLAUDE.md.

export function Mark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <rect width="34" height="34" rx="11" fill="#1E1B17" />
      <path d="M10 17.5l4.5 4.5L24 12.5" fill="none" stroke="#FFF3E4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="26" cy="8" r="4" fill="#E8743F" />
    </svg>
  );
}

export function Pin({ fill, dot }: { fill: string; dot: string }) {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" aria-hidden="true">
      <path d="M9 21s7-6.6 7-12A7 7 0 0 0 2 9c0 5.4 7 12 7 12z" fill={fill} />
      <circle cx="9" cy="9" r="2.6" fill={dot} />
    </svg>
  );
}

export function Tick({ stroke }: { stroke: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3L12.5 5" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chat({ stroke }: { stroke: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 15l1-3.2A6.5 6.5 0 1 1 6.6 14z" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
