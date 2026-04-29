import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/gross-academy";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Запис на урок — Gross Academy" },
      {
        name: "description",
        content: "Почніть шахове навчання з персональної консультації та пробного уроку.",
      },
      { property: "og:title", content: "Запис на урок — Gross Academy" },
      {
        property: "og:description",
        content: "Почніть шахове навчання з персональної консультації та пробного уроку.",
      },
    ],
  }),
  component: ContactPage,
});
