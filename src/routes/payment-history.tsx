import { createFileRoute } from "@tanstack/react-router";

import { PaymentHistoryPage, type PaymentStatusFilter } from "@/components/gross-academy";

const paymentStatuses: PaymentStatusFilter[] = ["all", "paid", "canceled", "pending"];

export const Route = createFileRoute("/payment-history")({
  validateSearch: (search) => ({
    course: typeof search.course === "string" ? search.course : "",
    status: paymentStatuses.includes(search.status as PaymentStatusFilter)
      ? (search.status as PaymentStatusFilter)
      : "all",
  }),
  head: () => ({
    meta: [
      { title: "Історія оплат — Gross Academy" },
      { name: "description", content: "Фільтруйте власні оплати за курсами та статусами платежів." },
      { property: "og:title", content: "Історія оплат — Gross Academy" },
      { property: "og:description", content: "Окрема сторінка оплат у кабінеті Gross Academy." },
    ],
  }),
  component: PaymentHistoryRoute,
});

function PaymentHistoryRoute() {
  const { course, status } = Route.useSearch();
  return <PaymentHistoryPage course={course} status={status} />;
}