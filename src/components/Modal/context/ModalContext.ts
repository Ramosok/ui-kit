import { createContext } from 'react';

export interface ModalContextState {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}

export const ModalContext = createContext<ModalContextState>({
    isOpen: false,
    setIsOpen: () => null,
});
