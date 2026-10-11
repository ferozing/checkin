// Line icons for the landing page. No emoji, per CLAUDE.md.

/** The brand mark: a c with a voice coming out of it. */
export function Mark({ size = 34, tile = "#191714", letter = "#FFFDF9" }: { size?: number; tile?: string; letter?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect x="4" y="4" width="92" height="92" rx="26" fill={tile} />
      <path d="M64.5 34 A24 24 0 1 0 64.5 66" fill="none" stroke={letter} strokeWidth="11" strokeLinecap="round" />
      <path d="M73 43 A9 9 0 0 1 73 57" fill="none" stroke="#E8743F" strokeWidth="6" strokeLinecap="round" />
      <path d="M80 36 A18 18 0 0 1 80 64" fill="none" stroke="#E8743F" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/** The mark with no tile, for sitting on a coloured circle. */
export function MarkGlyph({ size = 16, letter }: { size?: number; letter: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M64.5 34 A24 24 0 1 0 64.5 66" fill="none" stroke={letter} strokeWidth="13" strokeLinecap="round" />
      <path d="M75 43 A9 9 0 0 1 75 57" fill="none" stroke="#E8743F" strokeWidth="8" strokeLinecap="round" />
      <path d="M84 35 A19 19 0 0 1 84 65" fill="none" stroke="#E8743F" strokeWidth="8" strokeLinecap="round" />
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

export function Chat({ stroke }: { stroke: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 15l1-3.2A6.5 6.5 0 1 1 6.6 14z" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
