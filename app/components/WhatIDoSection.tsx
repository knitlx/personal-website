import { whatIDo } from "../data/homePageData";
import styles from './WhatIDoSection.module.css';

export default function WhatIDoSection() {
  return (
    <section className="py-8 text-center bg-transparent backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)] mb-[50px]">
        <div className="container">
            <h2 className="font-unbounded-fix text-[36px] font-bold leading-tight text-[#333333] mb-[10px]">Что я делаю</h2>
            <p className="text-base text-[#666] max-w-[800px] mx-auto mb-[30px]">
                Помогаю навести цифровой порядок, создаю автоматизации и настраиваю AI-инструменты под задачи бизнеса.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-fit mx-auto">
                {whatIDo.map((item) => (
                    <div key={item.title} className={`${styles.whatIDoItem} bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden`}>
                        <div className="flex items-center">
                            <img src={item.icon} alt={item.alt} className="what-i-do-icon w-[42px] h-[42px] rounded-full flex items-center justify-center mr-[15px] relative" />
                            <h3 className="what-i-do-item-title text-[20px] font-bold text-[var(--accent-color)] mb-0">{item.title}</h3>
                        </div>
                        <ul className={`${styles.whatIDoList} list-none p-0 mt-[20px] w-full`}>
                            {item.list.map((listItem) => (
                                <li key={listItem} className="text-[15px] text-[#555] leading-tight mb-[6px] relative pl-[20px]">{listItem}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}