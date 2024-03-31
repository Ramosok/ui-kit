import React, { type FC } from 'react';
import { Dots } from './components/Dots/Dots';
import { Arrows } from './components/Arrows/Arrows';
import styles from './Carousel.module.scss';
import type { CarouselSlide } from './interface';
import { SlideItem } from './components/SlideItem/SlideItem';
import { classNames } from 'core/helpers';
import type { UseCarouselControlOutput } from './hooks/useCarouselControl';

export interface CarouselProps extends Omit<UseCarouselControlOutput, 'animateSlider'> {
    slides: CarouselSlide[];
    isShowSliderDots?: boolean;
    isShowArrows?: boolean;
    className?: string;
    slideContainerClassName?: string;
    activeSlideClassName?: string;
    slideClassName?: string;
    prevIconContainerClassName?: string;
    prevIconClassName?: string;
    nextIconContainerClassName?: string;
    nextIconClassName?: string;
    dotsClassName?: string;
    dotClassName?: string;
    animateSlider?: UseCarouselControlOutput['animateSlider'];
}

export const Carousel: FC<CarouselProps> = (componentProps) => {
    const {
        sliderRef,
        slides = [],
        currentSlideIndex,
        isLoadedSlider,
        moveToSlide,
        switchToNextSlide,
        switchToPrevSlide,
        isShowSliderDots,
        isShowArrows,
        className = '',
        slideContainerClassName,
        activeSlideClassName,
        slideClassName,
        prevIconContainerClassName,
        prevIconClassName,
        nextIconContainerClassName,
        nextIconClassName,
        dotsClassName,
        dotClassName,
        animateSlider,
    } = componentProps;

    const slidesLength = slides.length;

    return (
        <div className={className}>
            <div className={styles.navigationContainer}>
                <div ref={sliderRef} className={classNames(['keen-slider', slideContainerClassName])}>
                    {slides.map((slide, index) => (
                        <SlideItem
                            style={animateSlider?.(index)}
                            key={slide.id}
                            activeSlideClassName={activeSlideClassName}
                            slideClassName={slideClassName}
                            index={index}
                            currentSlideIndex={currentSlideIndex}
                            slide={slide}
                            moveToSlide={moveToSlide}
                        />
                    ))}
                </div>
                {isShowArrows && isLoadedSlider && !!slidesLength && (
                    <Arrows
                        currentSlideIndex={currentSlideIndex}
                        slidesLength={slidesLength}
                        switchToNextSlide={switchToNextSlide}
                        switchToPrevSlide={switchToPrevSlide}
                        prevIconContainerClassName={prevIconContainerClassName}
                        prevIconClassName={prevIconClassName}
                        nextIconContainerClassName={nextIconContainerClassName}
                        nextIconClassName={nextIconClassName}
                    />
                )}
            </div>
            {isShowSliderDots && isLoadedSlider && (
                <Dots
                    currentSlideIndex={currentSlideIndex}
                    slidesLength={slidesLength}
                    moveToSlide={moveToSlide}
                    dotsClassName={dotsClassName}
                    dotClassName={dotClassName}
                />
            )}
        </div>
    );
};
