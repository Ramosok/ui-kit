import React, { FC, forwardRef, ReactNode } from 'react';
import * as RadioGroupComponent from '@radix-ui/react-radio-group';
import { classNames } from 'core/helpers';
import styles from './RadioGroup.module.scss';
import type { RadioGroupItem } from './interface';
import { Label } from 'components/Label';
import { FormFieldErrorMessage } from '../FormFieldErrorMessage';

export interface RadioGroupProps {
    items: RadioGroupItem[];
    value: string;
    id?: string;
    error?: string | ReactNode;
    disabled?: boolean;
    onChange: (value: string) => void;
    children?: FC<RadioGroupItem>;
    className?: string;
    itemClassName?: string;
    radioClassName?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((componentProps, ref) => {
    const { items, id, value, onChange, error, disabled, className, itemClassName, children, radioClassName } =
        componentProps;

    return (
        <>
            <RadioGroupComponent.Root
                disabled={disabled}
                value={value}
                onValueChange={onChange}
                className={classNames([styles.container, className])}
                ref={ref}
            >
                {items.map((item) => {
                    const radioGroupId = id ? `${id}_${item.value}` : item.value;

                    return (
                        <div className={classNames([styles.containerWithContent, itemClassName])} key={radioGroupId}>
                            <div className={styles.itemContainer}>
                                <RadioGroupComponent.Item
                                    className={classNames([styles.radio, radioClassName])}
                                    value={item.value}
                                    id={radioGroupId}
                                    disabled={item.disabled}
                                >
                                    <RadioGroupComponent.Indicator className={styles.indicator} />
                                </RadioGroupComponent.Item>
                                <Label className={styles.label} htmlFor={radioGroupId}>
                                    {item.label}
                                </Label>
                                {children && children(item)}
                            </div>
                            {item.content}
                        </div>
                    );
                })}
            </RadioGroupComponent.Root>
            {error && <FormFieldErrorMessage className={styles.error}>{error}</FormFieldErrorMessage>}
        </>
    );
});
