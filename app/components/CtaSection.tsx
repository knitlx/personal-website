import Link from "next/link";
import GradientBorderButton from "./GradientBorderButton";

export default function CtaSection() {
  return (
    <section className="bg-transparent py-8 text-center backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)]">
        <div className="container">
            <h2 className="font-unbounded-fix text-[38px] font-bold text-[#333333] mb-[15px]">Есть задача или идея?</h2>
            <p className="text-[18px] text-[#555] max-w-[650px] mx-auto mb-10 leading-normal">Давайте разберёмся вместе и найдём рабочее решение.</p>
            <div className="flex justify-center gap-5 max-sm:flex-col max-sm:gap-[15px] max-w-md mx-auto">
                <Link href="/contact" className="w-full flex items-center justify-center no-underline font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 ease-in-out text-center button-gradient text-white shadow-button-cta hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(123,104,238,0.5)]">
                    <span className="inline-block translate-y-[-1px]">Написать мне</span>
                </Link>
                <GradientBorderButton href="/lab" className="w-full">
                    Смотреть кейсы
                </GradientBorderButton>
            </div>
        </div>
    </section>
  );
}