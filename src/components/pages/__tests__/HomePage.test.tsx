import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';
import { BaseCrudService } from '@/integrations';
import { vi } from 'vitest';

vi.mock('@/integrations', () => ({
  BaseCrudService: {
    getAll: vi.fn(),
  },
}));

vi.mock('@/lib/seo', () => ({
  updateMetaTags: vi.fn(),
  getStructuredDataOrganization: vi.fn(),
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

describe('HomePage', () => {
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
        <HomePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error loading vehicles:', error);
    });

    // Check if the loading spinner is eventually removed
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
