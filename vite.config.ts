import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),

    // Tailwind CSS 플러그인 추가
    tailwindcss(),

    // SVG를 React 컴포넌트로 변환
    svgr({
      svgrOptions: {
        // SVG를 JSX로 변환하는 옵션들
        icon: true,
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@public": path.resolve(__dirname, "./public"),
    },
  },

  server: {
    // 개발 서버 설정 (필요시)
    // 포트나 프록시 설정 등 추가 가능
    port: 3000,
  },
});
