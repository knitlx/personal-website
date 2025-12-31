import HeroSection from "./components/HeroSection";
import AiCreatedSiteSection from "./components/AiCreatedSiteSection";
import WhatIDoSection from "./components/WhatIDoSection";
import PortfolioSection from "./components/PortfolioSection";
import CtaSection from "./components/CtaSection";
import LazySection from "./components/LazySection";

export default function HomePage() {
  return (
    <div className="relative flex flex-col pt-8 pb-8 min-h-[calc(100vh-120px)]">
      {/* Subtle Background Shapes */}
      <div className="absolute top-10 left-0 w-80 h-80 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-20 filter blur-3xl -z-10 animate-blob mix-blend-multiply" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full opacity-20 filter blur-3xl -z-10 animate-blob animation-delay-2000 mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-green-200 to-red-200 rounded-full opacity-20 filter blur-3xl -z-10 animate-blob animation-delay-4000 mix-blend-multiply" />

      {/* Hero Section загружается сразу */}
      <HeroSection />

      {/* Остальные секции грузятся по мере скролла */}
      <LazySection rootMargin="100px">
        <AiCreatedSiteSection />
      </LazySection>

      <LazySection rootMargin="100px">
        <PortfolioSection />
      </LazySection>

      <LazySection rootMargin="100px">
        <WhatIDoSection />
      </LazySection>

      <LazySection rootMargin="100px">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CtaSection />
        </div>
      </LazySection>
    </div>
  );
}
