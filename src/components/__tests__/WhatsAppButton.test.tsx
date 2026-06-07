import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WhatsAppButton from '../WhatsAppButton';

describe('WhatsAppButton', () => {
  it('keeps the floating WhatsApp bubble desktop-only so it does not overlap the mobile action bar', () => {
    render(<WhatsAppButton />);

    const link = screen.getByRole('link', { name: /whatsapp kontakt/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/492374912912'));
    expect(link).toHaveClass('hidden');
    expect(link).toHaveClass('md:flex');
  });
});
