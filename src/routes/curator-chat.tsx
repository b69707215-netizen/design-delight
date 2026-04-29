import { createFileRoute } from "@tanstack/react-router";

import { CuratorChatPage } from "@/components/gross-academy";

export const Route = createFileRoute("/curator-chat")({
  head: () => ({
    meta: [
      { title: "Чат з куратором — Gross Academy" },
      { name: "description", content: "Захищений чат учнів і вчителів з кураторами Gross Academy." },
      { property: "og:title", content: "Чат з куратором — Gross Academy" },
      { property: "og:description", content: "Спілкування учнів і вчителів у персональному кабінеті." },
    ],
  }),
  component: CuratorChatPage,
});
