import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/gross-academy";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Про академію — Gross Academy" },
      {
        name: "description",
        content:
          "Преміальна шахова школа з індивідуальним підходом і сучасною екосистемою навчання.",
      },
      { property: "og:title", content: "Про академію — Gross Academy" },
      {
        property: "og:description",
        content:
          "Преміальна шахова школа з індивідуальним підходом і сучасною екосистемою навчання.",
      },
    ],
  }),
  component: AboutPage,
});
