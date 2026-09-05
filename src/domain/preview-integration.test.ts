import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const layout = read('src/layouts/PublicLayout.astro');
const leadsRoute = read('src/pages/api/leads.ts');

describe('preview runtime integration', () => {
  it('automatically noindexes preview hosts in the shared layout', () => {
    expect(layout).toContain("import { shouldNoindexPreview } from '@/domain/preview'");
    expect(layout).toContain('shouldNoindexPreview(Astro.url.hostname)');
    expect(layout).toContain('effectiveNoindex');
  });

  it('fails lead submission closed when explicit preview mode is enabled', () => {
    expect(leadsRoute).toContain("import { env } from 'cloudflare:workers'");
    expect(leadsRoute).toContain("import { isPreviewModeEnabled } from '@/domain/preview'");
    expect(leadsRoute).toContain('isPreviewModeEnabled(runtimeEnv.AQ_PREVIEW_MODE)');
    expect(leadsRoute).toContain("error: 'preview_mode'");
    expect(leadsRoute).toContain('503');
  });
});
