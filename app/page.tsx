import HeroSection from "./components/HeroSection";
import AiCreatedSiteSection from "./components/AiCreatedSiteSection";
import PortfolioPreviewSection from "./components/PortfolioPreviewSection";
import WhatIDoSection from "./components/WhatIDoSection";
import CtaSection from "./components/CtaSection";

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center pt-8 pb-8 bg-transparent min-h-[calc(100vh-120px)]">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <HeroSection />

        <AiCreatedSiteSection />

        <PortfolioPreviewSection />

                <WhatIDoSection />
        <CtaSection />

      </div>
    </div>
  );
}