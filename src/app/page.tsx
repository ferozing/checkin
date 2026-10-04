import { SiteHeader } from "@/components/SiteHeader";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { HardDays } from "@/components/landing/HardDays";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { InviteProvider, StartTrialButton } from "@/components/landing/invite";
import { NoApp } from "@/components/landing/NoApp";
import { Pricing } from "@/components/landing/Pricing";
import { Rhythm } from "@/components/landing/Rhythm";
import { Stories } from "@/components/landing/Stories";
import { TalkAbout } from "@/components/landing/TalkAbout";
import { TickProvider } from "@/components/landing/tick";
import { Understand } from "@/components/landing/Understand";
import { Week } from "@/components/landing/Week";
import { WhyItMatters } from "@/components/landing/WhyItMatters";

// The design's testimonials are placeholders. Turn this on once real family quotes are in Stories.tsx.
const SHOW_STORIES = false;

const navLink = "text-[16px] font-medium text-nav no-underline min-h-11 inline-flex items-center";

export default function Home() {
  return (
    <InviteProvider>
      <TickProvider>
        <SiteHeader
          nav={
            <nav aria-label="Main" className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href="#how" className={navLink}>How it works</a>
              <a href="#pricing" className={navLink}>Pricing</a>
              <StartTrialButton className="inline-flex min-h-[46px] cursor-pointer items-center rounded-full bg-green px-5 text-[16px] font-semibold text-card hover:bg-green-hover">
                Start free trial
              </StartTrialButton>
            </nav>
          }
        />
        <main>
          <Hero />
          <NoApp />
          <WhyItMatters />
          <Understand />
          <TalkAbout />
          <HowItWorks />
          <Rhythm />
          <Week />
          <HardDays />
          {SHOW_STORIES ? <Stories /> : null}
          <Pricing />
          <Faq />
          <FinalCta />
        </main>
      </TickProvider>
    </InviteProvider>
  );
}
