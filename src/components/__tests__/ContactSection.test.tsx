import { render, screen } from '@testing-library/react';
import ContactSection from '../ContactSection';
import { vi } from 'vitest';
import { BaseCrudService } from '@/integrations';

vi.mock('@/integrations', () => ({
  BaseCrudService: {
    create: vi.fn(),
  },
}));

const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('ContactSection', () => {
  it('renders successfully', () => {
    render(<ContactSection />);
    expect(screen.getByRole('heading', { name: /Schnellanfrage/i })).toBeInTheDocument();
  });
});
