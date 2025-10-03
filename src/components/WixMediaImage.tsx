import { media as wixMedia } from '@wix/sdk';
import Image, { ImageProps } from 'next/image';

function getImageUrlForMedia(media: string, width: number, height: number) {
  if (media.startsWith('wix:image')) {
    console.log('wix image ',wixMedia.getScaledToFillImageUrl(media, width, height, {}) )
    return wixMedia.getScaledToFillImageUrl(media, width, height, {});
  } else {
    return media;
  }
}

export function WixMediaImage({
  media,
  height = 320,
  width = 640,
  alt = 'no info available for image',
  className,
  objectFit,
  disableZoom = false,
}: {
  media?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  disableZoom?: boolean;
  objectFit?: 'cover' | 'contain';
}) {
  const imageUrl = media
    ? getImageUrlForMedia(media || '', width, height)
    : '';

  const styleProps: Partial<ImageProps> = {
    ...(objectFit
      ? { style: { objectFit }, width, height}
      : { width, height }),
  };

  return (
    <div className={`flex items-center justify-center h-full w-full shrink-0 group overflow-hidden rounded-3xl`}>
      <Image
        {...styleProps}
        src={imageUrl}
        alt={alt}
        className={`w-full h-full ${
          !disableZoom ? 'group-hover:scale-110' : ''
        } transition duration-300 ease-in-out ${className}`}
      />
    </div>
  );
}