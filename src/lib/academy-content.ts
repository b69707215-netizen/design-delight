export type Language = "uk" | "en";

type LocalizedText = Record<Language, string>;

export const programs = [
  {
    mark: "01",
    slug: "basic-start",
    amount: 3600,
    title: { uk: "Базовий старт", en: "Basic Start" },
    lessons: { uk: "8 уроків", en: "8 lessons" },
    price: { uk: "3600 грн", en: "UAH 3,600" },
    text: {
      uk: "Правила, базова стратегія, тактика та перші впевнені партії.",
      en: "Rules, core strategy, tactics, and the first confident games.",
    },
  },
  {
    mark: "02",
    slug: "first-move",
    amount: 5400,
    title: { uk: "Перший хід", en: "First Move" },
    lessons: { uk: "12 уроків", en: "12 lessons" },
    price: { uk: "5400 грн", en: "UAH 5,400" },
    text: {
      uk: "Дебюти, позиційна логіка та регулярна практика з наставником.",
      en: "Openings, positional logic, and regular practice with a mentor.",
    },
  },
  {
    mark: "03",
    slug: "confident-strategist",
    amount: 7000,
    title: { uk: "Впевнений стратег", en: "Confident Strategist" },
    lessons: { uk: "16 уроків", en: "16 lessons" },
    price: { uk: "7000 грн", en: "UAH 7,000" },
    text: {
      uk: "Глибокий аналіз дебюту, мітельшпілю та техніки ендшпілю.",
      en: "Deeper opening, middlegame, and endgame technique analysis.",
    },
  },
  {
    mark: "04",
    slug: "tournament-boost",
    amount: 7500,
    title: { uk: "Турнірний форсаж", en: "Tournament Boost" },
    lessons: { uk: "16 уроків", en: "16 lessons" },
    price: { uk: "7500 грн", en: "UAH 7,500" },
    text: {
      uk: "Підготовка до турнірів, розбір партій та психологія гри.",
      en: "Tournament preparation, game review, and chess psychology.",
    },
  },
  {
    mark: "05",
    slug: "grandmaster-path",
    amount: 10500,
    title: { uk: "Шлях гросмейстера", en: "Grandmaster Path" },
    lessons: { uk: "24 уроки", en: "24 lessons" },
    price: { uk: "10500 грн", en: "UAH 10,500" },
    text: {
      uk: "Елітна програма з персональним менторством та аналітикою.",
      en: "Elite training with personal mentorship and advanced analytics.",
    },
  },
] as const satisfies ReadonlyArray<{
  mark: string;
  slug: string;
  amount: number;
  title: LocalizedText;
  lessons: LocalizedText;
  price: LocalizedText;
  text: LocalizedText;
}>;

export const translations = {
  uk: {
    nav: {
      home: "Головна",
      programs: "Програми",
      about: "Про нас",
      contact: "Контакти",
      cabinet: "Кабінет",
      login: "Увійти",
    },
    heroKicker: "Твій шлях до гросмейстерського рівня",
    heroText:
      "Навчайся стратегії у майстрів спорту, думай на кілька ходів уперед і перемагай впевнено.",
    ctaTrial: "Записатися на урок",
    ctaPrograms: "Переглянути програми",
    audiences: [
      ["♙", "Для дітей", "Перетворюємо навчання на інтелектуальну пригоду, що розвиває увагу й мислення."],
      ["♘", "Для дорослих", "Допомагаємо почати з нуля або повернути форму через системний, спокійний прогрес."],
      ["♕", "Для профі", "Даємо інструменти серйозної підготовки: аналіз, репертуар і турнірну дисципліну."],
    ],
    programsKicker: "Навчання",
    programsTitle: "Програми шахового росту",
    chooseProgram: "Оберіть програму",
    aboutKicker: "Про академію",
    aboutTitle: "Ми не вчимо просто пересувати фігури",
    aboutText:
      "Gross Academy — це екосистема інтелектуального розвитку, де шахи стають мовою стратегічного мислення, дисципліни й упевнених рішень.",
    advantages: [
      ["Персональна стратегія", "Адаптуємо темп, цілі та план занять під кожного учня."],
      ["Сучасна екосистема", "Поєднуємо класичну школу, інтерактивну практику та аналіз партій."],
      ["Глибока аналітика", "Показуємо не лише помилки, а й логіку сильних рішень."],
    ],
    contactKicker: "Запис",
    contactTitle: "Залиш свої контакти",
    trialLesson: "Пробний урок",
    form: {
      program: "Програма",
      name: "Ім’я",
      surname: "Прізвище",
      email: "Ел. пошта",
      phone: "Телефон",
      submit: "Надіслати",
      success: "Дякуємо за заявку! Ми скоро зв’яжемося з вами.",
    },
    footer: "Твій шлях до гросмейстерського рівня",
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
      ["♙", "For children", "We turn learning into an intellectual adventure that builds focus and thinking."],
      ["♘", "For adults", "Start from scratch or return to form through steady, structured progress."],
      ["♕", "For advanced players", "Get serious tools: analysis, repertoire work, and tournament discipline."],
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
      ["Modern ecosystem", "We combine classical training, interactive practice, and game analysis."],
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