export type Language = "ru" | "en";

export const programs = [
  {
    mark: "01",
    slug: "basic-start",
    amount: 3600,
    title: { ru: "Базовый старт", en: "Basic Start" },
    lessons: { ru: "8 уроков", en: "8 lessons" },
    price: { ru: "3600 грн", en: "UAH 3,600" },
    text: {
      ru: "Правила, базовая стратегия, тактика и первые уверенные партии.",
      en: "Rules, core strategy, tactics, and the first confident games.",
    },
  },
  {
    mark: "02",
    slug: "first-move",
    amount: 5400,
    title: { ru: "Первый ход", en: "First Move" },
    lessons: { ru: "12 уроков", en: "12 lessons" },
    price: { ru: "5400 грн", en: "UAH 5,400" },
    text: {
      ru: "Дебюты, позиционная логика и регулярная практика с наставником.",
      en: "Openings, positional logic, and regular practice with a mentor.",
    },
  },
  {
    mark: "03",
    slug: "confident-strategist",
    amount: 7000,
    title: { ru: "Уверенный стратег", en: "Confident Strategist" },
    lessons: { ru: "16 уроков", en: "16 lessons" },
    price: { ru: "7000 грн", en: "UAH 7,000" },
    text: {
      ru: "Глубокий анализ дебюта, миттельшпиля и техники эндшпиля.",
      en: "Deeper opening, middlegame, and endgame technique analysis.",
    },
  },
  {
    mark: "04",
    slug: "tournament-boost",
    amount: 7500,
    title: { ru: "Турнирный форсаж", en: "Tournament Boost" },
    lessons: { ru: "16 уроков", en: "16 lessons" },
    price: { ru: "7500 грн", en: "UAH 7,500" },
    text: {
      ru: "Подготовка к турнирам, разбор партий и психология игры.",
      en: "Tournament preparation, game review, and chess psychology.",
    },
  },
  {
    mark: "05",
    slug: "grandmaster-path",
    amount: 10500,
    title: { ru: "Путь гроссмейстера", en: "Grandmaster Path" },
    lessons: { ru: "24 урока", en: "24 lessons" },
    price: { ru: "10500 грн", en: "UAH 10,500" },
    text: {
      ru: "Элитная программа с персональным менторством и аналитикой.",
      en: "Elite training with personal mentorship and advanced analytics.",
    },
  },
] as const;

export const translations = {
  ru: {
    nav: {
      home: "Главная",
      programs: "Программы",
      about: "О нас",
      contact: "Контакт",
      cabinet: "Кабинет",
      login: "Войти",
    },
    heroKicker: "Твой путь к гроссмейстерскому уровню",
    heroText:
      "Учись стратегии у мастеров спорта, думай на несколько ходов вперед и побеждай уверенно.",
    ctaTrial: "Записаться на урок",
    ctaPrograms: "Посмотреть программы",
    audiences: [
      [
        "♙",
        "Для детей",
        "Превращаем обучение в интеллектуальное приключение, которое развивает внимание и мышление.",
      ],
      [
        "♘",
        "Для взрослых",
        "Помогаем начать с нуля или вернуть форму через системный, спокойный прогресс.",
      ],
      [
        "♕",
        "Для профи",
        "Даём инструменты серьёзной подготовки: анализ, репертуар и турнирную дисциплину.",
      ],
    ],
    programsKicker: "Обучение",
    programsTitle: "Программы шахматного роста",
    chooseProgram: "Выберите программу",
    aboutKicker: "Об академии",
    aboutTitle: "Мы не учим просто передвигать фигуры",
    aboutText:
      "Gross Academy — это экосистема интеллектуального развития, где шахматы становятся языком стратегического мышления, дисциплины и уверенных решений.",
    advantages: [
      ["Персональная стратегия", "Адаптируем темп, цели и план занятий под каждого ученика."],
      [
        "Современная экосистема",
        "Объединяем классическую школу, интерактивную практику и анализ партий.",
      ],
      ["Глубокая аналитика", "Показываем не только ошибки, но и логику сильных решений."],
    ],
    contactKicker: "Запись",
    contactTitle: "Оставь свои контакты",
    trialLesson: "Пробный урок",
    form: {
      program: "Программа",
      name: "Имя",
      surname: "Фамилия",
      email: "Эл. почта",
      phone: "Телефон",
      submit: "Отправить",
      success: "Спасибо за заявку! Мы скоро свяжемся с вами.",
    },
    footer: "Твой путь к гроссмейстерскому уровню",
  },
  en: {
    nav: {
      home: "Home",
      programs: "Programs",
      about: "About",
      contact: "Contact",
      cabinet: "Cabinet",
      login: "Sign in",
    },
    heroKicker: "Your path to grandmaster-level thinking",
    heroText:
      "Learn strategy from titled coaches, think several moves ahead, and win with confidence.",
    ctaTrial: "Book a lesson",
    ctaPrograms: "View programs",
    audiences: [
      [
        "♙",
        "For children",
        "We turn learning into an intellectual adventure that builds focus and thinking.",
      ],
      [
        "♘",
        "For adults",
        "Start from scratch or return to form through steady, structured progress.",
      ],
      [
        "♕",
        "For advanced players",
        "Get serious tools: analysis, repertoire work, and tournament discipline.",
      ],
    ],
    programsKicker: "Training",
    programsTitle: "Chess growth programs",
    chooseProgram: "Choose a program",
    aboutKicker: "About the academy",
    aboutTitle: "We teach more than moving pieces",
    aboutText:
      "Gross Academy is an intellectual development ecosystem where chess becomes a language of strategic thinking, discipline, and confident decisions.",
    advantages: [
      ["Personal strategy", "We adapt pace, goals, and lesson plans to every student."],
      [
        "Modern ecosystem",
        "We combine classical training, interactive practice, and game analysis.",
      ],
      ["Deep analytics", "We show not only mistakes, but the logic behind strong decisions."],
    ],
    contactKicker: "Enrollment",
    contactTitle: "Leave your contacts",
    trialLesson: "Trial lesson",
    form: {
      program: "Program",
      name: "First name",
      surname: "Last name",
      email: "Email",
      phone: "Phone",
      submit: "Send",
      success: "Thank you! We will contact you soon.",
    },
    footer: "Your path to grandmaster-level thinking",
  },
} as const;
