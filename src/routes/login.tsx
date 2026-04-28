import { createFileRoute } from "@tanstack/react-router";

import { LoginPage } from "@/components/gross-academy";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Личный кабинет — Gross Academy" },
      { name: "description", content: "Вход и регистрация учеников и учителей Gross Academy." },
      { property: "og:title", content: "Личный кабинет — Gross Academy" },
      { property: "og:description", content: "Создайте кабинет ученика или учителя и управляйте профилем." },
    ],
  }),
  component: LoginPage,
});
