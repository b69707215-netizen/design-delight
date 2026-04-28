import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/gross-academy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gross Academy — шахова школа" },
      {
        name: "description",
        content: "Преміальна шахова академія для дітей, дорослих і професійних гравців.",
      },
      { property: "og:title", content: "Gross Academy — шахова школа" },
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
