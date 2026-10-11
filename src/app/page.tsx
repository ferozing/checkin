import { DailyNote } from "@/components/home/DailyNote";
import { FactStrip } from "@/components/home/FactStrip";
import { FinalCta } from "@/components/home/FinalCta";
import { FounderNote } from "@/components/home/FounderNote";
import { Hero } from "@/components/home/Hero";
import { Listen } from "@/components/home/Listen";
import { Nav } from "@/components/home/Nav";
import { Pricing } from "@/components/home/Pricing";
import { Promise as PromiseSection } from "@/components/home/Promise";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <FactStrip />
        <DailyNote />
        <Listen />
        <PromiseSection />
        <FounderNote />
        <Pricing />
        <FinalCta />
      </main>
    </>
  );
}
