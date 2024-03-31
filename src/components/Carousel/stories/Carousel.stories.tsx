import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { Carousel } from '../Carousel';
import type { CarouselSlide } from '../interface';
import styles from './Carousel.stories.module.scss';
import { useCarouselControl } from '../hooks/useCarouselControl';

const MOCK_SLIDES: CarouselSlide[] = [
    {
        id: '1',
        content: () => <img className={styles.img} src="" alt="example-1" />,
    },
    {
        id: '2',
        content: () => <img className={styles.img} src="" alt="example-4" />,
    },
    {
        id: '3',
        content: () => <img className={styles.img} src="" alt="example-2" />,
    },
    {
        id: '4',
        content: () => <img className={styles.img} src="" alt="example-3" />,
    },
    {
        id: '5',
        content: ({ index }) => (
            <p className={styles.textSlide}>
                Just Test Content for slide <strong>with index {index}</strong>
            </p>
        ),
    },
];

export type CarouselStoryProps = { isShowArrows: boolean; isShowSliderDots: boolean; indSlideToMove: number };

export default {
    title: 'components',
    component: Carousel,
    args: {
        isShowSliderDots: true,
        isShowArrows: true,
    },
    parameters: {
        controls: {
            include: ['isShowSliderDots', 'isShowArrows'],
        },
    },
} as Meta<CarouselStoryProps>;

export const CarouselTemplate: Story<CarouselStoryProps> = ({ isShowSliderDots, isShowArrows }) => {
    const carouselProps = useCarouselControl({
        initialActiveIndex: 0,
    });

    return (
        <Carousel
            {...carouselProps}
            slideClassName={styles.slide}
            slides={MOCK_SLIDES}
            isShowSliderDots={isShowSliderDots}
            isShowArrows={isShowArrows}
        />
    );
};

CarouselTemplate.storyName = 'Carousel';
