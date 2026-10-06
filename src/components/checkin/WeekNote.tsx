"use client";

import { useState } from "react";
import { dayStyle, week } from "./data";

export function WeekNote() {
  const [picked, setPicked] = useState(3);
  const day = week[picked];
  const style = dayStyle[day.type];

  return (
    <section id="note" className="section note-section">
      <div className="inner split">
        <div className="split-l">
          <span className="eyebrow warm">One week with Sona</span>
          <h2>
            Not &quot;I&apos;m fine, beta&quot;. <span className="em">The real answer.</span>
          </h2>
          <p className="body">
            Parents say they&apos;re fine so you don&apos;t worry. Sona listens closer. Tap a day and
            see what you would have known.
          </p>
          <div className="days" role="group" aria-label="Pick a day">
            {week.map((d, i) => (
              <button
                key={d.full}
                type="button"
                className="day"
                aria-label={d.full}
                aria-pressed={i === picked}
                onClick={() => setPicked(i)}
              >
                <span className="day-short">{d.short}</span>
                <span className={`day-dot ${d.type}`} />
              </button>
            ))}
          </div>
          <div className="legend">
            <span><i className="dot good" />All good</span>
            <span><i className="dot amber" />Worth a call</span>
            <span><i className="dot missed" />Didn&apos;t pick up</span>
          </div>
        </div>

        <div className="split-r">
          <div className="daycard">
            <div className="daycard-head">
              <span className={`status ${style.suffix}`}>{style.status}</span>
              <span className="daycard-when">{day.full} · {day.time}</span>
            </div>
            <span className="daycard-headline">{day.headline}</span>
            <div className="rows">
              {day.rows.map(([k, v]) => (
                <div key={k} className="row">
                  <span className="row-k">{k}</span>
                  <span className="row-v">{v}</span>
                </div>
              ))}
            </div>
            <div className={`askbox ${style.suffix}`}>
              <span className="askbox-label">{style.askLabel}</span>
              <span className="askbox-text">{day.ask}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
