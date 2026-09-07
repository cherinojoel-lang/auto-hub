import { configDefaults, defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'node:path'

export default defineConfig({
  // @ts-expect-error - vite-tsconfig-paths is not typed correctly
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      'cloudflare:workers': resolve(__dirname, 'tests/mocks/cloudflare-workers.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 30000,
    exclude: [...configDefaults.exclude, '**/.worktrees/**', '**/worktrees/**'],
  },
  esbuild: {
    target: 'node20',
    jsxInject: `import React from 'react'`,
  },
})
