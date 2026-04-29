import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { programs, translations, type Language } from "@/lib/academy-content";
import { useLanguage } from "@/lib/use-language";

type Role = "student" | "teacher";
type Payment = {
  id: string;
  program_title: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  paid_at: string | null;
  created_at: string;
};

function localized<T extends Record<Language, string>>(value: T, language: Language) {
  return value[language];
}

export function AcademyHeader() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 border-b border-royal-border bg-background/85 px-5 py-4 backdrop-blur-xl md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link
          to="/"
          className="font-display text-lg font-semibold tracking-[0.16em] text-gold md:text-2xl"
        >
          ♔ GROSS ACADEMY
        </Link>
        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-cream md:flex">
          <Link
            to="/"
            activeProps={{ className: "text-gold" }}
            className="transition-colors hover:text-gold"
          >
            {t.nav.home}
          </Link>
          <Link
            to="/programs"
            activeProps={{ className: "text-gold" }}
            className="transition-colors hover:text-gold"
          >
            {t.nav.programs}
          </Link>
          <Link
            to="/about"
            activeProps={{ className: "text-gold" }}
            className="transition-colors hover:text-gold"
          >
            {t.nav.about}
          </Link>
          <Link
            to="/contact"
            activeProps={{ className: "text-gold" }}
            className="transition-colors hover:text-gold"
          >
            {t.nav.contact}
          </Link>
          <Link
            to="/dashboard"
            activeProps={{ className: "text-gold" }}
            className="transition-colors hover:text-gold"
          >
            {t.nav.cabinet}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLanguage(language === "uk" ? "en" : "uk")}
            className="rounded-md border border-royal-border bg-royal-surface px-3 py-2 text-xs font-semibold text-cream shadow-royal transition-colors hover:border-gold"
          >
            {language === "uk" ? "EN" : "UK"}
          </button>
          <Button asChild variant="royalOutline" size="sm">
            <Link to="/login">{t.nav.login}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function AcademyLayout({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <AcademyHeader />
      {children}
      <Footer />
      <button
        type="button"
        onClick={() =>
          alert(
            language === "en"
              ? "AI assistant: Hi! How can I help with GROSS ACADEMY?"
              : "AI помічник: Привіт! Як я можу допомогти з GROSS ACADEMY?",
          )
        }
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 grid size-16 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-2xl text-gold-foreground shadow-gold transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        ♟
      </button>
    </main>
  );
}

export function HomePage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <AcademyLayout>
      <section className="relative flex min-h-[720px] items-center justify-center px-5 py-20 text-center md:px-10">
        <div className="absolute -right-32 -top-40 size-[560px] rounded-full bg-gold/15 blur-3xl animate-royal-pulse" />
        <div className="absolute bottom-12 left-8 hidden h-56 w-40 rotate-12 border border-royal-border bg-royal-surface/40 shadow-royal animate-float md:block" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.36em] text-gold">
            {t.heroKicker}
          </p>
          <h1 className="text-balance font-display text-5xl font-semibold leading-tight tracking-[0.03em] text-cream md:text-7xl">
            ♔ GROSS ACADEMY
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-warm-muted md:text-xl">
            {t.heroText}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="royal" size="lg">
              <Link to="/contact">{t.ctaTrial}</Link>
            </Button>
            <Button asChild variant="royalOutline" size="lg">
              <Link to="/programs">{t.ctaPrograms}</Link>
            </Button>
          </div>
          <AudienceGrid />
        </div>
      </section>
    </AcademyLayout>
  );
}

function AudienceGrid() {
  const { language } = useLanguage();
  return (
    <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3">
      {translations[language].audiences.map(([symbol, title, text]) => (
        <article
          key={title}
          className="group rounded-xl border border-royal-border bg-royal-surface p-7 text-left shadow-royal transition-all hover:-translate-y-2 hover:border-gold hover:bg-royal-surface-strong"
        >
          <div className="mb-5 text-5xl text-gold transition-transform group-hover:scale-110">
            {symbol}
          </div>
          <h2 className="text-xl font-semibold text-gold">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-warm-muted">{text}</p>
        </article>
      ))}
    </div>
  );
}

