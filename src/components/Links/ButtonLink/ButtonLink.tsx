import React, { ButtonHTMLAttributes, type FC } from 'react';
import styles from '../Link.module.scss';
import type { LinkColor } from '../interface';
import { classNames } from 'core/helpers';

export interface ButtonLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: LinkColor;
}

export const ButtonLink: FC<ButtonLinkProps> = ({ children, className, disabled, color = 'default', ...props }) => {
    return (
        <button
            {...props}
            type="button"
            disabled={disabled}
            className={classNames([styles.button, styles.link, styles[color], className])}
        >
            {children}
        </button>
    );
};
