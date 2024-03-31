import React from 'react';
import type { FC, ReactNode } from 'react';
import styles from './FormFieldErrorMessage.module.scss';
import { classNames } from 'core/helpers';
import { InfoIcon } from '../../Icons';

export interface FormFieldErrorMessageProps {
    children: ReactNode;
    className?: string;
    withInfoIcon?: boolean;
}

export const FormFieldErrorMessage: FC<FormFieldErrorMessageProps> = ({ children, className, withInfoIcon = true }) => (
    <span className={classNames([styles.error, className])}>
        {withInfoIcon && <InfoIcon className={styles.errorIcon} />}
        {children}
    </span>
);
