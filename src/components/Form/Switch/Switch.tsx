import React, { forwardRef, ReactNode } from 'react';
import * as SwitchComponent from '@radix-ui/react-switch';
import type { SwitchProps as SwitchComponentProps } from '@radix-ui/react-switch';
import styles from './Switch.module.scss';
import { classNames } from 'core/helpers';
import { Label } from '../../Label';
import type { SwitchActiveColor } from './interface';
import { ACTIVE_SWITCH_COLOR_CLASSES } from './const';

export interface SwitchProps extends SwitchComponentProps {
    switchLabel?: ReactNode;
    activeSwitchColor?: SwitchActiveColor;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>((componentProps, ref) => {
    const {
        onCheckedChange,
        checked,
        disabled = false,
        defaultChecked = false,
        className,
        switchLabel,
        activeSwitchColor = 'greenLight',
        ...props
    } = componentProps;

    return (
        <div
            className={classNames({
                [styles.switchComponent]: true,
                [className]: !!className,
            })}
        >
            <SwitchComponent.Root
                {...props}
                ref={ref}
                defaultChecked={defaultChecked}
                disabled={disabled}
                checked={checked}
                onCheckedChange={onCheckedChange}
                className={classNames({
                    [ACTIVE_SWITCH_COLOR_CLASSES[activeSwitchColor]]: true,
                    [styles.disabled]: !!disabled,
                })}
            >
                <SwitchComponent.Thumb className={styles.switchThumb} />
            </SwitchComponent.Root>
            {switchLabel && <Label className={styles.label}>{switchLabel}</Label>}
        </div>
    );
});
