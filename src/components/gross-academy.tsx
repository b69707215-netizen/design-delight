import type { FormEvent, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

const programs = [
  {
    mark: "01",
    title: "Базовий старт",
    lessons: "8 уроків",
    price: "3600 грн",
    text: "Правила, базова стратегія, тактика й перші впевнені партії.",
  },
  {
    mark: "02",
    title: "Перший хід",
    lessons: "12 уроків",
    price: "5400 грн",
    text: "Дебюти, позиційна логіка та регулярна практика з наставником.",
  },
  {
    mark: "03",
    title: "Впевнений стратег",
    lessons: "16 уроків",
    price: "7000 грн",
    text: "Глибший аналіз дебюту, мідлгейму й техніки закінчень.",
  },
  {
    mark: "04",
    title: "Турнірний форсаж",
    lessons: "16 уроків",
    price: "7500 грн",
    text: "Підготовка до турнірів, розбір партій і психологія гри.",
  },
  {
    mark: "05",
    title: "Шлях гросмейстера",
    lessons: "24 уроки",
    price: "10500 грн",
    text: "Елітна програма з персональним менторством та аналітикою.",
  },
];

const audiences = [
  {
    symbol: "♙",
    title: "Для дітей",
    text: "Перетворюємо навчання на інтелектуальну пригоду, що розвиває увагу й мислення.",
  },
  {
    symbol: "♘",
    title: "Для дорослих",
    text: "Допомагаємо почати з нуля або повернути форму через системний, спокійний прогрес.",
  },
  {
    symbol: "♕",
    title: "Для профі",
    text: "Даємо інструменти серйозної підготовки: аналіз, репертуар і турнірна дисципліна.",
  },
];

const advantages = [
  ["Персональна стратегія", "Адаптуємо темп, цілі та план занять під кожного учня."],
  ["Сучасна екосистема", "Поєднуємо класичну школу, інтерактивну практику та партійний аналіз."],
  ["Глибока аналітика", "Показуємо не тільки помилки, а й логіку сильних рішень."],
];

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  alert("Дякуємо за заявку! Ми невдовзі зв'яжемось з вами.");
  event.currentTarget.reset();
}

export function AcademyHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-royal-border bg-background/85 px-5 py-4 backdrop-blur-xl md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-[0.16em] text-gold md:text-2xl"
        >
          ♔ GROSS ACADEMY
        </Link>
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-cream md:flex">
          <Link
            to="/"
            activeProps={{ className: "text-gold" }}
            className="transition-colors hover:text-gold"
          >
            Головна
          </Link>
          <Link
            to="/programs"
            activeProps={{ className: "text-gold" }}
            className="transition-colors hover:text-gold"
          >
            Програми
          </Link>
          <Link
            to="/about"
            activeProps={{ className: "text-gold" }}
            className="transition-colors hover:text-gold"
          >
            Про нас
          </Link>
          <Link
            to="/contact"
            activeProps={{ className: "text-gold" }}
            className="transition-colors hover:text-gold"
          >
            Контакт
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function AcademyLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <AcademyHeader />
      {children}
      <Footer />
      <button
        type="button"
        onClick={() => alert("AI помічник: Привіт! Як я можу допомогти з GROSS ACADEMY?")}
        aria-label="Відкрити чат"
        className="fixed bottom-6 right-6 z-50 grid size-16 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-2xl text-gold-foreground shadow-gold transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        ♟
      </button>
    </main>
  );
}

export function HomePage() {
  return (
    <AcademyLayout>
      <section className="relative flex min-h-[720px] items-center justify-center px-5 py-20 text-center md:px-10">
        <div className="absolute -right-32 -top-40 size-[560px] rounded-full bg-gold/15 blur-3xl animate-royal-pulse" />
        <div className="absolute bottom-12 left-8 hidden h-56 w-40 rotate-12 border border-royal-border bg-royal-surface/40 shadow-royal animate-float md:block" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.36em] text-gold">
            Твій шлях до гросмейстерського рівня
          </p>
          <h1 className="text-balance font-display text-5xl font-semibold leading-tight tracking-[0.03em] text-cream md:text-7xl">
            ♔ GROSS ACADEMY
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-warm-muted md:text-xl">
            Навчися стратегії у майстрів спорту, мисли на кілька ходів уперед і перемагай упевнено.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="royal" size="lg">
              <Link to="/contact">Записатися на урок</Link>
            </Button>
            <Button asChild variant="royalOutline" size="lg">
              <Link to="/programs">Подивитись програми</Link>
            </Button>
          </div>
          <AudienceGrid />
        </div>
      </section>
    </AcademyLayout>
  );
}

