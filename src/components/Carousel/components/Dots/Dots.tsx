import React from 'react';
import type { FC } from 'react';
import styles from './Dots.module.scss';
import { classNames } from 'core/helpers';
import type { UseCarouselControlOutput } from '../../hooks/useCarouselControl';

interface DotsProps {
    currentSlideIndex: number;
    slidesLength: number;
    moveToSlide: UseCarouselControlOutput['moveToSlide'];
    dotsClassName?: string;
    dotClassName?: string;
}

export const Dots: FC<DotsProps> = ({ currentSlideIndex, slidesLength, moveToSlide, dotsClassName, dotClassName }) => {
    return (
        <div
            className={classNames({
                [styles.dots]: true,
                [dotsClassName]: !!dotsClassName,
            })}
        >
            {Array.from({ length: slidesLength }, (_, idx) => (
                <button
                    key={idx}
                    type="button"
                    onClick={() => moveToSlide(idx)}
                    className={classNames({
                        [styles.dot]: true,
                        [styles.activeDot]: idx === currentSlideIndex,
                        [dotClassName]: !!dotClassName,
                    })}
                />
            ))}
        </div>
    );
};
