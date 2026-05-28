import React from "react";
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { ScrollToTop } from '../scroll-to-top';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Component to help trigger navigation in tests
function NavigationHelper() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/other-page')} data-testid="nav-new-page">Go to new page</button>
      <button onClick={() => navigate('/current-page', { replace: true })} data-testid="nav-same-page">Go to same page</button>
      <button onClick={() => navigate('/current-page#section')} data-testid="nav-hash">Go to hash</button>
    </div>
  );
}

describe('ScrollToTop', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('scrolls to top with behavior auto on initial load without hash', () => {
    render(
      <MemoryRouter initialEntries={['/current-page']}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  });

  it('scrolls to top with behavior auto when navigating to a new page without hash', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/current-page']}>
        <ScrollToTop />
        <NavigationHelper />
      </MemoryRouter>
    );

    // Initial load
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // Navigate to a new page
    fireEvent.click(getByTestId('nav-new-page'));

    // Should be called again with 'auto' because it's a different pathname
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  });

  it('scrolls to top with behavior smooth when navigating to the same page without hash', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/current-page']}>
        <ScrollToTop />
        <NavigationHelper />
      </MemoryRouter>
    );

    // Initial load
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // Navigate to the same page
    fireEvent.click(getByTestId('nav-same-page'));

    // Should be called again with 'smooth' because it's the same pathname
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  it('scrolls to element when navigating to a hash and element exists', () => {
    const mockScrollIntoView = vi.fn();
    const mockElement = document.createElement('div');
    mockElement.id = 'section';
    mockElement.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(mockElement);

    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/current-page']}>
        <ScrollToTop />
        <NavigationHelper />
      </MemoryRouter>
    );

    // Initial load
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // Navigate to a hash
    fireEvent.click(getByTestId('nav-hash'));

    // Fast-forward 100ms
    vi.advanceTimersByTime(100);

    // Should call scrollIntoView on the element
    expect(document.getElementById).toHaveBeenCalledWith('section');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    // Clean up
    document.body.removeChild(mockElement);
  });

  it('does not scroll to element when navigating to a hash and element does not exist', () => {
    vi.spyOn(document, 'getElementById').mockReturnValue(null);

    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/current-page']}>
        <ScrollToTop />
        <NavigationHelper />
      </MemoryRouter>
    );

    // Initial load
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // Navigate to a hash
    fireEvent.click(getByTestId('nav-hash'));

    // Fast-forward 100ms
    vi.advanceTimersByTime(100);

    // Should attempt to find the element but not error out
    expect(document.getElementById).toHaveBeenCalledWith('section');
    // We implicitly assert that no error was thrown since the element was null
  });
});
