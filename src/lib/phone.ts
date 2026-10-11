/**
 * Indian numbers arrive in every shape: "+91 98765 43210", "098765 43210",
 * "9876543210". Compare them by the last ten digits, which is the part that
 * actually identifies the line.
 */
export function digits(raw: string) {
  return (raw ?? "").replace(/\D/g, "");
}

export function last10(raw: string) {
  const d = digits(raw);
  return d.length > 10 ? d.slice(-10) : d;
}

/** Same line, however it was typed. */
export function samePhone(a: string, b: string) {
  const x = last10(a);
  const y = last10(b);
  return x.length >= 10 && x === y;
}
