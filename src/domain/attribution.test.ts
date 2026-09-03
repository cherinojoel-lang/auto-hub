import { describe, expect, it } from 'vitest';
import { extractAttribution } from './attribution';

describe('attribution capture', () => {
  it('captures supported campaign and click identifiers only', () => {
    const result = extractAttribution(new URL('https://example.test/kontakt?utm_source=google&utm_medium=cpc&utm_campaign=aq-brand&utm_term=gebrauchtwagen&utm_content=hero&gclid=abc&wbraid=wb&gbraid=gb&ignored=no'));

    expect(result).toEqual({
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'aq-brand',
      utm_term: 'gebrauchtwagen',
      utm_content: 'hero',
      gclid: 'abc',
      wbraid: 'wb',
      gbraid: 'gb',
    });
  });

  it('trims and bounds values', () => {
    const result = extractAttribution(new URL(`https://example.test/?utm_source=${'x'.repeat(500)}`));
    expect(result.utm_source?.length).toBe(160);
  });
});
