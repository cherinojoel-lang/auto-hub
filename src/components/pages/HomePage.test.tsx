import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import HomePage from './HomePage';
import { BaseCrudService } from '@/integrations';

// Mock the integrations
vi.mock('@/integrations', () => ({
  BaseCrudService: {
    getAll: vi.fn(),
  },
}));

// Mock Header and Footer as they might have their own complex dependencies
vi.mock('@/components/Header', () => ({
  default: () => <div data-testid="mock-header">Header</div>,
}));

vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="mock-footer">Footer</div>,
}));

// Mock Image component due to missing dependency "@wix/image-kit"
vi.mock('@/components/ui/image', () => ({
  Image: () => <div data-testid="mock-image">Image</div>,
}));

// Mock seo lib
vi.mock('@/lib/seo', () => ({
  updateMetaTags: vi.fn(),
  getStructuredDataOrganization: vi.fn(),
}));

// Mock IntersectionObserver
beforeEach(() => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles errors when loading vehicles fails', async () => {
    // Suppress console.error for this test to avoid noisy logs
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock getAll to reject
    const mockError = new Error('Failed to fetch vehicles');
    (BaseCrudService.getAll as any).mockRejectedValueOnce(mockError);

    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Verify loading spinner/skeletons are eventually removed
    await waitFor(() => {
      expect(BaseCrudService.getAll).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error loading vehicles:', mockError);
    });

    // Check that loading state is reset.
    // The loading spinner is rendered when isLoading is true.
    await waitFor(() => {
      // The loading skeletons use 'animate-pulse' and 'bg-gray-200'
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(0);
    });

    consoleSpy.mockRestore();
  });
});
