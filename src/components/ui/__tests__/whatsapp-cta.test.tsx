import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WhatsAppCta } from '../whatsapp-cta';

describe('WhatsAppCta', () => {
  it('uses the verified Automobile Quick WhatsApp number', () => {
    render(<WhatsAppCta vehicleTitle="BMW 320d" />);

    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/492374912912'));
    expect(link).not.toHaveAttribute('href', expect.stringContaining('4923749129120'));
  });
});
