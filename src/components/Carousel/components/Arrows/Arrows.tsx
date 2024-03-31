import React, { type MouseEvent } from 'react';
import type { FC } from 'react';
import styles from './Arrows.module.scss';
import { ArrowIcon } from 'components/Icons';
import { classNames } from 'core/helpers';
import type { UseCarouselControlOutput } from '../../hooks/useCarouselControl';

interface ArrowsProps {
    currentSlideIndex: number;
    switchToNextSlide: UseCarouselControlOutput['switchToNextSlide'];
    switchToPrevSlide: UseCarouselControlOutput['switchToPrevSlide'];
    slidesLength: number;
    prevIconClassName?: string;
    nextIconClassName?: string;
    prevIconContainerClassName?: string;
    nextIconContainerClassName?: string;
}

export const Arrows: FC<ArrowsProps> = ({
    switchToNextSlide,
    switchToPrevSlide,
    currentSlideIndex,
    slidesLength,
    prevIconContainerClassName,
    prevIconClassName,
    nextIconContainerClassName,
    nextIconClassName,
}) => {
    const isFirsSlide = !currentSlideIndex;
    const isLastSlide = currentSlideIndex === slidesLength - 1;

    const changeActiveSlide = (event: MouseEvent<HTMLButtonElement>, switchToSlide: () => void): void => {
        event.stopPropagation();
        switchToSlide();
    };

    return (
        <>
            <button
                className={classNames({
                    [styles.preIconContainer]: true,
                    [prevIconContainerClassName]: !!prevIconContainerClassName,
                })}
                type="button"
                disabled={isFirsSlide}
                onClick={(e: MouseEvent<HTMLButtonElement>) => changeActiveSlide(e, switchToPrevSlide)}
            >
                <ArrowIcon
                    className={classNames({
                        [styles.prevIcon]: true,
                        [styles.disableIcon]: isFirsSlide,
                        [prevIconClassName]: !!prevIconClassName,
                    })}
                />
            </button>
            <button
                className={classNames({
                    [styles.nextIconContainer]: true,
                    [nextIconContainerClassName]: !!nextIconContainerClassName,
                })}
                type="button"
                disabled={isLastSlide}
                onClick={(e: MouseEvent<HTMLButtonElement>) => changeActiveSlide(e, switchToNextSlide)}
            >
                <ArrowIcon
                    className={classNames({
                        [styles.nextIcon]: true,
                        [styles.disableIcon]: isLastSlide,
                        [nextIconClassName]: !!nextIconClassName,
                    })}
                />
            </button>
        </>
    );
};
