import React, { type FC, type ReactNode, useState } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ArrowIcon, LockOnIcon } from 'components/Icons';
import styles from './Collapsible.module.scss';
import { classNames } from 'core/helpers';
import type { CollapsibleContentColor, CollapsibleTriggerColor } from './interface';

export interface CollapsibleProps {
    children: ReactNode;
    trigger?: ReactNode;
    value?: string;
    isOpen?: boolean;
    triggerColor?: CollapsibleTriggerColor;
    contentColor?: CollapsibleContentColor;
    arrowClass?: string;
    onOpenCollapse?: (value: boolean) => void;
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
    rounding?: boolean;
    disabled?: boolean;
}

const collapseColorClasses: Record<string, string> = {
    white: styles.white,
    grey: styles.grey,
};

export const Collapsible: FC<CollapsibleProps> = ({
    children,
    isOpen,
    trigger,
    triggerColor = 'grey',
    contentColor = 'white',
    arrowClass = '',
    onOpenCollapse,
    rounding = true,
    className,
    triggerClassName,
    contentClassName,
    disabled,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const isInnerControl = typeof isOpen !== 'boolean';
    const isCollapsibleOpen = !disabled && (isInnerControl ? open : isOpen);
    const triggerColorClass = disabled ? collapseColorClasses.white : collapseColorClasses[triggerColor];

    const handleClickCollapse = (value: boolean): void => {
        if (!disabled) {
            if (isInnerControl) {
                onOpenCollapse?.(value);
                setOpen(value);
            } else {
                onOpenCollapse(!isOpen);
            }
        }
    };

    return (
        <CollapsiblePrimitive.Root
            className={classNames({
                [styles.accord]: true,
                [className]: !!className,
            })}
            onOpenChange={handleClickCollapse}
            open={isCollapsibleOpen}
        >
            <CollapsiblePrimitive.Trigger
                asChild
                className={classNames({
                    [styles.trigger]: true,
                    [triggerColorClass]: true,
                    [styles.rounding]: !!rounding,
                    [triggerClassName]: !!triggerClassName,
                })}
            >
                <div className={styles.triggerContainer}>
                    {trigger}
                    {disabled && <LockOnIcon className={styles.lockIcon} />}
                    {!disabled && (
                        <ArrowIcon
                            className={classNames({
                                [styles.arrowIcon]: true,
                                [arrowClass]: !!arrowClass,
                                [styles.chevronClosed]: isInnerControl ? !!open : !!isOpen,
                            })}
                        />
                    )}
                </div>
            </CollapsiblePrimitive.Trigger>
            <CollapsiblePrimitive.Content
                className={classNames({
                    [styles.content]: true,
                    [collapseColorClasses[contentColor]]: true,
                    [contentClassName]: !!contentClassName,
                })}
            >
                {children}
            </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
    );
};
