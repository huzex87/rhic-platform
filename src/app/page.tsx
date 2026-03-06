import LiveCommandTicker from "@/components/LiveCommandTicker";
import ForceStrengthPreview from "@/components/ForceStrengthPreview";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import MapSection from "@/components/landing/MapSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-24">
      <HeroSection />
      <LiveCommandTicker />
      <StatsSection />
      <ForceStrengthPreview />
      <MapSection />
      <CTASection />
    </div>
  );
}
