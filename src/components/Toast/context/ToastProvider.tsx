import React, { useState, useMemo, FC, ReactNode, useCallback, useRef, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import styles from './ToastProvider.module.scss';
import { ToastContext, ToastContextInt, ToastOptions } from './ToastContext';
import { Toast } from '../Toast';
import { createToast, removeToast } from '../lib';
import type { ToastItem } from '../interface';

export const ToastProvider: FC = ({ children }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const onCloseListenerRef = useRef<(toast: ToastItem) => void>(null);
    const onOpenListenerRef = useRef<(toast: ToastItem) => void>(null);

    const open = useCallback(
        (icon: ReactNode, text: ReactNode, options: ToastOptions): { close(): void; newToast: ToastItem } => {
            const newToast = createToast({ icon, text, options });
            setToasts((currentToasts) => [...currentToasts, newToast]);
            onOpenListenerRef.current?.(newToast);

            return {
                close() {
                    setToasts((currentToasts) => removeToast(currentToasts, newToast.id));
                },
                newToast,
            };
        },
        []
    );

    const close = (id: number): void => {
        setToasts((currentToasts) => removeToast(currentToasts, id));
        const toastToRemove = toasts.find((toast) => toast.id === id);
        if (toastToRemove) {
            onCloseListenerRef.current?.(toastToRemove);
        }
    };

    const setListener =
        (listenerRef: MutableRefObject<(toast: ToastItem) => void>) =>
        (cb: (toast: ToastItem) => void): (() => void) => {
            listenerRef.current = cb;
            return () => {
                listenerRef.current = null;
            };
        };

    const setOnOpenListener = useCallback(setListener(onOpenListenerRef), []);

    const setOnCloseListener = useCallback(setListener(onCloseListenerRef), []);

    const contextValue = useMemo(
        (): ToastContextInt => ({ open, setOnOpenListener, setOnCloseListener }),
        [open, setOnOpenListener, setOnCloseListener]
    );

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            {createPortal(
                <div className={styles.toastsWrapper}>
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            close={() => close(toast.id)}
                            toastIcon={toast.icon}
                            toastText={toast.text}
                            options={toast.options}
                        />
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};
