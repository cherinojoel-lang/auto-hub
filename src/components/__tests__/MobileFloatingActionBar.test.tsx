import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import MobileFloatingActionBar from '../MobileFloatingActionBar';

describe('MobileFloatingActionBar', () => {
  it('shows verified call and WhatsApp actions on mobile routes', () => {
    render(
      <MemoryRouter initialEntries={['/kontakt']}>
        <MobileFloatingActionBar />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /anrufen/i })).toHaveAttribute('href', 'tel:+492374912912');
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/492374912912')
    );
  });

  it('uses a contextual filter action that actually requests the inventory filter drawer', () => {
    const openFilters = vi.fn();
    window.addEventListener('aq:open-inventory-filters', openFilters);

    render(
      <MemoryRouter initialEntries={['/fahrzeugbestand']}>
        <MobileFloatingActionBar />
      </MemoryRouter>
    );

    expect(screen.queryByRole('link', { name: 'Fahrzeuge' })).not.toBeInTheDocument();

    const filterButton = screen.getByRole('button', { name: 'Filter öffnen' });
    fireEvent.click(filterButton);

    expect(openFilters).toHaveBeenCalledTimes(1);
    window.removeEventListener('aq:open-inventory-filters', openFilters);
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
