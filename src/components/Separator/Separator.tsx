import React, { type FC } from 'react';
import styles from './Separator.module.scss';
import { classNames } from 'core/helpers';
import type { SeparatorColor } from './inteface';

export interface SeparatorProps {
    color?: SeparatorColor;
    className?: string;
}

export const Separator: FC<SeparatorProps> = ({ color = 'secondary', className = '' }) => {
    return (
        <div
            className={classNames({
                [styles.separator]: true,
                [styles[color]]: true,
                [className]: !!className,
            })}
        />
    );
};
