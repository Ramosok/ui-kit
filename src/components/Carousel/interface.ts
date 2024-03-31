import type { ReactNode } from 'react';
import type { TrackSlidesConfigOption } from 'keen-slider/react';

export interface CarouselSlide {
    id: string;
    content: (params: { currentSlideIndex: number; slideId: string; index: number }) => ReactNode;
    [key: string]: unknown;
}

export type SliderConfig =
    | ((size: number, slides: HTMLElement[]) => TrackSlidesConfigOption)
    | number
    | {
          origin?: 'center' | 'auto' | number;
          number?: number | (() => number | null) | null;
          perView?: 'auto' | number | (() => number | 'auto');
          spacing?: number | (() => number);
      }
    | null;
