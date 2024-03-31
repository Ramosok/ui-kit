import { createContext, ReactNode } from 'react';
import type { ToastItem } from '../interface';

export interface ToastOptions {
    showCloseBtn?: boolean;
}

export interface ToastContextInt {
    open: (icon: ReactNode, text: ReactNode, config?: ToastOptions) => { close(): void; newToast: ToastItem };
    setOnOpenListener(cb: (toast: ToastItem) => void): () => void;
    setOnCloseListener(cb: (toast: ToastItem) => void): () => void;
}

export const ToastContext = createContext<ToastContextInt | null>(null);
