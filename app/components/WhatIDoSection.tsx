import { memo } from "react";
import { whatIDo } from "../data/homePageData";
import styles from "./WhatIDoSection.module.css";
import Image from "next/image"; // Added Image import

function WhatIDoSection() {
  return (
    <section className="bg-[#F9FAFB] py-8 text-center mb-[50px]">
      <div className="container">
        <h2 className="font-unbounded-fix text-[36px] font-medium leading-tight text-[#333333] mb-[10px]">
          Что я делаю
        </h2>
        <p className="text-base text-[#666] max-w-[800px] mx-auto mb-[30px]">
          Помогаю навести цифровой порядок, создаю автоматизации и настраиваю
          AI-инструменты под задачи бизнеса.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-fit mx-auto">
          {whatIDo.map((item) => (
            <div
              key={item.title}
              className={`${styles.whatIDoItem} bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden`}
            >
              <div className="flex items-center">
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={42}
                  height={42}
                  sizes="42px"
                  className="what-i-do-icon w-[42px] h-[42px] flex items-center justify-center mr-[15px] relative"
                />
                <h3 className="what-i-do-item-title text-[18px] font-semibold text-[#333333] mb-0">
                  {item.title}
                </h3>
              </div>
              <ul
                className={`${styles.whatIDoList} list-none p-0 mt-[20px] w-full`}
              >
                {item.list.map((listItem) => (
                  <li
                    key={listItem}
                    className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]"
                  >
                    {listItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(WhatIDoSection);
