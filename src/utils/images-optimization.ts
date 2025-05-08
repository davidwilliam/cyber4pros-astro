// src/utils/images-optimization.ts

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
  format?: string;
}

export const isUnpicCompatible = (_image: string): boolean => {
  return true; // override with real logic later if needed
};

export async function getImagesOptimized(
  src: string,
  props: Pick<ImageProps, 'alt' | 'loading' | 'decoding' | 'fetchpriority'>,
  _optimizer?: unknown
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
