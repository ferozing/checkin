import { eyebrow, wrap } from "./styles";

// Placeholder copy straight from the design. Not rendered until real family quotes are ready (see SHOW_STORIES in page.tsx).
export function Stories() {
  const light = "bg-card shadow-[0_1px_2px_rgba(60,40,20,0.05),0_12px_32px_rgba(60,40,20,0.07)]";
  const items = [
    { q: "[Real quote from a pilot family, in their own words. Two or three lines on what changed for them.]", who: "[First name], [city]", meta: "[Parent] in [city] · [weeks] with Sona", style: light, badge: "bg-green-soft text-green" },
    { q: "[Real quote about a moment Sona caught early, like a missed tablet or a tired voice.]", who: "[First name], [city]", meta: "[Parent] in [city] · [weeks] with Sona", style: "bg-green text-[#F4EEE2] shadow-[0_12px_32px_rgba(31,77,58,0.22)]", badge: "bg-[rgba(255,253,248,0.12)]", dark: true },
    { q: "[Real quote from a parent, if they're happy to share, about how they feel when Sona calls.]", who: "[Name], [city]", meta: "Gets Sona's call every [morning or evening]", style: light, badge: "bg-terracotta-soft text-terracotta-text" },
  ];
  return (
    <section aria-labelledby="stories" className={`${wrap} pb-[clamp(64px,9vw,112px)]`}>
      <p className={eyebrow}>From families using Sona</p>
      <h2 id="stories" className="mt-3 max-w-[720px] font-serif text-[clamp(32px,3.8vw,48px)] leading-[1.1] font-medium">[Headline drawn from a real family&apos;s words]</h2>
      <div className="mt-10 flex flex-wrap gap-5">
        {items.map((it, i) => (
          <figure key={i} className={`flex min-w-0 flex-[1_1_300px] flex-col rounded-[28px] p-[30px] ${it.style}`}>
            <span aria-hidden="true" className="font-serif text-[72px] leading-[0.6] text-[#E9B79C]">“</span>
            <blockquote className="mt-4 flex-1 font-serif text-[21px] leading-[1.45]">{it.q}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className={`flex h-12 w-12 items-center justify-center rounded-full font-serif text-[20px] font-semibold ${it.badge}`}>[ ]</span>
              <span>
                <span className="block font-bold">{it.who}</span>
                <span className={`block text-[15px] ${it.dark ? "text-[rgba(244,238,226,0.78)]" : "text-muted"}`}>{it.meta}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
