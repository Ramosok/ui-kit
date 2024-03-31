import type { ReactNode } from 'react';

export interface RadioGroupItem {
    value: string;
    label: string;
    disabled?: boolean;
    [key: string]: unknown;
    content?: ReactNode;
}
