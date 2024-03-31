import type { SyntheticEvent } from 'react';

export enum OtpInputKeyboardEvents {
    ArrowRight = 'ArrowRight',
    ArrowDown = 'ArrowDown',
    ArrowLeft = 'ArrowLeft',
    ArrowUp = 'ArrowUp',
    Backspace = 'Backspace',
}

export type OtpInputEvent<M extends SyntheticEvent> = M & {
    target: HTMLInputElement & {
        previousElementSibling: HTMLInputElement;
        nextElementSibling: HTMLInputElement;
    };
};
