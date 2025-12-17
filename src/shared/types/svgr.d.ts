/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// ?react 쿼리 지원
declare module "*.svg?react" {
  import { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

// ?url 쿼리 지원
declare module "*.svg?url" {
  const content: string;
  export default content;
}
