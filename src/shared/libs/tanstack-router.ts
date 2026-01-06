import { createFileRoute, type FileRoutesByPath } from "@tanstack/react-router";

interface CreateAutoFileRouteOptions {
  componentName?: string;
  validateSearch?: any;
  beforeLoad?: any;
  loader?: any;
  action?: any;
}

/**
 * 현재 파일의 경로를 기반으로 TanStack Router 경로 자동 생성
 * @param importMetaUrl - import.meta.url (ESM에서 사용)
 * @returns TanStack Router 경로
 */
export function createAutoRoutePath(importMetaUrl: string): string {
  // 1. file:// 프로토콜 제거 및 경로 추출
  const filePath = new URL(importMetaUrl).pathname;

  // 2. Windows에서 /C:/ 형태로 오는 경우 처리
  const normalizedPath =
    filePath.startsWith("/") && filePath.includes(":")
      ? filePath.slice(1) // /C:/users/... → C:/users/...
      : filePath;

  // 3. 백슬래시를 슬래시로 변환 (Windows 호환성)
  const unixPath = normalizedPath.replace(/\\/g, "/");

  // 4. src/pages/ 제거
  const withoutSrcPages = unixPath.replace(/.*\/src\/pages\//, "");

  // 5. 파일명 제거 (index.tsx, index.ts 등)
  const withoutFileName = withoutSrcPages.replace(/\/index\.[jt]sx?$/, "");

  // 6. 앞에 슬래시 추가
  return `/${withoutFileName}/`;
}

//! TanStack Router 자동 컴포넌트명 생성 함수
/**
 * 현재 파일명을 기반으로 컴포넌트명 자동 생성
 * @param importMetaUrl - import.meta.url (ESM에서 사용)
 * @returns PascalCase 컴포넌트명
 */
export function createAutoComponentName(importMetaUrl: string): string {
  const filePath = new URL(importMetaUrl).pathname;
  const fileName =
    filePath
      .split(/[/\\]/)
      .pop()
      ?.replace(/\.[jt]sx?$/, "") || "index";

  if (fileName === "index") {
    // 부모 폴더명 추출
    const pathParts = filePath.split(/[/\\]/);
    const parentDir = pathParts[pathParts.length - 2] || "Page";
    return parentDir.charAt(0).toUpperCase() + parentDir.slice(1) + "Page";
  }

  return fileName.charAt(0).toUpperCase() + fileName.slice(1) + "Page";
}

//! TanStack Router 헬퍼 함수 (자동 경로 + 컴포넌트 생성)
/**
 * TanStack Router 파일 라우트를 자동으로 생성하는 헬퍼
 * @param importMetaUrl - import.meta.url
 * @returns 라우트 설정 객체
 */

/**
 * TanStack Router 파일 라우트를 완전 자동으로 생성
 * @param importMetaUrl - import.meta.url
 * @param options - 추가 라우트 옵션들
 * @returns createFileRoute 함수 (TanStack Router와 동일한 인터페이스)
 */
export function createAutoFileRoute(
  importMetaUrl: string,
  options?: CreateAutoFileRouteOptions
): ReturnType<typeof createFileRoute> {
  const routePath = createAutoRoutePath(
    importMetaUrl
  ) as keyof FileRoutesByPath;

  // TanStack Router의 createFileRoute와 동일한 인터페이스 반환
  return createFileRoute(routePath);
}

//! 간단 버전: 기본 컴포넌트명 자동 생성
/**
 * 기본 컴포넌트명으로 자동 라우트 생성
 * @param importMetaUrl - import.meta.url
 */
export function createSimpleAutoFileRoute(importMetaUrl: string) {
  const routePath = createAutoRoutePath(importMetaUrl);
  const componentName = createAutoComponentName(importMetaUrl);

  return (routeOptions: {
    component?: React.ComponentType;
    validateSearch?: any;
    beforeLoad?: any;
    loader?: any;
    action?: any;
    errorComponent?: React.ComponentType;
    pendingComponent?: React.ComponentType;
  }) => {
    return {
      path: routePath,
      componentName,
      ...routeOptions,
    };
  };
}
