import { Level } from './types';

// Вспомогательный хелпер для корректной работы путей в билде,
// который может разворачиваться не из корня домена (например, на Яндекс Играх)
export const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

// Пути к вашим локальным файлам в репозитории
// Создайте папку /audio/ в корне и разложите файлы по этим путям
export const AUDIO_ASSETS = {
  music: {
    menu: withBase('audio/music/menu_theme.mp3'),
    game: withBase('audio/music/game_ambient.mp3'),
  },
  sfx: {
    transfer: [
      withBase('audio/sfx/pour_1.mp3'),
      withBase('audio/sfx/pour_2.mp3'),
      withBase('audio/sfx/pour_3.mp3'),
    ],
    sink: [
      withBase('audio/sfx/sink_1.mp3'),
      withBase('audio/sfx/sink_2.mp3'),
      withBase('audio/sfx/sink_3.mp3'),
    ],
    tap: [
      withBase('audio/sfx/tap_1.mp3'),
      withBase('audio/sfx/tap_2.mp3'),
      withBase('audio/sfx/tap_3.mp3'),
    ]
  }
};

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Простая арифметика",
    description: "У вас есть 500 мл и 300 мл. Получите 200 мл в большом кувшине.",
    hasSinkAndTap: false,
    containers: [
      { id: 'c1', name: 'Большой кувшин', capacity: 500, initialAmount: 500 },
      { id: 'c2', name: 'Малый кувшин', capacity: 300, initialAmount: 0 },
    ],
    targets: [
      { containerId: 'c1', amount: 200 }
    ],
    solutionSteps: [
      { 
        description: "Перелейте из большого в малый до краев.", 
        amounts: { 'c1': 200, 'c2': 300 } 
      }
    ]
  },
  {
    id: 2,
    title: "Кран и Раковина",
    description: "Используйте кран, чтобы получить ровно 400 мл.",
    hasSinkAndTap: true,
    containers: [
      { id: 'c1', name: 'Банка', capacity: 500, initialAmount: 0 },
      { id: 'c2', name: 'Стакан', capacity: 300, initialAmount: 0 },
    ],
    targets: [
      { containerId: 'ANY', amount: 400 }
    ],
    solutionSteps: [
      { description: "Наполните банку (500 мл) из крана.", amounts: { 'c1': 500, 'c2': 0 } },
      { description: "Перелейте из банки в стакан.", amounts: { 'c1': 200, 'c2': 300 } },
      { description: "Вылейте воду из стакана в раковину.", amounts: { 'c1': 200, 'c2': 0 } },
      { description: "Перелейте 200 мл из банки в стакан.", amounts: { 'c1': 0, 'c2': 200 } },
      { description: "Снова наполните банку из крана.", amounts: { 'c1': 500, 'c2': 200 } },
      { description: "Долейте из банки в стакан до полного (нужно 100 мл).", amounts: { 'c1': 400, 'c2': 300 } }
    ]
  },
  {
    id: 3,
    title: "Задача Пуассона",
    description: "Отлей половину из сосуда.",
    hasSinkAndTap: false,
    containers: [
      { id: 'c1', name: 'Сосуд', capacity: 1200, initialAmount: 1200 },
      { id: 'c2', name: 'Графин', capacity: 800, initialAmount: 0 },
      { id: 'c3', name: 'Колба', capacity: 500, initialAmount: 0 },
    ],
    targets: [
      { containerId: 'ANY', amount: 600 }
    ],
    solutionSteps: [
      { description: "Из сосуда в графин.", amounts: { 'c1': 400, 'c2': 800, 'c3': 0 } },
{ description: "Из графина в колбу.", amounts: { 'c1': 400, 'c2': 300, 'c3': 500 } },
{ description: "Из колбы в сосуд.", amounts: { 'c1': 900, 'c2': 300, 'c3': 0 } },
{ description: "Из графина в колбу.", amounts: { 'c1': 900, 'c2': 0, 'c3': 300 } },
{ description: "Из графина в колбу.", amounts: { 'c1': 900, 'c2': 0, 'c3': 300 } },
{ description: "Из сосуда в графин.", amounts: { 'c1': 100, 'c2': 800, 'c3': 300 } },
{ description: "Из графина в колбу.", amounts: { 'c1': 100, 'c2': 600, 'c3': 500 } },
    ]
  },
  {
    id: 4,
    title: "Три сосуда",
    description: "Разделите 800 мл поровну между бидоном и кувшином.",
    hasSinkAndTap: false,
    containers: [
      { id: 'c1', name: 'Бидон', capacity: 800, initialAmount: 800 },
      { id: 'c2', name: 'Кувшин', capacity: 500, initialAmount: 0 },
      { id: 'c3', name: 'Кружка', capacity: 300, initialAmount: 0 },
    ],
    targets: [
      { containerId: 'c1', amount: 400 },
      { containerId: 'c2', amount: 400 }
    ],
    solutionSteps: [
      { description: "Из бидона в кувшин.", amounts: { 'c1': 300, 'c2': 500, 'c3': 0 } },
      { description: "Из кувшина в кружку.", amounts: { 'c1': 300, 'c2': 200, 'c3': 300 } },
      { description: "Из кружки в бидон.", amounts: { 'c1': 600, 'c2': 200, 'c3': 0 } },
      { description: "Из кувшина в кружку.", amounts: { 'c1': 600, 'c2': 0, 'c3': 200 } },
      { description: "Из бидона в кувшин.", amounts: { 'c1': 100, 'c2': 500, 'c3': 200 } },
      { description: "Из кувшина в кружку (до полной).", amounts: { 'c1': 100, 'c2': 400, 'c3': 300 } },
      { description: "Из кружки в бидон.", amounts: { 'c1': 400, 'c2': 400, 'c3': 0 } }
    ]
  },
  {
    id: 5,
    title: "Ведро, бидон и кувшин!",
    description: "Получи 500 мл в любом сосуде.",
    hasSinkAndTap: true,
    containers: [
      { id: 'c1', name: 'Ведро', capacity: 2000, initialAmount: 0 },
      { id: 'c2', name: 'Бидон', capacity: 700, initialAmount: 0 },
      { id: 'c3', name: 'Кастрюля', capacity: 300, initialAmount: 0 },
    ],
    targets: [
      { containerId: 'ANY', amount: 500 }
    ],
    solutionSteps: [
      { description: "Наполняем бидон из крана.", amounts: { 'c1': 0, 'c2': 700, 'c3': 0 } },
      { description: "Из бидона в кастрюлю.", amounts: { 'c1': 0, 'c2': 400, 'c3': 300 } },
      { description: "Из бидона в ведро.", amounts: { 'c1': 400, 'c2': 0, 'c3': 300 } },
      { description: "Снова наполняем бидон из крана.", amounts: { 'c1': 400, 'c2': 700, 'c3': 300 } },
      { description: "Выливаем все из кастрюли в раковину.", amounts: { 'c1': 400, 'c2': 700, 'c3': 0 } },
      { description: "Снова из бидона в кастрюлю.", amounts: { 'c1': 400, 'c2': 400, 'c3': 300 } },
      { description: "Снова выливаем все из кастрюли в раковину.", amounts: { 'c1': 400, 'c2': 400, 'c3': 0 } },
      { description: "Из бидона в кастрюлю", amounts: { 'c1': 400, 'c2': 100, 'c3': 300 } },
      { description: "Из бидона в ведро", amounts: { 'c1': 500, 'c2': 0, 'c3': 300 } }
    ]
  },
  {
    id: 6,
    title: "Поход в баню",
    description: "Две компании собираются в баню. Нужно выделить каждой по 800 мл воды.",
    hasSinkAndTap: false,
    containers: [
      { id: 'c1', name: 'Ведро', capacity: 1600, initialAmount: 1600 },
      { id: 'c2', name: 'Кадка', capacity: 1100, initialAmount: 0 },
      { id: 'c3', name: 'Канистра', capacity: 600, initialAmount: 0 },
    ],
    targets: [
      { containerId: 'c1', amount: 800 },
      { containerId: 'c2', amount: 800 }
    ],
    solutionSteps: [
      { description: "Из ведра в канистру.", amounts: { 'c1': 1000, 'c2': 0, 'c3': 600 } },
      { description: "Из канистры в кадку.", amounts: { 'c1': 1000, 'c2': 600, 'c3': 0 } },
      { description: "Из ведра в канистру.", amounts: { 'c1': 400, 'c2': 600, 'c3': 600 } },
      { description: "Из канистры в кадку.", amounts: { 'c1': 400, 'c2': 1100, 'c3': 100 } },
      { description: "Из кадки в ведро.", amounts: { 'c1': 1500, 'c2': 0, 'c3': 100 } },
      { description: "Из канистры в кадку.", amounts: { 'c1': 1500, 'c2': 100, 'c3': 0 } },
      { description: "Из ведра в канистру.", amounts: { 'c1': 900, 'c2': 100, 'c3': 600 } },
      { description: "Из канистры в кадку.", amounts: { 'c1': 900, 'c2': 700, 'c3': 0 } },
      { description: "Из ведра в канистру.", amounts: { 'c1': 300, 'c2': 700, 'c3': 600 } },
      { description: "Из канистры в кадку.", amounts: { 'c1': 300, 'c2': 1100, 'c3': 200 } },
      { description: "Из кадки в ведро.", amounts: { 'c1': 1400, 'c2': 0, 'c3': 200 } },
      { description: "Из канистры в кадку.", amounts: { 'c1': 1400, 'c2': 200, 'c3': 0 } },
      { description: "Из ведра в канистру.", amounts: { 'c1': 800, 'c2': 200, 'c3': 600 } },
      { description: "Из канистры в кадку.", amounts: { 'c1': 800, 'c2': 800, 'c3': 0 } }
    ]
  },
  {
    id: 7,
    title: "Загадка про квас",
    description: "Ты торгуешь квасом из двух бочек, к тебе подршло три покупателя со своей тарой. Они хотят купить по два литра.",
    hasSinkAndTap: true,
    containers: [
      { id: 'c1', name: 'Канистра', capacity: 5000, initialAmount: 0 },
      { id: 'c2', name: 'Бутылка', capacity: 3000, initialAmount: 0 },
      { id: 'c3', name: 'Бидон', capacity: 4000, initialAmount: 0 },
      { id: 'c4', name: 'Первая бочка', capacity: 50000, initialAmount: 50000 },
      { id: 'c5', name: 'Вторая бочка', capacity: 50000, initialAmount: 50000 },
    ],
    targets: [
      { containerId: 'c1', amount: 2000 },
      { containerId: 'c2', amount: 2000 },
      { containerId: 'c3', amount: 2000 }
    ],
    solutionSteps: [
      { description: "Первый ход.", amounts: { 'c1': 0, 'c2': 3000, 'c3': 4000, 'c4': 46000, 'c5': 47000 } },
{ description: "Второй ход.", amounts: { 'c1': 5000, 'c2': 0, 'c3': 2000, 'c4': 46000, 'c5': 47000 } },
{ description: "Третий ход.", amounts: { 'c1': 2000, 'c2': 3000, 'c3': 2000, 'c4': 46000, 'c5': 47000 } },
{ description: "Четвертый ход.", amounts: { 'c1': 0, 'c2': 3000, 'c3': 2000, 'c4': 46000, 'c5': 49000 } },
{ description: "Пятый ход.", amounts: { 'c1': 3000, 'c2': 0, 'c3': 2000, 'c4': 46000, 'c5': 49000 } },
{ description: "Шестой ход.", amounts: { 'c1': 5000, 'c2': 0, 'c3': 2000, 'c4': 44000, 'c5': 49000 } },
{ description: "Седьмой ход.", amounts: { 'c1': 2000, 'c2': 3000, 'c3': 2000, 'c4': 44000, 'c5': 49000 } },
{ description: "Восьмой ход.", amounts: { 'c1': 2000, 'c2': 2000, 'c3': 2000, 'c4': 44000, 'c5': 50000 } }
    ]
  },
  {
    id: 8,
    title: "Молоко",
    description: "Нужно поделить молоко по ровну.",
    hasSinkAndTap: false,
    containers: [
      { id: 'c1', name: 'Бочка', capacity: 1400, initialAmount: 1400 },
      { id: 'c2', name: 'Бидон', capacity: 900, initialAmount: 0 },
      { id: 'c3', name: 'Кувшин', capacity: 500, initialAmount: 0 },
    ],
    targets: [
      { containerId: 'c1', amount: 700 },
      { containerId: 'c2', amount: 700 }
    ],
    solutionSteps: [
      { description: "Из бочки в кувшин.", amounts: { 'c1': 900, 'c2': 0, 'c3': 500 } },
{ description: "Из кувшина в бидон.", amounts: { 'c1': 900, 'c2': 500, 'c3': 0 } },
{ description: "Из бочки в кувшин.", amounts: { 'c1': 400, 'c2': 500, 'c3': 500 } },
{ description: "Из кувшина в бидон.", amounts: { 'c1': 400, 'c2': 900, 'c3': 100 } },
{ description: "Из бидона в бочку.", amounts: { 'c1': 1300, 'c2': 0, 'c3': 100 } },
{ description: "Из кувшина в бидон.", amounts: { 'c1': 1300, 'c2': 100, 'c3': 0 } },
{ description: "Из бочки в кувшин.", amounts: { 'c1': 800, 'c2': 100, 'c3': 500 } },
{ description: "Из кувшина в бидон.", amounts: { 'c1': 800, 'c2': 600, 'c3': 0 } },
{ description: "Из бочки в кувшин.", amounts: { 'c1': 300, 'c2': 600, 'c3': 500 } },
{ description: "Из кувшина в бидон.", amounts: { 'c1': 300, 'c2': 900, 'c3': 200 } },
{ description: "Из бидона в бочку.", amounts: { 'c1': 1200, 'c2': 0, 'c3': 200 } },
{ description: "Из кувшина в бидон.", amounts: { 'c1': 1200, 'c2': 200, 'c3': 0 } },
{ description: "Из бочки в кувшин.", amounts: { 'c1': 700, 'c2': 200, 'c3': 500 } },
{ description: "Из кувшина в бидон.", amounts: { 'c1': 700, 'c2': 700, 'c3': 0 } }
    ]
  },
  {
    id: 9,
    title: "Вино",
    description: "К тебе пришел сосед и просит 5 литров вина. Найди способ его налить.",
    hasSinkAndTap: false,
    containers: [
      { id: 'c1', name: 'Бочка', capacity: 20000, initialAmount: 20000 },
      { id: 'c2', name: 'Ведро', capacity: 7000, initialAmount: 0 },
      { id: 'c3', name: 'Амфора', capacity: 13000, initialAmount: 0 },
    ],
    targets: [
      { containerId: 'ANY', amount: 5000 }
    ],
    solutionSteps: [
      { description: "Из бочки в амфору.", amounts: { 'c1': 7000, 'c2': 0, 'c3': 13000 } },
{ description: "Из амфоры в ведро.", amounts: { 'c1': 7000, 'c2': 7000, 'c3': 6000 } },
{ description: "Из ведра в бочку.", amounts: { 'c1': 14000, 'c2': 0, 'c3': 6000 } },
{ description: "Из амфоры в ведро.", amounts: { 'c1': 14000, 'c2': 6000, 'c3': 0 } },
{ description: "Из бочки в амфору.", amounts: { 'c1': 1000, 'c2': 6000, 'c3': 13000 } },
{ description: "Из амфоры в ведро.", amounts: { 'c1': 1000, 'c2': 7000, 'c3': 12000 } },
{ description: "Из ведра в бочку.", amounts: { 'c1': 8000, 'c2': 0, 'c3': 12000 } },
{ description: "Из амфоры в ведро.", amounts: { 'c1': 8000, 'c2': 7000, 'c3': 5000 } }
    ]
  }
];
