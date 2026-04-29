import { createFileRoute } from "@tanstack/react-router";

import { DashboardPage } from "@/components/gross-academy";

export const Route = createFileRoute("/teacher-dashboard")({
  head: () => ({
    meta: [
      { title: "Кабінет вчителя — Gross Academy" },
      { name: "description", content: "Особистий профіль, мова та історія оплат вчителя Gross Academy." },
      { property: "og:title", content: "Кабінет вчителя — Gross Academy" },
      { property: "og:description", content: "Вчитель бачить тільки власний профіль і свої оплати." },
    ],
  }),
  component: TeacherDashboardRoute,
});

function TeacherDashboardRoute() {
  return <DashboardPage scope="teacher" />;
}