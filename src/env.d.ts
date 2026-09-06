/// <reference path="../.astro/types.d.ts" />

declare const Astro: Readonly<import("astro").AstroGlobal>;

type RouteMetadata = Record<string, unknown>;

declare global {
  interface SDKTypeMode {
    strict: true;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    readonly BASE_NAME: string;
  }
}

declare module 'cloudflare:workers' {
  export const env: Record<string, string | undefined>;
}

declare module "react-router-dom" {
  export interface IndexRouteObject {
    routeMetadata?: RouteMetadata;
  }
  export interface NonIndexRouteObject {
    routeMetadata?: RouteMetadata;
  }
}

export {};
