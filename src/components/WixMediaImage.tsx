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
  height = 900,
  width = 1725,
  alt = 'no info available for image',
  className,
  objectFit,
  disableZoom = false,
  imageTitle = false,
}: {
  media?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  disableZoom?: boolean;
  imageTitle?: boolean;
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
    <div className={`relative flex flex-col items-center justify-center h-full w-full shrink-0 group overflow-hidden rounded-3xl`}>
      <Image
        {...styleProps}
        src={imageUrl}
        alt={alt}
        className={`w-full h-full ${
          !disableZoom ? 'group-hover:scale-110' : ''
        } transition duration-600 ease-in-out ${className}`}
      />
      {imageTitle && (
        <div className="flex justify-between rounded-3xl py-2 px-6 absolute bottom-5 md:bottom-0 md:translate-y-full group-hover:-translate-y-full transition-all duration-600 w-[90%] md:overflow-hidden bg-white/70 backdrop-blur-sm inset-ring inset-ring-gray-700/10">
          <span>ProjectName</span>
          <span>United States</span>
        </div>
      )}
    </div>
  );
}