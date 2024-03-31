import React, { ComponentType, ForwardedRef, forwardRef, ReactNode } from 'react';
import { classNames } from 'core/helpers';
import {
    PatternFormat,
    NumericFormat,
    PatternFormatProps,
    NumericFormatProps,
    OnValueChange,
    NumberFormatValues,
} from 'react-number-format';
import styles from '../Input/Input.module.scss';
import { FormFieldErrorMessage } from '../FormFieldErrorMessage';
import { getPatternMaskedInfo } from './lib';

export type MaskedInputProps<P> = P & { error?: string | ReactNode };
export type NumericMaskedInputProps = MaskedInputProps<NumericFormatProps>;
export type PatternMaskedInputProps = MaskedInputProps<PatternFormatProps & { changeValue?: (value: string) => void }>;
export type MaskedInputContainerProps = MaskedInputProps<{
    className?: string;
    value?: string | number;
    disabled?: boolean;
}>;
type MaskedInputComponentProps<CP> = CP &
    MaskedInputContainerProps & {
        Component: ComponentType<CP>;
        defaultValue?: string | number;
        onValueChange?: OnValueChange;
    };

const MaskedInputComponent = forwardRef(
    <CP,>(componentProps: MaskedInputComponentProps<CP>, ref: ForwardedRef<HTMLInputElement>) => {
        const { disabled, value, className, error, Component, defaultValue, onValueChange, ...props } = componentProps;

        return (
            <div className={styles.inputContainer}>
                <Component
                    {...(props as MaskedInputComponentProps<CP>)}
                    getInputRef={ref}
                    value={value}
                    defaultValue={defaultValue}
                    onValueChange={onValueChange}
                    disabled={disabled}
                    className={classNames({
                        [styles.input]: true,
                        [styles.inputError]: !!error,
                        [styles.disabled]: disabled,
                        [className]: !!className,
                    })}
                />
                {error && <FormFieldErrorMessage className={styles.errorLabel}> {error}</FormFieldErrorMessage>}
            </div>
        );
    }
);

// for Number based formatting like currency inputs
export const NumericMaskedInput = forwardRef<HTMLInputElement, NumericMaskedInputProps>((componentProps, ref) => (
    <MaskedInputComponent {...componentProps} ref={ref} Component={NumericFormat} />
));

//  for Pattern based formatting like card numbers, phone number inputs
export const PatternMaskedInput = forwardRef<HTMLInputElement, PatternMaskedInputProps>(
    ({ changeValue, ...componentProps }, ref) => {
        const { defaultValue, format, patternChar, onValueChange } = componentProps;
        const { patternInitialCode, maxValueLength } = getPatternMaskedInfo(format, patternChar);
        const slicedDefaultValue = String(defaultValue || '').slice(patternInitialCode.length);

        const handleChangeValue = ({ value }: NumberFormatValues): void => {
            changeValue(`${patternInitialCode}${value?.slice(0, maxValueLength)}`);
        };
        return (
            <MaskedInputComponent
                {...componentProps}
                ref={ref}
                defaultValue={slicedDefaultValue}
                onValueChange={changeValue ? handleChangeValue : onValueChange}
                Component={PatternFormat as ComponentType<MaskedInputContainerProps>}
            />
        );
    }
);
