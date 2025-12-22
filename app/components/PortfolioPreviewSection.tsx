import BentoButton from "./BentoButton"; // Use BentoButton
import PortfolioSlider from "./PortfolioSlider";

export default function PortfolioPreviewSection() {
  return (
    <section className="py-12 mb-[50px]">
      <div className="container text-center">
        <h2 className="font-unbounded-fix text-[40px] font-medium leading-tight text-[#333333] mb-[15px]">
          Мои проекты
        </h2>
        <p className="text-[18px] text-[#666] max-w-[700px] mx-auto mb-[50px]">
          Примеры проектов, которые я собрала с помощью AI.
        </p>
      </div>
      <div className="mt-[40px] relative max-w-[1060px] mx-auto">
        <PortfolioSlider />
      </div>
      <div className="container text-center mt-[50px]">
        <BentoButton href="/projects" variant="primary">
          Смотреть все кейсы
        </BentoButton>
      </div>
    </section>
  );
}
