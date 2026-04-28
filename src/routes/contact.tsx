import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/gross-academy";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Запись на урок — Gross Academy" },
      {
        name: "description",
        content: "Начните шахматное обучение с персональной консультации и пробного урока.",
      },
      { property: "og:title", content: "Запись на урок — Gross Academy" },
      {
        property: "og:description",
        content: "Почніть шахове навчання з персональної консультації та пробного уроку.",
      },
    ],
  }),
  component: ContactPage,
});
