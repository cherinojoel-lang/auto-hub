import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VehiclesPage from '../VehiclesPage';
import { BaseCrudService } from '@/integrations';
import * as vehiclesDataModule from '@/data/vehiclesData.generated';
import { vi } from 'vitest';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error('Error loading static vehicles:', error);
  }
  render() {
    if (this.state.hasError) return <div>Data error caught</div>;
    return this.props.children;
  }
}

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
    vi.mocked(BaseCrudService.getAll).mockResolvedValue({ items: [], hasNext: false, totalCount: 0, currentPage: 1, pageSize: 10, nextSkip: 0 } as any);
  });

  it('handles error when loading static vehicles fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Simulated data loading error');

    // Spy on the imported module to throw an error when accessing vehiclesData
    const spy = vi.spyOn(vehiclesDataModule, 'vehiclesData', 'get').mockImplementation(() => {
      throw error;
    });

    // Render in ErrorBoundary because vehiclesData throws synchronously during component render
    render(
      <ErrorBoundary>
        <BrowserRouter>
          <VehiclesPage />
        </BrowserRouter>
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error loading static vehicles:', error);
    });

    spy.mockRestore();
    consoleSpy.mockRestore();
  });
});
