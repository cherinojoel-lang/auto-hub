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

const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('HomePage', () => {
  it('renders successfully', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/Gebrauchtwagen in Iserlohn-Letmathe/i)[0]).toBeInTheDocument();
  });
});
