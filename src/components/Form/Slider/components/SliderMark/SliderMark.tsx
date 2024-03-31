import React from 'react';
import type { FC } from 'react';
import * as SliderComponent from '@radix-ui/react-slider';
import { MarkIcon } from 'components/Icons';
import styles from './SliderMark.module.scss';

interface SliderMarkProps {
    value: number;
    min: number;
    max: number;
}

export const SliderMark: FC<SliderMarkProps> = ({ value, min, max, children }) => {
    return (
        <SliderComponent.Root defaultValue={[value]} className={styles.sliderRoot} min={min} max={max} disabled>
            <SliderComponent.Thumb className={styles.sliderThumb}>
                <div className={styles.iconContainer}>{children || <MarkIcon className={styles.icon} />}</div>
            </SliderComponent.Thumb>
        </SliderComponent.Root>
    );
};
