import { createFileRoute } from "@tanstack/react-router";

import { DashboardPage } from "@/components/gross-academy";

export const Route = createFileRoute("/student-dashboard")({
  head: () => ({
    meta: [
      { title: "Кабінет учня — Gross Academy" },
      { name: "description", content: "Особистий профіль, мова та історія оплат учня Gross Academy." },
      { property: "og:title", content: "Кабінет учня — Gross Academy" },
      { property: "og:description", content: "Учень бачить тільки власний профіль і свої оплати." },
    ],
  }),
  component: StudentDashboardRoute,
});

function StudentDashboardRoute() {
  return <DashboardPage scope="student" />;
}