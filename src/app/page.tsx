import { FinalCta } from "@/components/checkin/FinalCta";
import { Hero } from "@/components/checkin/Hero";
import { MeetSona } from "@/components/checkin/MeetSona";
import { Safety } from "@/components/checkin/Safety";
import { SetupPricing } from "@/components/checkin/SetupPricing";
import { WeekNote } from "@/components/checkin/WeekNote";
import "@/components/checkin/landing.css";

// The landing page carries its own header and footer, so it does not use
// SiteHeader / SiteFooter. Everything is scoped under .ci.
export default function Home() {
  return (
    <div className="ci">
      <main>
        <Hero />
        <WeekNote />
        <MeetSona />
        <Safety />
        <SetupPricing />
      </main>
      <FinalCta />
    </div>
  );
}
