import React from 'react';
import type { FC, CSSProperties } from 'react';
import styles from './SlideItem.module.scss';
import { classNames } from 'core/helpers';
import type { CarouselSlide } from '../../interface';
import type { UseCarouselControlOutput } from '../../hooks/useCarouselControl';

interface SlideItemProps {
    style?: CSSProperties;
    activeSlideClassName?: string;
    slideClassName?: string;
    index: number;
    currentSlideIndex: number;
    slide: CarouselSlide;
    moveToSlide: UseCarouselControlOutput['moveToSlide'];
}

export const SlideItem: FC<SlideItemProps> = ({
    style = {},
    activeSlideClassName,
    slideClassName,
    index,
    currentSlideIndex,
    slide,
    moveToSlide,
}) => {
    const isActiveClass = currentSlideIndex === index;
    return (
        <div
            className={classNames({
                [`keen-slider__slide ${styles.slideItem}`]: true,
                [styles.activeSlide]: isActiveClass,
                [activeSlideClassName]: !!activeSlideClassName && isActiveClass,
                [slideClassName]: !!slideClassName,
            })}
            onClick={() => moveToSlide(index)}
        >
            <div style={style}>{slide.content({ currentSlideIndex, index, slideId: slide.id })}</div>
        </div>
    );
};
