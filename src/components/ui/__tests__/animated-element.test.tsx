import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnimatedElement } from '../animated-element';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('AnimatedElement', () => {
  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    });
    window.IntersectionObserver = mockIntersectionObserver as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <AnimatedElement>
        <div data-testid="child-element">Test Content</div>
      </AnimatedElement>
    );
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });
});
