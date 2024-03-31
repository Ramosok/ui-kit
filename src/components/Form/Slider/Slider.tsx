import React, { type FC } from 'react';
import * as SliderComponent from '@radix-ui/react-slider';
import styles from './Slider.module.scss';
import { classNames } from 'core/helpers';
import { SliderMark } from './components/SliderMark/SliderMark';

export interface SliderProps {
    min: number;
    max: number;
    value?: number;
    step: number;
    onChange: (value: number) => void;
    changeOnBlur?: () => void;
    disabled?: boolean;
    markMaxValue?: number;
}

export const Slider: FC<SliderProps> = ({
    step,
    changeOnBlur,
    max,
    min,
    value,
    onChange,
    disabled,
    markMaxValue,
    ...props
}) => {
    const isMinEqualMax = min === max;

    return (
        <>
            <SliderComponent.Root
                value={[value]}
                onValueChange={(eventValue) => onChange(eventValue[0])}
                step={step}
                className={styles.sliderRoot}
                min={min}
                max={max}
                disabled={disabled}
                {...props}
            >
                <SliderComponent.Track className={styles.sliderTrack} onClick={changeOnBlur}>
                    <SliderComponent.Range className={styles.sliderRange} />
                </SliderComponent.Track>
                <SliderComponent.Thumb
                    className={classNames({
                        [styles.sliderThumb]: true,
                        [styles.thumbMinEqualMax]: isMinEqualMax,
                    })}
                    onClick={changeOnBlur}
                />
            </SliderComponent.Root>
            {!!markMaxValue && <SliderMark min={min} max={max} value={markMaxValue} />}
        </>
    );
};
