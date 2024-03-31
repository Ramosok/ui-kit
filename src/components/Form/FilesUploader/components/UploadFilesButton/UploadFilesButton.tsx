import React from 'react';
import type { FC } from 'react';
import { Button, ButtonProps } from 'components/Button';
import styles from './UploadFilesButton.module.scss';
import { DownloadIcon } from 'components/Icons';
import { classNames } from 'core/helpers';

export const UploadFilesButton: FC<ButtonProps> = ({ title, buttonContentClassName, className, ...props }) => {
    return (
        <Button
            {...props}
            type="button"
            className={classNames([styles.button, className])}
            prefixIcon={<DownloadIcon />}
            buttonContentClassName={classNames([styles.buttonContent, buttonContentClassName])}
        >
            <span className={styles.buttonText}>{title}</span>
        </Button>
    );
};
