'use client';

import { useState } from 'react';
import GradientBorderButton from '../components/GradientBorderButton';
import ContactModal from '../components/ContactModal';

const servicesData = [
  {
    title: 'Автоматизации и AI-решения',
    description: 'Проектирую и внедряю автоматизации, которые снимают ручную работу и упрощают ежедневные процессы.',
    when: [
      'много ручных и повторяющихся задач',
      'данные приходится переносить между сервисами вручную',
      'процессы есть, но они не связаны между собой',
      'хочется использовать AI в работе, но непонятно, как',
    ],
    what: [
      'разбираю текущие процессы и их логику',
      'предлагаю варианты автоматизации',
      'разрабатываю сценарии и логику решений',
      'интегрирую AI-инструменты в рабочие процессы',
      'внедряю и адаптирую автоматизации под реальные задачи',
    ],
    result: 'Автоматизированный процесс, который работает в реальных условиях и действительно снимает рутину.',
  },
  {
    title: 'Систематизация и цифровая структура',
    description: 'Навожу порядок в информации и процессах — часто это первый шаг перед автоматизацией.',
    when: [
      'задачи и данные разрознены',
      'нет понятной структуры процессов',
      'сложно передавать знания внутри команды',
      'автоматизация пока невозможна без наведения порядка',
    ],
    what: [
      'структурирую информацию и данные',
      'создаю базы знаний, регламенты и инструкции',
      'выстраиваю логику процессов',
      'подготавливаю основу для дальнейших автоматизаций',
    ],
    result: 'Понятная и удобная структура, на которую можно опираться в работе и развитии.',
  },
  {
    title: 'Мини-инструменты и прототипы',
    description: 'Создаю небольшие инструменты под конкретные задачи — без лишней сложности.',
    when: [
      'нужен инструмент под одну конкретную задачу',
      'не хочется запускать большой проект',
      'нужен быстрый и понятный результат',
    ],
    what: [
      'собираю ботов, мини-приложения или скрипты',
      'создаю вспомогательные интерфейсы и утилиты',
      'адаптирую инструмент под реальный сценарий использования',
    ],
    result: 'Рабочий инструмент, который решает конкретную задачу и не требует сложной поддержки.',
  },
  {
    title: 'Разобраться и навести порядок',
    description: 'Подходит, если задача пока не сформулирована или всё выглядит слишком хаотично.',
    when: [
      'непонятно, с чего начать',
      'процессов много, но они не описаны',
      'сложно определить, что стоит автоматизировать',
      'нужен взгляд со стороны и логика',
    ],
    what: [
        'разбираю текущую ситуацию и контекст',
        'структурирую информацию и задачи',
        'предлагаю варианты решений и дальнейших шагов',
    ],
    result: 'Ясная картина происходящего и понятный план действий.',
  },
  {
    title: 'Парт-тайм и сопровождение',
    description: 'Подключаюсь к проектам на постоянной основе.',
    when: [
        'нужна регулярная работа с автоматизациями',
        'требуется поддержка и развитие процессов',
        'важно, чтобы инструменты продолжали работать и развиваться',
    ],
    what: [
        'поддерживаю и дорабатываю автоматизации',
        'улучшаю процессы по мере роста проекта',
        'помогаю внедрять новые решения',
    ],
    result: 'Стабильно работающие процессы и инструменты без необходимости каждый раз искать нового специалиста.',
  },
];

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-transparent py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-unbounded-fix">
            Как я могу быть полезна
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Я подключаюсь к задачам, где нужно навести цифровой порядок, автоматизировать процессы или разобраться в хаосе. Можно прийти с конкретным запросом или просто описать ситуацию — я помогу разложить её и собрать рабочее решение.
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-12">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-[0_0_50px_rgba(123,104,238,0.1)]">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold font-unbounded-fix text-gray-900">
                  <span className="text-[#AB5EED]">{`${index + 1}. `}</span>{service.title}
                </h2>
                <p className="mt-2 text-lg text-gray-700 italic">{service.description}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Когда это нужно:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {service.when.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Что я делаю:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {service.what.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800">Результат:</h3>
                  <p className="mt-2 text-gray-700 bg-green-50 border border-green-200 p-4 rounded-md shadow-sm">
                    {service.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-7xl mx-auto text-center bg-white p-10 rounded-xl shadow-[0_0_50px_rgba(123,104,238,0.1)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-unbounded-fix text-gray-900">
              Не уверены, с чего начать?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Можно просто описать ситуацию или задачу. Я помогу разобраться и предложу подходящий формат работы.
            </p>
            <div className="mt-8">
              <GradientBorderButton onClick={() => setIsModalOpen(true)}>
                Написать мне
              </GradientBorderButton>
            </div>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}