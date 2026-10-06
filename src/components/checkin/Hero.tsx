"use client";

import { APP_NAME, TRIAL_DAYS } from "@/config";
import { scenes } from "./data";
import { Mark, Pin, Tick } from "./icons";
import { useLandingTick } from "./useLandingTick";

const LOOP = 220;
const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);
const pad2 = (n: number) => String(n).padStart(2, "0");

const navLink = "text-[15px] text-[color:var(--text-2)] no-underline";

export function Hero() {
  const { t } = useLandingTick(170);
  const c = t % LOOP;

  const ringing = c < 45;
  const talking = c >= 45 && c < 120;
  const showBanner = c >= 128 && c < 160;
  const showNote = c >= 160;

  const scene = scenes[Math.floor(t / LOOP) % scenes.length];
  const sceneIndex = scenes.indexOf(scene);

  const secs = talking ? Math.round(((c - 45) / 75) * 372) : 372;
  const callClock = `${Math.floor(secs / 60)}:${pad2(secs % 60)}`;
  const leftMin = ringing ? 0 : talking ? Math.floor(((c - 45) / 75) * 6) : 6;
  const rightMin = c < 128 ? 1 + Math.floor((c / 128) * 6) : c < 160 ? 7 : 8;

  // The child's clock, offset from the parent's by the scene's time difference.
  const theirTime = (min: number) => {
    const total = 9 * 60 + min + scene.off;
    return `${Math.floor(total / 60)}:${pad2(((total % 60) + 60) % 60)}`;
  };

  const bubbles = talking
    ? scene.convo.slice(Math.max(0, Math.min(4, 1 + Math.floor((c - 45) / 19)) - 2), Math.min(4, 1 + Math.floor((c - 45) / 19)))
    : ringing
      ? []
      : scene.convo.slice(2, 4);

  const stepIndex = ringing ? 0 : talking ? 1 : c < 160 ? 2 : 3;
  const steps = [
    { label: `${cap(scene.his)} phone rings`, fill: ringing ? (c / 45) * 100 : 100 },
    { label: "A warm 6 minute chat", fill: ringing ? 0 : talking ? ((c - 45) / 75) * 100 : 100 },
    { label: "Your note is written", fill: c < 120 ? 0 : c < 160 ? ((c - 120) / 40) * 100 : 100 },
    { label: `You know ${scene.he}’s okay`, fill: c < 160 ? 0 : Math.min(100, ((c - 160) / 40) * 100) },
  ];

  return (
    <section className="hero">
      <div className="inner">
        <nav className="nav" aria-label="Main">
          <a href="#top" className="brand">
            <Mark />
            <span>{APP_NAME}</span>
          </a>
          <div className="nav-links">
            <a href="#note" className={navLink}>The daily note</a>
            <a href="#safety" className={navLink}>Safety</a>
            <a href="#pricing" className={navLink}>Pricing</a>
            <a href="#start" className="nav-cta">Start free trial</a>
          </div>
        </nav>

        <div id="top" className="hero-top">
          <span className="badge">For everyone who lives far from their parents</span>
          <h1>
            Know they&apos;re okay. <span className="em">Every single morning.</span>
          </h1>
          <p className="lead">
            We call your parent every day on their normal phone. Minutes later, you get a note on
            WhatsApp: how they are, their medicines, and what to ask them tonight.
          </p>
        </div>

        <div className="langstrip">
          <span className="langstrip-title">
            Sona speaks <em>their</em> language
          </span>
          <div className="langstrip-chips">
            <span className="langstrip-langs">
              {scenes.map((s, i) => (
                <span key={s.lang} className={`langchip${i === sceneIndex ? " on" : ""}`}>
                  {s.lang}
                </span>
              ))}
            </span>
            <span className="langstrip-more">+ more</span>
          </div>
        </div>

        <div className="mornings">
          {/* Their morning */}
          <div className="card-morning theirs">
            <div className="card-head">
              <div className="card-head-l">
                <span className="eyebrow">Their morning</span>
                <span className="place">
                  <Pin fill="#E8743F" dot="#FFE6D2" />
                  Back home in {scene.home}
                </span>
              </div>
              <span className="clock">9:{pad2(leftMin)}</span>
            </div>
            <div className="card-body">
              <div className={`keypad${ringing ? " ring" : ""}`}>
                <div
                  className="keypad-screen"
                  style={{ background: ringing ? "#CFE8D6" : talking ? "#DDE8DF" : "#C9CFCB" }}
                >
                  <span className="kp-top">{ringing ? "Incoming call" : talking ? "On call" : "Call ended"}</span>
                  <span className="kp-name">{APP_NAME}</span>
                  <span className="kp-bottom">{ringing ? "ringing..." : callClock}</span>
                </div>
                <div className="keypad-keys" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} />
                  ))}
                </div>
              </div>
              <div className="chat">
                {bubbles.map((l) => (
                  <div key={l.text} className={`bubble ${l.who === "sona" ? "from-sona" : "from-them"}`}>
                    <span className="bubble-text">{l.text}</span>
                    <span className="bubble-tr">{l.tr}</span>
                  </div>
                ))}
              </div>
            </div>
            <span className="card-cap">
              {ringing
                ? `${scene.name}’s phone rings at the usual time. ${cap(scene.he)} just picks up.`
                : talking
                  ? `Sona chats with ${scene.him} in ${scene.lang}, like family would.`
                  : `Six minutes later, ${scene.he}’s smiling.`}
            </span>
          </div>

          {/* Your morning */}
          <div className="card-morning yours">
            <div className="card-head">
              <div className="card-head-l">
                <span className="eyebrow">Your morning</span>
                <span className="place">
                  <Pin fill="#1E1B17" dot="#FBF6EC" />
                  Far away in {scene.childCity}
                </span>
              </div>
              <span className="clock">{theirTime(rightMin)}</span>
            </div>
            <div className="card-body">
              <div className="phone">
                <div
                  className={`phone-screen${showBanner ? " show-banner" : ""}${showNote ? " show-note" : ""}`}
                >
                  <div className="lock">
                    <span className="lock-date">Thursday, 9 October</span>
                    <span className="lock-time">{theirTime(rightMin)}</span>
                    <span className="lock-sub">Standup in 20 min</span>
                  </div>
                  <div className="banner">
                    <span className="banner-icon">
                      <Tick stroke="#FBF6EC" />
                    </span>
                    <div className="banner-copy">
                      <span className="banner-app">
                        {APP_NAME} <span>· WhatsApp · now</span>
                      </span>
                      <span>{scene.banner}</span>
                    </div>
                  </div>
                  <div className="wa">
                    <div className="wa-bar">
                      <span className="wa-avatar">
                        <Tick stroke="#1E1B17" />
                      </span>
                      <span className="wa-name">{APP_NAME}</span>
                    </div>
                    <div className="wa-body">
                      <div className="wa-note">
                        <span className="pill-good">All good today</span>
                        <span><strong>Medicines:</strong> {scene.meds}</span>
                        <span><strong>Mood:</strong> {scene.mood}</span>
                        <span><strong>Food:</strong> {scene.food}</span>
                        <span className="wa-ask">
                          <strong>{scene.askLabel}</strong>: {scene.ask}
                        </span>
                        <span className="wa-time">{theirTime(8)} am</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="card-cap">
              {c < 128
                ? "You’re getting ready for work."
                : c < 160
                  ? "A WhatsApp note arrives."
                  : `You know exactly how ${scene.he} is.`}
            </span>
          </div>
        </div>

        <div className="steps">
          {steps.map((s, i) => (
            <div key={s.label} className={`step${i <= stepIndex ? " on" : ""}`}>
              <span className="step-track">
                <span className="step-fill" style={{ width: `${Math.round(s.fill)}%` }} />
              </span>
              <span className="step-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="hero-cta">
          <a href="#start" className="btn-orange">Start your {TRIAL_DAYS} day free trial</a>
          <span className="hero-cta-note">
            <b>No app for them. No app for you. Set up in 5 minutes.</b>
          </span>
        </div>
      </div>
    </section>
  );
}
