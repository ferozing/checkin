import type { ReactNode } from "react";

export function Icon({ size = 20, sw = 1.8, children, className, style }: { size?: number; sw?: number; children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} style={style}>
      {children}
    </svg>
  );
}

export const HEART = "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z";
export const PHONE = "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z";

export const HeartIcon = (p: { size?: number; sw?: number }) => <Icon {...p}><path d={HEART} /></Icon>;
export const PhoneIcon = (p: { size?: number; sw?: number; style?: React.CSSProperties }) => <Icon {...p}><path d={PHONE} /></Icon>;
export const CheckIcon = (p: { size?: number; sw?: number }) => <Icon {...p}><path d="M20 6 9 17l-5-5" /></Icon>;
export const ArrowIcon = (p: { size?: number; sw?: number }) => <Icon {...p}><path d="M5 12h14M12 5l7 7-7 7" /></Icon>;
export const ClockIcon = (p: { size?: number; sw?: number }) => <Icon {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Icon>;
