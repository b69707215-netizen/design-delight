import { createFileRoute } from "@tanstack/react-router";

import { ProgramsPage } from "@/components/gross-academy";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Программы обучения — Gross Academy" },
      {
        name: "description",
        content: "Выберите шахматную программу по уровню, целям и темпу обучения.",
      },
      { property: "og:title", content: "Программы обучения — Gross Academy" },
      {
        property: "og:description",
        content: "Обери шахову програму за рівнем, цілями та темпом навчання.",
      },
    ],
  }),
  component: ProgramsPage,
});
