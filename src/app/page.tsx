import LiveCommandTicker from "@/components/LiveCommandTicker";
import ForceStrengthPreview from "@/components/ForceStrengthPreview";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import MapSection from "@/components/landing/MapSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col pb-20">
      <HeroSection />
      <div className="mt-10">
        <LiveCommandTicker />
      </div>
      <div className="mt-20 md:mt-28">
        <StatsSection />
      </div>
      {/* ForceStrengthPreview has its own py-20 md:py-28 */}
      <ForceStrengthPreview />
      <div className="mt-4 md:mt-8">
        <MapSection />
      </div>
      <div className="mt-20 md:mt-28">
        <CTASection />
      </div>
    </div>
  );
}
