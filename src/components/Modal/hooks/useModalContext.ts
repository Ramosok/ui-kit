import { useContext } from 'react';
import type { ModalContextState } from '../context/ModalContext';
import { ModalContext } from '../context/ModalContext';

export const useModalContext = (): ModalContextState => useContext<ModalContextState>(ModalContext);
