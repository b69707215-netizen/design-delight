import { createFileRoute } from "@tanstack/react-router";

import { DashboardPage } from "@/components/gross-academy";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Кабинет — Gross Academy" },
      {
        name: "description",
        content: "Профиль, язык и история оплат ученика или учителя Gross Academy.",
      },
      { property: "og:title", content: "Кабинет — Gross Academy" },
      {
        property: "og:description",
        content: "Просматривайте профиль, роль, язык и историю оплат.",
      },
    ],
  }),
  component: DashboardPage,
});
