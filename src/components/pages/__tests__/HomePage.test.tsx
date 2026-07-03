import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';
import { vi } from 'vitest';

vi.mock('@/components/ui/image', () => ({
  Image: () => <div data-testid="mock-image" />,
}));

vi.mock('@/components/ui/loading-spinner', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>
}));

describe('HomePage', () => {
  it('renders successfully', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/Gebrauchtwagen in Iserlohn-Letmathe/i)[0]).toBeInTheDocument();
  });

  it('does not render self-serving review structured data', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const jsonLdScripts = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]')
    ).map((script) => script.textContent ?? '');

    expect(jsonLdScripts.join('\n')).not.toContain('aggregateRating');
    expect(jsonLdScripts.join('\n')).not.toContain('"review"');
  });
});
