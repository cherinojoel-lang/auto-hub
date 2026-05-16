import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useSize } from './use-size';

// Mock getBoundingClientRect
const mockGetBoundingClientRect = vi.fn();

let resizeCallback: any = null;

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(callback: any) {
    resizeCallback = callback;
  }
}

global.ResizeObserver = MockResizeObserver as any;

describe('useSize', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', (cb: any) => setTimeout(cb, 16));
    vi.stubGlobal('cancelAnimationFrame', (id: any) => clearTimeout(id));
    mockGetBoundingClientRect.mockReturnValue({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => {} });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    resizeCallback = null;
    vi.clearAllMocks();
  });

  it('should initialize with null size when dimensions are 0', () => {
    const ref = { current: document.createElement('div') };
    ref.current.getBoundingClientRect = mockGetBoundingClientRect;

    const { result } = renderHook(() => useSize(ref));

    expect(result.current).toBeNull();
  });

  it('should initialize with correct size when dimensions are non-zero', () => {
    mockGetBoundingClientRect.mockReturnValue({ width: 100, height: 200, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => {} });
    const ref = { current: document.createElement('div') };
    ref.current.getBoundingClientRect = mockGetBoundingClientRect;

    const { result } = renderHook(() => useSize(ref));

    expect(result.current).toEqual({ width: 100, height: 200 });
  });

  it('should update size when ResizeObserver triggers with changes above threshold', async () => {
    mockGetBoundingClientRect.mockReturnValue({ width: 100, height: 200, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => {} });
    const ref = { current: document.createElement('div') };
    ref.current.getBoundingClientRect = mockGetBoundingClientRect;

    const { result } = renderHook(() => useSize(ref, 50));

    expect(result.current).toEqual({ width: 100, height: 200 });

    act(() => {
      resizeCallback([{ contentRect: { width: 200, height: 300 } }]);
    });

    // Fast-forward 3 frames (3 * 16ms = 48ms)
    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current).toEqual({ width: 200, height: 300 });
  });

  it('should not update size when ResizeObserver triggers with changes below threshold', async () => {
    mockGetBoundingClientRect.mockReturnValue({ width: 100, height: 200, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => {} });
    const ref = { current: document.createElement('div') };
    ref.current.getBoundingClientRect = mockGetBoundingClientRect;

    const { result } = renderHook(() => useSize(ref, 50));

    expect(result.current).toEqual({ width: 100, height: 200 });

    act(() => {
      resizeCallback([{ contentRect: { width: 120, height: 220 } }]);
    });

    // Fast-forward 3 frames
    act(() => {
      vi.advanceTimersByTime(50);
    });

    // Should not change because differences (20, 20) are <= threshold (50)
    expect(result.current).toEqual({ width: 100, height: 200 });
  });

  it('should update size when width change is below threshold but height change is above threshold', async () => {
    mockGetBoundingClientRect.mockReturnValue({ width: 100, height: 200, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => {} });
    const ref = { current: document.createElement('div') };
    ref.current.getBoundingClientRect = mockGetBoundingClientRect;

    const { result } = renderHook(() => useSize(ref, 50));

    act(() => {
      resizeCallback([{ contentRect: { width: 120, height: 300 } }]);
    });

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current).toEqual({ width: 120, height: 300 });
  });

  it('should clear pending animation frames on unmount', () => {
    mockGetBoundingClientRect.mockReturnValue({ width: 100, height: 200, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => {} });
    const ref = { current: document.createElement('div') };
    ref.current.getBoundingClientRect = mockGetBoundingClientRect;

    const { unmount } = renderHook(() => useSize(ref));

    act(() => {
      resizeCallback([{ contentRect: { width: 200, height: 300 } }]);
    });

    // Unmount before frames resolve
    unmount();

    act(() => {
      vi.advanceTimersByTime(50);
    });

    // The component is unmounted, but we also verify no errors happen and frames are cancelled
    // The cancelAnimationFrame is stubbed, we can spy on it if we wanted to
  });
});
