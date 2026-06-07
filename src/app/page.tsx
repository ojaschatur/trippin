import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { DecisionEngineSection } from "@/components/sections/decision-engine";
import { PopularEscapesSection } from "@/components/sections/popular-escapes";
import { SocialProofSection } from "@/components/sections/social-proof";
import { FinalCTASection } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <DecisionEngineSection />
        <PopularEscapesSection />
        <SocialProofSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
