// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import customErrorOverlayPlugin from "./vite-error-overlay-plugin.js";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: 'https://automobilequick.de',
  base: "/",
  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: "passthrough",
  }),
  integrations: [
    {
      name: "framewire",
      hooks: {
        "astro:config:setup": ({ injectScript, command }) => {
          if (command === "dev") {
            injectScript(
              "page",
              `import loadFramewire from "framewire.js";
              loadFramewire(true);`
            );
          }
        },
      },
    },
    tailwind(),
    react(),
  ],
  vite: {
    plugins: [customErrorOverlayPlugin()],
    build: {
      rollupOptions: {
        external: ['@wix/data', '@wix/sdk', '@wix/members', '@wix/forms'],
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/framer-motion')) return 'vendor-framer';
            if (id.includes('node_modules/lucide-react')) return 'vendor-lucide';
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router')) return 'vendor-react';
          }
        }
      }
    },
    ssr: {
      external: ['@wix/data', '@wix/sdk', '@wix/members', '@wix/forms'],
    },
    cacheDir: 'node_modules/.cache/.vite',
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'framer-motion',
        'date-fns',
        'clsx',
        'class-variance-authority',
        'tailwind-merge',
        '@radix-ui/*',
        'zod',
      ],
    },
  },
  devToolbar: {
    enabled: false,
  },
  image: {},
  server: {
    allowedHosts: true,
    host: true,
  },
  security: {
    checkOrigin: true
  }
});