export function ProgramsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <AcademyLayout>
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <SectionTitle kicker={t.programsKicker} title={t.programsTitle} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.slug}
              className="rounded-xl border border-royal-border bg-[image:var(--gradient-surface)] p-8 shadow-royal transition-all hover:-translate-y-2 hover:border-gold hover:shadow-gold"
            >
              <div className="text-sm font-semibold tracking-[0.35em] text-gold">
                {program.mark}
              </div>
              <h2 className="mt-8 text-2xl font-semibold text-gold">
                {localized(program.title, language)}
              </h2>
              <p className="mt-2 text-sm text-warm-muted">{localized(program.lessons, language)}</p>
              <p className="mt-5 text-3xl font-semibold text-cream">
                {localized(program.price, language)}
              </p>
              <p className="mt-5 text-sm leading-7 text-warm-muted">
                {localized(program.text, language)}
              </p>
              <Button asChild variant="royal" className="mt-7 w-full">
                <Link to="/login">{language === "en" ? "Enroll" : "Записатися"}</Link>
              </Button>
            </article>
          ))}
        </div>
        <ContactForm compact title={t.chooseProgram} />
      </section>
    </AcademyLayout>
  );
}

export function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <AcademyLayout>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-gold">
            {t.aboutKicker}
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-cream md:text-6xl">
            {t.aboutTitle}
          </h1>
          <p className="mt-7 text-lg leading-9 text-warm-muted">{t.aboutText}</p>
          <div className="mt-10 grid gap-5">
            {t.advantages.map(([title, text]) => (
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
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <AcademyLayout>
      <section className="mx-auto max-w-4xl px-5 py-20 md:px-10">
        <SectionTitle kicker={t.contactKicker} title={t.contactTitle} />
        <ContactForm title={t.trialLesson} />
      </section>
    </AcademyLayout>
  );
}

export function LoginPage() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<Role>("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const copy =
    language === "en"
      ? {
          title: "Personal account",
          subtitle: "Sign in or create a student/teacher account.",
          signin: "Sign in",
          signup: "Create account",
          password: "Password",
          fullName: "Full name",
          student: "Student",
          teacher: "Teacher",
          google: "Continue with Google",
          success: "Check your email to confirm registration.",
          error: "Something went wrong. Check details and try again.",
        }
      : {
          title: "Особистий кабінет",
          subtitle: "Увійдіть або створіть кабінет учня/вчителя.",
          signin: "Увійти",
          signup: "Створити акаунт",
          password: "Пароль",
          fullName: "Повне ім’я",
          student: "Учень",
          teacher: "Вчитель",
          google: "Продовжити з Google",
          success: "Перевірте пошту, щоб підтвердити реєстрацію.",
          error: "Щось пішло не так. Перевірте дані та спробуйте ще раз.",
        };

  async function saveProfile(userId: string) {
    const name = fullName.trim() || email;
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", userId)
      .limit(1)
      .maybeSingle();
    if (existing) {
      await supabase
        .from("profiles")
        .update({ full_name: name, preferred_language: language })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("profiles")
        .insert({ user_id: userId, full_name: name, preferred_language: language });
    }
    await supabase
      .from("user_roles")
      .upsert({ user_id: userId, role }, { onConflict: "user_id,role" });
  }

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/dashboard",
            data: { full_name: fullName.trim(), role, preferred_language: language },
          },
        });
        if (error) throw error;
        if (data.user && data.session) await saveProfile(data.user.id);
        setMessage(copy.success);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/dashboard";
      }
    } catch {
      setMessage(copy.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AcademyLayout>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-gold">
            GROSS ACADEMY
          </p>
          <h1 className="mt-5 text-4xl font-semibold text-cream md:text-6xl">{copy.title}</h1>
          <p className="mt-6 text-lg leading-8 text-warm-muted">{copy.subtitle}</p>
          <button
            type="button"
            onClick={() => setLanguage(language === "uk" ? "en" : "uk")}
            className="mt-8 rounded-md border border-royal-border bg-royal-surface px-4 py-2 text-sm font-semibold text-cream shadow-royal hover:border-gold"
          >
            {language === "uk" ? "English" : "Українська"}
          </button>
        </div>
        <form
          onSubmit={handleAuth}
          className="rounded-xl border border-royal-border bg-royal-surface-strong p-6 shadow-royal md:p-10"
        >
          <div className="mb-7 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={mode === "signin" ? "royal" : "royalOutline"}
              onClick={() => setMode("signin")}
            >
              {copy.signin}
            </Button>
            <Button
              type="button"
              variant={mode === "signup" ? "royal" : "royalOutline"}
              onClick={() => setMode("signup")}
            >
              {copy.signup}
            </Button>
          </div>
          {mode === "signup" && (
            <FormField
              label={copy.fullName}
              placeholder={copy.fullName}
              value={fullName}
              onChange={setFullName}
            />
          )}
          <FormField
            label="Email"
            placeholder="your@email.com"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <FormField
            label={copy.password}
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={setPassword}
          />
          {mode === "signup" && (
            <label className="mt-5 block text-sm font-semibold text-gold">
              {language === "en" ? "Role" : "Роль"}
              <select
                value={role}
                onChange={(event) => setRole(event.target.value as Role)}
                className="mt-2 h-12 w-full rounded-md border border-royal-border bg-input px-4 text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="student">{copy.student}</option>
                <option value="teacher">{copy.teacher}</option>
              </select>
            </label>
          )}
          {message && (
            <p className="mt-5 rounded-md border border-royal-border bg-royal-surface p-4 text-sm text-warm-muted">
              {message}
            </p>
          )}
          <Button
            disabled={loading}
            type="submit"
            variant="royal"
            size="lg"
            className="mt-8 w-full"
          >
            {mode === "signin" ? copy.signin : copy.signup}
          </Button>
          <Button
            type="button"
            variant="royalOutline"
            size="lg"
            className="mt-3 w-full"
            onClick={() =>
              lovable.auth.signInWithOAuth("google", {
                redirect_uri: window.location.origin + "/dashboard",
              })
            }
          >
            {copy.google}
          </Button>
        </form>
      </section>
    </AcademyLayout>
  );
}

