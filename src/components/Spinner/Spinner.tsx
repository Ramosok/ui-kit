import React, { type FC } from 'react';
import { classNames } from 'core/helpers';
import { TengeIcon } from 'components/Icons';
import {
    LOADER_COLOR_CLASSES,
    LOADER_CONTAINER_SIZE_CLASSES,
    LOADER_SIZE_CLASSES,
    TENGE_COLOR_CLASSES,
    TENGE_SIZE_CLASSES,
} from './const';
import styles from './Spinner.module.scss';
import type { SpinnerColor, SpinnerSize } from './interface';

export interface SpinnerProps {
    size?: SpinnerSize;
    fixed?: boolean;
    color?: SpinnerColor;
    loaderClassName?: string;
    className?: string;
    withTenge?: boolean;
    loaderContainerClassName?: string;
}

export const Spinner: FC<SpinnerProps> = ({
    size = 'md',
    fixed = false,
    color = 'main',
    loaderClassName,
    className = '',
    withTenge = true,
    loaderContainerClassName,
}) => {
    return (
        <div className={classNames({ [styles.fixedContainer]: fixed, [className]: true })}>
            <div
                className={classNames({
                    [styles.fixedLoader]: fixed,
                    [styles.loaderContainer]: true,
                    [LOADER_CONTAINER_SIZE_CLASSES[size]]: true,
                    [loaderContainerClassName]: !!loaderContainerClassName,
                })}
            >
                <div
                    className={classNames({
                        [styles.loader]: true,
                        [LOADER_SIZE_CLASSES[size]]: true,
                        [LOADER_COLOR_CLASSES[color]]: true,
                        [loaderClassName]: !!loaderClassName,
                    })}
                />
                {withTenge && (
                    <TengeIcon
                        className={classNames({
                            [styles.tenge]: true,
                            [TENGE_SIZE_CLASSES[size]]: true,
                            [TENGE_COLOR_CLASSES[color]]: true,
                            [loaderClassName]: !!loaderClassName,
                        })}
                    />
                )}
            </div>
        </div>
    );
};
