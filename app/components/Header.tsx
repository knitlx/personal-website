"use client";

import { useState } from "react";
import Link from "next/link";
import ContactModal from "./ContactModal";
import BentoButton from "./BentoButton";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] sticky top-0 z-[1000]">
        <div className="container flex justify-between items-center">
          {" "}
          {/* Use justify-between */}
          <Link
            href="/"
            className="logo font-unbounded-fix text-[20px] font-bold bg-gradient-to-b from-[#9137DF] to-[#6F71F0] bg-clip-text text-transparent transition-colors duration-300 leading-[58px] tracking-[-0.05em] no-underline hover:text-[#7A68EE] hover:!bg-none hover:!bg-clip-content"
          >
            NoChaos
          </Link>
          <nav className="main-nav mx-auto">
            {" "}
            {/* Add mx-auto to nav */}
            <ul className="list-none flex items-center">
              <li className="ml-[25px]">
                <Link
                  href="/services"
                  className="no-underline text-[#333333] text-base font-medium py-[5px] relative transition-colors duration-300 hover:bg-gradient-to-r hover:from-[var(--accent-color)] hover:to-[var(--primary-color)] hover:bg-clip-text hover:text-transparent
                                                 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px] 
                                                                                                  after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Услуги
                </Link>
              </li>
              <li className="ml-[25px]">
                <Link
                  href="/projects"
                  className="no-underline text-[#333333] text-base font-medium py-[5px] relative transition-colors duration-300 hover:bg-gradient-to-r hover:from-[var(--accent-color)] hover:to-[var(--primary-color)] hover:bg-clip-text hover:text-transparent
                                           after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px] 
                                                                                            after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Проекты
                </Link>
              </li>
              <li className="ml-[25px]">
                <Link
                  href="/about"
                  className="no-underline text-[#333333] text-base font-medium py-[5px] relative transition-colors duration-300 hover:bg-gradient-to-r hover:from-[var(--accent-color)] hover:to-[var(--primary-color)] hover:bg-clip-text hover:text-transparent
                                             after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px] 
                                                                                              after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Обо мне
                </Link>
              </li>
            </ul>
          </nav>
          {/* Button moved outside nav and pushed to right */}
          <BentoButton
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            size="small"
          >
            Обсудить проект
          </BentoButton>
        </div>
      </header>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
