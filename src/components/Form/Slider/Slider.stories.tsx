import React, { useState } from 'react';
import { Slider, SliderProps } from './Slider';
import styles from './Slider.stories.module.scss';
import type { Story, Meta } from '@storybook/react';

export type SliderStoryProps = Pick<SliderProps, 'min' | 'max' | 'step' | 'disabled' | 'markMaxValue'>;

export default {
    title: 'components/Form/Slider',
    component: Slider,
    args: {
        min: 0,
        max: 2_000_000,
        step: 10_000,
        disabled: false,
        markMaxValue: 1_000_000,
    },
    parameters: {
        controls: {
            include: ['min', 'max', 'step', 'disabled', 'markMaxValue'],
        },
    },
} as Meta<SliderStoryProps>;

const SLIDER_DEFAULT_VALUE = 50;

export const SliderTemplate: Story<SliderStoryProps> = ({ min, max, step, disabled, markMaxValue }) => {
    const [sliderValue, setSliderValue] = useState<number>(SLIDER_DEFAULT_VALUE);
    const changeValue = (value: number): void => {
        setSliderValue(value);
    };

    return (
        <>
            <Slider
                min={min}
                max={max}
                step={step}
                value={sliderValue}
                disabled={disabled}
                onChange={changeValue}
                markMaxValue={markMaxValue}
            />
            <div className={styles.sliderValues}>
                <div>{min}</div>
                <div>{sliderValue}</div>
                <div>{max}</div>
            </div>
        </>
    );
};

SliderTemplate.storyName = 'Slider';
