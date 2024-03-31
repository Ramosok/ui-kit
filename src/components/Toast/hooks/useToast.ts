import { useContext } from 'react';
import { ToastContext, type ToastContextInt } from '../context/ToastContext';

export const useToast = (): ToastContextInt => useContext(ToastContext);
