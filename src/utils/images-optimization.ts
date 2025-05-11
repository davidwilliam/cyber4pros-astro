import type { HTMLAttributes } from 'astro/types';

export interface ImageProps {
  src?: string | null;
  alt?: string | null;
  width?: string | number | null;
  height?: string | number | null;
  loading?: 'eager' | 'lazy' | null;
  decoding?: 'sync' | 'async' | 'auto' | null;
  fetchpriority?: 'high' | 'low' | 'auto' | null;
  style?: string;
  srcset?: string | null;
  sizes?: string | null;
  layout?: string;
  widths?: number[] | null;
  aspectRatio?: string | number | null;
  objectPosition?: string;
}

export async function getImagesOptimized(
  src: string,
  props: Pick<ImageProps, 'alt' | 'loading' | 'decoding' | 'fetchpriority'>
): Promise<{ src: string; attributes: HTMLAttributes<'img'> }> {
  return {
    src,
    attributes: {
      alt: props.alt || '',
      loading: props.loading ?? 'lazy',
      decoding: props.decoding ?? 'async',
      fetchpriority: props.fetchpriority,
      referrerpolicy: 'no-referrer',
      crossorigin: 'anonymous',
    },
  };
}
