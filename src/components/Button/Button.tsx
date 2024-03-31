import React, { type ReactElement, type ButtonHTMLAttributes, type FC } from 'react';
import type { ButtonColor } from './interface';
import { classNames } from 'core/helpers';
import { Spinner } from '../Spinner';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: ButtonColor;
    prefixIcon?: ReactElement;
    postfixIcon?: ReactElement;
    isLoading?: boolean;
    buttonContentClassName?: string;
}

export const Button: FC<ButtonProps> = ({
    children,
    color = 'primary',
    className,
    disabled,
    prefixIcon,
    postfixIcon,
    isLoading = false,
    buttonContentClassName,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={classNames({
                [styles.button]: true,
                [styles.withPrefixPostfix]: !!(prefixIcon || postfixIcon),
                [className]: !!className,
                [styles[color]]: true,
            })}
        >
            <div className={classNames([styles.content, buttonContentClassName])}>
                {prefixIcon}
                {isLoading ? <Spinner size="sm" color="white" /> : children}
            </div>
            {postfixIcon}
        </button>
    );
};
