import { Level } from './types';

// Ссылки на аудио-ресурсы (можно заменить на реальные URL)
export const AUDIO_ASSETS = {
  music: {
    menu: 'https://actions.google.com/sounds/v1/ambiences/morning_birds.ogg', // Плейсхолдер для меню
    game: 'https://actions.google.com/sounds/v1/ambiences/spring_village.ogg', // Плейсхолдер для игры
  },
  sfx: {
    transfer: [
      'https://actions.google.com/sounds/v1/water/pouring_water_into_cup.ogg',
      'https://actions.google.com/sounds/v1/water/water_splash.ogg',
      'https://actions.google.com/sounds/v1/water/glug_glug_glug.ogg',
    ],
    sink: [
      'https://actions.google.com/sounds/v1/water/water_pouring_in_sink.ogg',
      'https://actions.google.com/sounds/v1/water/draining_sink.ogg',
      'https://actions.google.com/sounds/v1/water/sink_drain_gurgle.ogg',
    ],
    tap: [
      'https://actions.google.com/sounds/v1/water/running_tap.ogg',
      'https://actions.google.com/sounds/v1/water/fill_water_bucket.ogg',
      'https://actions.google.com/sounds/v1/water/water_tap_on.ogg',
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
  }
];