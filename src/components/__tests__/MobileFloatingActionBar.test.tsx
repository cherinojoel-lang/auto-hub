import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import MobileFloatingActionBar from '../MobileFloatingActionBar';

describe('MobileFloatingActionBar', () => {
  it('shows verified call and contact actions on mobile routes', () => {
    render(
      <MemoryRouter initialEntries={['/kontakt']}>
        <MobileFloatingActionBar />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /anrufen/i })).toHaveAttribute('href', 'tel:+492374912912');
    expect(screen.queryByRole('link', { name: /whatsapp/i })).not.toBeInTheDocument();
  });

  it('stays hidden on vehicle detail pages because that page has its own CTA bar', () => {
    render(
      <MemoryRouter initialEntries={['/fahrzeugdetail/bmw-320d']}>
        <MobileFloatingActionBar />
      </MemoryRouter>
    );

    expect(screen.queryByRole('link', { name: /anrufen/i })).not.toBeInTheDocument();
  });
});
