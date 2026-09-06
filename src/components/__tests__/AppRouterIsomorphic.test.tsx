import { describe, it, expect } from 'vitest';
import ReactDOMServer from 'react-dom/server';
import AppRouterIsomorphic from '../AppRouterIsomorphic';

describe('AppRouterIsomorphic SSR Architecture', () => {
  it('renders homepage semantic content on the server', () => {
    const html = ReactDOMServer.renderToString(<AppRouterIsomorphic pathname="/" />);
    expect(html).toContain('Automobile Quick');
    expect(html).toContain('Gebrauchtwagen');
    expect(html).toContain('role="banner"');
    expect(html).toContain('href="/fahrzeugbestand"');
  });

  it('renders vehicles inventory route on the server', () => {
    const html = ReactDOMServer.renderToString(<AppRouterIsomorphic pathname="/fahrzeugbestand" />);
    expect(html).toContain('Fahrzeugbestand');
    expect(html).toContain('Automobile Quick');
  });

  it('renders contact route on the server', () => {
    const html = ReactDOMServer.renderToString(<AppRouterIsomorphic pathname="/kontakt" />);
    expect(html).toContain('Kontakt');
  });
});
