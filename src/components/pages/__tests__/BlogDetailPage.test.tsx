import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BlogDetailPage from '../BlogDetailPage';
import { BaseCrudService } from '@/integrations';

// Mock the CRUD service
vi.mock('@/integrations', () => ({
  BaseCrudService: {
    getAll: vi.fn(),
  },
}));

// Mock the Image component
vi.mock('@/components/ui/image', () => ({
  Image: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} data-testid="mock-image" />,
}));

// Mock the LoadingSpinner component
vi.mock('@/components/ui/loading-spinner', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe('BlogDetailPage Content Rendering Baseline', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders complex markdown content correctly', async () => {
    const mockContent = `
# Main Heading

## Subheading 1

This is a regular paragraph with some text.

### Small Heading

- List item 1
- List item 2
- List item 3

| Column 1 | Column 2 |
|---|---|
| Cell 1 | Cell 2 |
| Cell 3 | Cell 4 |

[CTA][Click Here](/some-link)[/CTA]

Final paragraph.
    `.trim();

    (BaseCrudService.getAll as any).mockResolvedValueOnce({
      items: [
        {
          _id: '1',
          title: 'Test Article',
          slug: 'test-article',
          content: mockContent,
        },
      ],
      total: 1,
    });

    render(
      <MemoryRouter initialEntries={['/blog/test-article']}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for content to load
    expect(await screen.findByText('Test Article')).toBeInTheDocument();

    // Verify headings
    expect(screen.getByText('Main Heading')).toBeInTheDocument();
    expect(screen.getByText('Main Heading').tagName).toBe('H1');
    expect(screen.getByText('Subheading 1')).toBeInTheDocument();
    expect(screen.getByText('Subheading 1').tagName).toBe('H2');
    expect(screen.getByText('Small Heading')).toBeInTheDocument();
    expect(screen.getByText('Small Heading').tagName).toBe('H3');

    // Verify list
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('List item 1').tagName).toBe('LI');

    // Verify table
    expect(screen.getByText('Column 1')).toBeInTheDocument();
    expect(screen.getByText('Column 1').tagName).toBe('TH');
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 1').tagName).toBe('TD');

    // Verify CTA
    expect(screen.getByText('Click Here')).toBeInTheDocument();
    expect(screen.getByText('Click Here').tagName).toBe('A');
    expect(screen.getByText('Click Here')).toHaveAttribute('href', '/some-link');

    // Verify paragraphs
    expect(screen.getByText('This is a regular paragraph with some text.')).toBeInTheDocument();
    expect(screen.getByText('Final paragraph.')).toBeInTheDocument();
  });
});
