import React from "react";
import { renderHook, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useSize } from '../use-size'

// Mock useResizeObserver since we can't easily trigger the ResizeObserver entry in jsdom
let triggerResize: (entry: any) => void;
vi.mock('@react-hook/resize-observer', () => ({
  default: (_ref: any, callback: (entry: any) => void) => {
    triggerResize = callback;
  }
}))

describe('useSize', () => {
  let mockRef: { current: HTMLElement | null }

  beforeEach(() => {
    vi.useFakeTimers()

    // Mock requestAnimationFrame and cancelAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      return setTimeout(() => cb(Date.now()), 0) as unknown as number
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id: number) => {
      clearTimeout(id)
    })

    mockRef = {
      current: document.createElement('div')
    }

    // Mock getBoundingClientRect
    mockRef.current.getBoundingClientRect = vi.fn().mockReturnValue({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    })
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('initializes with the correct size', () => {
    const { result } = renderHook(() => useSize(mockRef as React.RefObject<HTMLElement>))
    expect(result.current).toEqual({ width: 100, height: 100 })
  })

  it('updates size when resize exceeds threshold', () => {
    const { result } = renderHook(() => useSize(mockRef as React.RefObject<HTMLElement>, 50))
    expect(result.current).toEqual({ width: 100, height: 100 })

    act(() => {
      triggerResize({
        contentRect: { width: 200, height: 200 }
      })
    })

    // Advance 3 "frames" (mocked as setTimeout 0)
    act(() => {
      vi.advanceTimersByTime(0)
      vi.advanceTimersByTime(0)
      vi.advanceTimersByTime(0)
    })

    expect(result.current).toEqual({ width: 200, height: 200 })
  })

  it('does not update size when resize is within threshold', () => {
    const { result } = renderHook(() => useSize(mockRef as React.RefObject<HTMLElement>, 50))
    expect(result.current).toEqual({ width: 100, height: 100 })

    act(() => {
      triggerResize({
        contentRect: { width: 120, height: 120 }
      })
    })

    act(() => {
      vi.advanceTimersByTime(0)
      vi.advanceTimersByTime(0)
      vi.advanceTimersByTime(0)
    })

    expect(result.current).toEqual({ width: 100, height: 100 })
  })

  it('cleans up RAFs on unmount', () => {
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame')
    const { unmount } = renderHook(() => useSize(mockRef as React.RefObject<HTMLElement>))

    act(() => {
      triggerResize({
        contentRect: { width: 200, height: 200 }
      })
    })

    unmount()
    expect(cancelAnimationFrameSpy).toHaveBeenCalled()
  })
})
