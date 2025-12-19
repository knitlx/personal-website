'use client';

import { useState } from 'react';
import Link from "next/link";
import ContactModal from './ContactModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] sticky top-0 z-[1000]">
        <div className="container flex justify-between items-center">
          <Link 
            href="/" 
            className="logo font-unbounded-fix text-[20px] font-bold bg-gradient-to-b from-[#9137DF] to-[#6F71F0] bg-clip-text text-transparent transition-colors duration-300 leading-[58px] tracking-[-0.05em] no-underline hover:text-[#7A68EE] hover:!bg-none hover:!bg-clip-content"
          >
            AI - универсал
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
                <Link href="/projects" className="no-underline text-[#333333] text-base font-medium py-[5px] relative transition-colors duration-300 hover:text-[#7B68EE]
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
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="button-cta py-[7px] px-[15px] font-semibold text-white button-gradient rounded-lg shadow-button-cta hover:shadow-[0_6px_15px_rgba(123,104,238,0.5)] transition-all duration-300 hover:-translate-y-0.5 no-underline cursor-pointer"
                >
                  <span className="inline-block translate-y-[-1px]">Обсудить проект</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
