import React, { type FC, type ReactNode } from 'react';
import { useTimeout } from 'core/hooks';
import styles from './Toast.module.scss';
import { CloseIcon } from 'components/Icons';
import type { ToastOptions } from './context/ToastContext';

export interface ToastProps {
    close: () => void;
    toastIcon?: ReactNode;
    toastText?: ReactNode;
    options?: ToastOptions;
}

export const DEFAULT_DELAY = 3000;

export const Toast: FC<ToastProps> = ({ close, toastIcon, toastText, options = { showCloseBtn: true } }) => {
    useTimeout(close, DEFAULT_DELAY);

    return (
        <div className={styles.toast} data-state="openToast">
            <div className={styles.toastContent}>
                {toastIcon && <div className={styles.toastIcon}>{toastIcon}</div>}
                {toastText && <div className={styles.toastText}>{toastText}</div>}
            </div>
            {options.showCloseBtn && (
                <button type="button" onClick={close} className={styles.toastCloseBtn}>
                    <CloseIcon className={styles.closeIcon} />
                </button>
            )}
        </div>
    );
};
