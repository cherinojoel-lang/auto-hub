import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VehiclesPage from '../VehiclesPage';
import { BaseCrudService } from '@/integrations';
import * as vehiclesDataModule from '@/data/vehiclesData.generated';
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

describe('VehiclesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(BaseCrudService.getAll).mockResolvedValue({ items: [], hasNext: false, totalCount: 0, currentPage: 1, pageSize: 10, nextSkip: 0 } as any);
  });

  it('renders VehiclesPage', async () => {
    render(
      <BrowserRouter>
        <VehiclesPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Aktuelle Gebrauchtwagen in Iserlohn-Letmathe')).toBeInTheDocument();
    });
  });
});
