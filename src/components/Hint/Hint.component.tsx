import React from 'react';
import type { FC, ReactNode } from 'react';
import styles from './Hint.module.scss';
import { InfoDropIcon } from 'components/Icons';
import { classNames } from 'core/helpers';

export type HintType = 'default' | 'error';

export interface HintProps {
    title: ReactNode;
    type?: HintType;
    className?: string;
    iconClassName?: string;
    titleClassName?: string;
}

export const Hint: FC<HintProps> = ({ type = 'default', title, className, iconClassName, titleClassName }) => {
    return (
        <div
            className={classNames({
                [styles.hint]: true,
                [styles.errorType]: type === 'error',
                [className]: !!className,
            })}
        >
            <InfoDropIcon
                className={classNames({
                    [styles.icon]: true,
                    [styles.errorType]: type === 'error',
                    [iconClassName]: !!iconClassName,
                })}
            />
            <span className={classNames([styles.hintTitle, titleClassName])}>{title}</span>
        </div>
    );
};
