"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link component

const Footer = () => {
  // Use lazy state initialization: pass a function to useState
  const [currentYear] = useState(() => new Date().getFullYear());

  // Remove the useEffect as it's no longer needed for setting the year
  // useEffect(() => {
  //   setCurrentYear(new Date().getFullYear());
  // }, []);

  return (
    <footer className="main-footer bg-[#1a1a2e] text-[#f0f0f0] pt-[15px] pb-[10px] text-[15px]">
      <div className="container">
        <div className="footer-top flex items-center justify-between pb-2 border-b border-b-[rgba(255,255,255,0.1)] gap-10">
          <div className="footer-brand max-w-[350px] mr-auto">
            <p className="footer-tagline text-[#b0b0b0]">
              AI-универсал для ваших систем
            </p>
          </div>
          <div className="flex-1" /> {/* Spacer 1 */}
          <div className="footer-links">
            <ul className="list-none p-0 m-0 flex justify-center gap-5">
              <li>
                <Link // Changed to Link
                  href="/services"
                  className="text-[#b0b0b0] no-underline leading-loose transition-colors duration-300 ease-in-out hover:text-[#00C4FF]"
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link // Changed to Link
                  href="/projects"
                  className="text-[#b0b0b0] no-underline leading-loose transition-colors duration-300 ease-in-out hover:text-[#00C4FF]"
                >
                  Проекты
                </Link>
              </li>
              <li>
                <Link // Changed to Link
                  href="/about"
                  className="text-[#b0b0b0] no-underline leading-loose transition-colors duration-300 ease-in-out hover:text-[#00C4FF]"
                >
                  Обо мне
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-[2]" /> {/* Spacer 2 */}
          <div className="footer-social">
            <div className="social-icons flex gap-5">
              <a
                href="https://t.me/knitlx"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link text-[#b0b0b0] no-underline leading-loose transition-colors duration-300 ease-in-out hover:text-[#00C4FF]"
              >
                Telegram
              </a>
              <a
                href="https://wa.me/79154683416"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link text-[#b0b0b0] no-underline leading-loose transition-colors duration-300 ease-in-out hover:text-[#00C4FF]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom text-center pt-2">
          <p className="footer-copyright text-[#888] text-[13px]">
            &copy; {currentYear} Бизнес-ассистент. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
