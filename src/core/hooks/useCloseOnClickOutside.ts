import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

export interface UseCloseOnClickOutsideOutput {
    ref: MutableRefObject<HTMLElement>;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const useCloseOnClickOutside = ({ ref, isOpen, setIsOpen }: UseCloseOnClickOutsideOutput): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            event.stopPropagation();

            if (!ref.current?.contains?.(event.target as HTMLElement)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);
};
