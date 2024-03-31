import React, { type FC, type ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import styles from './Tooltip.module.scss';
import { DEFAULT_ALIGN_OFFSET } from './const';
import type { TooltipAlign, TooltipColor, TooltipPlacement } from './interface';
import { classNames, isMobileOrTabletDevice } from 'core/helpers';

export interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    placement?: TooltipPlacement;
    color?: TooltipColor;
    align?: TooltipAlign;
    alignOffset?: number;
    tooltipTriggerClassName?: string;
    triggerContainerClassName?: string;
    tooltipContentClassName?: string;
    wrapperClassName?: string;
}

export const Tooltip: FC<TooltipProps> = ({
    children,
    content,
    placement = 'top',
    color = 'primary',
    align = 'end',
    alignOffset = DEFAULT_ALIGN_OFFSET,
    tooltipTriggerClassName = '',
    wrapperClassName,
    triggerContainerClassName,
    tooltipContentClassName,
}) => {
    const isMobileOrTablet = isMobileOrTabletDevice();

    const TooltipComponent: typeof TooltipPrimitive | typeof PopoverPrimitive = isMobileOrTablet
        ? PopoverPrimitive
        : TooltipPrimitive;

    const TooltipComponentRoot: JSX.Element = (
        <TooltipComponent.Root>
            <TooltipComponent.Trigger asChild className={tooltipTriggerClassName}>
                <div className={classNames([styles.triggerWrapper, wrapperClassName])}>
                    <button
                        type="button"
                        disabled
                        className={classNames([styles.triggerContainer, triggerContainerClassName])}
                    >
                        {children}
                    </button>
                </div>
            </TooltipComponent.Trigger>
            <TooltipComponent.Content
                className={classNames([`${styles.tooltipContentClass} ${styles[color]}`, tooltipContentClassName])}
                side={placement}
                align={align}
                alignOffset={alignOffset}
            >
                {content}
                <TooltipComponent.Arrow className={styles.arrow} />
            </TooltipComponent.Content>
        </TooltipComponent.Root>
    );

    if (isMobileOrTablet) {
        return TooltipComponentRoot;
    }

    return <TooltipPrimitive.Provider>{TooltipComponentRoot}</TooltipPrimitive.Provider>;
};
