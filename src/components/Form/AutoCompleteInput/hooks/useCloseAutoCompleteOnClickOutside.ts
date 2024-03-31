import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

export interface UseCloseAutoCompleteOnClickOutsideOutput {
    ref: MutableRefObject<HTMLElement>;
    attributeKey: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const useCloseAutoCompleteOnClickOutside = ({
    ref,
    attributeKey,
    setIsOpen,
}: UseCloseAutoCompleteOnClickOutsideOutput): void => {
    useEffect(() => {
        const dataAttribute = `data-auto-complete-input-component-${attributeKey}`;
        const handler = (event: MouseEvent): void => {
            event.stopPropagation();
            const isActiveElement = document.activeElement === ref.current;
            const isClickOutside = !(event.target as HTMLElement)?.closest(`[${dataAttribute}]`);
            if (isClickOutside && !isActiveElement) {
                setIsOpen(false);
            }
        };
        ref.current.setAttribute(dataAttribute, '');
        window.addEventListener('click', handler);

        return () => window.removeEventListener('click', handler);
    }, []);
};
