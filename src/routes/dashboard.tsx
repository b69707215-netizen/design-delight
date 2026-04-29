import { createFileRoute } from "@tanstack/react-router";

import { DashboardPage } from "@/components/gross-academy";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Кабінет — Gross Academy" },
      {
        name: "description",
        content: "Профіль, мова та історія оплат учня або вчителя Gross Academy.",
      },
      { property: "og:title", content: "Кабінет — Gross Academy" },
      {
        property: "og:description",
        content: "Переглядайте профіль, роль, мову та історію оплат.",
      },
    ],
  }),
  component: DashboardPage,
});
