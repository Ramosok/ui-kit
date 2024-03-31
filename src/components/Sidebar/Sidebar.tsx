import React, { type ReactNode, type FC } from 'react';
import { classNames } from 'core/helpers';
import { CloseIcon } from 'components/Icons';
import styles from './Sidebar.module.scss';
import { useSidebarBackdropScrolling } from './hooks/useSidebarBackdropScrolling';

export interface SidebarProps {
    isOpen: boolean;
    close?: () => void;
    header?: ReactNode;
    backdropClassName?: string;
    containerClassName?: string;
}

export const Sidebar: FC<SidebarProps> = ({
    isOpen,
    close,
    children,
    header,
    backdropClassName,
    containerClassName,
}) => {
    useSidebarBackdropScrolling({ isSidebarOpen: isOpen });

    const onClose = (): void => close();

    return (
        <>
            <div
                className={classNames({
                    [styles.backdrop]: isOpen,
                    [styles.backdropOpen]: isOpen,
                    [backdropClassName]: !!backdropClassName,
                })}
                onClick={onClose}
            />
            <div
                className={classNames({
                    [styles.container]: true,
                    [styles.containerOpen]: isOpen,
                    [containerClassName]: !!containerClassName,
                })}
            >
                <div className={styles.header}>
                    <div>{header}</div>
                    <div onClick={onClose}>
                        <CloseIcon className={styles.closeIcon} />
                    </div>
                </div>
                <div className={styles.content}>{isOpen && children}</div>
            </div>
        </>
    );
};
