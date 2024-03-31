import { MutableRefObject, useEffect, useState } from 'react';

export interface UseSearchSelectContentWidthInput {
    triggerRef: MutableRefObject<HTMLButtonElement>;
    isContentOpened: boolean;
}

export interface UseSearchSelectContentWidthOutput {
    triggerWidth: number;
}

export const useSearchSelectContentWidth = ({
    triggerRef,
    isContentOpened,
}: UseSearchSelectContentWidthInput): UseSearchSelectContentWidthOutput => {
    const [triggerWidth, setTriggerWidth] = useState<number>(0);

    useEffect(() => {
        if (isContentOpened) {
            const triggerWidthValue = triggerRef.current?.getBoundingClientRect?.()?.width;
            setTriggerWidth((prevValue) => triggerWidthValue || prevValue);
        }
    }, [isContentOpened]);

    return {
        triggerWidth,
    };
};
