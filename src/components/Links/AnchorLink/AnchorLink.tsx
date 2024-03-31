import React, { AnchorHTMLAttributes, type FC } from 'react';
import styles from '../Link.module.scss';
import type { LinkColor } from '../interface';
import { classNames } from 'core/helpers';

export interface AnchorLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    color?: LinkColor;
    blank?: boolean;
    download?: boolean;
}

export const AnchorLink: FC<AnchorLinkProps> = ({ blank, children, className, color = 'default', ...rest }) => {
    return (
        <a
            {...rest}
            className={classNames([styles.link, styles[color], className])}
            target={blank ? '_blank' : '_self'}
            rel="noreferrer"
        >
            {children}
        </a>
    );
};
