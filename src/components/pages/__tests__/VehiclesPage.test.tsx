import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VehiclesPage from '../VehiclesPage';
import { BaseCrudService } from '@/integrations';
import { vi } from 'vitest';

vi.mock('@/integrations', () => ({
  BaseCrudService: {
    getAll: vi.fn(),
  },
}));

vi.mock('@/lib/seo', () => ({
  updateMetaTags: vi.fn(),
  getStructuredDataBreadcrumb: vi.fn(),
}));

vi.mock('@/components/ui/image', () => ({
  Image: () => <div data-testid="mock-image" />,
}));

const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('VehiclesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(BaseCrudService.getAll).mockResolvedValue({ items: [], hasNext: false });
  });

  it('handles error when loading vehicles fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Network error');

    vi.mocked(BaseCrudService.getAll).mockRejectedValueOnce(error);

    render(
      <BrowserRouter>
        <VehiclesPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    // Check if the loading spinner is eventually removed
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
