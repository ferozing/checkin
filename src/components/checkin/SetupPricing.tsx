import { PRICE_PER_MONTH, TRIAL_DAYS } from "@/config";

const steps = [
  { n: "1", title: "Add your parent", body: "Their name, number, language and what you call them." },
  { n: "2", title: "Pick a time", body: "After breakfast or in the evening. Add medicines to check on." },
  { n: "3", title: "Read it on WhatsApp", body: "Your first note arrives tomorrow morning. That’s it." },
];

export function SetupPricing() {
  return (
    <section id="pricing" className="section">
      <div className="inner pricing">
        <div className="setup">
          <h2>
            Two minutes to set up. <span className="em">Nothing for them to learn.</span>
          </h2>
          <div className="setup-steps">
            {steps.map((s) => (
              <div key={s.n} className="setup-step">
                <span className="num">{s.n}</span>
                <span className="setup-title">{s.title}</span>
                <span className="setup-body">{s.body}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="price">
          <span className="price-eyebrow">Per parent</span>
          <span className="price-amount">
            {PRICE_PER_MONTH}
            <span> / month</span>
          </span>
          <span className="price-body">
            A daily call, a daily note, instant alerts.
            <br />
            Cancel anytime.
          </span>
          <a href="#start" className="price-cta">First {TRIAL_DAYS} days free</a>
        </div>
      </div>
    </section>
  );
}
