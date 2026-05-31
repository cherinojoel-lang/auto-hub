import { forwardRef, type ImgHTMLAttributes, useEffect, useState } from 'react'
import './image.css'

const FALLBACK_IMAGE_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const WIX_IMAGE_PREFIX = 'wix:image://v1/';
const WIX_STATIC_MEDIA_URL = 'https://static.wixstatic.com/media/';

type WixImageDataProps = {
  fittingType?: 'fill' | 'fit' | string;
  originWidth?: number;
  originHeight?: number;
  focalPointX?: number;
  focalPointY?: number;
};

const parseDimensions = (src: string, imageProps: WixImageDataProps) => {
  const hash = src.includes('#') ? src.split('#')[1] : '';
  const search = src.startsWith(WIX_STATIC_MEDIA_URL) ? new URL(src).searchParams.toString() : hash;
  const params = new URLSearchParams(search || '');
  const width = imageProps.originWidth || Number(params.get('originWidth')) || undefined;
  const height = imageProps.originHeight || Number(params.get('originHeight')) || undefined;

  return { width, height };
};

const toPublicImageUrl = (src: string | undefined) => {
  if (!src) {
    return undefined;
  }

  if (src.startsWith(WIX_IMAGE_PREFIX)) {
    const mediaId = src.replace(WIX_IMAGE_PREFIX, '').split('#')[0].split('/')[0];
    return mediaId ? `${WIX_STATIC_MEDIA_URL}${mediaId}` : undefined;
  }

  return src;
};

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & WixImageDataProps

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, fittingType, originWidth, originHeight, focalPointX, focalPointY, ...props }, ref) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(src)
    const additionalImgProps = { fittingType, originWidth, originHeight, focalPointX, focalPointY }

    useEffect(() => {
      // If src prop changes, update the imgSrc state
      setImgSrc(prev => {
        if (prev !== src) {
          return src
        }
        return prev
      })
    }, [src])

    const resolvedSrc = toPublicImageUrl(imgSrc)
    const { width, height } = resolvedSrc ? parseDimensions(imgSrc || '', additionalImgProps) : {};
    const objectFit = fittingType === 'fit' ? 'contain' : 'cover';
    const imageProps = { ...props, onError: () => {
      if (imgSrc !== FALLBACK_IMAGE_URL) {
        setImgSrc(FALLBACK_IMAGE_URL);
      }
    }}
    const isErrorUrl = imgSrc === FALLBACK_IMAGE_URL

    return (
      <img
        ref={ref}
        src={resolvedSrc || FALLBACK_IMAGE_URL}
        width={props.width || width}
        height={props.height || height}
        style={{ objectFit, ...props.style }}
        {...imageProps}
        data-empty-image={!resolvedSrc || undefined}
        data-error-image={isErrorUrl || undefined}
      />
    )
  }
)
Image.displayName = 'Image'
