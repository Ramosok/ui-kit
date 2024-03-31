import React from 'react';
import { SuccessIcon, useToast } from 'components';

export const useSaveToClipboard = (): { copyToClipboard: (dataToCopy: string, text: string) => void } => {
    const toast = useToast();

    const copyToClipboard = (dataToCopy: string, text: string): void => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(dataToCopy);
            toast.open(<SuccessIcon />, text);
        }
    };

    return {
        copyToClipboard,
    };
};
