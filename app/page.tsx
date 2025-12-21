import HeroSection from "./components/HeroSection";
import AiCreatedSiteSection from "./components/AiCreatedSiteSection";
import PortfolioPreviewSection from "./components/PortfolioPreviewSection";
import WhatIDoSection from "./components/WhatIDoSection";
import CtaSection from "./components/CtaSection";

export default function HomePage() {
  return (
    <div className="relative flex flex-col pt-8 pb-8 bg-white min-h-[calc(100vh-120px)]">

        {/* Hero Section is constrained internally */}
        <HeroSection />

        {/* AI Section is full-width bg */}
        <AiCreatedSiteSection />

        {/* This div wraps the white-background sections */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioPreviewSection />
        </div>

        {/* What I Do Section is full-width bg */}
        <WhatIDoSection />

        {/* This div wraps the final white-background section */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CtaSection />
        </div>

    </div>
  );
}
