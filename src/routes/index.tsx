import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/gross-academy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gross Academy — шахматная школа" },
      {
        name: "description",
        content: "Обучение шахматам с мастерами спорта, персональными программами и турнирной подготовкой.",
      },
      { property: "og:title", content: "Gross Academy — шахматная школа" },
      {
        property: "og:description",
        content:
          "Навчання шахам із майстрами спорту, персональними програмами та турнірною підготовкою.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <HomePage />;
}
