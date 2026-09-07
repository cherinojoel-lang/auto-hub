import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InquiryCta } from '../inquiry-cta';

describe('InquiryCta', () => {
  it('links to the verified Automobile Quick contact e-mail with the vehicle pre-filled', () => {
    render(<InquiryCta vehicleTitle="BMW 320d" />);

    const link = screen.getByRole('link', { name: /e-mail-anfrage/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('mailto:auto-quick@t-online.de'));
    expect(link).toHaveAttribute('href', expect.stringContaining(encodeURIComponent('BMW 320d')));
  });
});
