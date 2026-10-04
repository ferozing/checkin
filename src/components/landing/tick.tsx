"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

// One shared clock for every landing animation, like the design prototype (a tick every 350ms, a 67 tick loop).
const LOOP = 67;
type Tick = { n: number; t: number; replay: () => void };
const TickContext = createContext<Tick>({ n: 0, t: 0, replay: () => {} });

export function TickProvider({ children }: { children: ReactNode }) {
  const [n, setN] = useState(0);
  const [start, setStart] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((x) => x + 1), 350);
    return () => clearInterval(id);
  }, []);
  const replay = useCallback(() => setStart(n), [n]);
  const t = (((n - start) % LOOP) + LOOP) % LOOP;
  return <TickContext.Provider value={{ n, t, replay }}>{children}</TickContext.Provider>;
}

export const useTick = () => useContext(TickContext);
