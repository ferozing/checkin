import { eyebrow, wrap } from "./styles";

const steps = [
  { n: "1", title: "Add your parent", body: "Name, number, language. Two minutes." },
  { n: "2", title: "Sona calls daily at your chosen time", body: "Morning or evening, on their normal phone." },
  { n: "3", title: "You get a summary with what to ask them", body: "Plus one or two things to ask them.", dark: true },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-4 border-y border-[#EFE6D6] bg-card">
      <div className={`${wrap} py-[clamp(64px,9vw,104px)]`}>
        <p className={eyebrow}>How it works</p>
        <h2 className="mt-3 max-w-[680px] font-serif text-[clamp(32px,3.8vw,48px)] leading-[1.1] font-medium">Two minutes to set up. A call home every day after that.</h2>
        <div className="mt-12 flex flex-wrap gap-5">
          {steps.map((s) => (
            <div key={s.n} className={`min-w-0 flex-[1_1_280px] rounded-3xl p-[30px] ${s.dark ? "bg-green text-[#F4EEE2]" : "bg-cream"}`}>
              <span className={`font-serif text-[56px] leading-none ${s.dark ? "text-[#E9B79C]" : "text-[#D9C9B0]"}`}>{s.n}</span>
              <h3 className="mt-[18px] font-serif text-[24px] font-semibold">{s.title}</h3>
              <p className={`mt-2.5 ${s.dark ? "text-[rgba(244,238,226,0.82)]" : "text-ink-2"}`}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
