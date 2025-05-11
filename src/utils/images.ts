// src/utils/images.ts

export type ImageProps = {
  url: string;
  width?: number;
  height?: number;
};

/**
 * Resolves image paths as-is for now. Local image optimization is not handled.
 */
export const findImage = async (
  imagePath?: string | null
): Promise<string | null> => {
  if (!imagePath || typeof imagePath !== 'string') return null;
  return imagePath;
};

/**
 * Adapts OpenGraph image entries by simply ensuring valid URLs.
 * Optimization is disabled.
 */
export const adaptOpenGraphImages = async (
  openGraph: {
    images?: ImageProps[];
    [key: string]: any;
  } = {},
  siteOrigin: string = 'http://localhost'
): Promise<typeof openGraph> => {
  const images = openGraph.images || [];
  if (images.length === 0) return openGraph;

  const defaultWidth = 1200;
  const defaultHeight = 626;

  const adaptedImages = await Promise.all(
    images.map(async (image) => {
      const src = await findImage(image.url);
      if (!src) return { url: '' };

      return {
        url: new URL(src, siteOrigin).toString(),
        width: image.width || defaultWidth,
        height: image.height || defaultHeight,
      };
    })
  );

  return {
    ...openGraph,
    images: adaptedImages,
  };
};
