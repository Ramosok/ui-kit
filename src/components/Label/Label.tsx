import React, { type FC, type LabelHTMLAttributes } from 'react';
import styles from './Label.module.scss';
import { classNames } from 'core/helpers';

export const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({ children, className, ...props }) => (
    <label className={classNames([styles.label, className || ''])} {...props}>
        {children}
    </label>
);
