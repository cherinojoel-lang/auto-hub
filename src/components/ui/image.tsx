import { forwardRef, type ImgHTMLAttributes, useEffect, useState } from 'react'
import './image.css'

const FALLBACK_IMAGE_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fittingType?: 'fill' | 'fit' | string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, fittingType, ...props }, ref) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(src);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setImgSrc(src);
      setHasError(false);
    }, [src]);

    const handleImageError = () => {
      if (!hasError) {
        setHasError(true);
        setImgSrc(FALLBACK_IMAGE_URL);
      }
    };

    const objectFit = fittingType === 'fit' ? 'contain' : 'cover';

    return (
      <img
        ref={ref}
        src={imgSrc || FALLBACK_IMAGE_URL}
        style={{ objectFit, ...props.style }}
        onError={handleImageError}
        {...props}
        data-empty-image={!src || undefined}
        data-error-image={hasError || undefined}
      />
    );
  }
)
Image.displayName = 'Image'
