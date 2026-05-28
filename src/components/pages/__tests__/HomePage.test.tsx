import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';
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
    console.error('Data error', error);
  }
  render() {
    if (this.state.hasError) return <div>Data error caught</div>;
    return this.props.children;
  }
}

const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

vi.mock('@/components/ui/image', () => ({
  Image: () => <div data-testid="mock-image" />,
}));

vi.mock('@/components/ui/loading-spinner', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles error when loading vehicles fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Data error');

    // Mock the vehiclesData property getter to throw an error
    vi.spyOn(vehiclesDataModule, 'vehiclesData', 'get').mockImplementation(() => {
      throw error;
    });

    render(
      <ErrorBoundary>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </ErrorBoundary>
    );

    // Test will not crash due to ErrorBoundary, verify it was caught
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Data error', error);
    });

    consoleSpy.mockRestore();
  });
});
