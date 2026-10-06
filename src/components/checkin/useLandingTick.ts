"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const q = window.matchMedia(QUERY);
  q.addEventListener("change", onChange);
  return () => q.removeEventListener("change", onChange);
}

/**
 * One 60ms clock for the landing animations, as in the design prototype.
 *
 * When the reader prefers reduced motion it holds a single frame instead of
 * animating: `still` is a point in the loop where the note has been delivered.
 * The server snapshot is "reduced", so the prerendered HTML is that same calm
 * frame and the animation only starts once we are on the client.
 */
export function useLandingTick(still: number) {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setN((x) => x + 1), 60);
    return () => clearInterval(id);
  }, [reduced]);

  return { t: reduced ? still : n, animate: !reduced };
}
