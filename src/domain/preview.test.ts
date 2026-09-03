import { describe, expect, it } from 'vitest';
import { isPreviewHost, shouldNoindexPreview } from './preview';

describe('preview host contract', () => {
  it('treats workers.dev and localhost hosts as preview contexts', () => {
    expect(isPreviewHost('automobile-quick-preview.example.workers.dev')).toBe(true);
    expect(isPreviewHost('aq-preview-automobile-quick.example.workers.dev')).toBe(true);
    expect(isPreviewHost('localhost')).toBe(true);
    expect(isPreviewHost('127.0.0.1')).toBe(true);
  });

  it('does not classify the production hostname as preview', () => {
    expect(isPreviewHost('www.automobile-quick.de')).toBe(false);
    expect(isPreviewHost('automobile-quick.de')).toBe(false);
  });

  it('requires noindex for preview hosts only', () => {
    expect(shouldNoindexPreview('automobile-quick-preview.example.workers.dev')).toBe(true);
    expect(shouldNoindexPreview('localhost')).toBe(true);
    expect(shouldNoindexPreview('www.automobile-quick.de')).toBe(false);
  });
});
