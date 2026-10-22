import { forwardRef, type ImgHTMLAttributes, useState } from 'react'
import './image.css'

const FALLBACK_IMAGE_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fittingType?: 'fill' | 'fit' | string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, fittingType, fetchPriority, ...props }, ref) => {
    /**
     * ⚡ Bolt Optimization: Derived state for image src
     * 💡 What: Replaced useEffect with an optimized failedSrc state tracking pattern.
     * 🎯 Why: Using useEffect to sync props to state causes an unnecessary extra render pass whenever the src prop changes.
     * 📊 Impact: Eliminates redundant re-renders for all images across the application and removes unused imports.
     * 🔬 Measurement: Tested manually via performance API and vitest execution.
     */
    const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);

    const handleImageError = () => {
      setFailedSrc(src);
    };

    const hasError = failedSrc === src;
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
