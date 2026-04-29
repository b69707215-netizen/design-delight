import { createFileRoute } from "@tanstack/react-router";

import { ProgramsPage } from "@/components/gross-academy";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Програми навчання — Gross Academy" },
      {
        name: "description",
        content: "Оберіть шахову програму за рівнем, цілями та темпом навчання.",
      },
      { property: "og:title", content: "Програми навчання — Gross Academy" },
      {
        property: "og:description",
        content: "Обери шахову програму за рівнем, цілями та темпом навчання.",
      },
    ],
  }),
  component: ProgramsPage,
});
