import Image from 'next/image';
import Link from "next/link";
import GradientBorderButton from "./GradientBorderButton";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden mb-[50px] bg-transparent backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)]">
        <div className="container flex justify-between items-center gap-[40px]">
            <div className="flex-1 max-w-[60%]">
                <p className="text-[18px] font-normal text-[#666] mb-[20px] max-w-[500px]">Александра</p>
                <h1 className="flex items-center mb-[15px]">
                    <span className="font-unbounded-fix text-[110px] font-bold gradient-hero-ai bg-clip-text text-transparent leading-none">AI</span>
                    <span className="font-unbounded-fix text-[45px] font-bold leading-tight ml-4 relative -translate-y-[5px] text-[#100010]">универсал и промт-инженер</span>
                </h1>
                <p className="font-unbounded-fix text-[20px] font-bold tracking-[0.09em] opacity-[0.53] gradient-hero-desc bg-clip-text text-transparent mb-[30px] max-w-[600px]">Навожу порядок в цифровых задачах и настраиваю работающие процессы</p>
                <div className="bg-white/90 border-l-[4px] border-r-[4px] border-[#6F71F0] p-5 rounded-lg shadow-highlight mb-[30px] text-[15px] leading-relaxed">
                    <p className="text-[#555]">
                        Я объединяю системное мышление, работу руками и современные AI-инструменты.
                        Создаю ботов, автоматизации и мини-приложения, которые упрощают процессы
                        и помогают команде работать быстрее и без лишней рутины.
                    </p>
                </div>
                <div className="flex gap-[15px] items-center mt-[-5px]">
                                        <GradientBorderButton href="/contact" useGradientText>
                                            Обсудить проект
                                        </GradientBorderButton>                    </div>
            </div>
            <div className="photo-wrapper flex justify-center items-center max-w-[400px] mx-auto relative">
                <Image 
                    src="/profile.png" 
                    alt="Ваше фото" 
                    width={400} 
                    height={400} 
                    priority 
                    className="profile-photo p-5 max-w-full h-auto block object-cover" 
                />
            </div>
        </div>
    </section>
  );
}