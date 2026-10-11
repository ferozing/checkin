import { h2, pad, wrap } from "./ui";

const always = [
  "Says she’s a voice assistant calling on your behalf",
  "Asks your parent’s permission on the very first call",
  "Tells your parent to rest and that you’ll call, if anything sounds serious",
  "Lets them stop the calls any time, just by saying so",
];

const never = [
  "Pretends to be you or a family member",
  "Asks for money, bank details or an OTP",
  "Gives medical advice or replaces a doctor",
  "Shares what your parent says with anyone but you",
];

const label = "text-[13px] font-bold uppercase tracking-[0.08em]";

export function Promise() {
  return (
    <section id="promise" className={`${pad} py-[clamp(72px,9vw,128px)]`}>
      <div className={`${wrap} flex flex-col gap-10`}>
        <h2 className={`${h2} max-w-[820px]`}>
          An AI calling your mother should come with clear rules.{" "}
          <em className="text-primary">Here are ours.</em>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] border-t-[1.5px] border-ink">
          <div className="flex flex-col gap-3.5 py-6 pr-8">
            <span className={`${label} text-good`}>Sona always</span>
            {always.map((t) => (
              <span key={t} className="text-[17px] leading-[1.55]">{t}</span>
            ))}
          </div>
          <div className="flex flex-col gap-3.5 py-6 pr-8">
            <span className={`${label} text-red`}>Sona never</span>
            {never.map((t) => (
              <span key={t} className="text-[17px] leading-[1.55]">{t}</span>
            ))}
          </div>
        </div>
        <p className="text-[15px] text-muted">
          In an emergency, call 112. Checkin is a daily check in, not an emergency service.
        </p>
      </div>
    </section>
  );
}
