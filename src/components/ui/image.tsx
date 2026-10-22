import { forwardRef, type ImgHTMLAttributes, useEffect, useState } from 'react'
import './image.css'

const FALLBACK_IMAGE_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fittingType?: 'fill' | 'fit' | string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, fittingType, fetchPriority, ...props }, ref) => {
    /**
     * ⚡ Bolt Optimization: Derived state for image src
     * 💡 What: Replaced useEffect with derived state pattern.
     * 🎯 Why: Using useEffect to sync props to state causes an unnecessary extra render pass.
     * 📊 Impact: Eliminates redundant re-renders for all images across the application.
     * 🔬 Measurement: Tested manually via performance API and vitest execution.
     */
    const [prevSrc, setPrevSrc] = useState<string | undefined>(src);
    const [hasError, setHasError] = useState(false);

    if (src !== prevSrc) {
      setPrevSrc(src);
      setHasError(false);
    }

    const handleImageError = () => {
      if (!hasError) {
        setHasError(true);
      }
    };

    const actualSrc = hasError ? FALLBACK_IMAGE_URL : src;
    const objectFit = fittingType === 'fit' ? 'contain' : 'cover';

    return (
      <img
        ref={ref}
        src={actualSrc || FALLBACK_IMAGE_URL}
        style={{ objectFit, ...props.style }}
        onError={handleImageError}
        {...props}
        {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
        data-empty-image={!src || undefined}
        data-error-image={hasError || undefined}
      />
    );
  }
)
Image.displayName = 'Image'
