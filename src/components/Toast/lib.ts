import type { ToastItem } from './interface';
import type { ReactNode } from 'react';
import type { ToastOptions } from './context/ToastContext';

export const createToast = ({
    icon,
    text,
    options,
}: {
    icon: ReactNode;
    text: ReactNode | string;
    options: ToastOptions;
}): ToastItem => ({
    id: Number(new Date()),
    icon,
    text,
    options,
});

export const removeToast = (toasts: ToastItem[], id: ToastItem['id']): ToastItem[] =>
    toasts.filter((toast) => toast.id !== id);
