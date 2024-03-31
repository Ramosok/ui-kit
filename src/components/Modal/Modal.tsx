import React, { type FC, type ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import styles from './Modal.module.scss';
import { CloseIcon } from 'components/Icons';
import { ModalContext } from './context/ModalContext';
import { classNames } from 'core/helpers';

export interface ModalProps {
    trigger?: ReactElement;
    isOpen?: boolean;
    className?: string;
    closeIconClassName?: string;
    overlayClassName?: string;
    onOpenChange?: (value: boolean) => void;
    onCloseCallback?: () => void;
    showCloseBtn?: boolean;
    disabled?: boolean;
    dataTestId?: string;
}

export const Modal: FC<ModalProps> = ({
    children,
    trigger,
    isOpen,
    className = '',
    closeIconClassName,
    overlayClassName,
    onOpenChange = () => null,
    onCloseCallback = () => null,
    showCloseBtn = true,
    disabled = false,
    dataTestId,
}) => {
    const [innerOpenState, setInnerOpenState] = useState<boolean>();
    const stateValue = useMemo(
        () => ({ isOpen: innerOpenState, setIsOpen: setInnerOpenState }),
        [innerOpenState, setInnerOpenState]
    );

    useEffect(() => {
        setInnerOpenState(isOpen);
    }, [isOpen]);

    const handleOpenChange = useCallback(
        (value: boolean) => {
            setInnerOpenState(value);
            onOpenChange(value);
        },
        [onOpenChange, setInnerOpenState]
    );

    const openModal = (): void => {
        if (!disabled) {
            setInnerOpenState(true);
        }
    };

    return (
        <ModalContext.Provider value={stateValue}>
            <DialogPrimitive.Root open={innerOpenState} onOpenChange={handleOpenChange}>
                <div onClick={openModal}>{trigger}</div>
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay className={classNames([styles.overlay, overlayClassName])}>
                        <DialogPrimitive.DialogContent
                            data-test-id={dataTestId}
                            className={`${styles.content} ${className}`}
                            onInteractOutside={(event) => event.preventDefault()}
                        >
                            {showCloseBtn && (
                                <DialogPrimitive.Close asChild className={styles.closeButton} onClick={onCloseCallback}>
                                    <div className={styles.iconWrapper}>
                                        <CloseIcon className={classNames([styles.closeIcon, closeIconClassName])} />
                                    </div>
                                </DialogPrimitive.Close>
                            )}
                            {children}
                        </DialogPrimitive.DialogContent>
                    </DialogPrimitive.Overlay>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
        </ModalContext.Provider>
    );
};
