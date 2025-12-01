import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center pt-8 pb-8 bg-transparent min-h-[calc(100vh-120px)]">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <section className="relative overflow-hidden mb-[50px] bg-transparent backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)] py-12">
            <div className="container flex justify-between items-center gap-[40px]">
                <div className="flex-1 max-w-[55%]">
                    <h1 className="font-unbounded text-[48px] font-bold leading-[1.1] mb-[15px]">AI-универсал и бизнес-ассистент</h1>
                    <p className="text-[20px] font-normal text-[#666] mb-[30px] max-w-[500px]">Навожу порядок в цифровых задачах и настраиваю работающие процессы</p>
                    <div className="bg-white/90 border-l-[4px] border-[#7B68EE] p-5 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.04)] mb-[30px] text-[15px] leading-relaxed">
                        <p className="text-[#555]">
                            Я объединяю системное мышление, работу руками и современные AI-инструменты.
                            Создаю ботов, автоматизации и мини-приложения, которые упрощают процессы
                            и помогают команде работать быстрее и без лишней рутины.
                        </p>
                    </div>
                    <div className="flex gap-[15px] items-center mt-[-5px]">
                        <Link href="/contact" className="no-underline font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out text-center bg-[linear-gradient(90deg,var(--primary-color)_0%,var(--accent-color)_100%)] text-white shadow-[0_4px_15px_rgba(123,104,238,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(123,104,238,0.6)]">
                            Обсудить проект
                        </Link>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center p-5">
                    {/* Placeholder for your photo */}
                    <img src="/profile.png" alt="Ваше фото" className="max-w-full h-auto block rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.1)]" />
                </div>
            </div>
        </section>

        {/* AI-created site section */}
        <section className="py-16 text-center bg-transparent backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)] mb-[50px]">
            <div className="container">
                <h2 className="font-unbounded text-[40px] font-bold leading-tight text-[#333333] mb-[15px]">Этот сайт создан с помощью AI — от структуры до кода</h2>
                <p className="text-[18px] text-[#666] max-w-[800px] mx-auto mb-[50px]">
                    AI использован на каждом этапе разработки: структура, тексты, визуал и весь код.
                    Это рабочий пример того, как я применяю промт-инженерию в практических задачах.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px] mt-[40px]">
                    <div className="ai-feature-item bg-white rounded-xl px-5 py-[30px] transition-all duration-300 ease-in-out text-center min-h-[200px] flex flex-col justify-between relative overflow-hidden">
                        <img src="/icons/structure-texts.png" alt="Структура и тексты" className="ai-feature-icon w-[70px] h-[70px] rounded-full flex items-center justify-center mx-auto mb-[15px] relative" />
                        <h3 className="text-[18px] font-semibold text-[#333333] mb-2">Структура и тексты</h3>
                        <p className="text-sm text-[#888] leading-tight mt-auto">сгенерированы совместно с GPT-5.1</p>
                    </div>
                    <div className="ai-feature-item bg-white rounded-xl px-5 py-[30px] transition-all duration-300 ease-in-out text-center min-h-[200px] flex flex-col justify-between relative overflow-hidden">
                        <img src="/icons/design.png" alt="Визуал" className="ai-feature-icon w-[70px] h-[70px] rounded-full flex items-center justify-center mx-auto mb-[15px] relative" />
                        <h3 className="text-[18px] font-semibold text-[#333333] mb-2">Визуал</h3>
                        <p className="text-sm text-[#888] leading-tight mt-auto">создан AI</p>
                    </div>
                    <div className="ai-feature-item bg-white rounded-xl px-5 py-[30px] transition-all duration-300 ease-in-out text-center min-h-[200px] flex flex-col justify-between relative overflow-hidden">
                        <img src="/icons/code.png" alt="Код" className="ai-feature-icon w-[70px] h-[70px] rounded-full flex items-center justify-center mx-auto mb-[15px] relative" />
                        <h3 className="text-[18px] font-semibold text-[#333333] mb-2">Код</h3>
                        <p className="text-sm text-[#888] leading-tight mt-auto">полностью сгенерирован через Gemini CLI</p>
                    </div>
                    <div className="ai-feature-item bg-white rounded-xl px-5 py-[30px] transition-all duration-300 ease-in-out text-center min-h-[200px] flex flex-col justify-between relative overflow-hidden">
                        <img src="/icons/deploy.png" alt="Деплой" className="ai-feature-icon w-[70px] h-[70px] rounded-full flex items-center justify-center mx-auto mb-[15px] relative" />
                        <h3 className="text-[18px] font-semibold text-[#333333] mb-2">Деплой</h3>
                        <p className="text-sm text-[#888] leading-tight mt-auto">Railway</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Portfolio Preview */}
        <section className="py-12 text-center bg-transparent backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)] mb-[50px]">
            <div className="container">
                <h2 className="font-unbounded text-[40px] font-bold leading-tight text-[#333333] mb-[15px]">Мои проекты</h2>
                <p className="text-[18px] text-[#666] max-w-[700px] mx-auto mb-[50px]">Примеры проектов, которые я собрала с помощью AI.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[40px]">
                    <div className="portfolio-item pointer-events-none bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out">
                        <img src="/icons/icon-telegram-bot.png" alt="Telegram Bot Icon" className="portfolio-icon w-[50px] h-[50px] rounded-lg flex items-center justify-center mb-[15px] text-[28px]" />
                        <h3 className="text-[22px] font-semibold text-[#333333] mb-[10px]">Финансовый Telegram-бот</h3>
                        <p className="text-[15px] text-[#888] leading-snug mb-[15px] min-h-[45px]">Учёт доходов и расходов, визуальный интерфейс в mini-app.</p>
                        <Link href="/lab" className="portfolio-item-link pointer-events-auto inline-block text-[#7B68EE] font-semibold no-underline border-b-2 border-transparent transition-all duration-200 ease-in-out relative pr-[15px] hover:text-[#00C4FF] hover:border-[#00C4FF]">Подробнее</Link>
                    </div>
                    <div className="portfolio-item pointer-events-none bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out">
                        <img src="/icons/icon-pdf.png" alt="PDF Converter Icon" className="portfolio-icon w-[50px] h-[50px] rounded-lg flex items-center justify-center mb-[15px] text-[28px]" />
                        <h3 className="text-[22px] font-semibold text-[#333333] mb-[10px]">HTML → PDF конвертер</h3>
                        <p className="text-[15px] text-[#888] leading-snug mb-[15px] min-h-[45px]">Превращение HTML-страниц в PDF.</p>
                        <Link href="/lab/converters" className="portfolio-item-link pointer-events-auto inline-block text-[#7B68EE] font-semibold no-underline border-b-2 border-transparent transition-all duration-200 ease-in-out relative pr-[15px] hover:text-[#00C4FF] hover:border-[#00C4FF]">Попробовать</Link>
                    </div>
                    <div className="portfolio-item pointer-events-none bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out">
                        <img src="/icons/icon-pptx.png" alt="PPTX Converter Icon" className="portfolio-icon w-[50px] h-[50px] rounded-lg flex items-center justify-center mb-[15px] text-[28px]" />
                        <h3 className="text-[22px] font-semibold text-[#333333] mb-[10px]">HTML → PPTX конвертер</h3>
                        <p className="text-[15px] text-[#888] leading-snug mb-[15px] min-h-[45px]">Генерация презентаций из HTML-шаблонов.</p>
                        <Link href="/lab/converters" className="portfolio-item-link pointer-events-auto inline-block text-[#7B68EE] font-semibold no-underline border-b-2 border-transparent transition-all duration-200 ease-in-out relative pr-[15px] hover:text-[#00C4FF] hover:border-[#00C4FF]">Попробовать</Link>
                    </div>
                </div>
                <div className="mt-[50px]">
                    <Link href="/lab" className="button-cta-all-cases bg-transparent text-[#7B68EE] border-2 border-[#7B68EE] font-semibold py-3 px-[30px] rounded-lg no-underline transition-all duration-300 ease-in-out inline-block hover:bg-[#7B68EE] hover:text-white hover:border-[#7B68EE]">
                        Смотреть все кейсы
                    </Link>
                </div>
            </div>
        </section>

        {/* What I Do section */}
        <section className="py-8 text-center bg-transparent backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)] mb-[50px]">
            <div className="container">
                <h2 className="font-unbounded text-[36px] font-bold leading-tight text-[#333333] mb-[10px]">Что я делаю</h2>
                <p className="text-base text-[#666] max-w-[800px] mx-auto mb-[30px]">
                    Помогаю навести цифровой порядок, создаю автоматизации и настраиваю AI-инструменты под задачи бизнеса.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-fit mx-auto">
                    <div className="what-i-do-item bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden">
                        <div className="flex items-center"> {/* New wrapper for icon and title */}
                            <div className="what-i-do-icon w-[42px] h-[42px] rounded-full flex items-center justify-center mr-[15px] text-[22px] text-[var(--background-color)] relative"></div>
                            <h3 className="what-i-do-item-title text-[20px] font-bold text-[var(--accent-color)] mb-0">Систематизация и структура</h3>
                        </div>
                        <ul className="what-i-do-list list-none p-0 mt-[20px] w-full">
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">базы знаний</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">регламенты и инструкции</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">структуры курсов и проектов</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">таблицы, списки, дашборды</li>
                        </ul>
                    </div>
                    <div className="what-i-do-item bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden">
                        <div className="flex items-center"> {/* New wrapper for icon and title */}
                            <div className="what-i-do-icon w-[42px] h-[42px] rounded-full flex items-center justify-center mr-[15px] text-[22px] text-[var(--background-color)] relative"></div>
                            <h3 className="what-i-do-item-title text-[20px] font-bold text-[var(--accent-color)] mb-0">Автоматизации и AI-решения</h3>
                        </div>
                        <ul className="what-i-do-list list-none p-0 mt-[20px] w-full">
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">автоматизация задач</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">работа с AI-инструментами</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">разработка логики процессов</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">построение рабочих схем</li>
                        </ul>
                    </div>
                    <div className="what-i-do-item bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden">
                        <div className="flex items-center"> {/* New wrapper for icon and title */}
                            <div className="what-i-do-icon w-[42px] h-[42px] rounded-full flex items-center justify-center mr-[15px] text-[22px] text-[var(--background-color)] relative"></div>
                            <h3 className="what-i-do-item-title text-[20px] font-bold text-[var(--accent-color)] mb-0">Мини-инструменты и разработки</h3>
                        </div>
                        <ul className="what-i-do-list list-none p-0 mt-[20px] w-full">
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">Telegram-боты</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">мини-приложения (AI + веб-интерфейсы)</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">скрипты, парсеры, конвертеры</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">прототипы инструментов</li>
                        </ul>
                    </div>
                    <div className="what-i-do-item bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden">
                        <div className="flex items-center"> {/* New wrapper for icon and title */}
                            <div className="what-i-do-icon w-[42px] h-[42px] rounded-full flex items-center justify-center mr-[15px] text-[22px] text-[var(--background-color)] relative"></div>
                            <h3 className="what-i-do-item-title text-[20px] font-bold text-[var(--accent-color)] mb-0">Разобраться и сделать</h3>
                        </div>
                        <ul className="what-i-do-list list-none p-0 mt-[20px] w-full">
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">изучить тему</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">собрать информацию</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">предложить варианты решения</li>
                            <li className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">оформить результат в понятном виде</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA section */}
        <section className="bg-transparent py-8 text-center backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)]">
            <div className="container">
                <h2 className="font-unbounded text-[38px] font-bold text-[#333333] mb-[15px]">Есть задача или идея?</h2>
                <p className="text-[18px] text-[#555] max-w-[650px] mx-auto mb-10 leading-normal">Давайте разберёмся вместе и найдём рабочее решение.</p>
                <div className="flex justify-center gap-5 max-sm:flex-col max-sm:gap-[15px]">
                    <Link href="/contact" className="flex items-center justify-center py-[14px] px-[30px] rounded-lg text-base font-semibold no-underline transition-all duration-300 ease-in-out cursor-pointer max-sm:w-full bg-[#00C4FF] text-white border-2 border-[#00C4FF] hover:bg-[#00B3E8] hover:shadow-[0_4px_15px_rgba(0,196,255,0.4)]">
                        <span className="w-[18px] h-[18px] mr-2"></span> {/* Placeholder for icon */}
                        Написать мне
                    </Link>
                    <Link href="/lab" className="flex items-center justify-center py-[14px] px-[30px] rounded-lg text-base font-semibold no-underline transition-all duration-300 ease-in-out cursor-pointer max-sm:w-full bg-transparent text-[#333333] border-2 border-[#ccc] hover:text-[#7B68EE] hover:border-[#7B68EE] hover:bg-white">
                        <span className="w-[18px] h-[18px] mr-2"></span> {/* Placeholder for icon */}
                        Смотреть кейсы
                    </Link>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}