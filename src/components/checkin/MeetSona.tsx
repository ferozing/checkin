"use client";

import { greets } from "./data";
import { useLandingTick } from "./useLandingTick";

const GREET_LOOP = 55;

export function MeetSona() {
  const { t, animate } = useLandingTick(0);
  const index = Math.floor(t / GREET_LOOP) % greets.length;
  const phase = t % GREET_LOOP;
  const greet = greets[index];

  // Fade each greeting in and out, so the languages hand over gently.
  const opacity =
    !animate || t === 0 ? 1 : phase < 6 ? phase / 6 : phase > 50 ? (GREET_LOOP - phase) / 5 : 1;

  return (
    <section className="section sona-section">
      <div className="inner sona">
        <div className="sona-l">
          <span className="eyebrow warm">Meet Sona</span>
          <h2>A call they actually look forward to.</h2>
          <p className="body">
            Sona is our warm voice companion. She calls at the same time every day, talks in their
            language, remembers yesterday, and never rushes. Sona always says she&apos;s an assistant
            calling on your behalf.
          </p>
          <div className="tags">
            <span className="tag">Any phone, even a landline</span>
            <span className="tag">Morning or evening</span>
            <span className="tag">5 to 8 minutes</span>
          </div>
        </div>

        <div className="sona-r">
          <div className="sona-langs">
            {greets.map((g, i) => (
              <span key={g.name} className={`sonalang${i === index ? " on" : ""}`}>
                {g.name}
              </span>
            ))}
          </div>
          <div className="quote">
            <div className="quote-head">
              <span className="avatar">S</span>
              <div className="quote-who">
                <span className="quote-name">Sona</span>
                <span className="quote-sub">speaking {greet.name}</span>
              </div>
              <div className="bars" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      height: animate
                        ? `${Math.round(6 + 20 * Math.abs(Math.sin(t * 0.35 + i * 0.9)))}px`
                        : `${8 + (i % 4) * 5}px`,
                    }}
                  />
                ))}
              </div>
            </div>
            <span className="quote-line" style={{ opacity }}>&ldquo;{greet.line}&rdquo;</span>
            <span className="quote-tr" style={{ opacity }}>{greet.tr}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
