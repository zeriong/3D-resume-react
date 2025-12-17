import { createAutoFileRoute } from "@/shared/utils/tanstack-router";

import ReactLogo from "@/shared/assets/react.svg?react";

export const Route = createAutoFileRoute(import.meta.url)({
  component: MainPage,
});

function MainPage() {
  return (
    <div className="text-3xl font-bold underline">
      <p>메인</p>
      <ReactLogo />
      <img src="/vite.svg" alt="Vite Logo" />
    </div>
  );
}
