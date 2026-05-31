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

    let nextId = 1
    const rafMap = new Map<number, FrameRequestCallback>()

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      const id = nextId++
      rafMap.set(id, cb)
      // Execute it immediately to avoid async complexity in the hook test
      cb(Date.now())
      return id
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id: number) => {
      rafMap.delete(id)
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

  it('does not set initial size if width or height is 0', () => {
    mockRef.current!.getBoundingClientRect = vi.fn().mockReturnValue({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    })

    const { result } = renderHook(() => useSize(mockRef as React.RefObject<HTMLElement>))
    expect(result.current).toBeNull()
  })

  it('does not update size if entry.contentRect width or height is 0', () => {
    const { result } = renderHook(() => useSize(mockRef as React.RefObject<HTMLElement>))
    expect(result.current).toEqual({ width: 100, height: 100 })

    act(() => {
      triggerResize({
        contentRect: { width: 0, height: 0 }
      })
    })

    act(() => {
      vi.advanceTimersByTime(0)
      vi.advanceTimersByTime(0)
      vi.advanceTimersByTime(0)
    })

    expect(result.current).toEqual({ width: 100, height: 100 })
  })
})
