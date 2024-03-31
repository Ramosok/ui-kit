import { MutableRefObject, useRef } from 'react';
import type { SearchSelectProps } from '../SearchSelect';
import { isMobileOrTabletDevice } from 'core/helpers';

export interface UseSelectContentOpeningInput {
    onOpen: SearchSelectProps['onOpen'];
    focusSearchInput: SearchSelectProps['focusSearchInput'];
    searchInputRef: MutableRefObject<HTMLInputElement>;
}

export interface UseSelectContentOpeningOutput {
    onOpenChange: (isOpened: boolean) => void;
}

export const useSelectContentOpening = ({
    onOpen,
    focusSearchInput,
    searchInputRef,
}: UseSelectContentOpeningInput): UseSelectContentOpeningOutput => {
    const contentOpenedCountRef = useRef<number>(0);

    const setFocusToSearchInput = (): void => {
        if (focusSearchInput && !isMobileOrTabletDevice()) {
            setTimeout(() => {
                if (searchInputRef.current) {
                    searchInputRef.current.focus();
                }
            }, 0);
        }
    };

    const onOpenChange = (isOpened: boolean): void => {
        let firstTimeOpened = false;
        if (contentOpenedCountRef.current === 0) {
            firstTimeOpened = true;
            contentOpenedCountRef.current = 1;
        }
        onOpen?.({ isOpened, firstTimeOpened });
        setFocusToSearchInput();
    };

    return {
        onOpenChange,
    };
};
