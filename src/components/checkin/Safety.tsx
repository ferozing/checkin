const cards = [
  {
    tone: "red",
    pill: "Please call now",
    quote: "“Papa mentioned chest discomfort on today’s call.”",
    body: "Sona asked him to sit and rest and told him you’d call. You get this on WhatsApp the moment the call ends.",
  },
  {
    tone: "amber",
    pill: "Worth a call today",
    quote: "“Skipped the evening tablet. Knee is hurting again.”",
    body: "The small things that never come up on a two minute call home, flagged before they grow.",
  },
  {
    tone: "grey",
    pill: "Didn’t pick up",
    quote: "“No answer at 9:00, 9:15 and 9:30.”",
    body: "We try three times, then tell you, so silence never goes unnoticed.",
  },
];

export function Safety() {
  return (
    <section id="safety" className="section">
      <div className="inner safety">
        <div className="safety-head">
          <h2>
            If something&apos;s wrong, <span className="em">you know in minutes.</span>
          </h2>
          <p className="body">
            Calm on the good days. Fast on the bad ones. Never alarming without a reason.
          </p>
        </div>
        <div className="safety-cards">
          {cards.map((c) => (
            <div key={c.pill} className={`scard ${c.tone}`}>
              <span className="scard-pill">{c.pill}</span>
              <span className="scard-quote">{c.quote}</span>
              <span className="scard-body">{c.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
