"use client";

import { useEffect, useRef, useState } from "react";
import { h2, pad, wrap } from "./ui";

const SAMPLE = "/audio/sample-call.mp3";

/** A fixed shape, so the waveform looks like a recording rather than noise. */
const bars = Array.from({ length: 48 }, (_, i) =>
  Math.round(8 + 22 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45))),
);

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function Listen() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [at, setAt] = useState(0);
  const [length, setLength] = useState(0);
  // The real recording is not in the repo yet. Rather than fake a player, the
  // control says so until public/audio/sample-call.mp3 exists.
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    const onTime = () => setAt(el.currentTime);
    const onMeta = () => setLength(el.duration || 0);
    const onEnd = () => setPlaying(false);
    const onError = () => setMissing(true);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    el.addEventListener("error", onError);
    // The file can 404 before the listener above is attached, so check once too.
    const settle = setTimeout(() => {
      if (el.error || el.networkState === el.NETWORK_NO_SOURCE) setMissing(true);
    }, 400);
    return () => {
      clearTimeout(settle);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
      el.removeEventListener("error", onError);
    };
  }, []);

  const toggle = () => {
    const el = audio.current;
    if (!el || missing) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play().then(() => setPlaying(true)).catch(() => setMissing(true));
    }
  };

  const progress = length > 0 ? at / length : 0;

  return (
    <section id="listen" className={`bg-sand ${pad} py-[clamp(72px,9vw,120px)]`}>
      <div className={`${wrap} flex flex-wrap items-center gap-[clamp(32px,5vw,80px)]`}>
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-[18px]">
          <h2 className={h2}>Hear exactly what your parent will hear.</h2>
          <p className="max-w-[460px] text-[18px] leading-[1.6] text-body">
            Our voice assistant, Sona, always says who she is and who asked her to call. She&apos;s
            patient, speaks their language, and remembers yesterday. Listen before you decide.
          </p>
        </div>

        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[18px] rounded-[18px] border border-[#E5DACB] bg-paper p-[clamp(20px,2.6vw,30px)]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              disabled={missing}
              aria-label={playing ? "Pause sample call" : "Play sample call"}
              className="inline-flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary disabled:cursor-not-allowed disabled:opacity-55"
            >
              {playing ? (
                <svg width="16" height="18" viewBox="0 0 12 14" aria-hidden="true">
                  <rect x="1" y="1" width="3.5" height="12" fill="#FFFFFF" />
                  <rect x="7.5" y="1" width="3.5" height="12" fill="#FFFFFF" />
                </svg>
              ) : (
                <svg width="16" height="18" viewBox="0 0 12 14" aria-hidden="true">
                  <path d="M1 1l10 6l-10 6z" fill="#FFFFFF" />
                </svg>
              )}
            </button>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex justify-between gap-2 text-[14px]">
                <span className="font-semibold">Sample morning call · Telugu</span>
                <span className="text-faint">
                  {missing ? "Coming soon" : `${clock(at)} / ${length ? clock(length) : "--:--"}`}
                </span>
              </div>
              <div className="flex h-[34px] items-center gap-0.5" aria-hidden="true">
                {bars.map((height, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-[2px]"
                    style={{
                      height,
                      background: !missing && i / bars.length < progress ? "#C2501D" : "#D9CDBD",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-line pt-4 text-[15px] leading-[1.5]">
            <div className="flex gap-3">
              <span className="w-14 shrink-0 font-semibold text-faint">Sona</span>
              <span>
                &ldquo;Good morning Amma, this is Sona from Checkin. Ravi asked me to call you.
                Tiffin ayyinda?&rdquo;
              </span>
            </div>
            <div className="flex gap-3">
              <span className="w-14 shrink-0 font-semibold text-faint">Amma</span>
              <span>&ldquo;Ayyindi, upma chesanu. BP tablet kooda vesukunna.&rdquo;</span>
            </div>
            <span className="text-[13px] text-faint">
              {missing
                ? "We are recording a real sample call. It will play here shortly."
                : "English subtitles on the page. The real call is only in their language."}
            </span>
          </div>
          <audio ref={audio} src={SAMPLE} preload="metadata" className="hidden" />
        </div>
      </div>
    </section>
  );
}
