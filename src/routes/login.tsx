import { createFileRoute } from "@tanstack/react-router";

import { LoginPage } from "@/components/gross-academy";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Особистий кабінет — Gross Academy" },
      { name: "description", content: "Вхід і реєстрація учнів та вчителів Gross Academy." },
      { property: "og:title", content: "Особистий кабінет — Gross Academy" },
      {
        property: "og:description",
        content: "Створіть кабінет учня або вчителя та керуйте профілем.",
      },
    ],
  }),
  component: LoginPage,
});
