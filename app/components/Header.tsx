"use client";

import { useState } from "react";
import Link from "next/link";
import ContactModal from "./ContactModal";
import BentoButton from "./BentoButton";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] sticky top-0 z-50">
        <div className="container flex justify-between items-center">
          <Link
            href="/"
            className="logo font-unbounded-fix text-[20px] font-bold bg-gradient-to-b from-[#9137DF] to-[#6F71F0] bg-clip-text text-transparent transition-colors duration-300 leading-[58px] tracking-[-0.05em] no-underline hover:text-[#7A68EE] hover:!bg-none hover:!bg-clip-content"
          >
            NoChaos
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex main-nav mx-auto">
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
              <li className="ml-[25px]">
                <Link
                  href="/blog"
                  className="no-underline text-[#333333] text-base font-medium py-[5px] relative transition-colors duration-300 hover:bg-gradient-to-r hover:from-[var(--accent-color)] hover:to-[var(--primary-color)] hover:bg-clip-text hover:text-transparent
                                           after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px]
                                                                                            after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Блог
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <BentoButton
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              size="small"
              className="hidden sm:inline-block"
            >
              Обсудить проект
            </BentoButton>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl">
            <nav className="container py-4">
              <ul className="list-none space-y-4">
                <li>
                  <Link
                    href="/services"
                    className="block text-[#333333] text-lg font-medium py-2 no-underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="block text-[#333333] text-lg font-medium py-2 no-underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Проекты
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block text-[#333333] text-lg font-medium py-2 no-underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Обо мне
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="block text-[#333333] text-lg font-medium py-2 no-underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Блог
                  </Link>
                </li>
                <li className="pt-4 border-t border-gray-200">
                  <BentoButton
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    variant="primary"
                    className="w-full"
                  >
                    Обсудить проект
                  </BentoButton>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default Header;
