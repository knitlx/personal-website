import Link from "next/link";

const Header = () => (
  <header className="bg-white/80 backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] py-[15px] sticky top-0 z-[1000]">
    <div className="container flex justify-between items-center">
      <Link href="/" className="logo text-2xl font-bold text-[#7B68EE] hover:text-[#00C4FF] transition-colors duration-300 tracking-tight no-underline">
        Бизнес-ассистент
      </Link>
      <nav className="main-nav">
        <ul className="list-none flex items-center">
          <li className="ml-[25px]">
            <Link href="/" className="no-underline text-[#333333] text-base font-medium py-[5px] relative transition-colors duration-300 hover:text-[#7B68EE]
                                     after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px] 
                                     after:bg-[#7B68EE] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Главная
            </Link>
          </li>
          <li className="ml-[25px]">
            <Link href="/services" className="no-underline text-[#333333] text-base font-medium py-[5px] relative transition-colors duration-300 hover:text-[#7B68EE]
                                             after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px] 
                                             after:bg-[#7B68EE] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Услуги
            </Link>
          </li>
          <li className="ml-[25px]">
            <Link href="/lab" className="no-underline text-[#333333] text-base font-medium py-[5px] relative transition-colors duration-300 hover:text-[#7B68EE]
                                       after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px] 
                                       after:bg-[#7B68EE] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Проекты
            </Link>
          </li>
          <li className="ml-[25px]">
            <Link href="/about" className="no-underline text-[#333333] text-base font-medium py-[5px] relative transition-colors duration-300 hover:text-[#7B68EE]
                                         after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px] 
                                         after:bg-[#7B68EE] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
              Обо мне
            </Link>
          </li>
          <li className="ml-[25px]">
            <Link href="/contact" className="button-cta py-2.5 px-5 font-semibold text-white bg-[linear-gradient(90deg,var(--primary-color)_0%,var(--accent-color)_100%)] rounded-lg shadow-[0_4px_10px_rgba(123,104,238,0.4)] hover:shadow-[0_6px_15px_rgba(123,104,238,0.5)] transition-all duration-300 hover:-translate-y-0.5 no-underline">
              Обсудить проект
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
