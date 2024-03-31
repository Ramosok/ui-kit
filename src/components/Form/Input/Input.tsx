import React, { type InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { classNames } from 'core/helpers';
import styles from './Input.module.scss';
import type { InputType } from './interface';
import { FormFieldErrorMessage } from '../FormFieldErrorMessage';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: InputType;
    inputValueClassName?: string;
    underline?: boolean;
    error?: ReactNode;
    errorInputContainer?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((componentProps, ref) => {
    const {
        disabled,
        type = 'text',
        error,
        className = '',
        inputValueClassName = '',
        errorInputContainer = '',
        underline = false,
        ...props
    } = componentProps;

    return (
        <div
            className={classNames({
                [styles.inputContainer]: true,
                [className]: !!className,
            })}
        >
            <input
                {...props}
                ref={ref}
                disabled={disabled}
                className={classNames({
                    [styles.input]: true,
                    [styles.underline]: underline,
                    [styles.inputError]: !!error,
                    [styles.disabled]: disabled,
                    [inputValueClassName]: !!inputValueClassName,
                })}
                type={type}
            />
            {error && (
                <FormFieldErrorMessage className={classNames([styles.errorLabel, errorInputContainer])}>
                    {error}
                </FormFieldErrorMessage>
            )}
        </div>
    );
});
