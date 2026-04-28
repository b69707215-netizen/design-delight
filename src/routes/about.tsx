import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/gross-academy";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О академии — Gross Academy" },
      {
        name: "description",
        content:
          "Премиальная шахматная школа с индивидуальным подходом и современной экосистемой обучения.",
      },
      { property: "og:title", content: "О академии — Gross Academy" },
      {
        property: "og:description",
        content:
          "Преміальна шахова школа з індивідуальним підходом і сучасною екосистемою навчання.",
      },
    ],
  }),
  component: AboutPage,
});
