import React, { FC } from 'react';
import type { Story, Meta } from '@storybook/react';
import { Toast, type ToastProps } from './Toast';
import { Button } from 'components/Button';
import { ToastProvider } from './context/ToastProvider';
import { useToast } from './hooks/useToast';
import { SuccessIcon } from '../Icons';

export type ToastStoryProps = Pick<ToastProps, 'toastText'> & { showCloseBtn: boolean };

export default {
    title: 'components',
    component: Toast,
    args: {
        toastText: 'Toast text',
        showCloseBtn: true,
    },
    argTypes: {
        toastText: {
            control: {
                type: 'text',
            },
        },
    },
    parameters: {
        controls: {
            exclude: ['toastIcon', 'close', 'open', 'options'],
        },
    },
} as Meta<ToastStoryProps>;

const Content: FC<{ toastText: ToastStoryProps['toastText']; showCloseBtn: ToastStoryProps['showCloseBtn'] }> = ({
    toastText,
    showCloseBtn,
}) => {
    const toast = useToast();

    const openToast = (): void => {
        toast.open(<SuccessIcon />, toastText, { showCloseBtn });
    };

    return <Button onClick={openToast}>Open Toast</Button>;
};

export const ToastTemplate: Story<ToastStoryProps> = ({ toastText, showCloseBtn }) => (
    <ToastProvider>
        <Content toastText={toastText} showCloseBtn={showCloseBtn} />
    </ToastProvider>
);

ToastTemplate.storyName = 'Toast';
