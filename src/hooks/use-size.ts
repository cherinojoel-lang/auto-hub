import useResizeObserver from "@react-hook/resize-observer"
import { useLayoutEffect, useState, useRef, useCallback, useEffect } from "react"
import '@/components/ui/image.css'

type Size = {
  width: number
  height: number
}

export const useSize = (ref: React.RefObject<HTMLElement>, threshold: number = 50): Size | null => {
  const [size, setSize] = useState<Size | null>(null)
  // Reference to the request animation frame numbers
  const timerIds = useRef<NodeJS.Timeout[]>([])
  // Store the size from the first animation frame
  const pendingSize = useRef<Size | null>(null)

  const updateSize = useCallback((newSize: Size): void => {
    setSize((currentSize) => {
      if (!currentSize) {
        return newSize
      }

      const widthDiff = Math.abs(newSize.width - currentSize.width)
      const heightDiff = Math.abs(newSize.height - currentSize.height)

      if ((widthDiff > threshold || heightDiff > threshold)) {
        return newSize
      }
      return currentSize
    })
  }, [threshold])

  useLayoutEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect()
      if (width === 0 || height === 0) {
        return
      }

      // Initial size, set immediately
      updateSize({ width, height })
    }
  }, [updateSize])

  useResizeObserver(ref, (entry) => {
    const { width, height } = entry.contentRect
    if (width === 0 || height === 0) {
      return
    }

    // Size was changed, cancel any pending animation frames that are waiting for the size to stabilize
    timerIds.current.forEach(timerId => {
      clearTimeout(timerId)
    })

    timerIds.current = []
    pendingSize.current = { width, height }
    // Wait to ensure the size is stable
    timerIds.current.push(setTimeout(() => {
        // If no resize changed observed after timeout, update the size
        if (pendingSize.current) {
          updateSize(pendingSize.current)
          pendingSize.current = null
        }
    }, 50))
  })

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timerIds.current.forEach(timerId => {
        clearTimeout(timerId)
      })
    }
  }, [])

  return size
}