function AudienceGrid() {
  return (
    <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3">
      {audiences.map((item) => (
        <article
          key={item.title}
          className="group rounded-xl border border-royal-border bg-royal-surface p-7 text-left shadow-royal transition-all hover:-translate-y-2 hover:border-gold hover:bg-royal-surface-strong"
        >
          <div className="mb-5 text-5xl text-gold transition-transform group-hover:scale-110">
            {item.symbol}
          </div>
          <h2 className="text-xl font-semibold text-gold">{item.title}</h2>
          <p className="mt-3 text-sm leading-7 text-warm-muted">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

export function ProgramsPage() {
  return (
    <AcademyLayout>
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <SectionTitle kicker="Навчання" title="Програми шахового росту" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.title}
              className="rounded-xl border border-royal-border bg-[image:var(--gradient-surface)] p-8 shadow-royal transition-all hover:-translate-y-2 hover:border-gold hover:shadow-gold"
            >
              <div className="text-sm font-semibold tracking-[0.35em] text-gold">
                {program.mark}
              </div>
              <h2 className="mt-8 text-2xl font-semibold text-gold">{program.title}</h2>
              <p className="mt-2 text-sm text-warm-muted">{program.lessons}</p>
              <p className="mt-5 text-3xl font-semibold text-cream">{program.price}</p>
              <p className="mt-5 text-sm leading-7 text-warm-muted">{program.text}</p>
            </article>
          ))}
        </div>
        <ContactForm compact title="Виберіть програму" />
      </section>
    </AcademyLayout>
  );
}

export function AboutPage() {
  return (
    <AcademyLayout>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-gold">
            Про академію
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-cream md:text-6xl">
            Ми не вчимо просто пересувати фігури
          </h1>
          <p className="mt-7 text-lg leading-9 text-warm-muted">
            Gross Academy — це екосистема інтелектуального розвитку, де шахи стають мовою
            стратегічного мислення, дисципліни й впевнених рішень.
          </p>
          <div className="mt-10 grid gap-5">
            {advantages.map(([title, text]) => (
              <article key={title} className="border-l-4 border-gold bg-gold/5 p-5">
                <h2 className="font-semibold text-gold">{title}</h2>
                <p className="mt-2 text-sm leading-7 text-warm-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="grid min-h-[420px] place-items-center rounded-xl border border-royal-border bg-gold/10 text-[10rem] text-gold/35 shadow-royal">
          ♔
        </div>
      </section>
    </AcademyLayout>
  );
}

export function ContactPage() {
  return (
    <AcademyLayout>
      <section className="mx-auto max-w-4xl px-5 py-20 md:px-10">
        <SectionTitle kicker="Запис" title="Залиш свої контакти" />
        <ContactForm title="Пробний урок" />
      </section>
    </AcademyLayout>
  );
}

function ContactForm({ title, compact = false }: { title: string; compact?: boolean }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-12 max-w-2xl rounded-xl border border-royal-border bg-royal-surface-strong p-6 shadow-royal md:p-10"
    >
      <h2 className="mb-7 text-center text-3xl font-semibold text-gold">{title}</h2>
      {compact && (
        <label className="mb-5 block text-sm font-semibold text-gold">
          Програма
          <select
            required
            className="mt-2 h-12 w-full rounded-md border border-royal-border bg-input px-4 text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Виберіть програму</option>
            {programs.map((program) => (
              <option key={program.title}>
                {program.title} — {program.price}
              </option>
            ))}
          </select>
        </label>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Ім'я" placeholder="Ваше ім'я" />
        <FormField label="Прізвище" placeholder="Ваше прізвище" />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <FormField label="Ел. пошта" type="email" placeholder="your@email.com" />
        <FormField label="Телефон" type="tel" placeholder="+38 (0XX) XXX-XX-XX" />
      </div>
      <Button
        type="submit"
        variant="royal"
        size="lg"
        className="mt-8 w-full uppercase tracking-[0.18em]"
      >
        Надіслати
      </Button>
    </form>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-gold">
      {label} *
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-md border border-royal-border bg-input px-4 text-cream placeholder:text-warm-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </label>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-14 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-gold">{kicker}</p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight text-cream md:text-6xl">{title}</h1>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-royal-border px-5 py-12 text-center text-warm-muted md:px-10">
      <h2 className="text-2xl font-semibold tracking-[0.18em] text-gold">GROSS ACADEMY</h2>
      <p className="mt-3">Твій шлях до гросмейстерського рівня</p>
      <p className="mt-6 text-xs">© 2026 Gross Academy. Усі права захищені.</p>
    </footer>
  );
}
