import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface UseDatePickerBlurEventInput {
    datepickerContainerRef: MutableRefObject<HTMLDivElement>;
    onBlur(): void;
}

interface UseDatePickerBlurEventOutput {
    onFocusInput(): void;
}

export const useDatePickerBlurEvent = ({
    datepickerContainerRef,
    onBlur,
}: UseDatePickerBlurEventInput): UseDatePickerBlurEventOutput => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const isMountedRef = useRef<boolean>(false);

    useEffect(() => {
        const listener = (event: MouseEvent): void => {
            event.stopPropagation();
            const target = event.target as HTMLElement;
            const isClickOutside = !datepickerContainerRef.current?.contains?.(target);
            if (isClickOutside) {
                setIsFocused(false);
            }
        };

        document.addEventListener('click', listener);

        return () => document.removeEventListener('click', listener);
    }, []);

    useEffect(() => {
        if (!isFocused && isMountedRef.current) {
            onBlur?.();
        }

        isMountedRef.current = true;
    }, [isFocused]);

    const onFocusInput = (): void => {
        setIsFocused(true);
    };

    return {
        onFocusInput,
    };
};
