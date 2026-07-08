import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VehicleDetailPage from '../VehicleDetailPage';
import { vi } from 'vitest';

vi.mock('@/lib/seo', () => ({
  updateMetaTags: vi.fn(),
  getStructuredDataProduct: vi.fn(),
}));

vi.mock('@/components/ui/image', () => ({
  Image: () => <div data-testid="mock-image" />,
}));

vi.mock('@/data/vehiclesData.generated', () => ({
  get vehiclesData() {
    throw new Error('Simulated network error');
  }
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
  };
});

describe('VehicleDetailPage', () => {
  it('handles error when loading vehicle fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <BrowserRouter>
        <VehicleDetailPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error computing vehicle:', expect.any(Error));
    });

    await waitFor(() => {
      expect(screen.getByText('Fahrzeug nicht gefunden')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
