import React, { forwardRef } from 'react';
import * as CheckboxComponent from '@radix-ui/react-checkbox';
import type { CheckboxProps as CheckboxComponentProps } from '@radix-ui/react-checkbox';
import { classNames } from 'core/helpers';
import { CheckIcon } from 'components/Icons';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends CheckboxComponentProps {
    onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>((componentProps, ref) => {
    const {
        children,
        name,
        onCheckedChange,
        onClick,
        checked,
        disabled = false,
        defaultChecked = false,
        className,
        ...props
    } = componentProps;

    return (
        <div
            className={classNames({
                [styles.checkboxComponent]: true,
                [className]: !!className,
            })}
        >
            <CheckboxComponent.Root
                {...props}
                ref={ref}
                defaultChecked={defaultChecked}
                disabled={disabled}
                className={styles.checkbox}
                id={name}
                checked={checked}
                onClick={onClick}
                onCheckedChange={onCheckedChange}
            >
                <CheckboxComponent.Indicator className={styles.checked}>
                    <CheckIcon className={styles.checkIcon} />
                </CheckboxComponent.Indicator>
            </CheckboxComponent.Root>
            <label htmlFor={name}>{children}</label>
        </div>
    );
});