export function DashboardPage() {
  const { language, setLanguage } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [profileMessage, setProfileMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const copy =
    language === "en"
      ? {
          title: "My cabinet",
          profile: "Profile",
          payments: "Payment history",
          name: "Full name",
          role: "Role",
          language: "Language",
          save: "Save profile",
          saved: "Profile changes saved.",
          logout: "Log out",
          empty: "Payments will appear here after checkout.",
          signin: "Sign in to view your cabinet.",
          student: "Student",
          teacher: "Teacher",
          amount: "Amount",
          status: "Status",
        }
      : {
          title: "Мій кабінет",
          profile: "Профіль",
          payments: "Історія оплат",
          name: "Повне ім’я",
          role: "Роль",
          language: "Мова",
          save: "Зберегти профіль",
          saved: "Зміни профілю збережено.",
          logout: "Вийти",
          empty: "Оплати з’являться тут після оформлення замовлення.",
          signin: "Увійдіть, щоб відкрити кабінет.",
          student: "Учень",
          teacher: "Вчитель",
          amount: "Сума",
          status: "Статус",
        };

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUser = sessionData.session?.user ?? null;
      if (!mounted) return;
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
        return;
      }
      const [{ data: profiles }, { data: roles }, { data: history }] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, full_name, preferred_language")
          .eq("user_id", currentUser.id)
          .limit(1),
        supabase.from("user_roles").select("role").eq("user_id", currentUser.id).limit(1),
        supabase
          .from("payment_history")
          .select("id, program_title, amount, currency, status, provider, paid_at, created_at")
          .eq("user_id", currentUser.id)
          .order("created_at", { ascending: false }),
      ]);
      const profile = profiles?.[0];
      const metadataLanguage =
        currentUser.user_metadata?.preferred_language === "en" ? "en" : "uk";
      const metadataRole = currentUser.user_metadata?.role === "teacher" ? "teacher" : "student";
      if (profile) {
        setFullName(profile.full_name);
        if (profile.preferred_language === "en" || profile.preferred_language === "uk")
          setLanguage(profile.preferred_language);
        if (profile.preferred_language === "ru") setLanguage("uk");
      } else {
        await supabase.from("profiles").insert({
          user_id: currentUser.id,
          full_name: currentUser.user_metadata?.full_name || currentUser.email || "",
          preferred_language: metadataLanguage,
        });
        setFullName(currentUser.user_metadata?.full_name || currentUser.email || "");
        setLanguage(metadataLanguage);
      }
      if (roles?.[0]?.role === "teacher" || roles?.[0]?.role === "student") setRole(roles[0].role);
      else {
        await supabase.from("user_roles").insert({ user_id: currentUser.id, role: metadataRole });
        setRole(metadataRole);
      }
      setPayments((history ?? []) as Payment[]);
      setLoading(false);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [setLanguage]);

  const roleLabel = useMemo(
    () => (role === "teacher" ? copy.teacher : copy.student),
    [role, copy.teacher, copy.student],
  );

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    setProfileMessage("");
    const name = fullName.trim() || user.email || "";
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();
    if (existing)
      await supabase
        .from("profiles")
        .update({ full_name: name, preferred_language: language })
        .eq("id", existing.id);
    else
      await supabase
        .from("profiles")
        .insert({ user_id: user.id, full_name: name, preferred_language: language });
    await supabase.from("user_roles").delete().eq("user_id", user.id);
    await supabase.from("user_roles").insert({ user_id: user.id, role });
    setFullName(name);
    setProfileMessage(copy.saved);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <AcademyLayout>
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <SectionTitle kicker={roleLabel} title={copy.title} />
        {!user && !loading ? (
          <div className="mx-auto max-w-xl rounded-xl border border-royal-border bg-royal-surface p-8 text-center shadow-royal">
            <p className="text-warm-muted">{copy.signin}</p>
            <Button asChild variant="royal" className="mt-6">
              <Link to="/login">{translations[language].nav.login}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <form
              onSubmit={saveProfile}
              className="rounded-xl border border-royal-border bg-royal-surface-strong p-6 shadow-royal md:p-8"
            >
              <h2 className="text-2xl font-semibold text-gold">{copy.profile}</h2>
              <FormField
                label={copy.name}
                placeholder={copy.name}
                value={fullName}
                onChange={setFullName}
              />
              <label className="mt-5 block text-sm font-semibold text-gold">
                {copy.role}
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value as Role)}
                  className="mt-2 h-12 w-full rounded-md border border-royal-border bg-input px-4 text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="student">{copy.student}</option>
                  <option value="teacher">{copy.teacher}</option>
                </select>
              </label>
              <label className="mt-5 block text-sm font-semibold text-gold">
                {copy.language}
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value as Language)}
                  className="mt-2 h-12 w-full rounded-md border border-royal-border bg-input px-4 text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="uk">Українська</option>
                  <option value="en">English</option>
                </select>
              </label>
              <Button type="submit" variant="royal" size="lg" className="mt-8 w-full">
                {copy.save}
              </Button>
              <Button
                type="button"
                variant="royalOutline"
                size="lg"
                className="mt-3 w-full"
                onClick={logout}
              >
                {copy.logout}
              </Button>
            </form>
            <div className="rounded-xl border border-royal-border bg-royal-surface p-6 shadow-royal md:p-8">
              <h2 className="text-2xl font-semibold text-gold">{copy.payments}</h2>
              <div className="mt-6 grid gap-4">
                {payments.length === 0 ? (
                  <p className="text-sm text-warm-muted">{copy.empty}</p>
                ) : (
                  payments.map((payment) => (
                    <article
                      key={payment.id}
                      className="rounded-md border border-royal-border bg-royal-surface-strong p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-semibold text-cream">{payment.program_title}</h3>
                        <span className="text-sm font-semibold text-gold">{payment.status}</span>
                      </div>
                      <p className="mt-3 text-sm text-warm-muted">
                        {copy.amount}: {payment.amount} {payment.currency} · {payment.provider}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </AcademyLayout>
  );
}

function ContactForm({ title, compact = false }: { title: string; compact?: boolean }) {
  const { language } = useLanguage();
  const t = translations[language];
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert(t.form.success);
    event.currentTarget.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-12 max-w-2xl rounded-xl border border-royal-border bg-royal-surface-strong p-6 shadow-royal md:p-10"
    >
      <h2 className="mb-7 text-center text-3xl font-semibold text-gold">{title}</h2>
      {compact && (
        <label className="mb-5 block text-sm font-semibold text-gold">
          {t.form.program}
          <select
            required
            className="mt-2 h-12 w-full rounded-md border border-royal-border bg-input px-4 text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">{t.chooseProgram}</option>
            {programs.map((program) => (
              <option key={program.slug}>
                {localized(program.title, language)} — {localized(program.price, language)}
              </option>
            ))}
          </select>
        </label>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label={t.form.name} placeholder={t.form.name} />
        <FormField label={t.form.surname} placeholder={t.form.surname} />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <FormField label={t.form.email} type="email" placeholder="your@email.com" />
        <FormField label={t.form.phone} type="tel" placeholder="+38 (0XX) XXX-XX-XX" />
      </div>
      <Button
        type="submit"
        variant="royal"
        size="lg"
        className="mt-8 w-full uppercase tracking-[0.18em]"
      >
        {t.form.submit}
      </Button>
    </form>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="mt-5 block text-sm font-semibold text-gold">
      {label} *
      <input
        required
        type={type}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
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
  const { language } = useLanguage();
  return (
    <footer className="border-t border-royal-border px-5 py-12 text-center text-warm-muted md:px-10">
      <h2 className="text-2xl font-semibold tracking-[0.18em] text-gold">GROSS ACADEMY</h2>
      <p className="mt-3">{translations[language].footer}</p>
      <p className="mt-6 text-xs">
        © 2026 Gross Academy. {language === "en" ? "All rights reserved." : "Усі права захищені."}
      </p>
    </footer>
  );
}
