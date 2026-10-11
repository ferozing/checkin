import { pad, wrap } from "./ui";

const facts = [
  { title: "Any phone works", sub: "Keypad phones and landlines too" },
  { title: "In their language", sub: "Hindi, Telugu, Tamil, Kannada, Bengali, English" },
  { title: "They say yes first", sub: "No call happens without their consent" },
  { title: "Nothing to install", sub: "Not for them, not for you" },
];

export function FactStrip() {
  return (
    <section className={`border-y border-line ${pad}`}>
      <div className={`${wrap} grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))]`}>
        {facts.map((f) => (
          <div key={f.title} className="flex flex-col gap-1 py-[22px] pr-5">
            <span className="font-semibold">{f.title}</span>
            <span className="text-[14px] text-muted">{f.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
