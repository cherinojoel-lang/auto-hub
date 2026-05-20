import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VehiclesPage from '../VehiclesPage';
import { vi, describe, beforeEach, it, expect } from 'vitest';

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
  });

  it('handles error when loading vehicles fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Network error');

    // Mock setTimeout to throw an error to simulate loadVehicle failure
    const originalSetTimeout = global.setTimeout;
    vi.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      throw error;
    });

    render(
      <BrowserRouter>
        <VehiclesPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error loading static vehicles:', error);
    });

    // Check if the loading spinner is eventually removed
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    consoleSpy.mockRestore();
    global.setTimeout = originalSetTimeout;
  });
});
