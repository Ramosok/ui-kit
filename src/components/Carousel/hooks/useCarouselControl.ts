import { useState } from 'react';
import type { CSSProperties, LegacyRef } from 'react';
import type { KeenSliderInstance } from 'keen-slider/react';
import type { SliderConfig } from '../interface';
import { KeenSliderPlugin, useKeenSlider } from 'keen-slider/react';

export interface UseCarouselControlInput {
    initialActiveIndex?: number;
    desktopSliderConfig?: SliderConfig;
    mobileSliderConfig?: SliderConfig;
}

export interface UseCarouselControlOutput {
    sliderRef: ((node: HTMLDivElement) => void) | LegacyRef<HTMLDivElement>;
    currentSlideIndex: number;
    isLoadedSlider: boolean;
    animateSlider: (slideIndex: number) => CSSProperties;
    moveToSlide: (slideIndex: number) => void;
    switchToNextSlide: () => void;
    switchToPrevSlide: () => void;
}

const DEFAULT_DESKTOP_SLIDER_CONFIG: SliderConfig = {
    origin: 'center',
    perView: 'auto',
    spacing: 0,
};

const DEFAULT_MOBILE_SLIDER_CONFIG: SliderConfig = {
    origin: 'center',
    perView: 1,
};

const MutationPlugin: KeenSliderPlugin = (slider) => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            slider.update();
        });
    });
    const config = { childList: true };

    slider.on('created', () => {
        observer.observe(slider.container, config);
    });
    slider.on('destroyed', () => {
        observer.disconnect();
    });
};

export const useCarouselControl = ({
    initialActiveIndex = 0,
    desktopSliderConfig = DEFAULT_DESKTOP_SLIDER_CONFIG,
    mobileSliderConfig = DEFAULT_MOBILE_SLIDER_CONFIG,
}: UseCarouselControlInput): UseCarouselControlOutput => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(initialActiveIndex);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            breakpoints: {
                '(max-width: 600px)': {
                    slides: mobileSliderConfig,
                },
            },
            slides: desktopSliderConfig,
            initial: initialActiveIndex,
            slideChanged(slider: KeenSliderInstance): void {
                setCurrentSlideIndex(slider.track.details.rel);
            },
            created(): void {
                setIsLoaded(true);
            },
        },
        [MutationPlugin]
    );
    const sliderInstance = instanceRef.current;

    const moveToSlide = (slideIndex: number): void => {
        sliderInstance?.moveToIdx(slideIndex);
    };

    const switchToNextSlide = (): void => {
        sliderInstance.next();
    };

    const switchToPrevSlide = (): void => {
        sliderInstance.prev();
    };

    const animateSlider = (slideIndex: number): CSSProperties => {
        const scaleSize = 0.7;
        const otherSlidePortion = 0.6;
        const actualPortion = currentSlideIndex === slideIndex ? 1 : otherSlidePortion;
        const scale = 1 - (scaleSize - scaleSize * actualPortion);
        return {
            transitionDuration: '0.3s',
            transform: `scale(${scale})`,
            WebkitTransform: `scale(${scale})`,
        };
    };

    return {
        sliderRef,
        isLoadedSlider: isLoaded,
        currentSlideIndex,
        animateSlider,
        moveToSlide,
        switchToNextSlide,
        switchToPrevSlide,
    };
};
