import type { ReactNode } from 'react';
import type { ToastOptions } from './context/ToastContext';

export interface ToastItem {
    id: number;
    icon: ReactNode;
    text: ReactNode | string;
    options: ToastOptions;
}
